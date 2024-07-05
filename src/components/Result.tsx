import React from 'react';
import "../css/globals.css";
import styles from "../css/page.module.css";

interface ResultProps {
  scoreboard: number[];
  time: number;
}

export default function Result({scoreboard, time}: ResultProps){
  const words = scoreboard[0]+scoreboard[1];
  return (
    <div className={styles.result}>
      <div>
        <div className={styles.title}>
          <span style={{ color: "white" }}>WPM</span>
          <span>&nbsp;(每分鐘字數)</span>
        </div>
        <div>{(words/(time/60000)).toFixed(0)}</div>
      </div>
      <div>
        <div className={styles.title}>
          <span style={{ color: "white" }}> Accuracy</span>
          <span>&nbsp;(正確率)</span>
        </div>
        <div className={styles.acc}>{((scoreboard[0]/words)*100).toFixed(0)}%</div>
      </div>
    </div>
  );
}
