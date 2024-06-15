import { useEffect, useRef, useState, useCallback } from 'react';
import "../css/globals.css";
import GameOverComponent from './gameOver';
import styles from "../css/page.module.css";
import { 
	whole_word, words, wordsCount, alter_key, moveCursor, handleWordLogic, // setGameTime, gameTime,
	addClass, removeClass, formatWord, newGame, getResult, gameOver, checkCorrect 
  } from '../logic';

export default function Game() {
	const gameRef = useRef<HTMLDivElement>(null);
	// console.log("check gameRef", gameRef);
	const [isGameStarted, setIsGameStarted] = useState(false);
	const [userInput, setUserInput] = useState('');
	const [gameTime, setGameTime] = useState(30);
	const [gameOverState, setGameOverState] = useState(false);
	const cursorRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (gameRef.current) {
			gameRef.current.focus();
			console.log("focus");
		}
		newGame();
	}, []);
	
	const handleKeydown = useCallback((keyEvent: KeyboardEvent) => {
		if (gameOverState) return;
		
		const key = keyEvent.key;
		const currentWord = document.querySelector(`.${styles.word_box}.${styles.current}`) as HTMLElement;
		const currentLetter = document.querySelector(`.${styles.letter}.${styles.current}`) as HTMLElement;
		const cursor = cursorRef.current as HTMLElement;

		const wordLogic = handleWordLogic(key, currentWord, currentLetter, cursor);


		setUserInput((prevInput) => prevInput + key);
		
		if (!isGameStarted && wordLogic.isLetter) {
			setIsGameStarted(true);
			console.log("START!!!");
		}
		if (document.querySelector(`.${styles.game}.${styles.over}`)) {
			return;
		}
		// console.log({key,expected});
  
		if (wordLogic.isLetter) {
			if (currentLetter) {
			addClass(currentLetter, key === wordLogic.expected || key === alter_key[wordLogic.expected] ? 'correct' : 'incorrect');
			if (wordLogic.expected === '_' && key === ' ') {
				addClass(currentLetter, 'correct');
				removeClass(currentLetter, 'incorrect');
			}
			removeClass(currentLetter, 'current');
	
			if (currentLetter.nextSibling) {
				addClass(currentLetter.nextSibling as HTMLElement, 'current');
			} else {
				// Finish this word
				if (checkCorrect(currentLetter)) {
				addClass(currentWord!.children[0] as HTMLElement, 'correct');
				} else {
				addClass(currentWord!.children[0] as HTMLElement, 'incorrect');
				}
				removeClass(currentWord!, 'current');
				addClass(currentWord!.nextSibling as HTMLElement, 'current');
				addClass((currentWord!.nextSibling as HTMLElement).children[1].firstChild as HTMLElement, 'current');
			}
			}
		}
  
		if (wordLogic.isEnter) {
			removeClass(currentWord!, 'current');
			addClass(currentWord!.nextSibling as HTMLElement, 'current');
			if (currentLetter) removeClass(currentLetter, 'current');			
			addClass((currentWord!.nextSibling as HTMLElement).children[1].firstChild as HTMLElement, 'current');
			addClass(currentWord!.children[0] as HTMLElement, 'incorrect');
		}
	
		if (wordLogic.isBackspace) {
			if (currentLetter && wordLogic.isFirstLetter) {
				// make previous word current, last letter current
				removeClass(currentWord, 'current');
				addClass(currentWord?.previousSibling as HTMLElement, 'current');
				removeClass(currentLetter, 'current');
				addClass((currentWord?.previousSibling as HTMLElement)?.children[1].lastChild as HTMLElement, 'current');
				removeClass((currentWord?.previousSibling as HTMLElement)?.children[0] as HTMLElement, 'incorrect');
				removeClass((currentWord?.previousSibling as HTMLElement)?.children[0] as HTMLElement, 'correct');
				removeClass((currentWord?.previousSibling as HTMLElement)?.children[1].lastChild as HTMLElement, 'incorrect');
				removeClass((currentWord?.previousSibling as HTMLElement)?.children[1].lastChild as HTMLElement, 'correct');
			}
			if (currentLetter && !wordLogic.isFirstLetter) {
				// move back one letter, invalidate letter
				removeClass(currentLetter, 'current');
				removeClass(currentLetter.previousSibling as HTMLElement, 'incorrect');
				removeClass(currentLetter.previousSibling as HTMLElement, 'correct');
				addClass(currentLetter.previousSibling as HTMLElement, 'current');
			}
			if (!currentLetter) {
				const lastChild = currentWord?.children[1].lastChild as HTMLElement;
				if (lastChild?.classList.contains('extra')) {
					lastChild.remove();
				} else {
					addClass(lastChild, 'current');
					removeClass(lastChild, 'incorrect');
					removeClass(lastChild, 'correct');
				}
			}
		}
	
		// Move lines / words
		if (wordLogic.isLastLetter && (currentWord!.nextSibling as HTMLElement).getBoundingClientRect().top > 430 || currentWord!.getBoundingClientRect().top > 430) {

			cursor.style.display = 'none';
			const wordsContainer = document.querySelector(`.${styles.words}`) as HTMLElement;
			if (wordsContainer) {
			  const margin = parseInt(wordsContainer.style.marginTop || '0px');
			  wordsContainer.style.marginTop = (margin - 95) + 'px';
			  for (let i = 0; i < 7; i++) {
				wordsContainer.innerHTML += formatWord();
			  }
			}
			cursor.style.display = 'flex';
		}

		// Move cursor
		moveCursor(cursor);

	},[isGameStarted]);

	useEffect(() => {
        document.addEventListener('keydown', handleKeydown);

        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };
    }, [handleKeydown]);

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

	const handleTimeButtonClick = (time: number) => {
		setIsGameStarted(false); // Stop the game
		setGameTime(time); // Set the game time in logic.ts
		const infoElement = document.querySelector(`.${styles.info}`) as HTMLElement;
		infoElement.innerHTML = time.toString();
		newGame(); // Restart the game with the new time
	};
	if (gameTime===0 && gameOverState){
		// console.log("game over!!!!!");
		return <GameOverComponent />;
	}
	return (
	  <>
      <div className={styles.header}>
        <div className={styles.info}>30</div>
        <div className={styles.buttons}>
          <button className={styles.time_button}  onClick={() => handleTimeButtonClick(15)}>15</button>
          <button className={styles.time_button}  onClick={() => handleTimeButtonClick(30)}>30</button>
          <button className={styles.time_button}  onClick={() => handleTimeButtonClick(60)}>60</button>
        </div>
      </div>
      <div className={styles.reminder}>按下Enter以跳過詞彙</div>
      <div className={styles.game} tabIndex={0} ref={gameRef}>
          <div className={styles.words} ></div>
          <div className={styles.cursor} ref={cursorRef}></div>
          <div className={styles.focus_error}>Click here to focus</div>
          <div className={styles.result}>
              <div>
                  <div className={styles.title}>wpm</div>
                  <div className={styles.wpm}></div>
              </div>
              <div>
                  <div></div>
                  <div className={styles.title}> accuracy </div>
                  <div className={styles.acc}></div>
              </div>
          </div>
      </div>
      <div className={styles.restart_reminder}>按下Enter以重新開始</div>
      <div className={styles.buttons}>
          <button className={styles.newGameBtn}>New game</button>
      </div>
    </>
  );
}