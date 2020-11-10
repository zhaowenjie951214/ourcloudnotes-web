<template>
  <div class="left"  @contextmenu.prevent="openMenu($event,null,null)">
    <el-tree
      :data="data"
      node-key="id"
      :highlight-current="true"
      :expand-on-click-node="false"
      @current-change="currentChange"
      @node-contextmenu="openMenu"
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"
      draggable
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
      ref="tree"
    >
      <div class="custom-tree-node" slot-scope="{ node }">
        <div>
          <!-- <i class="el-icon-folder" v-show="!node.expanded"></i><i class="el-icon-folder-opened" v-show="node.expanded"></i> -->
          <div style="float: left;">
          <img
            src="../../assets/left/wenjianjia.png"
            width="20px"
            height="20px"
            v-show="!node.expanded"
          /><img
            src="../../assets/left/huabanfuben.png"
            v-show="node.expanded"
            width="20px"
            height="20px"
          />
          </div>
          <div style="float: right; width:calc(100% - 30px);" v-if="node.label.split('|').length === 1">
            {{ node.label.split("|")[0] }}
          </div>
          <div style="background-color: #398dee;float: right;width:calc(100% - 30px);" v-if="node.label.split('|').length > 1">
            <input
              ref="renameInput"
              v-model="renameLabel"
              class="nodeInput"
              @keyup.enter="renameSubmit(node)"
              @blur="renameSubmit(node)"
            />
          </div>
        </div>
      </div>
    </el-tree>
    <contextmenu :menuNode="menuNodes" @onClick="menuClick" />
  </div>
</template>

<script>
import contextmenu from "../contextmenu";
import * as indexApi from "@/api/left";
import * as middleApi from "@/api/middle";
import eventBus from "../../utils/eventBus";

export default {
  components: { contextmenu },
  data() {
    return {
      data: [],
      menuNode: {},
      node: {},
      renameLabel: "",
      menuNodes: [
        { key: "addNotes", label: "新建笔记" },
        { key: "addFile", label: "新建文件夹" },
        { key: "rename", label: "重命名" },
        { key: "delete", label: "删除" },
      ],
    };
  },
  watch: {
    "$route.params.menuId"(){
      this.setCurrentKey(false)
    },
  },
  mounted() {
    this.setCurrentKey(true);
    eventBus.$on("back", () => {
      this.back();
    });
    eventBus.$on("addNotes", menuNodeId => {
      console.log("menuNodeId",menuNodeId)
      this.addNotes(menuNodeId);
    });
  },
  methods: {
    currentChange(var1, var2) {
      this.$store.commit("visible", false);
      console.log("val1", var1);
      console.log("val2", var2);
      this.$router.push({ name: "indexmenu", params: { menuId: var1.id } });
    },
    handleDragStart(node, ev) {
      console.log("ev", ev);
      console.log("drag start", node);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log("ev", ev);
      console.log("tree drag enter: ", dropNode.label);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log("ev", ev);
      console.log("tree drag leave: ", dropNode.label);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log("ev", ev);
      console.log("tree drag over: ", dropNode.label);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log("ev", ev);
      console.log("tree drag end: ", dropNode && dropNode.label, dropType);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log("ev", ev);
      console.log("tree drop: ", dropNode.label, dropType);
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === "二级 3-1") {
        return type !== "inner";
      } else {
        return true;
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf("三级 3-2-2") === -1;
    },
    show1() {
      alert("触发了右击事件");
    },
    openMenu(event, item, node) {
      console.log("item",);
      console.log(item);
      this.menuNode = item;
      this.node = node;
      if(item != null){
        this.renameLabel = item.label.split("|")[0];
        this.$router.push({ name: "indexmenu", params: { menuId: this.menuNode.id } });
      }
      if (event.clientX > 1800) {
        this.$store.commit("left", event.clientX - 100);
      } else {
        this.$store.commit("left", event.clientX + 1);
      }
      document.addEventListener("click", this.foo); // 给整个document新增监听鼠标事件，点击任何位置执行foo方法
      if (event.clientY > 700) {
        this.$store.commit("top", event.clientY - 30);
      } else {
        this.$store.commit("top", event.clientY - 10);
      }
      this.$store.commit("visible", true);
    },
    addNotes(menuNodeId){
      middleApi
        .createNoteContent({
          menuId: menuNodeId,
          content: "",
          title: "无标题笔记",
          synopsis: "",
        })
        .then((res) => {
          console.log(res);
          this.$router.push({
            name: "indexContent",
            params: { menuId: this.menuNode.id, Id: res.data },
          });
          eventBus.$emit("getNoteContentMenuId");
        });
    },
    menuClick(item) {
      if (item.key === "addNotes") {
        this.addNotes(this.menuNode.id);
      } else if (item.key === "addFile") {
        console.log(item.key);
        // this
        const newChild = { id: 0, label: "新建文件夹|", children: [] };
        if (!this.menuNode.children) {
          this.$set(this.menuNode, "children", []);
        }
        indexApi
          .createNotesMenu({ parentId: this.menuNode.id, label: "新建文件夹" })
          .then((res) => {
            console.log(res);
            newChild.id = res.data.id;
            this.menuNode.children.push(newChild);

            console.log(this.$refs.tree.store.nodesMap);
            this.$refs.tree.store.nodesMap[this.menuNode.id].expanded = true;

            this.menuNode = newChild;
            this.renameLabel = this.menuNode.label.split("|")[0];
            this.timer = setTimeout(() => {
              //设置延迟执行
              console.log(this.$refs.renameInput);
              this.$refs.renameInput.focus();
            }, 100);
          });
      } else if (item.key === "rename") {
        this.menuNode.label += "|rename";
        this.timer = setTimeout(() => {
          //设置延迟执行
          console.log(this.$refs.renameInput);
          this.$refs.renameInput.focus();
        }, 100);
      } else {
         this.$confirm('此操作将永久删除该文件夹, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          indexApi.deleteNotesMenu({ id: this.menuNode.id }).then((res) => {
            console.log(res);
            const parent = this.node.parent;
            console.log("parent", parent);
            const children = parent.data.children || parent.data;
            const index = children.findIndex((d) => d.id === this.menuNode.id);
            children.splice(index, 1);
          });
        }).catch(() => {       
        });
      }
    },
    renameSubmit(node) {
      console.log(node)
      if (this.renameLabel != null && this.renameLabel != "") {
        indexApi.updateNotesMenu({ id: this.menuNode.id, label: this.renameLabel }).then(
          (res) => {
            console.log(res);
            this.menuNode.label = this.renameLabel;
            this.renameLabel = "";
          },
          (err) => {
            console.log("err", err);
            this.menuNode.label = this.menuNode.label.split("|")[0];
            this.renameLabel = "";
          }
        );
      } else {
        this.menuNode.label = this.menuNode.label.split("|")[0];
        this.renameLabel = "";
      }
    },
    setCurrentKey(type){ 
      const meunId = this.$route.params.menuId;
      console.log("meunId",meunId)
      indexApi.tree({id:meunId}).then((res) => {
        if(type)
          this.data = res.data.menuTrees;
        this.$nextTick(() => {
          console.log(meunId);
          if(res.data.ids!=null && res.data.ids!="")
          {
            var ids = res.data.ids.split(",")
            for(var i = 0;i<ids.length-1;i++){
              this.$refs.tree.store.nodesMap[ids[i]].expanded = true;
            }
          }
          if (meunId != null) this.$refs.tree.setCurrentKey(meunId);
        });
      });
   },
   openTreeNodes(id){
      this.$refs.tree.store.nodesMap[id.parentId].expanded = true;
      this.$refs.tree.setCurrentKey(id.id);
   },
   back(){
    let currentNode = this.$refs.tree.getCurrentNode()
    console.log(currentNode)
    if(currentNode.parentId != null && currentNode.parentId > 0)
    this.$router.push({ name: "indexmenu", params: { menuId: currentNode.parentId } })
   }
  },
};
</script>

<style lang="scss">
.el-tree {
    background: #f5f5f5!important;
}

/*设置字体大小*/
.custom-tree-node {
  width: 100%;
  font-size: 12px;
  font-weight: 400;
  font-family:"Helvetica Neue", "Hiragino Sans GB", "Microsoft Yahei", "WenQuanYi Micro Hei", sans-serif;
}
/*设置鼠标悬浮经过的颜色*/
// .el-tree-node:hover > .el-tree-node__content {
//   background-color: #1C222B !important;
// }
// /*设置鼠标点击后的颜色*/
// .el-tree-node:focus > .el-tree-node__content {
//   background-color: #398dee !important;
// }
// .is-focusable {
//   color: azure !important;
// }

/*设置tree每行的高度*/
.el-tree-node__content {
  height: 30px;
}
.custom-tree-node img {
  vertical-align: middle;
}
.nodeInput {
  width: calc(100% - 6px);;
}
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color: #398dee;
    color: #fff !important;
}
.el-tree {
    color: #2c3e50;
}
</style>