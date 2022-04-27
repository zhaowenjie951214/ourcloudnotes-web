<template>
  <div class="right" id="right" style="background-color: #F7F7F7;">
    <input ref="titleInput" style="width: calc(100% - 20px - 46px);border: none;height: 40px;padding-left: 20px; outline: none;" v-if="tinymceStatus" v-model="noteContent.title" :disabled="!editStatus" @keydown="showContent" @keyup.enter="saveContent"/>
    <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" circle size="small" @click="editStatus = true" v-if="tinymceStatus && !editStatus"></el-button>
    <el-button style="margin-left: 10px;" type="success" icon="el-icon-check" circle size="small" @click="saveContent()" :loading="editStatusLoading" v-if="tinymceStatus && editStatus"></el-button>
    <tinymce-editor
      ref="tinymceEditor"
      v-if="tinymceStatus && editStatus" 
      :init="init"
      v-model="noteContent.content"
      @onKeyDown="showContent"
      @onClick="closeMenu"
    ></tinymce-editor>
     <iframe  @dbclick="editStatus = true" class="tox-tinymce" ref="tox-tinymce" v-if="tinymceStatus && !editStatus"  :src="VUE_APP_BASE_API +'notes/content/show/'+noteContentId" frameborder="0" ></iframe>
  </div>
</template>

<script>
//添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
import Editor from "@tinymce/tinymce-vue";
import * as rightApi from "@/api/right";
import eventBus from '../../utils/eventBus'
export default {
  components: {
    "tinymce-editor": Editor,
  },
  data() {
    return {
      editStatusLoading:false,
      editStatus:false,
      noteContentId:0,
      VUE_APP_BASE_API: process.env.VUE_APP_BASE_API,
      noteContent:{
        content: "",
      },
      tinymceStatus:false,
      init: {
        menubar: false,
        // toolbar:
        //   "undo redo | fullscreen | formatselect alignleft aligncenter alignright alignjustify | link | numlist bullist | image media table | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |",
        // toolbar_drawer: "sliding",
        toolbar:
          "undo redo | formatselect alignleft aligncenter alignright alignjustify forecolor backcolor bold italic underline strikethrough| numlist bullist | link |fontselect fontsizeselect | indent outdent | superscript subscript | removeformat |",
        toolbar_drawer: "sliding",
        quickbars_selection_toolbar:
          "removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor",
        plugins: "link image media table lists fullscreen quickbars",
        language: "zh_CN",
        height: "calc(100vh - 90px)",
        file_picker_callback: this.file_picker_callback,
      },
    };
  },
  watch: {
    "$route.params.Id": "getNoteContent",
  },
  mounted() {
    this.getNoteContent();
  },
  methods: {
    show(){
      alert("2342342")
    },
    getContentText(msg) {
          msg = msg.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
          msg = msg.replace(/[|]*\n/, '') //去除行尾空格
          msg = msg.replace(/&npsp;/ig, ''); //去掉npsp
          return msg;
      },
    getNoteContent() {
      this.editStatus = false;
      const Id = this.$route.params.Id;
      if (Id != null) {
        this.noteContentId = Id;
        rightApi.getNoteContent(Id).then((res) => {
          console.log(res);
          this.noteContent = res.data;
          this.tinymceStatus = true;
        });
      } else {
        this.noteContent.content = "";
        this.tinymceStatus = false
      }
    },
    closeMenu() {
      this.$store.commit("visible", false);
    },
    showContent(e) {
      //可以判断是不是mac，如果是mac,ctrl变为花键
      //event.preventDefault() 方法阻止元素发生默认的行为。
      if (
        (e.key == "s" || e.key == "S") &&
        (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
      ) {
        e.preventDefault();
        this.saveContent();
      }
    },
    saveContent(){
      this.editStatusLoading = true
      var content = this.noteContent.content
      this.noteContent.synopsis = this.getContentText(content).substr(0,100)
      console.log(this.noteContent)
      rightApi.updateNoteContent(this.noteContent)
        .then(res => {
          eventBus.$emit("getNoteContentMenuId")
          this.$notify({
            title: '保存成功',
            message: '笔记内容保存成功，自动签入',
            type: 'success'
          })
          this.editStatus = false
          setTimeout(() =>{
            this.$refs["tox-tinymce"].contentWindow.location.reload(true)
            this.editStatusLoading = false
          },1);
          
        })
        this.$refs["titleInput"].blur() 
    },
    file_picker_callback(callback, value, meta) {
      //文件分类
      var filetype =
        ".pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4";
      //后端接收上传文件的地址
      var upurl = "";
      //为不同插件指定文件类型及后端地址
      switch (meta.filetype) {
        case "image":
          filetype = ".jpg, .jpeg, .png, .gif";
          upurl = process.env.VUE_APP_BASE_API + "uploadImage";
          break;
        case "media":
          filetype = ".mp3, .mp4";
          upurl = process.env.VUE_APP_BASE_API + "uploadFile";
          break;
        case "file":
          upurl = process.env.VUE_APP_BASE_API + "uploadFile";
          break;
      }
      //模拟出一个input用于添加本地文件
      var input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", filetype);
      input.click();
      input.onchange = function () {
        var file = this.files[0];
        var xhr, formData;
        console.log(file.name);
        xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.open("POST", upurl);
        xhr.setRequestHeader('token','token_admin');

        xhr.onload = function () {
          var json;
          if (xhr.status != 200) {
            // failure("HTTP Error: " + xhr.status);
            return;
          }
          json = JSON.parse(xhr.responseText);
          // if (!json || typeof json.location != "string") {
          //   // failure("Invalid JSON: " + xhr.responseText);
          //   return;
          // }
          switch (meta.filetype) {
            case "image":
              callback(process.env.VUE_APP_IMGE_URL + json.data.bigurl);
              break;
            case "media":
              callback(json.data);
              break;
            case "file":
              callback(json.data);
            break;
      }
          
        };
        formData = new FormData();
        formData.append("file", file, file.name);
        xhr.send(formData);
      };
    },
  },
};
</script>

<style>
.tox-tinymce {
  border: 0px!important; 
  border-radius: 0px;
  border-top: 1px solid #e0e1e5!important;
  height:calc(100vh - 90px);
  width: 720px;
  /* background-color: red; */
  float: left;
}
</style>