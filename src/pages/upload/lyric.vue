<template>
  <main>
    <form class="upload-form" ref="uploadForm">
      <p>上传歌词: /www/lyric/lyrics/ 文件夹下</p>
      <label
        class="fileBox"
        for="fileInput"
        :class="{ empty: !file.base64 }"
        :style="{ 'background-image': `url(${file.base64})` }"
      >
        <span class="fileName">{{ file.name }}</span>
        <input
          id="fileInput"
          type="file"
          name="fileInput"
          accept="image/png, image/jpeg"
          @change="loadFile"
        />
      </label>
    </form>

    <hr />

    <h4>普通上传</h4>
    <button class="btn upload-btn" @click="normalUpload">put上传</button>

    <hr />

    <h4>断点续传</h4>
    <multiupload-btn
      :has="!!tempCheckPoint"
      :loading="loading"
      @upload="multipartUpload"
      @continue="multipartUpload"
      @pause="multipartUploadPause"
    >
      {{ percent + "%" }}
    </multiupload-btn>

    <hr />
  </main>
</template>

<script>
import MultiuploadBtn from "./multiupload-btn";

import { createOSSClient } from "../../common/oss-client.class";
const ossPath = "/www/lyric/lyrics/";
const emptyIcon =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAV1BMVEUAAAC/v7++vr7AwMC+vr67u7u+vr6/v7/AwMC+vr6/v7+/v7+/v7+9vb3AwMDAwMC/v7/AwMC/v7/AwMDAwMC/v7+/v7++vr6/v7/AwMC/v7+/v7+/v7/1ubgHAAAAHHRSTlMAd2aZqiIz+wYbXzouRjX15NjMvY5uTH5wQAxESCtj5QAAAOlJREFUeNrt2llqA0EMRVElbbvKPU9uD3n7X2d24CI8CmK4ZwUXgX6EAgAAFF0vhmu4ulWWtQvLkGRKQxjyLNucjYBD8h1GwE3y3YyAVvK1zgom2ZK1irtsezhyI1OTw9PfG8O9DwAAAAAAAODP8vH4quRx5CgaZlU0D1HQJVWVukLAqsrWwnFY1V3jnVHVXf73BGJTZVu810+qauqjYFxU0TJG2dh+V9KOAQAAAAAA8IleZ8MrXP2WZEhbH5ZukmnqwpAX2ZZsBAyS74fXbiPgnGRL5zA0sjXhyCeZTjk8z/1k2J8BAEDBL6sI6d+CD04JAAAAAElFTkSuQmCC";

export default {
  components: {
    MultiuploadBtn
  },
  data() {
    return {
      ossClient: null /* OSSClient */,
      tempCheckPoint: null /* 断点续传的最新分片节点 */,
      loading: false /* 是否上传中 */,
      percent: 0,

      file: {
        name: "",
        base64: emptyIcon
      }
    };
  },
  created() {
    window.vm = this;
  },
  methods: {
    /**
     * 普通上传
     */
    normalUpload() {
      let file = this.fileInput.files[0];
      if (file) {
        let { name = "" } = file;

        /* 建议: 每次上传都创建一份新的client */
        createOSSClient()
          .then(client => {
            return client.put(ossPath + name, file);
          })
          .then(res => {
            this.resetFile();
            this.$message({ message: "上传成功", type: "success" });
            console.log("* 上传成功", res);
          })
          .catch(err => {
            console.error("上传失败", err);
          });
      } else {
        this.$message({ message: "请选择图片", type: "error" });
      }
    },

    /**
     * 断点上传: 开始
     */
    multipartUpload() {
      let that = this;
      let file = this.fileInput.files[0];
      if (file) {
        let { name = "" } = file;

        this.loading = true;
        /* 建议: 每次上传都创建一份新的client */
        createOSSClient()
          .then(client => {
            this.ossClient = client;

            /* 组织参数 */
            let options = {
              progress(
                percent /* 进度 */,
                checkPoint /* 断点, 需缓存, 以备后续续传 */,
                res /* 单片的响应 */
              ) {
                that.percent = Math.floor(percent * 100);
                that.tempCheckPoint = checkPoint; /* 保存当前断点续传的分片节点 */
                console.log("* progress ", that.percent);
              }
            };
            /* 有临时片段 => 是断点续传; 否则是 首次上传 */
            if (this.tempCheckPoint) {
              options.checkpoint = this.tempCheckPoint;
            }
            return this.ossClient.multipartUpload(
              ossPath + name,
              file,
              options
            );
          })
          .then(res => {
            /* 成功后, 触发 */
            this.resetFile();
            this.tempCheckPoint = null;
            this.percent = 0;
            this.$message({ message: "断点上传成功", type: "success" });
            console.log("* 上传成功");
          })
          .catch(err => {
            /* 暂停|失败后, 触发catch */
            console.error("上传catch", err);
          })
          .finally(() => {
            /* 成功|暂停|失败后, 触发finally; 重置变量 */
            console.log("* 上传finally");
            this.ossClient = null;
            this.loading = false;
          });
      } else {
        this.$message({ message: "请选择图片", type: "error" });
      }
    },

    /**
     * 断点续传: 暂停
     */
    multipartUploadPause() {
      if (this.tempCheckPoint && this.ossClient) {
        console.log("* 暂停, ", `已上传 ${this.percent}%`);
        this.ossClient.cancel();
        this.ossClient = null;
        this.loading = false;
      }
    },

    /**
     * 加载完成file
     */
    loadFile({ target }) {
      let file = target.files[0];
      if (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = e => {
          console.log("* reader", reader.result.length);
          this.file.name = file.name;
          this.file.base64 = reader.result;
        };
      }
    },

    /**
     * 恢复file相关
     */
    resetFile() {
      /* 重置input元素 */
      this.$refs.uploadForm.reset();
      console.log("* 重置");
      // this.fileInput.value = ''
      // this.fileInput.outerHTML = this.fileInput.outerHTML;

      this.file.name = "";
      this.file.base64 = emptyIcon;
    }
  },
  computed: {
    /* <input type='file'> */
    fileInput() {
      return this.$refs.uploadForm.fileInput;
    }
  }
};
</script>

<style lang="scss" scoped>
main {
  color: #333;

  .upload-form {
    // outline: 1px solid;
    padding: 0em 1em 1em;
    p {
      text-align: left;
      padding: 1em 0;
    }
    .fileBox {
      width: 140px;
      height: 100px;
      margin: 0 auto;
      overflow: hidden;
      position: relative;
      border: 1px solid rgba($color: lightgray, $alpha: 0.36);
      border-radius: 0.2em;

      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;

      & > * {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      & > .fileName {
        top: 100%;
        transform: translate(-50%, -100%);
        background-color: rgba($color: pink, $alpha: 0.28);
        max-width: 100%;
        width: 100%;
        word-break: break-all;
      }
      #fileInput,
      .icon {
        opacity: 0;

        background-color: lightgray;
        padding: 0.5em;
        -webkit-appearance: none; // 取消 iOS 的内阴影
        -webkit-tap-highlight-color: transparent;
      }
    }
  }

  .upload-btn {
    min-width: 13em;
    padding: 0.5em 1em;
    border-radius: 0.1em;
    background-color: cornflowerblue;
    color: lightgoldenrodyellow;
  }
}
</style>
