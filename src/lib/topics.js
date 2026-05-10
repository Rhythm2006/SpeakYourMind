// Speaking Topics Database
// Organized by category with difficulty levels

export const categories = [
  { id: "fun", name: "Fun", iconId: "party", color: "#F59E0B", description: "Light-hearted and entertaining" },
  { id: "deep", name: "Deep", iconId: "wave", color: "#3B82F6", description: "Thought-provoking and introspective" },
  { id: "ethical", name: "Ethical", iconId: "scale", color: "#8B5CF6", description: "Moral dilemmas and values" },
  { id: "relationships", name: "Relationships", iconId: "heart", color: "#EC4899", description: "Love, friendship, and connections" },
  { id: "career", name: "Career", iconId: "briefcase", color: "#10B981", description: "Work, ambition, and growth" },
  { id: "philosophy", name: "Philosophy", iconId: "brain", color: "#6366F1", description: "Big questions about existence" },
  { id: "debate", name: "Debate", iconId: "fire", color: "#E54D2E", description: "Controversial and polarizing" },
  { id: "hypothetical", name: "Crazy Hypotheticals", iconId: "rocket", color: "#F97316", description: "Wild what-if scenarios" },
];

export const topics = {
  fun: [
    "If you could have dinner with any fictional character, who would it be and why?",
    "What's the most overrated food that everyone seems to love?",
    "If you had to teach a class on any topic, what would you choose?",
    "What's a hill you're willing to die on that most people would find ridiculous?",
    "If your life had a theme song that played every time you entered a room, what would it be?",
    "What's the worst advice you've ever received that you actually followed?",
    "If you could instantly master one skill, what would it be?",
    "What's the strangest compliment you've ever received?",
    "If animals could talk, which species would be the rudest?",
    "What's a guilty pleasure you're not actually guilty about?",
    "If you could add one rule everyone had to follow, what would it be?",
    "What movie do you think everyone should watch at least once?",
    "If you could time travel but only to attend events, which event would you go to?",
    "What's the most useless talent you have?",
    "If you were a superhero, what would your completely useless superpower be?",
  ],

  deep: [
    "What does it mean to live a 'good life'? Is it the same for everyone?",
    "Do you think people can truly change, or do they just learn to hide who they are?",
    "What's a belief you held strongly five years ago that you've completely abandoned?",
    "Is it better to be feared or respected? Why?",
    "What are we most afraid of, and why do those fears control us?",
    "Do you think we have free will, or are we just products of our environment?",
    "What's the difference between being alone and being lonely?",
    "Is vulnerability a strength or a weakness in today's world?",
    "What do you think people will remember about this era 100 years from now?",
    "Is it possible to be truly selfless, or is every good deed ultimately self-serving?",
    "What's the most important conversation you've never had?",
    "Do we create meaning, or do we discover it?",
    "What would you do differently if you knew nobody would judge you?",
    "Is happiness a choice or a circumstance?",
    "What's the hardest truth you've had to accept about yourself?",
  ],

  ethical: [
    "Is it ever okay to lie to protect someone's feelings?",
    "Should wealthy people be obligated to donate a portion of their income?",
    "Is it ethical to eat meat in a world where we have alternatives?",
    "Should social media platforms be responsible for the mental health of their users?",
    "Is privacy a right or a privilege in the digital age?",
    "Is it ethical to have children knowing the state of the world?",
    "Should AI-generated art be considered 'real' art?",
    "Is it okay to cut toxic family members out of your life?",
    "Should there be limits on how much wealth one person can accumulate?",
    "Is it ethical to keep animals in zoos for conservation purposes?",
    "Should people be forced to vote in democratic countries?",
    "Is cancel culture a form of accountability or mob justice?",
    "Is it ethical to use genetic engineering to create 'designer babies'?",
    "Should countries have open borders?",
    "Is it okay to pirate content from billion-dollar companies?",
  ],

  relationships: [
    "What's the most important quality in a lifelong partner?",
    "Can ex-partners truly be friends? Under what conditions?",
    "Is it possible to love two people at the same time?",
    "What role should social media play in romantic relationships?",
    "What's the biggest misconception people have about love?",
    "Do you think long-distance relationships can work? Why or why not?",
    "How do you know when to fight for a relationship vs. when to walk away?",
    "What's the difference between love and compatibility?",
    "Should couples share everything, including passwords and finances?",
    "Is it better to have loved and lost than to never have loved at all?",
    "What's the most underrated quality in a friend?",
    "How has technology changed the way we form relationships?",
    "Can you truly know someone, or do we only know the version they show us?",
    "What boundaries are non-negotiable in any relationship?",
    "Is jealousy a sign of love or insecurity?",
  ],

  career: [
    "Is passion or stability more important when choosing a career?",
    "Should work-life balance exist, or is it a myth?",
    "What's the biggest mistake people make early in their careers?",
    "Is a college degree still necessary for success?",
    "How do you define success beyond money and titles?",
    "Should employees be loyal to companies, or should they always look for better opportunities?",
    "Is remote work better for productivity, or does it hurt collaboration?",
    "What skill do you think will be most valuable in the next 10 years?",
    "Is hustle culture toxic or necessary?",
    "What would you do if money weren't a factor in choosing your career?",
    "Should companies pay everyone the same salary for the same role?",
    "Is networking genuine relationship building or just professional manipulation?",
    "What's more important: being a specialist or a generalist?",
    "Should AI replace jobs, and what should we do about displaced workers?",
    "What's the best career advice you've ever ignored?",
  ],

  philosophy: [
    "If a tree falls in a forest and no one is around to hear it, does it make a sound?",
    "Is there an objective reality, or does each person create their own?",
    "What makes something 'real' in a world of virtual experiences?",
    "If you could know the exact date of your death, would you want to?",
    "Is time linear, or is that just how humans perceive it?",
    "Can a person be moral without religion?",
    "What is consciousness, and could a machine ever truly have it?",
    "If everything is predetermined, is there any point in making decisions?",
    "Is suffering necessary for growth?",
    "What gives human life value if the universe is indifferent to our existence?",
    "Is it possible to think about nothing? What does 'nothing' actually mean?",
    "Do we have a duty to future generations we'll never meet?",
    "Is knowledge a curse or a blessing?",
    "Can beauty exist without an observer?",
    "If you could live forever, would you? At what point does immortality become a burden?",
  ],

  debate: [
    "Social media has done more harm than good to society.",
    "AI will ultimately create more jobs than it destroys.",
    "College education should be free for everyone.",
    "The death penalty should be abolished worldwide.",
    "Universal basic income is the future of economics.",
    "Censorship is never justified in a free society.",
    "Climate change activism has become more performative than effective.",
    "Capitalism is the best economic system despite its flaws.",
    "Space exploration is a waste of money when Earth has unsolved problems.",
    "Traditional schooling is outdated and needs to be completely reimagined.",
    "Privacy is dead, and we should accept it.",
    "Video games are a legitimate art form equal to film and literature.",
    "Democracy is not the best form of government for all countries.",
    "Automation should be taxed to fund social programs.",
    "Mental health days should be legally mandated like sick days.",
  ],

  hypothetical: [
    "If you woke up tomorrow as the president/prime minister, what's the first law you'd pass?",
    "If you could relive one year of your life with all your current knowledge, which year and why?",
    "If humans could photosynthesize, how would society change?",
    "If you could communicate with one animal species, which would you choose?",
    "If you discovered you were living in a simulation, would you want to exit?",
    "If you could eliminate one human emotion permanently, which would it be?",
    "If everyone in the world lost their memory at the same time, what would happen?",
    "If you could redesign the human body, what would you change?",
    "If money was abolished tomorrow, how would you survive?",
    "If you could live in any fictional universe, which one and why?",
    "If you had to eat only one meal for the rest of your life, what would it be?",
    "If aliens landed tomorrow and asked you to represent humanity, what would you say?",
    "If you could swap lives with anyone for a week, who would it be?",
    "If the internet permanently shut down, how would your life change?",
    "If you could add one amendment to your country's constitution, what would it be?",
  ],
};

// Utility: Get a random topic from a specific category
export function getRandomTopic(category) {
  const categoryTopics = topics[category];
  if (!categoryTopics) return null;
  return categoryTopics[Math.floor(Math.random() * categoryTopics.length)];
}

// Utility: Get a random topic from any category
export function getRandomTopicAny() {
  const allCategories = Object.keys(topics);
  const randomCategory = allCategories[Math.floor(Math.random() * allCategories.length)];
  return {
    category: randomCategory,
    topic: getRandomTopic(randomCategory),
  };
}

// Ranks progression
export const ranks = [
  { level: 1, name: "Novice Speaker", xpRequired: 0, iconId: "sprout" },
  { level: 2, name: "Warming Up", xpRequired: 100, iconId: "fire" },
  { level: 3, name: "Finding Voice", xpRequired: 300, iconId: "mic" },
  { level: 4, name: "Confident Talker", xpRequired: 600, iconId: "bubble" },
  { level: 5, name: "Eloquent Speaker", xpRequired: 1000, iconId: "sparkle" },
  { level: 6, name: "Silver Tongue", xpRequired: 1500, iconId: "medal" },
  { level: 7, name: "Golden Voice", xpRequired: 2500, iconId: "trophy" },
  { level: 8, name: "Master Debater", xpRequired: 4000, iconId: "swords" },
  { level: 9, name: "Orator", xpRequired: 6000, iconId: "crown" },
  { level: 10, name: "Legend", xpRequired: 10000, iconId: "star" },
];

// Badges
export const badges = [
  { id: "first-speak", name: "First Words", description: "Complete your first speaking session", iconId: "mic" },
  { id: "streak-3", name: "Three's a Charm", description: "Maintain a 3-day streak", iconId: "fire" },
  { id: "streak-7", name: "Week Warrior", description: "Maintain a 7-day streak", iconId: "lightning" },
  { id: "streak-30", name: "Monthly Maven", description: "Maintain a 30-day streak", iconId: "sparkle" },
  { id: "all-categories", name: "Renaissance Speaker", description: "Speak on topics from all categories", iconId: "star" },
  { id: "debate-5", name: "Debater", description: "Complete 5 debate sessions", iconId: "swords" },
  { id: "quick-10", name: "Quick Thinker", description: "Complete 10 Quick Speak sessions", iconId: "wind" },
  { id: "hour-total", name: "Hour Power", description: "Speak for a total of 1 hour", iconId: "clock" },
  { id: "opinion-20", name: "Opinionated", description: "Share 20 opinions in Opinion Rooms", iconId: "bubble" },
  { id: "night-owl", name: "Night Owl", description: "Complete a session after midnight", iconId: "owl" },
];
