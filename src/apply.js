var vm = new Vue({
    el : "#container",
    data : {
        currSelect : null,
        table : [],
        activity : "",
        approver : "",
        clazz : "",
        phone : "",
        lend : "",
        return : "",
        materials : [],
        count : "",
        remark : ""
    },
    methods : {
        add : function(){
            var self = this;
            if(self.currSelect){
                self.table.push({
                    m_id : self.currSelect.id,
                    name : self.currSelect.m_name,
                    count : self.count,
                    unit : self.currSelect.m_unit,
                    remark : self.remark
                });
                self.count = "";
                self.remark = "";
                self.materials.splice(self.materials.indexOf(self.currSelect),1);
                self.currSelect = null;
            }else{
                alert("请选择需借用的物资");
            }
        },
        select : function(item){
            var self = this;
            self.currSelect = item;
        },
        submit : function(){
            var self = this;
            console.log(self.table)
            $.ajax("/sendForm",{
                data : {
                    activity  : self.activity,
                    approver  : self.approver,
                    clazz     : self.clazz,
                    phone     : self.phone,
                    lend      : self.lend,
                    return   : self.return,
                    article   : JSON.stringify(self.table)
                },
                type : "post",
                cache : false,
                dataType : "json",
                success : function(data){
                    if(data.status){
                        alert("提交申请成功，请记录及时申请表编号以便查询。");
                        window.location.href = "/record.html#" + data.success.id + "$";
                    }else{
                        alert(data.error);
                    }
                },
                error : function(err){
                    console.log(err);
                }
            });
        }
    },
    ready : function(){
        var self = this;
        $.ajax("/getMaterials",{
            type : "get",
            cache : false,
            dataType : "json",
            success : function(data){
                if(data.status){
                    self.materials = data.success;
                    $(".dropdown").dropdown();
                }else{
                    alert(data.error);
                }
            },
            error : function(err){
                console.log(err);
            }
        });
    }
});