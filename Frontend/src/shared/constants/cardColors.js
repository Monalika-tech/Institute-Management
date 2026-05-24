export const CARD_COLORS = [
  { bg: "bg-green-50", accent: "bg-green-500", badge: "bg-green-100 text-green-700" },
  { bg: "bg-blue-50", accent: "bg-blue-500", badge: "bg-blue-100 text-blue-700" },
  { bg: "bg-purple-50", accent: "bg-purple-500", badge: "bg-purple-100 text-purple-700" },
  { bg: "bg-pink-50", accent: "bg-pink-500" },
  { bg: "bg-yellow-50", accent: "bg-yellow-500" },
];

export const getCardColor = (index) => CARD_COLORS[index % CARD_COLORS.length];
