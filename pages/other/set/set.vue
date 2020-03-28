<template>
	<view>
		<view class="flex flexAlignCenter justifyContentBetween item bg_fff mt2">
			<view>账户和安全</view>
			<view class="iconfont icon-arrow_r font26"></view>
		</view>
		<view class="flex flexAlignCenter justifyContentBetween item bg_fff">
			<view>清理缓存</view>
			<view>63.25M</view>
		</view>
		<view class="flex flexAlignCenter justifyContentBetween item bg_fff">
			<view>关于我们</view>
			<view class="iconfont icon-arrow_r font26"></view>
		</view>
		<view class="flex flexAlignCenter justifyContentBetween item bg_fff">
			<view>软件版本</view>
			<view>63.25.3</view>
		</view>
		<view class="btn_fix" @click="logOut()">退出登录</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods:{
		// 退出登录
		logOut() {
			uni.switchTab({
				url: '/pages/tabBar/index/index'
			});
		}
	}

};
</script>

<style lang="scss">
@import './style';
</style>
