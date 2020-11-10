<template>
  <li>
    <div @click="toggle" @dblclick="changeType">
      <!-- isFolder判断是否存在子级改变图标 -->
      <i
        v-if="isFolder"
        uk-animation-=""
        class="fa"
        :class="[open ? 'fa-folder-open' : 'fa-folder']"
      ></i> 
      <i v-if="!isFolder" class="fa fa-file-image-o"></i>
      {{ model.menuName }}
      <i
        v-if="isFolder"
        class="fa"
        :class="[open ? 'fa-chevron-down' : 'fa-chevron-right']"
        style="display: inline-block; float: right; padding: 13px 20px 0 0"
      ></i>
    </div>

    <ul v-show="open" v-if="isFolder">
      <tree-menu
        v-for="(item, index) in model.children"
        :model="item"
        :key="index"
      ></tree-menu>
      <!-- <li class="add" @click="addChild">
        <i class="fa fa-plus-square-o" style="padding-left: 20px">
          <i style="display: inline-block; padding-left: 20px">add</i>
        </i>
      </li> -->
    </ul>
  </li>
</template>

<script>
import "../../../assets/font-awesome/css/font-awesome.min.css";
import Vue from "vue";
export default {
  name: "treeMenu",
  props: ["model"],
  data() {
    return {
      open: false,
    };
  },
  computed: {
    isFolder: function () {
      return this.model.children && this.model.children.length;
    },
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open;
      }
    },
    changeType: function () {
      if (!this.isFolder) {
        Vue.set(this.model, "children", []);
        this.addChild();
        this.open = true;
      }
    },
    addChild: function () {
      this.model.children.push({
        name: "new stuff",
      });
    },
  },
};
</script>

<style scoped>
ul {
  line-height: 40px;
  list-style-type: dot;
}
li div:active,
li div:hover {
  background: #9fdabe;
  color: #eee;
}
ul li:hover {
  background: #a6c2b0;
}
.fa-folder-open,
.fa-folder,
.fa-file-image-o {
  padding: 0 20px;
}
ul li {
    padding-left: 10px;
    list-style: none;
}
</style>