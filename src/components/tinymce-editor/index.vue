<template>
  <div>
    <tinymce-editor
      :init="init"
      v-model="content"
      @onKeyDown="showContent"
      @onClick="closeMenu"
    ></tinymce-editor>
  </div>
</template>

<script>
//添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
import Editor from "@tinymce/tinymce-vue";
export default {
  components: {
    "tinymce-editor": Editor,
  },
  data() {
    return {
      content: "",
      init: {
        menubar: false,
        toolbar:
          "undo redo | fullscreen | formatselect alignleft aligncenter alignright alignjustify | link | numlist bullist | image media table | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |",
        toolbar_drawer: "sliding",
        quickbars_selection_toolbar:
          "removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor",
        plugins: "link image media table lists fullscreen quickbars",
        language: "zh_CN",
        height: "calc(100vh - 52px)",
        file_picker_callback: this.file_picker_callback,
      },
    };
  },
  methods: {
    closeMenu(){
      this.$store.commit('visible',false)
    },
    showContent(e) {
      //可以判断是不是mac，如果是mac,ctrl变为花键
      //event.preventDefault() 方法阻止元素发生默认的行为。
      if (
        (e.key == "s" || e.key == "S") &&
        (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
      ) {
        e.preventDefault();
        alert(this.content);
      }
    },
    file_picker_callback(callback, value, meta) {
      //文件分类
      var filetype =
        ".pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4";
      //后端接收上传文件的地址
      var upurl = "/demo/upfile.php";
      //为不同插件指定文件类型及后端地址
      switch (meta.filetype) {
        case "image":
          filetype = ".jpg, .jpeg, .png, .gif";
          upurl = "upimg.php";
          break;
        case "media":
          filetype = ".mp3, .mp4";
          upurl = "upfile.php";
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
          if (!json || typeof json.location != "string") {
            // failure("Invalid JSON: " + xhr.responseText);
            return;
          }
          callback(json.location);
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
</style>