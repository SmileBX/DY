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
			<view class="order_item bg_fff mt2" v-for="(item,index) in list" :key="index" @click="goUrl('/pages/member/orderDetail/orderDetail?id='+item.OrderNumber)">
				<view class="flex justifyContentBetween flexAlignCenter">
					<view>
						<image src="../../../static/my/shop.png" class="logo"></image>
						<text class="uni-bold shop_name">{{item.ShopName}}</text>
						<text class="iconfont icon-arrow_r font18"></text>
					</view>
					<view class="color_red font18">{{item.StatusName}}</view>
				</view>
				<view class="flex justifyContentBetween mt2" v-for="(ite, ind) in item.OrderDetails" :key="ind">
					<image src="../../../static/of/4.png" class="img mr2"></image>
					<view class="flex1 order_info">
						<view>{{ite.ProductName}}</view> 
						<view class="color_gray font18">{{ite.SpecText}}</view> 
						<view class="flex justifyContentBetween flexAlignCenter mt1">
							<text class="color_gray">x{{ite.Number}}</text>
							<text>¥{{ite.ActualPay}}</text>
						</view>
					</view>
				</view>
				<view class="text_right mt2">总计：¥<span class="font32 uni-bold">{{item.Total}}</span></view>
				<view class="btn flex justifyContentEnd">
					<view class="btn_g" v-if="item.IsCancel==1" @click.stop="chooseOrders(item.OrderNumber,1)">取消订单</view>
					<view class="btn_g" v-if="item.IsDel==1" @click.stop="chooseOrders(item.OrderNumber,2)">删除</view>
					<view class="btn_r" v-if="item.Ispay==1" @click.stop="goUrl('/pages/pay/pay?orderNo='+item.OrderNumber)">立即支付</view>
					<view class="btn_r" v-if="item.IsComment==1" @click.stop="goPinJia(item.OrderDetails,item.OrderNumber)">去评价</view>
					<view class="btn_r" v-if="item.IsConfirmReceipt==1" @click.stop="chooseOrders(item.OrderNumber,3)">确认收货</view>
				</view>
			</view>
			<noData :isShow="isnNoData"></noData>
		</view>
		<!-- 选择评价商品 -->
		  <view class="change-goods flexc" v-if="showChange" @click="showChange=false">
			<view class="main">
			  <view class="tit">请选择要操作的商品</view>
			  <view class="list ali-c jus-b" v-for="(item, index) in needChangeGoods" @click.stop="changeGoods(item.Id)" :key="index">
				<image :src="item.PicNo" alt=""></image>
				<view class="flex1 uni-ellipsis">{{item.ProductName}}ert士大夫电风扇广泛受到广泛受到</view>
			  </view>
			</view>
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
				tabList:[{id:0,name:'全部'},{id:1,name:'待付款'},{id:2,name:'待发货'},{id:3,name:'待收货'},{id:4,name:'待评价'}],
				tabIndex:0,
				page:1,
				pagesize:3,
				list:[],
				isnNoData:false,
				isOver:false,
				needChangeGoods:[],
				showChange:false,
				changeNumId:'',//评价多商品订单时选中的订单no
			}
		},
		onShow() {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.tabIndex = this.$mp.query.tabIndex
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
			chooseOrders(OrderNo,type){//确认取消
			  if(type==1){
				var content="您确定要取消此订单吗？"
				var url="Order/CancelOrders"
			  }else if(type==2){
				var content="您确定要删除此订单吗？"
				var url="Order/DeleteOrders"
			  }else{
				var content="您确定收货成功吗？"
				var url="Order/ConfirmReceipt"
			  }
			  wx.showModal({
				title: '提示',
				cancelText:"再想想",
				content: content,
				success (res) {
				  if (res.confirm) {
					post(url,{
					  UserId:wx.getStorageSync("userId"),
					  Token:wx.getStorageSync("token"),
					  OrderNo:OrderNo,
					}).then(res=>{
					  this.showCancel = false
					  this.list = []
					  this.isOver = false
					  this.isnNoData = false
					  this.getList()
					  wx.showToast({
						icon:'none',
						title:res.msg
					  })
					})
				  } else if (res.cancel) {
					console.log('用户点击取消')
				  }
				}
			  })
			},
			goPinJia(goods,id){console.log(goods.length==1)
			  if(goods.length==1){
				this.goUrl('/pages/member/addComment/addComment?id='+id+'&detailId='+goods[0].Id)
			  }else{
				this.showChange = true
				this.needChangeGoods = goods
				this.changeNumId = id
			  }
			},
			changeGoods(detailId){
			  this.goUrl('/pages/member/addComment/addComment?id='+this.changeNumId+'&detailId='+detailId)
			},
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
	@import './style'
</style>
