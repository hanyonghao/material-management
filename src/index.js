
var vm = new Vue({
    el : "#container",
    data : {
        username : "",
        password : ""
    },
    methods : {
        submit : function(){
            var self = this;
            var type = document.querySelector(".dropdown .text").innerText;
            $.ajax("/login",{
                data : {
                    username : self.username,
                    password : self.password,
                    type : type
                },
                type : "post",
                cache : false,
                dataType : "json",
                success : function(data){
                    if(data.status){
                        alert(data.success);
                        if(type == "部门"){
                            window.location.href = "/apply.html";
                        }else{
                            window.location.href = "/examine.html";
                        }
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
        $(".dropdown").dropdown();
    }
});