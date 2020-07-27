/** 用户名是否合法 */
export function isValidUserName(value) {
  return /^[0-9a-zA-Z]*$/g.test(value)
}

/** 密码是否合法 */
export function isValidPassword(value) {
  const reg = /^[a-zA-Z0-9]{6,20}$/
  return reg.test(value)
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

/**
 * 手机号码
 * @param {*} mobile
 */
export function validateMobile(mobile) {
  return /^1[0-9]{10}$/.test(mobile)
}
export function validateAllMobile(mobile) {
  return /^([1]\d{10}|(0\d{2,3}-\d{6,10})|\d{6,12})$/.test(mobile)
}



/**
 * 姓名验证
 * @param {*} val 姓名
 */
export function validateName(val) {
  return /^[0-9A-Za-z\u0391-\uFFE5]{2,10}$/.test(val)
}
