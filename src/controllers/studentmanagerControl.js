const xtpl = require("xtpl");
const path = require("path");
const databasetool=require(path.join(__dirname,'../tools/databasetool.js'))

//处理程序
exports.getStudentListPage = (req, res) => {
  const keyword = req.query.keyword || "";
  //查询数据库,查所有的
  databasetool.findList('studentInfo',{name:{$regex:keyword}},(err,docs)=>{
    xtpl.renderFile(path.join(__dirname,'../views/list.html'),{studentList:docs,keyword,loginedName:req.session.loginedName},(err,content)=>{
      res.send(content)
    })
  })
};

//获取新增页面
exports.getAddStudentPage = (req, res) => {
  //查询数据库,查所有的
    xtpl.renderFile(path.join(__dirname,'../views/add.html'),{loginedName:req.session.loginedName},(err,content)=>{
      res.send(content)
    })
};

//新增学生
exports.addStudent = (req, res) => {
   //新增学生
   databasetool.insertOne('studentInfo',req.body,(err,result)=>{
     console.log(req.body)
     //如果为空说明没有新增成功
      if(result==null){ 
        res.send('<script>alert("新增失败")</script>')
      }else{
        res.send('<script>location.href = "/studentmanager/list"</script>')
      }
  })
};
// 获取修改学生页面
exports.getEditStudentPage = (req, res) => {
  const _id=databasetool.ObjectId(req.params.studentId)
  //获取编辑页面
  databasetool.findOne('studentInfo',{_id},(err,doc)=>{
    xtpl.renderFile(path.join(__dirname,'../views/edit.html'),{studentInfo:doc,loginedName:req.session.loginedName},(err,content)=>{
      res.send(content)
    })
 })
};
//修改信息
exports.editStudent = (req, res) => {
  const _id=databasetool.ObjectId(req.params.studentId)
  //获取编辑页面
  databasetool.updateOne('studentInfo',{_id},req.body,(err,result)=>{
    console.log(req.body)
  //如果为空说明没有新增成功
  if(result==null){ 
    res.send('<script>alert("修改失败")</script>')
  }else{
    res.send('<script>location.href = "/studentmanager/list"</script>')
  }
 })
};
//删除学生
exports.deleteStudent = (req, res) => {
      //获取传递过来的参数
      const _id = databasetool.ObjectId(req.params.studentId)
  //新增学生
  databasetool.deleteOne('studentInfo',{_id},(err,result)=>{
    console.log(req.body)
    //如果为空说明没有新增成功
     if(result==null){ 
       res.send('<script>alert("删除失败")</script>')
     }else{
       res.send('<script>location.href = "/studentmanager/list"</script>')
     }
 })
};