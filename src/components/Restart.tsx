import "../css/globals.css";
import styles from "../css/page.module.css";

interface TimeBarProps {
  restart: () => void;
}

export default function TimeBar({ restart }: TimeBarProps){
	return (
    <div className={styles.buttons}>
        <button className={styles.newGameBtn} onClick={restart}>New game</button>
    </div>
	);
}