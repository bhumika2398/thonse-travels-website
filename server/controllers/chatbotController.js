const OWNER_PHONE = "8880954175";

/**
 * Simple keyword-matched FAQ bot. Each entry is checked in order, so put
 * more specific keyword sets first. Falls back to a phone-number prompt
 * when nothing matches.
 */
const FAQ_RULES = [
  {
    keywords: ["airport", "flight", "mangaluru airport", "mia"],
    answer:
      "We offer 24x7 Airport Pickup & Drop to/from Mangaluru International Airport with live flight tracking, meet & greet at arrivals, and a fixed fare — no surge pricing, ever.",
  },
  {
    keywords: ["dzire", "swift", "sedan", "small car", "4 seater", "4-seater"],
    answer:
      "The Maruti Suzuki Dzire is our Executive Sedan — a 5-seater (4 passengers + driver), perfect for couples, solo travelers, and quick airport drops around Udupi.",
  },
  {
    keywords: ["ertiga", "mpv", "suv", "family car", "7 seater", "7-seater", "6 seater"],
    answer:
      "The Maruti Suzuki Ertiga is our Family MPV — a 7-seater (6 passengers + driver) with three-row seating, ideal for family road trips, beach trips, and temple pilgrimages.",
  },
  {
    keywords: ["price", "cost", "rate", "fare", "charge", "how much", "rs", "₹"],
    answer:
      "Our fares are transparent with no hidden fees — Dzire starts around ₹12/km, Ertiga around ₹16/km, and Airport transfers are fixed-fare. Call us for an exact quote for your route.",
  },
  {
    keywords: ["package", "tour", "trip", "itinerary", "pilgrimage", "temple", "beach package"],
    answer:
      "We run curated packages including the Beach & Backwater Package, the Divine Pilgrimage Package, and family/couple specials like the Swift Dzire Beach Package and Ertiga Family Temple Tour. Check our Packages page for details!",
  },
  {
    keywords: ["book", "booking", "reserve", "reservation", "how to book"],
    answer:
      "You can book directly from our Rides or Contact page — just fill in your travel details and our team will confirm shortly. Or call/WhatsApp us for instant booking.",
  },
  {
    keywords: ["driver", "chauffeur", "guide"],
    answer:
      "All our drivers are verified locals who double as knowledgeable regional guides, so you get expert recommendations along the way.",
  },
  {
    keywords: ["hi", "hello", "hey", "namaste"],
    answer:
      "Namaste! I'm the Thonse Tours assistant. Ask me about pricing, our vehicles, packages, or how to book a ride.",
  },
  {
    keywords: ["hours", "timing", "available", "24/7", "24x7"],
    answer:
      "We're available 24x7, including emergency changes and late-night airport arrivals.",
  },
];

export function chatbotReply(req, res) {
  const { message } = req.body || {};

  if (!message || typeof message !== "string") {
    return res.status(400).json({
      reply: "Please type a message so I can help you.",
    });
  }

  const lower = message.toLowerCase();
  const match = FAQ_RULES.find((rule) =>
    rule.keywords.some((keyword) => lower.includes(keyword))
  );

  const reply = match
    ? match.answer
    : `I'm not quite sure about that. For a quick, human answer, please call or WhatsApp Mukthar Ahmed at ${OWNER_PHONE}.`;

  return res.json({ reply });
}
