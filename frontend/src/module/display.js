const DISPLAY_DATA_NUMBER = 5;

//=======================================================
// param: data
//   1，遍历data，获取当前玩家的既存点数，并且保存于localstorage中
//   2，将data数据的前五名最高点数玩家显示在HTML的列表中
//=======================================================
function displayScores(data) {
    const table = document.querySelector('table');
    table.innerHTML = '';
    // add default data into TABLE
    showDefaultList(table);

    if(data.length != 0){
        
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
            }
        }

        //===============================
        // 显示前五名玩家的点数一览
        //===============================
        // 获取前五条数据
        const subData = data.slice(0, DISPLAY_DATA_NUMBER);
        for(const index in subData){
            // const trData = document.getElementById(index);
            const tdName = document.getElementById('name' + String(index));
            if(index == 0){
                // 第一名添加皇冠👑
                tdName.innerText = subData[index].name;
                const iconHTML = '<i class="fa-solid fa-crown" style="color: #fffb00"></i>';
                tdName.innerHTML = iconHTML + '  ' + tdName.innerHTML;
            } else {
                tdName.innerText = subData[index].name;
            }
            const tdScore = document.getElementById('score' + String(index));
            tdScore.innerText = subData[index].score;
            // trData.append(tdName, tdScore);
        }
        // for(const index in subData){
        //     const trData = document.createElement('tr');
        //     table.append(trData);
        //     const tdName = document.createElement('td');
        //     if(index == 0){
        //         // 第一名添加皇冠👑
        //         tdName.innerText = subData[index].name;
        //         const iconHTML = '<i class="fa-solid fa-crown" style="color: #fffb00"></i>';
        //         tdName.innerHTML = iconHTML + '  ' + tdName.innerHTML;
        //     } else {
        //         tdName.innerText = subData[index].name;
        //     }
        //     const tdScore = document.createElement('td');
        //     tdScore.innerText = subData[index].score;
        //     trData.append(tdName, tdScore);
        // }
    }
}

// add 5 lines into TABLE
function showDefaultList(table){
    // 表格头
    const trHead = document.createElement('tr');
    table.append(trHead);
    const thName = document.createElement('th');
    thName.innerText = 'Player Name';
    const thScore = document.createElement('th');
    thScore.innerText = 'Player Score';
    trHead.append(thName, thScore);

    for(let i=0; i<DISPLAY_DATA_NUMBER; i++){
        const trData = document.createElement('tr');
        table.append(trData);

        const tdName = document.createElement('td');
        tdName.id = 'name' + String(i);
        tdName.innerText = 'Player';
        
        const tdScore = document.createElement('td');
        tdScore.id = 'score' + String(i);
        tdScore.innerText = 0;

        trData.append(tdName, tdScore);
    }
}

export { displayScores };