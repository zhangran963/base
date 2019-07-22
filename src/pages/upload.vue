<template>
	<main>
		<el-upload class="upload-demo" drag :action="uploadUrl" multiple>
			<i class="el-icon-upload"></i>
			<div class="el-upload__text">将文件拖到此处，或
				<em>点击上传</em>
			</div>
			<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
		</el-upload>

		<hr>

		<button @click="testCORS">测试跨域</button>
	</main>
</template>

<script>
	import axios from "axios";
	import Global from "@/common/GLOBAL";
	import ElUpload from "element-ui/lib/upload";

	export default {
		components: { ElUpload },
		data() {
			return {
                uploadUrl: 'https://api.thesoundofsilence.top/base/upload'
            };
		},
		mounted() {
			// this.$message({message: 'elementUI 生效', type: 'success'});
			// this.$loading.service({background: 'rgba(0,0,0,0.7)'});
			// this.$global.showLoading = false;
		},
		methods: {
			testCORS(e){
				axios.post('/upload', {
					name: '四叶草前'
				}).then(res => {
					console.log('测试跨域结果', res);
				})
			}
		}
	};
</script>


<style lang="scss" scoped>
main{

}
</style>


