export function isEmpty(obj) {
    if (typeof obj === 'undefined' || obj == null) {
        return true
    }
    if (obj instanceof Array) {
        return obj.length === 0
    }
    if (obj instanceof Object) {
        for (var attr in obj) {
            return false
        }
    }
    if (obj instanceof String || typeof obj === 'string') {
        return obj === ''
    }
    return false
}
export function starPhone(phoneNum){
    let str =  String(phoneNum),
    strLen = str.slice(-8,-2);
    return str.replace(strLen,"******");
}
export function  getDataName (obj) {
    let name = obj.data
    if (Array.isArray(obj.dataList) && obj.dataList.length > 0) {
      for (let i = 0; i < obj.dataList.length; i++) {
        if (obj.dataList[i][obj.value] === obj.data) {
          name = obj.dataList[i][obj.lable]
        }
      }
    }
    return name
}

export function  getAllCity (obj) {
    var arr = []; 
    obj.forEach((v,i) => {
        v.ssqdmEntityList.forEach(function(x,y){ 
            arr.push({id:x.dm,name:x.name})
        })
    });
    return arr
}

export function  getAllDistrict (obj) {
    var arr = []; 
    obj.forEach((v,i) => {
        v.ssqdmEntityList.forEach(function(x,y){ 
            x.ssqdmEntityList.forEach(function(x1,y1){ 
                arr.push({id:x1.dm,name:x1.name})
            })
        })
    });
    return arr
}
var noEnum = function (v) {
    return { value: v, enumerable: false, writable: true, configurable: true }
}
Object.defineProperty(Date.prototype, 'format', noEnum(function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                      //月份
        "d+": this.getDate(),                           //日
        "h+": this.getHours(),                          //小时
        "m+": this.getMinutes(),                        //分
        "s+": this.getSeconds(),                        //秒
        "q+": Math.floor((this.getMonth() + 3) / 3),    //季度
        "S": this.getMilliseconds()                     //毫秒
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
        }
    }
    return fmt
}))
Object.defineProperty(Date.prototype, 'UTF_DATE_START_MONTH', noEnum(function () {
    const date =  new Date(this.getTime()- 3600 * 1000 * 24 * 30)
    return date.format('yyyy-MM-dd 00:00:00')
}))
Object.defineProperty(Date.prototype, 'UTF_DATE_END', noEnum(function () {
    return this.format('yyyy-MM-dd 23:59:59')
}))

