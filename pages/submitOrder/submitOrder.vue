<template>
	<view class="wrap">
		<view class="uni-pd10 p_re">
			<view class="addrbox uni-bg-white b_radius uni-mb10">
				<view class="address flex flex-between">
					<view class="local">
						<view class="iconfont icon-dizhi"></view>
					</view>
					<view class="addrdetail">
						<view class="receiver">
							<text>刘华强</text><text>131****2526</text>
						</view>
						<view class="addr">
							广东省深圳市龙华新区民治街道 展滔科技大厦 C座710
						</view>
						<view class="addresstips">(温馨提示：请核对收货地址是否正确)</view>
					</view>
					<view class="next">
						<view class="uni-icon uni-icon-arrowright"></view>
					</view>
				</view>
				<view class="noaddr" v-if="false">
					<view class="icon icon_addr"><image src="../../static/icons/no_addr2.png" mode="widthFix"></image></view>
					<view class="addtxt center">暂无收货地址，点击添加</view>
				</view>
			</view>
			
			<!-- 购物车过来的产品列表 -->
			<view class="procontent b_radius uni-mb10">
				<view>
					<view class="shopbox">
						<view class="iconfont icon-dianpu"></view>
						<text class="shopName">炫宝迪旗舰店</text>
						<view class="uni-icon uni-icon-arrowright"></view>
					</view>
					<view class="outside">
						<view class="pictrueAll">
							<view class="pictrue">
								<image src="../../static/of/2.png" mode="" ></image>
							</view>
						</view>
						<view class="txtBox">
							<view class="title">紫元大厦</view>
							<view class="protype">007oo</view>
							<view class="pronumber">
								<text class="number">x1</text><text class="price">￥13万</text>
							</view>
						</view>
					</view>
					<view class="orderbox">
						<view class="orderinfo">
							<view class="orderleft">运费</view>
							<view class="orderright">
								<block>免邮</block>
							</view>
						</view>
						<view class="orderinfo">
							<view class="orderleft">小计</view>
							<view class="orderright">￥256</view>
						</view>
						<view class="orderinfo">
							<view class="orderleft">券后价</view>
							<view class="orderright">￥255</view>
						</view>
						<view class="orderinfo" style="border: none;">
							<view class="orderleft">订单备注</view>
							<input class="inputtxt" placeholder="填写内容已和商家家协商确认" type="text"/>
						</view>
					</view>			
				</view>
			</view>
			
			<view class="procontent b_radius">
				<view class="orderbox">
					<view class="orderinfo">
						<view class="orderleft">开具发票</view>
						<view class="orderright">
							<view class="infotxt">可开票</view>
							<view class="uni-icon uni-icon-arrowright"></view>
						</view>
					</view>
					<view class="orderinfo" @click="openCoupon">
						<view class="orderleft">优惠券</view>
						<view class="orderright">
							<view class="infotxt">不使用</view>
							<view class="uni-icon uni-icon-arrowright"></view>
						</view>
					</view>
					<view class="allprice">
						<text>共计4件商品</text><text>合计：</text><text>￥2566</text>
					</view>
				</view>
			</view>
			
		</view>
		
		
		<view style="width: 100%;height: 160upx;"></view>
		<view class="footer flex flex-between">
			<view class="footleft">总计：<text class="num"><text class="fz12">￥</text>13万</text></view>
			<view class="footright" @click="golink('/pages/pay/pay')">提交订单</view>
		</view>
		<!-- 优惠券弹窗 -->
		<uni-popup mode="fixed" :show="showCoupon" :h5Top="true" position="bottom" @hidePopup="closeCoupon">
			<view class="couponbox" style="z-index: 10000;">
				<view class="titlebox">
					<view  @click="closeCoupon" class="uni-icon uni-icon-arrowleft" style="font-size: 50upx;color:#333;"></view>
					<text class="title">选择优惠券</text>
				</view>
				<scroll-view scroll-y style="width: 100%;height: 560upx;">
					<view class="coupon">
						<view class="couponitem">
							<view class="couponname">不使用优惠券</view>
							<view style="margin: 0;" class="IconsCK IconsCK-radio checked"></view>
						</view>
						<view class="couponitem" v-for="(item,index) in 2" :key="index">
							<view class="couponname">满减券：省20元
							</view>
							<view style="margin: 0;" class="IconsCK IconsCK-radio"></view>
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {post,get} from '@/common/util.js';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import "@/common/dd_style.css";
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				userId: "",
				token: "",
				orderSType:1,//0立即购买，1购物车
				showCoupon:false,//优惠券弹框
			
			};
		},
		onLoad: function(option) {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.orderSType= uni.getStorageSync("orderSType");
		},
		onShow() {
			
		},
		methods: {
			golink(url){
				uni.navigateTo({
					url:url
				})
			},
			closeCoupon(){
				this.showCoupon=false;
			},
			openCoupon(){
				this.showCoupon=true;
				
			},
				
		}
	}
</script>

<style scoped>
	@import "./style";
</style>
