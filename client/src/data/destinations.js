// Destinations is the site's main visual showcase (there is no separate
// Gallery section/page) — every non-fleet, non-service image in
// client/public/images/ appears here, either as a card's primary image
// or as a supporting thumbnail on a thematically related card.
export const destinations = [
  {
    slug: "st-marys-island",
    name: "St. Mary's Island",
    image: { src: "st-mary-beach.jpg", alt: "St. Mary's Island Udupi volcanic rock formations" },
    description:
      "Volcanic rock formations rising from the sea, reachable by a short ferry ride from Malpe.",
    secondaryImages: [{ src: "udupi-beach1.png", alt: "Udupi coastline near Malpe" }],
  },
  {
    slug: "malpe-beach-delta",
    name: "Malpe Beach & Delta",
    image: { src: "delta-beach.jpg", alt: "Malpe river delta beach Udupi" },
    description:
      "Golden sands where the Suvarna river meets the Arabian Sea, popular for sunset walks.",
    secondaryImages: [{ src: "gallery-palm-sunset.jpg", alt: "Palm-fringed sunset, Udupi coast" }],
  },
  {
    slug: "kaup-lighthouse",
    name: "Kaup Lighthouse",
    image: { src: "udupi-sunset.jpg", alt: "Kaup Lighthouse Udupi sunset view" },
    description: "Climb the black-and-white lighthouse for a sweeping coastal sunset view.",
    secondaryImages: [{ src: "gallery-pier-sunset.jpg", alt: "Pier sunset on the Udupi coast" }],
  },
  {
    slug: "thonse-mangrove-kayaking",
    name: "Thonse Mangrove Kayaking",
    image: { src: "gallery-kayaking.jpg", alt: "Kayaking through Thonse mangroves near Udupi" },
    description: "Paddle through calm backwater channels lined with mangroves.",
    secondaryImages: [{ src: "udupi-beach2.png", alt: "Udupi shoreline" }],
  },
  {
    slug: "sri-krishna-matha",
    name: "Sri Krishna Matha",
    image: { src: "gallery-krishna-matha-day.jpg", alt: "Sri Krishna Matha temple Udupi by day" },
    description: "Udupi's historic temple complex and the heart of the old town food trail.",
    secondaryImages: [
      { src: "gallery-krishna-matha-night.jpg", alt: "Sri Krishna Matha temple Udupi by night" },
    ],
  },
  {
    slug: "murdeshwar",
    name: "Murdeshwar",
    image: {
      src: "gallery-murdeshwar-evening.jpg",
      alt: "Murdeshwar Shiva statue Udupi tour at evening",
    },
    description: "Home to one of the world's tallest Shiva statues, set directly against the sea.",
    secondaryImages: [{ src: "gallery-murdeshwar-night.jpg", alt: "Murdeshwar Shiva statue at night" }],
  },
  {
    slug: "kollur-mookambika-temple",
    name: "Kollur Mookambika Temple",
    image: { src: "gallery-aerial-highway.jpg", alt: "Western Ghats highway drive to Kollur Karnataka" },
    description: "A scenic Western Ghats drive to one of Karnataka's most revered temples.",
    secondaryImages: [],
  },
  {
    slug: "padubidri-beach",
    name: "Padubidri Beach",
    image: { src: "padubidri-beach.jpg", alt: "Padubidri Beach, Udupi" },
    description: "A quieter stretch of coast, ideal for a relaxed evening by the water.",
    secondaryImages: [],
  },
];
