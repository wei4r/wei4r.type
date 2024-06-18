export interface LetterObj {
  letter: string;
  isCorrect: boolean | null;
}

export interface WordObj {
  word: string;
  isCorrect: boolean | null;
  letterArr: LetterObj[];
  isSkip: boolean;
}


import wordsData from './words.json'; 
// Randomly select n words from wordsData and return them as an array of WordObj
export const getRandomWords = (n: number): WordObj[] => {
  const entries = Object.entries(wordsData);
  const shuffled = entries.sort(() => 0.5 - Math.random());
  const selectedEntries = shuffled.slice(0, n);

  return selectedEntries.map(([word, pronunciation]) => ({
    word,
    isCorrect: null,
    isSkip: false,
    letterArr: pronunciation.split('').map(letter => ({
      letter,
      isCorrect: null,
    })),
  }));
};

// Test the function
const randomWords = getRandomWords(5);
// console.log(randomWords);
randomWords.forEach((wordObj) => {
  let output = "";
  wordObj.letterArr.forEach((letterObj) => {
    output+=letterObj.letter;
  });
  console.log(output);
});