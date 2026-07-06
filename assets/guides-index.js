/* CanMyPet — single source of truth for the "Pet Life" blog/guides.
   Newest first (by `date`). build.js reads window.CMP_GUIDES to render the
   home #guides strip (3 newest) and the guides/index.html hub (all).
   New article = prepend an entry here with a real `cover` image. */
window.CMP_GUIDES = [
  { slug: 'world-cup-food-guide',
    title: "World Cup Snacks & Your Pet: 16 Countries' Foods, Checked",
    excerpt: "From Brazilian churrasco to Belgian chocolate — every World Cup nation's iconic dish, and exactly what's safe to share with your dog or cat on game day.",
    cover: 'assets/guide/hero-world-cup-food-guide.webp', cat: 'Seasonal', date: '2026-07-06' },

  { slug: 'why-do-cats-purr',
    title: 'Why Do Cats Purr? The Science Behind the Rumble',
    excerpt: "Happiness, healing, hunger — or stress? The real reasons cats purr, how the rumble actually works, and the one time it's a red flag.",
    cover: 'assets/guide/hero-why-do-cats-purr.webp', cat: 'Behavior', date: '2026-07-06' },

  { slug: 'why-does-my-dog-lick-me',
    title: 'Why Does My Dog Lick Me? 8 Real Reasons',
    excerpt: 'Affection, taste, attention or anxiety? The 8 real reasons dogs lick people, when it signals something’s wrong, and how to gently redirect it.',
    cover: 'assets/guide/hero-why-does-my-dog-lick-me.webp', cat: 'Behavior', date: '2026-07-04' },

  { slug: 'cat-body-language',
    title: 'Cat Body Language & Tail Talk',
    excerpt: "What your cat's tail, ears, eyes and whiskers are really saying — plus the truth about slow blinks and the belly trap.",
    cover: 'assets/guide/hero-cat-body-language.webp', cat: 'Behavior', date: '2026-07-02' },

  { slug: 'dog-body-language',
    title: 'Dog Body Language Explained',
    excerpt: 'What your dog’s tail, ears, eyes and posture really mean — read the whole dog, not just one wag. A vet-sourced guide.',
    cover: 'assets/guide/hero-dog-body-language.webp', cat: 'Behavior', date: '2026-07-01' },

  { slug: 'do-dogs-and-cats-get-along',
    title: 'Do Dogs and Cats Get Along?',
    excerpt: 'The cat-and-dog rivalry is mostly a myth — what really decides whether they bond, and how to introduce them the right way.',
    cover: 'assets/guide/hero-do-dogs-and-cats-get-along.webp', cat: 'Living together', date: '2026-06-27' },

  { slug: 'best-dog-breeds-for-apartments',
    title: 'The 10 Best Dog Breeds for Apartments',
    excerpt: 'No yard needed — 10 quiet, adaptable breeds that thrive in small spaces, the ones to avoid, and the surprising couch-potato giant.',
    cover: 'assets/breeds/apt-hero.webp', cat: 'Breeds', date: '2026-06-27' },

  { slug: 'best-dog-breeds-for-kids',
    title: 'The Best Dog Breeds for Kids & Families',
    excerpt: '10 family-friendly breeds, which to avoid with toddlers, and how to introduce a new dog.',
    cover: 'assets/breeds/hero.webp', cat: 'Breeds', date: '2026-06-26' },

  { slug: 'foods-toxic-to-dogs',
    title: 'Foods Toxic to Dogs',
    excerpt: 'The everyday foods that are dangerous — and what to do if your dog gets into them.',
    cover: 'assets/guide/hero-foods-toxic-to-dogs.webp', cat: 'Safety', date: '2026-06-20' },

  { slug: 'safe-fruits-veggies-for-dogs',
    title: 'Safe Fruits & Veggies for Dogs',
    excerpt: 'The produce dogs CAN enjoy — with safe amounts and prep tips.',
    cover: 'assets/guide/hero-safe-fruits-veggies-for-dogs.webp', cat: 'Safety', date: '2026-06-18' },

  { slug: 'foods-cats-should-never-eat',
    title: 'Foods Cats Should Never Eat',
    excerpt: 'The kitchen items that are dangerous for cats — and the signs to watch.',
    cover: 'assets/guide/hero-foods-cats-should-never-eat.webp', cat: 'Safety', date: '2026-06-15' },

  { slug: 'thanksgiving-foods-dangerous-for-pets',
    title: 'Thanksgiving Foods Dangerous for Pets',
    excerpt: 'Holiday table hazards for dogs and cats — and the safe alternatives.',
    cover: 'assets/guide/hero-thanksgiving-foods-dangerous-for-pets.webp', cat: 'Seasonal', date: '2026-06-10' }
];
