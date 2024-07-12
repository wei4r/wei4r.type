import Head from 'next/head';
import Game from "../components/game";
import styles from "../css/page.module.css";
import { useDetectDevice } from '../hooks/useDetectDevice';
import MobileNotSupported from '../components/MobileNotSupported';


export default function App() {
  const isMobile = useDetectDevice();
  return (
    <div className={styles.main}>
      <Head>
        <title>wei4r.type</title>
      </Head>
      <main className={styles.main}>
        {isMobile ? (
          <MobileNotSupported />
        ) : (
          <>
          <Game></Game>
          </>
          
        )}      

      </main>
    </div>
  );
}
