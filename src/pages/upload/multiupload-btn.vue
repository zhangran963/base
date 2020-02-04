<template>
  <div>
    <button v-if="!has && !loading" class="btn" @click="$emit('upload')">
      MultipartUpload上传
    </button>
    <button v-else-if="has && !loading" class="btn" @click="$emit('continue')">
      MultipartUpload续传 <slot></slot>
    </button>
    <button v-else class="btn" @click="$emit('pause')">
      MultipartUpload暂停 <slot></slot>
    </button>
  </div>
</template>


<script>
export default {
  props: {
    has: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>


<style lang="scss" scoped>
.btn {
  min-width: 13em;
  padding: 0.5em 1em;
  border-radius: 0.1em;
  background-color: cornflowerblue;
  color: lightgoldenrodyellow;
}
</style>