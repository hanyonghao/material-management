class GUID {

    constructor() {
        this.date = new Date();
    }

    /* 生成GUID码 */
    new (flag) {
        this.date = new Date();
        let guidStr = '';
        let sexadecimalDate = this.hexadecimal(this.getGUIDDate(), 16);
        let sexadecimalTime = this.hexadecimal(this.getGUIDTime(), 16);
        for (let i = 0; i < 9; i++) {
            guidStr += Math.floor(Math.random()*16).toString(16);
        }
        guidStr += sexadecimalDate;
        guidStr += sexadecimalTime;
        while(guidStr.length < 32) {
            guidStr += Math.floor(Math.random()*16).toString(16);
        }

        if(flag){
            this.formatGUID(guidStr);
        }else{
            return guidStr;
        }
    }

    /*
     * 功能：获取当前日期的GUID格式，即8位数的日期：19700101
     * 返回值：返回GUID日期格式的字条串
     */
    getGUIDDate () {
        return this.date.getFullYear() + this.addZero(this.date.getMonth() + 1) + this.addZero(this.date.getDay());
    }

    /*
     * 功能：获取当前时间的GUID格式，即8位数的时间，包括毫秒，毫秒为2位数：12300933
     * 返回值：返回GUID日期格式的字条串
     */
    getGUIDTime () {
        return this.addZero(this.date.getHours()) + this.addZero(this.date.getMinutes()) + this.addZero(this.date.getSeconds()) + this.addZero( parseInt(this.date.getMilliseconds() / 10 ));
    }

    /*
     * 功能: 为一位数的正整数前面添加0，如果是可以转成非NaN数字的字符串也可以实现
     * 参数: 参数表示准备再前面添加0的数字或可以转换成数字的字符串
     * 返回值: 如果符合条件，返回添加0后的字条串类型，否则返回自身的字符串
     */
    addZero (num) {
        if (Number(num).toString() != 'NaN' && num >= 0 && num < 10) {
            return '0' + Math.floor(num);
        } else {
            return num.toString();
        }
    }

    /*
     * 功能：将y进制的数值，转换为x进制的数值
     * 参数：第1个参数表示欲转换的数值；第2个参数表示欲转换的进制；第3个参数可选，表示当前的进制数，如不写则为10
     * 返回值：返回转换后的字符串
     */
    hexadecimal (num, x, y) {
        if (y != undefined) {
            return parseInt(num.toString(), y).toString(x);
        } else {
            return parseInt(num.toString()).toString(x);
        }
    }

    /*
     * 功能：格式化32位的字符串为GUID模式的字符串
     * 参数：第1个参数表示32位的字符串
     * 返回值：标准GUID格式的字符串
     */
    formatGUID (guidStr) {
        let str1 = guidStr.slice(0, 8) + '-',
            str2 = guidStr.slice(8, 12) + '-',
            str3 = guidStr.slice(12, 16) + '-',
            str4 = guidStr.slice(16, 20) + '-',
            str5 = guidStr.slice(20);
        return str1 + str2 + str3 + str4 + str5;
    }
}

module.exports = new GUID();