<template>
	<div id="app">
		<!-- <com-header></com-header> -->

		<router-view class="container"/>
	</div>
</template>

<script>
	export default {
		name: "App",
	};
</script>

<style lang="scss" scoped>
	#app {
		font-family: "Avenir", Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;


		// 内容区
		>.container{
			// background-color: pink;
		}
	}
</style>

