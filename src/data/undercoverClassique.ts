export interface MultilingualWord {
  fr: string;
  en: string;
  ar: string;
}

export interface UndercoverClassiqueDuo {
  id: string;
  civil: MultilingualWord;
  undercover: MultilingualWord;
}

export const UNDERCOVER_CLASSIQUE_DUOS: UndercoverClassiqueDuo[] = [
  {
    id: "1",
    civil: { fr: "Pomme", en: "Apple", ar: "تفاحة" },
    undercover: { fr: "Poire", en: "Pear", ar: "إجاصة" }
  },
  {
    id: "2",
    civil: { fr: "Lait", en: "Milk", ar: "حليب" },
    undercover: { fr: "Eau", en: "Water", ar: "ماء" }
  },
  {
    id: "3",
    civil: { fr: "Chien", en: "Dog", ar: "كلب" },
    undercover: { fr: "Chat", en: "Cat", ar: "قط" }
  },
  {
    id: "4",
    civil: { fr: "Livre", en: "Book", ar: "كتاب" },
    undercover: { fr: "Cahier", en: "Notebook", ar: "دفتر" }
  },
  {
    id: "5",
    civil: { fr: "Stylo", en: "Pen", ar: "قلم" },
    undercover: { fr: "Crayon", en: "Pencil", ar: "قلم roussas" }
  },
  {
    id: "6",
    civil: { fr: "Voiture", en: "Car", ar: "سيارة" },
    undercover: { fr: "Moto", en: "Motorcycle", ar: "دراجة nariya" }
  },
  {
    id: "7",
    civil: { fr: "Soleil", en: "Sun", ar: "شمس" },
    undercover: { fr: "Lune", en: "Moon", ar: "قمر" }
  },
  {
    id: "8",
    civil: { fr: "Thé", en: "Tea", ar: "شاي" },
    undercover: { fr: "Café", en: "Coffee", ar: "قهوة" }
  },
  {
    id: "9",
    civil: { fr: "Ordinateur", en: "Computer", ar: "حاسوب" },
    undercover: { fr: "Téléphone", en: "Phone", ar: "هاتف" }
  },
  {
    id: "10",
    civil: { fr: "Plage", en: "Beach", ar: "شاطئ" },
    undercover: { fr: "Piscine", en: "Pool", ar: "مسبح" }
  },
  {
    id: "11",
    civil: { fr: "Cinéma", en: "Cinema", ar: "سينما" },
    undercover: { fr: "Théâtre", en: "Theater", ar: "مسرح" }
  },
  {
    id: "12",
    civil: { fr: "Football", en: "Soccer", ar: "كرة القدم" },
    undercover: { fr: "Basketball", en: "Basketball", ar: "كرة السلة" }
  },
  {
    id: "13",
    civil: { fr: "Guitare", en: "Guitar", ar: "قيثارة" },
    undercover: { fr: "Piano", en: "Piano", ar: "بيانو" }
  },
  {
    id: "14",
    civil: { fr: "Avion", en: "Airplane", ar: "طائرة" },
    undercover: { fr: "Train", en: "Train", ar: "قطار" }
  },
  {
    id: "15",
    civil: { fr: "Chocolat", en: "Chocolate", ar: "شوكولاتة" },
    undercover: { fr: "Bonbon", en: "Candy", ar: "حلوى" }
  },
  {
    id: "16",
    civil: { fr: "Pizza", en: "Pizza", ar: "بيتزا" },
    undercover: { fr: "Burger", en: "Burger", ar: "برجر" }
  },
  {
    id: "17",
    civil: { fr: "Forêt", en: "Forest", ar: "غابة" },
    undercover: { fr: "Jardin", en: "Garden", ar: "حديقة" }
  },
  {
    id: "18",
    civil: { fr: "Mer", en: "Sea", ar: "بحر" },
    undercover: { fr: "Océan", en: "Ocean", ar: "محيط" }
  },
  {
    id: "19",
    civil: { fr: "Bouteille", en: "Bottle", ar: "قارورة" },
    undercover: { fr: "Verre", en: "Glass", ar: "كوب" }
  },
  {
    id: "20",
    civil: { fr: "Chemise", en: "Shirt", ar: "قميص" },
    undercover: { fr: "T-shirt", en: "T-shirt", ar: "تي شيرت" }
  }
];
