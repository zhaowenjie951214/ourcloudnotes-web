<template>
  <div id="left" class="left">
    <ul v-for="(menuItem, index) in theModel" :key="index">
      <myTree class="item" :model="menuItem"></myTree>
    </ul>
  </div>
</template>

<script>
import myTree from "../left/tree-item";
export default {
  components: {
    myTree,
  },
  data() {
    return {
      theModel: [
        {
          id: "1",
          menuName: "echarts",
          menuCode: "10",
          children: [
            {
              menuName: "地图",
              menuCode: "11",
            },
            {
              menuName: "柱状图",
              menuCode: "12",
              children: [
                {
                  menuName: "交错正负轴标签",
                  menuCode: "121",
                },
                {
                  menuName: "柱状图框选 ",
                  menuCode: "122",
                },
                {
                  menuName: "堆叠柱状图",
                  menuCode: "124",
                },
              ],
            },
            {
              menuName: "条形图",
              menuCode: "13",
            },
          ],
        },
        {
          id: "2",
          menuName: "树形结构",
          menuCode: "21",
        },
        {
          id: "3",
          menuName: "gird分页",
          menuCode: "30",
        },
      ],
    };
  },
};
</script>
<style scoped>

.item {
  cursor: pointer;
}
ul{
  line-height: 40px;
  list-style-type: dot;
  font-size: 14px;
}

li div:active,li div:hover {
  background: #9FDABE;
  color: #eee;
}

ul li:hover {
  background: #A6C2B0;
}
</style>