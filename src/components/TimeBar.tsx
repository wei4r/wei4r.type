import "../css/globals.css";
import styles from "../css/page.module.css";

export default function TimeBar(){
  const handleTimeButtonClick = (time: number) => {
		// setIsGameStarted(false); // Stop the game
		// setGameTime(time); // Set the game time in logic.ts
		const infoElement = document.querySelector(`.${styles.info}`) as HTMLElement;
		// infoElement.innerHTML = "check";
		infoElement.innerHTML = time.toString();
		// newGame(); // Restart the game with the new time
	};

	return (
    <>
      <div className={styles.top}>
        <div className={styles.info}>30</div>
        <div className={styles.buttons}>
          <button className={styles.time_button}  onClick={() => handleTimeButtonClick(15)}>15</button>
          <button className={styles.time_button}  onClick={() => handleTimeButtonClick(30)}>30</button>
          <button className={styles.time_button}  onClick={() => handleTimeButtonClick(60)}>60</button>
        </div>
      </div>
      <div className={styles.reminder}>按下Enter以跳過詞彙</div>
      <div className={styles.restart_reminder}>按下Enter以重新開始</div>
    </>
	);
}