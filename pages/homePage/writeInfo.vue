<template>
	<view>
		<view class="slider"></view>
		<view class="bg_fff change_info flex flexColumn flexAlignCenter dot">
			<view>本人或直属亲属是否有去过售楼处或电话咨询售楼处</view>
			<radio-group class="flex justifyContentAround mt2">
				<view class="">
					<radio color="#ffffff"></radio>
					<text>没有</text>
				</view>
				<view class="">
					<radio></radio>
					<text color="#ffffff">没有</text>
				</view>
			</radio-group>
		</view>
		<view class="item bg_fff flex flexAlignCenter justifyContentBetween">
			<text class="left_item">{{infoName}}</text>
			<input type="text" placeholder="请输入联系人姓名" class="flex1 font26 text_right">
		</view>
		<view class="item bg_fff flex flexAlignCenter justifyContentBetween">
			<text class="left_item">{{infoCall}}</text>
			<input type="text" placeholder="请输入联系人手机号" class="flex1 font26 text_right">
		</view>
		<view class="btn_fix" @click="btnSubmit">确定</view>
	</view>
</template>

<script>
	import {
		host,
		post,
		get,
		valPhone
	} from '@/common/util.js';
	export default{
		data(){
			return {
				userId: "",
				token: "",
				infoName:'业主姓名',
				infoCall:'联系手机',
			}
		},
		onLoad(){
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
		},
		onShow(){
			
		},
		methods:{
			
			
		}
	}
</script>

<style lang="scss">
	.change_info{
		padding:40upx 0;
		border-bottom:1upx solid #f5f5f5;
	}
	.item{
		padding:20upx 30upx;border-bottom: 1upx solid #f5f5f5;
		.left_item{
			width:25%;
		}
	}
	.btn_fix{
		background: #ff3333;text-align: center;
		height:88upx;line-height: 88upx;
		width:690upx;margin:100upx auto;
		color:#ffffff;border-radius:15upx;
	}
	input[type = "radio"] {
		display: none;
	}
	
	
</style>
