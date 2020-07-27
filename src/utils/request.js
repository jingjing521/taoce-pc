import axios from 'axios'
import { Message, MessageBox } from 'element-ui'

axios.defaults.timeout = 5000;
axios.defaults.baseURL ='';


axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);

