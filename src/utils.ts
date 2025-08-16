export interface LetterObj {
  letter: string;
  isCorrect: boolean | null;
  current: boolean;  
}

export interface WordObj {
  word: string;
  isCorrect: boolean | null;
  letterArr: LetterObj[];
  isSkip: boolean;
}

export const validKeysSet: Set<string> = new Set([...'ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄧㄨㄩㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦˊˋˇ˙abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-,./;'.split(''), 'Backspace', ' ']);
export const alter_key: Record<string, string> = {'ㄅ':'1','ㄆ':'q','ㄇ':'a','ㄈ':'z','ㄉ':'2','ㄊ':'w','ㄋ':'s','ㄌ':'x','ˇ':'3','ㄍ':'e','ㄎ':'d','ㄏ':'c','ˋ':'4','ㄐ':'r','ㄑ':'f','ㄒ':'v','ㄓ':'5','ㄔ':'t','ㄕ':'g','ㄖ':'b','ˊ':'6','ㄗ':'y','ㄘ':'h','ㄙ':'n','˙':'7','ㄧ':'u','ㄨ':'j','ㄩ':'m','ㄚ':'8','ㄛ':'i','ㄜ':'k','ㄝ':',','ㄞ':'9','ㄟ':'o','ㄠ':'l','ㄡ':'.','ㄢ':'0','ㄣ':'p','ㄤ':';','ㄥ':'/','ㄦ':'-'};

interface WordsData {
  [word: string]: string;
}

let wordsData: WordsData | null = null;

// Lazy load words data to reduce initial memory footprint
const loadWordsData = async (): Promise<WordsData> => {
  if (!wordsData) {
    const wordsModule = await import('./words.json');
    wordsData = wordsModule.default;
  }
  return wordsData;
};

// Randomly select n words from wordsData and return them as an array of WordObj
export const getRandomWords = (n: number): WordObj[] => {
  // For now, use synchronous loading to maintain compatibility
  // In the future, this could be made async for better performance
  const wordsDataSync = require('./words.json') as WordsData;
  const entries = Object.entries(wordsDataSync);
  
  // Use Fisher-Yates shuffle for better randomness
  const shuffled = [...entries];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  const selectedEntries = shuffled.slice(0, n);

  return selectedEntries.map(([word, pronunciation]) => ({
    word,
    isCorrect: null,
    isSkip: false,
    letterArr: pronunciation.split('').map(letter => ({
      letter,
      isCorrect: null,
      current: false,
    })),
  }));
};

// Async version for future use when components can handle promises
export const getRandomWordsAsync = async (n: number): Promise<WordObj[]> => {
  const wordsDataAsync = await loadWordsData();
  const entries = Object.entries(wordsDataAsync);
  
  // Use Fisher-Yates shuffle for better randomness
  const shuffled = [...entries];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  const selectedEntries = shuffled.slice(0, n);

  return selectedEntries.map(([word, pronunciation]) => ({
    word,
    isCorrect: null,
    isSkip: false,
    letterArr: pronunciation.split('').map(letter => ({
      letter,
      isCorrect: null,
      current: false,
    })),
  }));
};

