import axios from 'axios';
import { Message } from 'element-ui';

axios.defaults.timeout = 5000;
axios.defaults.baseURL = '/apis';


//http request 拦截器
axios.interceptors.request.use(
  config => {
    let token = '';
    
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Access-Control-Allow-Origin': '*',
      'uid': '1'
    }
    if (window.localStorage.getItem("paoce_token")) {
      token = window.localStorage.getItem("paoce_token")
      config.headers = {'token':token}
    }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);


//http response 拦截器
axios.interceptors.response.use(
  response => {
    // if(response.data.errCode ==2){
    //   router.push({
    //     path:"/login",
    //     query:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
    //   })
    // }
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
  if(url.indexOf("?") != -1){
    url = url + "&n="+encodeURIComponent(Math.random())
  }else{
    url = url + "?n="+encodeURIComponent(Math.random())
  }
  return new Promise((resolve, reject) => {
    axios.get(url, { params: params })
      .then(response => { resolve(response.data); })
      .catch(err => { reject(err) })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  if(url.indexOf("?") != -1){
    url = url + "&n="+encodeURIComponent(Math.random())
  }else{
    url = url + "?n="+encodeURIComponent(Math.random())
  }
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      response => { resolve(response.data); }, 
      err => { reject(err) })
  })
}

/**
* 封装patch请求
* @param url
* @param data
* @returns {Promise}
*/

export function patch(url, data = {}) {
  if(url.indexOf("?") != -1){
    url = url + "&n="+encodeURIComponent(Math.random())
  }else{
    url = url + "?n="+encodeURIComponent(Math.random())
  }
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
        response => { resolve(response.data); }, 
        err => { reject(err) })
  })
}

/**
* 封装put请求
* @param url
* @param data
* @returns {Promise}
*/

export function put(url, data = {}) {
  if(url.indexOf("?") != -1){
    url = url + "&n="+encodeURIComponent(Math.random())
  }else{
    url = url + "?n="+encodeURIComponent(Math.random())
  }
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}