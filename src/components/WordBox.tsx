import { useEffect, useRef, useState, useCallback } from 'react';
import Letter from './Letter';
import "../css/globals.css";
import styles from "../css/page.module.css";
import wordsData from '../words.json';
import { WordObj } from '@/utils';
interface WordProps {
  wordObj: WordObj;
}
const WordBox: React.FC<WordProps> = ({wordObj}) => {
  const { word, letterArr, isCorrect, isSkip } = wordObj;  

  return (
    <div className={styles.word_box}>
      <div className={`${styles.chinese} ${isCorrect === null ? '' : isCorrect ? styles.correct : styles.incorrect}`}>
        {wordObj.word}
      </div>
      {/* <div className={styles.chinese}></div> */}
      <div className={styles.zh}>
        {letterArr.map((letterObj, index) => (
          <Letter key={index} letterObj={letterObj} />
        ))}
      </div>
    </div>
  );
};

export default WordBox;