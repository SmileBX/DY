<template>
	<view class="order">
		<view class="bg_fff tabList flex">
			<view v-for="(item,index) in tabList" :key="index" class="item" :class="{'active':index==tabIndex}"  @click="cliTab(index)">{{item.name}}</view>
		</view>
		<view class="list pw3">
			<!--
			等待买家付款:取消订单 立即支付
			买家已付款/交易关闭:无状态
			卖家已发货：查看物流 确认收货
			交易成功：查看物流 评价
			退款成功/退款中：退款详情
			-->
			<view class="order_item bg_fff mt2" v-for="(item,key) in 4" :key="key">
				<view class="flex justifyContentBetween flexAlignCenter">
					<view>
						<image src="../../../static/my/shop.png" class="logo"></image>
						<text class="uni-bold shop_name">炫宝迪旗舰店</text>
						<text class="iconfont icon-arrow_r font18"></text>
					</view>
					<view class="color_red font18">等待买家付款</view>
				</view>
				<view class="flex justifyContentBetween mt2">
					<image src="../../../static/of/4.png" class="img mr2"></image>
					<view class="flex1 order_info">
						<view>ICL晶体植入术</view> 
						<view class="color_gray font18">杭州芯美昕医疗美容门诊</view> 
						<view class="flex justifyContentBetween flexAlignCenter mt1">
							<text class="color_gray">x1</text>
							<text>¥6800</text>
						</view>
					</view>
				</view>
				<view class="text_right mt2">总计：¥<span class="font32 uni-bold">6800.00</span></view>
				<view class="btn flex justifyContentEnd">
					<view class="btn_g">取消订单</view>
					<view class="btn_r">立即支付</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {host,post,get,toLogin} from '@/common/util.js';
	export default{
		data(){
			return{
				tabList:[{id:0,name:'全部'},{id:1,name:'待付款'},{id:2,name:'待发货'},{id:3,name:'待收货'},{id:4,name:'待评价'}],
				tabIndex:0,
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
			this.tabIndex = this.$mp.query.tabIndex
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
			cliTab(index){
			  this.tabIndex = index
			  this.page=1;
			  this.list=[];
			  this.isOver = false
			  this.isnNoData = false
			  this.getList()
			},
			getList(){
			  post('Order/OrderList',{
				UserId:wx.getStorageSync("userId"),
				Token:wx.getStorageSync("token"),
				Page:this.page,
				PageSize:this.pagesize,
				Status:this.tabIndex,
				// Type:0,
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
			},
		}
	}
	
</script>

<style lang="scss" scoped>
	@import './style'
</style>
