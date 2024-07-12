import { useEffect, useRef, useState, useCallback } from "react";
import { getRandomWords, WordObj, validKeysSet } from '../utils';
import { checkCorrect, updateCursor } from "../logic";
import { updateWordCorrect, moveCurrent } from "../logic";
import styles from "../css/page.module.css";

type TypingState = 'idle' | 'start' | 'typing';

const useTypingGame = () => {
  const [wordObjs, setWordObjs] = useState<WordObj[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>('');
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [typingState, setTypingState] = useState<TypingState>('idle');
  const [wordsPerLine, setWordsPerLine] = useState<number>(1);
  const [scoreboard, setScoreboard] = useState<number[]>([0,0]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(({key, code}:KeyboardEvent) => {

    // if (!acceptedKeys.includes(key) or ) return;
    if (!validKeysSet.has(key))return;
    if(typingState === 'idle'){
      setTypingState('start');
    }

    if (key === 'Backspace') {
      if (cursorPosition === 0 && currentWordIndex > 0) {
        // At the start of a word, go back
        const previousWordIndex = currentWordIndex - 1;
        const previousWord = wordObjs[previousWordIndex];
        
        if (!previousWord.isCorrect) {
          // Previous word is incorrect, move back
          setCurrentWordIndex(previousWordIndex);
          setCursorPosition(previousWord.letterArr.length - 1);
          setUserInput(previousWord.word.slice(0, -1));
          const updatedWordObjs = [...wordObjs];
          // Reset the current word
          updatedWordObjs[currentWordIndex].letterArr[0].current=false;
          // Set the last letter of the previous word as current
          updatedWordObjs[previousWordIndex].letterArr[previousWord.letterArr.length - 1].current = true;
          updatedWordObjs[previousWordIndex].letterArr[previousWord.letterArr.length - 1].isCorrect = null;
          setWordObjs(updatedWordObjs);
        }
        // If previous word is correct, do nothing
        updateCursor(cursorRef);
        return;
      }
      if (cursorPosition < 0) return;
      setUserInput((prev) => prev.slice(0, -1));
      setCursorPosition((prev) => prev - 1);

      const updatedWordObjs = [...wordObjs];
      const currentWordObj = moveCurrent(updatedWordObjs[currentWordIndex], cursorPosition, -1, '');
      updatedWordObjs[currentWordIndex] = updateWordCorrect(currentWordObj);
      setWordObjs(updatedWordObjs);
      updateCursor(cursorRef);
      return;
    }

    setUserInput((prev) => prev + key);
    setCursorPosition((prev) => prev + 1);
    
    const updatedWordObjs = [...wordObjs];
    const currentWordObj = moveCurrent(updatedWordObjs[currentWordIndex], cursorPosition, 1, key);
    updatedWordObjs[currentWordIndex] = updateWordCorrect(currentWordObj);
    setWordObjs(updatedWordObjs);

    // Move to the next word if the current word is completed
    if (cursorPosition + 1 >= currentWordObj.letterArr.length) {
      
      // console.log(updatedWordObjs[currentWordIndex] );
      if (updatedWordObjs[currentWordIndex].isCorrect)setScoreboard(prev => [prev[0]+updatedWordObjs[currentWordIndex].word.length, prev[1]]);
      else setScoreboard(prev => [prev[0], prev[1]+updatedWordObjs[currentWordIndex].word.length]);

      const nextWordIndex = currentWordIndex + 1;
      setCurrentWordIndex(nextWordIndex);
      
      // Set the first letter of the next word to current=true
      updatedWordObjs[nextWordIndex].letterArr[0].current = true;
      setWordObjs(updatedWordObjs);
      setCursorPosition(0);
      setUserInput('');
    }
  }, [cursorPosition, wordObjs, currentWordIndex]);

  useEffect(() => { // Handle user input 
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  useEffect(() => { // Update cursor
    updateCursor(cursorRef);
  }, [userInput, wordObjs]);

  useEffect(() => {   // Change Line
    if(currentWordIndex>=2*wordsPerLine){
      const newWords = getRandomWords(wordsPerLine);
      setWordObjs(prev => [...prev.slice(wordsPerLine), ...newWords]);
      setCurrentWordIndex(prev => prev - wordsPerLine);
      setCursorPosition(0);
      updateCursor(cursorRef);
    }
  }, [currentWordIndex]);


  useEffect(() => {   // Update wordsPerLine based on window width
    const handleResize = () => {
      // console.log(window.innerWidth);
      updateCursor(cursorRef);
      if (window.innerWidth < 710) {
        setWordsPerLine(3);
      } 
      else if (window.innerWidth < 887) {
        setWordsPerLine(4);
      }
      else if (window.innerWidth < 1065) {
        setWordsPerLine(5);

      } else if (window.innerWidth < 1242) {
        setWordsPerLine(6);
      }
      else {
        setWordsPerLine(7);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const reset = () => { // Reset the game
    setWordObjs([]);
    setCurrentWordIndex(0);
    setUserInput('');
    setCursorPosition(0);
    setTypingState('idle');
    setScoreboard([0,0]);
  };
  return {
    wordObjs,
    setWordObjs,
    cursorRef,
    gameRef,
    typingState,
    setTypingState,
    reset,
    scoreboard
  };
};

export default useTypingGame;
