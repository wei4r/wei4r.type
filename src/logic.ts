import { LetterObj, WordObj, getRandomWords, alter_key } from './utils';
export function checkCorrect(key:string, expected:string){
    if(key===' ')key='_';
  return key === expected||key === alter_key[expected] ? true : false;
}

let last_top = 0;
let initialize=false;
export function updateCursor(cursorRef: React.MutableRefObject<HTMLDivElement | null>){
    // console.log("updateCursor");
    const currentLetter = document.querySelector(`.current`);
    if (currentLetter) {
      const { left, top, height } = currentLetter.getBoundingClientRect();
      cursorRef.current!.style.left = `${left}px`;
      cursorRef.current!.style.top = `${top+6}px`;
        if (top > last_top) {
            last_top = top;
            if(!initialize){
                // console.log("initialize");
                initialize=true;
            }
            else{
                return true;
            }
        }
    }
  
    return false;
};

export const updateWordCorrect = (currentWordObj: WordObj):WordObj => {
    let letterArr = currentWordObj.letterArr;
    let isCorrect: boolean | null = true;
    let hasNull = false;
    for (const letterObj of letterArr) {
      if (letterObj.isCorrect === null) {
        hasNull = true;
      } else if (letterObj.isCorrect === false) {
        isCorrect = false;
        break;
      }
    }
    if (hasNull) {
      isCorrect = null;
    }
  
    return {
      ...currentWordObj,
      letterArr,
      isCorrect,
    };
}

export const moveCurrent = (currentWordObj:WordObj, cursorPosition:number, direction:number, key:string):WordObj => {
    if(direction === 1){
        if(cursorPosition+1 < currentWordObj.letterArr.length){
            currentWordObj.letterArr[cursorPosition+1] = {
              ...currentWordObj.letterArr[cursorPosition+1],
              current: true
            };
        }
        currentWordObj.letterArr[cursorPosition] = {
          ...currentWordObj.letterArr[cursorPosition],
          isCorrect: checkCorrect(key, currentWordObj.letterArr[cursorPosition].letter),
          current: false
        };
    }
    else if(direction === -1){
        currentWordObj.letterArr[cursorPosition - 1] = {
          ...currentWordObj.letterArr[cursorPosition - 1],
          isCorrect: null,
          current: true,
        };
        currentWordObj.letterArr[cursorPosition] = {
          ...currentWordObj.letterArr[cursorPosition],
          current: false,
        };
    }
    return currentWordObj;
}

export const initializeGame = (setWordObjs: (words: any) => void, gameRef: React.RefObject<HTMLDivElement>) => {
  const randomWords = getRandomWords(25);
  randomWords[0].letterArr[0].current = true;
  setWordObjs(randomWords);
  if (gameRef.current) gameRef.current.focus();
};


import { db } from '../firebaseConfig';
import { doc, runTransaction} from "firebase/firestore";
export const incrementPageView = async (page: string) => {
  const pageRef = doc(db, 'pageviews', page);

  try {
    const newCount = await runTransaction(db, async (transaction) => {
      const docSnap = await transaction.get(pageRef);
      if (!docSnap.exists()) {
        console.log("Document does not exist, creating new one with count = 1");
        transaction.set(pageRef, { count: 1 });
        return 1; // Return new count
      } else {
        const newCount = docSnap.data().count + 1;
        transaction.update(pageRef, { count: newCount });
        // console.log("Page view incremented: ", newCount);
        return newCount; // Return updated count
      }
    });
    return newCount;
  } catch (error) {
    console.error("Failed to increment page view: ", error);
    return null; // Handle error case
  }
};