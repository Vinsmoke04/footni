export interface CareerStep {
  club: string;
  years: string; // e.g. "2013 - 2017"
  flag?: string; // flag representing the country of the club
}

export interface Player {
  id: string;
  name: string;
  nationality: string;
  flag: string;
  league: string;
  club: string;
  age: number;
  number: number;
  category: 'G' | 'DEF' | 'MIL' | 'ATT';
  positionDetail: string;
  height: number; // in meters (e.g. 1.85)
  isFamous: boolean; // true for Simple mode, false for Hard mode
  career?: CareerStep[]; // populated for the Career Mode
}

export const PLAYERS: Player[] = [
  {
    id: "1",
    name: "Erling Haaland",
    nationality: "Norvège",
    flag: "🇳🇴",
    league: "Premier League",
    club: "Manchester City",
    age: 25,
    number: 9,
    category: "ATT",
    positionDetail: "Buteur",
    height: 1.94,
    isFamous: true,
    career: [
      { club: "Bryne FK", years: "2015 - 2017", flag: "🇳🇴" },
      { club: "Molde FK", years: "2017 - 2019", flag: "🇳🇴" },
      { club: "Red Bull Salzbourg", years: "2019 - 2020", flag: "🇦🇹" },
      { club: "Borussia Dortmund", years: "2020 - 2022", flag: "🇩🇪" },
      { club: "Manchester City", years: "2022 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "2",
    name: "Kylian Mbappé",
    nationality: "France",
    flag: "🇫🇷",
    league: "La Liga",
    club: "Real Madrid",
    age: 27,
    number: 9,
    category: "ATT",
    positionDetail: "Buteur / Ailier",
    height: 1.78,
    isFamous: true,
    career: [
      { club: "AS Monaco", years: "2015 - 2017", flag: "🇫🇷" },
      { club: "Paris Saint-Germain", years: "2017 - 2024", flag: "🇫🇷" },
      { club: "Real Madrid", years: "2024 - Présent", flag: "🇪🇸" }
    ]
  },
  {
    id: "3",
    name: "Jude Bellingham",
    nationality: "Angleterre",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    league: "La Liga",
    club: "Real Madrid",
    age: 23,
    number: 5,
    category: "MIL",
    positionDetail: "Milieu Offensif",
    height: 1.86,
    isFamous: true,
    career: [
      { club: "Birmingham City", years: "2019 - 2020", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Borussia Dortmund", years: "2020 - 2023", flag: "🇩🇪" },
      { club: "Real Madrid", years: "2023 - Présent", flag: "🇪🇸" }
    ]
  },
  {
    id: "4",
    name: "Federico Valverde",
    nationality: "Uruguay",
    flag: "🇺🇾",
    league: "La Liga",
    club: "Real Madrid",
    age: 27,
    number: 8,
    category: "MIL",
    positionDetail: "Milieu Central",
    height: 1.82,
    isFamous: true,
    career: [
      { club: "Peñarol", years: "2015 - 2016", flag: "🇺🇾" },
      { club: "Real Madrid Castilla", years: "2016 - 2017", flag: "🇪🇸" },
      { club: "Deportivo La Corogne (Prêt)", years: "2017 - 2018", flag: "🇪🇸" },
      { club: "Real Madrid", years: "2018 - Présent", flag: "🇪🇸" }
    ]
  },
  {
    id: "5",
    name: "Pedri",
    nationality: "Espagne",
    flag: "🇪🇸",
    league: "La Liga",
    club: "FC Barcelona",
    age: 23,
    number: 8,
    category: "MIL",
    positionDetail: "Milieu Central",
    height: 1.74,
    isFamous: true,
    career: [
      { club: "UD Las Palmas", years: "2019 - 2020", flag: "🇪🇸" },
      { club: "FC Barcelone", years: "2020 - Présent", flag: "🇪🇸" }
    ]
  },
  {
    id: "6",
    name: "Mohamed Salah",
    nationality: "Égypte",
    flag: "🇪🇬",
    league: "Premier League",
    club: "Liverpool",
    age: 34,
    number: 11,
    category: "ATT",
    positionDetail: "Ailier Droit",
    height: 1.75,
    isFamous: true,
    career: [
      { club: "Al Mokawloon", years: "2010 - 2012", flag: "🇪🇬" },
      { club: "FC Bâle", years: "2012 - 2014", flag: "🇨🇭" },
      { club: "Chelsea FC", years: "2014 - 2015", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Fiorentina (Prêt)", years: "2015", flag: "🇮🇹" },
      { club: "AS Rome", years: "2015 - 2017", flag: "🇮🇹" },
      { club: "Liverpool FC", years: "2017 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "7",
    name: "Kevin De Bruyne",
    nationality: "Belgique",
    flag: "🇧🇪",
    league: "Premier League",
    club: "Manchester City",
    age: 35,
    number: 17,
    category: "MIL",
    positionDetail: "Milieu Offensif",
    height: 1.81,
    isFamous: true,
    career: [
      { club: "KRC Genk", years: "2008 - 2012", flag: "🇧🇪" },
      { club: "Chelsea FC", years: "2012 - 2014", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Werder Brême (Prêt)", years: "2012 - 2013", flag: "🇩🇪" },
      { club: "VfL Wolfsburg", years: "2014 - 2015", flag: "🇩🇪" },
      { club: "Manchester City", years: "2015 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "8",
    name: "Virgil van Dijk",
    nationality: "Pays-Bas",
    flag: "🇳🇱",
    league: "Premier League",
    club: "Liverpool",
    age: 35,
    number: 4,
    category: "DEF",
    positionDetail: "Défenseur Central",
    height: 1.95,
    isFamous: true,
    career: [
      { club: "FC Groningue", years: "2011 - 2013", flag: "🇳🇱" },
      { club: "Celtic Glasgow", years: "2013 - 2015", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
      { club: "Southampton FC", years: "2015 - 2018", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Liverpool FC", years: "2018 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "9",
    name: "Thibaut Courtois",
    nationality: "Belgique",
    flag: "🇧🇪",
    league: "La Liga",
    club: "Real Madrid",
    age: 34,
    number: 1,
    category: "G",
    positionDetail: "Gardien",
    height: 2.00,
    isFamous: true,
    career: [
      { club: "KRC Genk", years: "2009 - 2011", flag: "🇧🇪" },
      { club: "Atlético Madrid (Prêt)", years: "2011 - 2014", flag: "🇪🇸" },
      { club: "Chelsea FC", years: "2014 - 2018", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Real Madrid", years: "2018 - Présent", flag: "🇪🇸" }
    ]
  },
  {
    id: "10",
    name: "Bukayo Saka",
    nationality: "Angleterre",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    league: "Premier League",
    club: "Arsenal",
    age: 24,
    number: 7,
    category: "ATT",
    positionDetail: "Ailier Droit",
    height: 1.78,
    isFamous: true,
    career: [
      { club: "Arsenal FC Academy", years: "2008 - 2018", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Arsenal FC", years: "2018 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "11",
    name: "Rodri",
    nationality: "Espagne",
    flag: "🇪🇸",
    league: "Premier League",
    club: "Manchester City",
    age: 30,
    number: 16,
    category: "MIL",
    positionDetail: "Milieu Défensif",
    height: 1.90,
    isFamous: true,
    career: [
      { club: "Villarreal CF", years: "2015 - 2018", flag: "🇪🇸" },
      { club: "Atlético Madrid", years: "2018 - 2019", flag: "🇪🇸" },
      { club: "Manchester City", years: "2019 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "12",
    name: "William Saliba",
    nationality: "France",
    flag: "🇫🇷",
    league: "Premier League",
    club: "Arsenal",
    age: 25,
    number: 2,
    category: "DEF",
    positionDetail: "Défenseur Central",
    height: 1.92,
    isFamous: true,
    career: [
      { club: "AS Saint-Étienne", years: "2018 - 2019", flag: "🇫🇷" },
      { club: "Arsenal FC", years: "2019 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "AS Saint-Étienne (Prêt)", years: "2019 - 2020", flag: "🇫🇷" },
      { club: "OGC Nice (Prêt)", years: "2021", flag: "🇫🇷" },
      { club: "Olympique de Marseille (Prêt)", years: "2021 - 2022", flag: "🇫🇷" }
    ]
  },
  {
    id: "13",
    name: "Robert Lewandowski",
    nationality: "Pologne",
    flag: "🇵🇱",
    league: "La Liga",
    club: "FC Barcelona",
    age: 37,
    number: 9,
    category: "ATT",
    positionDetail: "Buteur",
    height: 1.85,
    isFamous: true,
    career: [
      { club: "Znicz Pruszków", years: "2006 - 2008", flag: "🇵🇱" },
      { club: "Lech Poznań", years: "2008 - 2010", flag: "🇵🇱" },
      { club: "Borussia Dortmund", years: "2010 - 2014", flag: "🇩🇪" },
      { club: "Bayern Munich", years: "2014 - 2022", flag: "🇩🇪" },
      { club: "FC Barcelone", years: "2022 - Présent", flag: "🇪🇸" }
    ]
  },
  {
    id: "14",
    name: "Antoine Griezmann",
    nationality: "France",
    flag: "🇫🇷",
    league: "La Liga",
    club: "Atlético Madrid",
    age: 35,
    number: 7,
    category: "ATT",
    positionDetail: "Deuxième Attaquant",
    height: 1.76,
    isFamous: true,
    career: [
      { club: "Real Sociedad", years: "2009 - 2014", flag: "🇪🇸" },
      { club: "Atlético Madrid", years: "2014 - 2019", flag: "🇪🇸" },
      { club: "FC Barcelone", years: "2019 - 2021", flag: "🇪🇸" },
      { club: "Atlético Madrid", years: "2021 - Présent", flag: "🇪🇸" }
    ]
  },
  {
    id: "15",
    name: "Achraf Hakimi",
    nationality: "Maroc",
    flag: "🇲🇦",
    league: "Ligue 1",
    club: "Paris Saint-Germain",
    age: 27,
    number: 2,
    category: "DEF",
    positionDetail: "Défenseur Latéral",
    height: 1.81,
    isFamous: true,
    career: [
      { club: "Real Madrid", years: "2017 - 2020", flag: "🇪🇸" },
      { club: "Borussia Dortmund (Prêt)", years: "2018 - 2020", flag: "🇩🇪" },
      { club: "Inter Milan", years: "2020 - 2021", flag: "🇮🇹" },
      { club: "Paris Saint-Germain", years: "2021 - Présent", flag: "🇫🇷" }
    ]
  },
  {
    id: "16",
    name: "Marquinhos",
    nationality: "Brésil",
    flag: "🇧🇷",
    league: "Ligue 1",
    club: "Paris Saint-Germain",
    age: 32,
    number: 5,
    category: "DEF",
    positionDetail: "Défenseur Central",
    height: 1.83,
    isFamous: true,
    career: [
      { club: "Corinthians", years: "2011 - 2012", flag: "🇧🇷" },
      { club: "AS Rome", years: "2012 - 2013", flag: "🇮🇹" },
      { club: "Paris Saint-Germain", years: "2013 - Présent", flag: "🇫🇷" }
    ]
  },
  {
    id: "17",
    name: "Ousmane Dembélé",
    nationality: "France",
    flag: "🇫🇷",
    league: "Ligue 1",
    club: "Paris Saint-Germain",
    age: 29,
    number: 10,
    category: "ATT",
    positionDetail: "Ailier",
    height: 1.78,
    isFamous: true,
    career: [
      { club: "Stade Rennais", years: "2015 - 2016", flag: "🇫🇷" },
      { club: "Borussia Dortmund", years: "2016 - 2017", flag: "🇩🇪" },
      { club: "FC Barcelone", years: "2017 - 2023", flag: "🇪🇸" },
      { club: "Paris Saint-Germain", years: "2023 - Présent", flag: "🇫🇷" }
    ]
  },
  {
    id: "18",
    name: "Gianluigi Donnarumma",
    nationality: "Italie",
    flag: "🇮🇹",
    league: "Ligue 1",
    club: "Paris Saint-Germain",
    age: 27,
    number: 99,
    category: "G",
    positionDetail: "Gardien",
    height: 1.96,
    isFamous: true,
    career: [
      { club: "AC Milan", years: "2015 - 2021", flag: "🇮🇹" },
      { club: "Paris Saint-Germain", years: "2021 - Présent", flag: "🇫🇷" }
    ]
  },
  {
    id: "19",
    name: "Lautaro Martínez",
    nationality: "Argentine",
    flag: "🇦🇷",
    league: "Serie A",
    club: "Inter Milan",
    age: 28,
    number: 10,
    category: "ATT",
    positionDetail: "Buteur",
    height: 1.74,
    isFamous: true,
    career: [
      { club: "Racing Club", years: "2015 - 2018", flag: "🇦🇷" },
      { club: "Inter Milan", years: "2018 - Présent", flag: "🇮🇹" }
    ]
  },
  {
    id: "20",
    name: "Nicolò Barella",
    nationality: "Italie",
    flag: "🇮🇹",
    league: "Serie A",
    club: "Inter Milan",
    age: 29,
    number: 23,
    category: "MIL",
    positionDetail: "Milieu Central",
    height: 1.72,
    isFamous: true,
    career: [
      { club: "Cagliari Calcio", years: "2014 - 2019", flag: "🇮🇹" },
      { club: "Côme (Prêt)", years: "2016", flag: "🇮🇹" },
      { club: "Inter Milan", years: "2019 - Présent", flag: "🇮🇹" }
    ]
  },
  {
    id: "21",
    name: "Victor Osimhen",
    nationality: "Nigeria",
    flag: "🇳🇬",
    league: "Süper Lig",
    club: "Galatasaray",
    age: 27,
    number: 45,
    category: "ATT",
    positionDetail: "Buteur",
    height: 1.85,
    isFamous: true,
    career: [
      { club: "VfL Wolfsburg", years: "2017 - 2019", flag: "🇩🇪" },
      { club: "Charleroi (Prêt)", years: "2018 - 2019", flag: "🇧🇪" },
      { club: "Lille OSC", years: "2019 - 2020", flag: "🇫🇷" },
      { club: "SSC Naples", years: "2020 - 2024", flag: "🇮🇹" },
      { club: "Galatasaray (Prêt)", years: "2024 - Présent", flag: "🇹🇷" }
    ]
  },
  {
    id: "22",
    name: "Harry Kane",
    nationality: "Angleterre",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    league: "Bundesliga",
    club: "Bayern Munich",
    age: 32,
    number: 9,
    category: "ATT",
    positionDetail: "Buteur",
    height: 1.88,
    isFamous: true,
    career: [
      { club: "Leyton Orient (Prêt)", years: "2011", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Millwall (Prêt)", years: "2012", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Norwich City (Prêt)", years: "2012", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Leicester City (Prêt)", years: "2013", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Tottenham Hotspur", years: "2009 - 2023", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Bayern Munich", years: "2023 - Présent", flag: "🇩🇪" }
    ]
  },
  {
    id: "23",
    name: "Florian Wirtz",
    nationality: "Allemagne",
    flag: "🇩🇪",
    league: "Bundesliga",
    club: "Bayer Leverkusen",
    age: 23,
    number: 10,
    category: "MIL",
    positionDetail: "Milieu Offensif",
    height: 1.76,
    isFamous: true,
    career: [
      { club: "Bayer Leverkusen U19", years: "2020", flag: "🇩🇪" },
      { club: "Bayer Leverkusen", years: "2020 - Présent", flag: "🇩🇪" }
    ]
  },
  {
    id: "24",
    name: "Jamal Musiala",
    nationality: "Allemagne",
    flag: "🇩🇪",
    league: "Bundesliga",
    club: "Bayern Munich",
    age: 23,
    number: 42,
    category: "MIL",
    positionDetail: "Milieu Offensif",
    height: 1.84,
    isFamous: true,
    career: [
      { club: "Chelsea FC Academy", years: "2011 - 2019", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Bayern Munich II", years: "2019 - 2020", flag: "🇩🇪" },
      { club: "Bayern Munich", years: "2020 - Présent", flag: "🇩🇪" }
    ]
  },
  {
    id: "25",
    name: "Alphonso Davies",
    nationality: "Canada",
    flag: "🇨🇦",
    league: "Bundesliga",
    club: "Bayern Munich",
    age: 25,
    number: 19,
    category: "DEF",
    positionDetail: "Défenseur Latéral",
    height: 1.83,
    isFamous: true,
    career: [
      { club: "Vancouver Whitecaps", years: "2016 - 2018", flag: "🇨🇦" },
      { club: "Bayern Munich", years: "2019 - Présent", flag: "🇩🇪" }
    ]
  },

  // 26-125: New players additions
  {
    id: "26",
    name: "Lionel Messi",
    nationality: "Argentine",
    flag: "🇦🇷",
    league: "MLS",
    club: "Inter Miami CF",
    age: 38,
    number: 10,
    category: "ATT",
    positionDetail: "Ailier / Attaquant",
    height: 1.70,
    isFamous: true,
    career: [
      { club: "FC Barcelone", years: "2004 - 2021", flag: "🇪🇸" },
      { club: "Paris Saint-Germain", years: "2021 - 2023", flag: "🇫🇷" },
      { club: "Inter Miami CF", years: "2023 - Présent", flag: "🇺🇸" }
    ]
  },
  {
    id: "27",
    name: "Cristiano Ronaldo",
    nationality: "Portugal",
    flag: "🇵🇹",
    league: "Saudi Pro League",
    club: "Al-Nassr FC",
    age: 41,
    number: 7,
    category: "ATT",
    positionDetail: "Buteur",
    height: 1.87,
    isFamous: true,
    career: [
      { club: "Sporting CP", years: "2002 - 2003", flag: "🇵🇹" },
      { club: "Manchester United", years: "2003 - 2009", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Real Madrid", years: "2009 - 2018", flag: "🇪🇸" },
      { club: "Juventus", years: "2018 - 2021", flag: "🇮🇹" },
      { club: "Manchester United", years: "2021 - 2022", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Al-Nassr FC", years: "2023 - Présent", flag: "🇸🇦" }
    ]
  },
  {
    id: "28",
    name: "Phil Foden",
    nationality: "Angleterre",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    league: "Premier League",
    club: "Manchester City",
    age: 25,
    number: 47,
    category: "ATT",
    positionDetail: "Milieu Offensif / Ailier",
    height: 1.71,
    isFamous: true,
    career: [
      { club: "Manchester City Academy", years: "2009 - 2017", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Manchester City", years: "2017 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "29",
    name: "Bernardo Silva",
    nationality: "Portugal",
    flag: "🇵🇹",
    league: "Premier League",
    club: "Manchester City",
    age: 31,
    number: 20,
    category: "MIL",
    positionDetail: "Milieu Central / Ailier",
    height: 1.73,
    isFamous: true,
    career: [
      { club: "Benfica", years: "2013 - 2015", flag: "🇵🇹" },
      { club: "AS Monaco", years: "2014 - 2017", flag: "🇫🇷" },
      { club: "Manchester City", years: "2017 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "30",
    name: "Bruno Guimarães",
    nationality: "Brésil",
    flag: "🇧🇷",
    league: "Premier League",
    club: "Newcastle United",
    age: 28,
    number: 39,
    category: "MIL",
    positionDetail: "Milieu Défensif",
    height: 1.82,
    isFamous: false,
    career: [
      { club: "Athletico Paranaense", years: "2017 - 2020", flag: "🇧🇷" },
      { club: "Olympique Lyonnais", years: "2020 - 2022", flag: "🇫🇷" },
      { club: "Newcastle United", years: "2022 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "31",
    name: "Martin Ødegaard",
    nationality: "Norvège",
    flag: "🇳🇴",
    league: "Premier League",
    club: "Arsenal",
    age: 27,
    number: 8,
    category: "MIL",
    positionDetail: "Milieu Offensif",
    height: 1.78,
    isFamous: true,
    career: [
      { club: "Strømsgodset IF", years: "2014 - 2015", flag: "🇳🇴" },
      { club: "Real Madrid", years: "2015 - 2021", flag: "🇪🇸" },
      { club: "Heerenveen (Prêt)", years: "2017 - 2018", flag: "🇳🇱" },
      { club: "Vitesse Arnhem (Prêt)", years: "2018 - 2019", flag: "🇳🇱" },
      { club: "Real Sociedad (Prêt)", years: "2019 - 2020", flag: "🇪🇸" },
      { club: "Arsenal FC", years: "2021 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "32",
    name: "Declan Rice",
    nationality: "Angleterre",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    league: "Premier League",
    club: "Arsenal",
    age: 27,
    number: 41,
    category: "MIL",
    positionDetail: "Milieu Central",
    height: 1.85,
    isFamous: true,
    career: [
      { club: "West Ham United", years: "2015 - 2023", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Arsenal FC", years: "2023 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "33",
    name: "Gabriel Magalhães",
    nationality: "Brésil",
    flag: "🇧🇷",
    league: "Premier League",
    club: "Arsenal",
    age: 28,
    number: 6,
    category: "DEF",
    positionDetail: "Défenseur Central",
    height: 1.90,
    isFamous: false,
    career: [
      { club: "Avaí FC", years: "2016", flag: "🇧🇷" },
      { club: "Lille OSC", years: "2017 - 2020", flag: "🇫🇷" },
      { club: "Troyes AC (Prêt)", years: "2017 - 2018", flag: "🇫🇷" },
      { club: "Dinamo Zagreb (Prêt)", years: "2018", flag: "🇭🇷" },
      { club: "Arsenal FC", years: "2020 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "34",
    name: "David Raya",
    nationality: "Espagne",
    flag: "🇪🇸",
    league: "Premier League",
    club: "Arsenal",
    age: 30,
    number: 22,
    category: "G",
    positionDetail: "Gardien",
    height: 1.83,
    isFamous: false,
    career: [
      { club: "Blackburn Rovers", years: "2012 - 2019", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Southport (Prêt)", years: "2014 - 2015", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Brentford FC", years: "2019 - 2024", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Arsenal FC", years: "2023 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "35",
    name: "Luis Díaz",
    nationality: "Colombie",
    flag: "🇨🇴",
    league: "Premier League",
    club: "Liverpool",
    age: 29,
    number: 7,
    category: "ATT",
    positionDetail: "Ailier Gauche",
    height: 1.80,
    isFamous: false,
    career: [
      { club: "Barranquilla FC", years: "2016 - 2017", flag: "🇨🇴" },
      { club: "Junior FC", years: "2017 - 2019", flag: "🇨🇴" },
      { club: "FC Porto", years: "2019 - 2022", flag: "🇵🇹" },
      { club: "Liverpool FC", years: "2022 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "36",
    name: "Alexis Mac Allister",
    nationality: "Argentine",
    flag: "🇦🇷",
    league: "Premier League",
    club: "Liverpool",
    age: 27,
    number: 10,
    category: "MIL",
    positionDetail: "Milieu Central",
    height: 1.76,
    isFamous: false,
    career: [
      { club: "Argentinos Juniors", years: "2016 - 2019", flag: "🇦🇷" },
      { club: "Brighton & Hove Albion", years: "2019 - 2023", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Argentinos Juniors (Prêt)", years: "2019", flag: "🇦🇷" },
      { club: "Boca Juniors (Prêt)", years: "2019 - 2020", flag: "🇦🇷" },
      { club: "Liverpool FC", years: "2023 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "37",
    name: "Alisson Becker",
    nationality: "Brésil",
    flag: "🇧🇷",
    league: "Premier League",
    club: "Liverpool",
    age: 33,
    number: 1,
    category: "G",
    positionDetail: "Gardien",
    height: 1.93,
    isFamous: true,
    career: [
      { club: "Internacional", years: "2013 - 2016", flag: "🇧🇷" },
      { club: "AS Rome", years: "2016 - 2018", flag: "🇮🇹" },
      { club: "Liverpool FC", years: "2018 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "38",
    name: "Trent Alexander-Arnold",
    nationality: "Angleterre",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    league: "Premier League",
    club: "Liverpool",
    age: 27,
    number: 66,
    category: "DEF",
    positionDetail: "Défenseur Latéral",
    height: 1.80,
    isFamous: true,
    career: [
      { club: "Liverpool FC Academy", years: "2004 - 2016", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Liverpool FC", years: "2016 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "39",
    name: "Bruno Fernandes",
    nationality: "Portugal",
    flag: "🇵🇹",
    league: "Premier League",
    club: "Manchester United",
    age: 31,
    number: 8,
    category: "MIL",
    positionDetail: "Milieu Offensif",
    height: 1.79,
    isFamous: true,
    career: [
      { club: "Novara Calcio", years: "2012 - 2013", flag: "🇮🇹" },
      { club: "Udinese Calcio", years: "2013 - 2016", flag: "🇮🇹" },
      { club: "Sampdoria Gênes", years: "2016 - 2017", flag: "🇮🇹" },
      { club: "Sporting CP", years: "2017 - 2020", flag: "🇵🇹" },
      { club: "Manchester United", years: "2020 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "40",
    name: "Marcus Rashford",
    nationality: "Angleterre",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    league: "Premier League",
    club: "Manchester United",
    age: 28,
    number: 10,
    category: "ATT",
    positionDetail: "Ailier Gauche",
    height: 1.86,
    isFamous: true,
    career: [
      { club: "Manchester United Academy", years: "2005 - 2015", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Manchester United", years: "2015 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "41",
    name: "Alejandro Garnacho",
    nationality: "Argentine",
    flag: "🇦🇷",
    league: "Premier League",
    club: "Manchester United",
    age: 21,
    number: 17,
    category: "ATT",
    positionDetail: "Ailier Droit / Gauche",
    height: 1.80,
    isFamous: false,
    career: [
      { club: "Atlético Madrid U19", years: "2015 - 2020", flag: "🇪🇸" },
      { club: "Manchester United", years: "2020 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "42",
    name: "Cole Palmer",
    nationality: "Angleterre",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    league: "Premier League",
    club: "Chelsea",
    age: 24,
    number: 20,
    category: "MIL",
    positionDetail: "Milieu Offensif",
    height: 1.89,
    isFamous: true,
    career: [
      { club: "Manchester City", years: "2020 - 2023", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Chelsea FC", years: "2023 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "43",
    name: "Enzo Fernández",
    nationality: "Argentine",
    flag: "🇦🇷",
    league: "Premier League",
    club: "Chelsea",
    age: 25,
    number: 8,
    category: "MIL",
    positionDetail: "Milieu Central",
    height: 1.78,
    isFamous: false,
    career: [
      { club: "River Plate", years: "2019 - 2022", flag: "🇦🇷" },
      { club: "Defensa y Justicia (Prêt)", years: "2020 - 2021", flag: "🇦🇷" },
      { club: "SL Benfica", years: "2022 - 2023", flag: "🇵🇹" },
      { club: "Chelsea FC", years: "2023 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "44",
    name: "Moisés Caicedo",
    nationality: "Équateur",
    flag: "🇪🇨",
    league: "Premier League",
    club: "Chelsea",
    age: 24,
    number: 25,
    category: "MIL",
    positionDetail: "Milieu Défensif",
    height: 1.78,
    isFamous: false,
    career: [
      { club: "Independiente del Valle", years: "2019 - 2021", flag: "🇪🇨" },
      { club: "Brighton & Hove Albion", years: "2021 - 2023", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Beerschot VA (Prêt)", years: "2021 - 2022", flag: "🇧🇪" },
      { club: "Chelsea FC", years: "2023 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "45",
    name: "Nicolas Jackson",
    nationality: "Sénégal",
    flag: "🇸🇳",
    league: "Premier League",
    club: "Chelsea",
    age: 24,
    number: 15,
    category: "ATT",
    positionDetail: "Buteur",
    height: 1.86,
    isFamous: false,
    career: [
      { club: "Casa Pia (Prêt)", years: "2020 - 2021", flag: "🇵🇹" },
      { club: "Villarreal CF", years: "2021 - 2023", flag: "🇪🇸" },
      { club: "Chelsea FC", years: "2023 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "46",
    name: "Son Heung-min",
    nationality: "Corée du Sud",
    flag: "🇰🇷",
    league: "Premier League",
    club: "Tottenham Hotspur",
    age: 33,
    number: 7,
    category: "ATT",
    positionDetail: "Ailier Gauche",
    height: 1.84,
    isFamous: true,
    career: [
      { club: "Hambourg SV", years: "2010 - 2013", flag: "🇩🇪" },
      { club: "Bayer Leverkusen", years: "2013 - 2015", flag: "🇩🇪" },
      { club: "Tottenham Hotspur", years: "2015 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "47",
    name: "James Maddison",
    nationality: "Angleterre",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    league: "Premier League",
    club: "Tottenham Hotspur",
    age: 29,
    number: 10,
    category: "MIL",
    positionDetail: "Milieu Offensif",
    height: 1.75,
    isFamous: false,
    career: [
      { club: "Coventry City", years: "2013 - 2016", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Norwich City", years: "2016 - 2018", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Aberdeen FC (Prêt)", years: "2016", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
      { club: "Leicester City", years: "2018 - 2023", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Tottenham Hotspur", years: "2023 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "48",
    name: "Cristian Romero",
    nationality: "Argentine",
    flag: "🇦🇷",
    league: "Premier League",
    club: "Tottenham Hotspur",
    age: 28,
    number: 13,
    category: "DEF",
    positionDetail: "Défenseur Central",
    height: 1.85,
    isFamous: false,
    career: [
      { club: "Belgrano", years: "2016 - 2018", flag: "🇦🇷" },
      { club: "Genoa CFC", years: "2018 - 2020", flag: "🇮🇹" },
      { club: "Atalanta Bergame", years: "2020 - 2021", flag: "🇮🇹" },
      { club: "Tottenham Hotspur", years: "2021 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "49",
    name: "Ollie Watkins",
    nationality: "Angleterre",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    league: "Premier League",
    club: "Aston Villa",
    age: 30,
    number: 11,
    category: "ATT",
    positionDetail: "Buteur",
    height: 1.80,
    isFamous: false,
    career: [
      { club: "Exeter City", years: "2014 - 2017", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Weston-super-Mare (Prêt)", years: "2014 - 2015", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Brentford FC", years: "2017 - 2020", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Aston Villa", years: "2020 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "50",
    name: "Alexander Isak",
    nationality: "Suède",
    flag: "🇸🇪",
    league: "Premier League",
    club: "Newcastle United",
    age: 26,
    number: 14,
    category: "ATT",
    positionDetail: "Buteur",
    height: 1.92,
    isFamous: false,
    career: [
      { club: "AIK", years: "2016 - 2017", flag: "🇸🇪" },
      { club: "Borussia Dortmund", years: "2017 - 2019", flag: "🇩🇪" },
      { club: "Willem II (Prêt)", years: "2019", flag: "🇳🇱" },
      { club: "Real Sociedad", years: "2019 - 2022", flag: "🇪🇸" },
      { club: "Newcastle United", years: "2022 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "51",
    name: "Vinícius Júnior",
    nationality: "Brésil",
    flag: "🇧🇷",
    league: "La Liga",
    club: "Real Madrid",
    age: 25,
    number: 7,
    category: "ATT",
    positionDetail: "Ailier Gauche",
    height: 1.76,
    isFamous: true,
    career: [
      { club: "Flamengo", years: "2017 - 2018", flag: "🇧🇷" },
      { club: "Real Madrid", years: "2018 - Présent", flag: "🇪🇸" }
    ]
  },
  {
    id: "52",
    name: "Rodrygo Goes",
    nationality: "Brésil",
    flag: "🇧🇷",
    league: "La Liga",
    club: "Real Madrid",
    age: 25,
    number: 11,
    category: "ATT",
    positionDetail: "Ailier / Attaquant",
    height: 1.74,
    isFamous: false,
    career: [
      { club: "Santos FC", years: "2017 - 2019", flag: "🇧🇷" },
      { club: "Real Madrid", years: "2019 - Présent", flag: "🇪🇸" }
    ]
  },
  {
    id: "53",
    name: "Aurélien Tchouaméni",
    nationality: "France",
    flag: "🇫🇷",
    league: "La Liga",
    club: "Real Madrid",
    age: 26,
    number: 14,
    category: "MIL",
    positionDetail: "Milieu Défensif",
    height: 1.88,
    isFamous: false,
    career: [
      { club: "Girondins de Bordeaux", years: "2018 - 2020", flag: "🇫🇷" },
      { club: "AS Monaco", years: "2020 - 2022", flag: "🇫🇷" },
      { club: "Real Madrid", years: "2022 - Présent", flag: "🇪🇸" }
    ]
  },
  {
    id: "54",
    name: "Eduardo Camavinga",
    nationality: "France",
    flag: "🇫🇷",
    league: "La Liga",
    club: "Real Madrid",
    age: 23,
    number: 6,
    category: "MIL",
    positionDetail: "Milieu Central",
    height: 1.82,
    isFamous: false,
    career: [
      { club: "Stade Rennais", years: "2018 - 2021", flag: "🇫🇷" },
      { club: "Real Madrid", years: "2021 - Présent", flag: "🇪🇸" }
    ]
  },
  {
    id: "55",
    name: "Antonio Rüdiger",
    nationality: "Allemagne",
    flag: "🇩🇪",
    league: "La Liga",
    club: "Real Madrid",
    age: 33,
    number: 22,
    category: "DEF",
    positionDetail: "Défenseur Central",
    height: 1.90,
    isFamous: false,
    career: [
      { club: "VfB Stuttgart", years: "2011 - 2015", flag: "🇩🇪" },
      { club: "AS Rome", years: "2015 - 2017", flag: "🇮🇹" },
      { club: "Chelsea FC", years: "2017 - 2022", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Real Madrid", years: "2022 - Présent", flag: "🇪🇸" }
    ]
  },
  {
    id: "56",
    name: "Dani Carvajal",
    nationality: "Espagne",
    flag: "🇪🇸",
    league: "La Liga",
    club: "Real Madrid",
    age: 34,
    number: 2,
    category: "DEF",
    positionDetail: "Défenseur Latéral",
    height: 1.73,
    isFamous: false,
    career: [
      { club: "Bayer Leverkusen", years: "2012 - 2013", flag: "🇩🇪" },
      { club: "Real Madrid", years: "2013 - Présent", flag: "🇪🇸" }
    ]
  },
  {
    id: "57",
    name: "Frenkie de Jong",
    nationality: "Pays-Bas",
    flag: "🇳🇱",
    league: "La Liga",
    club: "FC Barcelona",
    age: 29,
    number: 21,
    category: "MIL",
    positionDetail: "Milieu Central",
    height: 1.80,
    isFamous: false,
    career: [
      { club: "Willem II", years: "2015", flag: "🇳🇱" },
      { club: "Ajax Amsterdam", years: "2015 - 2019", flag: "🇳🇱" },
      { club: "FC Barcelone", years: "2019 - Présent", flag: "🇪🇸" }
    ]
  },
  {
    id: "58",
    name: "Gavi",
    nationality: "Espagne",
    flag: "🇪🇸",
    league: "La Liga",
    club: "FC Barcelona",
    age: 21,
    number: 6,
    category: "MIL",
    positionDetail: "Milieu Central",
    height: 1.73,
    isFamous: true,
    career: [
      { club: "FC Barcelone B", years: "2020 - 2021", flag: "🇪🇸" },
      { club: "FC Barcelone", years: "2021 - Présent", flag: "🇪🇸" }
    ]
  },
  {
    id: "59",
    name: "Lamine Yamal",
    nationality: "Espagne",
    flag: "🇪🇸",
    league: "La Liga",
    club: "FC Barcelona",
    age: 18,
    number: 19,
    category: "ATT",
    positionDetail: "Ailier Droit",
    height: 1.78,
    isFamous: true,
    career: [
      { club: "FC Barcelone Academy", years: "2014 - 2023", flag: "🇪🇸" },
      { club: "FC Barcelone", years: "2023 - Présent", flag: "🇪🇸" }
    ]
  },
  {
    id: "60",
    name: "Ronald Araújo",
    nationality: "Uruguay",
    flag: "🇺🇾",
    league: "La Liga",
    club: "FC Barcelona",
    age: 27,
    number: 4,
    category: "DEF",
    positionDetail: "Défenseur Central",
    height: 1.88,
    isFamous: false,
    career: [
      { club: "Rentistas", years: "2016 - 2017", flag: "🇺🇾" },
      { club: "Boston River", years: "2017 - 2018", flag: "🇺🇾" },
      { club: "FC Barcelone B", years: "2018 - 2020", flag: "🇪🇸" },
      { club: "FC Barcelone", years: "2020 - Présent", flag: "🇪🇸" }
    ]
  },
  {
    id: "61",
    name: "Marc-André ter Stegen",
    nationality: "Allemagne",
    flag: "🇩🇪",
    league: "La Liga",
    club: "FC Barcelona",
    age: 34,
    number: 1,
    category: "G",
    positionDetail: "Gardien",
    height: 1.87,
    isFamous: true,
    career: [
      { club: "Borussia Mönchengladbach", years: "2009 - 2014", flag: "🇩🇪" },
      { club: "FC Barcelone", years: "2014 - Présent", flag: "🇪🇸" }
    ]
  },
  {
    id: "62",
    name: "Jan Oblak",
    nationality: "Slovénie",
    flag: "🇸🇮",
    league: "La Liga",
    club: "Atlético Madrid",
    age: 33,
    number: 13,
    category: "G",
    positionDetail: "Gardien",
    height: 1.88,
    isFamous: true,
    career: [
      { club: "Olimpija Ljubljana", years: "2009 - 2010", flag: "🇸🇮" },
      { club: "SL Benfica", years: "2010 - 2014", flag: "🇵🇹" },
      { club: "Beira-Mar (Prêt)", years: "2010 - 2011", flag: "🇵🇹" },
      { club: "Olhanense (Prêt)", years: "2011 - 2012", flag: "🇵🇹" },
      { club: "Rio Ave (Prêt)", years: "2012 - 2013", flag: "🇵🇹" },
      { club: "Atlético Madrid", years: "2014 - Présent", flag: "🇪🇸" }
    ]
  },
  {
    id: "63",
    name: "Rodrigo De Paul",
    nationality: "Argentine",
    flag: "🇦🇷",
    league: "La Liga",
    club: "Atlético Madrid",
    age: 32,
    number: 5,
    category: "MIL",
    positionDetail: "Milieu Central",
    height: 1.80,
    isFamous: false,
    career: [
      { club: "Racing Club", years: "2012 - 2014", flag: "🇦🇷" },
      { club: "Valence CF", years: "2014 - 2016", flag: "🇪🇸" },
      { club: "Udinese Calcio", years: "2016 - 2021", flag: "🇮🇹" },
      { club: "Atlético Madrid", years: "2021 - Présent", flag: "🇪🇸" }
    ]
  },
  {
    id: "64",
    name: "Marcos Llorente",
    nationality: "Espagne",
    flag: "🇪🇸",
    league: "La Liga",
    club: "Atlético Madrid",
    age: 31,
    number: 14,
    category: "MIL",
    positionDetail: "Milieu Central / Latéral",
    height: 1.84,
    isFamous: false,
    career: [
      { club: "Real Madrid", years: "2015 - 2019", flag: "🇪🇸" },
      { club: "Deportivo Alavés (Prêt)", years: "2016 - 2017", flag: "🇪🇸" },
      { club: "Atlético Madrid", years: "2019 - Présent", flag: "🇪🇸" }
    ]
  },
  {
    id: "65",
    name: "Takefusa Kubo",
    nationality: "Japon",
    flag: "🇯🇵",
    league: "La Liga",
    club: "Real Sociedad",
    age: 25,
    number: 14,
    category: "ATT",
    positionDetail: "Ailier Droit",
    height: 1.73,
    isFamous: false,
    career: [
      { club: "FC Tokyo", years: "2016 - 2019", flag: "🇯🇵" },
      { club: "Real Madrid", years: "2019 - 2022", flag: "🇪🇸" },
      { club: "RCD Majorque (Prêt)", years: "2019 - 2020", flag: "🇪🇸" },
      { club: "Villarreal CF (Prêt)", years: "2020 - 2021", flag: "🇪🇸" },
      { club: "Getafe CF (Prêt)", years: "2021", flag: "🇪🇸" },
      { club: "Real Sociedad", years: "2022 - Présent", flag: "🇪🇸" }
    ]
  },
  {
    id: "66",
    name: "Nico Williams",
    nationality: "Espagne",
    flag: "🇪🇸",
    league: "La Liga",
    club: "Athletic Bilbao",
    age: 23,
    number: 10,
    category: "ATT",
    positionDetail: "Ailier Gauche",
    height: 1.81,
    isFamous: true,
    career: [
      { club: "Athletic Bilbao B", years: "2020 - 2021", flag: "🇪🇸" },
      { club: "Athletic Bilbao", years: "2020 - Présent", flag: "🇪🇸" }
    ]
  },
  {
    id: "67",
    name: "Artem Dovbyk",
    nationality: "Ukraine",
    flag: "🇺🇦",
    league: "Serie A",
    club: "AS Roma",
    age: 28,
    number: 11,
    category: "ATT",
    positionDetail: "Buteur",
    height: 1.89,
    isFamous: false,
    career: [
      { club: "Dnipro Dnipropetrovsk", years: "2015 - 2018", flag: "🇺🇦" },
      { club: "FC Midtjylland", years: "2018 - 2020", flag: "🇩🇰" },
      { club: "SK Dnipro-1", years: "2020 - 2023", flag: "🇺🇦" },
      { club: "Girona FC", years: "2023 - 2024", flag: "🇪🇸" },
      { club: "AS Rome", years: "2024 - Présent", flag: "🇮🇹" }
    ]
  },
  {
    id: "68",
    name: "Warren Zaïre-Emery",
    nationality: "France",
    flag: "🇫🇷",
    league: "Ligue 1",
    club: "Paris Saint-Germain",
    age: 20,
    number: 33,
    category: "MIL",
    positionDetail: "Milieu Central",
    height: 1.78,
    isFamous: false,
    career: [
      { club: "Paris Saint-Germain Academy", years: "2014 - 2022", flag: "🇫🇷" },
      { club: "Paris Saint-Germain", years: "2022 - Présent", flag: "🇫🇷" }
    ]
  },
  {
    id: "69",
    name: "Vitinha",
    nationality: "Portugal",
    flag: "🇵🇹",
    league: "Ligue 1",
    club: "Paris Saint-Germain",
    age: 26,
    number: 17,
    category: "MIL",
    positionDetail: "Milieu Central",
    height: 1.72,
    isFamous: false,
    career: [
      { club: "FC Porto", years: "2020 - 2022", flag: "🇵🇹" },
      { club: "Wolverhampton Wanderers (Prêt)", years: "2020 - 2021", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Paris Saint-Germain", years: "2022 - Présent", flag: "🇫🇷" }
    ]
  },
  {
    id: "70",
    name: "Bradley Barcola",
    nationality: "France",
    flag: "🇫🇷",
    league: "Ligue 1",
    club: "Paris Saint-Germain",
    age: 23,
    number: 29,
    category: "ATT",
    positionDetail: "Ailier Gauche",
    height: 1.82,
    isFamous: false,
    career: [
      { club: "Olympique Lyonnais", years: "2021 - 2023", flag: "🇫🇷" },
      { club: "Paris Saint-Germain", years: "2023 - Présent", flag: "🇫🇷" }
    ]
  },
  {
    id: "71",
    name: "Lucas Hernández",
    nationality: "France",
    flag: "🇫🇷",
    league: "Ligue 1",
    club: "Paris Saint-Germain",
    age: 30,
    number: 21,
    category: "DEF",
    positionDetail: "Défenseur Central / Latéral",
    height: 1.84,
    isFamous: false,
    career: [
      { club: "Atlético Madrid", years: "2014 - 2019", flag: "🇪🇸" },
      { club: "Bayern Munich", years: "2019 - 2023", flag: "🇩🇪" },
      { club: "Paris Saint-Germain", years: "2023 - Présent", flag: "🇫🇷" }
    ]
  },
  {
    id: "72",
    name: "Jonathan David",
    nationality: "Canada",
    flag: "🇨🇦",
    league: "Ligue 1",
    club: "Lille OSC",
    age: 26,
    number: 9,
    category: "ATT",
    positionDetail: "Buteur",
    height: 1.80,
    isFamous: false,
    career: [
      { club: "KAA La Gantoise", years: "2018 - 2020", flag: "🇧🇪" },
      { club: "Lille OSC", years: "2020 - Présent", flag: "🇫🇷" }
    ]
  },
  {
    id: "73",
    name: "Pierre-Emerick Aubameyang",
    nationality: "Gabon",
    flag: "🇬🇦",
    league: "Saudi Pro League",
    club: "Al-Qadsiah FC",
    age: 37,
    number: 10,
    category: "ATT",
    positionDetail: "Buteur",
    height: 1.87,
    isFamous: false,
    career: [
      { club: "AC Milan", years: "2008 - 2011", flag: "🇮🇹" },
      { club: "Dijon FCO (Prêt)", years: "2008 - 2009", flag: "🇫🇷" },
      { club: "Lille OSC (Prêt)", years: "2009 - 2010", flag: "🇫🇷" },
      { club: "AS Monaco (Prêt)", years: "2010 - 2011", flag: "🇫🇷" },
      { club: "AS Saint-Étienne", years: "2011 - 2013", flag: "🇫🇷" },
      { club: "Borussia Dortmund", years: "2013 - 2018", flag: "🇩🇪" },
      { club: "Arsenal FC", years: "2018 - 2022", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "FC Barcelone", years: "2022", flag: "🇪🇸" },
      { club: "Chelsea FC", years: "2022 - 2023", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Olympique de Marseille", years: "2023 - 2024", flag: "🇫🇷" },
      { club: "Al-Qadsiah FC", years: "2024 - Présent", flag: "🇸🇦" }
    ]
  },
  {
    id: "74",
    name: "Alexandre Lacazette",
    nationality: "France",
    flag: "🇫🇷",
    league: "Ligue 1",
    club: "Olympique Lyonnais",
    age: 35,
    number: 10,
    category: "ATT",
    positionDetail: "Buteur",
    height: 1.75,
    isFamous: false,
    career: [
      { club: "Olympique Lyonnais", years: "2010 - 2017", flag: "🇫🇷" },
      { club: "Arsenal FC", years: "2017 - 2022", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Olympique Lyonnais", years: "2022 - Présent", flag: "🇫🇷" }
    ]
  },
  {
    id: "75",
    name: "Hakan Çalhanoğlu",
    nationality: "Turquie",
    flag: "🇹🇷",
    league: "Serie A",
    club: "Inter Milan",
    age: 32,
    number: 20,
    category: "MIL",
    positionDetail: "Milieu Central",
    height: 1.78,
    isFamous: false,
    career: [
      { club: "Karlsruher SC", years: "2011 - 2013", flag: "🇩🇪" },
      { club: "Hambourg SV", years: "2013 - 2014", flag: "🇩🇪" },
      { club: "Bayer Leverkusen", years: "2014 - 2017", flag: "🇩🇪" },
      { club: "AC Milan", years: "2017 - 2021", flag: "🇮🇹" },
      { club: "Inter Milan", years: "2021 - Présent", flag: "🇮🇹" }
    ]
  },
  {
    id: "76",
    name: "Marcus Thuram",
    nationality: "France",
    flag: "🇫🇷",
    league: "Serie A",
    club: "Inter Milan",
    age: 28,
    number: 9,
    category: "ATT",
    positionDetail: "Buteur / Ailier",
    height: 1.92,
    isFamous: false,
    career: [
      { club: "FC Sochaux", years: "2015 - 2017", flag: "🇫🇷" },
      { club: "EA Guingamp", years: "2017 - 2019", flag: "🇫🇷" },
      { club: "Borussia Mönchengladbach", years: "2019 - 2023", flag: "🇩🇪" },
      { club: "Inter Milan", years: "2023 - Présent", flag: "🇮🇹" }
    ]
  },
  {
    id: "77",
    name: "Alessandro Bastoni",
    nationality: "Italie",
    flag: "🇮🇹",
    league: "Serie A",
    club: "Inter Milan",
    age: 27,
    number: 95,
    category: "DEF",
    positionDetail: "Défenseur Central",
    height: 1.90,
    isFamous: false,
    career: [
      { club: "Atalanta Bergame", years: "2016 - 2017", flag: "🇮🇹" },
      { club: "Inter Milan", years: "2017 - Présent", flag: "🇮🇹" },
      { club: "Parme Calcio (Prêt)", years: "2018 - 2019", flag: "🇮🇹" }
    ]
  },
  {
    id: "78",
    name: "Yann Sommer",
    nationality: "Suisse",
    flag: "🇨🇭",
    league: "Serie A",
    club: "Inter Milan",
    age: 37,
    number: 1,
    category: "G",
    positionDetail: "Gardien",
    height: 1.83,
    isFamous: true,
    career: [
      { club: "FC Bâle", years: "2007 - 2014", flag: "🇨🇭" },
      { club: "FC Vaduz (Prêt)", years: "2007 - 2009", flag: "🇱🇮" },
      { club: "Grasshopper Zurich (Prêt)", years: "2009 - 2010", flag: "🇨🇭" },
      { club: "Borussia Mönchengladbach", years: "2014 - 2023", flag: "🇩🇪" },
      { club: "Bayern Munich", years: "2023", flag: "🇩🇪" },
      { club: "Inter Milan", years: "2023 - Présent", flag: "🇮🇹" }
    ]
  },
  {
    id: "79",
    name: "Rafael Leão",
    nationality: "Portugal",
    flag: "🇵🇹",
    league: "Serie A",
    club: "AC Milan",
    age: 27,
    number: 10,
    category: "ATT",
    positionDetail: "Ailier Gauche",
    height: 1.88,
    isFamous: true,
    career: [
      { club: "Sporting CP", years: "2017 - 2018", flag: "🇵🇹" },
      { club: "Lille OSC", years: "2018 - 2019", flag: "🇫🇷" },
      { club: "AC Milan", years: "2019 - Présent", flag: "🇮🇹" }
    ]
  },
  {
    id: "80",
    name: "Theo Hernández",
    nationality: "France",
    flag: "🇫🇷",
    league: "Serie A",
    club: "AC Milan",
    age: 28,
    number: 19,
    category: "DEF",
    positionDetail: "Défenseur Latéral",
    height: 1.84,
    isFamous: true,
    career: [
      { club: "Deportivo Alavés (Prêt)", years: "2016 - 2017", flag: "🇪🇸" },
      { club: "Real Madrid", years: "2017 - 2019", flag: "🇪🇸" },
      { club: "Real Sociedad (Prêt)", years: "2018 - 2019", flag: "🇪🇸" },
      { club: "AC Milan", years: "2019 - Présent", flag: "🇮🇹" }
    ]
  },
  {
    id: "81",
    name: "Mike Maignan",
    nationality: "France",
    flag: "🇫🇷",
    league: "Serie A",
    club: "AC Milan",
    age: 30,
    number: 16,
    category: "G",
    positionDetail: "Gardien",
    height: 1.91,
    isFamous: true,
    career: [
      { club: "Lille OSC", years: "2015 - 2021", flag: "🇫🇷" },
      { club: "AC Milan", years: "2021 - Présent", flag: "🇮🇹" }
    ]
  },
  {
    id: "82",
    name: "Christian Pulisic",
    nationality: "États-Unis",
    flag: "🇺🇸",
    league: "Serie A",
    club: "AC Milan",
    age: 27,
    number: 11,
    category: "ATT",
    positionDetail: "Ailier Droit / Gauche",
    height: 1.77,
    isFamous: true,
    career: [
      { club: "Borussia Dortmund", years: "2016 - 2019", flag: "🇩🇪" },
      { club: "Chelsea FC", years: "2019 - 2023", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "AC Milan", years: "2023 - Présent", flag: "🇮🇹" }
    ]
  },
  {
    id: "83",
    name: "Dušan Vlahović",
    nationality: "Serbie",
    flag: "🇷🇸",
    league: "Serie A",
    club: "Juventus",
    age: 26,
    number: 9,
    category: "ATT",
    positionDetail: "Buteur",
    height: 1.90,
    isFamous: true,
    career: [
      { club: "Partizan Belgrade", years: "2016 - 2018", flag: "🇷🇸" },
      { club: "ACF Fiorentina", years: "2018 - 2022", flag: "🇮🇹" },
      { club: "Juventus", years: "2022 - Présent", flag: "🇮🇹" }
    ]
  },
  {
    id: "84",
    name: "Gleison Bremer",
    nationality: "Brésil",
    flag: "🇧🇷",
    league: "Serie A",
    club: "Juventus",
    age: 29,
    number: 3,
    category: "DEF",
    positionDetail: "Défenseur Central",
    height: 1.88,
    isFamous: false,
    career: [
      { club: "Atlético Mineiro", years: "2017 - 2018", flag: "🇧🇷" },
      { club: "Torino FC", years: "2018 - 2022", flag: "🇮🇹" },
      { club: "Juventus", years: "2022 - Présent", flag: "🇮🇹" }
    ]
  },
  {
    id: "85",
    name: "Manuel Locatelli",
    nationality: "Italie",
    flag: "🇮🇹",
    league: "Serie A",
    club: "Juventus",
    age: 28,
    number: 5,
    category: "MIL",
    positionDetail: "Milieu Central",
    height: 1.85,
    isFamous: false,
    career: [
      { club: "AC Milan", years: "2015 - 2019", flag: "🇮🇹" },
      { club: "Sassuolo Calcio", years: "2018 - 2021", flag: "🇮🇹" },
      { club: "Juventus", years: "2021 - Présent", flag: "🇮🇹" }
    ]
  },
  {
    id: "86",
    name: "Khvicha Kvaratskhelia",
    nationality: "Géorgie",
    flag: "🇬🇪",
    league: "Serie A",
    club: "SSC Napoli",
    age: 25,
    number: 77,
    category: "ATT",
    positionDetail: "Ailier Gauche",
    height: 1.83,
    isFamous: true,
    career: [
      { club: "Rustavi", years: "2018", flag: "🇬🇪" },
      { club: "Lokomotiv Moscou (Prêt)", years: "2019", flag: "🇷🇺" },
      { club: "Rubin Kazan", years: "2019 - 2022", flag: "🇷🇺" },
      { club: "Dinamo Batoumi", years: "2022", flag: "🇬🇪" },
      { club: "SSC Naples", years: "2022 - Présent", flag: "🇮🇹" }
    ]
  },
  {
    id: "87",
    name: "Paulo Dybala",
    nationality: "Argentine",
    flag: "🇦🇷",
    league: "Serie A",
    club: "AS Roma",
    age: 32,
    number: 21,
    category: "ATT",
    positionDetail: "Meneur / Attaquant",
    height: 1.77,
    isFamous: true,
    career: [
      { club: "Instituto de Córdoba", years: "2011 - 2012", flag: "🇦🇷" },
      { club: "US Palerme", years: "2012 - 2015", flag: "🇮🇹" },
      { club: "Juventus", years: "2015 - 2022", flag: "🇮🇹" },
      { club: "AS Rome", years: "2022 - Présent", flag: "🇮🇹" }
    ]
  },
  {
    id: "88",
    name: "Lorenzo Pellegrini",
    nationality: "Italie",
    flag: "🇮🇹",
    league: "Serie A",
    club: "AS Roma",
    age: 30,
    number: 7,
    category: "MIL",
    positionDetail: "Milieu Offensif",
    height: 1.86,
    isFamous: false,
    career: [
      { club: "AS Rome", years: "2014 - 2015", flag: "🇮🇹" },
      { club: "Sassuolo Calcio", years: "2015 - 2017", flag: "🇮🇹" },
      { club: "AS Rome", years: "2017 - Présent", flag: "🇮🇹" }
    ]
  },
  {
    id: "89",
    name: "Joshua Kimmich",
    nationality: "Allemagne",
    flag: "🇩🇪",
    league: "Bundesliga",
    club: "Bayern Munich",
    age: 31,
    number: 6,
    category: "MIL",
    positionDetail: "Milieu Central / Latéral",
    height: 1.77,
    isFamous: true,
    career: [
      { club: "RB Leipzig", years: "2013 - 2015", flag: "🇩🇪" },
      { club: "Bayern Munich", years: "2015 - Présent", flag: "🇩🇪" }
    ]
  },
  {
    id: "90",
    name: "Leroy Sané",
    nationality: "Allemagne",
    flag: "🇩🇪",
    league: "Bundesliga",
    club: "Bayern Munich",
    age: 30,
    number: 10,
    category: "ATT",
    positionDetail: "Ailier",
    height: 1.83,
    isFamous: true,
    career: [
      { club: "Schalke 04", years: "2014 - 2016", flag: "🇩🇪" },
      { club: "Manchester City", years: "2016 - 2020", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Bayern Munich", years: "2020 - Présent", flag: "🇩🇪" }
    ]
  },
  {
    id: "91",
    name: "Kingsley Coman",
    nationality: "France",
    flag: "🇫🇷",
    league: "Bundesliga",
    club: "Bayern Munich",
    age: 30,
    number: 11,
    category: "ATT",
    positionDetail: "Ailier",
    height: 1.80,
    isFamous: false,
    career: [
      { club: "Paris Saint-Germain", years: "2013 - 2014", flag: "🇫🇷" },
      { club: "Juventus", years: "2014 - 2015", flag: "🇮🇹" },
      { club: "Bayern Munich", years: "2015 - Présent", flag: "🇩🇪" }
    ]
  },
  {
    id: "92",
    name: "Dayot Upamecano",
    nationality: "France",
    flag: "🇫🇷",
    league: "Bundesliga",
    club: "Bayern Munich",
    age: 27,
    number: 2,
    category: "DEF",
    positionDetail: "Défenseur Central",
    height: 1.86,
    isFamous: false,
    career: [
      { club: "Red Bull Salzbourg", years: "2015 - 2017", flag: "🇦🇹" },
      { club: "RB Leipzig", years: "2017 - 2021", flag: "🇩🇪" },
      { club: "Bayern Munich", years: "2021 - Présent", flag: "🇩🇪" }
    ]
  },
  {
    id: "93",
    name: "Manuel Neuer",
    nationality: "Allemagne",
    flag: "🇩🇪",
    league: "Bundesliga",
    club: "Bayern Munich",
    age: 40,
    number: 1,
    category: "G",
    positionDetail: "Gardien",
    height: 1.93,
    isFamous: true,
    career: [
      { club: "Schalke 04", years: "2006 - 2011", flag: "🇩🇪" },
      { club: "Bayern Munich", years: "2011 - Présent", flag: "🇩🇪" }
    ]
  },
  {
    id: "94",
    name: "Jeremie Frimpong",
    nationality: "Pays-Bas",
    flag: "🇳🇱",
    league: "Bundesliga",
    club: "Bayer Leverkusen",
    age: 25,
    number: 30,
    category: "DEF",
    positionDetail: "Défenseur Latéral / Ailier",
    height: 1.71,
    isFamous: false,
    career: [
      { club: "Celtic Glasgow", years: "2019 - 2021", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
      { club: "Bayer Leverkusen", years: "2021 - Présent", flag: "🇩🇪" }
    ]
  },
  {
    id: "95",
    name: "Alejandro Grimaldo",
    nationality: "Espagne",
    flag: "🇪🇸",
    league: "Bundesliga",
    club: "Bayer Leverkusen",
    age: 30,
    number: 20,
    category: "DEF",
    positionDetail: "Défenseur Latéral",
    height: 1.71,
    isFamous: false,
    career: [
      { club: "SL Benfica", years: "2016 - 2023", flag: "🇵🇹" },
      { club: "Bayer Leverkusen", years: "2023 - Présent", flag: "🇩🇪" }
    ]
  },
  {
    id: "96",
    name: "Granit Xhaka",
    nationality: "Suisse",
    flag: "🇨🇭",
    league: "Bundesliga",
    club: "Bayer Leverkusen",
    age: 33,
    number: 34,
    category: "MIL",
    positionDetail: "Milieu Central",
    height: 1.85,
    isFamous: true,
    career: [
      { club: "FC Bâle", years: "2010 - 2012", flag: "🇨🇭" },
      { club: "Borussia Mönchengladbach", years: "2012 - 2016", flag: "🇩🇪" },
      { club: "Arsenal FC", years: "2016 - 2023", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Bayer Leverkusen", years: "2023 - Présent", flag: "🇩🇪" }
    ]
  },
  {
    id: "97",
    name: "Jonathan Tah",
    nationality: "Allemagne",
    flag: "🇩🇪",
    league: "Bundesliga",
    club: "Bayer Leverkusen",
    age: 30,
    number: 4,
    category: "DEF",
    positionDetail: "Défenseur Central",
    height: 1.95,
    isFamous: false,
    career: [
      { club: "Hambourg SV", years: "2013 - 2015", flag: "🇩🇪" },
      { club: "Fortuna Düsseldorf (Prêt)", years: "2014 - 2015", flag: "🇩🇪" },
      { club: "Bayer Leverkusen", years: "2015 - Présent", flag: "🇩🇪" }
    ]
  },
  {
    id: "98",
    name: "Julian Brandt",
    nationality: "Allemagne",
    flag: "🇩🇪",
    league: "Bundesliga",
    club: "Borussia Dortmund",
    age: 30,
    number: 10,
    category: "MIL",
    positionDetail: "Milieu Offensif",
    height: 1.85,
    isFamous: false,
    career: [
      { club: "Bayer Leverkusen", years: "2014 - 2019", flag: "🇩🇪" },
      { club: "Borussia Dortmund", years: "2019 - Présent", flag: "🇩🇪" }
    ]
  },
  {
    id: "99",
    name: "Nico Schlotterbeck",
    nationality: "Allemagne",
    flag: "🇩🇪",
    league: "Bundesliga",
    club: "Borussia Dortmund",
    age: 26,
    number: 4,
    category: "DEF",
    positionDetail: "Défenseur Central",
    height: 1.91,
    isFamous: false,
    career: [
      { club: "SC Fribourg", years: "2019 - 2022", flag: "🇩🇪" },
      { club: "Union Berlin (Prêt)", years: "2020 - 2021", flag: "🇩🇪" },
      { club: "Borussia Dortmund", years: "2022 - Présent", flag: "🇩🇪" }
    ]
  },
  {
    id: "100",
    name: "Gregor Kobel",
    nationality: "Suisse",
    flag: "🇨🇭",
    league: "Bundesliga",
    club: "Borussia Dortmund",
    age: 28,
    number: 1,
    category: "G",
    positionDetail: "Gardien",
    height: 1.95,
    isFamous: false,
    career: [
      { club: "TSG Hoffenheim", years: "2016 - 2019", flag: "🇩🇪" },
      { club: "VfB Stuttgart", years: "2019 - 2021", flag: "🇩🇪" },
      { club: "Borussia Dortmund", years: "2021 - Présent", flag: "🇩🇪" }
    ]
  },
  {
    id: "101",
    name: "Xavi Simons",
    nationality: "Pays-Bas",
    flag: "🇳🇱",
    league: "Bundesliga",
    club: "RB Leipzig",
    age: 23,
    number: 20,
    category: "MIL",
    positionDetail: "Milieu Offensif",
    height: 1.79,
    isFamous: false,
    career: [
      { club: "Paris Saint-Germain", years: "2021 - 2022", flag: "🇫🇷" },
      { club: "PSV Eindhoven", years: "2022 - 2023", flag: "🇳🇱" },
      { club: "RB Leipzig (Prêt)", years: "2023 - Présent", flag: "🇩🇪" }
    ]
  },
  {
    id: "102",
    name: "Loïs Openda",
    nationality: "Belgique",
    flag: "🇧🇪",
    league: "Bundesliga",
    club: "RB Leipzig",
    age: 26,
    number: 11,
    category: "ATT",
    positionDetail: "Buteur",
    height: 1.77,
    isFamous: false,
    career: [
      { club: "Club Bruges", years: "2018 - 2022", flag: "🇧🇪" },
      { club: "Vitesse Arnhem (Prêt)", years: "2020 - 2022", flag: "🇳🇱" },
      { club: "RC Lens", years: "2022 - 2023", flag: "🇫🇷" },
      { club: "RB Leipzig", years: "2023 - Présent", flag: "🇩🇪" }
    ]
  },
  {
    id: "103",
    name: "Neymar Jr",
    nationality: "Brésil",
    flag: "🇧🇷",
    league: "Saudi Pro League",
    club: "Al-Hilal SFC",
    age: 34,
    number: 10,
    category: "ATT",
    positionDetail: "Ailier / Meneur",
    height: 1.75,
    isFamous: true,
    career: [
      { club: "Santos FC", years: "2009 - 2013", flag: "🇧🇷" },
      { club: "FC Barcelone", years: "2013 - 2017", flag: "🇪🇸" },
      { club: "Paris Saint-Germain", years: "2017 - 2023", flag: "🇫🇷" },
      { club: "Al-Hilal SFC", years: "2023 - Présent", flag: "🇸🇦" }
    ]
  },
  {
    id: "104",
    name: "Karim Benzema",
    nationality: "France",
    flag: "🇫🇷",
    league: "Saudi Pro League",
    club: "Al-Ittihad Club",
    age: 38,
    number: 9,
    category: "ATT",
    positionDetail: "Buteur",
    height: 1.85,
    isFamous: true,
    career: [
      { club: "Olympique Lyonnais", years: "2004 - 2009", flag: "🇫🇷" },
      { club: "Real Madrid", years: "2009 - 2023", flag: "🇪🇸" },
      { club: "Al-Ittihad Club", years: "2023 - Présent", flag: "🇸🇦" }
    ]
  },
  {
    id: "105",
    name: "Sadio Mané",
    nationality: "Sénégal",
    flag: "🇸🇳",
    league: "Saudi Pro League",
    club: "Al-Nassr FC",
    age: 34,
    number: 10,
    category: "ATT",
    positionDetail: "Ailier",
    height: 1.74,
    isFamous: true,
    career: [
      { club: "FC Metz", years: "2011 - 2012", flag: "🇫🇷" },
      { club: "Red Bull Salzbourg", years: "2012 - 2014", flag: "🇦🇹" },
      { club: "Southampton FC", years: "2014 - 2016", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Liverpool FC", years: "2016 - 2022", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Bayern Munich", years: "2022 - 2023", flag: "🇩🇪" },
      { club: "Al-Nassr FC", years: "2023 - Présent", flag: "🇸🇦" }
    ]
  },
  {
    id: "106",
    name: "Riyad Mahrez",
    nationality: "Algérie",
    flag: "🇩🇿",
    league: "Saudi Pro League",
    club: "Al-Ahli SFC",
    age: 35,
    number: 7,
    category: "ATT",
    positionDetail: "Ailier Droit",
    height: 1.79,
    isFamous: true,
    career: [
      { club: "Le Havre AC", years: "2011 - 2014", flag: "🇫🇷" },
      { club: "Leicester City", years: "2014 - 2018", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Manchester City", years: "2018 - 2023", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Al-Ahli SFC", years: "2023 - Présent", flag: "🇸🇦" }
    ]
  },
  {
    id: "107",
    name: "N'Golo Kanté",
    nationality: "France",
    flag: "🇫🇷",
    league: "Saudi Pro League",
    club: "Al-Ittihad Club",
    age: 35,
    number: 7,
    category: "MIL",
    positionDetail: "Milieu Défensif",
    height: 1.68,
    isFamous: true,
    career: [
      { club: "US Boulogne", years: "2012 - 2013", flag: "🇫🇷" },
      { club: "SM Caen", years: "2013 - 2015", flag: "🇫🇷" },
      { club: "Leicester City", years: "2015 - 2016", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Chelsea FC", years: "2016 - 2023", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Al-Ittihad Club", years: "2023 - Présent", flag: "🇸🇦" }
    ]
  },
  {
    id: "108",
    name: "Sergej Milinković-Savić",
    nationality: "Serbie",
    flag: "🇷🇸",
    league: "Saudi Pro League",
    club: "Al-Hilal SFC",
    age: 31,
    number: 22,
    category: "MIL",
    positionDetail: "Milieu Central",
    height: 1.92,
    isFamous: false,
    career: [
      { club: "Vojvodina", years: "2013 - 2014", flag: "🇷🇸" },
      { club: "KRC Genk", years: "2014 - 2015", flag: "🇧🇪" },
      { club: "Lazio Rome", years: "2015 - 2023", flag: "🇮🇹" },
      { club: "Al-Hilal SFC", years: "2023 - Présent", flag: "🇸🇦" }
    ]
  },
  {
    id: "109",
    name: "Rúben Neves",
    nationality: "Portugal",
    flag: "🇵🇹",
    league: "Saudi Pro League",
    club: "Al-Hilal SFC",
    age: 29,
    number: 8,
    category: "MIL",
    positionDetail: "Milieu Central",
    height: 1.80,
    isFamous: false,
    career: [
      { club: "FC Porto", years: "2014 - 2017", flag: "🇵🇹" },
      { club: "Wolverhampton Wanderers", years: "2017 - 2023", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Al-Hilal SFC", years: "2023 - Présent", flag: "🇸🇦" }
    ]
  },
  {
    id: "110",
    name: "Kalidou Koulibaly",
    nationality: "Sénégal",
    flag: "🇸🇳",
    league: "Saudi Pro League",
    club: "Al-Hilal SFC",
    age: 35,
    number: 3,
    category: "DEF",
    positionDetail: "Défenseur Central",
    height: 1.86,
    isFamous: false,
    career: [
      { club: "FC Metz", years: "2010 - 2012", flag: "🇫🇷" },
      { club: "KRC Genk", years: "2012 - 2014", flag: "🇧🇪" },
      { club: "SSC Naples", years: "2014 - 2022", flag: "🇮🇹" },
      { club: "Chelsea FC", years: "2022 - 2023", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Al-Hilal SFC", years: "2023 - Présent", flag: "🇸🇦" }
    ]
  },
  {
    id: "111",
    name: "Yassine Bounou",
    nationality: "Maroc",
    flag: "🇲🇦",
    league: "Saudi Pro League",
    club: "Al-Hilal SFC",
    age: 35,
    number: 37,
    category: "G",
    positionDetail: "Gardien",
    height: 1.92,
    isFamous: false,
    career: [
      { club: "Wydad Casablanca", years: "2010 - 2012", flag: "🇲🇦" },
      { club: "Atlético Madrid", years: "2012 - 2016", flag: "🇪🇸" },
      { club: "Real Saragosse (Prêt)", years: "2014 - 2016", flag: "🇪🇸" },
      { club: "Girona FC", years: "2016 - 2020", flag: "🇪🇸" },
      { club: "Séville FC", years: "2019 - 2023", flag: "🇪🇸" },
      { club: "Al-Hilal SFC", years: "2023 - Présent", flag: "🇸🇦" }
    ]
  },
  {
    id: "112",
    name: "Edouard Mendy",
    nationality: "Sénégal",
    flag: "🇸🇳",
    league: "Saudi Pro League",
    club: "Al-Ahli SFC",
    age: 34,
    number: 16,
    category: "G",
    positionDetail: "Gardien",
    height: 1.94,
    isFamous: false,
    career: [
      { club: "AS Cherbourg", years: "2011 - 2014", flag: "🇫🇷" },
      { club: "Stade de Reims", years: "2016 - 2019", flag: "🇫🇷" },
      { club: "Stade Rennais", years: "2019 - 2020", flag: "🇫🇷" },
      { club: "Chelsea FC", years: "2020 - 2023", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Al-Ahli SFC", years: "2023 - Présent", flag: "🇸🇦" }
    ]
  },
  {
    id: "113",
    name: "Aymeric Laporte",
    nationality: "Espagne",
    flag: "🇪🇸",
    league: "Saudi Pro League",
    club: "Al-Nassr FC",
    age: 32,
    number: 27,
    category: "DEF",
    positionDetail: "Défenseur Central",
    height: 1.91,
    isFamous: false,
    career: [
      { club: "Athletic Bilbao", years: "2012 - 2018", flag: "🇪🇸" },
      { club: "Manchester City", years: "2018 - 2023", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Al-Nassr FC", years: "2023 - Présent", flag: "🇸🇦" }
    ]
  },
  {
    id: "114",
    name: "Marcelo Brozović",
    nationality: "Croatie",
    flag: "🇭🇷",
    league: "Saudi Pro League",
    club: "Al-Nassr FC",
    age: 33,
    number: 77,
    category: "MIL",
    positionDetail: "Milieu Défensif",
    height: 1.81,
    isFamous: false,
    career: [
      { club: "Dinamo Zagreb", years: "2012 - 2015", flag: "🇭🇷" },
      { club: "Inter Milan", years: "2015 - 2023", flag: "🇮🇹" },
      { club: "Al-Nassr FC", years: "2023 - Présent", flag: "🇸🇦" }
    ]
  },
  {
    id: "115",
    name: "Luka Modrić",
    nationality: "Croatie",
    flag: "🇭🇷",
    league: "La Liga",
    club: "Real Madrid",
    age: 40,
    number: 10,
    category: "MIL",
    positionDetail: "Milieu Central",
    height: 1.72,
    isFamous: true,
    career: [
      { club: "Dinamo Zagreb", years: "2003 - 2008", flag: "🇭🇷" },
      { club: "Zrinjski Mostar (Prêt)", years: "2003 - 2004", flag: "🇧🇦" },
      { club: "Inter Zaprešić (Prêt)", years: "2004 - 2005", flag: "🇭🇷" },
      { club: "Tottenham Hotspur", years: "2008 - 2012", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Real Madrid", years: "2012 - Présent", flag: "🇪🇸" }
    ]
  },
  {
    id: "116",
    name: "İlkay Gündoğan",
    nationality: "Allemagne",
    flag: "🇩🇪",
    league: "Premier League",
    club: "Manchester City",
    age: 35,
    number: 19,
    category: "MIL",
    positionDetail: "Milieu Central",
    height: 1.80,
    isFamous: false,
    career: [
      { club: "FC Nuremberg", years: "2009 - 2011", flag: "🇩🇪" },
      { club: "Borussia Dortmund", years: "2011 - 2016", flag: "🇩🇪" },
      { club: "Manchester City", years: "2016 - 2023", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "FC Barcelone", years: "2023 - 2024", flag: "🇪🇸" },
      { club: "Manchester City", years: "2024 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "117",
    name: "Marc Cucurella",
    nationality: "Espagne",
    flag: "🇪🇸",
    league: "Premier League",
    club: "Chelsea",
    age: 27,
    number: 3,
    category: "DEF",
    positionDetail: "Défenseur Latéral",
    height: 1.73,
    isFamous: false,
    career: [
      { club: "SD Eibar (Prêt)", years: "2018 - 2019", flag: "🇪🇸" },
      { club: "Getafe CF", years: "2019 - 2021", flag: "🇪🇸" },
      { club: "Brighton & Hove Albion", years: "2021 - 2022", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Chelsea FC", years: "2022 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "118",
    name: "Joško Gvardiol",
    nationality: "Croatie",
    flag: "🇭🇷",
    league: "Premier League",
    club: "Manchester City",
    age: 24,
    number: 24,
    category: "DEF",
    positionDetail: "Défenseur Central / Latéral",
    height: 1.85,
    isFamous: false,
    career: [
      { club: "Dinamo Zagreb", years: "2019 - 2021", flag: "🇭🇷" },
      { club: "RB Leipzig", years: "2021 - 2023", flag: "🇩🇪" },
      { club: "Manchester City", years: "2023 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "119",
    name: "Micky van de Ven",
    nationality: "Pays-Bas",
    flag: "🇳🇱",
    league: "Premier League",
    club: "Tottenham Hotspur",
    age: 25,
    number: 37,
    category: "DEF",
    positionDetail: "Défenseur Central",
    height: 1.93,
    isFamous: false,
    career: [
      { club: "FC Volendam", years: "2019 - 2021", flag: "🇳🇱" },
      { club: "VfL Wolfsburg", years: "2021 - 2023", flag: "🇩🇪" },
      { club: "Tottenham Hotspur", years: "2023 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "120",
    name: "Ederson Moraes",
    nationality: "Brésil",
    flag: "🇧🇷",
    league: "Premier League",
    club: "Manchester City",
    age: 32,
    number: 31,
    category: "G",
    positionDetail: "Gardien",
    height: 1.88,
    isFamous: false,
    career: [
      { club: "Rio Ave", years: "2012 - 2015", flag: "🇵🇹" },
      { club: "SL Benfica", years: "2015 - 2017", flag: "🇵🇹" },
      { club: "Manchester City", years: "2017 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "121",
    name: "Diogo Costa",
    nationality: "Portugal",
    flag: "🇵🇹",
    league: "Liga Portugal",
    club: "FC Porto",
    age: 26,
    number: 99,
    category: "G",
    positionDetail: "Gardien",
    height: 1.86,
    isFamous: false,
    career: [
      { club: "FC Porto Academy", years: "2011 - 2019", flag: "🇵🇹" },
      { club: "FC Porto", years: "2019 - Présent", flag: "🇵🇹" }
    ]
  },
  {
    id: "122",
    name: "Unai Simón",
    nationality: "Espagne",
    flag: "🇪🇸",
    league: "La Liga",
    club: "Athletic Bilbao",
    age: 29,
    number: 1,
    category: "G",
    positionDetail: "Gardien",
    height: 1.90,
    isFamous: false,
    career: [
      { club: "Basconia", years: "2014 - 2016", flag: "🇪🇸" },
      { club: "Athletic Bilbao B", years: "2016 - 2018", flag: "🇪🇸" },
      { club: "Athletic Bilbao", years: "2018 - Présent", flag: "🇪🇸" }
    ]
  },
  {
    id: "123",
    name: "Jordan Pickford",
    nationality: "Angleterre",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    league: "Premier League",
    club: "Everton FC",
    age: 32,
    number: 1,
    category: "G",
    positionDetail: "Gardien",
    height: 1.85,
    isFamous: false,
    career: [
      { club: "Sunderland AFC", years: "2011 - 2017", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { club: "Everton FC", years: "2017 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "124",
    name: "Federico Chiesa",
    nationality: "Italie",
    flag: "🇮🇹",
    league: "Premier League",
    club: "Liverpool",
    age: 28,
    number: 14,
    category: "ATT",
    positionDetail: "Ailier Droit / Gauche",
    height: 1.75,
    isFamous: false,
    career: [
      { club: "ACF Fiorentina", years: "2016 - 2020", flag: "🇮🇹" },
      { club: "Juventus", years: "2020 - 2024", flag: "🇮🇹" },
      { club: "Liverpool FC", years: "2024 - Présent", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]
  },
  {
    id: "125",
    name: "Marcus Thuram",
    nationality: "France",
    flag: "🇫🇷",
    league: "Serie A",
    club: "Inter Milan",
    age: 28,
    number: 9,
    category: "ATT",
    positionDetail: "Buteur",
    height: 1.92,
    isFamous: false,
    career: [
      { club: "FC Sochaux", years: "2015 - 2017", flag: "🇫🇷" },
      { club: "EA Guingamp", years: "2017 - 2019", flag: "🇫🇷" },
      { club: "Borussia Mönchengladbach", years: "2019 - 2023", flag: "🇩🇪" },
      { club: "Inter Milan", years: "2023 - Présent", flag: "🇮🇹" }
    ]
  }
];
