import { useState } from 'react';
import useTypingGame from '../hooks/useTypingGame';
import { useCountdown } from '../hooks/useCountDown';
import { initializeGame } from '../logic';
import { WordObj } from '../utils';

type TypingState = 'idle' | 'start' | 'typing' | 'end';
type LoadingState = 'loading' | 'ready' | 'error';

interface UseLogicReturn {
  countdown: number;
  time: number;
  setTime: (time: number) => void;
  restart: () => void;
  wordObjs: WordObj[];
  setWordObjs: React.Dispatch<React.SetStateAction<WordObj[]>>;
  cursorRef: React.MutableRefObject<HTMLDivElement | null>;
  gameRef: React.MutableRefObject<HTMLDivElement | null>;
  typingState: TypingState;
  setTypingState: (state: TypingState) => void;
  scoreboard: number[];
}

export const useLogic = (): UseLogicReturn => {
  const [time, setTime] = useState<number>(30000);
  const { wordObjs, setWordObjs, cursorRef, gameRef, typingState, setTypingState, reset, scoreboard } = useTypingGame();
  const { countdown, startCountdown, resetCountdown } = useCountdown(time);
  
  if (typingState === 'start') {
    startCountdown();
    setTypingState('typing');
  }
  
  if (countdown === 0 && typingState === 'typing') {
    setTypingState('end');
  }

  const restart = (): void => {
    resetCountdown();
    reset();
    initializeGame(setWordObjs, gameRef);
  };

  return { 
    countdown, 
    time, 
    setTime, 
    restart, 
    wordObjs, 
    setWordObjs, 
    cursorRef, 
    gameRef, 
    typingState, 
    setTypingState, 
    scoreboard
  };
};