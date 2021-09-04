let cards = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,14,14,21,21,27,27];
let cardsLength = cards.length;


console.log(cardsLength);
 
//シャッフルアルゴリズム 配列を入れ替える

for(let i=0; i <40 ;i++){
    let a = Math.floor(Math.random() * cardsLength);
    let b = Math.floor(Math.random() * cardsLength);

    let tmp = cards[a];
    cards[a] = cards[b];
    cards[b] = tmp;
}


//divを生成する(カードを生成する)

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




//ターンを作成
let Nowplayer = 0; //0ならばplayer1, 1ならばplayer2
let getPlayerId = document.getElementById('nowPlayer');
let startJudge = 0; //スタートボタンを押したら1に切り替え

function JudgeTurn(){
    if(startJudge == 0){
        getPlayerId.innerHTML = " ";
        return;
    }else{
        if(Nowplayer == 0){
            getPlayerId.innerHTML = "Player1";
            Nowplayer = 1;
        }else{
            getPlayerId.innerHTML = "Player2";
            Nowplayer = 0;
        }
    
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
        return;
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



startbutton.onclick = function(){
    if(startJudge == 0){
        let cofirmstart = window.confirm('Are you ready for this ??');
        if(cofirmstart){
            startJudge = 1 ;
            JudgeTurn();
            removeElm();//フィールドをクリアする。
            displayCards();//カードを生成する。
        }else{
            return;
        }
    }
}

//player1,player2のスコアカウント

let player1Count = document.getElementById('player1_score');
let player2Count = document.getElementById('player2_score');
let score1 = 0 ;
let score2 = 0 ;

function displayScore(){

    player1Count.innerHTML = "player1 : " + score1;
    player2Count.innerHTML = "player2 : " + score2;

}

displayScore();



function judewinner(){
    if(score1>score2){
        window.alert("The winner is player1");
    }else if(score1==score2){
        window.alert("It's a draw");

    }else{
        window.alert("The winner is player2");
    }
}
let countCards = 0 ;
//選択した時、中身の数字が一致しているかどうか
function judge(){
    if(first.innerHTML == second.innerHTML){　//カードがあっていたらカードを消す
        first.style.visibility = "hidden";
        second.style.visibility = "hidden";
        
        JudgeTurn();
        if(Nowplayer == 0){
            score1++;
            displayScore();
            console.log(score1);
            
            

        }else{
            score2++;
            displayScore();
            console.log(score2);
            
        }
        
        countCards += 2;

        if(countCards == cardsLength){ //カードが全て揃ったとき
            
            judewinner();
            

            //初期化
            score1 = 0;
            score2 = 0;
            displayScore();
            Nowplayer = 0 ;
            removeElm();//フィールドをクリアする。
            displayCards();//カードを生成する。
            startJudge = 0 ;
            JudgeTurn();

        }
        


    }else{ //間違っていたら元に戻す
        first.innerHTML = "";
        second.innerHTML = "";
        first.style.backgroundColor = 'rgb(81, 232, 252)';
        second.style.backgroundColor = 'rgb(81, 232, 252)';
        JudgeTurn();

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



