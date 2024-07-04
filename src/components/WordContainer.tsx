import { useEffect, useRef, useMemo, useState } from "react";
import "../css/globals.css";
import styles from "../css/page.module.css";
import WordBox from "./WordBox";
import { getRandomWords, WordObj } from '../utils';
import { checkCorrect, updateCursor } from "../logic";
import useTypingGame from "../hooks/useTypingGame";

interface WordContainerProps {
  wordObjs: WordObj[];
  gameRef: React.RefObject<HTMLDivElement>;
  cursorRef: React.RefObject<HTMLDivElement>;
}

const WordContainer = ({wordObjs, gameRef, cursorRef}:WordContainerProps) => {
  return (
    <div className={styles.game} ref={gameRef} tabIndex={0}>
      <div className={styles.words}>
        {wordObjs.map((wordObj, index) => (
					<WordBox wordObj={wordObj} key={index}/>
        ))}
      </div>
      <div ref={cursorRef} className={styles.cursor}></div>
      {wordObjs.length > 0 && <div className={styles.focus_error}>Click here to focus</div>}
			{/* <div className={styles.cursor}></div> */}
    </div>
  );
};

export default WordContainer;