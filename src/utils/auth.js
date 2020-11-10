import Cookies from 'js-cookie'

export function getToken() {
  console.log(getKey('Token'));
  return sessionStorage.getItem(getKey('Token'))
}

export function setToken(token) {
  return sessionStorage.setItem(getKey('Token'), token)
}

export function removeToken() {
  return sessionStorage.removeItem(getKey('Token'))
}

export function getUserInfo(){
   var UserInfo = new Object();
   UserInfo.UserId = sessionStorage.getItem(getKey('UserId'))
   UserInfo.UserName = sessionStorage.getItem(getKey('UserName'))
   UserInfo.RealName = sessionStorage.getItem(getKey('RealName'))
   UserInfo.WorkTime = sessionStorage.getItem(getKey('WorkTime'))
   UserInfo.WorkGroup = sessionStorage.getItem(getKey('WorkGroup'))
   return UserInfo;
}

export function setUserInfo(UserId,UserName,RealName,WorkTime,WorkGroup){
   sessionStorage.setItem(getKey('UserId'), UserId);
   sessionStorage.setItem(getKey('UserName'), UserName);
   sessionStorage.setItem(getKey('RealName'), RealName);
   sessionStorage.setItem(getKey('WorkTime'), WorkTime);
   sessionStorage.setItem(getKey('WorkGroup'), WorkGroup);
}

export function removeUserInfo(){
  sessionStorage.removeItem(getKey('UserId'))
  sessionStorage.removeItem(getKey('UserName'))
  sessionStorage.removeItem(getKey('RealName'))
  sessionStorage.removeItem(getKey('WorkTime'))
  sessionStorage.removeItem(getKey('WorkGroup'))
}

export function getCookies(key) {
  return sessionStorage.getItem(getKey(key))
}

export function setCookies(key,value) {
  sessionStorage.setItem(getKey(key), value);
}

export function removeCookies(key) {
  return sessionStorage.removeItem(getKey(key))
}

export function getKey(key){
  return apiBase.DomeKey + key
}