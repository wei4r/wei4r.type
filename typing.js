const words = 'ㄓㄨˋㄧㄣ_,ㄘㄜˋㄕˋ,ㄨㄤˇㄓㄢˋ,ㄌㄧㄢˋㄒㄧˊ'.split(',');
const whole_word ='注音,測試,網站,練習'.split(',');
const wordsCount = words.length;
const gameTime = 5 * 1000;
window.timer = null;
window.gameStart = null;

function addClass(el,name) {
  el.className += ' '+name;
}
function removeClass(el,name) {
  el.className = el.className.replace(name,'');
}
function formatWord() {
  const randomIndex = Math.ceil(Math.random() * wordsCount) - 1;
  return `<div class="word-box"> <div class="chinese">${whole_word[randomIndex]}</div> <div class="zh"><span class="letter">${words[randomIndex].split('').join('</span><span class="letter">')}</span></div> </div>`;
}
function init_cursor(firstLetter, firstWord){
  // move cursor
  const cursor = document.getElementById('cursor');
  cursor.style.display = 'block';
  cursor.style.top = (firstLetter || firstWord).getBoundingClientRect().top;
  cursor.style.left = (firstLetter || firstWord).getBoundingClientRect()[firstLetter ? 'left' : 'right'] + 'px';
}
function newGame() {
  document.getElementById('result').style.display = 'none';
  document.getElementById('words').style.display = 'flex';
  document.getElementById('cursor').style.display = 'flex';
  document.getElementById('restart-reminder').style.display = 'none';
  //refresh words
  document.getElementById('words').innerHTML = '';
  for (let i = 0; i < 200; i++) {
    document.getElementById('words').innerHTML += formatWord();
  }
  addClass(document.querySelector('.word-box'), 'current');
  addClass(document.querySelector('.letter'), 'current');
  document.getElementById('info').innerHTML = (gameTime / 1000) + '';
  while (document.querySelector('#game.over')) {
    removeClass(document.getElementById('game'), 'over');
  }
  document.getElementById('words').style.margin = '0 5px';
  window.timer = null;
  window.gameStart = null;
  //init_cursor(document.querySelector('.letter.current'), document.querySelector('.word-box.current').children[1]);
  const nextLetter = document.querySelector('.letter');
  const nextWord = document.querySelector('.word-box.current').children[1];
  const cursor = document.getElementById('cursor');
  cursor.style.top = (nextLetter).getBoundingClientRect().top + 2 + 'px';
  cursor.style.left = (nextLetter || nextWord).getBoundingClientRect()[nextLetter ? 'left' : 'right'] + 'px';
}

function getWpm() {
  const correct_words = document.querySelectorAll('.chinese.correct');
  //console.log('raw');
  //console.log(correct_words);
  const incorrect_words = document.querySelectorAll('.chinese.incorrect');
  var correct_word_num = 0;
  var incorrect_word_num = 0;
  if(incorrect_word_num){
    for (var i = 0; i<incorrect_words.length; i++){
      incorrect_word_num += incorrect_words[i].innerText.length;
    }
  }
  for (var i = 0; i<correct_words.length; i++){
    correct_word_num += correct_words[i].innerText.length;
  }
  //console.log('correct_word_num: ');
  //console.log(correct_word_num);
  return correct_word_num / gameTime * 60000;
}

function gameOver() {
  console.log('game over');
  clearInterval(window.timer);
  document.getElementById('words').style.display = 'none';
  document.getElementById('cursor').style.display = 'none';
  document.getElementById('result').style.display = 'flex';
  document.getElementById('restart-reminder').style.display = 'flex';
  document.getElementById('info').innerHTML = '';
  addClass(document.getElementById('game'), 'over');
  const result = getWpm();
  document.getElementById('result').innerHTML = `WPM: ${result}`;
}

document.getElementById('game').addEventListener('keydown', ev => {
  console.log()
  const key = ev.key;
  const currentWord = document.querySelector('.word-box.current');
  const currentLetter = document.querySelector('.letter.current');
  const expected = currentLetter?.innerHTML || 'Enter';
  const isLetter = key.length === 1&&key!='Meta'&&key!='CapsLock';
  const isEnter = key === 'Enter';
  const isBackspace = key === 'Backspace';
  const isFirstLetter = currentLetter === currentWord.children[1].children[0];

  if (document.querySelector('#game.over')) {
    return;
  }

  console.log({key,expected});

  if (!window.timer && isLetter) {
    window.timer = setInterval(() => {
      if (!window.gameStart) {
        window.gameStart = (new Date()).getTime();
      }
      const currentTime = (new Date()).getTime();
      const msPassed = currentTime - window.gameStart;
      const sPassed = Math.round(msPassed / 1000);
      const sLeft = Math.round((gameTime / 1000) - sPassed - 1);
      if (sLeft <= 0) {
        document.getElementById('cursor').style.display = 'none';
        gameOver();
        return;
      }
      document.getElementById('info').innerHTML = sLeft + '';
    }, 1000);
  }

  if (isLetter) {
    if (currentLetter) {
      addClass(currentLetter, key === expected ? 'correct' : 'incorrect');
      if(expected === '_' && key === ' '){
        addClass(currentLetter, 'correct');
        removeClass(currentLetter, 'incorrect');
      }
      removeClass(currentLetter, 'current');
      if (currentLetter.nextSibling) {
        addClass(currentLetter.nextSibling, 'current');
      }
    } 
    else {
      // end of the word
      const incorrectLetter = document.createElement('span');
      incorrectLetter.innerHTML = key;
      incorrectLetter.className = 'letter incorrect extra';
      currentWord.children[1].appendChild(incorrectLetter);
    }
  }

  if (isEnter) {
    if (expected !== 'Enter') {
      const lettersToInvalidate = [...document.querySelectorAll('.word-box.current .letter:not(.correct)')];
      lettersToInvalidate.forEach(letter => {
        addClass(letter, 'incorrect');
      });
    }
    removeClass(currentWord, 'current');
    addClass(currentWord.nextSibling, 'current');
    if (currentLetter) {
      removeClass(currentLetter, 'current');
    }
    addClass(currentWord.nextSibling.children[1].firstChild, 'current');
  }

  if (isBackspace) {
    if (currentLetter && isFirstLetter) {
      // make prev word current, last letter current
      removeClass(currentWord, 'current');
      addClass(currentWord.previousSibling, 'current');
      removeClass(currentLetter, 'current');
      addClass(currentWord.previousSibling.children[1].lastChild, 'current');
      removeClass(currentWord.previousSibling.children[1].lastChild, 'incorrect');
      removeClass(currentWord.previousSibling.children[1].lastChild, 'correct');
    }
    if (currentLetter && !isFirstLetter) {
      // move back one letter, invalidate letter
      removeClass(currentLetter, 'current');
      removeClass(currentLetter.previousSibling, 'incorrect');
      removeClass(currentLetter.previousSibling, 'correct');
      addClass(currentLetter.previousSibling, 'current');
    }
    if (!currentLetter) {
      if(currentWord.children[1].lastChild.classList.contains('extra')){
        currentWord.children[1].lastChild.remove();
      }
      else{
        addClass(currentWord.children[1].lastChild, 'current');
        removeClass(currentWord.children[1].lastChild, 'incorrect');
        removeClass(currentWord.children[1].lastChild, 'correct');
      }
    }
  }

  // move lines / words
  if (currentWord.getBoundingClientRect().top >  450) {
    const words = document.getElementById('words');
    const margin = parseInt(words.style.marginTop || '0px');
    words.style.marginTop = (margin - 105) + 'px';
  }

  var LetterNumber = currentWord.children[1].children.length;
  var flag = 0;
  for (var i = 0; i<LetterNumber; i++){
    if(currentWord.children[1].children[i].classList.contains('incorrect')){
      flag = 1;
      break;
    }
    else if(!currentWord.children[1].children[i].classList.contains('correct')){
      flag = 2;
      break;
    }
  }
  if(flag === 0){
    removeClass(currentWord, 'current');
    addClass(currentWord.children[0], 'correct');
    addClass(currentWord.nextSibling, 'current');
    addClass(currentWord.nextSibling.children[1].firstChild, 'current');
  }
  // move cursor
  const nextLetter = document.querySelector('.letter.current');
  const nextWord = document.querySelector('.word-box.current').children[1];
  const cursor = document.getElementById('cursor');
  cursor.style.top = (nextLetter || nextWord).getBoundingClientRect().top + 2 + 'px';
  cursor.style.left = (nextLetter || nextWord).getBoundingClientRect()[nextLetter ? 'left' : 'right'] + 'px';

});

document.getElementById('newGameBtn').addEventListener('click', () => {
  gameOver();
  newGame();
});

document.getElementById('game').addEventListener('keydown', ev => {
  if(ev.key === 'Enter'){
    if(document.querySelector('#game.over')){
      newGame();
    }
  }
});

newGame();