const administratorDefine = require("./model/administrator");
const departmentDefine = require("./model/department");
const materialDefine = require("./model/material");
const applySheetDefine = require("./model/applysheet");
const recordSheetDefine = require("./model/recordsheet");
const connect = require("./database").connect;
const guid = require("./database").guid;

/** 路由 */
let routes = {

    //默认重跳转到index.html
    "/" : (req, res) => {
        res.writeHead(302, {'Location': '/index.html'});
        res.end();
    },

    //用户登录
    "/login" : (req, res) => {
        let data = req.body;
        let define = data.type == "部门" ? departmentDefine : administratorDefine;
        connect(define, User => {
            User.one({ name: data.username }, (err, user) => {
                if (err) throw err;
                if(user) {
                    if(user.isRight(data.username, data.password)){
                        toJson(res,{
                            status : true,
                            success : "登录成功，欢迎" + user.name + "使用"
                        })
                    }else{
                        toJson(res,{
                            status : false,
                            error : "密码不正确"
                        })
                    }
                }else {
                    toJson(res,{
                        status : false,
                        error : "用户不存在"
                    })
                }
            });
        });
    },

    //获取所有物资信息
    "/getMaterials" : (req, res) => {
        connect(materialDefine, Material => {
            Material.find({}, (err, materials) => {
                if (err) throw err;
                toJson(res,{
                    status : true,
                    success : materials
                })
            });
        });
    },

    //获取单件
    "/getMaterial" : (req, res) => {
        let id = req.query.id;
        connect(materialDefine, Material => {
            Material.one({id : id}, (err, material) => {
                if (err) throw err;
                toJson(res,{
                    status : true,
                    success : material
                })
            });
        });
    },

    //提交申请表单
    "/sendForm" : (req, res) => {
        let data = req.body;
        data.article = JSON.parse(data.article);
        connect([applySheetDefine, recordSheetDefine], ([ApplySheet, RecordSheet]) => {
            ApplySheet.create({ //添加申请记录
                id           : guid(),
                ap_activity  : data.activity,
                ap_approver  : data.approver,
                ap_clazz     : data.clazz,
                ap_phone     : data.phone,
                ap_lend      : data.lend,
                ap_return    : data.return,
                ap_create    : new Date(),
                ap_status    : "待审批"
            }, (err, applySheet) => {
                if (err) throw err;
                let rs = data.article.map(item => { //整理成对象数组
                    return {
                        id        : guid(),
                        m_id      : item.m_id,
                        ap_id     : applySheet.id,
                        r_count   : item.count,
                        r_remark  : item.remark
                    };
                });
                RecordSheet.create(rs, (err, recordSheets) => { //批量添加
                    if (err) throw err;
                    toJson(res,{
                        status : true,
                        success : applySheet
                    });
                });
            });
        });
    },

    //获取所有申请表
    "/getAllApply" : (req, res) => {
        connect(applySheetDefine, ApplySheet => {
            ApplySheet.find({}, (err, applySheets) => {
                if (err) throw err;
                applySheets.forEach(item => {
                    item.updateStatus();
                    item.formatAllDate();
                });
                toJson(res,{
                    status : true,
                    success : applySheets
                })
            });
        });
    },

    //获取申请表及借用物资记录
    "/getRecordById" : (req, res) => {
        let id = req.query.id;
        connect(applySheetDefine, (ApplySheet, db) => {
            ApplySheet.one({id : id}, (err, applySheet) => {
                if (err) throw err;
                if(applySheet){
                    applySheet.updateStatus();
                    applySheet.formatAllDate();
                    db.driver.execQuery(
                        `SELECT
                            material_sheet.m_name,
                            material_sheet.m_amount,
                            material_sheet.m_unit,
                            record_sheet.id,
                            record_sheet.m_id,
                            record_sheet.ap_id,
                            record_sheet.r_count,
                            record_sheet.r_remark
                        FROM
                            record_sheet
                        INNER JOIN material_sheet ON material_sheet.id = record_sheet.m_id
                        WHERE
                            record_sheet.ap_id = ?
                        `,
                        [applySheet.id],
                        (err, data) => {
                            applySheet.article = data;
                            toJson(res,{
                                status : true,
                                success : applySheet
                            })
                        }
                    )
                }else{
                    toJson(res,{
                        status : false,
                        error : "记录不存在"
                    })
                }
            });
        });
    },

    //操作：通过
    "/ctrl/success" : (req, res) => {
        let id = req.body.id;
        if(!id) toJson(res,{
            status : false,
            error : "id不能为空"
        });
        connect(applySheetDefine, ApplySheet => {
            ApplySheet.one({id : id}, (err, applySheet) => {
                applySheet.ap_status = "未借出";
                applySheet.save();
                toJson(res,{
                    status : true,
                    success : applySheet
                });
            });
        });
    },

    //操作：不通过
    "/ctrl/failed" : (req, res) => {
        let id = req.body.id;
        if(!id) toJson(res,{
            status : false,
            error : "id不能为空"
        });
        connect(applySheetDefine, ApplySheet => {
            ApplySheet.one({id : id}, (err, applySheet) => {
                applySheet.ap_status = "不通过";
                applySheet.save();
                toJson(res,{
                    status : true,
                    success : applySheet
                });
            });
        });
    },

    //操作：借出
    "/ctrl/lend" : (req, res) => {
        let id = req.body.id;
        if(!id) toJson(res,{
            status : false,
            error : "id不能为空"
        });
        connect(applySheetDefine, ApplySheet => {
            ApplySheet.one({id : id}, (err, applySheet) => {
                applySheet.ap_status = "借出中";
                applySheet.save();
                toJson(res,{
                    status : true,
                    success : applySheet
                });
            });
        });
    },

    //操作：归还
    "/ctrl/return" : (req, res) => {
        let id = req.body.id;
        if(!id) toJson(res,{
            status : false,
            error : "id不能为空"
        });
        connect(applySheetDefine, ApplySheet => {
            ApplySheet.one({id : id}, (err, applySheet) => {
                applySheet.ap_status = "已完成";
                applySheet.save();
                toJson(res,{
                    status : true,
                    success : applySheet
                });
            });
        });
    },

    //添加或修改物资记录
    "/saveMaterial" : (req, res) => {
        let data = req.body;
        console.log(data);
        if(data.id){
            connect(materialDefine, Material => {
                Material.one({id : data.id}, (err, material) => {
                    material.m_name = data.m_name;
                    material.m_amount = data.m_amount;
                    material.m_unit = data.m_unit;
                    material.save();
                    toJson(res,{
                        status : true,
                        success : material
                    });
                });
            });
        }else{
            connect(materialDefine, Material => {
                Material.create({
                    id : guid(),
                    m_name : data.m_name.trim(),
                    m_amount : data.m_amount.trim(),
                    m_unit : data.m_unit.trim()
                }, (err, material) => {
                    toJson(res,{
                        status : true,
                        success : material
                    });
                });
            });
        }

    },

    //删除物资记录
    "/removeMaterial" : (req, res) => {
        let id = req.body.id;
        if(!id) toJson(res,{
            status : false,
            error : "id不能为空"
        });
        connect(materialDefine, Material => {
            Material.one({id : id}, (err, material) => {
                material.remove( err => {
                    toJson(res,{
                        status : true,
                        success : err
                    });
                });
            });
        });
    },

    //删除申请记录记录
    "/removeApply" : (req, res) => {
        let id = req.body.id;
        if(!id) toJson(res,{
            status : false,
            error : "id不能为空"
        });
        connect(applySheetDefine, ApplySheet => {
            ApplySheet.one({id : id}, (err, applySheet) => {
                if(applySheet.ap_status != "借出中" && applySheet.ap_status != "已超期"){
                    applySheet.remove( err => {
                        toJson(res,{
                            status : true,
                            success : err
                        });
                    });
                }else {
                    toJson(res,{
                        status : false,
                        error : "物资借出中，无法删除"
                    });
                }
            });
        });
    }

};

function toJson(res,data){
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(data));
}

module.exports = routes;