<template>
	<view class="order_detail">
		<view style="width: 100%;background:#ff3737;" :style="{'height':barHeight+'px'}"></view>
		<view class="top-box">
			<view class="p2">
				<span class="iconfont icon-arrow_r"></span>
			</view>
			<view class="order_statu mt1">
				<view class="statu uni-bold">待发货</view>
				<view class="font18">订单已支付，等待商家发货</view>
			</view>		
		</view>
		<view class="pw3 all_top">
			<!--地址-->
			<view class="site flex flexAlignCenter">
				<image src="../../../static/my/dz.png" class="dz"></image>
				<view class="font18 flex1">
					<view>刘华强 <span class="phone">131****2626</span></view>
					<view>广东 深圳市 龙岗区 坂田街道 雅兰新洲社区学府 花园5期12栋</view>
				</view>
			</view>
			<!--产品信息-->
			<view class="mt2 bg_fff pro_info">
				<view>
					<image src="../../../static/of/shop1.png" class="logo"></image>
					<text>SKG坚硕专卖店</text>
				</view>
				<view class="flex mt2 flexAlignCenter">
					<image src="../../../static/of/2.png" class="img"></image>
					<view class="flex1 main">
						<view class="flex justifyContentBetween">
							<view class="font18">佳兆业新世界大厦</view>
							<view class="font18 color_gray">x1</view>
						</view>
						<view class="flex flexAlignCenter justifyContentBetween">
							<view class="flex flexColumn">
								<view class="font18 color_gray">B1703</view>
								<view>¥2.8万</view>
							</view>
							<view class="font18 color_gray btn_tui">退款</view>
						</view>
					</view>
				</view>
			</view>
			<!--订单明细-->
			<view class="order_info mt2">
				<view class="info_head">
					<view class="flex justifyContentBetween">
						<text>支付方式</text><text>在线支付</text>
					</view>
					<view class="mt1 flex justifyContentBetween">
						<text>商品总价</text><text class="color_red">¥2.8万</text>
					</view>
					<view class="mt1 flex justifyContentBetween head_foot">
						<text>运费</text><text class="color_red">+¥0.00</text>
					</view>
				</view>
				<view class="flex justifyContentBetween mt2">
					<text>实付</text><text class="color_red">¥2.8万</text>
				</view>
			</view>
			<!--订单明细-->
			<view class="order_info mt2">
				<view class="uni-bold">订单信息</view>
				<view class="mt1">
					<view class="flex justifyContentBetween">
						<text>订单编号</text>
						<view>
							<text>A1909282128011450560586T2</text>
							<text class="color_red copy">复制</text>
						</view>
					</view>
					<view class="mt1 flex justifyContentBetween">
						<text>下单时间</text><text>2019-09-28 21:28:02</text>
					</view>
					<view class="mt1 flex justifyContentBetween head_foot flexAlignCenter">
						<text>买家留言</text>
						<input type="text" placeholder="请留言" class="text_right font18">
					</view>
				</view>
			</view>
			<view class="text_center mt2 pp2 bg_fff bor_r15">
				<text class="iconfont icon-xiaoxi1"></text>
				<text>联系客服</text>
			</view>
			<!--待发货申请退款-->
			<view class="text_center mt2 pp2 bg_fff bottom" style="display: none;">
				<text>申请退款</text>
			</view>
			<!--
				待付款：取消订单 立即付款
				待收货：查看物流 确认收货
				待评价：查看物流 去评价
			-->
			<view class="text_center mt2 bg_fff bottom flex justifyContentBetween dobule">
				<view>取消订单</view>
				<view class="btn_add">立即付款</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {host,post,get,toLogin} from '@/common/util.js';
	export default{
		data() {
			return {
				info:{},
				barHeight:0,
				userId: "",
				token: "",
				idOrderNo:"",
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
			var height = plus.navigator.getStatusbarHeight();
			this.barHeight = height;console.log(this.barHeight)
			// #endif
			// #ifdef H5
			this.barHeight = 0;
			// #endif
		},
		onShow() {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.OrderNo = this.$mp.query.id
			if (toLogin()) {
			    this.getDetail();
			}
		},
		methods:{
			getDetail(){
			  post('Order/OrderDetails',{
				UserId:wx.getStorageSync("userId"),
				Token:wx.getStorageSync("token"),
				OrderNo:this.$mp.query.id
			  }).then(res=>{
				this.info = res.data;
			  })
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import './style'
</style>
