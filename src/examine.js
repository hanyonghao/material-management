var vm = new Vue({
    el : "#container",
    data : {
        table : [],
        examine : []
    },
    ready : function(){
        var self = this;
        $.ajax("/getAllApply",{
            type : "get",
            cache : false,
            dataType : "json",
            success : function(data){
                if(data.status){
                    data.success.map(function(item){
                        item.ap_url = "record.html#" + item.id;
                        if(item.ap_status == "待审批"){
                            self.examine.push(item);
                        }else{
                            self.table.push(item);
                        }
                    });
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