<template>
  <div class="right" id="right">
    <input ref="titleInput" style="width: calc(100% - 20px);border: none;height: 40px;padding-left: 20px; outline: none;" v-if="tinymceStatus" v-model="noteContent.title" @keydown="showContent" @keyup.enter="saveContent"/>
    <!-- {{content}} -->
    <tinymce-editor
      ref="tinymceEditor"
      v-if="tinymceStatus" 
      :init="init"
      v-model="noteContent.content"
      @onKeyDown="showContent"
      @onClick="closeMenu"
    ></tinymce-editor>
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
    getContentText(msg) {
          msg = msg.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
          msg = msg.replace(/[|]*\n/, '') //去除行尾空格
          msg = msg.replace(/&npsp;/ig, ''); //去掉npsp
          return msg;
      },
    getNoteContent() {
      const Id = this.$route.params.Id;
      if (Id != null) {
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
      var content = this.noteContent.content;
      this.noteContent.synopsis = this.getContentText(content).substr(0,100)
      console.log(this.noteContent);
      rightApi.updateNoteContent(this.noteContent)
        .then((res) => {
          console.log(res);
          eventBus.$emit("getNoteContentMenuId");
          this.$notify({
            title: '保存成功',
            message: '笔记内容保存成功，自动签入',
            type: 'success'
          });
        })
        this.$refs["titleInput"].blur();
    },
    file_picker_callback(callback, value, meta) {
      //文件分类
      var filetype =
        ".pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4";
      //后端接收上传文件的地址
      var upurl = "http://47.99.105.168:5050/uploadFile";
      //为不同插件指定文件类型及后端地址
      switch (meta.filetype) {
        case "image":
          filetype = ".jpg, .jpeg, .png, .gif";
          upurl = "http://47.99.105.168:5050/uploadImage";
          break;
        case "media":
          filetype = ".mp3, .mp4";
          upurl = "http://47.99.105.168:5050/uploadFile";
          break;
        case "file":
        default:
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
              callback("http://47.99.105.168:8888/"+json.data.bigurl);
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
}
</style>