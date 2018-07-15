//链接数据库
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require('mongodb').ObjectId
exports.ObjectId = ObjectId

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "database";

//抽取方法获取集合
const getCollection=(collectionName,callback)=>{
    MongoClient.connect(url,{useNewUrlParser:true},function(err,client){
        const db=client.db(dbName)
        //获取集合,进行操作
        const collection=db.collection(collectionName)
        //通过回调
        callback(client,collection)
    })
}

//查找多条
exports.findList=(collectionName,params,callback)=>{
    //1.获取到要操作的集合
    getCollection(collectionName,(client,collection)=>{
        //2.修改
        collection.find(params).toArray((err,docs)=>{
            client.close()
            //3.通过回调，将修改之后的结果返回给控制器
            callback(err,docs)
        })
    })
}

//查找一条
exports.findOne=(collectionName,params,callback)=>{
    //1.获取到要操作的集合
    getCollection(collectionName,(client,collection)=>{
        //2.修改
        collection.findOne(params,(err,doc)=>{
            client.close()
            //3.通过回调，将修改之后的结果返回给控制器
            callback(err,doc)
        })
    })
}

//删除一条
exports.deleteOne=(collectionName,params,callback)=>{
    //1.获取到要操作的集合
    getCollection(collectionName,(client,collection)=>{
        //2.修改
        collection.deleteOne(params,(err,doc)=>{
            client.close()
            //3.通过回调，将修改之后的结果返回给控制器
            callback(err,doc)
        })
    })
}

//修改一条
exports.updateOne=(collectionName,condition,params,callback)=>{
    //1.获取到要操作的集合
    getCollection(collectionName,(client,collection)=>{
        //2.修改
        collection.updateOne(condition,{$set:params},(err,result)=>{
            client.close()
            //3.通过回调，将修改之后的结果返回给控制器
            callback(err,result)
        })
    })
}

//插入一条
exports.insertOne=(collectionName,params,callback)=>{
    //1.获取到要操作的集合
    getCollection(collectionName,(client,collection)=>{
        //2.修改
        collection.insertOne(params,(err,result)=>{
            client.close()
            //3.通过回调，将修改之后的结果返回给控制器
            callback(err,result)
        })
    })
}

