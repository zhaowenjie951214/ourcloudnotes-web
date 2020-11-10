import { Loading } from 'element-ui';
import {Message,MessageBox} from 'element-ui'

let loadingInstance;
window.onload=function(){//do something
  try{
    let chcp = window.chcp;
    // 检测更新
    chcp.fetchUpdate((error, data) => {
      global.apiBase.KeyboardStatus = false;
      // 表示没有更新版本，或者其他错误，详情的信息参考上面的chcp error链接
      if (error) {
        //console.log('--fetchUpdate error--', error.code, error.description);
        return;
      }
      // 这次更新的版本信息
      console.log('--fetchUpdate--', data, data.config);
      // 检测是否是否可以进行安装了，双重判断吧，有时候会出现有更新版本但是暂时无法安装的情况（也可以去掉这一层）
      chcp.isUpdateAvailableForInstallation((error, data) => {
        if (error) {
          //console.log('No update was loaded => nothing to install');
        } else {
          // 对比版本号
          console.log('Current content version: ' + data.currentVersion);
          console.log('Ready to be installed:' + data.readyToInstallVersion);

          // 询问用户是否更新
          MessageBox.confirm('检测到新版本，是否更新').then(() => {
            loadingInstance = Loading.service({background:"rgba(0, 0, 0, 0.8)",text:"正在努力更新中..."})
            setTimeout(() => {
              // 更新中
              chcp.installUpdate((error) => {
                if (error) {// 更新失败
                  Message({message: "更新失败；错误信息：" + error.description,type: 'error',duration: 5 * 1000})
                } else {// 更新成功
                  Message({message: "更新成功" ,type: 'success',duration: 5 * 1000})
                }
                loadingInstance.close();
              });
            }, 2000);
          }).catch(() => {
            Message({message: "您已拒绝更新",type: 'error',duration: 5 * 1000})
          })
        }
      });
    });
  }catch(mes){
    console.log("客户端中才能更新")
    global.apiBase.KeyboardStatus = true;
  }
};