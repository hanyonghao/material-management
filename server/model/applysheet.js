module.exports = db => {

    let ApplySheet = db.define("apply_sheet", {
        id           : String,
        ap_activity  : String,
        ap_approver  : String,
        ap_clazz     : String,
        ap_phone     : String,
        ap_lend      : Date,
        ap_return    : Date,
        ap_create    : Date,
        ap_status    : ['待审批','未借出','借出中','已超期','已完成','不通过','已关闭']
    }, {
        methods: {
            //根据时间更新记录状态
            updateStatus : function () {
                if(new Date() > this.ap_return && this.ap_status == '借出中'){
                    this.ap_status = "已超期";
                    this.save();
                }else if(new Date() > this.ap_return && ( this.ap_status == '待审批' || this.ap_status == '未借出' )){
                    this.ap_status = "已关闭";
                    this.save();
                }
                return true;
            },

            //转成规定格式的日期字符串 YYYY-MM-DD
            formatAllDate : function(){
                this.ap_lend = this.ap_lend.getFullYear() + "-" + (this.ap_lend.getMonth() + 1) + "-" + this.ap_lend.getDate();
                this.ap_return = this.ap_return.getFullYear() + "-" + (this.ap_return.getMonth() + 1) + "-" + this.ap_return.getDate();
                this.ap_create = this.ap_create.getFullYear() + "-" + (this.ap_create.getMonth() + 1) + "-" + this.ap_create.getDate();
            }
        }
    });

    return ApplySheet;

};