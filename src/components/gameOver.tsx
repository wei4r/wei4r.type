import { useEffect, useRef, useState, useCallback } from 'react';
import "../css/globals.css";
import styles from "../css/page.module.css";
const GameOverComponent: React.FC = () => {
    return (
      <div className={styles.result}>
        <div>
          <div className={styles.title}>wpm</div>
          <div className={styles.wpm}></div>
        </div>
        <div>
          <div className={styles.title}> accuracy </div>
          <div className={styles.acc}></div>
        </div>
      </div>
    );
};

export default GameOverComponent;