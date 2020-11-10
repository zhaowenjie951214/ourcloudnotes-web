<template>
  <el-aside width="100%" style="background-color: #F3F6F9">
    <el-menu
      :background-color="menuBgColor"
      text-color="#555D6D"
      active-text-color="#5DA1FF"
      :default-active="activePath"
      @select="selectMenu"
    >
      <menutree :data="menuList" :active="menuSelect"/>
    </el-menu>
    <contextmenu />
  </el-aside>
</template>

<script>
import Menutree from '../el-menu/MenuTree'
import contextmenu from "../contextmenu";
export default {
  components: { Menutree,contextmenu },
  props: {
    menuBgColor: {
      type: String,
      default: '#F3F6F9'
    },
    menuList:{
        type: Array,
        default: null
    }
  },
  data() {
    return {
      activePath: this.$route.name,
      menuSelect: '',
    }
  },
  created(){
    this.$nextTick(() => {
      this.setActivePath(this.menuList, this.$route.name)
    })
  },
  // updated() {
  //    console.log("进入updated方法")
  //   this.$nextTick(() => {
  //     console.log("this.$route.tltie")
  //     this.setActivePath(this.menuList, this.$route.name)
  //   })
  // },
  methods: {
    setActivePath(links, path) {
      links.some((item, index) => {
        console.log(index)
        if (path === item.path) {
          this.activePath = item.path + ',' + item.permissionId
          return true
        }
        if (item.actives) {
          if (item.actives.indexOf(path) > -1) {
            this.activePath = item.path + ',' + item.permissionId
            return true
          }
        }
        if (item.children && item.children.length) {
          this.setActivePath(item.children, path)
        }
        return false
      })
    },
    selectMenu(item, indexPath) {
      console.log(indexPath)
      this.menuSelect = item

      const arr = item.split(',')
      if (arr[0] !== 'undefined') {
        this.$router.push({ name: arr[0] })
      }
    },
  }
}
</script>

<style lang="scss">
.el-submenu {
  overflow: hidden;
  .is-active {
    border-right: 1px solid main-color;
  }
  .el-menu-item {
    height: 40px !important;
    line-height: 40px !important;

    &:hover {
      background-color: #f3f6f9 !important;
    }
  }
  .el-submenu__title {
    &:hover {
      background-color: #f3f6f9 !important;
    }
    .el-submenu__icon-arrow {
      color: #b4b8c5;
    }
  }
}
.menuTree {
  .el-menu-item {
    height: 50px;
    line-height: 50px;
    box-sizing: border-box;
  }
  .el-submenu__title {
    height: 50px;
    line-height: 50px;
    box-sizing: border-box;
  }
}
</style>
