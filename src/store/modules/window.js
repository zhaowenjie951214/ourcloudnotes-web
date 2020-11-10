// import { getNowServicerDate } from "@/api/tool.js";
const window = {
  state: {
    InnerWidth: 0,
    NowServerDate: "",
    visible: false,
    top: 0,
    left: 0,

  },

  mutations: {
    INNER_WIDTH: (state, innerWidth) => {
      state.InnerWidth = innerWidth
    },
    NOW_SERVER_DATE: (state, nowServerDate) => {
      state.NowServerDate = nowServerDate
    },
    visible: (state, visible) => {
      state.visible = visible
    },
    top: (state, top) => {
      state.top = top
    },
    left: (state, left) => {
      state.left = left
    },
  },
  actions: {
    // NowServerDate({ commit }) {
      /*
       * 获取时间并动态刷新
      */
      // getNowServicerDate().then(res => {
      //   //只需要AJAX一次，将服务器时间获取后以毫米为单位保存到一个变量中
      //   var _timestamp = Date.parse(res.data);
      //   //设置定时器每过一秒动态刷新一次时间
      //   setInterval(
      //     function () {
      //       //这里可以自定义时间显示格式
      //       commit('NOW_SERVER_DATE', moment(new Date(_timestamp)).format('YYYY-MM-DD HH:mm:ss'))
      //       _timestamp += 1000;
      //     },
      //     1000
      //   );
      // })
    // }
  }
}
export default window
