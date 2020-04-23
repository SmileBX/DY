<template>
	<view class="content">
		<view class="regLoginBox" >
			<view class="logo">
				<view class="img">
					<image class="logoimg" src="http://shop.dadanyipin.com/static/logo.png" mode="widthFix"></image>
					<view class="livetitle">商家直播登录</view>
				</view>
			</view>
			<view class="from pd10">
				<view class="from-line">
					<view :class="['iconfont',logintype?'icon-zh1':'icon-shouji']"></view>
					<input type="text" class="ipt" v-model="tel" value="" placeholder="请输入手机号码" />
				</view>
				<view class="from-line" v-if="logintype">
					<view class="iconfont icon-mima"></view>
					<input type="password" class="ipt" v-model="pwd" value="" placeholder="请输入密码" />
				</view>
				<view class="from-line" v-else>
					<view class="iconfont icon-mima"></view>
					<input type="text" class="ipt" value="" v-model="code" placeholder="请输入验证码" />
					<view class="getcode" @click="getCode">{{codeMsg}}</view>
				</view>
				<view class="from-line text_r" style="margin:0;display: none;" @click="changeWay">
					<text class="c_theme" v-if="logintype">手机验证码登录</text>
					<text class="c_theme" v-if="!logintype">密码登录</text>
				</view>
				<view class="ftbtn" style="padding:40upx 0 20upx 0;">
					<button type="primary" @click="btnSubmit" class="btn">登录</button>
				</view>
				<view class="form-line aLine" style="margin:0 30upx;display: none;">
					<view @click="register" class="inline-block aline">没有账号？注册账号</view>
					<view v-if="logintype" @click="getPassword" class="inline-block aline fr">忘记密码?</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {host,post,get,valPhone,setRegular} from '@/common/util.js';
	export default {
		data() {
			return {
				tel:"",
				pwd:"",
				code:"",
				count:"",
				logintype:true,//true表示密码登录，false手机验证码登录
			};
		},
		onShow(){
			
		},
		methods: {
			valOther(){
				if(this.logintype){
					if(this.pwd==""){
						uni.showToast({
						  title: "请输入密码!",
						  icon: "none",
						  duration: 2000
						});
						return false;
					}
					if(this.pwd.length<6){
						uni.showToast({
						  title: "密码长度不能小于6个字符!",
						  icon: "none",
						  duration: 2000
						});
						return false;
					}
				}else{
					if(this.code == ""){
						uni.showToast({
						  title: "请输入验证码!",
						  icon: "none",
						  duration: 2000
						});
						return false;
					}
				}
				return true;
			},
			btnSubmit() {
				if(valPhone(this.tel) && this.valOther()){
					this.login();
				}
			},
			async login(){
				var	result = await post("TencentCloud/ShopLiveByMobile",{
						"mobile": this.tel,
					    "password": this.pwd
					})
				if(result.code===0){console.log(result.data)
					uni.setStorageSync('liveToken', result.data.Token);
					uni.setStorageSync('liveUserId', result.data.UserId);
					let _this = this;
					uni.showToast({
					     title: "登录成功!",
					     icon: "none",
					     duration: 2000,
						 success:function(){
							setTimeout(function() {
								uni.redirectTo({
									url: "/pages/livepush/livepush"
								  });
							 }, 2000);
						 }
					});
				}else{
					uni.showToast({
					  title: result.msg,
					  icon: "none",
					  duration: 2000
					});
				}
			},
		}
	}
</script>
<style>
	@import '../../common/login.css';
	.logo {
		padding: 0 0 80upx;
	}
	
	.logo .img {
		width: 200upx;
		height:200upx;
		margin: 0 auto;
		
	}
	
	.logo .img image {
		width: 100%;
		height: 100%;
		margin:0 auto;
		/* border-radius: 25upx; */
	}
  .content{
	  background:#fff;
	  background-size: 100% 100%;
	  min-height: 100%;
	  position: relative;
	  box-sizing: border-box;
  }
  .regLoginBox{
	  width: 90%;
	  position: absolute;
	  top: 50%;
	  left: 5%;
	  transform: translateY(-50%);
	  border-radius: 20rpx;
	  box-sizing: border-box;
  }
  .from-line{
	  background: #fff;
	  border-radius: 40rpx;
  }
  .livetitle{
	  font-size: 32upx;
	  line-height: 80upx;
	  text-align: center;
	  font-weight: 600;
  }
</style>
