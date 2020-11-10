
import { getUserInfoByUserRole,getDictList} from '@/api/tool.js'
import * as select from '../api/select.js'
import * as device from '@/api/device_definition.js'

//根据字典主题，获取字典
export function getSeleteData(optionsName,options){
  options.length = 0;
  var options_searchList=new Object();
    options_searchList["search_EQ_theme.code"] = optionsName;
    getDictList(options_searchList).then(data => {
        console.log(data)
        for(var i = 0; i< data.data.length; i++){
            var obj = new Object();
            obj.value = data.data[i].value
            obj.label = data.data[i].name
            console.log(obj)
            options.push(obj);
        }
    })
  }


//获取所有班次
  export function listAllClasses(options){
    options.length = 0;
    select.getListAllClasses().then(data => {
    console.log(data)
    for(var i = 0; i< data.data.length; i++){
        var obj = new Object();
        obj.value = data.data[i].id
        obj.label = data.data[i].name
        console.log(obj)
        options.push(obj);
    }
  })
}

//获取所有班组
export function listAllTeam(options){
  options.length = 0;
  select.getListAllTeam().then(data => {
    console.log(data)
    for(var i = 0; i< data.data.length; i++){
        var obj = new Object();
        obj.value = data.data[i].id
        obj.label = data.data[i].name
        console.log(obj)
        options.push(obj);
    }
  })
}

//获取所有需要灌料的设备
export function getDeviceNo(options){
  options.length = 0;
  select.getDeviceNo().then(data=>{
    for(var i = 0; i< data.data.length; i++){
      var obj = new Object();
      obj.value = data.data[i].deviceId
      obj.label = data.data[i].deviceName
      options.push(obj);
  }
  })
}

//获取所有等待送验的单晶编号
export function getInspectionCrystalInfo(options,params){
  options.length = 0;
  select.getInspectionCrystalInfo(params).then(data=>{
    for(var i = 0; i< data.data.length; i++){
      var obj = new Object();
      obj.value = data.data[i].id
      obj.label = data.data[i].crystalNo
      options.push(obj);
    }
  })
}

//获取所有等待画线的单晶编号
export function getDrawLineCrystalInfo(options,params){
  options.length = 0;
  select.getDrawLineCrystalInfo(params).then(data=>{
    for(var i = 0; i< data.data.length; i++){
      var obj = new Object();
      obj.value = data.data[i].id
      obj.label = data.data[i].crystalNo
      options.push(obj);
    }
  })
}


//更具工号，获取用户列表
export function getUserInfoList(options,params){
  options.length = 0;
  select.getUserInfoList(params).then(data=>{
    for(var i = 0; i< data.data.length; i++){
      var obj = new Object();
      obj.value = data.data[i].id + "?_$" + data.data[i].realName
      obj.label = data.data[i].realName
      options.push(obj);
    }
  })
}
 
export function getCutoffCrystalInfo(options,params){
  options.length = 0;
  select.getCutoffCrystalInfo(params).then(data=>{
    for(var i = 0; i< data.data.length; i++){
      var obj = new Object();
      obj.value = data.data[i].id+"?_$"+data.data[i].crystalNo
      obj.label = data.data[i].crystalNo
      options.push(obj);
    }
  })
}

//切断页面
export function getCutOffDevices(options){
  options.length = 0;
  device.listAll({"search_EQ_deviceType.id":16}).then(resa=>{//切断机
    console.log("getCutOffDevicesA")
    console.log(resa)
    device.listAll({"search_EQ_deviceType.id":18}).then(resb=>{//截断机
      console.log("getCutOffDevicesB")
      console.log(resb)
      for(var i = 0; i< resa.data.length; i++){
        var obj = new Object();
        obj.value = resa.data[i].id
        obj.label = resa.data[i].name+"("+resa.data[i].code+")"
        obj.deviceTypeId = 16;
        obj.deviceName = resa.data[i].name;
        options.push(obj);
      }
      for(var i = 0; i< resb.data.length; i++){
        var obj = new Object();
        obj.value = resb.data[i].id
        obj.label = resb.data[i].name+"("+resb.data[i].code+")"
        obj.deviceTypeId = 18;
        obj.deviceName = resb.data[i].name;
        options.push(obj);
      }
    })
  })
}


/**
 * 反切画线页面，获取反切原因
 * @param {反切原因字典key} optionsName 
 * @param {反切下拉框的数组} options 
 */
export function getSeleteDatas(optionsName,options){
	select.getDictionaryItem({"search_EQ_theme.code":optionsName}).then(data => {
		options.length = 0;
		for(var i = 0; i< data.data.length; i++){
			var obj = new Object();
			obj.value = data.data[i].value
			obj.label = data.data[i].name
			console.log(obj)
			options.push(obj);
		}
		console.log(options)
	})
}

export function getSampleData(no,options){
  options.length = 0;
  select.getSampleData({no:no}).then(data => {
		options.length = 0;
		for(var i = 0; i< data.data.length; i++){
			var obj = new Object();
			obj.value = data.data[i].id
			obj.label = data.data[i].no
			console.log(obj)
			options.push(obj);
		}
		console.log(options)
	})
}