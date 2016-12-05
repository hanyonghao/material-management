var vm = new Vue({
    el : "#container",
    data : {
        q : ""
    },
    methods : {
        submit : function(){
            var self = this;
            window.location.href = "/record.html#" + self.q + "$";
        }
    },
    ready : function(){
        var self = this;
        var hash = window.location.hash || "#0";
        var id = hash.slice(1,hash.length);
        if(id && id != 0){
            self.q = id;
        }
    }
});