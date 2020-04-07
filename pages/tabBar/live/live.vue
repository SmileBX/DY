<template>
	<view class="content myCollectPage">
		<image src="http://ddyp.wtvxin.com/static/of/live.png" mode="widthFix" @click="goUrl('/pages/livepush/livepush')"></image>
	</view>
</template>

<script>
	import {host,post,get,toLogin,} from '@/common/util.js';
	export default {
		data() {
			return {
				
			};
		},
		onShow() {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
		},
		components:{
			
		},
		methods: {
			goUrl(url){
				uni.navigateTo({
					url:url
				})
			}
		},
		onPullDownRefresh() { //下拉刷新
		
		},
		onReachBottom() { //上拉加载
			
		}
	}
</script>

<style scoped lang="scss">

</style>
