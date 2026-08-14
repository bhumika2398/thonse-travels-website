// Airport Pickup & Drop is a SERVICE, not a vehicle — it is intentionally
// kept out of the /api/fleet response (which lists exactly Swift Dzire
// and Ertiga). It's still rendered through the same RideCard component
// as the two vehicles (with a "A Service, Not a Vehicle" badge in place
// of a vehicle-class badge) so all three sit in one row of equal-sized
// cards.
export const airportService = {
  slug: "airport-pickup-drop",
  name: "Airport Pickup & Drop",
  tagline2: "A Service, Not a Vehicle",
  image: "airport.jpg",
  imageAlt: "Udupi airport taxi — Mangaluru International Airport pickup and drop service",
  tagline:
    "On-time transfers to and from Mangaluru International Airport, with live flight tracking and a fixed fare agreed upfront.",
  highlights: ["Live flight tracking", "Meet & greet at arrivals", "Fixed fare", "Available 24×7"],
  priceFrom: 999,
  priceUnit: "fixed",
};
