import { useEffect, useRef, useState } from 'react';
import "../css/globals.css";
import styles from "../css/page.module.css";
import { 
	whole_word, words, wordsCount, alter_key, gameTime,
	addClass, removeClass, formatWord, newGame, getResult, gameOver, checkCorrect 
  } from '../logic';

export default function Game() {
	const gameRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
	  const gameElement = gameRef.current;
	  console.log("check", gameElement);
	  if (gameElement) {
		gameElement.addEventListener('keydown', handleKeydown);
	  }
	  
	  newGame();
	  return () => {
		if (gameElement) {
		  gameElement.removeEventListener('keydown', handleKeydown);
		}
	  };
	}, []);
  
	const handleKeydown = (ev: KeyboardEvent) => {
		const keyEvent = ev as KeyboardEvent;
		const key = keyEvent.key;
		const currentWord = document.querySelector('.word-box.current') as HTMLElement;
		const currentLetter = document.querySelector('.letter.current') as HTMLElement;
		const expected = currentLetter?.innerHTML || 'Enter';
		const isLetter = key.length === 1 && key !== 'Meta' && key !== 'CapsLock';
		const isEnter = key === 'Enter';
		const isBackspace = key === 'Backspace';
		const isFirstLetter = currentLetter === currentWord?.children[1]?.children[0];
		const isLastLetter = currentLetter === currentWord?.children[1]?.lastChild;
	
		if (document.querySelector('.game.over')) {
			return;
		}
		// console.log({key,expected});
	
		let timer: NodeJS.Timeout | null = null;
		let gameStart: number | null = null;
		if (!timer && isLetter) {
			timer = setInterval(() => {
				if (!gameStart) {
					gameStart = (new Date()).getTime();
				}
				const currentTime = (new Date()).getTime();
				const msPassed = currentTime - gameStart;
				const sPassed = Math.round(msPassed / 1000);
				const sLeft = Math.round((gameTime / 1000) - sPassed - 1);
				if (sLeft <= 0) {
					const cursorElement = document.querySelector('.cursor') as HTMLElement;
					cursorElement.style.display = 'none';
					gameOver();
					return;
				}
				const infoElement = document.querySelector('.info') as HTMLElement;
				infoElement.innerHTML = sLeft.toString();
			}, 1000);
		}
  
		if (isLetter) {
			if (currentLetter) {
			addClass(currentLetter, key === expected || key === alter_key[expected] ? 'correct' : 'incorrect');
			if (expected === '_' && key === ' ') {
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
  
		if (isEnter) {
			removeClass(currentWord!, 'current');
			addClass(currentWord!.nextSibling as HTMLElement, 'current');
			if (currentLetter) {
			removeClass(currentLetter, 'current');
			}
			addClass((currentWord!.nextSibling as HTMLElement).children[1].firstChild as HTMLElement, 'current');
			addClass(currentWord!.children[0] as HTMLElement, 'incorrect');
		}
	
		if (isBackspace) {
			if (currentLetter && isFirstLetter) {
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
			if (currentLetter && !isFirstLetter) {
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
		if (isLastLetter && (currentWord!.nextSibling as HTMLElement).getBoundingClientRect().top > 430 || currentWord!.getBoundingClientRect().top > 430) {
			document.getElementById('cursor')!.style.display = 'none';
			const words = document.getElementById('words')!;
			const margin = parseInt(words.style.marginTop || '0px');
			words.style.marginTop = (margin - 95) + 'px';
			for (let i = 0; i < 10; i++) {
			document.getElementById('words')!.innerHTML += formatWord();
			}
			document.getElementById('cursor')!.style.display = 'flex';
		}
	
		// Move cursor
		const nextLetter = document.querySelector('.letter.current');
		const nextWord = document.querySelector('.word-box.current')?.children[1];
		const cursor = document.querySelector('.cursor') as HTMLElement;
		if (nextLetter && nextLetter.getBoundingClientRect().top < 430) {
			cursor.style.top = (nextLetter || nextWord)?.getBoundingClientRect().top + 5 + 'px';
		}
		cursor.style.left = (nextLetter || nextWord)?.getBoundingClientRect()[nextLetter ? 'left' : 'right'] + 'px';

	};
	return (
    <main className={styles.main}>
      <h1 className={styles.page_title}>wei4r.type</h1>
      <div className={styles.header}>
        <div className={styles.info}></div>
        <div className={styles.buttons}>
          <button className={styles.time_button}>15</button>
          <button className={styles.time_button}>30</button>
          <button className={styles.time_button}>60</button>
        </div>
      </div>
      <div className={styles.reminder}>按下Enter以跳過詞彙</div>
      <div className={styles.game} tabIndex={0}>
          <div className={styles.words} ></div>
          <div className={styles.cursor}></div>
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
    </main>
  );
}