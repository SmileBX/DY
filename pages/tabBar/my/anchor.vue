<template>
	<!-- 关注主播 -->
	<view class="anchor">
		<view class="head_anch">
			<view class="sear_head">
				<view class="flex search flexAlignCenter">
					<text class="iconfont icon-sousuo1"></text>
					<input type="text" placeholder="请输入商品名称/主播" class="font26">
				</view>
			</view>
			<view class="flex justifyContentAround tab_arch">
				<view>关注</view><view class="active">直播间</view>
			</view>
			<view class="slider"></view>
		</view>
		<view class="anch_view">
			<!--关注-->
			<view class="list" style="display: none;">
				<view class="anchorbox" v-for="(item,index) in 5" :key="index">
					<view class="photos">
						<image class="photo" src="" mode=""></image>
					</view>
					<view class="dig">
						<view class="digs">
							<view class="spirit">筱风月忆</view>
							<view class="school">慈悲如月 温暖如阳</view>
						</view>
						<view class="followed"><span>已关注</span></view>
					</view>
				</view>
			</view>
			<!--直播列表-->
			<view class="list_zb">
				<view class="ach_item flex flexAlignCenter justifyContentBetween" v-for="(item,index) in 5" :key="index" @click="goUrl('/pages/tabBar/live/live')">
					<view class="le_img">
						<image src="../../../static/1.png" class="shop"></image>
						<image src="../../../static/zb.png" class="tip"></image>
					</view>
					<view class="flex flexColumn">
						<view class="title_anch">家居定制整体衣柜定做推拉门 卧室家具</view>
						<view class="flex mt2">
							<image src="../../../static/qq.png" class="ava"></image>
							<view>
								<view class=" color_gray">山大王家居</view>
								<view class="font26 color_gray">佛山</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {host,post,get,toLogin} from '@/common/util.js';
	export default {
		data(){
			return{
				wallet:0,//余额
			}
		},
		onShow() {
			this.wallet=this.$store.state.Wallet;
			//this.wallet=Number(this.wallet).toFixed(2)
		},
		methods:{
			goUrl(url){
				uni.navigateTo({
					url:url
				})
			},
		}
	
	}
</script>

<style scoped lang="scss">
	image{
		margin:0;
	}
	/* #ifndef MP-WEIXIN  */
	.head_anch{
		position: fixed;
		top:80upx;
		left:0;
		width:750upx;
		z-index:200;
		background: #ffffff;
	}
	.anch_view{
		position: relative;
		top:200upx;
	}
	/* #endif */
	/* #ifdef MP-WEIXIN||APP-PLUS */
	.head_anch{
		position: fixed;
		top:0upx;
		left:0;
		width:750upx;
		z-index:200;
		background: #ffffff;
	}
	.anch_view{
		position: relative;
		top:200upx;
	}
	/* #endif */
	.tab_arch{
		padding: 20upx 0;
		.active{
			position: relative;
			&:after{
				position: absolute;
				content: '';
				bottom:-20upx;
				height:4upx;
				width:60upx;
				left:50%;
				background: #ff3333;
				transform: translateX(-50%);
			}
		}
	}
	.sear_head{
		padding:20upx 30upx;
	}
	.search{
		background: #f5f5f5;
		padding:0 20upx;
		border-radius:35upx;
		input{
			height:70upx;
		}
	}
	.list_zb{
		padding:10upx 30upx;
	}
	.ach_item{
		border-bottom: 1upx solid #f5f5f5;
		padding:20upx 0;
		.le_img{
			width:200upx;height:200upx;
			position: relative;
			margin-right:20upx;
			.tip{
				position: absolute;
				top:5upx;left:5upx;
				width:98upx;height:30upx;
			}
			.shop{
				width:100%;height:100%;
			}
		}
		.title_anch{
			font-weight: 600;
			line-height: 1.2;
		}
		.ava{
			width:80upx;height:80upx;
			
		}
	}
	.anchor{
		background: #FFFFFF;
	}
	.anchorbox{
		display: flex;
	}
	.photos{
		padding: 30rpx 20rpx 30rpx 30rpx;
	}
	.photo{
		width:88rpx;
		height:88rpx;
		border-radius:50%;
		background: #CAB38B;
	}
	.dig{
		width: 100%;
		display: flex;
		justify-content: space-between;
		border-bottom: 1rpx solid rgba(236,236,236,1);
		padding: 30rpx 30rpx 0 0;
	}
	.spirit{
		font-size:32rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(51,51,51,1);
	}
	.school{
		font-size:24rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(125,125,125,1);
	}
	.followed{
		display: flex;
		align-items: center;
		width:140rpx;
		height:56rpx;
		background:rgba(247,238,238,1);
		border-radius:8rpx;
		justify-content: center;
		margin-top: 14rpx;
	}
	
	
	
	
	

</style>
