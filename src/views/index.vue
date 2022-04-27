<template>
  <div id="index" class="index">
     <top-banner/>
     <left/>
     <middle/>
     <right/>
     <div class="clear"></div>
      <div id="live2d-widget" class="live2d-widget-container">
    </div>
  </div>
</template>

<script>
import left from '../components/left'
import middle from '../components/middle'
import right from '../components/right'
import topBanner from '@/components/head'
export default {
   components:{
       left,middle,right,topBanner
   },
   mounted(){
    //  setTimeout(() => {
     window.L2Dwidget.on('*', (name) => {
      console.log('%c EVENT ' + '%c -> ' + name, 'background: #222; color: yellow', 'background: #fff; color: #000')
      })
      .init({
          dialog: {
              // 开启对话框
              enable: true,
              script: {
                  // 每空闲 10 秒钟，显示一条一言
                  'every idle 10s': '$hitokoto$',
                  // 当触摸到星星图案
                  'hover .star': '星星在天上而你在我心里 (*/ω＼*)',
                  // 当触摸到角色身体
                  'tap body': '哎呀！别碰我！',
                  // 当触摸到角色头部
                  'tap face': '人家已经不是小孩子了！'
              }
          }
      })
        // }, 20)
   }
}
</script>
 
 <style scoped>
 .index{
     min-width: 1558px;
     width: 100%;
 }
 .left {
  width: 220px;
  height: calc(100vh - 50px);
  /* background-color :#f0f7ff; */
  float: left;
  background-color: #f5f5f5;
  border-top:1px solid #e0e1e5;
  border-bottom:1px solid #e0e1e5; 
}
.middle {
  width: 318px;
  height: calc(100vh - 50px);
  float: left;
  overflow-y: auto;
  border-top:1px solid #e0e1e5; 
  border-left: 1px solid #e0e1e5;
  border-right: 1px solid #e0e1e5;
  border-bottom:1px solid #e0e1e5; 
}
.right {
  width: 720px;
  /* min-width: 410px;
  max-width: 720px; */
  height: calc(100vh - 50px);
  float: left;
  border-top:1px solid #e0e1e5; 
  border-right:1px solid #e0e1e5; 
  border-bottom:1px solid #e0e1e5; 
}
 </style>