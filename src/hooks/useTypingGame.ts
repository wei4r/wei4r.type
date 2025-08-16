import { useEffect, useRef, useState, useCallback } from "react";
import { getRandomWords, WordObj, validKeysSet } from '../utils';
import { updateCursor } from "../logic";
import { updateWordCorrect, moveCurrent, getYPosition, getXPosition } from "../logic";

type TypingState = 'idle' | 'start' | 'typing' | 'end';

const useTypingGame = () => {
  const [wordObjs, setWordObjs] = useState<WordObj[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>('');
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [typingState, setTypingState] = useState<TypingState>('idle');
  const [scoreboard, setScoreboard] = useState<number[]>([0,0]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<HTMLDivElement>(null);
  const [wordnum, setWordNum] = useState<number>(0);
  const [rightmost, setRightmost] = useState<number>(0);

  const handleKeyDown = useCallback((event: KeyboardEvent): void => {
    if (typingState === 'end') return;
    const {key, code} = event;
    if (gameRef.current && document.activeElement !== gameRef.current) gameRef.current.focus();
    if (code === "Slash") {
      event.preventDefault();
    }
    if (!validKeysSet.has(key)) return;
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

    if(getXPosition(cursorRef) > rightmost){ 
      setRightmost(getXPosition(cursorRef));
    }

    // Move to the next word if the current word is completed
    if (cursorPosition + 1 >= currentWordObj.letterArr.length) {
      if (updatedWordObjs[currentWordIndex].isCorrect)setScoreboard(prev => [prev[0]+updatedWordObjs[currentWordIndex].word.length, prev[1]]);
      else setScoreboard(prev => [prev[0], prev[1]+updatedWordObjs[currentWordIndex].word.length]);

      const nextWordIndex = currentWordIndex + 1;
      setCurrentWordIndex(nextWordIndex);
      
      // Set the first letter of the next word to current=true
      updatedWordObjs[nextWordIndex].letterArr[0].current = true;
      setWordObjs(updatedWordObjs);
      setCursorPosition(0);
      setUserInput('');

      // Handle Renew Words When Change to 3rd Line
      const yPosition = getYPosition(cursorRef);
      const xPosition = getXPosition(cursorRef);
    
      if (wordnum>0 && rightmost && xPosition>rightmost-70) {
        const linesToRemove = wordnum;
        setWordNum(currentWordIndex - linesToRemove+1);
        const newWords = getRandomWords(linesToRemove);
        setWordObjs(prev => [...prev.slice(linesToRemove), ...newWords]);
        setCurrentWordIndex(prev => prev - linesToRemove);
        setCursorPosition(0);
        updateCursor(cursorRef);
      } else if (yPosition > 297 && wordnum === 0) {
        const firstLineWordCount = currentWordIndex;
        setWordNum(firstLineWordCount);
      }

    }
  }, [cursorPosition, wordObjs, currentWordIndex, typingState, rightmost, wordnum]);

  useEffect(() => { // Handle user input 
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => { // Update cursor
    updateCursor(cursorRef);
  }, [userInput, wordObjs]);

  const reset = (): void => { // Reset the game
    setWordObjs([]);
    setCurrentWordIndex(0);
    setUserInput('');
    setCursorPosition(0);
    setTypingState('idle');
    setScoreboard([0,0]);
    updateCursor(cursorRef);
    setWordNum(0);
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
