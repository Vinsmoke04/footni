export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "1",
    question: "Quel pays a remporté la Coupe du Monde 2014 en finale contre l'Argentine ?",
    options: ["Allemagne", "Brésil", "Espagne", "Pays-Bas"],
    answer: "Allemagne"
  },
  {
    id: "2",
    question: "Quel joueur a remporté le plus de Ballons d'Or de l'histoire ?",
    options: ["Lionel Messi", "Cristiano Ronaldo", "Johan Cruyff", "Michel Platini"],
    answer: "Lionel Messi"
  },
  {
    id: "3",
    question: "Quel club a remporté le plus grand nombre de Ligues des Champions (LDC) ?",
    options: ["Real Madrid", "AC Milan", "Bayern Munich", "Liverpool"],
    answer: "Real Madrid"
  },
  {
    id: "4",
    question: "Qui est le meilleur buteur de l'histoire de la Coupe du Monde de la FIFA ?",
    options: ["Miroslav Klose", "Ronaldo (R9)", "Pelé", "Just Fontaine"],
    answer: "Miroslav Klose"
  },
  {
    id: "5",
    question: "Quel club anglais a remporté la Premier League en 2016 à la surprise générale ?",
    options: ["Leicester City", "Tottenham Hotspur", "Chelsea", "Arsenal"],
    answer: "Leicester City"
  },
  {
    id: "6",
    question: "Quel pays a remporté l'Euro 2016 en battant la France en finale ?",
    options: ["Portugal", "Allemagne", "Italie", "Espagne"],
    answer: "Portugal"
  },
  {
    id: "7",
    question: "Quel joueur est le meilleur buteur de l'histoire de la Ligue des Champions (LDC) ?",
    options: ["Cristiano Ronaldo", "Lionel Messi", "Robert Lewandowski", "Karim Benzema"],
    answer: "Cristiano Ronaldo"
  },
  {
    id: "8",
    question: "Quel pays a accueilli et remporté la première Coupe du Monde en 1930 ?",
    options: ["Uruguay", "Argentine", "Italie", "Brésil"],
    answer: "Uruguay"
  },
  {
    id: "9",
    question: "Qui est le seul joueur de l'histoire à avoir remporté trois Coupes du Monde ?",
    options: ["Pelé", "Diego Maradona", "Garrincha", "Ronaldo (R9)"],
    answer: "Pelé"
  },
  {
    id: "10",
    question: "Quel club a réalisé le premier sextuplé (6 trophées sur une année civile) de l'histoire en 2009 ?",
    options: ["FC Barcelone", "Bayern Munich", "Real Madrid", "Manchester United"],
    answer: "FC Barcelone"
  },
  {
    id: "11",
    question: "Qui a remporté le Ballon d'Or masculin en 2022 ?",
    options: ["Karim Benzema", "Sadio Mané", "Lionel Messi", "Kylian Mbappé"],
    answer: "Karim Benzema"
  },
  {
    id: "12",
    question: "Quel joueur détient le record du transfert le plus cher de l'histoire du football (222M€) ?",
    options: ["Neymar Jr", "Kylian Mbappé", "Philippe Coutinho", "Ousmane Dembélé"],
    answer: "Neymar Jr"
  },
  {
    id: "13",
    question: "Dans quel club italien Diego Maradona a-t-il passé les meilleures années de sa carrière ?",
    options: ["SSC Naples", "AC Milan", "Juventus", "Inter Milan"],
    answer: "SSC Naples"
  },
  {
    id: "14",
    question: "Quelle nation a remporté la Coupe du Monde Féminine de la FIFA en 2019 ?",
    options: ["États-Unis", "Pays-Bas", "Suède", "Angleterre"],
    answer: "États-Unis"
  },
  {
    id: "15",
    question: "Qui a marqué le fameux but de la 'Main de Dieu' contre l'Angleterre en 1986 ?",
    options: ["Diego Maradona", "Pelé", "Mario Kempes", "Zico"],
    answer: "Diego Maradona"
  },
  {
    id: "16",
    question: "Quel entraîneur a remporté la Ligue des Champions trois fois d'affilée avec le Real Madrid ?",
    options: ["Zinedine Zidane", "Carlo Ancelotti", "José Mourinho", "Pep Guardiola"],
    answer: "Zinedine Zidane"
  },
  {
    id: "17",
    question: "Quel pays a remporté sa toute première Coupe du Monde en 2010 en Afrique du Sud ?",
    options: ["Espagne", "Pays-Bas", "Allemagne", "Uruguay"],
    answer: "Espagne"
  },
  {
    id: "18",
    question: "Qui est le meilleur buteur de l'histoire de l'équipe de France masculine ?",
    options: ["Olivier Giroud", "Thierry Henry", "Antoine Griezmann", "Kylian Mbappé"],
    answer: "Olivier Giroud"
  },
  {
    id: "19",
    question: "Quel club allemand a remporté 11 titres consécutifs de Bundesliga entre 2013 et 2023 ?",
    options: ["Bayern Munich", "Borussia Dortmund", "Bayer Leverkusen", "RB Leipzig"],
    answer: "Bayern Munich"
  },
  {
    id: "20",
    question: "Combien de Ballons d'Or Cristiano Ronaldo a-t-il remportés au cours de sa carrière ?",
    options: ["5", "4", "6", "7"],
    answer: "5"
  },
  {
    id: "21",
    question: "Quel club a été surnommé 'Les Invincibles' après une saison de Premier League sans défaite en 2003-2004 ?",
    options: ["Arsenal", "Manchester United", "Chelsea", "Liverpool"],
    answer: "Arsenal"
  },
  {
    id: "22",
    question: "Qui est le meilleur buteur de l'histoire de la sélection nationale du Brésil ?",
    options: ["Neymar Jr", "Pelé", "Ronaldo (R9)", "Romário"],
    answer: "Neymar Jr"
  },
  {
    id: "23",
    question: "Quel joueur français a marqué un doublé de la tête en finale de la Coupe du Monde 1998 ?",
    options: ["Zinedine Zidane", "Thierry Henry", "Emmanuel Petit", "Didier Deschamps"],
    answer: "Zinedine Zidane"
  },
  {
    id: "24",
    question: "Quelle équipe a remporté la Coupe d'Afrique des Nations (CAN) organisée en 2024 ?",
    options: ["Côte d'Ivoire", "Nigeria", "Sénégal", "Maroc"],
    answer: "Côte d'Ivoire"
  },
  {
    id: "25",
    question: "Quel joueur portugais a soulevé l'Euro 2016 en tant que capitaine après s'être blessé en finale ?",
    options: ["Cristiano Ronaldo", "Nani", "Eder", "Ricardo Quaresma"],
    answer: "Cristiano Ronaldo"
  },
  {
    id: "26",
    question: "Quel club français est le seul à avoir remporté la Ligue des Champions masculine (en 1993) ?",
    options: ["Olympique de Marseille", "Paris Saint-Germain", "AS Monaco", "Olympique Lyonnais"],
    answer: "Olympique de Marseille"
  },
  {
    id: "27",
    question: "Combien de Coupes du Monde le Brésil a-t-il remportées au total ?",
    options: ["5", "4", "6", "3"],
    answer: "5"
  },
  {
    id: "28",
    question: "Quel stade mythique de Rio de Janeiro a accueilli la finale des Coupes du Monde 1950 et 2014 ?",
    options: ["Maracanã", "Mineirão", "Morumbi", "Allianz Parque"],
    answer: "Maracanã"
  },
  {
    id: "29",
    question: "Quel joueur détient le record du but le plus rapide de l'histoire de la Coupe du Monde (11 secondes en 2002) ?",
    options: ["Hakan Şükür", "Clint Dempsey", "Bryan Robson", "Bernard Lacombe"],
    answer: "Hakan Şükür"
  },
  {
    id: "30",
    question: "Quel club de football italien est historiquement surnommé 'La Vieille Dame' (La Vecchia Signora) ?",
    options: ["Juventus", "AC Milan", "Inter Milan", "AS Rome"],
    answer: "Juventus"
  },
  {
    id: "31",
    question: "Quel club italien a remporté la Ligue des Champions en 2010 en réalisant le triplé sous José Mourinho ?",
    options: ["Inter Milan", "AC Milan", "Juventus", "AS Rome"],
    answer: "Inter Milan"
  },
  {
    id: "32",
    question: "Qui est le meilleur buteur de l'histoire de la Premier League anglaise ?",
    options: ["Alan Shearer", "Wayne Rooney", "Harry Kane", "Thierry Henry"],
    answer: "Alan Shearer"
  },
  {
    id: "33",
    question: "Quel pays a remporté la Coupe du Monde de la FIFA en 2006 organisée en Allemagne ?",
    options: ["Italie", "France", "Allemagne", "Portugal"],
    answer: "Italie"
  },
  {
    id: "34",
    question: "Quel joueur légendaire est historiquement surnommé 'El Fenomeno' ?",
    options: ["Ronaldo (R9)", "Ronaldinho", "Romário", "Rivaldo"],
    answer: "Ronaldo (R9)"
  },
  {
    id: "35",
    question: "Dans quel club espagnol Lionel Messi a-t-il effectué toute sa formation professionnelle ?",
    options: ["FC Barcelone", "Real Madrid", "Atlético Madrid", "FC Séville"],
    answer: "FC Barcelone"
  },
  {
    id: "36",
    question: "Quel club français a vu débuter Zinedine Zidane chez les professionnels en 1989 ?",
    options: ["AS Cannes", "Girondins de Bordeaux", "Juventus", "Real Madrid"],
    answer: "AS Cannes"
  },
  {
    id: "37",
    question: "Qui a remporté la Coupe du Monde de la FIFA en 1994 aux États-Unis aux tirs au but ?",
    options: ["Brésil", "Italie", "Suède", "Bulgarie"],
    answer: "Brésil"
  },
  {
    id: "38",
    question: "Quel joueur néerlandais a remporté trois Ballons d'Or dans les années 70 avec l'Ajax et Barcelone ?",
    options: ["Johan Cruyff", "Marco van Basten", "Ruud Gullit", "Dennis Bergkamp"],
    answer: "Johan Cruyff"
  },
  {
    id: "39",
    question: "Quel club espagnol est le rival historique du Real Madrid lors du célèbre 'El Clasico' ?",
    options: ["FC Barcelone", "Atlético Madrid", "Valence CF", "Séville FC"],
    answer: "FC Barcelone"
  },
  {
    id: "40",
    question: "Quel joueur français a remporté le Ballon d'Or en 1998 après le sacre mondial ?",
    options: ["Zinedine Zidane", "Thierry Henry", "Didier Deschamps", "Laurent Blanc"],
    answer: "Zinedine Zidane"
  },
  {
    id: "41",
    question: "Quel pays a remporté l'Euro 2020 (joué en 2021) en battant l'Angleterre aux tirs au but ?",
    options: ["Italie", "Angleterre", "Espagne", "Danemark"],
    answer: "Italie"
  },
  {
    id: "42",
    question: "Quel club allemand est mondialement connu sous le sigle du 'BVB' ?",
    options: ["Borussia Dortmund", "Bayern Munich", "Bayer Leverkusen", "Borussia Mönchengladbach"],
    answer: "Borussia Dortmund"
  },
  {
    id: "43",
    question: "Qui est le meilleur buteur de l'histoire du Paris Saint-Germain (PSG) ?",
    options: ["Kylian Mbappé", "Edinson Cavani", "Zlatan Ibrahimović", "Neymar Jr"],
    answer: "Kylian Mbappé"
  },
  {
    id: "44",
    question: "Quel joueur suédois a joué pour l'AC Milan, l'Inter, le PSG, le Barça et Manchester United ?",
    options: ["Zlatan Ibrahimović", "Henrik Larsson", "Emil Forsberg", "Alexander Isak"],
    answer: "Zlatan Ibrahimović"
  },
  {
    id: "45",
    question: "Quel pays a remporté la Coupe du Monde de la FIFA en 2018 organisée en Russie ?",
    options: ["France", "Croatie", "Belgique", "Angleterre"],
    answer: "France"
  },
  {
    id: "46",
    question: "Quel joueur gallois a marqué un retourné acrobatique mythique en finale de LDC 2018 avec le Real Madrid ?",
    options: ["Gareth Bale", "Cristiano Ronaldo", "Karim Benzema", "Luka Modrić"],
    answer: "Gareth Bale"
  },
  {
    id: "47",
    question: "Quel club italien historique partage le Stade San Siro avec son rival de l'Inter ?",
    options: ["AC Milan", "Juventus", "AS Rome", "SSC Naples"],
    answer: "AC Milan"
  },
  {
    id: "48",
    question: "Quel pays a créé la sensation en remportant l'Euro 2004 contre le Portugal ?",
    options: ["Grèce", "Portugal", "République Tchèque", "Pays-Bas"],
    answer: "Grèce"
  },
  {
    id: "49",
    question: "Qui est le joueur le plus capé de l'histoire de l'équipe de France masculine ?",
    options: ["Hugo Lloris", "Lilian Thuram", "Thierry Henry", "Olivier Giroud"],
    answer: "Hugo Lloris"
  },
  {
    id: "50",
    question: "Quel club français est détenu par un fonds d'investissement du Qatar (QSI) depuis 2011 ?",
    options: ["Paris Saint-Germain", "Olympique de Marseille", "AS Monaco", "Lille OSC"],
    answer: "Paris Saint-Germain"
  },
  {
    id: "51",
    question: "Quel joueur argentin a marqué le légendaire 'But du Siècle' en dribblant la moitié de l'équipe anglaise en 1986 ?",
    options: ["Diego Maradona", "Lionel Messi", "Gabriel Batistuta", "Mario Kempes"],
    answer: "Diego Maradona"
  },
  {
    id: "52",
    question: "Quel défenseur italien légendaire a passé toute sa carrière (25 saisons) à l'AC Milan ?",
    options: ["Paolo Maldini", "Franco Baresi", "Alessandro Nesta", "Fabio Cannavaro"],
    answer: "Paolo Maldini"
  },
  {
    id: "53",
    question: "Quel entraîneur écossais a dirigé Manchester United de 1986 à 2013 en remportant 38 trophées ?",
    options: ["Sir Alex Ferguson", "Arsène Wenger", "Matt Busby", "Jose Mourinho"],
    answer: "Sir Alex Ferguson"
  },
  {
    id: "54",
    question: "Quel pays est devenu le premier représentant africain de l'histoire en demi-finale d'une Coupe du Monde en 2022 ?",
    options: ["Maroc", "Cameroun", "Sénégal", "Ghana"],
    answer: "Maroc"
  },
  {
    id: "55",
    question: "Quel club portugais a formé et vu débuter Cristiano Ronaldo chez les pros en 2002 ?",
    options: ["Sporting CP", "SL Benfica", "FC Porto", "SC Braga"],
    answer: "Sporting CP"
  },
  {
    id: "56",
    question: "Quelle nation a remporté la Copa América en 2021 en s'imposant contre le Brésil au Maracanã ?",
    options: ["Argentine", "Brésil", "Colombie", "Chili"],
    answer: "Argentine"
  },
  {
    id: "57",
    question: "Quel libéro et défenseur allemand légendaire était surnommé 'Le Kaiser' (L'Empereur) ?",
    options: ["Franz Beckenbauer", "Gerd Müller", "Lothar Matthäus", "Oliver Kahn"],
    answer: "Franz Beckenbauer"
  },
  {
    id: "58",
    question: "Quel pays a remporté la Coupe du Monde de la FIFA en 1982 organisée en Espagne ?",
    options: ["Italie", "Allemagne de l'Ouest", "Pologne", "France"],
    answer: "Italie"
  },
  {
    id: "59",
    question: "Quel joueur croate a cassé le duopole Messi-Ronaldo en remportant le Ballon d'Or en 2018 ?",
    options: ["Luka Modrić", "Ivan Rakitić", "Antoine Griezmann", "Kylian Mbappé"],
    answer: "Luka Modrić"
  },
  {
    id: "60",
    question: "Dans quel stade mythique joue l'équipe nationale espagnole et le Real Madrid ?",
    options: ["Santiago Bernabéu", "Camp Nou", "Wanda Metropolitano", "San Siro"],
    answer: "Santiago Bernabéu"
  },
  {
    id: "61",
    question: "Quelle nation a remporté l'Euro 2008 en battant l'Allemagne 1-0 en finale ?",
    options: ["Espagne", "Allemagne", "Russie", "Italie"],
    answer: "Espagne"
  },
  {
    id: "62",
    question: "Quel joueur de football contemporain est célèbre pour son surnom 'La Pulga' ?",
    options: ["Lionel Messi", "Alexis Sánchez", "Eden Hazard", "Neymar Jr"],
    answer: "Lionel Messi"
  },
  {
    id: "63",
    question: "Quel gardien de but espagnol a capitaine son pays lors de sa période dorée (Euro 2008, Mondial 2010, Euro 2012) ?",
    options: ["Iker Casillas", "Victor Valdés", "Pepe Reina", "David de Gea"],
    answer: "Iker Casillas"
  },
  {
    id: "64",
    question: "Quel club de Premier League joue ses matches à Old Trafford, surnommé le 'Théâtre des Rêves' ?",
    options: ["Manchester United", "Manchester City", "Liverpool FC", "Arsenal"],
    answer: "Manchester United"
  },
  {
    id: "65",
    question: "Quel joueur français a remporté le Ballon d'Or en 1991 sous les couleurs de l'Olympique de Marseille ?",
    options: ["Jean-Pierre Papin", "Eric Cantona", "Didier Deschamps", "Laurent Blanc"],
    answer: "Jean-Pierre Papin"
  },
  {
    id: "66",
    question: "Quel pays d'Amérique du Sud a remporté sa toute première Coupe du Monde à domicile en 1978 ?",
    options: ["Argentine", "Pays-Bas", "Brésil", "Italie"],
    answer: "Argentine"
  },
  {
    id: "67",
    question: "Quel attaquant uruguayen a été suspendu pour avoir mordu le défenseur Giorgio Chiellini au Mondial 2014 ?",
    options: ["Luis Suárez", "Edinson Cavani", "Diego Forlán", "Diego Godín"],
    answer: "Luis Suárez"
  },
  {
    id: "68",
    question: "Quel entraîneur français a marqué l'histoire d'Arsenal FC en y régnant de 1996 à 2018 ?",
    options: ["Arsène Wenger", "Gérard Houllier", "Claude Puel", "Didier Deschamps"],
    answer: "Arsène Wenger"
  },
  {
    id: "69",
    question: "Quel club italien a dominé la Serie A en remportant 9 championnats consécutifs entre 2012 et 2020 ?",
    options: ["Juventus", "AC Milan", "Inter Milan", "AS Rome"],
    answer: "Juventus"
  },
  {
    id: "70",
    question: "Quel pays a remporté l'Euro 1984 à domicile grâce aux 9 buts records de Michel Platini ?",
    options: ["France", "Espagne", "Danemark", "Portugal"],
    answer: "France"
  },
  {
    id: "71",
    question: "Quel gardien de but allemand a été élu meilleur joueur (Ballon d'Or) de la Coupe du Monde 2002 ?",
    options: ["Oliver Kahn", "Jens Lehmann", "Manuel Neuer", "Sepp Maier"],
    answer: "Oliver Kahn"
  },
  {
    id: "72",
    question: "Quel attaquant anglais détient le record du seul triplé inscrit en finale de Coupe du Monde masculine au XXe siècle (en 1966) ?",
    options: ["Geoff Hurst", "Bobby Charlton", "Bobby Moore", "Gary Lineker"],
    answer: "Geoff Hurst"
  },
  {
    id: "73",
    question: "Quel pays a infligé une défaite historique de 7-1 au Brésil à domicile en demi-finale du Mondial 2014 ?",
    options: ["Allemagne", "Pays-Bas", "Chili", "Argentine"],
    answer: "Allemagne"
  },
  {
    id: "74",
    question: "Quel club de football de La Liga est couramment surnommé 'Los Colchoneros' (Les Matelassiers) ?",
    options: ["Atlético Madrid", "Valence CF", "FC Séville", "Real Betis"],
    answer: "Atlético Madrid"
  },
  {
    id: "75",
    question: "Qui a marqué le but légendaire en prolongation offrant à l'Espagne le titre mondial en 2010 ?",
    options: ["Andrés Iniesta", "David Villa", "Xavi Hernandez", "Carles Puyol"],
    answer: "Andrés Iniesta"
  },
  {
    id: "76",
    question: "Quel génie italien a raté le penalty décisif en finale de la Coupe du Monde 1994 face au Brésil ?",
    options: ["Roberto Baggio", "Franco Baresi", "Gianfranco Zola", "Paolo Maldini"],
    answer: "Roberto Baggio"
  },
  {
    id: "77",
    question: "Quel club espagnol détient le record absolu de victoires consécutives en Ligue Europa avec un triplé (2014-2016) ?",
    options: ["FC Séville", "Atlético Madrid", "Valence CF", "Villarreal CF"],
    answer: "FC Séville"
  },
  {
    id: "78",
    question: "Quel pays a remporté l'Euro 1992 en étant invité à la dernière minute pour remplacer la Yougoslavie ?",
    options: ["Danemark", "Allemagne", "Pays-Bas", "Suède"],
    answer: "Danemark"
  },
  {
    id: "79",
    question: "Quel buteur ivoirien a égalisé puis marqué le penalty décisif pour offrir à Chelsea sa première LDC en 2012 ?",
    options: ["Didier Drogba", "Yaya Touré", "Salomon Kalou", "Kolo Touré"],
    answer: "Didier Drogba"
  },
  {
    id: "80",
    question: "Quelle nation a remporté ses premiers titres de Copa América en 2015 et 2016 face à l'Argentine ?",
    options: ["Chili", "Colombie", "Uruguay", "Équateur"],
    answer: "Chili"
  },
  {
    id: "81",
    question: "Quel club de Premier League a remporté la Ligue des Champions en 2021 face à Manchester City ?",
    options: ["Chelsea", "Liverpool", "Manchester United", "Arsenal"],
    answer: "Chelsea"
  },
  {
    id: "82",
    question: "Qui est le meilleur buteur de l'histoire du Real Madrid avec 450 réalisations ?",
    options: ["Cristiano Ronaldo", "Raúl", "Alfredo Di Stéfano", "Karim Benzema"],
    answer: "Cristiano Ronaldo"
  },
  {
    id: "83",
    question: "Quel entraîneur a mené le FC Porto à un sacre surprise en Ligue des Champions en 2004 ?",
    options: ["José Mourinho", "André Villas-Boas", "Fernando Santos", "Jorge Jesus"],
    answer: "José Mourinho"
  },
  {
    id: "84",
    question: "Quel pays a remporté l'Euro 2000 grâce au but en or de David Trezeguet en finale ?",
    options: ["France", "Italie", "Pays-Bas", "Portugal"],
    answer: "France"
  },
  {
    id: "85",
    question: "Quel capitaine et défenseur italien a soulevé la Coupe du Monde 2006 avant d'obtenir le Ballon d'Or ?",
    options: ["Fabio Cannavaro", "Gianluigi Buffon", "Andrea Pirlo", "Alessandro Nesta"],
    answer: "Fabio Cannavaro"
  },
  {
    id: "86",
    question: "Quel club de Ligue 1 dispute le bouillant classique du championnat de France face à l'Olympique de Marseille ?",
    options: ["Paris Saint-Germain", "Olympique Lyonnais", "AS Saint-Étienne", "FC Nantes"],
    answer: "Paris Saint-Germain"
  },
  {
    id: "87",
    question: "Dans quelle nation se trouve le légendaire stade de Wembley, temple historique du football ?",
    options: ["Angleterre", "Écosse", "Pays de Galles", "Irlande"],
    answer: "Angleterre"
  },
  {
    id: "88",
    question: "Quel gardien colombien farfelu a marqué les esprits avec son 'Coup du Scorpion' en 1995 ?",
    options: ["René Higuita", "Carlos Valderrama", "Faustino Asprilla", "James Rodríguez"],
    answer: "René Higuita"
  },
  {
    id: "89",
    question: "Quel club a été le tout premier vainqueur du championnat de France professionnel en 1933 ?",
    options: ["Olympique Lillois", "FC Sète", "Olympique de Marseille", "OGC Nice"],
    answer: "Olympique Lillois"
  },
  {
    id: "90",
    question: "Quelle nation scandinave a créé la surprise en se hissant en demi-finale de l'Euro 2020 ?",
    options: ["Danemark", "Suède", "Norvège", "Finlande"],
    answer: "Danemark"
  },
  {
    id: "91",
    question: "Qui est le meilleur buteur de l'histoire de la Squadra Azzurra (Italie) avec 35 buts ?",
    options: ["Luigi Riva", "Roberto Baggio", "Alessandro Del Piero", "Francesco Totti"],
    answer: "Luigi Riva"
  },
  {
    id: "92",
    question: "Quel virtuose belge a quitté Chelsea pour le Real Madrid en 2019 pour plus de 100 millions d'euros ?",
    options: ["Eden Hazard", "Kevin De Bruyne", "Romelu Lukaku", "Dries Mertens"],
    answer: "Eden Hazard"
  },
  {
    id: "93",
    question: "Quel pays d'Afrique de l'Ouest a remporté la toute première Coupe d'Afrique des Nations (CAN) de son histoire en 2022 ?",
    options: ["Sénégal", "Égypte", "Cameroun", "Algérie"],
    answer: "Sénégal"
  },
  {
    id: "94",
    question: "Dans quelle franchise de Major League Soccer (MLS) Lionel Messi a-t-il signé en 2023 ?",
    options: ["Inter Miami CF", "LA Galaxy", "New York City FC", "LAFC"],
    answer: "Inter Miami CF"
  },
  {
    id: "95",
    question: "Quel attaquant camerounais est devenu le buteur le plus âgé de l'histoire des mondiaux à 42 ans en 1994 ?",
    options: ["Roger Milla", "Samuel Eto'o", "Rigobert Song", "Patrick M'Boma"],
    answer: "Roger Milla"
  },
  {
    id: "96",
    question: "Quel club historique d'Écosse dispute le derby du 'Old Firm' contre les Glasgow Rangers ?",
    options: ["Celtic Glasgow", "Heart of Midlothian", "Aberdeen FC", "Hibernian FC"],
    answer: "Celtic Glasgow"
  },
  {
    id: "97",
    question: "Quel pays a remporté la Coupe du Monde de la FIFA en 1954 en terrassant la Hongrie en finale lors du 'Miracle de Berne' ?",
    options: ["Allemagne de l'Ouest", "Hongrie", "Autriche", "Uruguay"],
    answer: "Allemagne de l'Ouest"
  },
  {
    id: "98",
    question: "Quel architecte du milieu de terrain du FC Barcelone a porté le maillot numéro 6 sous Pep Guardiola ?",
    options: ["Xavi Hernandez", "Andrés Iniesta", "Sergio Busquets", "Cesc Fàbregas"],
    answer: "Xavi Hernandez"
  },
  {
    id: "99",
    question: "Quel géant néerlandais a remporté 4 Ligues des Champions, dont le triplé légendaire des années 70 (1971-1973) ?",
    options: ["Ajax Amsterdam", "PSV Eindhoven", "Feyenoord Rotterdam", "AZ Alkmaar"],
    answer: "Ajax Amsterdam"
  },
  {
    id: "100",
    question: "Qui a ouvert le score pour l'Angleterre dès la 2e minute de la finale de l'Euro 2020 contre l'Italie ?",
    options: ["Luke Shaw", "Harry Kane", "Raheem Sterling", "Bukayo Saka"],
    answer: "Luke Shaw"
  }
];
