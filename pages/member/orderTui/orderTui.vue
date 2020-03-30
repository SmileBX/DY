<template>
	<view class="order">
		<view class="list pw3">
			<view class="order_item bg_fff mt2" v-for="(item,index) in list" :key="index" @click="goUrl('/pages/member/orderDetail/orderDetail?id='+item.OrderNumber)">
				<view class="flex justifyContentBetween flexAlignCenter">
					<view>
						<image src="../../../static/my/shop.png" class="logo"></image>
						<text class="uni-bold shop_name">{{item.ShopName}}</text>
						<text class="iconfont icon-arrow_r font18"></text>
					</view>
					<view class="color_red font18">{{item.OrderStatusName}}</view>
				</view>
				<view class="flex justifyContentBetween mt2">
					<image :src="item.ProductImg" class="img mr2"></image>
					<view class="flex1 order_info">
						<view>{{item.ProductName}}</view> 
						<view class="color_gray font18">{{item.ProductSkuName}}</view> 
						<view class="flex justifyContentBetween flexAlignCenter mt1">
							<text class="color_gray">x{{item.ProductCount}}</text>
							<text>¥{{item.UnitPrice}}</text>
						</view>
					</view>
				</view>
				<view class="text_right mt2">实付：¥<span class="font32 uni-bold">{{item.UnitPrice}}</span></view>
				<view class="btn flex justifyContentEnd">
					<view class="btn_r" v-if="item.Ispay==1" @click.stop="goUrl('/pages/member/applyReturn/applyReturn?orderNo='+item.OrderNumber)">售后详情</view>
				</view>
			</view>
			<noData :isShow="isnNoData"></noData>
		</view>
	</view>
</template>

<script>
	import {host,post,get,toLogin} from '@/common/util.js';
	import noData from '@/components/noData.vue'; //暂无数据
	export default{
		components: {
			noData
		},
		data(){
			return{
				page:1,
				pagesize:3,
				list:[],
				isnNoData:false,
				isOver:false,
			}
		},
		onShow() {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.list = []
			this.page = 1
			this.isOver = false
			this.isnNoData = false
			if (toLogin()) {
			    this.getList();
			}
		},
		methods:{
			goUrl(url){
			  wx.navigateTo({
				url:url
			  })
			},
			getList(){
			  post('Order/RefundOrderList',{
				UserId:wx.getStorageSync("userId"),
				Token:wx.getStorageSync("token"),
				Page:this.page,
				PageSize:this.pagesize,
			  }).then(res=>{
				if(res.code===0){
				  this.list.push(...res.data)
				  if(res.count == 0){
					this.isnNoData = true
				  }
				  if(res.count<=this.isOver){
					this.isOver = true;console.log(this.isOver)
				  }
				}
			  })
			}
		},
		onReachBottom(){console.log(this.isOver,this.isnNoData)
		    if(!this.isOver&&!this.isnNoData){
		      this.page++
		      this.getList()
		    }
		  },
	}
	
</script>

<style lang="scss" scoped>
	.order_item{
		padding:20upx;border-radius:15upx;
		.shop_name{
			margin:0 10upx;
		}
		.logo{
			width:32upx;height:28upx;
		}
		.img{
			width:162upx;height:162upx;
		}
		.order_info{
			padding: 10upx 0;
		}
		.btn{
			padding:10upx 0;
			view{
				width:145upx;height:60upx;line-height: 60upx;font-size:24upx;
				text-align: center;
				border-radius:10upx;
				margin-right:20upx;
				&:last-child{margin-right: 0;}
			}
			.btn_g{
				border:1upx solid #999999;
			}
			.btn_r{
				background: #ff3333;color:#ffffff;
			}
			
		}
	}
</style>
