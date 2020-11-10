/**
 * @Description: 
 * - 处理请求头，
 * - apitoken、针对一般的post和文件上传，设置不同的headers
 * - 根据环境获取不同的baseUrl
 */

const getApitoken = () => {
    return localStorage.getItem("apiToken") || 'token_admin' //在登录时得到后存储起来
}

const commmonHeader = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${getApitoken()}`
}

/* 常规的 */
export const featchApiHeader = {...commmonHeader,
    'Content-Type': 'application/x-www-form-urlencoded'
}

/* 文件的 */
export const formApiHeader ={...commmonHeader, 
    'Content-Type': 'multipart/form-data'
}

export const baseApiUrl = process.env.VUE_APP_API_BASEURL