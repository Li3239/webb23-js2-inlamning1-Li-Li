// let scoresData = {};
const DISPLAY_DATA_NUMBER = 5;
// localstorage 常量定义
const LOCALSTORAGE_PLAYER_NAME = 'inputPlayerName';
const LOCALSTORAGE_PLAYER_SCORE = 'playerHighestScore';

//=======================================================
// param: data
//   1，遍历data，获取当前玩家的既存点数，并且保存于localstorage中
//   2，将data数据的前五名最高点数玩家显示在HTML的列表中
//=======================================================
function displayScores(data) {
    const table = document.querySelector('table');
    table.innerHTML = '';

    if(data.length != 0){
        // 表格头
        const trHead = document.createElement('tr');
        table.append(trHead);
        const thName = document.createElement('th');
        thName.innerText = 'Player Name';
        const thScore = document.createElement('th');
        thScore.innerText = 'Player Score';
        trHead.append(thName, thScore);
        
        //===============================
        // 查询当前玩家的既存点数是否存在
        //===============================
        // 当前玩家姓名，既存点数html元素
        const inputPlayer = document.querySelector(".input-name");
        const scoreTitle = document.querySelector(".title-score");
        scoreTitle.innerText = 0;
        for(const index in data){
            // 查找当前玩家是否有既存点数,如果存在将点数显示于画面右上角
            if(data[index].name.toLowerCase() == inputPlayer.value.toLowerCase()){
                scoreTitle.innerText = data[index].score;

                // 保存入力内容到本地
                // window.onload = function() {
                    localStorage.setItem(LOCALSTORAGE_PLAYER_NAME, inputPlayer.value);
                    localStorage.setItem(LOCALSTORAGE_PLAYER_SCORE, data[index].score);
                // }
                // console.log('======================');
                // console.log('[in displayScores]  inputPlayer.value = ', inputPlayer.value, 'scoreTitle.innerText = ', data[index].score);
                // console.log('[in displayScores]  localStorage.getItem[name] = ', localStorage.getItem(LOCALSTORAGE_PLAYER_NAME), ' localStorage.getItem[store] = ', localStorage.getItem(LOCALSTORAGE_PLAYER_SCORE));
                // console.log('======================');
            }
        }

        
        //===============================
        // 显示前五名玩家的点数一览
        //===============================
        // 获取前五条数据
        const subData = data.slice(0, DISPLAY_DATA_NUMBER);
        for(const index in subData){
            const trData = document.createElement('tr');
            table.append(trData);
            const tdName = document.createElement('td');
            if(index == 0){
                // 第一名添加皇冠👑
                tdName.innerText = subData[index].name;
                const iconHTML = '<i class="fa-solid fa-crown" style="color: #fffb00"></i>';
                tdName.innerHTML = iconHTML + '  ' + tdName.innerHTML;
            } else {
                tdName.innerText = subData[index].name;
            }
            const tdScore = document.createElement('td');
            tdScore.innerText = subData[index].score;
            trData.append(tdName, tdScore);
        }
    }
}

function displayScoreForCurrentPlayer(){

}

export { displayScores, LOCALSTORAGE_PLAYER_NAME, LOCALSTORAGE_PLAYER_SCORE };