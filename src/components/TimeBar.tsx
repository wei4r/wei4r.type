import { useEffect } from "react";
import "../css/globals.css";
import styles from "../css/page.module.css";

interface TimeBarProps {
  time: number;
  setTime: (time: number) => void;
  restart: () => void;
}

export default function TimeBar({ time, setTime, restart }: TimeBarProps){
  const handleTimeButton = (newTime: number) => {
    setTime(newTime);
    restart();
  };
	return (
    <>
      <div className={styles.top}>
        {time > 0 && <div className={styles.timer}>{time/1000}</div>}
        <div className={styles.buttons}>
          <button className={styles.time_button}  onClick={() => handleTimeButton(15000)}>15</button>
          <button className={styles.time_button}  onClick={() => handleTimeButton(30000)}>30</button>
          <button className={styles.time_button}  onClick={() => handleTimeButton(60000)}>60</button>
        </div>
      </div>
      {/* <div className={styles.reminder}>按下Enter以跳過詞彙</div> */}
      {/* <div className={styles.restart_reminder}>按下Enter以重新開始</div> */}
    </>
	);
}