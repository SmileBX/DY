<template>
	<view class="home index" style="height: 100%;">
		<!--顶部搜索导航-->
		<view class="index_nav uni-tab-bar">
			<view class="flex justifyContentBetween">
				<view class="flex flexAlignCenter">
					<view class="locale uni-ellipsis" @click="typelist">深圳</view>
					<view class="iconfont icon-arrow_down-copy font12"></view>
				</view>
				<view class="flex search flexAlignCenter pw2" @click="tolink('/pages/homePage/proList')">
					<view class="iconfont icon-sousuo"></view>
					<input type="text" placeholder="请输入关键字">
					<view class="iconfont icon-xiangji"></view>
				</view>
				<view class="head_r flex flexAlignCenter">
					<view class="iconfont icon-xiaoxi mr2" @click="tolink('/pages/message/messageClass/messageClass','login')"><view class="num" v-if="newscount!=0">{{newscount}}</view></view>
					<view class="iconfont icon-caidan" @click="tolink('/pages/classify/classify')"></view>
				</view>
			</view>
			<scroll-view id="tab-bar" class="scroll-tab mt2" scroll-x :scroll-left="scrollLeft" style="display: flex;">
				<view v-for="(tab,index) in Typelist" :key="index" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']" :id="'tabNum'+index"
				 :data-current="index" @click="tapTab(index,tab.Id)">
					<view class="s"> {{tab.Name}} </view>
				</view>
			</scroll-view>
		</view>
		<view class="index_Content uni-tab-bar">
			<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
				<swiper-item>
					<scroll-view class="uni-index-wrap" scroll-y>
						<!--轮播图-->
						<view class="page-section swiper">
							<view class="page-section-spacing">
								<swiper class="swiper" :indicator-dots="true" :autoplay="false" :interval="5000" :duration="500">
									<swiper-item v-for="(banner,key) in bannerlist" :key="key">
										<view class="swiper-item">
											<image class="img" :src="banner.Pic" mode="aspectFill"></image>
										</view>
									</swiper-item>
								</swiper>
							</view>
						</view>
						<!--菜单栏-->
						<view class="page-section swiper" style="height: 400upx;">
							<view class="page-section-spacing">
								<swiper class="swiper" style="height: 400upx;" :indicator-dots="true" :autoplay="false" :interval="5000" :duration="500">
									<swiper-item v-for="(val,index) in menubarlist" :key="index" class="tab_list" scroll-x :scroll-left="scrollLeft2">
										<view  class="tab_item" v-for="(tab, index) in val" :key="index" @click="tolink('/pages/homePage/proList')">
											<view>
												<image :src="tab.Pic" class="tab_img"></image> 
											</view>
											<view class="tab_name center"> {{tab.Name}} </view>
										</view>
									</swiper-item>
								</swiper>
							</view>
						</view>
						<!--拼品牌馆-->
						<view class="index_pin">
							<image src="../../../static/of/f1.png" mode="widthFix"></image>
							<view class="pin_list flex justifyContentBetween">
								<view class="pin_item" v-for="(item,key) in 4" :key="key" :class="{'bg1':key==0,'bg2':key==1,'bg3':key==2,'bg4':key==3}" @click="tolink('/pages/brand/brandIndex/brandIndex')">
									<view class="item_logo">
										<image src="../../../static/of/logo.png" mode="aspectFill"></image>
									</view>
									<view class="flex justifyContentBetween item_info">
										<view :class="{'color1':key==0,'color2':key==1,'color3':key==2,'color4':key==3}">
											<view class="item_info_title">专注纯实木</view>
											<view class="item_sige">连续八年实木家具</view>
										</view>
										<view class="right_img">
											<image src="../../../static/of/2.png" mode="aspectFill"></image>
										</view>
									</view>
								</view>
									
							</view>
						</view>
						<!--特惠-->
						<view class="hui mt2">
							<image src="../../../static/of/f2.png" class="hui_bg"></image>
							<view class="flex hui_title">
								<view class="mr2">全场4折封顶</view>
								<view class="flex tile_time">
									<view class="mr1">仅剩</view>
									<view class="flex justifyContentCenter flexAlignCneter">
										<span class="time_span">18</span>:
										<span class="time_span">56</span>:
										<span class="time_span">34</span>
									</view>
								</view>
							</view>
							<view class="list flex justifyContentBetween">
								<view v-for="(item,index) in 3" :key="index" class="item_img" @click="tolink('/pages/brand/brandproLsit/brandproLsit')">
									<block v-if="index==0"><image src="../../../static/of/1.png"></image></block>
									<block v-if="index==1"><image src="../../../static/of/5.png"></image></block>
									<block v-if="index==2"><image src="../../../static/of/6.png"></image></block>
								</view>
							</view>
						</view>
						<!--推荐-->
						<view class="jian mt2">
							<image src="../../../static/of/f3.png" class="jian_bg"></image>
							<view class="jian_sign">美 好 生 活 抢 先 到</view>
							<!-- 热销榜单 -->
							<view class="page-section HotsellList uni-bg-white uni-pd10 uni-mb10">
								<view class="uni-bd uni-mt10">
									<scroll-view class="scroll-view_H Hotsell-list" scroll-x="true" scroll-left="0">
										<view class="scroll-view-item_H" v-for="(item,index) in Productlist" :key="index" @click="tolink('/pages/homePage/details?id='+item.Id)">
											<view class="itembox">
												<view class="image-view">
													<image class="img" :src="item.PicNo" mode="aspectFill"></image>
												</view>
												<view class="txtbox">
													<view class="txt uni-ellipsis">{{item.Name}}</view>
													<view class="uni-product-price">
														<text class="uni-product-price-original">￥{{item.Price}}</text>
														<text class="uni-product-price-favour">￥{{item.MarketPrice}}</text>
													</view>
												</view>
											</view>
										</view>
									</scroll-view>
								</view>
							</view>
						</view>
						<!--菜单列表-->
						<view class="menu">
							<view class="menu_nav flex justifyContentBetween">
								<view class="menu_item flex flexAlignCenter flexColumn"
								v-for="(item,index) in handpick" :key="index" 
								:class="{'active':index==indexs}" @click="handItem(item.Id,index)">
									<view class="title">{{item.Name}}</view>
									<!-- <view class="subtitle">{{item.subtitle}}</view> -->
								</view>
							</view>
							<view class="" style="display: flex;justify-content: space-between; padding: 0 30rpx;color:#999" >
								<view class="subtitle" style="font-size:24rpx;">为您推荐</view>
								<view class="subtitle" style="font-size:24rpx;">超值好货</view>
								<view class="subtitle" style="font-size:24rpx;">省心省钱</view>
								<view class="subtitle" style="font-size:24rpx;">款式齐全</view>
								<view class="subtitle" style="font-size:24rpx;">服务到位</view>
							</view>
							<view class="list flex flexWrap justifyContentBetween">
								<view class="item" v-for="(item,index) in handlist" :key="index" @click="tolink('/pages/homePage/details?id='+item.Id)">
									<image :src="item.PicNo" class="item_img"></image>
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
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item v-if="index1<Typelist.length-1" v-for="(tab,index1) in Typelist" :key="index1">
					<scroll-view class="menu_wrap" scroll-y @scrolltolower="loadMore(index1)">
						<view class="menu">
							<view class="list flex flexWrap justifyContentBetween">
								<view class="item" v-for="(item,index) in handlist" :key="index" @click="tolink('/pages/homePage/details?id='+item.Id)">
									<image :src="item.PicNo" class="item_img"></image>
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
						</view>	
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<view class="uni-tab-bar-loading"><uni-load-more :loadingType="loadingType"></uni-load-more></view>
	</view>
</template>

<script>
	import {post,get,toLogin} from '@/common/util.js';
	import uniLoadMore from '@/components/uni-load-more.vue'; //加载更多
	export default{
		data(){
			return{
				bannerlist:[{Pic:""}], // 轮播图
				Typelist:[],           // 头部
				menubarlist:[],        // 菜单
				Productlist:[],        // 商品列表
				handpick:[],           // 精选
				handlist:[],           // 精选列表
				scrollLeft:0,
				scrollLeft2:0,
				tabIndex:0,
				indexs:0,
				IsRecommend:1,//1: 推荐
				IsHot:1,//精选
				IsNew:1,//新品
				TypeId:1,//类型Id
				ClassId:1,//分类Id
				loadingType: 0, //0加载前，1加载中，2没有更多了
				pageSize:10,
				page: 1,
				isLoad: false,
				newscount:0,
			}
		},
		onLoad() {
			this.banner();
			this.typelist();
			this.productlist();//获取推荐列表
			this.hand();//获取精选等分类列表
			if(toLogin()){
				this.NewsCount();
			}
		},
		components:{uniLoadMore},
		methods:{
			async NewsCount() {
				let result = await post("News/NewsCount", {
					"UserId": uni.getStorageSync("userId"),
					"Token": uni.getStorageSync("token")
				});
				if (result.code === 0) {
					this.newscount = result.count;
				} 
			},
			// 获取商品列表
			async productlist() {
				let query = {
					Page:1,
					IsRecommend:this.IsRecommend,
				}
				this.getGoodList(query,1)
			},
			async hand() {
				let query = {
					Page:1,
					// IsHot:this.IsHot,
					// TypeId:this.TypeId,
				}
				this.getGoodList(query,2)
			},
			async getGoodList(prams,tip){
				const res = await post('Goods/GoodsList',prams)
				if(tip==1){ //首页推荐列表
					this.Productlist = res.data
				}else{ //精选列表
					this.handlist = res.data
				}
			},
			handItem(item,index){
				this.indexs = index
				let query = {
					Page:1,
					// IsHot:this.IsHot,
					// ClassId:this.ClassId,
				}
				this.getGoodList(query,2)
			},//精选列表获取分类列表
			async changeTab(e) {
				this.page=1;
				let index = e.detail.current;
				let id= this.Typelist[index].Id;
				this.tabIndex = index;
				let query = {
					Page:1,
					// IsHot:this.IsHot,
					// TypeId:this.TypeId,
				}
				this.getGoodList(query,2);//获取分类列表
				this.setScrollLeft(index);
			},
			//点击跳转
			tapTab(index,id){
				if (this.tabIndex === index) {
					return false;
				} else {
					this.page=1;
					this.tabIndex = index;
					let query = {
						Page:1,
						// IsHot:this.IsHot,
						// TypeId:this.TypeId,
					}
					this.setScrollLeft(index)
					this.getGoodList(query,2);//获取分类列表
				}
			},
			setScrollLeft: async function(tabIndex) {
				let leftWidthSum = 0;
				for (var i = 0; i <= tabIndex; i++) {
					let nowElement = await this.getWidth('tabNum' + i);
					leftWidthSum = leftWidthSum + nowElement.width+8;//8是margin值
				}
				let winWidth = uni.getSystemInfoSync().windowWidth;
				this.scrollLeft = leftWidthSum > winWidth ? (leftWidthSum - winWidth) : 0;
			},
			getWidth(id) { //得到元素的宽
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select('#' + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data);
					}).exec();
				});
			},
			//跳转
			tolink(Url,islogin) {
				if(islogin=="login"){
					if(toLogin()){
						uni.navigateTo({
							url: Url
						})
					}
				}else{
					uni.navigateTo({
						url: Url
					})
				}
			},
			// 轮播图
			async banner() {
				let result = await post("Banner/BannerList", {
					Cid:1
				});
				if (result.code === 0) {
					this.bannerlist = result.data
				}
			},
			// 获取类型(商品)
			async typelist(){
				let result = await post("Goods/TypeList", {
					Type:1
				});
				if (result.code === 0) {
					let unm = result.data
					let list = []
					let today = {}
					today.Name = "今日推荐"
					list = result.data.slice()
					list.unshift(today)
					this.Typelist = list
					unm.forEach((val,index) => {
						let page = Math.floor(index / 10)
						if(!this.menubarlist[page]){
							this.menubarlist[page] = []
						}
						this.menubarlist[page].push(val)
					})
					let hand = []
					let pick = {}
					let picks = {}
					pick.Name = "精选"
					picks.Name = "实惠"
					hand = result.data.slice(0,3)
					hand.unshift(pick,picks)
					this.handpick = hand
				}
			}
			
		},
		// 上拉加载
		onReachBottom: function() {
			if (this.isLoad) {
				this.loadingType = 1;
				this.page++;
				this.productlist();
				this.hand();
			} else {
				this.loadingType = 2;
			}
		}

			
		
	}
</script>

<style scoped lang="scss">
	@import './style';
</style>
