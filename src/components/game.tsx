import { useEffect, useRef, useState, useCallback } from 'react';
import "../css/globals.css";
import GameOverComponent from './gameOver';
import styles from "../css/page.module.css";
import Header from './Header';
import TimeBar from './TimeBar';
import WordContainer from './WordContainer';
import { 
	whole_word, words, wordsCount, alter_key, moveCursor, handleWordLogic, // setGameTime, gameTime,
	addClass, removeClass, formatWord, newGame, getResult, gameOver, checkCorrect 
  } from '../logic';

export default function Game() {
	const [isGameStarted, setIsGameStarted] = useState(false);
	const [userInput, setUserInput] = useState('');
	const [gameTime, setGameTime] = useState(30);
	const [gameOverState, setGameOverState] = useState(false);
	
	


	useEffect(() => {
		let timerId: NodeJS.Timeout;
		if (isGameStarted && gameTime > 0) {
		  timerId = setInterval(() => {
			// console.log("time: ", gameTime);
			setGameTime((prevTime) => prevTime - 1);
			const infoElement = document.querySelector(`.${styles.info}`) as HTMLElement;
			infoElement.innerHTML = (gameTime-1).toString();
		  }, 1000);
		}
		else if (gameTime === 0 && !gameOverState) {
			console.log("time = 0");
			gameOver();
			setGameOverState(true);
			setIsGameStarted(false);
		}
	
		return () => {
		  if (timerId) {
			clearInterval(timerId);
		  }
		};
	}, [isGameStarted, gameTime]);

	if (gameTime===0 && gameOverState){
		return <GameOverComponent />;
	}
	return (
	  <>
			<Header/>
			<TimeBar/>
			<WordContainer/>
      <div className={styles.buttons}>
          <button className={styles.newGameBtn}>New game</button>
      </div>
    </>
  );
}