<template>
	<!-- 我的钱包 -->
	<view class="wallet">
		<view class="walletbox">
			<view class="reveal">
				<view class="symbol"><span>￥</span>8960.00</view>
				<view class="balance">账户余额(元)</view>
			</view>
		</view>
		<view class="walletbox">
			<view class="drawing across">
				<view class="folds">
					<image class="fold" src="" mode=""></image>
				</view>
				<view class="detail" @click="totransaction">交易明细</view>
				<view class="">
					<image class="arrows" src="../../../static/hpicons/arrows.svg"mode=""></image>
				</view>
			</view>
			<view class="drawing" style="padding-top: 20rpx;">
				<view class="folds">
					<image class="fold" src="" mode=""></image>
				</view>
				<view class="detail" style="padding-right: 66%;" @click="tobankcard">银行卡管理</view>
				<view class="">
					<image class="arrows" src="../../../static/hpicons/arrows.svg" mode=""></image>
				</view>
			</view>
		</view>
		<view class="present">
			<view class="recharge"  @click="totopup">充值</view>
			<view class="recharge" @click="towithdrawal">提现</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		methods:{
			// 充值
			totopup(){
				uni.navigateTo({
					url:'/pages/tabBar/my/topup'
				})
			},
			// 提现
			towithdrawal(){
				uni.navigateTo({
					url:'/pages/tabBar/my/withdrawal'
				})
			},
			// 交易明细
			totransaction(){
				uni.navigateTo({
					url:'/pages/tabBar/my/transaction'
				})
			},
		}
	
	}
</script>

<style scoped>
	.wallet{
	}
	.walletbox{
		margin-top: 20rpx; 
		background: #FFFFFF;
		padding: 30rpx;
	}
	.across{
		padding-bottom: 20rpx;
		border-bottom:1px solid rgba(236,236,236,1);
	}
	.reveal{
		width: 100%;
		height: 300rpx;
		border-radius:30rpx;
		background:rgba(255,51,51,1);
		font-family:PingFang;
		font-weight:bold;
		color:rgba(252,252,252,1);
		text-align: center;
		padding-top: 70rpx;
	}
	.symbol{
		font-size:60rpx;
	}
	.symbol span{
		font-size:40rpx;
	}
	.balance{
		font-size:24rpx;
	}
	.drawing{
		display: flex;
	}
	.fold{
		width:44rpx;
		height:44rpx;
		background: pink;
	}
	.detail{
		font-size:28rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(36,36,36,1);
		padding-left: 25rpx;
		padding-right: 70%;
	}
	.arrows{
		width:22rpx;
		height:19rpx;
		padding-right: 1;
	}
	.present{
		padding: 100rpx 30rpx 0 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-family:PingFang;
		font-weight:500;
		color:rgba(255,255,255,1);
	}
	.recharge{
		width:320rpx;
		height:88rpx;
		background:rgba(255,51,51,1);
		border-radius:10rpx;
		font-size:32rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
</style>
