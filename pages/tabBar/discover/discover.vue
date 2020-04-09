<template>
	<view class="content" style="height: 100%;">
		<view class="head" :style="{'padding-top':barHeight+'px','height':barHeight+swipertop+'px'}">
			<!-- #ifdef H5||APP-PLUS -->
			<view class="carthead">
				<text >大单易拼推荐</text>
			</view>
			<!-- #endif -->
			<view class="flex justifyContentBetween serch_box">
				<view class="flex search flexAlignCenter pw2 flex1" @click="goUrl('/pages/homePage/proList')">
					<view class="iconfont icon-sousuo"></view>
					<input type="text" placeholder="请输入关键字" class="flex1">
				</view>
				<view class="head_r flex flexAlignCenter">
					<view class="iconfont icon-caidan" @click="goUrl('/pages/classify/classify')"></view>
				</view>
			</view> 
			<view class="flex b_tab_list">
				<view class="flex flexAlignCenter b_tab_item">
					<image src="http://ddyp.wtvxin.com/static/icons/t1.png"></image>
					<view class="flex1">品牌授权</view>
				</view>
				<view class="flex flexAlignCenter b_tab_item">
					<image src="http://ddyp.wtvxin.com/static/icons/t2.png"></image>
					<view class="flex1">退货无忧</view>
				</view>
				<view class="flex flexAlignCenter b_tab_item">
					<image src="http://ddyp.wtvxin.com/static/icons/t3.png"></image>
					<view class="flex1">买手精选</view>
				</view>
				<view class="flex flexAlignCenter b_tab_item">
					<image src="http://ddyp.wtvxin.com/static/icons/t4.png"></image>
					<view class="flex1">天天平价</view>
				</view>
			</view>
		</view>
		<view class="main" :style="{'padding-top':barHeight+swipertop+'px'}">
			<view class="tui_bg">
				<swiper class="swiper" :indicator-dots="true" :autoplay="false" :interval="5000" :duration="500">
					<swiper-item v-for="(banner,key) in bannerlist" :key="key" >
						<view class="swiper-item" >
							<image class="img" :src="banner.Pic" mode="widthFix"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="card uni-mt10">
				<view class="pw3" v-if="hasHits">
					<view class="hot combox">
						<view class="flex title justifyContentBetween">
							<view class="flex flexAlignEnd">
								<view class="name">热销榜</view>
								<!-- <view class="subtitle">排序由销量、搜索、好评等综合得出</view> -->
							</view>
							<view class="flex flexAlignCenter" @click="goUrl('/pages/other/hotBrand/hotBrand')">
								<view class="color_gray">更多</view>
								<view class="iconfont icon-arrow_r fz12"></view>
							</view>
						</view>
						<view class="list flex justifyContentBetween">
							<view class="item" v-for="(item,index) in Hitslist" :key="index" @click="goUrl('/pages/homePage/details?id='+item.Id)">
								<view class="brand">{{index+1}}</view>
								<image :src="item.PicNo"></image>
								<view class="item_title">{{item.Name}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="pw3 mt2" v-if="haspromote">
					<view class="combox">
						<view class="flex title justifyContentBetween pb0">
							<view class="flex flexAlignEnd">
								<view class="name">商家力推</view>
							</view>
						</view>
						<view class="page-section HotsellList uni-bg-white uni-pd10 uni-mb10">
							<view class="uni-bd">
								<scroll-view class="scroll-view_H Hotsell-list" scroll-x="true" scroll-left="0">
									<view class="scroll-view-item_H" v-for="(item,index) in promotelist" :key="index" @click="goUrl('/pages/homePage/details?id='+item.Id)">
										<view class="itembox">
											<view class="image-view">
												<image class="img" :src="item.PicNo" mode="aspectFit"></image>
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
						v-for="(item,index) in navlist" :key="index" :class="{'active':index==indexs}" @click="tapTab(index)">
							<view class="title">{{item.title}}</view>
						</view>
					</view>
					<view class="list flex flexWrap justifyContentBetween" v-if="hasData">
						<view class="item" v-for="(item,index) in datalist" :key="index" @click="goUrl('/pages/homePage/details?id='+item.Id)">
							<image :src="item.PicNo" class="item_img" mode="aspectFit"></image>
							<view class="item_info">
								<view class="item_title">{{item.Name}}</view>
								<view class="flex flexAlignEnd justifyContentBetween item_total">
									<view class="flex flexAlignEnd">
										<span class="item_price">￥{{item.Price}}</span>
										<span class="item_market line-through" v-if="item.MarketPrice>item.Price">￥{{item.MarketPrice}}</span>
									</view>
									<view class="item_market">{{item.SalesVolume}}人付款</view>
								</view>
							</view>
						</view>
					</view>
					<noData :isShow="noDataIsShow"></noData>
				</view>
				<view class="uni-tab-bar-loading" v-if="hasData"><uni-load-more :loadingType="loadingType"></uni-load-more></view>
			</view>
		</view>
		<!-- #ifndef MP-WEIXIN -->
		<view style="height: 50px;"></view>
		<!-- #endif -->
	</view>
</template>

<script>
	import {post} from '@/common/util.js';
	import noData from '@/components/noData.vue'; //暂无数据
	import uniLoadMore from '@/components/uni-load-more.vue'; //加载更多
	export default {
		data() {
			return {
				swipertop:0,
				navlist:[{id:1,title:'为您推荐'},{id:2,title:'精选推荐'}],
				userId: "",
				token: "",
				barHeight:0,
				hasHits:false,
				Hitslist:[],
				haspromote:false,
				promotelist:[],
				bannerlist:[],//广告轮播图
				indexs:0,
				page: 1,
				pageSize: 6,
				loadingType: 0, //0加载前，1加载中，2没有更多了
				isLoad: false,
				hasData: false,
				noDataIsShow: false,
				datalist:[],
			}
		},
		components: {noData,uniLoadMore},
		onLoad() {
			this.swipertop=uni.upx2px(230)
			// #ifdef MP-WEIXIN
			this.swipertop=uni.upx2px(142)
			// #endif
			// #ifdef APP-PLUS
			var height = plus.navigator.getStatusbarHeight();
			this.barHeight = height;
			// #endif
			// #ifdef H5
			this.barHeight = 0;
			// #endif
		},
		onShow(){
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.banner();
			this.getHitslist()
			this.shopProductlist();
			this.getprolist();
		},
		methods: {
			//链接跳转
			goUrl(url){
			  uni.navigateTo({
				url:url
			  })
			},
			async banner() {
				let result = await post("Banner/BannerList", {
					Cid:2
				});
				if (result.code === 0) {
					this.bannerlist = result.data
				}
			},
			// 获取热销商品列表
			async getHitslist() {
				let result = await post("Goods/GoodsList", {
					Page:1,
					PageSize:3,
					IsHits: 1,  //热销榜
				});
				if (result.code === 0) {
					if(result.data.length){
						this.hasHits=true;
						this.Hitslist = result.data
					}
				}
			},
			// 获取商品列表（商家力推）
			async shopProductlist() {
				let result = await post("Goods/GoodsList", {
					Page:1,
					PageSize:10,
					IsRecommend: 1,  //推荐
				});
				if (result.code === 0) {
					if(result.data.length){
						this.haspromote=true;
						this.promotelist = result.data;
					}
				}
			},
			//切换
			tapTab(index) {
				this.page=1;
				this.indexs = index;
				this.getprolist()
			},
			async getprolist() {
				let datajson={};
				if(this.indexs==0){
					datajson={
						Page: this.page,
						PageSize: this.pageSize,
						IsRecommend: 1, //推荐
					}
				}else if(this.indexs==1){
					datajson={
						Page: this.page,
						PageSize: this.pageSize,
						IsHot:1//精选
					}
				}
				let result = await post("Goods/GoodsList", datajson);
				if (result.code === 0) {
					let _this=this;
					if (result.data.length > 0) {
						this.hasData = true;
						this.noDataIsShow = false;
					}
					if (result.data.length == 0&&this.page==1) {
						this.noDataIsShow = true;
						this.hasData = false;
					}
					if (this.page === 1) {
						this.datalist = result.data;
					}
					if (this.page > 1) {
						this.datalist = this.datalist.concat(
							result.data
						);
					}
					if (result.data.length <this.pageSize) {
						this.isLoad = false;
						this.loadingType = 2;
					} else {
						this.isLoad = true;
						this.loadingType = 0
					}
				}
			},
		},
		
		onReachBottom: function() {
			if (this.isLoad) {
				this.loadingType = 1;
				this.page++;
				this.getprolist();
			} else {
				this.loadingType = 2;
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "./style";
</style>
