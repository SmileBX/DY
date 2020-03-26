<template>
	<view>
		<view class="uni-list">
			<block v-for="(item,index) in TypeList" :key="index">
				<view class="uni-list-cell" @click="tolink('/pages/message/messageList/messageList')">
					<view class="uni-media-list">
						<view class="uni-media-list-logo">
							<image class="img" :src="item.TypeImg" mode="aspectFill"></image>
						</view>
						<view  class="uni-media-list-body">
							<view class="uni-media-list-text-top uni-ellipsis">{{item.MsgName}}</view>
							<view  class="uni-media-list-text-bottom uni-ellipsis">
								{{item.NoticeTitle}}
							</view>
						</view>
						<view class="uni-media-list-r">
							<view class="time">{{item.PubTime}}</view>
							<view class="uni-badge uni-badge-red" v-if="item.unCount!=0">{{item.unCount}}</view>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import {host,post,get} from '@/common/util.js';
	export default {
		data() {
			return {
				userId: "",
				token: "",
				TypeList:[{
					TypeImg:'../../../static/icons/notice0.png',
					MsgName:'收益通知',
					NoticeTitle:'您的客户在03/26/ 10:00购物',
					PubTime:'03/26/ 10:00',
					unCount:0
				},{
					TypeImg:'../../../static/icons/notice1.png',
					MsgName:'系统通知',
					NoticeTitle:'欢迎注册会员,快开启省钱模式吧！',
					PubTime:'03/26/ 10:00',
					unCount:0
				}]
			};
		},
		onLoad() {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
		},
		onShow() {
			
		},
		methods:{
			//跳转
			tolink(Url) {
				uni.navigateTo({
					url: Url
				})
			},
		}
	}
</script>

<style scoped>
	.uni-media-list-logo{ width: 100upx; height: 100upx;}
	.uni-media-list-body{ padding: 8upx 0;}
	.uni-media-list-r{ text-align: right; height: 84upx; padding: 8upx 0;}
	.uni-media-list-r .time{ color: #999; line-height: 36upx;}
	.uni-badge-red{ background: #fa3d34;}
	.uni-list-cell::after{left: 150upx;}
</style>
