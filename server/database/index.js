const orm = require("orm");
const config = require("./config");
const GUID = require("./guid");

class database {

    static connect(define, callback){  //连接数据库

        orm.connect( config, (err, db) => {

            if (err) throw err; //抛出异常

            if(Array.isArray(define)){ //如果是多个对象定义，则循环操作
                define = define.map( func => {
                    return func(db);
                });
            }else if(typeof define == 'function'){
                define = define(db);
            }

            //同步数据库
            db.sync( err =>{

                if (err) throw err; //抛出异常

                callback(define, db); //回调函数,关闭数据库

            });
        });
    }

    static guid(){
        return GUID.new();
    }

}

module.exports = database;