import React, { useState, useEffect, useRef } from 'react';
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
}

export default function App() {
  // Game States
  const [mysteryPlayer, setMysteryPlayer] = useState<Player>(PLAYERS[0]);
  const [guesses, setGuesses] = useState<GuessResult[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Player[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [gameStatus, setGameStatus] = useState<'PLAYING' | 'WON' | 'LOST'>('PLAYING');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [shakeInput, setShakeInput] = useState(false);
  const [initialClue, setInitialClue] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<'SIMPLE' | 'HARD' | null>(null);

  // Modals
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);

  // Stats State
  const [stats, setStats] = useState<GameStats>({
    played: 0,
    won: 0,
    streak: 0,
    maxStreak: 0
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Initialize game on mount
  useEffect(() => {
    // Load Stats
    const savedStats = localStorage.getItem('footni_stats');
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (e) {
        console.error("Failed to parse stats from localStorage", e);
      }
    } else {
      setShowHelpModal(true); // Show help modal to first-time players
    }
  }, []);

  // Update suggestions when query changes
  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setSuggestions([]);
      setHighlightedIndex(-1);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = PLAYERS.filter(player => {
      // Exclude already guessed players
      const isAlreadyGuessed = guesses.some(g => g.player.id === player.id);
      if (isAlreadyGuessed) return false;

      return (
        player.name.toLowerCase().includes(query) ||
        player.nationality.toLowerCase().includes(query) ||
        player.club.toLowerCase().includes(query) ||
        player.league.toLowerCase().includes(query)
      );
    });

    setSuggestions(filtered.slice(0, 6)); // limit to 6 suggestions
    setHighlightedIndex(-1);
  }, [searchQuery, guesses]);

  const startNewGame = (resetStats: boolean = false, chosenDifficulty: 'SIMPLE' | 'HARD' = difficulty || 'SIMPLE') => {
    // Filter player pool according to difficulty
    const pool = chosenDifficulty === 'SIMPLE'
      ? PLAYERS.filter(p => p.isFamous)
      : PLAYERS.filter(p => !p.isFamous);

    if (pool.length === 0) return;

    // Select random player
    const randomIndex = Math.floor(Math.random() * pool.length);
    const chosenPlayer = pool[randomIndex];
    setMysteryPlayer(chosenPlayer);
    setGuesses([]);
    setSearchQuery('');
    setGameStatus('PLAYING');
    setFeedbackMessage(null);
    setHighlightedIndex(-1);
    setDifficulty(chosenDifficulty);

    // Generate random starting clue
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

    if (resetStats) {
      const emptyStats = { played: 0, won: 0, streak: 0, maxStreak: 0 };
      setStats(emptyStats);
      localStorage.setItem('footni_stats', JSON.stringify(emptyStats));
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

    // Age
    const ageStatus = getAttributeStatus('age', player.age, mysteryPlayer.age, player) as 'correct' | 'partial' | 'incorrect';
    const ageArrow = mysteryPlayer.age > player.age ? 'up' : mysteryPlayer.age < player.age ? 'down' : undefined;

    // Number
    const numberStatus = getAttributeStatus('number', player.number, mysteryPlayer.number, player) as 'correct' | 'partial' | 'incorrect';
    const numberArrow = mysteryPlayer.number > player.number ? 'up' : mysteryPlayer.number < player.number ? 'down' : undefined;

    // Position
    const positionStatus = player.positionDetail === mysteryPlayer.positionDetail 
      ? 'correct' 
      : (player.category === mysteryPlayer.category ? 'partial' : 'incorrect');

    // Height
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

    if (guesses.some(g => g.player.id === player.id)) {
      triggerFeedback("Ce joueur a déjà été tenté !");
      return;
    }

    const result = computeGuessResult(player);
    const newGuesses = [...guesses, result];
    setGuesses(newGuesses);
    setSearchQuery('');
    setSuggestions([]);

    // Check Win
    if (player.id === mysteryPlayer.id) {
      setGameStatus('WON');
      triggerConfetti();
      updateStats(true);
    } 
    // Check Loss
    else if (newGuesses.length >= 8) {
      setGameStatus('LOST');
      updateStats(false);
    } else {
      inputRef.current?.focus();
    }
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
    localStorage.setItem('footni_stats', JSON.stringify(updatedStats));
    
    // Auto show stats modal after a delay
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
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#10b981', '#f59e0b', '#3b82f6']
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#10b981', '#f59e0b', '#3b82f6']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  // Keyboard navigation for suggestions
  const handleKeyDown = (e: React.KeyboardEvent) => {
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

  const handleShare = () => {
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

    const shareText = `Footni ⚽ ${gameStatus === 'WON' ? guesses.length : 'X'}/8\n\n${emojis}\n\nJouez à Footni !`;

    navigator.clipboard.writeText(shareText).then(() => {
      triggerFeedback("Copié dans le presse-papier !");
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
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

  // Difficulty selection Screen BEFORE playing
  if (difficulty === null) {
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
            Sélectionnez votre niveau de jeu :
          </h2>

          <div className="space-y-4">
            <button
              onClick={() => startNewGame(false, 'SIMPLE')}
              className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold rounded-2xl shadow-md transition duration-200 text-left flex items-center justify-between group active:scale-[0.98]"
            >
              <div>
                <span className="block text-base font-black">Mode Simple 🟢</span>
                <span className="block text-[11px] text-emerald-100 font-semibold mt-0.5">Les 60 joueurs les plus connus du moment</span>
              </div>
              <span className="text-xl group-hover:translate-x-1.5 transition duration-200">➔</span>
            </button>

            <button
              onClick={() => startNewGame(false, 'HARD')}
              className="w-full py-4 px-6 bg-slate-800 hover:bg-slate-700 text-white font-extrabold rounded-2xl shadow-md transition duration-200 text-left flex items-center justify-between group active:scale-[0.98] border border-slate-700"
            >
              <div>
                <span className="block text-base font-black">Mode Difficile 🔴</span>
                <span className="block text-[11px] text-slate-350 font-semibold mt-0.5">65 joueurs un peu plus niche et complexes</span>
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

        {/* Render Help Modal if open */}
        {showHelpModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 max-w-xl w-full rounded-2xl p-6 shadow-2xl relative text-slate-700">
              <button 
                onClick={() => setShowHelpModal(false)}
                className="absolute top-4 right-4 p-1 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-800 transition duration-200"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-black text-slate-800 mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent flex items-center gap-2">
                Comment jouer à Footni ? ⚽
              </h2>
              <div className="space-y-4 text-sm leading-relaxed text-slate-650">
                <p>Vous disposez de <span className="text-slate-850 font-bold">8 tentatives</span> pour deviner le joueur mystère.</p>
                <p>Tapez le nom d'un joueur vedette et validez. Après chaque essai, les couleurs des tuiles changent pour vous guider :</p>
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-md bg-emerald-500 border border-emerald-400 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">✓</div>
                    <div><span className="text-emerald-600 font-bold block">Vert (Parfait)</span>L'attribut est identique à celui du joueur mystère.</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-md bg-amber-400 border border-amber-300 flex items-center justify-center text-xs font-bold text-slate-900 flex-shrink-0">~</div>
                    <div><span className="text-amber-500 font-bold block">Jaune (Partiel)</span>
                      <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-500 text-xs font-medium">
                        <li><strong className="text-slate-700">Âge / Numéro :</strong> Écart de 2 unités ou moins.</li>
                        <li><strong className="text-slate-700">Taille :</strong> Écart de 0.02m ou moins.</li>
                        <li><strong className="text-slate-700">Poste :</strong> Même secteur de jeu (ex: MIL).</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-md bg-slate-200 border border-slate-350 flex items-center justify-center text-xs font-bold text-slate-400 flex-shrink-0">✗</div>
                    <div><span className="text-slate-450 font-bold block">Gris (Aucun)</span>L'attribut ne correspond pas.</div>
                  </div>
                </div>
              </div>
              <button onClick={() => setShowHelpModal(false)} className="mt-6 w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl shadow transition duration-200">Fermer</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-between pb-12">
      {/* Top Banner Navigation */}
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
            
            {/* Difficulty switcher badge */}
            <button
              onClick={() => setDifficulty(null)}
              className="mt-1 text-[9px] font-extrabold px-2 py-0.5 bg-slate-150/70 hover:bg-slate-200 text-slate-650 border border-slate-200 rounded-full flex items-center gap-1 transition duration-200 shadow-sm"
              title="Changer de mode"
            >
              <span>Mode :</span>
              <span className={difficulty === 'SIMPLE' ? 'text-emerald-600' : 'text-rose-600'}>
                {difficulty === 'SIMPLE' ? 'Simple 🟢' : 'Difficile 🔴'}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            <button 
              onClick={() => setShowStatsModal(true)} 
              className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-slate-800 transition duration-250"
              title="Statistiques"
            >
              <Trophy className="w-6 h-6" />
            </button>
            <button 
              onClick={() => startNewGame(false)} 
              className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-slate-800 transition duration-250"
              title="Recommencer"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl w-full px-4 flex-1 flex flex-col items-center mt-6">
        
        {/* Game Info Message Toast */}
        {feedbackMessage && (
          <div className="fixed top-20 z-50 bg-white border border-emerald-500 text-emerald-600 text-sm font-semibold py-2.5 px-6 rounded-full shadow-[0_10px_25px_rgba(16,185,129,0.2)] animate-fade-in flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>{feedbackMessage}</span>
          </div>
        )}

        {/* Input & Autocomplete Area */}
        {gameStatus === 'PLAYING' ? (
          <>
            <div className="w-full max-w-lg mb-4 relative z-30">
              <div className="flex items-center justify-between mb-2 px-1 text-xs text-slate-600 font-semibold">
                <span>Devinez le joueur parmi les stars du ballon rond</span>
                <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-mono border border-emerald-100">
                  Tentative {guesses.length + 1} / 8
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
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650"
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

              {/* Autocomplete Dropdown */}
              {suggestions.length > 0 && (
                <div 
                  ref={suggestionsRef}
                  className="absolute w-full mt-2 bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-2xl z-50 glass-panel"
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

            {initialClue && (
              <div className="w-full max-w-lg mb-8 p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-800 text-sm font-bold text-center shadow-sm animate-fade-in flex items-center justify-center gap-2">
                <span className="text-lg leading-none">💡</span>
                <span><strong>Indice de départ :</strong> {initialClue}</span>
              </div>
            )}
          </>
        ) : (
          /* Game Over Dashboard (Win/Loss) */
          <div className="w-full max-w-xl mb-8 p-6 rounded-2xl glass-panel border border-slate-200/80 animate-fade-in relative z-10 shadow-xl text-slate-800">
            <div className="text-center mb-6">
              {gameStatus === 'WON' ? (
                <div>
                  <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-600 mb-3 border border-emerald-500/20 animate-pulse-glow">
                    <Trophy className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-emerald-600">
                    Victoire ! 🎉
                  </h2>
                  <p className="text-slate-650 mt-2 font-medium">
                    Vous avez démasqué le joueur en <span className="text-emerald-600 font-black font-mono text-lg">{guesses.length}</span> {guesses.length > 1 ? 'tentatives' : 'tentative'} !
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
                  <p className="text-slate-650 mt-2 font-medium">
                    Vous n'avez pas trouvé le joueur mystère après 8 tentatives.
                  </p>
                </div>
              )}
            </div>

            {/* Mystery Player Spotlight Card */}
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

            {/* CTA Actions */}
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

        {/* Column Labels */}
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

        {/* Guesses Grid */}
        <div className="w-full flex-1 flex flex-col gap-4 overflow-y-auto max-h-[50vh] pr-1">
          {guesses.map((guess, guessIdx) => (
            <div key={guess.player.id} className="w-full bg-white/70 p-2.5 rounded-2xl border border-slate-200/60 shadow-sm">
              {/* Guess Header Banner */}
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2 px-1">
                <span>
                  Tentative #{guesses.length - guessIdx} : <span className="text-slate-800 font-extrabold">{guess.player.name}</span>
                </span>
                <span className="text-[10px] text-slate-400 font-bold">
                  {guess.player.flag} {guess.player.club}
                </span>
              </div>

              {/* 7 Attribute Blocks */}
              <div className="grid grid-cols-7 gap-2">
                {/* Nationality */}
                <div className={`aspect-square flex flex-col items-center justify-center p-1 rounded-xl border text-center relative overflow-hidden transition-all duration-300 animate-flip-in ${getStatusColor(guess.attributes.nationality.status)}`}>
                  <span className="text-2xl md:text-3xl leading-none block mb-0.5">{guess.attributes.nationality.flag}</span>
                  <span className="text-[8px] md:text-[10px] font-semibold leading-tight line-clamp-1 hidden md:block">
                    {guess.attributes.nationality.value}
                  </span>
                </div>

                {/* League */}
                <div className={`aspect-square flex flex-col items-center justify-center p-1 rounded-xl border text-center relative overflow-hidden transition-all duration-300 animate-flip-in animation-delay-1 ${getStatusColor(guess.attributes.league.status)}`}>
                  <span className="text-[10px] md:text-sm font-extrabold text-center leading-tight break-all line-clamp-2">
                    {guess.attributes.league.value}
                  </span>
                </div>

                {/* Club */}
                <div className={`aspect-square flex flex-col items-center justify-center p-1 rounded-xl border text-center relative overflow-hidden transition-all duration-300 animate-flip-in animation-delay-2 ${getStatusColor(guess.attributes.club.status)}`}>
                  <span className="text-[10px] md:text-sm font-extrabold text-center leading-tight break-all line-clamp-2">
                    {guess.attributes.club.value}
                  </span>
                </div>

                {/* Age */}
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

                {/* Shirt Number */}
                <div className={`aspect-square flex flex-col items-center justify-center p-1 rounded-xl border text-center relative overflow-hidden transition-all duration-300 animate-flip-in animation-delay-4 ${getStatusColor(guess.attributes.number.status)}`}>
                  <div className="flex items-center justify-center gap-0.5">
                    <span className="text-xs md:text-lg font-black font-mono">N° {guess.attributes.number.value}</span>
                    {guess.attributes.number.arrow && (
                      <span className="text-xs">
                        {guess.attributes.number.arrow === 'up' ? <ArrowUp className="w-3.5 h-3.5 text-current stroke-[3.5]" /> : <ArrowDown className="w-3.5 h-3.5 text-current stroke-[3.5]" />}
                      </span>
                    )}
                  </div>
                </div>

                {/* Position */}
                <div className={`aspect-square flex flex-col items-center justify-center p-1 rounded-xl border text-center relative overflow-hidden transition-all duration-300 animate-flip-in animation-delay-5 ${getStatusColor(guess.attributes.position.status)}`}>
                  <span className="text-xs md:text-lg font-black block leading-none">{guess.attributes.position.value}</span>
                  <span className="text-[7px] md:text-[9px] font-bold leading-none block mt-1 line-clamp-1 opacity-90">
                    {guess.attributes.position.detail}
                  </span>
                </div>

                {/* Height */}
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

          {/* Dotted outlines for remaining guesses */}
          {guesses.length < 8 && gameStatus === 'PLAYING' && (
            Array.from({ length: 8 - guesses.length }).map((_, idx) => (
              <div 
                key={idx} 
                className={`w-full h-[116px] rounded-2xl border border-dashed flex flex-col items-center justify-center text-xs transition duration-200 select-none ${
                  idx === 0 
                    ? 'border-slate-300 bg-white/30 text-slate-400' 
                    : 'border-slate-200/50 bg-transparent text-slate-300'
                }`}
              >
                {idx === 0 ? `Tentative #${guesses.length + 1}` : ''}
              </div>
            ))
          )}
        </div>

      </main>

      {/* FOOTER */}
      <footer className="mt-8 text-center text-xs text-slate-400 font-semibold">
        <p>Footni © 2026 — Inspiré de Wordle. Développé pour les amateurs de ballon rond.</p>
      </footer>

      {/* HELP MODAL */}
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

            <div className="space-y-4 text-sm leading-relaxed text-slate-650">
              <p>
                Vous disposez de <span className="text-slate-800 font-bold">8 tentatives</span> pour deviner le joueur mystère.
              </p>
              <p>
                Tapez le nom d'un joueur vedette et validez. Après chaque essai, les couleurs des tuiles changent pour vous guider :
              </p>

              {/* Legend Explanation */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-emerald-500 border border-emerald-400 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    <span className="text-emerald-600 font-bold block">Vert (Correspondance parfaite)</span>
                    L'attribut est identique à celui du joueur mystère.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-amber-400 border border-amber-300 flex items-center justify-center text-xs font-bold text-slate-900 flex-shrink-0">
                    ~
                  </div>
                  <div>
                    <span className="text-amber-500 font-bold block">Jaune (Correspondance partielle)</span>
                    <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-500 text-xs font-medium">
                      <li><strong className="text-slate-700">Âge / Numéro :</strong> Écart de 2 unités ou moins (ex: guess 8, mystery 10).</li>
                      <li><strong className="text-slate-700">Taille :</strong> Écart de 0.02m ou moins (ex: guess 1.80m, mystery 1.82m).</li>
                      <li><strong className="text-slate-700">Poste :</strong> Même secteur de jeu (ex: Milieu Offensif & Milieu Central sont "MIL").</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-slate-200 border border-slate-350 flex items-center justify-center text-xs font-bold text-slate-400 flex-shrink-0">
                    ✗
                  </div>
                  <div>
                    <span className="text-slate-450 font-bold block">Gris (Aucune correspondance)</span>
                    L'attribut ne correspond pas.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center text-xs text-slate-500 flex-shrink-0">
                    ⬆️ / ⬇️
                  </div>
                  <div>
                    <span className="text-slate-800 font-bold block">Flèches d'écartement (Âge, Numéro, Taille)</span>
                    S'ils ne sont pas exacts :
                    <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-500 text-xs font-medium">
                      <li><strong className="text-slate-700">⬆️ :</strong> La valeur du joueur mystère est supérieure.</li>
                      <li><strong className="text-slate-700">⬇️ :</strong> La valeur du joueur mystère est inférieure.</li>
                    </ul>
                  </div>
                </div>
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

            {/* Numeric Stats */}
            <div className="grid grid-cols-4 gap-2 text-center mb-6">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-2xl font-black text-slate-800 block">{stats.played}</span>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1 block">Parties</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-2xl font-black text-emerald-600 block">
                  {stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0}%
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1 block">Victoires</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-2xl font-black text-teal-600 block">{stats.streak}</span>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1 block">Série</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-2xl font-black text-amber-500 block">{stats.maxStreak}</span>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1 block">Max</span>
              </div>
            </div>

            {/* Game Over Info details (if game is over) */}
            {gameStatus !== 'PLAYING' && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-150 mb-6 text-center">
                <span className="text-xs text-slate-450 block font-semibold">Le joueur mystère était</span>
                <span className="text-lg font-black text-emerald-600 block mt-1">
                  {mysteryPlayer.flag} {mysteryPlayer.name}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {mysteryPlayer.club} • {mysteryPlayer.positionDetail}
                </span>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (confirm("Voulez-vous vraiment réinitialiser toutes vos statistiques ?")) {
                    startNewGame(true);
                  }
                }}
                className="py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-rose-500 hover:text-rose-600 font-semibold rounded-xl text-xs transition duration-200 border border-slate-200 flex-shrink-0 animate-fade-in"
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
