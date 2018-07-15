//引入路径
const path = require("path");
//导入生成验证码的第三方包
const captchapng = require("captchapng");
//在这里要先链接数据库mongodb
const MongoClient = require("mongodb").MongoClient;

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "database";
// const databasemanager=require(path.join(__dirname,'../tools/'))
//获取登录页面
exports.getLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
};
//暴露获取验证码的方法
exports.getVcodeImage = (req, res) => {
  //1.利用一个第三方的包生成
  const random=parseInt(Math.random()*9000+1000)
  //2.存起来?，存储到session中去了
   req.session.vcode = random
   var p = new captchapng(80, 30, random); // width,height,numeric captcha
   p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
   p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
 
   var img = p.getBase64();
   var imgbase64 = new Buffer(img, "base64");
   res.writeHead(200, {
     "Content-Type": "image/png"
   });
   
 
   //3.返回，并且告知是一张图片
   res.end(imgbase64);
  
};
//暴露注册获取页面的方法
exports.getRegisterPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/register.html"));
};

//暴露注册的页面方法

exports.register = (req, res) => {
  //先定义一个返回的信息
  const result = { status: 0, message: "注册成功" };
  //es6解构,可直接获取值

  const  {username} = req.body;

  //判断用户名是否存在
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      const db = client.db(dbName);
      //获取数据库的信息
      const collection = db.collection("accountInfo");
      collection.findOne({ username }, (err, doc) => {
        //如果返回不等于NUll 说明
        if (doc != null) {
          result.status = 1;
          result.message = "用户名已存在";
          client.close();
          res.json(result);
        } else {
          //不存在,那么就插入一行
          collection.insertOne(req.body, (err, result1) => {
            if (result1 == null) {
              result.status = 2;
              result.message = "注册失败";
            }
            client.close();
            res.json(result);
          });
        }
      });
    }
  );
};

//暴露一个登录验证的方法
exports.login=(req,res)=>{
    const  result= {status:0,message:'登录成功'}
    //获取请求体中的内容
    const {username,passsword,vcode}=req.body
    console.log(req.body)
    //验证验证码
    if(vcode!=req.session.vcode){
        result.status=1
        result.message='验证码错误'
        res.json(result)
        return 
    }
    // 验证用户名和密码
    //要去数据库里查,那么就要先链接数据库
    MongoClient.connect(
        url,
        { useNewUrlParser: true },
        function(err, client) {
          const db = client.db(dbName);
          //获取数据库的信息
          const collection = db.collection("accountInfo");
          collection.findOne({username,passsword}, (err, doc) => {
            //如果返回等于NUll 说明没有查到,说明登录失败
            if (doc == null) {
              result.status = 2;
              result.message = "用户名或密码错误";
            } 
            client.close();
            res.json(result);
          });
        }
      );
}
