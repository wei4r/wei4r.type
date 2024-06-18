import { useEffect, useRef, useMemo, useState } from "react";
import "../css/globals.css";
import styles from "../css/page.module.css";
import WordBox from "./WordBox";
import { getRandomWords, WordObj } from '../utils';

const WordContainer = () => {
	const [wordObjs, setWordObjs] = useState<WordObj[]>([]);

  useEffect(() => {
    const randomWords = getRandomWords(20);
    setWordObjs(randomWords);
  }, []);

	return (
		<div className={styles.game} tabIndex={0}>
			<div className={styles.words}>
				{wordObjs.map((wordObj, index) => (
					<WordBox key={index} wordObj={wordObj} />
				))}
			</div>
			<div className={styles.focus_error}>Click here to focus</div>
			<div className={styles.cursor}></div>
    </div>
	);
}

export default WordContainer;