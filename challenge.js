//20枚のカードを作成・表示

let cards = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,14,14,21,21,27,27];
let cardsLength = cards.length;



 
//シャッフルアルゴリズム 配列を入れ替える

for(let i=0; i <40 ;i++){
    let a = Math.floor(Math.random() * cardsLength);
    let b = Math.floor(Math.random() * cardsLength);

    let tmp = cards[a];
    cards[a] = cards[b];
    cards[b] = tmp;
}


let score = 0;
//現在のスコアの表示
function displayScore(){
    let nowScore = document.getElementById('display_score');
    nowScore.innerHTML = "Score : "+ score + "/ 10";
}

displayScore();



let fild = document.getElementById('field');
function displayCards(){
    //divの作成
    for(let i=0; i < cards.length ; i++){
        // div要素を生成
        let  div = document.createElement('div');
        // classを追加
        div.className = 'cards';
        fild.appendChild(div);
        div.innerHTML = " ";
        div.index = i ;
        div.onclick = click;
    
    }
    
}

displayCards();

//時間の経過の表示
let displayTime = document.getElementById('display_time');

let timercount = 1;
function timerCount(){
    
    console.log(timercount);
    if(timercount >= 1){
        displayTime.innerHTML = "Time : " +timercount+" / 60s";
        timercount++;
    }else{
        displayTime.innerHTML = '';
        timercount++;
    }
} 

//-------------------------   カードを再配置する処理をかく。    -----------------------//

let deleteElement = document.getElementsByClassName('cards');

function removeElm(){
    fild.innerHTML = ' ';
}




let first  = null ;
let second = null ;
let timer  = null ;



function click(e){
    
    if(startJudge == 0){
        return ;
    }else{
        if(timer){
            clearTimeout(timer);
            judge();
        }
        let elm = e.target;
        //クリックすると背景色を変える
        elm.style.backgroundColor = 'white';
        elm.innerHTML = cards[elm.index];
    
    
         //firstがnullならば、elmをセットする
        if(!first){
            first = elm;
        }else if(first.index == elm.index){
            return;
        }else{
            second = elm;
            timer = setTimeout(judge, 1000);
    
        }
    }


}


//スタートボタンを押す

let startbutton = document.getElementById('start_button');
let startJudge = 0; //スタートボタンを押したら1に切り替え
let settime ;

startbutton.onclick = function(){
    if(startJudge == 0){
        let cofirmstart = window.confirm('Are you ready for this ??');
        if(cofirmstart){
            startJudge = 1 ;
                settime = setInterval(function(){
                
                if(timercount > 60){
                    clearInterval(settime);
                    let result = window.alert("Time Up !! スコアは"+score+"点です");
                    //初期化
                    score = 0 ;
                    displayScore();
                    startJudge = 0 ;
                    timercount = 0;
                    timerCount();
                    removeElm();//フィールドをクリアする。
                    displayCards();//カードを生成する。
                    
                }else{
                    timerCount();
                    return;
                }
            },1000);
        }else{
            return;
        }

    }else{
        return;
    }
    

}


let countCards = 0 ;
//選択した時、中身の数字が一致しているかどうか
function judge(){
    if(first.innerHTML == second.innerHTML){　//カードがあっていたらカードを消す
        first.style.visibility = "hidden";
        second.style.visibility = "hidden";
        score++;
        displayScore();
        countCards += 2 ;
        if(countCards == cardsLength){
            clearInterval(settime);
           let finish =  window.alert("全て揃いました。終了です。タイムは"+timercount+"秒です");
            //初期化
            score = 0 ;
            displayScore();
            timercount = 0;
            timerCount();
            removeElm();//フィールドをクリアする。
            displayCards();//カードを生成する。

            startJudge = 0 ;


        }

    }else{ //間違っていたら元に戻す
        first.innerHTML = "";
        second.innerHTML = "";
        first.style.backgroundColor = 'rgb(81, 232, 252)';
        second.style.backgroundColor = 'rgb(81, 232, 252)';

    }
    first = null;
    second = null;
    timer = null ;
}



//Back to menu のボタンでメニューに戻る
let backToButton = document.getElementById('back_button');

backToButton.onclick = function(){
    window.location.href = 'index.html'; 
}




