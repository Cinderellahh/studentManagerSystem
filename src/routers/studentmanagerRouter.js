const express=require('express')
const path=require('path')
//创建路由
const studentmanagerRouter=express.Router()
//导入控制器
const studentmanagerCtrl=require(path.join(__dirname,'../controllers/studentmanagerControl.js'))
//调用方法
//处理学生列表页面的请求
studentmanagerRouter.get('/list',studentmanagerCtrl.getStudentListPage)
//获取新增页面
studentmanagerRouter.get('/add',studentmanagerCtrl.getAddStudentPage)
//新增学生信息
studentmanagerRouter.post('/add',studentmanagerCtrl.addStudent)
//修改学生页面
studentmanagerRouter.get('/edit/:studentId',studentmanagerCtrl.getEditStudentPage)
//修改学生信息
studentmanagerRouter.post('/edit/:studentId',studentmanagerCtrl.editStudent)
//删除学生信息
studentmanagerRouter.get('/delete/:studentId',studentmanagerCtrl.deleteStudent)
//暴露外边
module.exports=studentmanagerRouter