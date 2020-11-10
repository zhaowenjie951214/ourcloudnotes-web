import req from '../utils/req'

export function login(username, password) {
  return req.post('/auth/login?loginName='+username+'&password='+password);
}
// export function logout() {
//   return req.post('/auth/auth/logout')
// }

// export function sendNotification(params){
//   return reqnoloading.get("/operate/chargeInfo/sendNotification",params)
// }


// export function createChargeInfo(data){
//    return req.postPayload("/operate/chargeInfo/create",data)
// }


// export function getCurrentUserInfo() {
//   return req.get('user/getCurrentUserInfo')
// }

// export function ipcLogin(username, password) {
//   return req.post('/auth/ipcLogin?loginName='+username+'&password='+password)
// }
// export function getPermission(params) {
//   return req.get('permission/getPermissionMap')
// }