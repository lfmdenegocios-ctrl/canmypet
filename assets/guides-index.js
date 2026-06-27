/* CanMyPet — single source of truth for the "Pet Life" blog/guides.
   Newest first (by `date`). build.js reads window.CMP_GUIDES to render the
   home #guides strip (3 newest) and the guides/index.html hub (all).
   New article = prepend an entry here with a real `cover` image. */
window.CMP_GUIDES = [
  { slug: 'best-dog-breeds-for-apartments',
    title: 'The 10 Best Dog Breeds for Apartments',
    excerpt: 'No yard needed — 10 quiet, adaptable breeds that thrive in small spaces, the ones to avoid, and the surprising couch-potato giant.',
    cover: 'assets/breeds/apt-hero.jpg', cat: 'Breeds', date: '2026-06-27' },

  { slug: 'best-dog-breeds-for-kids',
    title: 'The Best Dog Breeds for Kids & Families',
    excerpt: '10 family-friendly breeds, which to avoid with toddlers, and how to introduce a new dog.',
    cover: 'assets/breeds/hero.jpg', cat: 'Breeds', date: '2026-06-26' },

  { slug: 'foods-toxic-to-dogs',
    title: 'Foods Toxic to Dogs',
    excerpt: 'The everyday foods that are dangerous — and what to do if your dog gets into them.',
    cover: 'assets/guide/hero-foods-toxic-to-dogs.jpg', cat: 'Safety', date: '2026-06-20' },

  { slug: 'safe-fruits-veggies-for-dogs',
    title: 'Safe Fruits & Veggies for Dogs',
    excerpt: 'The produce dogs CAN enjoy — with safe amounts and prep tips.',
    cover: 'assets/guide/hero-safe-fruits-veggies-for-dogs.jpg', cat: 'Safety', date: '2026-06-18' },

  { slug: 'foods-cats-should-never-eat',
    title: 'Foods Cats Should Never Eat',
    excerpt: 'The kitchen items that are dangerous for cats — and the signs to watch.',
    cover: 'assets/guide/hero-foods-cats-should-never-eat.jpg', cat: 'Safety', date: '2026-06-15' },

  { slug: 'thanksgiving-foods-dangerous-for-pets',
    title: 'Thanksgiving Foods Dangerous for Pets',
    excerpt: 'Holiday table hazards for dogs and cats — and the safe alternatives.',
    cover: 'assets/guide/hero-thanksgiving-foods-dangerous-for-pets.jpg', cat: 'Seasonal', date: '2026-06-10' }
];
