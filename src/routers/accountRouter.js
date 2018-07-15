//导入express
const express=require('express')
//下面导入路径使用模块
const path=require('path')
//创建路由对象
const accountRouter=express.Router()
//路由
const accountCtrl=require(path.join(__dirname,'../controllers/accountCtrols.js'))

//获取登录页面的处理
accountRouter.get('/login',accountCtrl.getLoginPage)
//获取验证码图片的逻辑
accountRouter.get('/vcode',accountCtrl.getVcodeImage)

//处理注册的逻辑
accountRouter.get('/register',accountCtrl.getRegisterPage)

//处理注册请求
accountRouter.post('/register',accountCtrl.register)

//处理登录请求
accountRouter.post('/login',accountCtrl.login)
//暴露路由模块
module.exports=accountRouter
