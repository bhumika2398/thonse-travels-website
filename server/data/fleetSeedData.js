/**
 * Seed / fallback data for the fleet. Used to populate MongoDB on first
 * run when connected, and returned as-is when running on the JSON
 * storage fallback. The frontend always fetches this via GET /api/fleet
 * rather than hardcoding it in components.
 *
 * NOTE: the fleet is exactly two vehicles, named exactly "Swift Dzire"
 * and "Ertiga" everywhere on the site. Airport Pickup & Drop is a
 * service, not a vehicle — its display data lives in
 * client/src/data/services.js, but it is rendered alongside these two
 * using the same RideCard component so all three appear as equal-sized
 * cards in one row.
 */
export const fleetSeedData = [
  {
    slug: "swift-dzire",
    name: "Swift Dzire",
    tagline2: "Swift Dzire",
    seats: 5,
    passengerCapacity: "4 passengers + driver",
    image: "swift-car.png",
    tagline:
      "Perfect for solo travelers, couples, quick airport drops, and nimble city navigation through Udupi's bustling streets.",
    highlights: [
      "Best-in-class fuel efficiency",
      "Smooth, powerful AC",
      "Dedicated boot space",
    ],
    priceFrom: 12,
    order: 1,
  },
  {
    slug: "ertiga",
    name: "Ertiga",
    tagline2: "Ertiga",
    seats: 7,
    passengerCapacity: "6 passengers + driver",
    image: "ertiga-car.png",
    tagline:
      "Designed for family road trips, beach excursions, and temple pilgrimages. Flexible three-row seating with ample luggage capacity.",
    highlights: [
      "Spacious three-row cabin",
      "Roof-mounted rear AC vents",
      "Expandable boot",
    ],
    priceFrom: 16,
    order: 2,
  },
];
