/* CanMyPet — single source of truth for the "Pet Life" blog/guides.
   Newest first (by `date`). build.js reads window.CMP_GUIDES to render the
   home #guides strip (3 newest) and the guides/index.html hub (all).
   New article = prepend an entry here with a real `cover` image. */
window.CMP_GUIDES = [
  { slug: 'do-cats-really-have-nine-lives',
    title: 'Do Cats Really Have Nine Lives? The Science (and Myth) Explained',
    excerpt: "The saying isn't nonsense — the righting reflex, high-rise syndrome, and where the nine-lives myth actually came from.",
    cover: 'assets/guide/hero-do-cats-really-have-nine-lives.webp', cat: 'Curiosities', date: '2026-08-30' },

  { slug: 'how-good-is-a-dogs-sense-of-smell',
    title: "How Good Is a Dog's Sense of Smell? The Science Behind the Nose",
    excerpt: 'Up to 300 million scent receptors to our 5–6 million. What a dog’s nose can really do — and how to give it a workout.',
    cover: 'assets/guide/hero-how-good-is-a-dogs-sense-of-smell.webp', cat: 'Fun facts', date: '2026-08-27' },

  { slug: 'do-dogs-dream',
    title: 'Do Dogs Dream? What the Science (and the Twitching Paws) Really Show',
    excerpt: 'The MIT study behind the theory, why small dogs dream more often, and how to tell a dream from a seizure.',
    cover: 'assets/guide/hero-do-dogs-dream.webp', cat: 'Behavior', date: '2026-08-26' },

  { slug: 'why-do-dogs-wag-their-tails',
    title: 'Why Do Dogs Wag Their Tails? What the Wag Actually Means',
    excerpt: "A wag isn't the same as happy: left vs right wagging, speed, height — and the tail problems worth a vet visit.",
    cover: 'assets/guide/hero-why-do-dogs-wag-their-tails.webp', cat: 'Behavior', date: '2026-08-24' },

  { slug: 'why-does-my-cat-bring-me-gifts',
    title: 'Why Does My Cat Bring Me Gifts? Dead Mice, Socks and What It Means',
    excerpt: 'The teaching myth, the safe-larder theory, why well-fed cats still hunt — and what actually reduces it.',
    cover: 'assets/guide/hero-why-does-my-cat-bring-me-gifts.webp', cat: 'Behavior', date: '2026-08-22' },

  { slug: 'why-does-my-dog-tilt-its-head',
    title: 'Why Does My Dog Tilt Its Head? The Science (and the Red Flags)',
    excerpt: 'The hearing theory, the muzzle theory, the 2021 word-learner study — plus the tilts that mean an ear problem.',
    cover: 'assets/guide/hero-why-does-my-dog-tilt-its-head.webp', cat: 'Behavior', date: '2026-08-20' },

  { slug: 'signs-your-pet-loves-you',
    title: '15 Signs Your Pet Loves You (According to Science)',
    excerpt: 'Slow blinks, the oxytocin gaze loop, tail-wag direction, kneading — and the affection myths worth retiring.',
    cover: 'assets/guide/hero-signs-your-pet-loves-you.webp', cat: 'Behavior', date: '2026-08-19' },

  { slug: 'do-pets-miss-us-when-were-gone',
    title: "Do Pets Miss Us When We're Gone? What the Science Says",
    excerpt: 'What reunion studies, brain scans and attachment research show — and when missing you tips into separation anxiety.',
    cover: 'assets/guide/hero-do-pets-miss-us-when-were-gone.webp', cat: 'Behavior', date: '2026-08-17' },

  { slug: 'things-cats-secretly-love',
    title: '10 Things Cats Secretly Love (and 5 They Quietly Hate)',
    excerpt: 'High perches, warmth, routine, a clean litter box — and the well-meaning things that quietly stress cats out.',
    cover: 'assets/guide/hero-things-cats-secretly-love.webp', cat: 'Bonding', date: '2026-08-16' },

  { slug: 'things-dogs-secretly-love',
    title: '10 Things Dogs Secretly Love (and 5 They Quietly Hate)',
    excerpt: 'Sniffing, routine, chin scratches, your worn t-shirt — and the well-meaning things, like tight hugs, that stress dogs out.',
    cover: 'assets/guide/hero-things-dogs-secretly-love.webp', cat: 'Bonding', date: '2026-08-13' },

  { slug: 'why-do-dogs-eat-grass',
    title: 'Why Do Dogs Eat Grass? 7 Real Reasons (and When to Worry)',
    excerpt: "The leading theories, why it's usually normal, and the red flags that mean it's time to call your vet.",
    cover: 'assets/guide/hero-why-do-dogs-eat-grass.webp', cat: 'Behavior', date: '2026-08-12' },

  { slug: 'how-much-exercise-does-my-dog-need',
    title: 'How Much Exercise Does My Dog Need? By Age & Breed',
    excerpt: 'A vet-sourced breakdown by age and energy level, the signs of too little (or too much), and easy ways to fit it in.',
    cover: 'assets/guide/hero-how-much-exercise-does-my-dog-need.webp', cat: 'Enrichment', date: '2026-08-10' },

  { slug: 'diy-dog-toys',
    title: '12 DIY Dog Toys You Can Make at Home Tonight',
    excerpt: 'Tug ropes, snuffle mats, treat puzzles from things already in your house — plus a safety checklist for what to skip.',
    cover: 'assets/guide/hero-diy-dog-toys.webp', cat: 'Enrichment', date: '2026-08-08' },

  { slug: 'boredom-busters-for-cats',
    title: '15 Boredom Busters for Cats (Vet-Sourced Enrichment Ideas)',
    excerpt: 'Overgrooming, couch scratching, 3 a.m. zoomies? Food puzzles, window perches and DIY toys that actually help.',
    cover: 'assets/guide/hero-boredom-busters-for-cats.webp', cat: 'Enrichment', date: '2026-08-06' },

  { slug: 'calmest-dog-breeds',
    title: '10 Calmest Dog Breeds (Vet-Sourced Picks for a Low-Key Home)',
    excerpt: "Greyhounds, Newfoundlands, Berners — plus why 'calm' breeds still have a wild puppy phase.",
    cover: 'assets/guide/hero-calmest-dog-breeds.webp', cat: 'Breeds', date: '2026-08-05' },

  { slug: 'best-dog-breeds-for-seniors',
    title: '10 Best Dog Breeds for Seniors (Vet-Sourced, Low-Maintenance Picks)',
    excerpt: "Cavaliers, Bichons, Pugs and more — plus the breeds that ask more than most seniors want, and how to plan for a dog's whole life.",
    cover: 'assets/guide/hero-best-dog-breeds-for-seniors.webp', cat: 'Breeds', date: '2026-08-03' },

  { slug: 'best-dog-breeds-for-first-time-owners',
    title: '10 Best Dog Breeds for First-Time Owners (Vet-Sourced Picks)',
    excerpt: 'Labs, Goldens, Poodles, Cavaliers — plus the breeds that are trickier for beginners and the mistakes new owners make most.',
    cover: 'assets/guide/hero-best-dog-breeds-for-first-time-owners.webp', cat: 'Breeds', date: '2026-08-01' },

  { slug: 'best-hypoallergenic-dog-breeds',
    title: '12 Best Hypoallergenic Dog Breeds (And the Honest Science)',
    excerpt: 'Poodles, Bichons, Schnauzers and more — plus what allergy research actually shows and how to cut allergens at home.',
    cover: 'assets/guide/hero-best-hypoallergenic-dog-breeds.webp', cat: 'Breeds', date: '2026-07-30' },

  { slug: 'cat-zodiac-signs',
    title: "Cat Zodiac Signs: What Your Cat's \"Sign\" Says About Them",
    excerpt: 'Just for fun 🪄 — a playful sign-by-sign cat zodiac, plus the real science on what shapes a cat’s temperament.',
    cover: 'assets/guide/hero-cat-zodiac-signs.webp', cat: 'Just for fun', date: '2026-07-29' },

  { slug: 'dog-zodiac-signs',
    title: "Dog Zodiac Signs: What Your Dog's \"Sign\" Says About Them",
    excerpt: 'Just for fun 🪄 — a playful sign-by-sign dog zodiac, plus the real science on what shapes a dog’s temperament.',
    cover: 'assets/guide/hero-dog-zodiac-signs.webp', cat: 'Just for fun', date: '2026-07-27' },

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
