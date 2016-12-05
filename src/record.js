var vm = new Vue({
    el : "#container",
    data : {
        apply_sheet : null,
        disable : true,
        hash : ""
    },
    methods : {
        href : function(url){
            var self = this;
            $.ajax(url,{
                type : "post",
                data : {
                    id : self.apply_sheet.id
                },
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
        },
        back : function(){
            var self = this;
            if(self.disable){
                window.location.href = "/examine.html";
            }else{
                window.location.href = "/search.html#"+self.hash;
            }
        }
    },
    ready : function(){
        var self = this;
        var hash = window.location.hash || "#0";
        var id = hash.slice(1,hash.length);
        if(id.indexOf("$") > -1){
            id = id.replace(/\$/,"");
            self.disable = false;
        }
        self.hash = id;
        $.ajax("/getRecordById",{
            type : "get",
            data : {
                id :id
            },
            cache : false,
            dataType : "json",
            success : function(data){
                if(data.status){
                    Vue.set(vm, 'apply_sheet', data.success);//托管对象
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