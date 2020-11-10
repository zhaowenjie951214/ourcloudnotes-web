import $ from 'jquery'
exports.install = function (Vue, options) {
    Vue.prototype.focusdate = function (){
        setTimeout(function () {
            $("input[placeholder='选择时间']").attr("readonly", 'readonly')
            $("input[placeholder='选择日期']").attr("readonly", 'readonly')
        }, 500)
    };
    Vue.prototype.loading = false;
    Vue.prototype.SubmitStatus = true;
    Vue.prototype.NowServicerDateSetInterval = null;
    Vue.prototype.isEmpty = function (value){
        if(value == null || value.toString() == ""){
          return true;
        }
        return false;
    };
};

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}


export const NOT_IC_TYPE = 0;
export const IC_TYPE = 1;
export const VACUUM_BUMP = 0; // 真空泵
export const VACUUM_COVER = 1; // 真空埚盖
export const REDELIVERY = 2; // 复投器
