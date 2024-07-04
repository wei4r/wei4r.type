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
  const [wordsPerLine, setWordsPerLine] = useState<number>(6);
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
      if (cursorPosition <= 0) return;
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
      console.log(scoreboard);

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
      console.log("Change Line");
      const newWords = getRandomWords(wordsPerLine);
      setWordObjs(prev => [...prev.slice(wordsPerLine), ...newWords]);
      setCurrentWordIndex(prev => prev - wordsPerLine);
      setCursorPosition(0);
      updateCursor(cursorRef);
    }
  }, [currentWordIndex]);

  useEffect(() => {   // Update wordsPerLine based on window width
    updateCursor(cursorRef);
    const handleResize = () => {
      if (window.innerWidth < 1165) {
        setWordsPerLine(5);
      } else {
        setWordsPerLine(6);
      }
      // console.log(wordsPerLine, innerWidth);
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
