var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const fs = require('fs');
var count = 0;


app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use('/public', express.static('public'));
//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
//设置各种路由
app.get('/',function(req,res,next){
    //res.sendFile("/public/index.html");
    res.redirect("/public/index.html");
    next();
})
app.get('/getfile',function(req,res,next){
    res.sendFile(__dirname+"/public/test.txt");
    next();
})
app.get('/getdata', function (req, res) {
    count++;
    res.send("hello,get请求.这段话是服务器第" + count + "次返回的数据");
});
app.get('/getjson', function (req, res) {
    
    res.send([{姓名:"小明",年龄:"18",年级:"大一"},{姓名:"小红",年龄:"18",年级:"大一"},{姓名:"小强",年龄:"18",年级:"大一"}]);
});
app.get('/reset', function (req, res) {
    count = 0;
    res.send("计数已重置");
});
app.post('/poststh', function (req, res) {
    data = JSON.stringify(req.body);
    fs.appendFile( __dirname + "/public/test.txt", '\n'+ data , "utf-8", function( err ){
        if( err ){
            console.log( "文件写入失败" );
            res.send('post过程出错');
        }else {
            console.log( "文件写入成功，已保存" );
            res.send('post提交数据成功');
        }
    } );
});
// 创建服务器
var server = app.listen(8083, function () {
    var port = server.address().port;
    console.log("访问地址为 http://localhost:%s", port);

});


