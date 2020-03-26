<template>
	<view class="warp">
		<view class="outside" v-for="(item,index) in orderdetails" :key="index" v-if="showindex==''||showindex==index">
			<block v-if="item.OrderStatusId==1||item.OrderStatusId==2">
				<view class="pictrueAll">
					<view class="pictrue">
						<image :src="item.ProductImg" mode=""></image>
					</view>
				</view>
				<view class="txtBox">
					<view class="title">{{item.ProductName}}</view>
					<view class="protype">{{item.ProductSkuName}}</view>
					<view class="pronumber">
						<text class="price">￥{{item.UnitPrice}}</text><text class="number">x{{item.ProductCount}}</text>
					</view>
				</view>
			</block>
		</view>
		<view class="content">
			<view class="contentitem" @click="gotoreturn(3)">
				<image class="tuihuo" src="http://www.sc-mall.net/static/tuihuan.png"></image>
				<view class="typebox">
					<view class="title">申请换货</view>
					<view class="desc">已收到货，需要更换已收到的货物</view>
				</view>
				<uni-icon size="18" type="arrowright"></uni-icon>
			</view>
			<view class="contentitem addborder" @click="gotoreturn(2)">
				<image class="tuihuo" src="http://www.sc-mall.net/static/tuihuo.png"></image>
				<view class="typebox">
					<view class="title">申请退货退款</view>
					<view class="desc">已收到货，需要退换已收到的货物</view>
				</view>
				<uni-icon size="18" type="arrowright"></uni-icon>
			</view>
			<view class="contentitem addborder" @click="gotoreturn(1)">
				<image class="tuihuo" src="http://www.sc-mall.net/static/tuikuan.png"></image>
				<view class="typebox">
					<view class="title">仅退款</view>
					<view class="desc">未收到货(包含未签收)或卖家协商同意前提下</view>
				</view>
				<uni-icon size="18" type="arrowright"></uni-icon>
			</view>
			
			
		</view>
	</view>
</template>

<script>
	import {host,post,get} from '@/common/util.js';
	import uniIcon from '@/components/uni-icon.vue';
	export default {
		components: {
			uniIcon
		},
		data() {
			return {
				userId:"",
				token:"",
				orderNo:"",
				showindex:"", //单个产品显示的index
				OrderItemId:"",//单个产品的order item id
				orderinfo:{},
				orderdetails:[],
			}
		},
		onLoad:function(option){
			this.orderNo=option.orderNo;
			if(option.OrderItemId){//单个
				this.OrderItemId=option.OrderItemId;
				this.showindex=option.showindex;
			}
		},
		onShow:function(){
			this.userId = uni.getStorageSync("userId");console.log(this.userId)
			this.token = uni.getStorageSync("token");
			this.getOrderDetails();
		},
		methods: {
			//选择申请类型
			gotoreturn(type){
				if(this.OrderItemId==""){
					uni.navigateTo({
						url:"/pages/applyReturn/applyReturn?afterType="+type+"&orderNo="+this.orderNo
					})
				}else{
					uni.navigateTo({
						url:"/pages/applyReturn/applyReturn?afterType="+type+"&orderNo="+this.orderNo+"&OrderItemId="+this.OrderItemId+"&showindex="+this.showindex
					})
				}
			},
			//获取订单详情
			async getOrderDetails(){
				let result = await post("Order/OrderDetails",{
					UserId: this.userId,
					Token: this.token,
					OrderNo: this.orderNo
				})
				if(result.code==0){
					this.orderinfo=result.data;
					this.orderdetails=result.data.orderDetails;
				}
			},
		}
	}
</script>

<style>
	.warp{
		width: 100%;
		height: 100%;
	}
.outside{
	display: flex;
	background-color: #f5f5f5;
	background-color: #fff;
	margin: 0 20upx;
	border-radius: 8upx;
}
.pictrueAll{
	height: 200upx;
}
.outside .pictrue image{
	width: 160upx;
	height: 160upx;
	margin: 20upx;
	border-radius: 6upx;
}
.txtBox{
	width: 510upx;
	padding: 20upx 20upx 0 0;
}
.txtBox .title{
	font-size: 26upx;
  display: flex;
	align-items: center;
	line-height:38upx ;
	height: 76upx;
	color: #333;
}
.txtBox .protype{
	font-size: 23upx;
	color: #999;
}
.typebox .desc{ color: #999; font-size: 26upx;}
.pronumber{
	display: flex;
	justify-content:space-between;
	align-items:center;
}
.pronumber .price{
	color: #FF6666;
	font-size: 28upx;
	font-weight: 500;
}
.pronumber .number{
	color: #333;
	font-size: 23upx;
}
.content{
	background-color: #fff;
	margin: 20upx;
	border-radius: 8upx;
	padding: 20upx;
}
.contentitem{
	display: flex;
	justify-content: flex-start;
	align-items: center;
	
}
.typebox{
	padding: 20upx 0;
	width: 580upx;
}
.tuihuo{
	width: 56upx;
	height: 56upx;
	margin: 0;
	margin-right: 20upx;
}
.addborder{
	border-bottom: #ECECEC 1upx solid;
}
</style>
