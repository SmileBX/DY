<template>
	<view>
		<view class="flex flexAlignCenter justifyContentBetween item bg_fff mt2">
			<view>账户和安全</view>
			<view class="iconfont icon-arrow_r font26"></view>
		</view>
		<view class="flex flexAlignCenter justifyContentBetween item bg_fff" @click="golink('/pages/other/changeLoginPwd/changeLoginPwd')">
			<view>修改登录密码</view>
			<view class="iconfont icon-arrow_r font26"></view>
		</view>
		<view class="flex flexAlignCenter justifyContentBetween item bg_fff" @click="golink('/pages/other/setpwd/setpwd')">
			<view>设置支付密码</view>
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
		<view class="btn_fix" @click="logout">退出登录</view>
	</view>
</template>

<script>
	import {host,post,get,toLogin} from '@/common/util.js';
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			golink(url){
				if(toLogin()){
					uni.navigateTo({
						url:url
					})
				}
			},
			//退出登录
			logout(){
				uni.setStorageSync("token", ""); //保存的令牌 accessToken
				uni.setStorageSync("userId", ""); //保存用户Id到本地缓存
				uni.setStorageSync("unionid", ""); 
				uni.setStorageSync("openId", ""); 
				uni.setStorageSync("userInfo", "");
				uni.showToast({
					title: "已退出登录",
					icon: "none",
					duration: 2000,
					success: function() {
					  setTimeout(function() {
						  uni.switchTab({
							url: "/pages/tabBar/index/index"
						  });
					  }, 2000);
					}
				});
			},
		}
	}
</script>

<style lang="scss">
@import './style';
</style>
