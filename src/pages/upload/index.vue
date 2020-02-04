<template>
  <main>
    <!-- <el-upload class="upload-demo" drag :action="uploadUrl" multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload> -->

    <form class="upload-form" ref="uploadForm">
      <input type="file" name="inputBox" />
    </form>

    <button class="btn upload-btn" @click="testCORS">上传</button>
  </main>
</template>

<script>
import Global from "@/common/GLOBAL";
// import ElUpload from "element-ui/lib/upload";

export default {
  // components: { ElUpload },
  data() {
    return {
      uploadUrl: "https://cdn.thesoundofsilence.top",
    };
  },
  mounted() {
    // this.$message({message: 'elementUI 生效', type: 'success'});
    // this.$loading.service({background: 'rgba(0,0,0,0.7)'});
    // this.$global.showLoading = false;
    
  },
  methods: {
    testCORS(e) {
      
    }
  }
};
</script>

<style lang="scss" scoped>
main {
  .upload-form{
    outline: 1px solid;
  }

  .upload-btn{
    padding: 0.5em 1em;
    border-radius: 0.1em;
  }
}
</style>
