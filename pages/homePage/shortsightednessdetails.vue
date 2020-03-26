<template>
	<!-- 近视详情 -->
	<view class="details">
		<!-- 首图展示 -->
		<view class="detailsmap">
			<image src="" mode=""></image>
			<view class="signboard">
				<view class="back" @click="toindex()">
					<image class="backimg" src="../../static/hpicons/back.svg" mode=""></image>
				</view>
				<view class="back" style="margin-left: 450rpx;">
					<image class="cartimg" src="../../static/hpicons/cart.svg" mode=""></image>
				</view>
				<view class="back" style="margin-left: 40rpx;">
					<image class="shareimg" src="../../static/hpicons/share.svg" mode=""></image>
				</view>
			</view>
			<view class="streaming">
				<image class="figure" src="" mode=""></image>
				<view class="closes">
					<image class="close" src="../../static/hpicons/close.svg" mode=""></image>
				</view>
				
				<view class="broadcast">
					<image class="litre" src="../../static/hpicons/close.svg" mode=""></image>
					<view class="">直播中</view>
				</view>
			</view>
			<view class="pagination">1/6</view>
		</view>
		<!-- 价格 位置 展示 -->
		<view class="">
			<view class="listpt">
				<view class="listprice">
					<view class="listm">
						<view class="selling"><span>¥</span>6800</view>
						<view class="original">¥7200</view>
					</view>
					<view class="listm rt">
						<view class="cash">返</view>
						<view class="cashm">¥598</view>
					</view>
				</view>
			</view>
			<view class="discount">
				<view class="merging"><span>拼单折扣</span></view>
				<view class="mergings"><span>专项补贴3%</span></view>
				<view class="payment">68人付款</view>
			</view>
			<view class="site">
				<view class="slogan">ICL晶体植入术</view>
				<view class="area">
					<view class="">ICL晶体植入术又叫有晶体眼后房型人工晶体植入术</view>
					<!-- <view class="">面积：14m -25m</view> -->
				</view>
			</view>
			<view class="purchase">
				<view class="picture">
					<view class="portrait">
						<!-- <image src="../../static/hpicons/back.svg" mode=""></image> -->
					</view>
					<view class="portrait left">
						<!-- <image src="../../static/hpicons/back.svg" mode=""></image> -->
					</view>
					<view class="portrait left">
						<!-- <image src="../../static/hpicons/back.svg" mode=""></image> -->
					</view>
				</view>
				<view class="screen">心善若水</view>
				<view class="make">这些人刚刚购买成功</view>
				<view class="bill">去拼单</view>
			</view>
		</view>
		<!-- 发货选择 -->
<!-- 		<view class="shipments">
			<view class="pick">
				<view class="shipmentsbox">
					<view class="">发货</view>
					<input class="province" type="text" placeholder="广东 广州" disabled>
					<view class="">包邮</view>
					<image class="exemption" style="width: 20rpx; height: 20rpx;" src="../../static/hpicons/arrows.svg" mode=""></image>
				</view>
			</view>
			<view class="pick">
				<view class="shipmentsbox">
					<view class="">规格</view>
					<input class="province" type="text" placeholder="1件" disabled>
					<image class="exemption" style="width: 20rpx; height: 20rpx;" src="../../static/hpicons/arrows.svg" mode=""></image>
				</view>
			</view>
			<view class="pick">
				<view class="shipmentsbox">
					<view class="">参数</view>
					<input class="province" type="text" placeholder="品牌" disabled>
					<image class="exemption" style="width: 20rpx; height: 20rpx;" src="../../static/hpicons/arrows.svg" mode=""></image>
				</view>
			</view>
		</view> -->
		<!-- 品牌介绍 -->
		<view class="needknow">
			<view class="pole"></view>
			<view class="" style="padding: 20rpx 0 30rpx 30rpx;">
				<view class="draws">
					<view class="drawinfo"><image class="drawimg" src="../../static/hpicons/draw.svg" mode=""></image>大单易拼自营</view>
					<view class="drawinfo"><image class="drawimg" src="../../static/hpicons/draw.svg" mode=""></image>产权签约</view>
				</view>
				<view class="draws">
					<view class="drawinfo"><image class="drawimg" src="../../static/hpicons/draw.svg" mode=""></image>退货无忧</view>
					<view class="drawinfo"><image class="drawimg" src="../../static/hpicons/draw.svg" mode=""></image>品牌授权</view>
				</view>
				<view class="draws">
					<view class="drawinfo"><image class="drawimg" src="../../static/hpicons/draw.svg" mode=""></image>7天可退(签约后不可退)</view>
				</view>
			</view>
			<view class="pole"></view>
		</view>
		<!-- 商品评价 -->
		<view class="merchandise">
			<view class="evaluate">
				<view class="">商品评价<span>(3)</span></view>
				<view class="whole" @click="toevaluation('/pages/homePage/evaluation')">查看全部
					<image class="arrows" src="../../static/hpicons/arrows.svg" mode=""></image>
				</view>
			</view>
		</view>
		
		<view class=""></view>
		<!-- 商品评价详情 -->
		<view class="minute">
			<view class="given">
				<view class="picture">
					<view class="portrait">
						<!-- <image src="../../static/hpicons/back.svg" mode=""></image> -->
					</view>
				</view>
				<view class="screen">筱风月忆</view>
				<view class="stars">
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
<!-- 			<view class="pledge">
				<image class="safety" src="../../static/hpicons/safety.svg" mode=""></image>正品保证 
				<span>100%正品 品牌直采</span>
			</view> -->
		</view>
		<view class="pole"></view>
		<!-- 医院信息 -->
		<view class="hospital">
			<view class="information">医院信息</view>
			<view class="reexamine">杭州芯美昕医疗美容门诊</view>
			<view class="establish" style="width: 100%">
				<view class="establish" style="width: 60%">
					<view class="">成立时间</view>
					<view class="quantum">2015-10-12</view>
				</view>
				<view class="establish" style="width: 40%">
					<view class="">治疗室</view>
					<view class="quantum">15个</view>
				</view>
			</view>
			<view class="establish" style="width: 100%">
				<view class="establish" style="width: 60%">
					<view class="">医院面积</view>
					<view class="quantum">1000m <span>2</span></view>
				</view>
				<view class="establish" style="width: 40%">
					<view class="">手术室</view>
					<view class="quantum">8个</view>
				</view>
			</view>
		</view>
		<view class="pole"></view>
		<!-- 地理位置 -->
		<view class="instaPlace">
			<view class="" style="font-size: 32rpx;">地理位置</view>
			<view class="" style="font-size: 32rpx;">杭州芯美昕医疗美容门诊</view>
			<view class="road">杭州市滨江区江虹路1750号信雅达国际A幢3层</view>
			<view class="print">
				<image style="width: 47rpx; height: 47rpx; background: #007AFF;" src="" mode=""></image>
			</view>
		</view>
		<view class="pole"></view>
		
		<view class="pledge" style="padding: 30rpx;">
			<image class="safety" src="../../static/hpicons/safety.svg" mode=""></image>正品保证 
			<span>100%正品 品牌直采</span>
		</view>
		<view class="poles"></view>
		<!-- 商品特别说明 -->
		<view class="explain">
			<!-- <view class="pole"></view> -->
			<view class="especially">
				<view class="especiallys">特别说明</view>
				<view class="activity">
					<view class="">1.</view>
					<view class="">	本次活动的六重豪礼仅限在活动期间下订，并成功购买车位用户享有，权益限量100名，以实际拼付订单的顺序为准;</view>
				</view>
				<view class="activity">
					<view class="">2.</view>
					<view class="">活动权益方法时间:电商礼一价值1000元大单易拼电子消费券将在用户购买车位发票至旗舰店在线客服处审核后2-3个月内,发放至用户钱包;</view>
				</view>
				<view class="activity">
					<view class="">3.</view>
					<view class="">其他豪礼以线下销售客服为准;</view>
				</view>
				<view class="activity">
					<view class="">4.</view>
					<view class="">详情请咨询万科云子代销商在线客服。</view>
				</view>
			</view>
			<view class="pole"></view>
		</view>
		<!-- 拼单流程 -->
		<view class="flow">
			<view class="joint">
				<view class="stream"></view>
				<view class="process">拼单流程</view>
				<view class="stream"></view>
			</view>
			<view class="online">
				<view class="serials">
					<image class="serialimg" src="" mode=""></image>
					<view class="once">1</view>
					<view class="contract">在线选择意向车位编号 及就近签约地点。</view>
				</view>
				<view class="serials">
					<image class="serialimg" src="" mode=""></image>
					<view class="once">2</view>
					<view class="contract">拼单并备注购车位信息 (业主姓名、联系方式)</view>
				</view>
				<view class="serials">
					<image class="serialimg" src="" mode=""></image>
					<view class="once">3</view>
					<view class="contract">凭短信验证码到签约 中心核销完成购车位。</view>
				</view>
			</view>
			<view class="online">
				<view class="serials">
					<image class="serialimg" src="" mode=""></image>
					<view class="once">4</view>
					<view class="contract">成功购车位后将购车位 发票提交至万科云子代. 销商在线客服处审核。</view>
				</view>
				<view class="serials">
					<image class="serialimg" src="" mode=""></image>
					<view class="once">5</view>
					<view class="contract">审核通过后即可获取 大单易拼相关活动权。</view>
				</view>
			</view>
		</view>
		<!-- 图片展砂 -->
		<view class="graphic">
			<view class="pole"></view>
			<view class="brand">图文详情</view>
			<image class="Product" src="" mode=""></image>
			<image class="Product" src="" mode=""></image>
			<image class="Product" src="" mode=""></image>
		</view>
		<!-- 购物价格详细 -->
		<view class="base" style="border-top: 1rpx solid rgba(237,237,237,1);">
			<view class="bases">
				<image class="customer" src="../../static/hpicons/customer.svg" mode=""></image>
				<view class="">客服</view>
			</view>
			<view class="bases">
				<image class="store" src="../../static/hpicons/store.svg" mode=""></image>
				<view class="">店铺</view>
			</view>
			<view class="bases">
				<image class="collect" src="../../static/hpicons/collect.svg" mode=""></image>
				<view class="">收藏</view>
			</view>
			<view class="alone">
				<view class="buy">
					<view class="" style="font-size: 28rpx;">¥3万</view>
					<view class="give">单独购买</view>
				</view>
				<view class="buyr">
					<view class="" style="font-size: 28rpx; margin-left: 10rpx;">¥2.9万</view>
					<view class="" style="font-size: 24rpx; margin-top: -14rpx;margin-left: 10rpx;">我要拼团</view>
					<view class="listm rt buys">
						<view class="cash fa" >返</view>
						<view class="cashm fas">¥2万</view>
					</view>
				</view>
			</view>

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
			toindex(){
				uni.navigateBack({
				    delta: 2
				})
			},
			// 
			toevaluation(Url) {
				uni.navigateTo({
					url: Url
				})
			},
		}
	}
</script>

<style scoped>
	.details{
		/* height: 100vh; */
		background: #FFFFFF;
	}
	.detailsmap{
		width:100%;
		height:700rpx;
		/* background:rgba(67,66,64,1); */
		background: #C0C0C0;
	}
	.signboard{
		display: flex;
		/* justify-content: space-between; */
		padding: 0rpx 24rpx 31rpx 30rpx;
		position: absolute;
		top: 60rpx;
	}
	.back{
		width:66rpx;
		height:66rpx;
		background:rgba(0,0,0,0.2);
		border-radius:50%;
		text-align: center;
	}
	.backimg{
		width:30rpx;
		height:46rpx;
		margin-top: 5rpx;
	}
	.cartimg{
		width:38rpx;
		height:36rpx;
		margin-top: 5rpx;
	}
	.shareimg{
		width:34rpx;
		height:34rpx;
		margin-top: 5rpx;
	}
	/* 直播中 */
	.streaming{
		width:158rpx;
		height:215rpx;
		border-radius:4rpx;
		background: #004098;
		position: relative;
		top: -29%;
		left: 74%;
	}
	.figure{
		width:158rpx;
		height:215rpx;
		border-radius:4rpx;
		background: #CAB38B;
		
	}
	.closes{
		width:30rpx;
		height:30rpx;
		background:rgba(0,0,0,0.6);
		border-radius:4rpx;
		display: flex;
		position: absolute;
		top: 0;
		left: 126rpx;
	}
	.close{
		width:16rpx;
		height:16rpx;
		margin-top: 6rpx;
	}
	/* 直播样式 */
	.broadcast{
		display: flex;
		position: absolute;
		bottom: 0;
		left: 0;
		background:rgba(255,51,51,1);
		width: 100%;
		font-size:24rpx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(255,255,255,1);
	}
	.litre{
		width: 30rpx;
		height: 30rpx;
		margin-top: 12rpx;
	}
	.pagination{
		width:80rpx;
		height:40rpx;
		background:rgba(0,0,0,0.2);
		border-radius:20rpx;
		position: absolute;
		top: 600rpx;
		right: 31rpx;
		line-height: 40rpx;
		text-align: center;
	}
	.listpt{
		padding: 30rpx;
		width: 100%;
	}
	.listprice{
		display: flex;
		justify-content: space-between;
	}
	.listm{
		display: flex;
	}
	.selling{
		font-size:47rpx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(251,79,69,1);
	}
	.selling span{
		font-size:32rpx;
	}
	.original{
		font-size:24rpx;
		font-family:PingFang;
		font-weight:500;
		text-decoration:line-through;
		color:rgba(153,153,153,1);
		margin: 30rpx 0 0 15rpx;
	}
	.rt{
		width:110rpx;
		height:42rpx;
		border:1rpx solid rgba(255,51,51,1);
		border-radius:4rpx;
		
	}
	.cash{
		width:38rpx;
		height:38rpx;
		background:rgba(255,51,51,1);
		border-radius:4rpx 0rpx 0rpx 4rpx;
		font-size:24rpx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(255,255,255,1);
		text-align: center;
	}
	.cashm{
		width:54rpx;
		height:21rpx;
		font-size:24rpx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(255,51,51,1);
		margin-left: 10rpx;
	}
	.discount{
		display: flex;
		font-size:20rpx;
		font-family:PingFang;
		font-weight:400;
		color:rgba(255,102,102,1);
		padding-left: 30rpx;
	}
	.merging{
		width:134rpx;
		height:50rpx;
		background:rgba(255,255,255,1);
		border:1rpx solid rgba(255,102,102,1);
		border-radius:7rpx;
		margin-right: 30rpx;
		line-height: 50rpx;
		position: relative;
	}
	.merging span{
		margin-left: 10rpx;
	}
	.merging:before {
	    display: block;
	    content: "";
	    position: absolute;
	    height: 10rpx;
	    width: 10rpx;
	    border-top: 1rpx solid #f63517;
	    border-right: 1rpx solid #f63517;
	    top: 50%;
		left: -7rpx;
	    margin-top: -4rpx;
	    background: #fff;
	    box-sizing: border-box;
		transform: rotate(45deg);
	}
	.merging:after {
	   display: block;
	       content: "";
	       position: absolute;
	       height: 10rpx;
	       width: 10rpx;
	       border-top: 1rpx solid #f63517;
	       border-right: 1rpx solid #f63517;
	       top: 50%;
		   left: 124rpx;
	       margin-top: -4rpx;
	       background: #fff;
	       box-sizing: border-box;
		transform: rotate(-135deg);
	}
	.mergings{
		width:182rpx;
		height:50rpx;
		background:rgba(255,255,255,1);
		border:1rpx solid rgba(255,102,102,1);
		border-radius:4rpx;
		line-height: 50rpx;
		margin-right: 240rpx;
		position: relative;
	}
	.mergings{
		padding-left: 13rpx;
	}
	.mergings:before {
	    display: block;
	    content: "";
	    position: absolute;
	    height: 10rpx;
	    width: 10rpx;
	    border-top: 1rpx solid #f63517;
	    border-right: 1rpx solid #f63517;
	    top: 50%;
		left: -4rpx;
	    margin-top: -4rpx;
	    background: #fff;
	    box-sizing: border-box;
		transform: rotate(45deg);
	}
	.mergings:after {
	   display: block;
	       content: "";
	       position: absolute;
	       height: 10rpx;
	       width: 10rpx;
	       border-top: 1rpx solid #f63517;
	       border-right: 1rpx solid #f63517;
	       top: 50%;
		   left: 174rpx;
	       margin-top: -4rpx;
	       background: #fff;
	       box-sizing: border-box;
		transform: rotate(-135deg);
	}
	.payment{
		font-size:22rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(153,153,153,1);
		line-height:50rpx;
	}
	.site{
		font-size:26rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(153,153,153,1);
		padding: 0 30rpx 10rpx 30rpx;
	}
	.slogan{
		font-size:36rpx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(51,51,51,1);
		padding-top: 17rpx;
	}
	.area{
		display: flex;
		/* padding: 20rpx 0; */
	}
	.purchase{
		display: flex;
		margin: 30rpx 30rpx 40rpx 30rpx;
		padding-left: 30rpx;
		height:78rpx;
		background:rgba(255,51,51,0.1);
		border-radius:6rpx;
	}
	.picture{
		display: flex;
		padding-top: 15rpx;
	}
	.portrait{
		width:48rpx;
		height:48rpx;
		border-radius:50%;
		background: #795548;
	}
	.left{
		margin-left: -24rpx;
	}
	.screen{
		font-size:24rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height: 78rpx;
		padding-left: 15rpx;
	}	
	.make{
		font-size:22rpx;
		font-family:PingFang;
		font-weight:400;
		color:rgba(153,153,153,1);
		line-height: 78rpx;
		padding:0 74rpx 0 35rpx;
	}
	.bill{
		width:128rpx;
		height:78rpx;
		line-height: 78rpx;
		text-align: center;
		background:rgba(255,51,51,0.14);
		border-radius:0px 6px 6px 0px;
		font-size:32rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(255,51,51,1);
	}
	.pole{
		width:100%;
		height:20rpx;
		background:rgba(242,242,242,1);
	}
	.draws{
		display: flex;
		font-size:28rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(51,51,51,1);
		/* line-height:109rpx; */
	}
	.drawinfo{
		margin-right: 60rpx;
	}
	.drawimg{
		width:31rpx;
		height:31rpx;
		color:rgba(51,51,51,1);
		margin-right: 15rpx;
	}
	.merchandise{
		border:1rpx solid rgba(236,236,236,1);
	}
	.evaluate{
		display: flex;
		padding: 25rpx;
		justify-content: space-between;
		font-size:32rpx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.evaluate span{
		font-size:22rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(153,153,153,1);
	}
	.whole{
		font-size:24rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(255,51,51,1);
	}
	.arrows{
		width:20rpx;
		height:35rpx;
		color:#FF3333;
		margin-left: 10rpx;
	}
	.minute{
		margin: 0 20rpx;
	}
	.given{
		display: flex;
		/* padding-left: 22rpx; */
		height:78rpx;
	}
	.stars{
		display: flex;
		margin-right: 212rpx;
	}
	.star{
		width:24rpx;
		height:24rpx;
		margin-left: 15rpx;
		margin-top: 25rpx;
	}
	.min{
		font-size:26rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(153,153,153,1);
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
	.pledge{
		font-size:32rpx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(255,51,51,1);
		padding: 40rpx 0 20rpx 0;
	}
	.safety{
		width:45rpx;
		height:47rpx;
		margin-right: 5rpx;
	}
	.pledge span{
		font-size:26rpx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(102,102,102,1);
		margin-left: 30rpx;
	}
	.especially{
		padding: 30rpx;
	}
	.especiallys{
		font-size:32rpx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.activity{
		font-size:24rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(51,51,51,1);
		margin-top: 13rpx;
		display: flex;
	}
	.flow{
		margin:75rpx 30rpx 30rpx 30rpx;
		width:690rpx;
		height:755rpx;
		border:2rpx solid rgba(254,143,45,0.3);
		border-radius:30rpx;
	}	
	.process{
		width:320rpx;
		height:65rpx;
		background:linear-gradient(-89deg,rgba(254,142,44,1) 0%,rgba(254,198,76,1) 100%);
		box-shadow:0px 5px 6px 0px rgba(249,61,36,0.42);
		border-radius:33rpx;
		text-align: center;
		font-size:30rpx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(255,255,255,1);
		line-height:65rpx;
	}
	.joint{
		display: flex;
		justify-content: center;
		margin-top: -35rpx;
	}
	.stream{
		width:48rpx;
		height:4rpx;
		background:rgba(249,249,249,1);
		border-radius:2rpx;
		z-index: 11;
		margin: 32rpx -92rpx 0 -88rpx;
	}
	.online{
		display: flex;
	}
	.serials{
		padding: 20rpx;
		text-align: center;
		
	}
	.serialimg{
		width:94rpx;
		height:94rpx;
		border:2rpx solid rgba(251,134,84,1);
		border-radius:50%;
	}
	.once{
		font-size:36rpx;
		font-family:广捷居迷你字库;
		font-weight:400;
		color:rgba(251,132,81,1);
		line-height:43px;
	}
	.contract{
		font-size:5rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(102,102,102,1);
		/* line-height:27rpx; */
	}
	.graphic{
		width:100%;
		padding-top: 14rpx;
	}
	.brand{
		font-size:36rpx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(51,51,51,1);
		line-height:60rpx;
		text-align: center;
		margin: 30rpx;
	}
	.Product{
		width:750rpx;
		height:854rpx;
		background: #00B26A;
		margin-bottom: 20rpx;
	}
	.base{
		padding: 10rpx 30rpx;
		display: flex;
		background: #FFFFFF;
	}
	.bases{
		font-size:22rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(153,153,153,1);
		margin-right: 24rpx;
		text-align: center;
	}
	.customer{
		width:34rpx;
		height:34rpx;
	}
	.store{
		width:36rpx;
		height:33rpx;
	}
	.collect{
		width:34rpx;
		height:34rpx;
	}
	.alone{
		display: flex;
	}
	.buy{
		width:180rpx;
		height:80rpx;
		background:rgba(253,163,58,1);
		border-radius:40rpx 0rpx 0rpx 40rpx;
		font-size:28px;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(255,255,255,1);
		text-align: center;
	}
	.buyr{
		width:260rpx;
		height:80rpx;
		background:rgba(255,51,51,1);
		border-radius:0rpx 40rpx 40rpx 0rpx;
		font-size:28px;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(255,255,255,1);
	}
	.give{
		margin-top: -6rpx;
		font-size:24rpx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(255,255,255,1);
		text-align: center;
		line-height: 24rpx;
	}
	.buys{
		position: relative;
		top: -58rpx;
		left: 128rpx;
		border:1px solid rgba(255,255,255,1);
	}
	.fa{
		color:rgba(255,51,51,1);
		background:rgba(255,255,255,1);
	}
	.fas{
		color:rgba(255,255,255,1);
	}
/* 发货选择 */
	.pick{
		border-bottom:1rpx solid rgba(236,236,236,1);
	}
	.shipmentsbox{
		display: flex;
		justify-content: space-between;
		font-size:30rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(153,153,153,1);
		margin: 30rpx;
	}
	.province{
		width: 500rpx;
		font-size:28rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(51,51,51,1);
		margin-left: 30rpx;
		margin-top: 5rpx;
	}
	.exemption{
		width:24rpx;
		height:40rpx;
		margin-right: 0rpx;
		margin-top: 15rpx;
	}
	/* 医院信息 */
	.hospital{
		padding: 30rpx;
		font-size:28rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(153,153,153,1);
		/* line-height:9px; */
	}
	.information{
		font-size:32rpx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.reexamine{
		font-size:28rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:70rpx;
	}
	.establish{
		display: flex;
	}
	.quantum{
		margin-left: 50rpx;
		font-size:28rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(51,51,51,1);
	}
	/* 地址位置 */
	.instaPlace{
		padding: 30rpx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(51,51,51,1);
		line-height:64rpx;
		position: relative;
	}
	.road{
		font-size:28rpx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(153,153,153,1);
		line-height:72rpx;
	}
	.print{
		position: absolute;
		bottom: 27%;
		right: 8%;
	}
	.poles{
		width:100%;
		height:10rpx;
		box-shadow:0px 3px 5px 0px rgba(0, 0, 0, 0.06);
	}
	
	
	
	
	
	
</style>
