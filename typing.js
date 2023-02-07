const whole_word = '挨,愛戴,愛國,愛滋病,安頓,安撫,安寧,安詳,安置,暗暗,案件,案情,按摩,昂貴,奧妙,懊惱,八卦,八字,把持,把手,白皮書,拜會,頒發,頒獎,辦案,半島,半導體,幫,綁,包袱,包圍,寶貝,寶石,飽和,飽滿,保安,保管,保齡球,保姆,保全,保險,保佑,保重,報案,報表,報酬,報復,報關,報價,報刊,報應,報章,暴雨,爆發,抱負,碑,悲哀,悲觀,貝殼,倍數,背誦,奔騰,本,本事,本位,本性,本質,崩潰,甭,敝,必,編輯,編寫,編織,編制,編製,邊界,邊緣,貶,貶值,匾額,辨認,辨識,辯,辯護,辯論,變革,變遷,變通,變形,標籤,標語,表白,表明,鼻孔,筆錄,筆友,比率,比擬,比喻,比重,必備,必定,必然,閉幕,閉塞,避難,避孕,畢生,幣值,憋,別,別墅,兵,賓館,柄,並列,並重,併發,病床,病菌,病患,波,波及,波浪,剝,剝削,搏鬥,播出,補給,補救,哺乳動物,不便,不得,不等,不動產,不法,不凡,不妨,不公,不及,不禁,不堪,不力,不料,不免,不容,不時,不惜,不下,不肖,不懈,不再,不致,不知不覺,不至於,部落,部署,步調,步驟,猜測,猜忌,猜想,裁縫,裁減,財團,財政,才智,採訪,採光,採納,採取,彩繪,餐具,參謀,殘暴,殘酷,殘殺,慘重,燦爛,蒼白,蒼蠅,操縱,草案,草叢,草率,草藥,測,策劃,差額,插曲,插嘴,茶具,察覺,查明,蟬,饞,潺潺,猖獗,長遠,場次,場面,倡導,唱腔,暢銷,產物,產值,超速,超脫,抄襲,吵嘴,車輛,車廂,撤回,撤銷,沉默,沉思,沉重,塵土,呈,乘,承包,承擔,承諾,成敗,成見,成就,成品,成全,成效,成衣,成員,成長,稱號,稱呼,撐腰,程式,呈獻,誠心,誠心誠意,誠摯,稱,吃驚,吃苦,吃力,持,持久,持平,池子,遲鈍,充斥,充裕,沖淡,沖天,衝動,衝擊,憧憬,重疊,崇尚,寵愛,寵物,抽查,抽空,抽象,抽樣,仇,仇恨,稠密,出超,出錯,出發點,出局,出力,出路,出馬,出賣,出面,出名,出品,出示,出手,出頭,出土,出息,出血,初期,儲備,除此之外,鋤頭,處,處方,處分,處境,處事,處於,處女,穿梭,傳,傳遞,傳奇' .split(',');
const words = 'ㄞ_,ㄞˋㄉㄞˋ,ㄞˋㄍㄨㄛˊ,ㄞˋㄗ_ㄅㄧㄥˋ,ㄢ_ㄉㄨㄣˋ,ㄢ_ㄈㄨˇ,ㄢ_ㄋㄧㄥˊ,ㄢ_ㄒㄧㄤˊ,ㄢ_ㄓˋ,ㄢˋㄢˋ,ㄢˋㄐㄧㄢˋ,ㄢˋㄑㄧㄥˊ,ㄢˋㄇㄛˊ,ㄤˊㄍㄨㄟˋ,ㄠˋㄇㄧㄠˋ,ㄠˋㄋㄠˇ,ㄅㄚ_ㄍㄨㄚˋ,ㄅㄚ_ㄗˋ,ㄅㄚˇㄔˊ,ㄅㄚˇㄕㄡˇ,ㄅㄞˊㄆㄧˊㄕㄨ_,ㄅㄞˋㄏㄨㄟˋ,ㄅㄢ_ㄈㄚ_,ㄅㄢ_ㄐㄧㄤˇ,ㄅㄢˋㄢˋ,ㄅㄢˋㄉㄠˇ,ㄅㄢˋㄉㄠˇ ㄊㄧˇ,ㄅㄤ_,ㄅㄤˇ,ㄅㄠ_ㄈㄨˊ,ㄅㄠ_ㄨㄟˊ,ㄅㄠˇㄅㄟˋ,ㄅㄠˇㄕˊ,ㄅㄠˇㄏㄜˊ,ㄅㄠˇㄇㄢˇ,ㄅㄠˇㄢ_,ㄅㄠˇㄍㄨㄢˇ,ㄅㄠˇㄌㄧㄥˊㄑㄧㄡˊ,ㄅㄠˇㄇㄨˇ,ㄅㄠˇㄑㄩㄢˊ,ㄅㄠˇㄒㄧㄢˇ,ㄅㄠˇㄧㄡˋ,ㄅㄠˇㄓㄨㄥˋ,ㄅㄠˋㄢˋ,ㄅㄠˋㄅㄧㄠˇ,ㄅㄠˋㄔㄡˊ,ㄅㄠˋㄈㄨˋ,ㄅㄠˋㄍㄨㄢ_,ㄅㄠˋㄐㄧㄚˋ,ㄅㄠˋㄎㄢ_,ㄅㄠˋㄧㄥ_,ㄅㄠˋㄓㄤ_,ㄅㄠˋㄩˇ,ㄅㄠˋㄈㄚ_,ㄅㄠˋㄈㄨˋ,ㄅㄟ_,ㄅㄟ_ㄞ_,ㄅㄟ_ㄍㄨㄢ_,ㄅㄟˋㄎㄜˊ,ㄅㄟˋㄕㄨˋ,ㄅㄟˋㄙㄨㄥˋ,ㄅㄣ_ㄊㄥˊ,ㄅㄣˇ,ㄅㄣˇㄕˋ,ㄅㄣˇㄨㄟˋ,ㄅㄣˇㄒㄧㄥˋ,ㄅㄣˇㄓˋ,ㄅㄥ_ㄎㄨㄟˋ,ㄅㄥˊ,ㄅㄧˋ,ㄅㄧˋ,ㄅㄧㄢ_ㄐㄧˊ,ㄅㄧㄢ_ㄒㄧㄝˇ,ㄅㄧㄢ_ㄓ_,ㄅㄧㄢ_ㄓˋ,ㄅㄧㄢ_ㄓˋ,ㄅㄧㄢ_ㄐㄧㄝˋ,ㄅㄧㄢ_ㄩㄢˊ,ㄅㄧㄢˇ,ㄅㄧㄢˇㄓˊ,ㄅㄧㄢˇㄜˊ,ㄅㄧㄢˋㄖㄣˋ,ㄅㄧㄢˋㄕˊ,ㄅㄧㄢˋ,ㄅㄧㄢˋㄏㄨˋ,ㄅㄧㄢˋㄌㄨㄣˋ,ㄅㄧㄢˋㄍㄜˊ,ㄅㄧㄢˋㄑㄧㄢ_,ㄅㄧㄢˋㄊㄨㄥ_,ㄅㄧㄢˋㄒㄧㄥˊ,ㄅㄧㄠ_ㄑㄧㄢ_,ㄅㄧㄠ_ㄩˇ,ㄅㄧㄠˇㄅㄞˊ,ㄅㄧㄠˇㄇㄧㄥˊ,ㄅㄧˊㄎㄨㄥˇ,ㄅㄧˇㄌㄨˋ,ㄅㄧˇㄧㄡˇ,ㄅㄧˇㄕㄨㄞˋ,ㄅㄧˇㄋㄧˇ,ㄅㄧˇㄩˋ,ㄅㄧˇㄓㄨㄥˋ,ㄅㄧˋㄅㄟˋ,ㄅㄧˋㄉㄧㄥˋ,ㄅㄧˋㄖㄢˊ,ㄅㄧˋㄇㄨˋ,ㄅㄧˋㄙㄞ_,ㄅㄧˋㄋㄢˊ,ㄅㄧˋㄩㄣˋ,ㄅㄧˋㄕㄥ_,ㄅㄧˋㄓˊ,ㄅㄧㄝ_,ㄅㄧㄝˊ,ㄅㄧㄝˊㄕㄨˋ,ㄅㄧㄥ_,ㄅㄧㄣ_ㄍㄨㄢˇ,ㄅㄧㄥˇ,ㄅㄧㄥˋㄌㄧㄝˋ,ㄅㄧㄥˋㄓㄨㄥˋ,ㄅㄧㄥˋㄈㄚ_,ㄅㄧㄥˋㄔㄨㄤˊ,ㄅㄧㄥˋㄐㄩㄣ_,ㄅㄧㄥˋㄏㄨㄢˋ,ㄅㄛ_,ㄅㄛ_ㄐㄧˊ,ㄅㄛ_ㄌㄤˋ,ㄅㄠ_,ㄅㄠ_ㄒㄧㄠ_,ㄅㄛˊㄉㄡˇ,ㄅㄛ_ㄔㄨ_,ㄅㄨˇㄍㄟˇ,ㄅㄨˇㄐㄧㄡˋ,ㄅㄨˇㄖㄨˇㄉㄨㄥˋㄨˋ,ㄅㄨˋㄅㄧㄢˋ,ㄅㄨˋㄉㄜˊ,ㄅㄨˋㄉㄥˇ,ㄅㄨˋㄉㄨㄥˋㄔㄢˇ,ㄅㄨˋㄈㄚˇ,ㄅㄨˋㄈㄢˊ,ㄅㄨˋㄈㄤˊ,ㄅㄨˋㄍㄨㄥ_,ㄅㄨˋㄐㄧˊ,ㄅㄨˋㄐㄧㄣ_,ㄅㄨˋㄎㄢ_,ㄅㄨˊㄌㄧˋ,ㄅㄨˊㄌㄧㄠˋ,ㄅㄨˋㄇㄧㄢˇ,ㄅㄨˋㄖㄨㄥˊ,ㄅㄨˋㄕˊ,ㄅㄨˋㄒㄧˊ,ㄅㄨˊㄒㄧㄚˋ,ㄅㄨˊㄒㄧㄠˋ,ㄅㄨˊㄒㄧㄝˋ,ㄅㄨˊㄗㄞˋ,ㄅㄨˊㄓˋ,ㄅㄨˋㄓ_ㄅㄨˋㄐㄩㄝˊ,ㄅㄨˊㄓˋㄩˊ,ㄅㄨˋㄌㄨㄛˋ,ㄅㄨˋㄕㄨˇ,ㄅㄨˋㄉㄧㄠˋ,ㄅㄨˋㄓㄡˋ,ㄘㄞ_ㄘㄜˋ,ㄘㄞ_ㄐㄧˋ,ㄘㄞ_ㄒㄧㄤˇ,ㄘㄞˊㄈㄥˊ,ㄘㄞˊㄐㄧㄢˇ,ㄘㄞˊㄊㄨㄢˊ,ㄘㄞˊㄓㄥˋ,ㄘㄞˊㄓˋ,ㄘㄞˇㄈㄤˇ,ㄘㄞˇㄍㄨㄤ_,ㄘㄞˇㄋㄚˋ,ㄘㄞˇㄑㄩˇ,ㄘㄞˇㄏㄨㄟˋ,ㄘㄢ_ㄐㄩˋ,ㄘㄢ_ㄇㄡˊ,ㄘㄢˊㄅㄠˋ,ㄘㄢˊㄎㄨˋ,ㄘㄢˊㄕㄚ_,ㄘㄢˇㄓㄨㄥˋ,ㄘㄢˋㄌㄢˋ,ㄘㄤ_ㄅㄞˊ,ㄘㄤ_ㄧㄥˊ,ㄘㄠ_ㄗㄨㄥˋ,ㄘㄠˇㄢˋ,ㄘㄠˇㄘㄨㄥˊ,ㄘㄠˇㄕㄨㄞˋ,ㄘㄠˇㄧㄠˋ,ㄘㄜˋ,ㄘㄜˋㄏㄨㄚˊ,ㄔㄚ_ㄜˊ,ㄔㄚ_ㄑㄩ_,ㄔㄚ_ㄗㄨㄟˇ,ㄔㄚˊㄐㄩˋ,ㄔㄚˊㄐㄩㄝˊ,ㄔㄚˊㄇㄧㄥˊ,ㄔㄢˊ,ㄔㄢˊ,ㄔㄢˊㄔㄢˊ,ㄔㄤ_ㄐㄩㄝˊ,ㄔㄤˊㄩㄢˇ,ㄔㄤˊㄘˋ,ㄔㄤˊㄇㄧㄢˋ,ㄔㄤˋㄉㄠˇ,ㄔㄤˋㄑㄧㄤ_,ㄔㄤˋㄒㄧㄠ_,ㄔㄢˇㄨˋ,ㄔㄢˇㄓˊ,ㄔㄠ_ㄙㄨˋ,ㄔㄠ_ㄊㄨㄛ_,ㄔㄠ_ㄒㄧˊ,ㄔㄠˇㄗㄨㄟˇ,ㄔㄜ_ㄌㄧㄤˋ,ㄔㄜ_ㄒㄧㄤ_,ㄔㄜˋㄏㄨㄟˊ,ㄔㄜˋㄒㄧㄠ_,ㄔㄣˊㄇㄛˋ,ㄔㄣˊㄙ,ㄔㄣˊㄓㄨㄥˋ,ㄔㄣˊㄊㄨˇ,ㄔㄥˊ,ㄔㄥˊ,ㄔㄥˊㄅㄠ_,ㄔㄥˊㄉㄢ_,ㄔㄥˊㄋㄨㄛˋ,ㄔㄥˊㄅㄞˋ,ㄔㄥˊㄐㄧㄢˋ,ㄔㄥˊㄐㄧㄡˋ,ㄔㄥˊㄆㄧㄣˇ,ㄔㄥˊㄑㄩㄢˊ,ㄔㄥˊㄒㄧㄠˋ,ㄔㄥˊㄧ_,ㄔㄥˊㄩㄢˊ,ㄔㄥˊㄓㄤˇ,ㄔㄥ_ㄏㄠˋ,ㄔㄥ_ㄏㄨ_,ㄔㄥ_ㄧㄠ_,ㄔㄥˊㄕˋ,ㄔㄥˊㄒㄧㄢˋ,ㄔㄥˊㄒㄧㄣ_,ㄔㄥˊㄒㄧㄣ_ㄔㄥˊㄧˋ,ㄔㄥˊㄓˋ,ㄔㄥ_,ㄔ_ㄐㄧㄥ_,ㄔ_ㄎㄨˇ,ㄔ_ㄌㄧˋ,ㄔˊ,ㄔˊㄐㄧㄡˇ,ㄔˊㄆㄧㄥˊ,ㄔˊㄗ˙,ㄔˊㄉㄨㄣˋ,ㄔㄨㄥ_ㄔˋ,ㄔㄨㄥ_ㄩˋ,ㄔㄨㄥ_ㄉㄢˋ,ㄔㄨㄥ_ㄊㄧㄢ_,ㄔㄨㄥ_ㄉㄨㄥˋ,ㄔㄨㄥ_ㄐㄧˊ,ㄔㄨㄥ_ㄐㄧㄥˇ,ㄔㄨㄥˊㄉㄧㄝˊ,ㄔㄨㄥˊㄕㄤˋ,ㄔㄨㄥˇㄞˋ,ㄔㄨㄥˇㄨˋ,ㄔㄡ_ㄔㄚˊ,ㄔㄡ_ㄎㄨㄥˋ,ㄔㄡ_ㄒㄧㄤˋ,ㄔㄡ_ㄧㄤˋ,ㄔㄡˊ,ㄔㄡˊㄏㄣˋ,ㄔㄡˊㄇㄧˋ,ㄔㄨ_ㄔㄠ_,ㄔㄨ_ㄘㄨㄛˋ,ㄔㄨ_ㄈㄚ_ㄉㄧㄢˇ,ㄔㄨ_ㄐㄩˊ,ㄔㄨ_ㄌㄧˋ,ㄔㄨ_ㄌㄨˋ,ㄔㄨ_ㄇㄚˇ,ㄔㄨ_ㄇㄞˋ,ㄔㄨ_ㄇㄧㄢˋ,ㄔㄨ_ㄇㄧㄥˊ,ㄔㄨ_ㄆㄧㄣˇ,ㄔㄨ_ㄕˋ,ㄔㄨ_ㄕㄡˇ,ㄔㄨ_ㄊㄡˊ,ㄔㄨ_ㄊㄨˇ,ㄔㄨ_ㄒㄧˊ,ㄔㄨ_ㄒㄧㄝˇ,ㄔㄨ_ㄑㄧˊ,ㄔㄨˊㄅㄟˋ,ㄔㄨˊㄘˇㄓ_ㄨㄞˋ,ㄔㄨˊㄊㄡˊ,ㄔㄨˇ,ㄔㄨˇㄈㄤ_,ㄔㄨˇㄈㄣˋ,ㄔㄨˇㄐㄧㄥˋ,ㄔㄨˇㄕˋ,ㄔㄨˇㄩˊ,ㄔㄨˋㄋㄩˇ,ㄔㄨㄢ_ㄙㄨㄛ_,ㄔㄨㄢˊ,ㄔㄨㄢˊㄉㄧˋ,ㄔㄨㄢˊㄑㄧˊ'.split(',');
const wordsCount = words.length;
const gameTime = 30 * 1000;
const alter_key = {'ㄅ':'1','ㄆ':'q','ㄇ':'a','ㄈ':'z','ㄉ':'2','ㄊ':'w','ㄋ':'s','ㄌ':'x','ˇ':'3','ㄍ':'e','ㄎ':'d','ㄏ':'c','ˋ':'4','ㄐ':'r','ㄑ':'f','ㄒ':'v','ㄓ':'5','ㄔ':'t','ㄕ':'g','ㄖ':'b','ˊ':'6','ㄗ':'y','ㄘ':'h','ㄙ':'n','˙':'7','ㄧ':'u','ㄨ':'j','ㄩ':'m','ㄚ':'8','ㄛ':'i','ㄜ':'k','ㄝ':',','ㄞ':'9','ㄟ':'o','ㄠ':'l','ㄡ':'.','ㄢ':'0','ㄣ':'p','ㄤ':';','ㄥ':'/','ㄦ':'-'}
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
      addClass(currentLetter, key === expected||key === alter_key[expected] ? 'correct' : 'incorrect');
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