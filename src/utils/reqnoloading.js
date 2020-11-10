import axios from 'axios'
import {Message,MessageBox} from 'element-ui'
import store from '../store'
import {getToken,removeToken} from './auth'
import Qs from 'qs'
var moment = require("moment");
import { Loading } from 'element-ui';
 
let loadingInstance;
const getService = (opts = {}) => {
  // 创建axios实例
  let options = {
    // baseURL: process.env.BASE_API, // api的base_url
    baseURL: apiBase.HOST,
    //timeout: 5000,
    withCredentials:true
  }
  if (opts.payload) {
  } else {
    options.transformRequest = [function (data) {
      data = Qs.stringify(data, {
        serializeDate: (date) => {
          //用moment处理日期比较方便，自己写格式化方法也可以
          return moment(date).format('YYYY-MM-DD HH:mm:ss')
        }
      });
      return data;
    }]
  }
  options.headers = {'token': store.getters.token,'Content-Type': 'application/json'};
  var service = axios.create(options);
  //console.log('options',options);
  service.interceptors.request.use(config => {
    // loadingInstance = Loading.service({background:"rgba(0, 0, 0, 0.8)",text:"数据加载中..."})
    if (!config.params) {
      config.params = {}
    }
    if (opts.payload) {
      config.data = parseData(config.data);
    }
    return config
  }, error => {
    // loadingInstance.close();
    //console.log(error)
    Promise.reject(error)
  })

  service.interceptors.response.use(response => {
      //loadingInstance.close();
      const res = response.data;
      store.dispatch('NowServerDate', res.nowServerDate)
      //console.log('res.statusCode',res.code)
      res.code === undefined ? res.code = 0 : ""
      if(res.code === 400) {//为了登录时，输入用户名密码错误时给出错误提示
        if(res.msg  == undefined) {
          response.data.message = res.message;
        }else {
          response.data.message = res.msg;
        }
      }
      if(res.code == 402){//登录已过期，返回登录界面
        removeToken();
        MessageBox.alert(res.message).then(() => {
          window.location.href="/";
        })
      }else if (res.code != 200) {
        Message({
          message: res.message,
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(res)
      } else {
        //console.log('666',response.data)
        return response.data
      }
      return response.data;
    },
    error => {
      //console.log('err' + error)// for debug
      loadingInstance.close();
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  )
  return service;
}
function parseData(data) {
  // if (typeof data == 'object') {
  //
  //   var str = JSON.stringify(data)
  //
  //   if (str.indexOf('.000Z') > 0) {
  //
  //     str = str.replace(/\.000Z/g, '').replace(/(\d+)T(\d+)/g, '$1 $2')
  //     return JSON.parse(str)
  //   }
  //
  //
  // }
  return data
}

export default {
  postPayload: (url, data) => {
    var fetch = getService({payload: true})
    return fetch({
      url: url,
      method: 'post',
      data: data
    })
  },
  post: (url, data) => {
    console.log("apiBase.HOST:"+ apiBase.HOST)
    var fetch = getService()
    return fetch({
      url: url,
      method: 'post',
      data: data
    })
  },
  get: (url, params) => {
    var fetch = getService()
    return fetch({
      url: url,
      method: 'get',
      params: params
    })
  },
  options: (url, params) => {
    var fetch = getService()
    return fetch({
      url: url,
      method: 'options',
      params: params
    })
  }
}
