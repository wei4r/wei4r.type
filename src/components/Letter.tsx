import React from 'react';
import "../css/globals.css";
import styles from "../css/page.module.css";
import { LetterObj } from '../utils';

interface LetterProps {
  letterObj: LetterObj;
}

const Letter: React.FC<LetterProps> = ({ letterObj }) => {
  const { letter, isCorrect } = letterObj;

  return (
    <span className={styles.letter}>
      {letter}
    </span>
  );
};

export default Letter;
