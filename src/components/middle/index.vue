<template>
  <div id="middle" class="middle">
    <div class="middleHead">
      <img src="../../assets/middle/fanhui.png" width="20px" height="20px" @click="back"/>
      <el-input
        class="middleHeadInput"
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="searchNotes"
      >
      </el-input>
    </div>
    <div
      :class="'middleTitle'"
      v-for="(item, index) in meunData"
      :key="'a' + index"
      @click="currentChangeNoteContentMenu(item.id)"
    >
      <div class="middleTitleLable">
        <img
          width="20px"
          height="20px"
          class="notes"
          src="../../assets/left/wenjianjia.png"
        />
        <div>{{ item.label }}</div>
      </div>
      <div class="middleTitleDate">{{ item.createTime }}</div>
    </div>
    <!-- 笔记列表 -->
    <div
      :class="'middleTitle' + (item.id == $route.params.Id ? ' selected' : '')"
      v-for="(item, index) in noteContentMenu"
      :key="index"
      @click="currentChange(item.id)"
    >
      <div class="middleTitleLable">
        <img
          width="20px"
          height="20px"
          class="notes"
          src="../../assets/middle/notes.png"
        />
        <div>{{ item.title }}</div>
        <el-popconfirm
          title="确定要删除吗？"
          @onConfirm="deleteNoteContent(item)"
        >
          <img
            slot="reference"
            class="delete"
            src="../../assets/left/delete.png"
          />
        </el-popconfirm>
        <a
          target="_blank"
          :href="'http://47.99.105.168:8780/notes/content/export/' + item.id"
          ><img
            class="delete"
            width="18px"
            height="18px"
            src="../../assets/middle/pdf.png"
        /></a>
      </div>
      <div
        class="middleTitleContent"
        v-show="item.synopsis != '' && item.synopsis != null"
      >
        {{ item.synopsis }}
      </div>
      <div class="middleTitleDate">{{ item.createTime }}</div>
    </div>
    <div class="middleBottom" v-if="(meunData.length == 0 && noteContentMenu.length == 0 && $route.params.menuId != null)"> 
        <span>没有找到文件</span><br/>
        <el-button type="warning" size="small" icon="el-icon-plus" @click="addNotes ">新建笔记</el-button>
    </div>
    
  </div>
</template>

<script>
import * as middleApi from "@/api/middle";
import eventBus from "../../utils/eventBus";
export default {
  data() {
    return {
      searchNotes: null,
      meunData: [],
      menuId: null,
      noteContentMenu: [],
    };
  },
  watch: {
    "$route.params.menuId": "getNoteContentMenuId",
  },
  mounted() {
    this.getNoteContentMenuId();
    eventBus.$on("getNoteContentMenuId", () => {
      this.getNoteContentMenuId();
    });
  },
  methods: {
    currentChange(id) {
      this.$router.push({ name: "indexContent", params: { Id: id } });
    },
    getNoteContentMenuId() {
      this.$nextTick(() => {
        this.meunId = this.$route.params.menuId;
        if (this.meunId != null) {
          middleApi.getNoteContentMenuId(this.meunId).then((res) => {
            console.log(res);
            this.noteContentMenu = res.data.contents;
            this.meunData = res.data.menus;
            // if(this.meunData.length>0)
            //   this.$router.push({ name: "indexContent", params: { Id: this.meunData[0].id } });
          });
        }
      });
    },
    addNotes(){
      let menuId = this.$route.params.menuId
      if(menuId >0 ){
        middleApi
        .createNoteContent({
          menuId: menuId,
          content: "",
          title: "无标题笔记",
          synopsis: "",
        })
        .then((res) => {
          this.getNoteContentMenuId()
          this.$router.push({
            name: "indexContent",
            params: { menuId: menuId, Id: res.data },
          });
        });
      }
    },
    deleteNoteContent(item) {
      console.log(item);
      middleApi.deleteNoteContent({ id: item.id }).then((res) => {
        console.log(res);
        item.visible = false;
        this.$router.push({
          name: "indexmenu",
          params: { menuId: this.meunId },
        });
        this.getNoteContentMenuId();
      });
    },
    currentChangeNoteContentMenu(id) {
      this.noteContentMenu = [];
      this.meunData = [];
      this.$router.push({ name: "indexmenu", params: { menuId: id } });
    },
    back(){
      eventBus.$emit("back");
    }
  },
};
</script>

<style scoped>
.middle .middleHead {
  height: 60px;
  /* background-color: red; */
  text-align: center;
  line-height: 60px;
  border-bottom: 1px solid #e0e1e5;
}
.middle .middleHead .middleHeadInput{
  margin-left: 10px;
  width: 270px;
}
.middle .middleHead img{
  vertical-align: middle;
  cursor: pointer;
}
.middleTitle {
  padding: 20px;
  width: 278px;
  /* height: 125px; */
  border-bottom: 1px solid #e0e1e5;
}
.selected {
  background-color: #eaf0fb;
}
.middleTitleLable {
  /* background-color: red; */
  color: #393939;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  font-weight: 400;
  font-family: "Helvetica Neue", "Hiragino Sans GB", "Microsoft Yahei",
    "WenQuanYi Micro Hei", sans-serif;
  /* background-color: red; */
}
.middleTitleLable div {
  width: 216px;
  float: left;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.middleTitleLable .delete {
  float: right;
  cursor: pointer;
}
.middleTitleLable .notes {
  float: left;
  cursor: pointer;
}

.middleTitleContent {
  color: rgb(130, 130, 140);
  font-family: "Helvetica Neue", "Hiragino Sans GB", "Microsoft Yahei",
    "WenQuanYi Micro Hei", sans-serif;
  font-size: 12px;
  font-stretch: 100%;

  /* background-color:rosybrown; */
  padding-top: 10px;

  /* position: relative;
  height: 40px;
  line-height: 20px;    
  overflow: hidden; */
  color: #82828c;
  line-height: 20px;
  margin: 6px 0 0;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  position: relative;
}

/* .middleTitleContent:after {   
  content: "...";
  position: absolute;
  bottom: 0;
  right: 0
} */

.middleTitleDate {
  color: #c2c2c2;
  font-size: 10px;
  padding-top: 10px;
}
.selected {
  background-color: #eaf0fb;
}

.middle .middleBottom{
  padding-top: 36vh;
  height: 60px;
  text-align: center;
}

.middle .middleBottom span{
    color: #868686;
    font-size: 12px;
    margin-top: 5px;
    white-space: nowrap;
}
</style>