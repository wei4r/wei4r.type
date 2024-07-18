import Head from 'next/head';
import Game from "../components/game";
import styles from "../css/page.module.css";
import { useDetectDevice } from '../hooks/useDetectDevice';
import MobileNotSupported from '../components/MobileNotSupported';
import { useEffect, useState } from 'react';
import { incrementPageView } from '../logic';

export default function App() {
  const isMobile = useDetectDevice();
  const [pageViews, setPageViews] = useState(0);
  useEffect(() => {
    incrementPageView('homePage').then(count => {
      if (count !== null) {
        setPageViews(count);
      }
    });
  }, []);
  
  
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
          <div className={styles.visit}>
            <div className={styles.visitCount}>訪問次數 / Total Visits: {pageViews}</div>
          </div>
          </>
          
        )}      

      </main>
    </div>
  );
}
