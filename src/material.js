var vm = new Vue({
    el : "#container",
    data : {
        currSelect : null,
        materials : [],
        q : "",
        btn_text : "添加"
    },
    methods : {
        init : function(){
            var self = this;
            self.currSelect = {
                id : "",
                m_name : " ",
                m_amount : " ",
                m_unit : " "
            };
            self.btn_text = "添加";
        },
        edit : function(item){
            var self = this;
            self.currSelect = item;
            self.btn_text = "保存";
        },
        deletes : function(item){
            if(confirm("是否确认删除？")){
                $.ajax("/removeMaterial",{
                    type : "post",
                    data : {id : item.id},
                    cache : false,
                    dataType : "json",
                    success : function(data){
                        if(data.status){
                            alert("操作成功");
                            window.location.reload();
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
        save : function(){
            var self = this;
            console.log(self.currSelect);
            if(self.currSelect.m_name && self.currSelect.m_amount && self.currSelect.m_unit){
                $.ajax("/saveMaterial",{
                    type : "post",
                    data : self.currSelect,
                    cache : false,
                    dataType : "json",
                    success : function(data){
                        if(data.status){
                            alert("操作成功");
                            window.location.reload();
                        }else{
                            alert(data.error);
                        }
                    },
                    error : function(err){
                        console.log(err);
                    }
                });
            }else{
                alert("请填写完整信息")
            }
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
                    self.init();
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