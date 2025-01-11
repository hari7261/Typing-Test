// Word lists for different difficulty levels
const easyWords = [
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what'
];

const intermediateWords = [
  'beautiful', 'confident', 'delightful', 'excellent', 'fantastic',
  'graceful', 'happiness', 'important', 'journey', 'knowledge',
  'learning', 'memorable', 'necessary', 'opportunity', 'peaceful',
  'qualified', 'remarkable', 'successful', 'thoughtful', 'understand',
  'valuable', 'wonderful', 'yesterday', 'achievement', 'brilliant',
  'celebrate', 'dedicated', 'efficient', 'fortunate', 'grateful'
];

const hardWords = [
  'extraordinary', 'sophisticated', 'philosophical', 'revolutionary',
  'determination', 'professional', 'enthusiastic', 'independence',
  'conscientious', 'organization', 'appreciation', 'relationship',
  'particularly', 'understanding', 'responsibility', 'international',
  'communication', 'environmental', 'technological', 'successfully',
  'significantly', 'opportunities', 'entertainment', 'comprehensive',
  'collaboration', 'accessibility', 'qualification', 'participation',
  'requirements', 'intelligence'
];

export type Difficulty = 'easy' | 'intermediate' | 'hard';

export const getWordsByDifficulty = (difficulty: Difficulty) => {
  switch (difficulty) {
    case 'easy':
      return easyWords;
    case 'intermediate':
      return intermediateWords;
    case 'hard':
      return hardWords;
  }
};

export const generateTest = (difficulty: Difficulty, wordCount: number = 25) => {
  const words = getWordsByDifficulty(difficulty);
  const test: string[] = [];
  
  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    test.push(words[randomIndex]);
  }
  
  return test;
};