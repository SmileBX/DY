<template>
	<view class="content">
		<view class="head">
			<view class="carthead"  :style="{'padding-top':barHeight+'px'}">
				<text >大单易拼推荐</text>
			</view>
			<view class="flex justifyContentBetween serch_box">
				<view class="flex search flexAlignCenter pw2 flex1">
					<view class="iconfont icon-sousuo"></view>
					<input type="text" placeholder="请输入关键字" class="flex1">
				</view>
				<view class="head_r flex flexAlignCenter">
					<view class="iconfont icon-caidan" @click="goUrl('/pages/classify/classify')"></view>
				</view>
			</view>
			<view class="flex b_tab_list">
				<view class="flex flexAlignCenter b_tab_item">
					<image src="../../../static/icons/t1.png"></image>
					<view class="flex1">品牌授权</view>
				</view>
				<view class="flex flexAlignCenter b_tab_item">
					<image src="../../../static/icons/t2.png"></image>
					<view class="flex1">退货无忧</view>
				</view>
				<view class="flex flexAlignCenter b_tab_item">
					<image src="../../../static/icons/t3.png"></image>
					<view class="flex1">买手精选</view>
				</view>
				<view class="flex flexAlignCenter b_tab_item">
					<image src="../../../static/icons/t4.png"></image>
					<view class="flex1">天天平价</view>
				</view>
			</view>
		</view>
		<view class="tui_bg">
			<image src="../../../static/of/tui_bg.png"></image>
		</view>
		<view class="card">
			<view class="pw3">
				<view class="hot combox">
					<view class="flex title justifyContentBetween">
						<view class="flex flexAlignEnd">
							<view class="name">热销榜</view>
							<view class="subtitle">排序由销量、搜索、好评等综合得出</view>
						</view>
						<view class="flex flexAlignCenter" @click="goUrl('/pages/other/hotBrand/hotBrand')">
							<view class="color_gray">更多</view>
							<view class="uni-icon uni-icon-arrowright"></view>
						</view>
					</view>
					<view class="list flex justifyContentBetween">
						<view class="item" v-for="(item,index) in Productlist" :key="index">
							<image src="../../../static/icons/hot_bg.png" class="bg"></image>
							<image :src="item.PicNo"></image>
							<view class="item_title">{{item.Name}}</view>
							<view class="brand">{{index+1}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="pw3 mt2">
				<view class="combox">
					<view class="flex title justifyContentBetween pb0">
						<view class="flex flexAlignEnd">
							<view class="name">商家力推</view>
						</view>
					</view>
					<view class="page-section HotsellList uni-bg-white uni-pd10 uni-mb10">
						<view class="uni-bd">
							<scroll-view class="scroll-view_H Hotsell-list" scroll-x="true" scroll-left="0">
								<view class="scroll-view-item_H" v-for="(item,index) in promotelist" :key="index">
									<view class="itembox">
										<view class="image-view">
											<image class="img" :src="item.PicNo" mode="aspectFill"></image>
										</view>
										<view class="txtbox">
											<view class="txt uni-ellipsis">{{item.Name}}</view>
											<view class="uni-product-price">
												<text class="uni-product-price-original">￥{{item.Price}}</text>
											</view>
										</view>
									</view>
								</view>
							</scroll-view>
						</view>
					</view>
				</view>
			</view>
			<!--菜单列表-->
			<view class="menu">
				<view class="menu_nav flex justifyContentBetween">
					<view class="menu_item flex flexAlignCenter flexColumn" 
					v-for="(item,key) in navlist" :key="key" :class="{'active':key==indexs}" @click="hand(key)">
						<view class="title">{{item.title}}</view>
					</view>
				</view>
				<view class="list flex flexWrap justifyContentBetween" v-if="indexs === 0">
					<view class="item" v-for="(item,index) in promotelist" :key="index">
						<image :src="item.PicNo" class="item_img"></image>
						<view class="item_info flex flexColumn flexAlignCenter">
							<view class="item_title">{{item.Name}}</view>
							<view class="flex flexAlignEnd justifyContentBetween item_total">
								<view class="flex flexAlignEnd">
									<span class="item_price">￥{{item.Price}}</span>
									<span class="item_market" v-if="item.MarketPrice>item.Price">￥{{item.MarketPrice}}</span>
								</view>
								<view class="item_market">{{item.SalesVolume}}人付款</view>
							</view>
						</view>
					</view>
				</view>
				<view class="list flex flexWrap justifyContentBetween" v-if="indexs === 1">
					<view class="item" v-for="(item,index) in hotlist" :key="index">
						<image :src="item.PicNo" class="item_img"></image>
						<view class="item_info flex flexColumn flexAlignCenter">
							<view class="item_title">{{item.Name}}</view>
							<view class="flex flexAlignEnd justifyContentBetween item_total">
								<view class="flex flexAlignEnd">
									<span class="item_price">￥{{item.Price}}</span>
									<span class="item_market" v-if="item.MarketPrice>item.Price">￥{{item.MarketPrice}}</span>
								</view>
								<view class="item_market">{{item.SalesVolume}}人付款</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-tab-bar-loading"><uni-load-more :loadingType="loadingType"></uni-load-more></view>
		</view>
	</view>
</template>

<script>
	import {post} from '@/common/util.js'
	import uniLoadMore from '@/components/uni-load-more.vue'; //加载更多
	export default {
		data() {
			return {
				navlist:[{id:1,title:'为您推荐'},{id:2,title:'精选推荐'}],
				userId: "",
				token: "",
				barHeight:0,
				Productlist:[],
				promotelist:[],
				indexs:0,
				hotlist:[],
				loadingType: 0, //0加载前，1加载中，2没有更多了
				pageSize:10,
				page: 1,
				isLoad: false,
			}
		},
		components: {uniLoadMore},
		onShow(){
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
		},
		methods: {
			//链接跳转
			goUrl(url){
			  wx.navigateTo({
				url:url
			  })
			},
			// 获取商品列表
			async productlist() {
				let result = await post("Goods/GoodsList", {
					Page:1,
					IsRecommend: 1,  //推荐
				});
				if (result.code === 0) {
					let list = result.data
					this.Productlist = list.slice(0,3)
					if (this.page === 1) {
						this.promotelist = result.data;
					}
					if (this.page > 1) {
						this.promotelist = this.promotelist.concat(result.data);
					}
					if (result.data.length < this.pageSize) {
						this.isLoad = false;
						this.loadingType = 2;
					} else {
						this.isLoad = true;
						this.loadingType = 0;
					}
				}
			},
			async hand(keys) {
				this.indexs = keys
				let result = await post("Goods/GoodsList", {
					Page:1,
					IsHot: 1, //精选
				});
				if (result.code === 0) {
					this.hotlist = result.data
					if (this.page > 1) {
						this.hotlist = this.hotlist.concat(result.data);
					}
					if (result.data.length < this.pageSize) {
						this.isLoad = false;
						this.loadingType = 2;
					} else {
						this.isLoad = true;
						this.loadingType = 0;
					}
				}
			},
		},
		onLoad() {
			this.productlist()
		},
		// 上拉加载
		onReachBottom: function() {
			if (this.isLoad) {
				this.loadingType = 1;
				this.page++;
				this.hand();
			} else {
				this.loadingType = 2;
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "./style";
	.uni-icon{
		
	}
</style>
