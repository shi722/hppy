/**
 * ============================================================================
 * HER 18TH BIRTHDAY — MASTER PERSONALIZATION CONFIGURATION
 * ============================================================================
 * 
 * Edit this file to customize the entire fairytale birthday experience!
 * You can change names, messages, photos, audio, and dates here.
 */

export interface MemoryItem {
  id: string;
  title: string;
  subtitle: string;
  dateBadge: string;
  note: string;
  // If you have real photos, place them in public/memories/ or src/assets/ and set their URL here.
  // Leave empty ("") to use the elegant romantic fairytale illustration placeholder.
  imageUrl: string;
}

export interface ComplimentItem {
  id: number;
  text: string;
  tag: string;
}

export interface SecretStarItem {
  id: number;
  label: string;
  text: string;
  // Position percentage across the constellation container [top%, left%]
  coordinates: { top: number; left: number };
}

export interface BirthdayConfig {
  // Personal Names & Signatures
  recipientName: string;
  recipientNickname: string;
  senderName: string;
  waxSealInitials: string;

  // Milestone Dates
  birthdayDate: string; // ISO format: YYYY-MM-DDTHH:mm:ss
  milestoneAge: number;

  // Opening Scene
  openingTitle: string;
  openingSubtitle: string;
  openingButtonText: string;
  secretPasscode: string;

  // Hero Section
  heroPreTitle: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;

  // Milestone 18 Section
  milestoneHeading: string;
  milestoneDescription: string;
  milestoneCards: Array<{
    title: string;
    description: string;
    detail: string;
  }>;

  // The Love Letter
  letterSalutation: string;
  letterParagraphs: string[];
  letterClosing: string;

  // Memory Gallery
  memories: MemoryItem[];

  // Reasons You Are So Special
  compliments: ComplimentItem[];
  finalCompliment: string;

  // Birthday Cake & Wish Experience
  wishCakeTitle: string;
  wishCakeSubtitle: string;
  wishButtonText: string;
  wishFulfilledTitle: string;
  wishFulfilledMessage: string;

  // Secret Behind the Stars
  starsTitle: string;
  starsSubtitle: string;
  starsInstructions: string;
  secretStars: SecretStarItem[];
  grandSecretMessage: string;

  // Final Cinematic Reveal
  finalHeading: string;
  finalMessage: string;
  finalClosingLine: string;
  replayButtonText: string;

  // Audio / Music Settings
  audio: {
    trackTitle: string;
    artist: string;
    // Set a custom audio URL (mp3/wav) or leave empty to use our built-in romantic celesta synthesizer!
    customAudioUrl: string;
    defaultVolume: number;
  };
}

export const BIRTHDAY_CONFIG: BirthdayConfig = {
  // 1. Personal Names
  recipientName: "My Babyy Bubuu",
  recipientNickname: "My Babyy Bubuu",
  senderName: "[Bubu's Dudu]",
  waxSealInitials: "18",

  // 2. Birthday Date & Age
  birthdayDate: "2026-11-03T00:00:00",
  milestoneAge: 18,

  // 3. Opening Scene
  openingTitle: "For My Babyy Bubuu who makes my universe brighter ✨",
  openingSubtitle: "Something magical has been created just for you...",
  openingButtonText: "ENTER YOUR FAIRYTALE",
  secretPasscode: "0305",

  // 4. Hero Section
  heroPreTitle: "A Celestial Milestone · November 3, 2026",
  heroTitle: "To My Favorite Person in the Entire Universe",
  heroSubtitle:
    "On November 3rd, the world celebrates the day someone extraordinary was born. And I get to celebrate the beautiful soul who makes my world feel like magic.",
  heroCtaPrimary: "DISCOVER YOUR MAGIC",
  heroCtaSecondary: "A LITTLE SURPRISE ✨",

  // 5. Milestone 18 Section
  milestoneHeading: "Eighteen looks magical on you.",
  milestoneDescription:
    "Eighteen years of becoming the beautiful, unique, irreplaceable person you are today. And this is only the beginning of a thousand wonderful chapters waiting for you.",
  milestoneCards: [
    {
      title: "18 years of beautiful beginnings",
      description: "From your very first steps to this golden turning point.",
      detail:
        "Every year has sculpted the grace, intellect, and radiant kindness that everyone around you admires so deeply.",
    },
    {
      title: "A heart that deserves the gentlest love",
      description: "In a world that rushes, your warmth never wavers.",
      detail:
        "You possess a tenderness that makes others feel safe and valued. May the world always reflect that warmth back to you.",
    },
    {
      title: "A future filled with endless possibilities",
      description: "Every horizon is yours to explore and conquer.",
      detail:
        "Eighteen is your open canvas. Step into your dreams with courage, knowing you have someone cheering for you unconditionally.",
    },
  ],

  // 6. The Love Letter
  letterSalutation: "Happy 18th Birthday, My Babyy Bubuu. ❤️",
  letterParagraphs: [
    "Today is about celebrating you — your smile, your heart, your dreams, and all the little things that make you so incredibly special.",
    "I wish I could put every beautiful feeling I have for you into words, but some feelings are simply too big for language.",
    "I hope this new chapter of your life brings you happiness that stays, dreams that come true, people who genuinely value you, and countless moments that make you smile without even realizing it.",
    "Never forget how special you are. Never stop believing in yourself. And never feel that you have to become someone else to deserve beautiful things.",
    "You deserve a life filled with love, peace, laughter, adventure, and magic.",
    "Happy 18th birthday, My Babyy Bubuu. May your world always be as wonderful as the light you bring into mine.",
    "💞🎀❤️ Again Happy Birthday meri babbyy bubuuuuuu 🥹🫶🏻💋",

  "Meri chhoti si jaan, meri cute si baby, meri sabse pyaari khushi… 🥹❤️ Aaj ka din mere liye bhi bahut special hai, kyunki aaj us insaan ka birthday hai jo meri life mein aakar meri duniya ko itna khoobsurat bana gayi. 🫠❤️ Tu meri woh khushi hai jisse baat karke mera mood theek ho jaata hai, meri woh cutuu si bachhi hai jiski cute cute baatein sunkar mere face par automatically smile aa jaati hai, aur meri woh jaan hai jise main kabhi udaas nahi dekhna chahta. 🫂💗",
  "Meri babbyy, mujhe tera bachchon jaisa behave karna, chhoti chhoti baaton par khush ho jaana, mujhse pyaar se baatein karna, nakhre dikhana, mujhe tang karna aur phir khud hi cute ban jaana… sab kuch bahut pyaara lagta hai. Tere woh chhote chhote nakhre bhi mere liye special hain, kyunki unmein mujhe meri bubuu dikhti hai. 🎀❤️",
  "Aur agar kabhi tu bina wajah sad ho jaaye, overthink karne lage ya tujhe lage ki koi tujhe samajh nahi raha, toh meri jaan, bas itna yaad rakhna ki tera ek insaan hai jo teri baatein sunna chahta hai, tujhe samajhna chahta hai aur tere chehre par woh pyaari si smile wapas laana chahta hai. 🥹🫶🏻",
  "Main chahta hoon ki tu mere saath sirf special days par nahi, balki normal se normal din par bhi loved feel kare. ❤️🫂",
  "Meri babbyy bubuu, tere birthday par meri wish hai ki teri life mein itni khushiyan aayein ki teri aankhon mein aansu bhi aayein toh sirf khushi ke. Tere saare dreams poore hon, tu apni life mein bahut aage jaaye aur teri woh pyaari si smile kabhi kam na ho. 🧿💞",
  "Aur sunn meii bubuu, mujhe tere saath bahut saari memories banani hain. Tere saath bachchon jaisi silly baatein karni hain, chhoti chhoti baaton par hasna hai, tujhe surprises dene hain aur tere birthdays celebrate karne hain. 🥹💋❤️",
  "Tere birthday par main tujhe duniya ki saari khushiyan dene ka vaada toh nahi karunga, lekin teri khushiyon ki wajah banne ki koshish hamesha karunga. Tere bure dinon mein tera safe place, teri overthinking mein tera sukoon aur teri smile ke peeche ki ek chhoti si wajah banna chahta hoon. 🫂💗",
  "💞❤️ HAPPY BIRTHDAYYYYY MERI BABBYYY BUBUUUUU 💋🫂",
  "I LOVE YOUUUUU SOOOO MUCHHH MERI CHHOTI SI JAANNNN 😭🫂💗 Tu hamesha khush rehna, hamesha aise hi cute rehna, apne saare nakhre dikhana aur meri life mein apni is pyaari si jagah ko aise hi khoobsurat banaye rakhna. Aur haan madam, aaj tumhara birthday hai toh tumhare saare nakhre allowed hain. 😂🎀💋💞",
  "Luvv uhhh soo muchhh, always and forever. bubu ❤️💞",
  ".....Duniya tujhe tere naam se jaanti hai,",
   "koi tujhe teri muskurahat se,",
   "par main tujhe un khamoshiyon se bhi jaanta hoon,",
   "jinmein tu khud ko bhi samjha nahi paati....",
  ],
  letterClosing: "With all my love, always. ❤️",

  // 7. Memory Gallery Slots
  memories: [
    {
      id: "mem-1",
      title: "Mine",
      subtitle: "The light that made the world stand still",
      dateBadge: "Timeless Moment",
      note: "Every time I look at this moment, I am reminded of how effortless loving you is.",
      imageUrl: "src/assets/ss.jpg",
    },
    {
      id: "mem-2",
      title: "Her prettiest smile",
      subtitle: "The laughter that outshines every star",
      dateBadge: "Pure Joy",
      note: "Your real smile — the one that reaches your eyes — is my absolute favorite sight in the world.",
      imageUrl: "src/assets/smile.jpg",
    },
    {
      id: "mem-3",
      title: "A favorite memory",
      subtitle: "A day carved permanently in my heart",
      dateBadge: "Sweetest Memory",
      note: "The hours felt like minutes, and neither of us wanted the night to end.",
      imageUrl: "src/assets/mem.jpg",
    },
    {
      id: "mem-4",
      title: "Sweetuuu",
      subtitle: "Quiet magic in the middle of ordinary life",
      dateBadge: "Unforgettable",
      note: "When everything else faded into background noise, and it was just you and me.",
      imageUrl: "src/assets/sweetu.jpg",
    },
    {
      id: "mem-5",
      title: "A picture that always makes me happy",
      subtitle: "Instant sunshine on any cloudy day",
      dateBadge: "Instant Happiness",
      note: "Whenever my day is chaotic, one glance at your face brings instant peace.",
      imageUrl: "src/assets/oh.jpg",
    },
    {
      id: "mem-6",
      title: "luv uhh forever",
      subtitle: "Every journey is enchanted by your side",
      dateBadge: "Together",
      note: "It doesn't matter where we go — as long as I am walking with you, I am home.",
      imageUrl: "src/assets/luv.jpg",
    },
  ],

  // 8. Reasons You Are So Special
  compliments: [
    {
      id: 1,
      text: "Your smile makes ordinary moments feel extraordinary.",
      tag: "Your Radiance",
    },
    {
      id: 2,
      text: "You have a beauty that goes beyond what a mirror can show.",
      tag: "Your Essence",
    },
    {
      id: 3,
      text: "Your dreams deserve to be chased fearlessly.",
      tag: "Your Strength",
    },
    {
      id: 4,
      text: "You deserve kindness, peace, and genuine happiness.",
      tag: "Your Deserving Heart",
    },
    {
      id: 5,
      text: "You make the little things feel meaningful.",
      tag: "Your Depth",
    },
    {
      id: 6,
      text: "The world is more beautiful because you are in it.",
      tag: "Your Presence",
    },
  ],
  finalCompliment:
    "And if I had a thousand more reasons, I would still find a thousand more.",

  // 9. Cake & Wish Experience
  wishCakeTitle: "Make an 18th Birthday Wish",
  wishCakeSubtitle: "18 candles glowing in the enchanted twilight. Close your eyes, think of your deepest dream, and blow them out.",
  wishButtonText: "MAKE A WISH ✨",
  wishFulfilledTitle: "Your Wish is Carried to the Stars ✨",
  wishFulfilledMessage: "May every little wish your heart holds find its way to you.",

  // 10. Secret Behind the Stars
  starsTitle: "A Surprise Hidden Behind the Stars",
  starsSubtitle: "Some magic is meant to be discovered...",
  starsInstructions: "Touch the glowing celestial stars scattered across our sky to uncover hidden thoughts.",
  secretStars: [
    {
      id: 1,
      label: "Star of Warmth",
      text: "You bring warmth to the coldest days just by being yourself.",
      coordinates: { top: 22, left: 18 },
    },
    {
      id: 2,
      label: "Star of Laughter",
      text: "The gentleness in your laughter is my favorite sound in this universe.",
      coordinates: { top: 40, left: 78 },
    },
    {
      id: 3,
      label: "Star of Wonder",
      text: "Every small moment spent with you feels like a quiet miracle.",
      coordinates: { top: 68, left: 28 },
    },
    {
      id: 4,
      label: "Star of Grace",
      text: "Your heart is one of the kindest, safest places in this world.",
      coordinates: { top: 28, left: 60 },
    },
    {
      id: 5,
      label: "Star of Inspiration",
      text: "You inspire me every day to be a better, gentler, and more caring person.",
      coordinates: { top: 75, left: 72 },
    },
  ],
  grandSecretMessage:
    "If I could gift you one thing today, it would be the ability to see yourself through the eyes of everyone who truly appreciates you. You would understand just how wonderful you are. ❤️",

  // 11. Final Cinematic Reveal
  finalHeading: "HAPPY 18TH BIRTHDAY, MY BABYY BUBUU💞",
  finalMessage:
    "May this new chapter bring you a million reasons to smile, the courage to chase every dream, and the happiness your beautiful heart deserves.",
  finalClosingLine:
    "Today, tomorrow, and in every beautiful chapter ahead — I hope life is gentle with you.",
  replayButtonText: "REPLAY OUR LITTLE FAIRYTALE ✨",

  // 12. Audio
  audio: {
    trackTitle: "Happy Birthday To You (Fairytale Music Box)",
    artist: "Romantic Celesta & Acoustic Chimes",
    customAudioUrl: "",
    defaultVolume: 0.45,
  },
};
