<template>
	<!-- 全部评价 -->
	<view class="evaluation">
		<view class="minute">
			<view class="given">
				<view class="screen">评分：</view>
				<view class="stars">
					<image class="star" src="../../static/hpicons/collect.svg" mode=""></image>
					<image class="star" src="../../static/hpicons/collect.svg" mode=""></image>
					<image class="star" src="../../static/hpicons/collect.svg" mode=""></image>
					<image class="star" src="../../static/hpicons/collect.svg" mode=""></image>
					<image class="star" src="../../static/hpicons/collect.svg" mode=""></image>
				</view>
				<view class="min">商品好评度99%</view>
			</view>
			<view class="graded">
				<view class="gradedbox">
					<view class="">全部(300)</view>
				</view>
				<view class="gradedbox">
					<view class="">有图(120)</view>
				</view>
				<view class="gradedbox">
					<view class="">好评(68)</view>
				</view>
			</view>
			<view class="below">
				<image class="belowimg" src="../../static/hpicons/arrows2.svg" mode=""></image>
			</view>
		</view>
		<!-- 商品评价详情 -->
		<view class="minute">
			<view class="given">
				<view class="picture" style="padding-right: 10px;">
					<view class="portrait">
						<image src="../../static/hpicons/back.svg" mode=""></image>
					</view>
				</view>
				<view class="screen">筱风月忆</view>
				<view class="stars" style="margin-right: 140rpx;">
					<image class="star" src="../../static/hpicons/collect.svg" mode=""></image>
					<image class="star" src="../../static/hpicons/collect.svg" mode=""></image>
					<image class="star" src="../../static/hpicons/collect.svg" mode=""></image>
					<image class="star" src="../../static/hpicons/collect.svg" mode=""></image>
					<image class="star" src="../../static/hpicons/collect.svg" mode=""></image>
					</view>
				<view class="min">2019-09-08</view>
			</view>
			<view class="carport">医院的服务还不错，环境也很好，做完这个手术之后，看 什么东西都清晰了。术后恢复的挺好的。</view>
			<view class="carportimg">
				<image class="carportimgs" src="" mode=""></image>
				<image class="carportimgs" src="" mode=""></image>
				<image class="carportimgs" src="" mode=""></image>
			</view>
			<view class="">
				<view class=""><image src="" mode=""></image>5786</view>
				<view class=""><image src="" mode=""></image>4633</view>
			</view>
		</view>
	</view>
</template>

<script></script>

<style scoped>
	/* 商品评价详情 */
	.evaluation{
		background: #FFFFFF;
	}
	.minute{
		padding: 30rpx;
		border-bottom: 1rpx solid rgba(237,237,237,1)
	}
	.given{
		display: flex;
		/* padding-left: 22rpx; */
		height:78rpx;
	}
	.stars{
		display: flex;
		margin-top: -8rpx;
	}
	.star{
		width:24rpx;
		height:24rpx;
		margin-left: 15rpx;
		margin-top: 25rpx;
	}
	.min{
		font-size:28rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(255,51,51,1);
	}
	.graded{
		display: flex;
		justify-content: space-around;
		font-size:24rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(51,51,51,1);
	}
	.gradedbox{
		width:152rpx;
		height:56rpx;
		border:1rpx solid rgba(255,51,51,1);
		border-radius:28rpx;
		text-align: center;
	}
	.below{
		display: flex;
		justify-content: center;
		padding-top: 20rpx;
	}
	.belowimg{
		width: 35rpx;
		height: 35rpx;
	}
	.carport{
		font-size:28rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:50rpx;
	}
	.carportimg{
		display: flex;
		margin: 20rpx 0 40rpx 0;
	}
	.carportimgs{
		width:223rpx;
		height:223rpx;
		border-radius:10px;
		background: #00BFFF;
		margin-left: 10rpx;
	}
	.picture{
		display: flex;
		/* padding-top: 15rpx; */
	}
	.portrait{
		width:48rpx;
		height:48rpx;
		border-radius:50%;
		background: #795548;
	}
	
</style>
