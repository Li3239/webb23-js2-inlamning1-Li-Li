import { getData, postData, patchData } from "./module/dataAccess.js";
import { displayScores, LOCALSTORAGE_PLAYER_NAME, LOCALSTORAGE_PLAYER_SCORE } from "./module/display.js";

const CHECK_ERR = -1;
const WIN_DRAW = 0;
const WIN_PLAYER = 1;
const WIN_COMPUTER = 2;
const GAME_ROCK = 'rock';
const GAME_PAPER = 'paper';
const GAME_SCISSORS = 'scissors';

const playImgList = ["./image/rock.png", "./image/paper.png", "./image/scissors.png"];
// const gameItems = ["rock", "paper", "scissors"];
const gameItems = [`${GAME_ROCK}`, `${GAME_PAPER}`, `${GAME_SCISSORS}`];
const winImg = "./image/trophy.png";
const lostImg = "./image/lost.png";

//*************************
// variable difinition
//*************************
let scorePlayer = 0;
let scoreComputer = 0;
const roundsNumber = 3;
// 玩家点数数组
let scoresArr = [];

//*************************
// global DOM variable
//*************************
// player buttons 
let playerButtons = document.querySelectorAll(".player-button1");
// 玩家
let inputPlayer = document.querySelector(".input-name");
// score
let scoreTitle = document.querySelector(".title-score");
// let score2 = document.getElementById("score2");
// player img
let player1Img = document.querySelector(".player1-img");
let player2Img = document.querySelector(".player2-img");
// winner show 
let winnerDiv = document.querySelector(".winner-show");
let winnerName = document.querySelector(".result-info");
let winnerImg = document.querySelector(".result-img");
//-----------------------------
// 获取玩家成绩，并且在列表中显示
//-----------------------------
getData().then(displayScores);
remainInputValue();

//-----------------------------
// 玩家名输入完成，focus移出后执行
//-----------------------------
// const displayPlayer = document.getElementById('display-player');
inputPlayer.addEventListener('focusout', event=>{
    event.preventDefault();
    getData().then(displayScores);
})

//-----------------------------
// CLEAR 按键按下
//-----------------------------
const btnClear = document.querySelector('.clear-button');
btnClear.addEventListener('click', event=>{
    event.preventDefault();

    //localstorage clear
    localStorage.setItem(LOCALSTORAGE_PLAYER_NAME, '');
    localStorage.setItem(LOCALSTORAGE_PLAYER_SCORE, 0);
    // HTML值设定
    inputPlayer.value = '';
    scoreTitle.innerText = 0;
})

//-----------------------------
// 玩家游戏模块内click事件监听
//  -->判明哪个子元素被按下
//-----------------------------
// btn-rock
// btn-paper
// btn-scissors
const playerDiv = document.querySelector('.container-play');
playerDiv.addEventListener('click', startGame);

//*******************************************************
// play buttons is clicked 
//*******************************************************
function startGame(event) {
    event.preventDefault();

    if(event.target.tagName !== "BUTTON") {
        return;
    } else if(String(inputPlayer.value).length == 0) {
        alert("Please input your name.");
        inputPlayer.focus();
        return;
    } else {
        // 当前按键状态变更
        changeButtonStyle(event);

        //eg. button id="btn-rock" -> return "rock"
        const player1 = String(event.target.id).substring(4);
        player1Img.src = playImgList[gameItems.indexOf(player1)];
        player1Img.style.display = "flex";

        //get random value for computer
        let random = Math.floor(Math.random()*3);
        const player2 = gameItems[random];
        //show the player2 random img
        player2Img.src = playImgList[random];
        player2Img.style.display = "flex";
        
        //check who wins
        let result = checkResult(player1, player2);
        
        //set the result in the score list
        setResult(result);
    }
}

//*******************************************************
// when player1 button is clicked, 
// switch "active" class available/inavailable
// "active" : set in css file
//*******************************************************
function changeButtonStyle(event) {
    if(event.target.classList.contains("player-button1")){
        // 一组三个按键（包子剪子锤子）被按下状态全部清除
        for(let i=0; i<playerButtons.length; i++) {
            playerButtons[i].classList.remove("active");
        }
        // 被按下的按键，重新设定为被按下状态
        event.target.classList.add("active");
    }
}

//*******************************************************
// check rock-paper-scissors
// @param: item1: player
// @param: item2: computer
// return: WIN_PLAYER:   player   win
//         WIN_COMPUTER: computer win
//         WIN_DRAW:     same
//         CHECK_ERR:    check error
//*******************************************************
function checkResult(item1, item2) {

    let ret = WIN_DRAW;
    if(gameItems.indexOf(item1) == -1 || gameItems.indexOf(item2) == -1) {
        return CHECK_ERR;
    }

    if(item1 == GAME_ROCK) {
        if(item2 == GAME_PAPER) {
            ret = WIN_COMPUTER;
            scoreComputer += 1;
        } else if(item2 == GAME_SCISSORS) {
            ret = WIN_PLAYER;
            scorePlayer += 1;
        } 
    }else if(item1 == GAME_PAPER) {
        if(item2 == GAME_ROCK) {
            ret = WIN_PLAYER;
            scorePlayer += 1;
        } else if(item2 == GAME_SCISSORS) {
            ret = WIN_COMPUTER;
            scoreComputer += 1;
        } 
    }else if(item1 == GAME_SCISSORS) {
        if(item2 == GAME_ROCK) {
            ret = WIN_COMPUTER;
            scoreComputer += 1;
        } else if(item2 == GAME_PAPER) {
            ret = WIN_PLAYER;
            scorePlayer += 1;
        } 
    }
    return ret;
}

//*******************************************************
// Display match results in a table
//*******************************************************
function setResult(result) {
    // 玩家已有点数的情况下计算机胜出时，向server发送请求，更新json文件,游戏结束
    if(result == WIN_COMPUTER){    
        if(scorePlayer != 0){
            // 玩家获得点数，显示点数
            winnerName.innerText = `Congratuation ${inputPlayer.value}, you get ${scorePlayer} point!`
            winnerImg.src = winImg;
            winnerName.style.color = "orange";
            // 更新JSON
            getData().then(updateJSON);

        } else {
            // 玩家未获得点数，挑战失败
            winnerName.innerText = `Game over!`
            winnerImg.src = lostImg;
            winnerName.style.color = "black";
        }

        // 玩家的点数显示于悬浮在画面正中的div中 display 从【none】变更为【flex】
        winnerDiv.style.display = "flex";
        // 显示三秒
        setTimeout(resetGame, 3000);
        // Disable the playing buttons
        for(let i=0; i<playerButtons.length; i++) {
            playerButtons[i].disabled = true;
        }
    }
}

//*******************************************************
// Restart game
//*******************************************************
function resetGame() {
    // clear counters
    scorePlayer = 0;
    scoreComputer = 0;

    // clear [active] class from player1 play buttons
    for(let i=0; i<playerButtons.length; i++) {
        // 清除按键被按下状态 -> 按键为非按下状态
        playerButtons[i].classList.remove("active");
        // 按键取消禁用
        playerButtons[i].disabled = false;
    }

    // hide player images
    player1Img.style.display = "none";
    player2Img.style.display = "none";

    // hide result image 
    winnerDiv.style.display = "none";
}

//=================================================
// 根据当前玩家的既存点数选择插入一条新数据or更新数据
// 当前玩家数据存在于JSON中：  更新，PATCH request
// 当前玩家数据不存在于JSON中：插入新数据，POST request
//=================================================
function updateJSON(data){
    let hasScore = false;
    // 查询当前玩家是否有既存点数
    for(const element of data){
        // console.log('element :', element);
        if(element.name.toLowerCase() == inputPlayer.value.toLowerCase()) {
            // 更新json文件
            hasScore = true;
        }
    }
    
    // update obj
    const playerObj = {
        'name':  `${inputPlayer.value}`,
        'score': scorePlayer,
    }

    if(hasScore){
        // PATCH
        patchData(playerObj).then(displayScores);
    } else {
        // POST
        postData(playerObj).then(displayScores);
    }
}

//=================================================
// POST，PATCH后画面会被刷新，为了保存玩家输入的姓名，
// 以及获得的既存点数，从
//=================================================
function remainInputValue(){
    // palyer name
    inputPlayer.value = localStorage.getItem(LOCALSTORAGE_PLAYER_NAME);
    // player score
    scoreTitle.innerText = localStorage.getItem(LOCALSTORAGE_PLAYER_SCORE);
}