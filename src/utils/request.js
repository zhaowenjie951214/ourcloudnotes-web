/* 封装axios */
const axios = require('axios');

import {
    featchApiHeader,
    formApiHeader,
    baseApiUrl
} from './requestUtil.js';

const {
    Loading,
    Message
} = require('element-ui');

import router from '@/routes/routes'
import store from '@/store/store'
import qs from 'qs'

let loadingInstance = null; //loading实例

/* 创建实例时的基础默认配置，可以在请求时进行重写覆盖 */
const instance = axios.create({
    baseURL: baseApiUrl,
    timeout: 5000,
    method: 'post',
    headers: featchApiHeader
})

/* 拦截器 */
/**
 * @Description: 
 * - 在request 内通过对data类型的校验，区分是一般的post还是formdata文件上传
 * - 根据类型的不同改变成不同的headers
 * - 
 */
instance.interceptors.request.use(
    config => {
        loadingInstance = Loading.service({
            text: "请求中...",
            spinner: 'el-icon-loading'
        });
        if (config.method.toLowerCase() == "post") {
            let newdata = config.data;
            if (config.data instanceof FormData) { //文件类,文件类不需要stringify
                Object.assign(config.headers, formApiHeader); //修改`Content-Type`
                newdata.append("accessStr", localStorage.getItem("apiToken") || '')
            } else { //非文件类,stringify
                //空处理
                newdata = (typeof newdata == 'object' && Object.keys(newdata).length >= 0) ? newdata : {};

                newdata = {
                    ...newdata,
                    accessStr: localStorage.getItem("apiToken") || ''
                }
                newdata = qs.stringify(newdata);
            }
            config.data = newdata;
        }
        return config
    },
    error => {
        loadingInstance.close();
        Message({
            showClose: true,
            message: '请求错误，请您稍后重试！',
            type: 'error'
        });
        return Promise.reject(error)
    },
)

instance.interceptors.response.use(
    response => {
        loadingInstance.close();
        let resStatus = response.status;
        if (resStatus == 200) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    error => {
        loadingInstance.close();
        if (error.response.status) {
            switch (error.response.status) {
                case 401: //未登录,从哪里来回哪里去
                    router.replace({
                        path: '/index',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                    break;
                case 403: //token过期
                    Message({
                        message: '登录过期，请重新登录',
                        duration: 1500
                    });
                    localStorage.removeItem("apiToken"); //清除token
                    store.commit("loginSuccess", ""); //全局通知loginSuccess为空
                    break;
                case 404:
                    Message({
                        message: '网络请求不存在',
                        duration: 1500
                    });
                    break;
                case 500, 501, 503: //服务端错误
                    Message({
                        message: '请求异常，请您稍后重试！',
                        duration: 1500
                    });
                    break;
                default:
                    Message({
                        message: error.response.data.message,
                        duration: 1500
                    });
                    break;
            }
            return Promise.reject(error)
        }

    },
)

export default instance