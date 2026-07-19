import { useState, useEffect, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { 
  HelpCircle, 
  Trophy, 
  RotateCcw, 
  Search, 
  X, 
  ArrowUp, 
  ArrowDown, 
  Share2,
  CheckCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PLAYERS, type Player } from './data/players';
import { QUIZ_QUESTIONS, type QuizQuestion } from './data/quiz';
import { UNDERCOVER_DUOS } from './data/undercover';
import type { UndercoverDuo } from './data/undercover';

interface GuessResult {
  player: Player;
  attributes: {
    nationality: { value: string; flag: string; status: 'correct' | 'incorrect' };
    league: { value: string; status: 'correct' | 'incorrect' };
    club: { value: string; status: 'correct' | 'incorrect' };
    age: { value: number; status: 'correct' | 'partial' | 'incorrect'; arrow?: 'up' | 'down' };
    number: { value: number; status: 'correct' | 'partial' | 'incorrect'; arrow?: 'up' | 'down' };
    position: { value: string; detail: string; status: 'correct' | 'partial' | 'incorrect' };
    height: { value: number; status: 'correct' | 'partial' | 'incorrect'; arrow?: 'up' | 'down' };
  };
}

interface GameStats {
  played: number;
  won: number;
  streak: number;
  maxStreak: number;
  highScore?: number; // Only for Quiz Mode
}

interface QuizHistoryItem {
  question: QuizQuestion;
  chosen: string;
  correct: boolean;
}

interface UndercoverPlayer {
  id: string;
  name: string;
  role: 'CIVIL' | 'UNDERCOVER';
  word: string;
  eliminated: boolean;
}

export default function App() {
  // Game Modes & Difficulties
  const [gameMode, setGameMode] = useState<'CLASSIC' | 'CAREER' | 'QUIZ' | 'UNDERCOVER' | null>(null);
  const [difficulty, setDifficulty] = useState<'SIMPLE' | 'HARD' | null>(null);
  const [careerDifficulty, setCareerDifficulty] = useState<'SIMPLE' | 'HARD' | null>(null);

  // Undercover Game States
  const [undercoverPlayers, setUndercoverPlayers] = useState<UndercoverPlayer[]>([]);
  const [undercoverNamesInput, setUndercoverNamesInput] = useState<string[]>(['', '', '', '']); // Default to 4 players
  const [undercoverPhase, setUndercoverPhase] = useState<'CONFIG' | 'DISTRIBUTION' | 'GAMEPLAY' | 'VOTING' | 'REVEAL'>('CONFIG');
  const [undercoverActiveIdx, setUndercoverActiveIdx] = useState(0);
  const [undercoverWordRevealed, setUndercoverWordRevealed] = useState(false);
  const [undercoverCurrentTurn, setUndercoverCurrentTurn] = useState(1);
  const [undercoverSelectedDuo, setUndercoverSelectedDuo] = useState<UndercoverDuo | null>(null);
  
  // Game States (Classic & Career)
  const [mysteryPlayer, setMysteryPlayer] = useState<Player>(PLAYERS[0]);
  const [guesses, setGuesses] = useState<GuessResult[]>([]);
  const [careerGuesses, setCareerGuesses] = useState<Player[]>([]);
  
  // Quiz Game States
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);
  const [quizRoundHistory, setQuizRoundHistory] = useState<QuizHistoryItem[]>([]);
  const [isTransitioningQuestion, setIsTransitioningQuestion] = useState(false);

  // Search & input
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Player[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [gameStatus, setGameStatus] = useState<'PLAYING' | 'WON' | 'LOST'>('PLAYING');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [shakeInput, setShakeInput] = useState(false);
  const [initialClue, setInitialClue] = useState<string | null>(null);

  // Modals
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);

  // Stats State
  const [stats, setStats] = useState<GameStats>({
    played: 0,
    won: 0,
    streak: 0,
    maxStreak: 0,
    highScore: 0
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Helper to determine the storage key based on active mode & difficulty
  const getStatsKey = (
    mode: 'CLASSIC' | 'CAREER' | 'QUIZ' | 'UNDERCOVER' | null,
    classicDiff: 'SIMPLE' | 'HARD' | null,
    careerDiff: 'SIMPLE' | 'HARD' | null
  ) => {
    if (!mode) return 'footni_stats';
    if (mode === 'CLASSIC') {
      return classicDiff === 'SIMPLE' ? 'footni_classic_simple_stats' : 'footni_classic_hard_stats';
    } else if (mode === 'CAREER') {
      return careerDiff === 'SIMPLE' ? 'footni_career_simple_stats' : 'footni_career_hard_stats';
    } else if (mode === 'QUIZ') {
      return 'footni_quiz_stats';
    } else {
      return 'footni_undercover_stats';
    }
  };

  // Load stats dynamically when mode or difficulty changes
  useEffect(() => {
    if (gameMode === null) return;
    if (gameMode === 'CLASSIC' && difficulty === null) return;
    if (gameMode === 'CAREER' && careerDifficulty === null) return;
    if (gameMode === 'UNDERCOVER') return;

    const statsKey = getStatsKey(gameMode, difficulty, careerDifficulty);
    const savedStats = localStorage.getItem(statsKey);
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (e) {
        console.error("Failed to parse stats", e);
      }
    } else {
      setStats({ played: 0, won: 0, streak: 0, maxStreak: 0, highScore: 0 });
    }
  }, [gameMode, difficulty, careerDifficulty]);

  // Show help modal for first-time visitors
  useEffect(() => {
    const tutorialShown = localStorage.getItem('footni_tutorial_shown');
    if (!tutorialShown) {
      setShowHelpModal(true);
      localStorage.setItem('footni_tutorial_shown', 'true');
    }
  }, []);

  // Update suggestions when search query changes (Classic and Career modes)
  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setSuggestions([]);
      setHighlightedIndex(-1);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = PLAYERS.filter(player => {
      const isAlreadyGuessed = gameMode === 'CLASSIC'
        ? guesses.some(g => g.player.id === player.id)
        : careerGuesses.some(g => g.id === player.id);

      if (isAlreadyGuessed) return false;

      return (
        player.name.toLowerCase().includes(query) ||
        player.nationality.toLowerCase().includes(query) ||
        player.club.toLowerCase().includes(query) ||
        player.league.toLowerCase().includes(query)
      );
    });

    setSuggestions(filtered.slice(0, 6));
    setHighlightedIndex(-1);
  }, [searchQuery, guesses, careerGuesses, gameMode]);

  const startNewUndercoverGame = (samePlayers: boolean = false) => {
    // Pick a random duo
    const randomDuo = UNDERCOVER_DUOS[Math.floor(Math.random() * UNDERCOVER_DUOS.length)];
    setUndercoverSelectedDuo(randomDuo);

    // Pick one random player to be the Undercover
    const names = samePlayers 
      ? undercoverPlayers.map(p => p.name) 
      : undercoverNamesInput.filter(name => name.trim() !== '');

    const numPlayers = names.length;
    const undercoverIdx = Math.floor(Math.random() * numPlayers);

    const playersList: UndercoverPlayer[] = names.map((name, idx) => {
      const isUndercover = idx === undercoverIdx;
      return {
        id: String(idx + 1),
        name,
        role: isUndercover ? 'UNDERCOVER' : 'CIVIL',
        word: isUndercover ? randomDuo.undercover : randomDuo.civil,
        eliminated: false
      };
    });

    setUndercoverPlayers(playersList);
    setUndercoverActiveIdx(0);
    setUndercoverWordRevealed(false);
    setUndercoverCurrentTurn(1);
    setUndercoverPhase('DISTRIBUTION');
    setGameStatus('PLAYING');
  };

  const startNewGame = (
    resetStats: boolean = false, 
    chosenDifficulty: 'SIMPLE' | 'HARD' = difficulty || 'SIMPLE',
    chosenMode: 'CLASSIC' | 'CAREER' | 'QUIZ' = (gameMode === 'UNDERCOVER' ? null : gameMode) || 'CLASSIC',
    chosenCareerDifficulty: 'SIMPLE' | 'HARD' = careerDifficulty || 'SIMPLE'
  ) => {
    setGameMode(chosenMode);
    setGameStatus('PLAYING');
    setFeedbackMessage(null);
    setHighlightedIndex(-1);

    if (chosenMode === 'QUIZ') {
      // Pick 10 random questions and shuffle their choices
      const shuffled = [...QUIZ_QUESTIONS].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 10).map(q => ({
        ...q,
        options: [...q.options].sort(() => 0.5 - Math.random())
      }));
      setQuizQuestions(selected);
      setCurrentQuestionIdx(0);
      setQuizScore(0);
      setSelectedQuizAnswer(null);
      setQuizRoundHistory([]);
      setIsTransitioningQuestion(false);
      
      // Load Quiz stats
      const savedStats = localStorage.getItem('footni_quiz_stats');
      if (savedStats) {
        try {
          setStats(JSON.parse(savedStats));
        } catch (e) {}
      } else {
        setStats({ played: 0, won: 0, streak: 0, maxStreak: 0, highScore: 0 });
      }

      if (resetStats) {
        const emptyStats = { played: 0, won: 0, streak: 0, maxStreak: 0, highScore: 0 };
        setStats(emptyStats);
        localStorage.setItem('footni_quiz_stats', JSON.stringify(emptyStats));
      }
      return;
    }

    // Classic & Career setups
    let pool: Player[] = [];

    if (chosenMode === 'CLASSIC') {
      pool = chosenDifficulty === 'SIMPLE'
        ? PLAYERS.filter(p => p.isFamous)
        : PLAYERS.filter(p => !p.isFamous);
    } else {
      pool = chosenCareerDifficulty === 'SIMPLE'
        ? PLAYERS.filter(p => p.isFamous)
        : PLAYERS;
    }

    if (pool.length === 0) return;

    const randomIndex = Math.floor(Math.random() * pool.length);
    const chosenPlayer = pool[randomIndex];
    setMysteryPlayer(chosenPlayer);
    
    setGuesses([]);
    setCareerGuesses([]);
    setSearchQuery('');
    
    setDifficulty(chosenDifficulty);
    setCareerDifficulty(chosenCareerDifficulty);

    if (chosenMode === 'CLASSIC') {
      const clueTypes = ['club', 'number', 'age', 'nationality'];
      const selectedClueType = clueTypes[Math.floor(Math.random() * clueTypes.length)];
      let clueText = '';
      switch (selectedClueType) {
        case 'club':
          clueText = `Le joueur mystère joue au club : ${chosenPlayer.club}`;
          break;
        case 'number':
          clueText = `Le numéro de maillot du joueur mystère est : N° ${chosenPlayer.number}`;
          break;
        case 'age':
          clueText = `Le joueur mystère est âgé de : ${chosenPlayer.age} ans`;
          break;
        case 'nationality':
          clueText = `La nationalité du joueur mystère est : ${chosenPlayer.flag} ${chosenPlayer.nationality}`;
          break;
      }
      setInitialClue(clueText);
    } else {
      setInitialClue(null);
    }

    if (resetStats) {
      const emptyStats = { played: 0, won: 0, streak: 0, maxStreak: 0 };
      setStats(emptyStats);
      const statsKey = getStatsKey(chosenMode, chosenDifficulty, chosenCareerDifficulty);
      localStorage.setItem(statsKey, JSON.stringify(emptyStats));
    }
  };

  const getAttributeStatus = (
    type: 'age' | 'number' | 'height' | 'position',
    guessVal: number | string,
    mysteryVal: number | string,
    guessPlayer: Player
  ) => {
    if (guessVal === mysteryVal) return 'correct';

    if (type === 'age' || type === 'number') {
      const diff = Math.abs((guessVal as number) - (mysteryVal as number));
      return diff <= 2 ? 'partial' : 'incorrect';
    }

    if (type === 'height') {
      const diff = Math.abs((guessVal as number) - (mysteryVal as number));
      return diff <= 0.021 ? 'partial' : 'incorrect';
    }

    if (type === 'position') {
      return guessPlayer.category === mysteryPlayer.category ? 'partial' : 'incorrect';
    }

    return 'incorrect';
  };

  const computeGuessResult = (player: Player): GuessResult => {
    const nationalityStatus = player.nationality === mysteryPlayer.nationality ? 'correct' : 'incorrect';
    const leagueStatus = player.league === mysteryPlayer.league ? 'correct' : 'incorrect';
    const clubStatus = player.club === mysteryPlayer.club ? 'correct' : 'incorrect';

    const ageStatus = getAttributeStatus('age', player.age, mysteryPlayer.age, player) as 'correct' | 'partial' | 'incorrect';
    const ageArrow = mysteryPlayer.age > player.age ? 'up' : mysteryPlayer.age < player.age ? 'down' : undefined;

    const numberStatus = getAttributeStatus('number', player.number, mysteryPlayer.number, player) as 'correct' | 'partial' | 'incorrect';
    const numberArrow = mysteryPlayer.number > player.number ? 'up' : mysteryPlayer.number < player.number ? 'down' : undefined;

    const positionStatus = player.positionDetail === mysteryPlayer.positionDetail 
      ? 'correct' 
      : (player.category === mysteryPlayer.category ? 'partial' : 'incorrect');

    const heightStatus = getAttributeStatus('height', player.height, mysteryPlayer.height, player) as 'correct' | 'partial' | 'incorrect';
    const heightArrow = mysteryPlayer.height > player.height ? 'up' : mysteryPlayer.height < player.height ? 'down' : undefined;

    return {
      player,
      attributes: {
        nationality: { value: player.nationality, flag: player.flag, status: nationalityStatus },
        league: { value: player.league, status: leagueStatus },
        club: { value: player.club, status: clubStatus },
        age: { value: player.age, status: ageStatus, arrow: ageArrow },
        number: { value: player.number, status: numberStatus, arrow: numberArrow },
        position: { value: player.category, detail: player.positionDetail, status: positionStatus },
        height: { value: player.height, status: heightStatus, arrow: heightArrow }
      }
    };
  };

  const handleGuessSubmit = (player: Player) => {
    if (gameStatus !== 'PLAYING') return;

    if (gameMode === 'CLASSIC') {
      if (guesses.some(g => g.player.id === player.id)) {
        triggerFeedback("Ce joueur a déjà été tenté !");
        return;
      }

      const result = computeGuessResult(player);
      const newGuesses = [...guesses, result];
      setGuesses(newGuesses);
      setSearchQuery('');
      setSuggestions([]);

      if (player.id === mysteryPlayer.id) {
        setGameStatus('WON');
        triggerConfetti();
        updateStats(true);
      } else if (newGuesses.length >= 8) {
        setGameStatus('LOST');
        updateStats(false);
      } else {
        inputRef.current?.focus();
      }
    } else {
      if (careerGuesses.some(g => g.id === player.id)) {
        triggerFeedback("Ce joueur a déjà été tenté !");
        return;
      }

      const newGuesses = [...careerGuesses, player];
      setCareerGuesses(newGuesses);
      setSearchQuery('');
      setSuggestions([]);

      if (player.id === mysteryPlayer.id) {
        setGameStatus('WON');
        triggerConfetti();
        updateStats(true);
      } else if (newGuesses.length >= 6) {
        setGameStatus('LOST');
        updateStats(false);
      } else {
        inputRef.current?.focus();
      }
    }
  };

  const handleQuizAnswerSelect = (answer: string) => {
    if (isTransitioningQuestion || selectedQuizAnswer !== null) return;
    
    setSelectedQuizAnswer(answer);
    const activeQuestion = quizQuestions[currentQuestionIdx];
    const isCorrect = answer === activeQuestion.answer;
    
    let nextScore = quizScore;
    if (isCorrect) {
      nextScore += 1;
      setQuizScore(nextScore);
    }
    
    setQuizRoundHistory(prev => [...prev, {
      question: activeQuestion,
      chosen: answer,
      correct: isCorrect
    }]);

    setIsTransitioningQuestion(true);
    
    setTimeout(() => {
      if (currentQuestionIdx + 1 < 10) {
        setCurrentQuestionIdx(prev => prev + 1);
        setSelectedQuizAnswer(null);
        setIsTransitioningQuestion(false);
      } else {
        setGameStatus('WON');
        updateQuizStats(nextScore);
        setIsTransitioningQuestion(false);
      }
    }, 1500);
  };

  const updateQuizStats = (finalScore: number) => {
    const updatedStats = { ...stats };
    updatedStats.played += 1;
    if (finalScore >= 5) {
      updatedStats.won += 1;
    }
    if (finalScore > (updatedStats.highScore || 0)) {
      updatedStats.highScore = finalScore;
    }
    
    if (finalScore === 10) {
      updatedStats.streak += 1;
      if (updatedStats.streak > updatedStats.maxStreak) {
        updatedStats.maxStreak = updatedStats.streak;
      }
      triggerConfetti();
    } else {
      updatedStats.streak = 0;
    }
    
    setStats(updatedStats);
    localStorage.setItem('footni_quiz_stats', JSON.stringify(updatedStats));
    
    setTimeout(() => {
      setShowStatsModal(true);
    }, 1500);
  };

  const updateStats = (won: boolean) => {
    const updatedStats = { ...stats };
    updatedStats.played += 1;
    if (won) {
      updatedStats.won += 1;
      updatedStats.streak += 1;
      if (updatedStats.streak > updatedStats.maxStreak) {
        updatedStats.maxStreak = updatedStats.streak;
      }
    } else {
      updatedStats.streak = 0;
    }
    setStats(updatedStats);
    
    const statsKey = getStatsKey(gameMode, difficulty, careerDifficulty);
    localStorage.setItem(statsKey, JSON.stringify(updatedStats));
    
    setTimeout(() => {
      setShowStatsModal(true);
    }, 1500);
  };

  const triggerFeedback = (message: string) => {
    setFeedbackMessage(message);
    setShakeInput(true);
    setTimeout(() => setShakeInput(false), 500);
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#10b981', '#f59e0b', '#3b82f6'] });
      confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#10b981', '#f59e0b', '#3b82f6'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  const handleShare = () => {
    let shareText = '';

    if (gameMode === 'CLASSIC') {
      const emojis = guesses.map(guess => {
        const cellEmojis = [
          guess.attributes.nationality.status === 'correct' ? '🟩' : '🟥',
          guess.attributes.league.status === 'correct' ? '🟩' : '🟥',
          guess.attributes.club.status === 'correct' ? '🟩' : '🟥',
          guess.attributes.age.status === 'correct' ? '🟩' : guess.attributes.age.status === 'partial' ? '🟨' : '⬛',
          guess.attributes.number.status === 'correct' ? '🟩' : guess.attributes.number.status === 'partial' ? '🟨' : '⬛',
          guess.attributes.position.status === 'correct' ? '🟩' : guess.attributes.position.status === 'partial' ? '🟨' : '⬛',
          guess.attributes.height.status === 'correct' ? '🟩' : guess.attributes.height.status === 'partial' ? '🟨' : '⬛',
        ];
        return cellEmojis.join('');
      }).join('\n');

      shareText = `Footni ⚽ Mode Classique (${difficulty === 'SIMPLE' ? '🟢 Simple' : '🔴 Difficile'}) ${gameStatus === 'WON' ? guesses.length : 'X'}/8\n\n${emojis}\n\nJouez à Footni !`;
    } else if (gameMode === 'CAREER') {
      const emojis = careerGuesses.map(guess => {
        const matches = [
          guess.nationality === mysteryPlayer.nationality ? '🟩' : '🟥',
          guess.category === mysteryPlayer.category ? '🟩' : '🟥',
          guess.club === mysteryPlayer.club ? '🟩' : '🟥',
          guess.age === mysteryPlayer.age ? '🟩' : '🟥'
        ];
        return matches.join('');
      }).join('\n');

      shareText = `Footni ⚽ Mode Carrière (${careerDifficulty === 'SIMPLE' ? '🟢 Normal' : '🔴 Expert'}) 💡 ${gameStatus === 'WON' ? careerGuesses.length : 'X'}/6\n\n${emojis}\n\nJouez à Footni !`;
    } else {
      shareText = `Footni ⚽ Mode Quiz 🧠 Score : ${quizScore}/10\n\nJouez à Footni !`;
    }

    navigator.clipboard.writeText(shareText).then(() => {
      triggerFeedback("Copié dans le presse-papier !");
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  const getQuizRatingTitle = (score: number) => {
    if (score === 10) return { title: " Ballon d'Or Légendaire 👑", color: "text-amber-500" };
    if (score >= 8) return { title: "Cadre de l'Équipe 🏃", color: "text-emerald-600" };
    if (score >= 5) return { title: "Remplaçant de Luxe ⚽", color: "text-teal-600" };
    if (score >= 3) return { title: "Banc de Touche 🪑", color: "text-slate-500" };
    return { title: "Carton Rouge ❌", color: "text-rose-600" };
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        handleGuessSubmit(suggestions[highlightedIndex]);
      } else {
        const exactMatch = PLAYERS.find(p => p.name.toLowerCase() === searchQuery.trim().toLowerCase());
        if (exactMatch) {
          handleGuessSubmit(exactMatch);
        } else if (suggestions.length > 0) {
          handleGuessSubmit(suggestions[0]);
        } else {
          triggerFeedback("Joueur non trouvé dans la base de données.");
        }
      }
    } else if (e.key === 'Escape') {
      setSuggestions([]);
      setHighlightedIndex(-1);
    }
  };

  const getStatusColor = (status: 'correct' | 'partial' | 'incorrect') => {
    switch (status) {
      case 'correct':
        return 'bg-emerald-500 text-white border-emerald-400 font-bold shadow-[0_4px_12px_rgba(16,185,129,0.15)]';
      case 'partial':
        return 'bg-amber-400 text-slate-900 border-amber-300 font-bold shadow-[0_4px_12px_rgba(245,158,11,0.15)]';
      case 'incorrect':
      default:
        return 'bg-slate-200 text-slate-500 border-slate-300';
    }
  };

  // 1. GAME MODE SELECTION SPLASH SCREEN
  if (gameMode === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl text-center glass-panel animate-fade-in relative z-10">
          <span className="text-5xl mb-4 block animate-bounce">⚽</span>
          <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent mb-1">
            FOOTNI
          </h1>
          <p className="text-slate-500 text-[10px] uppercase tracking-widest font-extrabold mb-8">
            Devine le joueur mystère
          </p>

          <h2 className="text-lg font-bold text-slate-800 mb-6">
            Sélectionnez le mode de jeu :
          </h2>

          <div className="space-y-4">
            <button
              onClick={() => {
                setGameMode('CLASSIC');
                setDifficulty(null);
              }}
              className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold rounded-2xl shadow-md transition duration-200 text-left flex items-center justify-between group active:scale-[0.98]"
            >
              <div>
                <span className="block text-base font-black">Mode Classique 📊</span>
                <span className="block text-[11px] text-emerald-100 font-semibold mt-0.5">
                  Trouvez le joueur à l'aide de la grille de 7 indices.
                </span>
              </div>
              <span className="text-xl group-hover:translate-x-1.5 transition duration-200">➔</span>
            </button>

            <button
              onClick={() => {
                setGameMode('CAREER');
                setCareerDifficulty(null);
              }}
              className="w-full py-4 px-6 bg-purple-600 hover:bg-purple-500 text-white font-extrabold rounded-2xl shadow-md transition duration-200 text-left flex items-center justify-between group active:scale-[0.98]"
            >
              <div>
                <span className="block text-base font-black">Mode Carrière 🗂️</span>
                <span className="block text-[11px] text-purple-100 font-semibold mt-0.5">
                  Devinez le joueur grâce à la frise de sa carrière en clubs.
                </span>
              </div>
              <span className="text-xl group-hover:translate-x-1.5 transition duration-200">➔</span>
            </button>

            <button
              onClick={() => {
                startNewGame(false, 'SIMPLE', 'QUIZ');
              }}
              className="w-full py-4 px-6 bg-slate-800 hover:bg-slate-700 text-white font-extrabold rounded-2xl shadow-md transition duration-200 text-left flex items-center justify-between group active:scale-[0.98] border border-slate-700"
            >
              <div>
                <span className="block text-base font-black">Mode Quiz 🧠</span>
                <span className="block text-[11px] text-slate-350 font-semibold mt-0.5">
                  Testez vos connaissances en répondant à 10 questions de culture générale.
                </span>
              </div>
              <span className="text-xl group-hover:translate-x-1.5 transition duration-200">➔</span>
            </button>

            <button
              onClick={() => {
                setGameMode('UNDERCOVER');
                setUndercoverPhase('CONFIG');
                setUndercoverPlayers([]);
                setUndercoverNamesInput(['', '', '', '']);
              }}
              className="w-full py-4 px-6 bg-rose-600 hover:bg-rose-500 text-white font-extrabold rounded-2xl shadow-md transition duration-200 text-left flex items-center justify-between group active:scale-[0.98]"
            >
              <div>
                <span className="block text-base font-black">Football Undercover 🕵️‍♂️</span>
                <span className="block text-[11px] text-rose-100 font-semibold mt-0.5">
                  Démasquez l'intrus (Undercover) lors d'une partie locale en groupe !
                </span>
              </div>
              <span className="text-xl group-hover:translate-x-1.5 transition duration-200">➔</span>
            </button>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setShowHelpModal(true)}
              className="text-xs text-slate-500 hover:text-slate-800 font-bold transition duration-200 underline"
            >
              Comment jouer ?
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. DIFFICULTY SELECTION SCREEN FOR CLASSIC MODE
  if (gameMode === 'CLASSIC' && difficulty === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl text-center glass-panel animate-fade-in relative z-10">
          <button 
            onClick={() => setGameMode(null)}
            className="absolute top-4 left-4 text-xs font-bold text-slate-400 hover:text-slate-700 transition duration-200 flex items-center gap-1"
          >
            ← Retour
          </button>
          <span className="text-5xl mb-4 block">🟢</span>
          <h2 className="text-lg font-bold text-slate-800 mb-6 mt-4">
            Choisissez la difficulté (Mode Classique) :
          </h2>

          <div className="space-y-4">
            <button
              onClick={() => startNewGame(false, 'SIMPLE', 'CLASSIC')}
              className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold rounded-2xl shadow-md transition duration-200 text-left flex items-center justify-between group active:scale-[0.98]"
            >
              <div>
                <span className="block text-base font-black">Mode Simple 🟢</span>
                <span className="block text-[11px] text-emerald-100 font-semibold mt-0.5">Les 60 joueurs les plus connus du moment</span>
              </div>
              <span className="text-xl group-hover:translate-x-1.5 transition duration-200">➔</span>
            </button>

            <button
              onClick={() => startNewGame(false, 'HARD', 'CLASSIC')}
              className="w-full py-4 px-6 bg-slate-800 hover:bg-slate-700 text-white font-extrabold rounded-2xl shadow-md transition duration-200 text-left flex items-center justify-between group active:scale-[0.98] border border-slate-700"
            >
              <div>
                <span className="block text-base font-black">Mode Difficile 🔴</span>
                <span className="block text-[11px] text-slate-350 font-semibold mt-0.5">65 joueurs un peu plus niche et complexes</span>
              </div>
              <span className="text-xl group-hover:translate-x-1.5 transition duration-200">➔</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. DIFFICULTY SELECTION SCREEN FOR CAREER MODE
  if (gameMode === 'CAREER' && careerDifficulty === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl text-center glass-panel animate-fade-in relative z-10">
          <button 
            onClick={() => setGameMode(null)}
            className="absolute top-4 left-4 text-xs font-bold text-slate-400 hover:text-slate-700 transition duration-200 flex items-center gap-1"
          >
            ← Retour
          </button>
          <span className="text-5xl mb-4 block">🗂️</span>
          <h2 className="text-lg font-bold text-slate-800 mb-6 mt-4">
            Choisissez la difficulté (Mode Carrière) :
          </h2>

          <div className="space-y-4">
            <button
              onClick={() => startNewGame(false, 'SIMPLE', 'CAREER', 'SIMPLE')}
              className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold rounded-2xl shadow-md transition duration-200 text-left flex items-center justify-between group active:scale-[0.98]"
            >
              <div>
                <span className="block text-base font-black">Mode Normal 🟢</span>
                <span className="block text-[11px] text-emerald-100 font-semibold mt-0.5">
                  40 superstars. Tous les clubs de la carrière sont visibles.
                </span>
              </div>
              <span className="text-xl group-hover:translate-x-1.5 transition duration-200">➔</span>
            </button>

            <button
              onClick={() => startNewGame(false, 'SIMPLE', 'CAREER', 'HARD')}
              className="w-full py-4 px-6 bg-slate-800 hover:bg-slate-700 text-white font-extrabold rounded-2xl shadow-md transition duration-200 text-left flex items-center justify-between group active:scale-[0.98] border border-slate-700"
            >
              <div>
                <span className="block text-base font-black">Mode Expert 🔴</span>
                <span className="block text-[11px] text-slate-350 font-semibold mt-0.5 font-sans">
                  Sélectionné parmi l'ensemble des 125 joueurs (incluant de nombreux joueurs de niche).
                </span>
              </div>
              <span className="text-xl group-hover:translate-x-1.5 transition duration-200">➔</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4. MAIN GAME SCREEN
  const maxAttempts = gameMode === 'CLASSIC' ? 8 : 6;
  const currentAttempts = gameMode === 'CLASSIC' ? guesses.length : careerGuesses.length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-between pb-12">
      {/* Top Navigation Header */}
      <header className="w-full glass-panel border-b border-slate-200/80 py-4 px-6 sticky top-0 z-40 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => setShowHelpModal(true)} 
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-slate-800 transition duration-250"
            title="Règles du Jeu"
          >
            <HelpCircle className="w-6 h-6" />
          </button>
          
          <div className="flex flex-col items-center">
            <h1 className="text-3xl md:text-4xl font-black tracking-wider bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent flex items-center gap-1">
              FOOTNI <span className="text-2xl">⚽</span>
            </h1>
            
            {/* Mode & Switcher Badge */}
            <button
              onClick={() => {
                setGameMode(null);
                setDifficulty(null);
                setCareerDifficulty(null);
              }}
              className="mt-1 text-[9px] font-extrabold px-2.5 py-0.5 bg-slate-100/70 hover:bg-slate-200 text-slate-600 border border-slate-200 rounded-full flex items-center gap-1 transition duration-200 shadow-sm"
              title="Retourner au menu principal"
            >
              <span>Menu</span> • 
              <span className={
                gameMode === 'CLASSIC' ? 'text-emerald-600 font-extrabold' : 
                gameMode === 'CAREER' ? 'text-purple-600 font-extrabold' : 
                gameMode === 'UNDERCOVER' ? 'text-rose-600 font-extrabold' :
                'text-slate-700 font-extrabold'
              }>
                {gameMode === 'CLASSIC' 
                  ? `Classique (${difficulty === 'SIMPLE' ? 'Simple 🟢' : 'Difficile 🔴'})` 
                  : gameMode === 'CAREER'
                  ? `Carrière (${careerDifficulty === 'SIMPLE' ? 'Normal 🟢' : 'Expert 🔴'})`
                  : gameMode === 'UNDERCOVER'
                  ? 'Undercover 🕵️‍♂️'
                  : 'Quiz Culture 🧠'
                }
              </span>
            </button>
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            {gameMode !== 'UNDERCOVER' && (
              <button 
                onClick={() => setShowStatsModal(true)} 
                className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-slate-800 transition duration-250"
                title="Statistiques"
              >
                <Trophy className="w-6 h-6" />
              </button>
            )}
            <button 
              onClick={() => {
                if (gameMode === 'UNDERCOVER') {
                  startNewUndercoverGame(true);
                } else {
                  startNewGame(false);
                }
              }} 
              className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-slate-800 transition duration-250"
              title="Recommencer une partie"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl w-full px-4 flex-1 flex flex-col items-center mt-6">
        
        {/* Toast Notification Banner */}
        {feedbackMessage && (
          <div className="fixed top-20 z-50 bg-white border border-emerald-500 text-emerald-600 text-sm font-semibold py-2.5 px-6 rounded-full shadow-[0_10px_25px_rgba(16,185,129,0.2)] animate-fade-in flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>{feedbackMessage}</span>
          </div>
        )}

        {/* 5. QUIZ GAME SCREEN */}
        {gameMode === 'QUIZ' && (
          <div className="w-full max-w-xl flex flex-col items-center">
            {gameStatus === 'PLAYING' ? (
              <div className="w-full bg-white/85 p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl animate-fade-in relative z-10 text-slate-800">
                {/* Header question tracker */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs text-slate-500 uppercase tracking-widest font-black">
                    Quiz de Culture Générale
                  </span>
                  <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-mono text-xs font-bold border border-slate-200">
                    Q. {currentQuestionIdx + 1} / 10
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full mb-6 overflow-hidden border border-slate-200/50">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${(currentQuestionIdx + 1) * 10}%` }}
                  ></div>
                </div>

                {/* Question Text */}
                <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-8 leading-snug">
                  {quizQuestions[currentQuestionIdx]?.question}
                </h3>

                {/* Multiple Choice Options */}
                <div className="grid grid-cols-1 gap-3.5">
                  {quizQuestions[currentQuestionIdx]?.options.map((option, idx) => {
                    const isSelected = selectedQuizAnswer === option;
                    const isCorrect = option === quizQuestions[currentQuestionIdx].answer;
                    
                    let btnStyle = "bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold py-4 px-6 rounded-2xl shadow-sm text-left transition duration-200 active:scale-[0.98] w-full flex items-center justify-between text-sm md:text-base";
                    
                    if (selectedQuizAnswer !== null) {
                      if (isSelected) {
                        btnStyle = isCorrect
                          ? "bg-emerald-500 text-white border-emerald-400 font-black py-4 px-6 rounded-2xl shadow-md text-left w-full flex items-center justify-between text-sm md:text-base animate-pulse-glow"
                          : "bg-rose-500 text-white border-rose-400 font-black py-4 px-6 rounded-2xl shadow-md text-left w-full flex items-center justify-between text-sm md:text-base";
                      } else if (isCorrect) {
                        // Highlight the correct one
                        btnStyle = "bg-emerald-500 text-white border-emerald-400 font-black py-4 px-6 rounded-2xl shadow-md text-left w-full flex items-center justify-between text-sm md:text-base animate-pulse";
                      } else {
                        btnStyle = "bg-white/40 border border-slate-250/50 text-slate-400 py-4 px-6 rounded-2xl text-left w-full flex items-center justify-between text-sm md:text-base cursor-not-allowed opacity-50";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={selectedQuizAnswer !== null}
                        onClick={() => handleQuizAnswerSelect(option)}
                        className={btnStyle}
                      >
                        <span>{option}</span>
                        {selectedQuizAnswer !== null && isSelected && (
                          <span className="font-extrabold text-xs">
                            {isCorrect ? '✅' : '❌'}
                          </span>
                        )}
                        {selectedQuizAnswer !== null && !isSelected && isCorrect && (
                          <span className="font-extrabold text-xs">✔</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Quiz Finished Scorecard */
              <div className="w-full bg-white/85 p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl animate-fade-in relative z-10 text-slate-800">
                <div className="text-center mb-6">
                  <span className="text-5xl mb-4 block animate-bounce">🏆</span>
                  <h2 className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                    Quiz Terminé !
                  </h2>
                  
                  {/* Rating description */}
                  <div className={`mt-3 text-lg font-black ${getQuizRatingTitle(quizScore).color}`}>
                    {getQuizRatingTitle(quizScore).title}
                  </div>
                </div>

                {/* Circular Score display */}
                <div className="flex justify-center my-6">
                  <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 border-4 border-emerald-500/20 flex flex-col items-center justify-center shadow-inner">
                    <span className="text-4xl font-black text-slate-800 font-mono">{quizScore}</span>
                    <span className="text-xs text-slate-400 uppercase font-black tracking-widest mt-1">/ 10</span>
                  </div>
                </div>

                {/* Score commentary */}
                <p className="text-slate-600 text-center font-medium text-sm mb-6 max-w-sm mx-auto">
                  {quizScore === 10 
                    ? "Incroyable ! Vous avez un niveau de culture football digne d'une encyclopédie !" 
                    : quizScore >= 7
                    ? "Félicitations ! Vous connaissez très bien le football mondial."
                    : quizScore >= 5
                    ? "Pas mal ! Vous passez la moyenne, mais quelques entraînements s'imposent."
                    : "Entraînez-vous encore un peu pour éviter le banc de touche !"
                  }
                </p>

                {/* Action CTAs */}
                <div className="flex gap-4 mb-8">
                  <button
                    onClick={handleShare}
                    className="flex-1 py-3 px-4 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow border border-slate-200"
                  >
                    <Share2 className="w-5 h-5 text-slate-500" />
                    Partager le score
                  </button>
                  <button
                    onClick={() => startNewGame(false, 'SIMPLE', 'QUIZ')}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-md"
                  >
                    <RotateCcw className="w-5 h-5 text-white" />
                    Rejouer
                  </button>
                </div>

                {/* Review Question List */}
                <div className="border-t border-slate-100 pt-6">
                  <h3 className="text-xs text-slate-500 uppercase tracking-widest font-black mb-4 px-1">
                    Récapitulatif des questions :
                  </h3>
                  <div className="space-y-4 max-h-[30vh] overflow-y-auto pr-1">
                    {quizRoundHistory.map((item, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 border border-slate-150 rounded-xl text-xs space-y-1.5 shadow-sm">
                        <div className="flex justify-between items-start gap-2">
                          <span className="font-bold text-slate-700">Q{idx + 1}. {item.question.question}</span>
                          <span className="font-bold font-mono shrink-0">
                            {item.correct ? '✅ +1' : '❌ +0'}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1 text-[11px] text-slate-500">
                          <div>Votre réponse : <span className={item.correct ? 'text-emerald-600 font-extrabold' : 'text-rose-500 font-extrabold'}>{item.chosen}</span></div>
                          {!item.correct && (
                            <div>Bonne réponse : <span className="text-emerald-600 font-extrabold">{item.question.answer}</span></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* UNDERCOVER GAME SCREEN */}
        {gameMode === 'UNDERCOVER' && (
          <div className="w-full max-w-xl flex flex-col items-center">
            {undercoverPhase === 'CONFIG' && (
              <div className="w-full bg-white/90 p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl animate-fade-in relative z-10 text-slate-800">
                <div className="text-center mb-6">
                  <span className="text-5xl mb-4 block animate-bounce">🕵️‍♂️</span>
                  <h2 className="text-3xl font-black bg-gradient-to-r from-rose-600 to-amber-500 bg-clip-text text-transparent">
                    Football Undercover
                  </h2>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-extrabold mt-1">
                    Multijoueur Local (Pass-and-Play)
                  </p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Nombre de joueurs : <span className="text-rose-600 font-black">{undercoverNamesInput.length}</span>
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      disabled={undercoverNamesInput.length <= 3}
                      onClick={() => {
                        if (undercoverNamesInput.length > 3) {
                          setUndercoverNamesInput(prev => prev.slice(0, -1));
                        }
                      }}
                      className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-black text-xl transition shadow-sm border border-slate-200"
                    >
                      -
                    </button>
                    <div className="flex-1 text-center font-mono text-lg font-black text-slate-800 py-2.5 bg-slate-50 border border-slate-200 rounded-xl shadow-inner">
                      {undercoverNamesInput.length} joueurs
                    </div>
                    <button
                      disabled={undercoverNamesInput.length >= 10}
                      onClick={() => {
                        if (undercoverNamesInput.length < 10) {
                          setUndercoverNamesInput(prev => [...prev, '']);
                        }
                      }}
                      className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-black text-xl transition shadow-sm border border-slate-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="space-y-3 mb-6 max-h-[30vh] overflow-y-auto pr-1">
                  <span className="block text-xs uppercase tracking-widest text-slate-400 font-extrabold px-1">
                    Prénoms des participants :
                  </span>
                  {undercoverNamesInput.map((name, idx) => (
                    <div key={idx} className="relative flex items-center">
                      <span className="absolute left-3.5 text-xs font-mono font-bold text-slate-400">
                        P{idx + 1}
                      </span>
                      <input
                        type="text"
                        value={name}
                        placeholder={`Joueur ${idx + 1}`}
                        onChange={(e) => {
                          const updated = [...undercoverNamesInput];
                          updated[idx] = e.target.value;
                          setUndercoverNamesInput(updated);
                        }}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-slate-800 rounded-xl outline-none transition placeholder-slate-400 font-semibold text-sm"
                      />
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    const emptyFields = undercoverNamesInput.some(name => name.trim() === '');
                    if (emptyFields) {
                      triggerFeedback("Veuillez remplir tous les prénoms !");
                      return;
                    }
                    startNewUndercoverGame(false);
                  }}
                  className="w-full py-4 bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-black rounded-2xl shadow-md active:scale-95 transition flex items-center justify-center gap-2"
                >
                  <span>Lancer la partie 🚀</span>
                </button>
              </div>
            )}

            {undercoverPhase === 'DISTRIBUTION' && (
              <div className="w-full bg-white/90 p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl animate-fade-in relative z-10 text-slate-800 text-center">
                <div className="mb-6">
                  <span className="text-xs uppercase tracking-widest text-rose-600 font-extrabold bg-rose-50 border border-rose-100 px-3 py-1 rounded-full">
                    Phase de Distribution
                  </span>
                  <h3 className="text-2xl font-black text-slate-800 mt-4">
                    C'est au tour de :
                  </h3>
                  <div className="mt-2 text-3xl font-black text-rose-600 animate-pulse">
                    {undercoverPlayers[undercoverActiveIdx]?.name}
                  </div>
                </div>

                <div className="my-8 flex justify-center">
                  {!undercoverWordRevealed ? (
                    <div className="w-64 h-40 bg-gradient-to-tr from-slate-800 to-slate-700 rounded-2xl border border-slate-600 flex flex-col items-center justify-center shadow-lg relative overflow-hidden group">
                      <div className="absolute inset-0 bg-slate-900/10 hover:bg-transparent transition duration-200"></div>
                      <span className="text-5xl mb-2">🤫</span>
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Mot Caché</span>
                    </div>
                  ) : (
                    <div className="w-64 h-40 bg-gradient-to-tr from-rose-50 to-amber-50 rounded-2xl border-2 border-rose-300 flex flex-col items-center justify-center shadow-inner relative overflow-hidden animate-flip-in">
                      <span className="text-[10px] text-rose-500 font-black uppercase tracking-widest mb-1.5">Votre joueur de foot secret :</span>
                      <span className="text-2xl font-black text-slate-800 px-4 line-clamp-2">
                        {undercoverPlayers[undercoverActiveIdx]?.word}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {!undercoverWordRevealed ? (
                    <button
                      onClick={() => setUndercoverWordRevealed(true)}
                      className="w-full py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-extrabold rounded-2xl shadow-md transition duration-150 active:scale-95"
                    >
                      Appuie pour voir ton joueur 👀
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setUndercoverWordRevealed(false);
                        if (undercoverActiveIdx + 1 < undercoverPlayers.length) {
                          setUndercoverActiveIdx(prev => prev + 1);
                        } else {
                          setUndercoverPhase('GAMEPLAY');
                          setUndercoverCurrentTurn(1);
                        }
                      }}
                      className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-extrabold rounded-2xl shadow-md transition duration-150 active:scale-95"
                    >
                      Cacher et passer au suivant ➔
                    </button>
                  )}
                </div>

                <div className="mt-6 text-[10px] text-slate-400 font-bold tracking-wider uppercase">
                  Joueur {undercoverActiveIdx + 1} / {undercoverPlayers.length}
                </div>
              </div>
            )}

            {undercoverPhase === 'GAMEPLAY' && (
              <div className="w-full bg-white/90 p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl animate-fade-in relative z-10 text-slate-800">
                <div className="text-center mb-6">
                  <span className="text-xs uppercase tracking-widest text-emerald-600 font-extrabold bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                    Phase de Débat
                  </span>
                  <h3 className="text-3xl font-black text-slate-800 mt-4">
                    Tour {undercoverCurrentTurn} / 3
                  </h3>
                </div>

                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl mb-8 space-y-3.5">
                  <h4 className="font-extrabold text-sm text-slate-700 flex items-center gap-1.5">
                    <span>📢</span> Règles du Débat :
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    À chaque tour, chaque joueur à voix haute doit donner **un seul mot** (ou un indice très court) pour décrire son joueur de foot secret.
                  </p>
                  <p className="text-xs text-rose-500 font-bold leading-relaxed">
                    Attention : les civils décrivent le même joueur, tandis que l'Undercover en décrit un légèrement différent. Ne soyez ni trop vague ni trop précis !
                  </p>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => {
                      if (undercoverCurrentTurn < 3) {
                        setUndercoverCurrentTurn(prev => prev + 1);
                      } else {
                        setUndercoverPhase('VOTING');
                      }
                    }}
                    className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black rounded-2xl shadow-md transition duration-150 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>
                      {undercoverCurrentTurn < 3 ? 'Passer au tour suivant ➔' : 'Passer au vote final 🗳️'}
                    </span>
                  </button>
                </div>
              </div>
            )}

            {undercoverPhase === 'VOTING' && (
              <div className="w-full bg-white/90 p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl animate-fade-in relative z-10 text-slate-800">
                <div className="text-center mb-6">
                  <span className="text-xs uppercase tracking-widest text-rose-600 font-extrabold bg-rose-50 border border-rose-100 px-3 py-1 rounded-full">
                    Le Vote Final
                  </span>
                  <h3 className="text-2xl font-black text-slate-800 mt-4">
                    Qui est l'Undercover ?
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold mt-1">
                    Éliminez le joueur suspecté par le groupe en cliquant sur son nom.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {undercoverPlayers.map((player) => (
                    <button
                      key={player.id}
                      onClick={() => {
                        if (confirm(`Éliminer ${player.name} et voir le résultat ?`)) {
                          const updated = undercoverPlayers.map(p => {
                            if (p.id === player.id) {
                              return { ...p, eliminated: true };
                            }
                            return p;
                          });
                          setUndercoverPlayers(updated);
                          setUndercoverPhase('REVEAL');
                          
                          if (player.role === 'UNDERCOVER') {
                            setGameStatus('WON');
                            triggerConfetti();
                          } else {
                            setGameStatus('LOST');
                          }
                        }
                      }}
                      className="p-4 bg-slate-50 hover:bg-rose-50 hover:text-rose-600 border border-slate-200 hover:border-rose-300 font-extrabold rounded-2xl transition duration-200 flex flex-col items-center justify-center gap-1.5 shadow-sm text-slate-700"
                    >
                      <span className="text-xl">👤</span>
                      <span className="text-sm line-clamp-1">{player.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {undercoverPhase === 'REVEAL' && (
              <div className="w-full bg-white/90 p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl animate-fade-in relative z-10 text-slate-800 text-center">
                <div className="mb-6">
                  {gameStatus === 'WON' ? (
                    <div>
                      <span className="text-5xl block animate-bounce">🏆</span>
                      <h3 className="text-3xl font-black text-emerald-600 mt-3">
                        Victoire des Civils ! 🎉
                      </h3>
                      <p className="text-sm text-slate-500 mt-1 font-medium">
                        Vous avez démasqué le bon Undercover !
                      </p>
                    </div>
                  ) : (
                    <div>
                      <span className="text-5xl block animate-pulse">🕵️‍♂️</span>
                      <h3 className="text-3xl font-black text-rose-600 mt-3">
                        L'Undercover a gagné ! 🤫
                      </h3>
                      <p className="text-sm text-slate-500 mt-1 font-medium">
                        L'Undercover a réussi à vous tromper !
                      </p>
                    </div>
                  )}
                  {undercoverSelectedDuo && (
                    <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600">
                      Ce tour opposait <span className="text-emerald-600 font-extrabold">{undercoverSelectedDuo.civil}</span> (Civils) contre <span className="text-rose-600 font-extrabold">{undercoverSelectedDuo.undercover}</span> (Undercover)
                    </div>
                  )}
                </div>

                <div className="space-y-4 mb-8 text-left">
                  <h4 className="text-xs uppercase tracking-widest text-slate-400 font-extrabold px-1">
                    Mots Secrets Révélés :
                  </h4>
                  
                  {undercoverPlayers.map(p => {
                    const isUndercover = p.role === 'UNDERCOVER';
                    const wasCorrectlyEliminated = isUndercover && p.eliminated;
                    
                    let cardBg = "bg-slate-50 border-slate-200";
                    let roleText = "Civil";
                    let roleColor = "text-emerald-600 bg-emerald-50 border-emerald-200";
                    
                    if (isUndercover) {
                      roleText = "Undercover";
                      roleColor = "text-rose-600 bg-rose-50 border-rose-200";
                      cardBg = wasCorrectlyEliminated 
                        ? "bg-emerald-50/40 border-emerald-200 border-2"
                        : "bg-rose-50/40 border-rose-200 border-2";
                    } else if (p.eliminated) {
                      cardBg = "bg-rose-50/10 border-slate-200 opacity-60";
                    }

                    return (
                      <div key={p.id} className={`p-4 rounded-xl border flex items-center justify-between shadow-sm transition ${cardBg}`}>
                        <div className="flex items-center gap-3">
                          <span className="text-xl">
                            {isUndercover ? '🕵️‍♂️' : p.eliminated ? '🪦' : '👤'}
                          </span>
                          <div>
                            <span className="font-extrabold text-sm block text-slate-800">
                              {p.name} {p.eliminated && <span className="text-[10px] text-rose-500 font-bold uppercase ml-1">(Éliminé)</span>}
                            </span>
                            <span className="text-xs text-slate-500 font-medium">
                              Mot : <strong className="text-slate-800 font-black">{p.word}</strong>
                            </span>
                          </div>
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${roleColor}`}>
                          {roleText}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setUndercoverPhase('CONFIG')}
                    className="flex-1 py-3 px-4 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow border border-slate-200"
                  >
                    Nouveaux joueurs
                  </button>
                  <button
                    onClick={() => startNewUndercoverGame(true)}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-md"
                  >
                    <RotateCcw className="w-5 h-5 text-white" />
                    Rejouer (mêmes joueurs)
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Regular Game Over Spotlights (Classic & Career only) */}
        {gameMode !== 'QUIZ' && gameMode !== 'UNDERCOVER' && gameStatus !== 'PLAYING' && (
          <div className="w-full max-w-xl mb-6 p-6 rounded-2xl glass-panel border border-slate-200/80 animate-fade-in relative z-10 shadow-xl text-slate-800">
            <div className="text-center mb-6">
              {gameStatus === 'WON' ? (
                <div>
                  <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-600 mb-3 border border-emerald-500/20 animate-pulse-glow">
                    <Trophy className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-emerald-600">
                    Victoire ! 🎉
                  </h2>
                  <p className="text-slate-600 mt-2 font-medium">
                    Vous avez démasqué le joueur en <span className="text-emerald-600 font-black font-mono text-lg">{currentAttempts}</span> {currentAttempts > 1 ? 'tentatives' : 'tentative'} !
                  </p>
                </div>
              ) : (
                <div>
                  <div className="inline-flex p-3 rounded-full bg-rose-500/10 text-rose-600 mb-3 border border-rose-500/20">
                    <X className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-rose-600">
                    Défaite ! 🔍
                  </h2>
                  <p className="text-slate-600 mt-2 font-medium">
                    Vous n'avez pas trouvé le joueur mystère après {maxAttempts} tentatives.
                  </p>
                </div>
              )}
            </div>

            {/* Spotlight Card */}
            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100/80 flex items-center justify-between gap-4 mb-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500/15 to-teal-500/15 border border-emerald-500/20 flex items-center justify-center text-3xl font-bold text-emerald-600 shadow-inner">
                  {mysteryPlayer.flag}
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-emerald-600 font-extrabold block">Le joueur mystère était</span>
                  <h3 className="text-xl font-extrabold text-slate-800 mt-0.5">{mysteryPlayer.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    {mysteryPlayer.club} • {mysteryPlayer.league}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold px-2 py-1 bg-white text-emerald-600 border border-emerald-200 rounded-lg shadow-sm">
                  {mysteryPlayer.category} ({mysteryPlayer.positionDetail})
                </span>
                <div className="text-xs text-slate-500 mt-2 font-bold">
                  {mysteryPlayer.age} ans • {mysteryPlayer.height}m
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex gap-4">
              <button
                onClick={handleShare}
                className="flex-1 py-3 px-4 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow border border-slate-200"
              >
                <Share2 className="w-5 h-5 text-slate-500" />
                Partager
              </button>
              <button
                onClick={() => startNewGame(false)}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-md"
              >
                <RotateCcw className="w-5 h-5 text-white" />
                Rejouer
              </button>
            </div>
          </div>
        )}

        {/* Regular Playing Inputs (Classic & Career only) */}
        {gameMode !== 'QUIZ' && gameMode !== 'UNDERCOVER' && gameStatus === 'PLAYING' && (
          <div className="w-full max-w-lg mb-6 relative z-30 animate-fade-in">
            <div className="flex items-center justify-between mb-2 px-1 text-xs text-slate-600 font-semibold">
              <span>
                {gameMode === 'CLASSIC' 
                  ? "Devinez le joueur à l'aide des colonnes d'indices" 
                  : "Étudiez le parcours de clubs ci-dessous pour deviner le joueur"
                }
              </span>
              <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-mono border border-emerald-100 shadow-sm">
                Tentative {currentAttempts + 1} / {maxAttempts}
              </span>
            </div>

            <div className={`relative flex gap-2 ${shakeInput ? 'animate-shake' : ''}`}>
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Rechercher un joueur (ex: Haaland, Mbappé...)"
                  className="w-full pl-11 pr-4 py-3 bg-white/95 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-800 rounded-xl shadow-md outline-none transition duration-200 placeholder-slate-400 font-semibold"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              <button
                onClick={() => {
                  if (suggestions.length > 0 && highlightedIndex >= 0) {
                    handleGuessSubmit(suggestions[highlightedIndex]);
                  } else {
                    const exactMatch = PLAYERS.find(p => p.name.toLowerCase() === searchQuery.trim().toLowerCase());
                    if (exactMatch) {
                      handleGuessSubmit(exactMatch);
                    } else if (suggestions.length > 0) {
                      handleGuessSubmit(suggestions[0]);
                    } else {
                      triggerFeedback("Entrez un joueur valide !");
                    }
                  }
                }}
                className="px-5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold rounded-xl shadow-md active:scale-95 transition duration-150 flex items-center justify-center gap-1"
              >
                Valider
              </button>
            </div>

            {/* Suggestions list */}
            {suggestions.length > 0 && (
              <div 
                ref={suggestionsRef}
                className="absolute w-full mt-2 bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-2xl z-50 glass-panel animate-fade-in"
              >
                {suggestions.map((player, idx) => (
                  <div
                    key={player.id}
                    onClick={() => handleGuessSubmit(player)}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    className={`flex items-center justify-between px-4 py-3 cursor-pointer transition duration-150 border-b border-slate-100 last:border-0 ${
                      idx === highlightedIndex ? 'bg-slate-50 text-slate-900' : 'text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl leading-none" role="img" aria-label={player.nationality}>
                        {player.flag}
                      </span>
                      <div>
                        <span className="font-bold block text-slate-800">{player.name}</span>
                        <span className="text-xs text-slate-500 block mt-0.5 font-medium">
                          {player.club} • {player.league}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-emerald-600 border border-slate-200 rounded">
                        {player.category}
                      </span>
                      <span className="text-xs text-slate-500 font-bold">
                        {player.age} ans
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 6. MODE CLASSIC PLAYING: GRID */}
        {gameMode === 'CLASSIC' && (
          <div className="w-full flex flex-col items-center">
            {gameStatus === 'PLAYING' && initialClue && (
              <div className="w-full max-w-lg mb-6 p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-800 text-sm font-bold text-center shadow-sm animate-fade-in flex items-center justify-center gap-2">
                <span className="text-lg leading-none">💡</span>
                <span><strong>Indice de départ :</strong> {initialClue}</span>
              </div>
            )}

            <div className="w-full mb-2 grid grid-cols-7 gap-2 px-1 text-center font-bold text-[10px] md:text-xs text-slate-500 uppercase tracking-wider">
              <div className="flex flex-col items-center justify-center py-1.5 bg-white/40 rounded-lg border border-slate-200/50 shadow-sm">
                <span className="hidden md:inline">Nationalité</span>
                <span className="md:hidden">🌍 Nat</span>
              </div>
              <div className="flex flex-col items-center justify-center py-1.5 bg-white/40 rounded-lg border border-slate-200/50 shadow-sm">
                <span className="hidden md:inline">Ligue</span>
                <span className="md:hidden">🏆 Lig</span>
              </div>
              <div className="flex flex-col items-center justify-center py-1.5 bg-white/40 rounded-lg border border-slate-200/50 shadow-sm">
                <span className="hidden md:inline">Club</span>
                <span className="md:hidden">🛡️ Club</span>
              </div>
              <div className="flex flex-col items-center justify-center py-1.5 bg-white/40 rounded-lg border border-slate-200/50 shadow-sm">
                <span className="hidden md:inline">Âge</span>
                <span className="md:hidden">🎂 Âge</span>
              </div>
              <div className="flex flex-col items-center justify-center py-1.5 bg-white/40 rounded-lg border border-slate-200/50 shadow-sm">
                <span className="hidden md:inline">Maillot</span>
                <span className="md:hidden">👕 N°</span>
              </div>
              <div className="flex flex-col items-center justify-center py-1.5 bg-white/40 rounded-lg border border-slate-200/50 shadow-sm">
                <span className="hidden md:inline">Poste</span>
                <span className="md:hidden">🏃 Pos</span>
              </div>
              <div className="flex flex-col items-center justify-center py-1.5 bg-white/40 rounded-lg border border-slate-200/50 shadow-sm">
                <span className="hidden md:inline">Taille</span>
                <span className="md:hidden">📏 Ht</span>
              </div>
            </div>

            <div className="w-full flex-1 flex flex-col gap-4 overflow-y-auto max-h-[50vh] pr-1">
              {guesses.map((guess, guessIdx) => (
                <div key={guess.player.id} className="w-full bg-white/70 p-2.5 rounded-2xl border border-slate-200/60 shadow-sm">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2 px-1">
                    <span>
                      Tentative #{guesses.length - guessIdx} : <span className="text-slate-800 font-extrabold">{guess.player.name}</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">
                      {guess.player.flag} {guess.player.club}
                    </span>
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    <div className={`aspect-square flex flex-col items-center justify-center p-1 rounded-xl border text-center relative overflow-hidden transition-all duration-300 animate-flip-in ${getStatusColor(guess.attributes.nationality.status)}`}>
                      <span className="text-2xl md:text-3xl leading-none block mb-0.5">{guess.attributes.nationality.flag}</span>
                      <span className="text-[8px] md:text-[10px] font-semibold leading-tight line-clamp-1 hidden md:block">
                        {guess.attributes.nationality.value}
                      </span>
                    </div>

                    <div className={`aspect-square flex flex-col items-center justify-center p-1 rounded-xl border text-center relative overflow-hidden transition-all duration-300 animate-flip-in animation-delay-1 ${getStatusColor(guess.attributes.league.status)}`}>
                      <span className="text-[10px] md:text-sm font-extrabold text-center leading-tight break-all line-clamp-2">
                        {guess.attributes.league.value}
                      </span>
                    </div>

                    <div className={`aspect-square flex flex-col items-center justify-center p-1 rounded-xl border text-center relative overflow-hidden transition-all duration-300 animate-flip-in animation-delay-2 ${getStatusColor(guess.attributes.club.status)}`}>
                      <span className="text-[10px] md:text-sm font-extrabold text-center leading-tight break-all line-clamp-2">
                        {guess.attributes.club.value}
                      </span>
                    </div>

                    <div className={`aspect-square flex flex-col items-center justify-center p-1 rounded-xl border text-center relative overflow-hidden transition-all duration-300 animate-flip-in animation-delay-3 ${getStatusColor(guess.attributes.age.status)}`}>
                      <div className="flex items-center justify-center gap-0.5">
                        <span className="text-xs md:text-lg font-black font-mono">{guess.attributes.age.value}</span>
                        {guess.attributes.age.arrow && (
                          <span className="text-xs">
                            {guess.attributes.age.arrow === 'up' ? <ArrowUp className="w-3.5 h-3.5 text-current stroke-[3.5]" /> : <ArrowDown className="w-3.5 h-3.5 text-current stroke-[3.5]" />}
                          </span>
                        )}
                      </div>
                      <span className="text-[8px] md:text-[9px] uppercase tracking-wider font-semibold opacity-80 hidden md:block">ans</span>
                    </div>

                    <div className={`aspect-square flex flex-col items-center justify-center p-1 rounded-xl border text-center relative overflow-hidden transition-all duration-350 animate-flip-in animation-delay-4 ${getStatusColor(guess.attributes.number.status)}`}>
                      <div className="flex items-center justify-center gap-0.5">
                        <span className="text-xs md:text-lg font-black font-mono">N° {guess.attributes.number.value}</span>
                        {guess.attributes.number.arrow && (
                          <span className="text-xs">
                            {guess.attributes.number.arrow === 'up' ? <ArrowUp className="w-3.5 h-3.5 text-current stroke-[3.5]" /> : <ArrowDown className="w-3.5 h-3.5 text-current stroke-[3.5]" />}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className={`aspect-square flex flex-col items-center justify-center p-1 rounded-xl border text-center relative overflow-hidden transition-all duration-300 animate-flip-in animation-delay-5 ${getStatusColor(guess.attributes.position.status)}`}>
                      <span className="text-xs md:text-lg font-black block leading-none">{guess.attributes.position.value}</span>
                      <span className="text-[7px] md:text-[9px] font-bold leading-none block mt-1 line-clamp-1 opacity-90">
                        {guess.attributes.position.detail}
                      </span>
                    </div>

                    <div className={`aspect-square flex flex-col items-center justify-center p-1 rounded-xl border text-center relative overflow-hidden transition-all duration-300 animate-flip-in animation-delay-6 ${getStatusColor(guess.attributes.height.status)}`}>
                      <div className="flex items-center justify-center gap-0.5">
                        <span className="text-xs md:text-base font-black font-mono">{guess.attributes.height.value}m</span>
                        {guess.attributes.height.arrow && (
                          <span className="text-xs">
                            {guess.attributes.height.arrow === 'up' ? <ArrowUp className="w-3.5 h-3.5 text-current stroke-[3.5]" /> : <ArrowDown className="w-3.5 h-3.5 text-current stroke-[3.5]" />}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {guesses.length < 8 && gameStatus === 'PLAYING' && (
                Array.from({ length: 8 - guesses.length }).map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`w-full h-[116px] rounded-2xl border border-dashed flex flex-col items-center justify-center text-xs transition duration-200 select-none ${
                      idx === 0 
                        ? 'border-slate-300 bg-white/30 text-slate-400 font-bold' 
                        : 'border-slate-200/50 bg-transparent text-slate-300'
                    }`}
                  >
                    {idx === 0 ? `Tentative #${guesses.length + 1}` : ''}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* 7. MODE CAREER PLAYING: TIMELINE */}
        {gameMode === 'CAREER' && (
          <div className="w-full max-w-xl flex flex-col items-center">
            
            {/* Timeline */}
            <div className="w-full bg-white/85 p-6 rounded-2xl border border-slate-200 shadow-lg mb-6 animate-fade-in relative">
              <span className="absolute -top-3.5 left-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase shadow">
                Parcours du Joueur Mystère
              </span>
              
              <div className="relative pl-6 border-l-2 border-dashed border-purple-300/80 space-y-5 py-2 text-slate-800">
                {mysteryPlayer.career?.map((step, idx) => (
                  <div key={idx} className="relative flex items-center gap-3 animate-fade-in animate-duration-300" style={{ animationDelay: `${idx * 150}ms` }}>
                    <div className="absolute -left-[32px] w-[14px] h-[14px] bg-purple-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>

                    <span className="text-xl leading-none select-none" role="img" aria-label="league flag">
                      {step.flag}
                    </span>
                    <div className="flex-1 flex justify-between items-baseline gap-2">
                      <span className="font-extrabold text-slate-800 text-sm md:text-base">{step.club}</span>
                      <span className="text-xs md:text-sm font-bold text-slate-400 font-mono ml-auto flex-shrink-0">{step.years}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* List of career guesses */}
            {careerGuesses.length > 0 && (
              <div className="w-full space-y-3 mt-2 mb-4 max-h-[35vh] overflow-y-auto pr-1">
                <h3 className="text-xs text-slate-500 font-extrabold uppercase tracking-widest px-1">Essais précédents :</h3>
                {careerGuesses.map((guess, idx) => {
                  const isNationalityMatch = guess.nationality === mysteryPlayer.nationality;
                  const isPositionMatch = guess.category === mysteryPlayer.category;
                  const isClubMatch = guess.club === mysteryPlayer.club;
                  const isAgeMatch = guess.age === mysteryPlayer.age;

                  return (
                    <div 
                      key={guess.id} 
                      className="flex items-center justify-between p-3.5 bg-white/80 border border-slate-200/80 rounded-xl shadow-sm animate-fade-in last:border-purple-300 last:bg-purple-50/20"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs text-slate-400 font-extrabold font-mono">#{careerGuesses.length - idx}</span>
                        <span className="text-slate-800 font-black text-sm md:text-base">{guess.name}</span>
                        <span className="text-[10px] text-slate-400 font-bold block md:inline mt-0.5 md:mt-0">
                          ({guess.flag} {guess.club} • {guess.age} ans)
                        </span>
                      </div>
                      
                      <div className="flex gap-1 flex-wrap justify-end max-w-[45%]">
                        {isNationalityMatch && (
                          <span className="text-[8px] md:text-[9px] font-extrabold px-1.5 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded">
                            Pays 🌍
                          </span>
                        )}
                        {isPositionMatch && (
                          <span className="text-[8px] md:text-[9px] font-extrabold px-1.5 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded">
                            Poste 🏃
                          </span>
                        )}
                        {isClubMatch && (
                          <span className="text-[8px] md:text-[9px] font-extrabold px-1.5 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded">
                            Club 🛡️
                          </span>
                        )}
                        {isAgeMatch && (
                          <span className="text-[8px] md:text-[9px] font-extrabold px-1.5 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded">
                            Âge 🎂
                          </span>
                        )}
                        {!isNationalityMatch && !isPositionMatch && !isClubMatch && !isAgeMatch && (
                          <span className="text-[8px] md:text-[9px] font-extrabold px-1.5 py-0.5 bg-slate-100 text-slate-400 border border-slate-200 rounded">
                            Aucun ❌
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {careerGuesses.length < 6 && gameStatus === 'PLAYING' && (
              <div className="w-full flex flex-col gap-3">
                {Array.from({ length: 6 - careerGuesses.length }).map((_, idx) => (
                  <div 
                    key={idx}
                    className={`w-full py-4 rounded-xl border border-dashed text-center text-xs select-none transition duration-200 ${
                      idx === 0 
                        ? 'border-purple-300 bg-purple-50/10 text-purple-600 font-bold' 
                        : 'border-slate-200 bg-transparent text-slate-300'
                    }`}
                  >
                    {idx === 0 ? `Tentative #${careerGuesses.length + 1}` : ''}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="mt-8 text-center text-xs text-slate-400 font-semibold">
        <p>Footni © 2026 — Inspiré de Wordle. Développé pour les amateurs de ballon rond.</p>
      </footer>

      {/* HELP INSTRUCTIONS MODAL */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 max-w-xl w-full rounded-2xl p-6 shadow-2xl relative overflow-y-auto max-h-[90vh] text-slate-700">
            <button 
              onClick={() => setShowHelpModal(false)}
              className="absolute top-4 right-4 p-1 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-800 transition duration-200"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-black text-slate-800 mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent flex items-center gap-2">
              Comment jouer à Footni ? ⚽
            </h2>

            <div className="space-y-4 text-sm leading-relaxed text-slate-600">
              <p>
                Footni propose **quatre modes de jeu** pour tester votre culture footballistique :
              </p>

              <div className="border-l-4 border-emerald-500 pl-3 py-1 my-2 bg-emerald-50/20 rounded-r">
                <span className="font-bold text-emerald-700 block">📊 Mode Classique (Grille)</span>
                Vous avez **8 essais** pour deviner le joueur. Chaque essai colore la grille : Vert pour exact, Jaune pour partiel (âge/numéro ±2, taille ±0.02m, même secteur de poste), Gris pour faux.
              </div>

              <div className="border-l-4 border-purple-500 pl-3 py-1 my-2 bg-purple-50/20 rounded-r">
                <span className="font-bold text-purple-700 block">🗂️ Mode Carrière (Timeline)</span>
                Vous avez **6 essais** pour deviner le joueur mystère grâce à sa frise de clubs et d'années.
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>🟢 **Normal** : Sélectionné parmi 40 superstars mondiales.</li>
                  <li>🔴 **Expert** : Sélectionné parmi l'ensemble des 125 joueurs (avec des joueurs de niche).</li>
                </ul>
              </div>

              <div className="border-l-4 border-slate-700 pl-3 py-1 my-2 bg-slate-50 rounded-r">
                <span className="font-bold text-slate-800 block">🧠 Mode Quiz</span>
                Répondez à une série de **10 questions aléatoires** à choix multiples sur l'histoire du football (Ligue des Champions, Ballons d'Or, Coupe du Monde...).
              </div>

              <div className="border-l-4 border-rose-500 pl-3 py-1 my-2 bg-rose-50/20 rounded-r">
                <span className="font-bold text-rose-700 block">🕵️‍♂️ Football Undercover (Pass-and-Play)</span>
                Un jeu de rôle local de 3 à 10 joueurs. Tous reçoivent un même joueur de foot secret (les **Civils**), sauf un joueur (l'**Undercover**) qui reçoit un joueur comparable. Décrivez votre joueur à voix haute en 3 tours, puis débattez et votez pour éliminer l'intrus !
              </div>
            </div>

            <button
              onClick={() => setShowHelpModal(false)}
              className="mt-6 w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl shadow transition duration-200"
            >
              C'est parti !
            </button>
          </div>
        </div>
      )}

      {/* STATS MODAL */}
      {showStatsModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 max-w-md w-full rounded-2xl p-6 shadow-2xl relative text-slate-700">
            <button 
              onClick={() => setShowStatsModal(false)}
              className="absolute top-4 right-4 p-1 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-800 transition duration-200"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-black text-slate-800 mb-6 text-center bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
              <Trophy className="w-6 h-6 text-emerald-500" /> Vos Statistiques
            </h2>

            <div className="text-center text-xs font-extrabold uppercase text-slate-450 tracking-wider mb-2">
              {gameMode === 'CLASSIC' 
                ? `Classique (${difficulty === 'SIMPLE' ? 'Simple' : 'Difficile'})` 
                : gameMode === 'CAREER'
                ? `Carrière (${careerDifficulty === 'SIMPLE' ? 'Normal' : 'Expert'})`
                : 'Quiz Culture 🧠'
              }
            </div>

            {/* Numeric Dashboard */}
            <div className="grid grid-cols-4 gap-2 text-center mb-6">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-2xl font-black text-slate-800 block">{stats.played}</span>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1 block">Parties</span>
              </div>
              
              {gameMode === 'QUIZ' ? (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-2xl font-black text-emerald-600 block">
                    {stats.highScore || 0}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1 block">Best Score</span>
                </div>
              ) : (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-2xl font-black text-emerald-600 block">
                    {stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0}%
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1 block">Victoires</span>
                </div>
              )}

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-2xl font-black text-teal-600 block">{stats.streak}</span>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1 block">Série</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-2xl font-black text-amber-500 block">{stats.maxStreak}</span>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1 block">Max</span>
              </div>
            </div>

            {/* Quiz/Game Summary panel */}
            {gameStatus !== 'PLAYING' && gameMode !== 'QUIZ' && gameMode !== 'UNDERCOVER' && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-150 mb-6 text-center">
                <span className="text-xs text-slate-500 block font-semibold">Le joueur mystère était</span>
                <span className="text-lg font-black text-emerald-600 block mt-1">
                  {mysteryPlayer.flag} {mysteryPlayer.name}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {mysteryPlayer.club} • {mysteryPlayer.positionDetail}
                </span>
              </div>
            )}

            {gameStatus !== 'PLAYING' && gameMode === 'QUIZ' && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-150 mb-6 text-center">
                <span className="text-xs text-slate-500 block font-semibold">Votre score final</span>
                <span className="text-2xl font-black text-emerald-600 block mt-1">
                  {quizScore} / 10
                </span>
                <span className={`text-xs font-bold block mt-1 ${getQuizRatingTitle(quizScore).color}`}>
                  {getQuizRatingTitle(quizScore).title}
                </span>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (confirm("Voulez-vous vraiment réinitialiser toutes vos statistiques pour ce mode ?")) {
                    startNewGame(true);
                  }
                }}
                className="py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-rose-500 hover:text-rose-600 font-semibold rounded-xl text-xs transition duration-200 border border-slate-200 flex-shrink-0"
              >
                Réinitialiser
              </button>
              <button
                onClick={() => {
                  setShowStatsModal(false);
                  if (gameStatus !== 'PLAYING') {
                    startNewGame(false);
                  }
                }}
                className="flex-1 py-2.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl text-sm transition duration-200 flex items-center justify-center gap-1 shadow-lg"
              >
                {gameStatus === 'PLAYING' ? 'Fermer' : 'Rejouer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
