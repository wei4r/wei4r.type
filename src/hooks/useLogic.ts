import { useEffect, useState, useRef, useCallback } from 'react';
import useTypingGame from '../hooks/useTypingGame';
import { useCountdown } from '../hooks/useCountDown';
import {initializeGame} from '../logic';
export const useLogic = () => {

  const [time, setTime] = useState(30000);
	const { wordObjs, setWordObjs, cursorRef, gameRef, typingState, setTypingState, reset, scoreboard} = useTypingGame();
	const { countdown, startCountdown, resetCountdown} = useCountdown(time);
  if(typingState === 'start'){
		startCountdown();
		setTypingState('typing');
	}

  const restart = () => {
    resetCountdown();
    reset();
    initializeGame(setWordObjs, gameRef);
  };

  return { countdown, time, setTime, restart, wordObjs, setWordObjs, cursorRef, gameRef, typingState, setTypingState, scoreboard};
};