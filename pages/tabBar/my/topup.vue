<template>
	<!-- 余额充值 -->
	<view class="wallet">
		<view class="walletbox">
			<view class="drawing across">
				<view class="folds">充值方式</view>
				<view class="card">
					<image class="fold" src="" mode=""></image>
					<view class="detail">招商银行储蓄卡(9632)</view>
					<view class="">
						<image class="arrows" src="../../../static/hpicons/arrows.svg"mode=""></image>
					</view>
				</view>
			</view>
			<view class="across">
				<view class="withdraw">充值金额</view>
				<view class="drawing">
					<view class="sign">¥</view>
					<input class="sign signs" type="text" value="" />
				</view>
			</view>
			<view class="carry">该卡本次最多可充值¥20000</view>
			<view class="present">
				<view class="recharge">确认充值</view>
			</view>
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
		padding-bottom: 30rpx;
		border-bottom:1px solid rgba(236,236,236,1);
	}
	.folds{
		font-size:30rpx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.drawing{
		display: flex;
	}
	.fold{
		width:44rpx;
		height:44rpx;
		background: pink;
	}
	.card{
		display: flex;
		align-items: center;
		padding-left: 20%;
	}
	.detail{
		font-size:30rpx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(102,102,102,1);
		padding-left: 15rpx;
	}
	.arrows{
		width:22rpx;
		height:19rpx;
		margin-left: 20px;
	}
	.present{
		padding: 60rpx 30rpx 0 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-family:PingFang;
		font-weight:500;
		color:rgba(255,255,255,1);
	}
	.recharge{
		width:100%;
		height:88rpx;
		background:rgba(204,204,204,1);
		border-radius:10rpx;
		font-size:32rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.withdraw{
		font-size:30rpx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(51,51,51,1);
		line-height:140rpx;
	}
	.sign{
		font-size:50rpx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.signs{
		display: flex;
		padding: 14rpx 0 0 20rpx;
	}
	.carry{
		font-size:24rpx;
		font-family:PingFang;
		font-weight:500;
		color:#999999;
		padding-top: 25rpx;
	}
		
	
</style>
