<template>
  <div class="menuTree">
    <label v-for="item in data" :key="item.path">
      <el-submenu
        v-if="item.children && item.children.length > 0"
        :index="item.title"
      >
        <template slot="title">
          <div @contextmenu.prevent="openMenu($event, item)">
            <!-- <svg-icon
            v-if="item.icon"
            :svg-name="getPath(item.icon)"
            class-name="menu-icon"
          /> -->
            <i :class="item.icon"></i>
            <span class="menu-text">{{ item.title }}</span>
          </div>
        </template>
        <menutree :data="item.children" :active="active" />
      </el-submenu>
      <el-menu-item
        @contextmenu.prevent.native="openMenu($event, item)"
        v-else
        :index="item.path + ',' + item.permissionId"
        :disabled="item.path ? false : true"
      >
        <span slot="title">
          <!-- <svg-icon
            v-if="item.icon"
            :svg-name="getPath(item.icon)"
            class-name="menu-icon"
          /> -->
          <i :class="item.icon"></i>
          <span class="menu-text">{{ item.title }}</span>
          <span
            v-if="item.path + ',' + item.permissionId === active"
            class="menu-bg"
          />
        </span>
      </el-menu-item>
    </label>
  </div>
</template>

<script>
export default {
  components: { },
  name: "Menutree",
  props: {
    data: {
      type: Array,
      required: true,
    },
    active: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
    };
  },
  methods: {
    getPath(path) {
      if (typeof path === "undefined") {
        return;
      }
      const index = path.indexOf(".");
      return path.substring(0, index);
    },
    openMenu(event, item) {
      // if(item.children == null){
      //   item.children=[]
      // }
      // item.children.push(
      //   {
      //     icon: "",
      //     path: "newsList",
      //     title: "已读消息",
      //   }
      // )
      console.log(item)
      this.$store.commit('visible',true)

      if (event.clientX > 1800) {
        this.$store.commit('left',event.clientX - 100)
      } else { 
        this.$store.commit('left',event.clientX + 1)
      }
      document.addEventListener('click', this.foo); // 给整个document新增监听鼠标事件，点击任何位置执行foo方法
      if (event.clientY > 700) {
        this.$store.commit('top',event.clientY - 30)
      } else { 
        this.$store.commit('top',event.clientY - 10)
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.menuTree {
  /deep/.el-menu-item {
    position: relative;

    &:hover {
      background-color: rgb(243, 246, 249) !important;
    }

    .menu-bg {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      background-color: #5da1ff;
      opacity: 0.1;
      left: 0;
      top: 0;
    }
  }
  .is-active > .el-submenu__title {
    color: #2b77ff;
  }
  .menu-icon {
    width: 16px;
    height: 16px;
  }
  .menu-text {
    margin-left: 8px;
  }
}
</style>

