const JSON_FILE = './data/scores.json';

// import underscore Library
const _ = require("underscore");
const fs = require('fs');
const express = require('express');


const app = express();
app.use(express.json());
// 下边的error，解决的办法是添加：Access-Control-Allow-Methods
// Method PATCH is not allowed by Access-Control-Allow-Methods.
app.use((req, res, next)=> {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
    next();
  });

// add listener  
app.listen('3300', ()=>{
    console.log('Listen on Port 3300.......');
})

// get json data from json file
// fs.readFileSync: 直到文件读取完毕，否则一直停在这里，这是一个同步处理
// let scores = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));
let rawData = fs.readFileSync(require.resolve(JSON_FILE), 'utf8');
console.log('>>>>>>>raudata',rawData);
let scores;
if(rawData != null && rawData != undefined){
    scores = JSON.parse(rawData);
}
console.log(scores);

// GET
app.get('/scores', (req, res)=>{
    // console.log(req);
    // console.log(scores);
    res.send(scores);
})


// 保存新数据request 服务器端处理
// 从客户端获取的req(request)中包含了各种可能数据：比如req.body,req,query
app.post('/scores', (req, res)=>{
    console.log(req.body);
    //把request 传来的新内容添加到json文件中
    scores.push(req.body);

    // 玩家点数倒叙排列
    scores = _.sortBy(scores, function(element){
        return -element.score;
    })

    //将所有的电影数据写入json文件
    fs.writeFileSync(JSON_FILE, JSON.stringify(scores));

    // 返回全部电影数据
    res.send(scores);
})

// 更新request 服务器端处理
// 从客户端获取的req(request)中包含了各种可能数据：比如req.body,req,query
app.patch('/scores', (req, res)=>{
    console.log("req.body>>>>>", req.body);
    // 玩家点数以req.body方式传入
    const newScore = req.body.score;
    if(newScore == undefined || newScore == null){
        return;
    }

    // 玩家名以req.query传入，将JOSON中同名的玩家点数更新
    const queries = req.query;
    console.log("queries>>>>>", queries, "queries.name>>>>>", queries.name);

    if(queries.name != undefined){
        for(const element of scores) {
            // console.log(element);
            if(element.name.toLowerCase() == queries.name.toLowerCase()) {
                console.log('before update, score= ', element.score, 'new score = ', newScore);
                element.score = (element.score>=newScore)?element.score:newScore;
                console.log('after update, score= ', element.score);
            }
        }
    } else {
        console.log('PlayerName does not match.');
    }
    
    // 玩家点数倒叙排列
    scores = _.sortBy(scores, function(element){
        return -element.score;
    })

    //写入json文件
    fs.writeFileSync(JSON_FILE, JSON.stringify(scores));
    // 结果返回客户端respose
    res.send(scores);
})



// [
//     {
//         "name": "Ola",
//         "score": 15
//     },
//     {
//         "name": "Li Li",
//         "score": 5
//     },
//     {
//         "name": "Marta",
//         "score": 3
//     }
// ]