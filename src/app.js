//导入
const express=require('express')
//使用path导入自己的中间件
const path=require('path')
//导入路由中间件
const bodyParser=require('body-Parser')

//下载并引入session
const session=require('express-session')
//创建app
const app=express()
//读取静态资源
app.use(express.static(path.join(__dirname,'statics')))

//导入解析post请求的中间件
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//导入session的中间件
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie:{maxAge:100*60000}
  }))
//使用路由中间件
const accountRouter=require(path.join(__dirname,'./routers/accountRouter.js'))
//使用学生系统的路由
const studentmanagerRouter=require(path.join(__dirname,'./routers/studentmanagerRouter.js'))

app.use('/account',accountRouter)
app.use('/studentmanager',studentmanagerRouter)
//监听
app.listen(3000,'127.0.0.1',err=>{
    if(err){
        console.log(err)
    }
    console.log('start ok')
})