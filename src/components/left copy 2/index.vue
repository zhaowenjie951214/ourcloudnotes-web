<template>
  <div class="left">
    <input @click="selectMenu" type="button" value="qweqw"/>
    <!-- <SideBar v-if="menuSelect" ref="child" :menuBgColor="'#F3F6F9'" :menuList="$router.options.routes" /> -->
    <SideBar v-if="menuSelect" ref="child" :menuBgColor="'#F3F6F9'" :menuList="menuList" /> 
  </div>
</template>

<script>
import SideBar from "../el-menu/SideBar";
export default {
  components: { SideBar },
  data() {
    return {
      activePath: this.$route.name,
      menuSelect: true,
      menuList: [
        {
          path: "merchantList",
          title: "商户中心",
          icon: "el-icon-location",
          children: [
            {
              path: "merchantList",
              title: "权限管理",
              icon: "el-icon-location",
            },
            {
              path: "realNamehome",
              title: "企业信息管理",
              icon: "",
            },
            {
              path: "news",
              title: "消息中心",
              icon: "",
              children: [
                {
                  path: "newsList",
                  title: "已读消息",
                  icon: "",
                },
              ],
            },
          ],
        },
      ],
    };
  },
  created(){
    console.log(" console.log(this.$route)")
  },
  updated() {
    this.$nextTick(() => {
      this.setActivePath(this.menuList, this.$route.name);
    });
  },
  methods: {
    setActivePath(links, path) {
      links.some((item, index) => {
        console.log(index);
        if (path === item.path) {
          this.activePath = item.path + "," + item.permissionId;
          return true;
        }
        if (item.actives) {
          if (item.actives.indexOf(path) > -1) {
            this.activePath = item.path + "," + item.permissionId;
            return true;
          }
        }
        if (item.children && item.children.length) {
          this.setActivePath(item.children, path);
        }
        return false;
      });
    },
    selectMenu() {

      this.menuList = [
        {
          path: "merchantList",
          title: "商户中心",
          icon: "el-icon-location",
          children: [
            {
              path: "merchantList",
              title: "权限管理",
              icon: "el-icon-location",
            },
            {
              path: "realNamehome",
              title: "企业信息管理",
              icon: "",
            },
            {
              path: "news",
              title: "消息中心",
              icon: "",
              children: [
                {
                  path: "newsList",
                  title: "已读消息",
                  icon: "",
                  children: [
                    {
                      path: "newsList1",
                      title: "已读消息1",
                      icon: "",
                      children: [
                        {
                          path: "newsList2",
                          title: "已读消息2",
                          icon: "",
                          children: [
                            {
                              path: "newsList3",
                              title: "已读消息3",
                              icon: "",
                              children: [
                                {
                                  path: "newsList3",
                                  title: "已读消息4",
                                  icon: "",
                                  children: [
                                    {
                                      path: "newsList3",
                                      title: "已读消息5",
                                      icon: "",
                                      children: [
                                        {
                                          path: "newsList3",
                                          title: "已读消息6",
                                          icon: "",
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ];
    },
  },
};
</script>

<style lang="scss">
</style>