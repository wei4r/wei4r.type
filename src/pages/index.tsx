import Game from "../components/game";
import styles from "../css/page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.page_title}>wei4r.type</h1>
      <Game></Game>
    </main>
  );
}
