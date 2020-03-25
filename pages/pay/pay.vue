<template>
	<view>
		 <view class="payinfo">
		    <view class="p1">待付款金额</view>
		    <view class="p2"><text class="yuan">￥</text><text class="payprice">655</text></view>
		    <!-- <div class="countTiem">支付剩余时间</div> -->
		  </view>
		  <view class="pay-hd uni-mb10">选择支付方式</view>
		  <view class="pay-bd line-list">
		    <view class="line-item flex-between active">
		      <view class="item-l flex-start">
		        <view class="icon icon_weixin"></view>
		        <view class="lab">微信支付</view>
		      </view>
		      <view class="item-r">
		        <view style="margin: 0;" class="IconsCK IconsCK-radio checked"></view>
		      </view>
		    </view>
		    <view class="line-item flex-between">
		      <view class="item-l flex-start">
		        <view class="icon icon_alipay"></view>
		        <view class="lab">支付宝</view>
		      </view>
		      <view class="item-r">
		        <view style="margin: 0;" class="IconsCK IconsCK-radio"></view>
		      </view>
		    </view>
		    <view class="line-item flex-between">
		      <view class="item-l flex-start">
		        <view class="icon icon_yinlian"></view>
		        <view class="lab">银联支付</view>
		      </view>
		      <view class="item-r">
		        <view style="margin: 0;" class="IconsCK IconsCK-radio"></view>
		      </view>
		    </view>
		    <view class="line-item flex-between">
		      <view class="item-l flex-start">
		        <view class="icon icon_yue"></view>
		        <view class="lab">余额支付</view>
		      </view>
		      <view class="item-r">
		        <view style="margin: 0;" class="IconsCK IconsCK-radio"></view>
		      </view>
		    </view>
		  </view>
		<view class="ftbtn" style="padding:20upx;">
		    <view class="btn" @click="tolink('/pages/payresult/payresult')">立即支付</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
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
	page{ background: #fff;}
  .ftbtn{
    position: fixed;
	width: 100%;
	bottom: 0;
	left: 0;
  }
  .ftbtn .btn{ height: 80upx; width: 100%; border-radius: 16upx; background: #FF3333; display: flex; justify-content: center; align-items: center; flex-direction: column; font-size: 30upx; color:  #fff;}
  .payinfo{ background: #ff3333; text-align: center; color: #fff; padding: 40upx 0;}
  .payinfo .p1{font-size: 32upx;}
  .payinfo .p2{ font-size: 80upx; line-height: 1.5}
  .payinfo .p2 .yuan{ font-size: 40upx}
  .countTiem{ background: rgba(255,255,255,.2); border-radius: 100px; padding: 4upx 30upx; display: inline-block;}
  .pay-hd{ padding: 20upx 20upx 0; font-size: 32upx; font-weight: 600}
  .pay-bd .line-item .icon {
      height: 72upx;
      width: 72upx;
  }
  .pay-bd .line-item .lab{ padding-left: 20upx; font-size: 30upx}
  .icon_alipay {
      background: url(../../static/icons/pay_alipay.png) center center no-repeat;
      background-size: cover;
  }
  .icon_weixin {
      background: url(../../static/icons/pay_weixin.png) center center no-repeat;
      background-size: cover;
  }
  .icon_yinlian {
      background: url(../../static/icons/pay_yinlian.png) center center no-repeat;
      background-size: cover;
  }
  .icon_yue {
      background: url(../../static/icons/pay_yue.png) center center no-repeat;
      background-size: cover;
  }
  .real-ipt{ width: 400upx; margin: 0 auto; font-size: 36upx;border: 1px solid #ddd; padding: .1rem;}
</style>
