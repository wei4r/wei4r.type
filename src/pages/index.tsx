import Game from "../components/game";
import styles from "../css/page.module.css";
import { useDetectDevice } from '../hooks/useDetectDevice';
import MobileNotSupported from '../components/MobileNotSupported';


export default function App() {
  const isMobile = useDetectDevice(); // Move this line inside the App component
  return (
    <main className={styles.main}>
      {isMobile ? (
        <MobileNotSupported />
      ) : (
        <>
        <Game></Game>
        </>
        
      )}      

    </main>
  );
}
