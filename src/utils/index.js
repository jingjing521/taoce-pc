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

