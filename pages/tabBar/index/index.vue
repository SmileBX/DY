<template>
	<view class="home" style="height: 100%;">
		<!--顶部搜索导航-->
		<view class="index_nav uni-tab-bar">
			<view class="flex justifyContentBetween">
				<view class="flex flexAlignCenter">
					<view class="locale uni-ellipsis">深圳</view>
					<view class="iconfont icon-arrow_down-copy font12"></view>
				</view>
				<view class="flex search flexAlignCenter pw2">
					<view class="iconfont icon-sousuo"></view>
					<input type="text" placeholder="请输入关键字">
					<view class="iconfont icon-xiangji"></view>
				</view>
				<view class="head_r flex flexAlignCenter">
					<view class="iconfont icon-xiaoxi mr2"><view class="num">4</view></view>
					<view class="iconfont icon-caidan" @click="tolink('/pages/classify/classify')"></view>
				</view>
			</view>
			<scroll-view id="tab-bar" class="scroll-tab mt2" scroll-x :scroll-left="scrollLeft">
				<view v-for="(tab,index) in datalist" :key="index" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']" :id="'tabNum'+index"
				 :data-current="index">
					<view class="s"> {{tab.TypeName}} </view>
				</view>
			</scroll-view>
		</view>
		<view class="index_Content">
			<!--轮播图-->
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="true" :autoplay="false" :interval="5000" :duration="500">
						<swiper-item v-for="(banner,index) in 4" :key="index">
							<view class="swiper-item" @click="toBannerlink(banner.Url)">
								<image class="img" src="../../../static/of/banner.png" mode="aspectFill"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<!--菜单栏-->
			<scroll-view  class="tab_list" scroll-x :scroll-left="scrollLeft2">
				<view v-for="(tab,index) in 8" :key="index" class="tab_item">
					<view v-for="(item,ell) in 2" :class="[tabIndex==ell ? 'active' : '']" :id="'tabNum'+ell"
					 :data-current="ell" :key="ell">
						 <view>
							<image src="../../../static/of/4.png" class="tab_img"></image> 
						 </view>
						<view class="tab_name"> 近视 </view>
					</view>
				</view>
			</scroll-view>
			<!--拼品牌馆-->
			<view class="index_pin">
				<image src="../../../static/of/f1.png" mode="widthFix"></image>
				<view class="pin_list flex justifyContentBetween">
					<view class="pin_item" v-for="(item,key) in 4" :key="key" :class="{'bg1':key==0,'bg2':key==1,'bg3':key==2,'bg4':key==3}">
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
					<view v-for="(item,index) in 3" :key="index" class="item_img">
						<image src="../../../static/of/1.png"></image>
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
							<view class="scroll-view-item_H" v-for="(item,index) in 6" :key="index" @click="goDetail(item.Id)">
								<view class="itembox">
									<view class="image-view">
										<image class="img" src="../../../static/of/3.png" mode="aspectFill"></image>
									</view>
									<view class="txtbox">
										<view class="txt uni-ellipsis">珍视明眼药水</view>
										<view class="uni-product-price">
											<text class="uni-product-price-original">￥39.00</text>
											<text class="uni-product-price-favour">￥60.00</text>
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
					<view class="menu_item flex flexAlignCenter flexColumn" v-for="(item,pll) in navlist" :key="pll" :class="{'active':pll==1}">
						<view class="title">{{item.title}}</view>
						<view class="subtitle">{{item.subtitle}}</view>
					</view>
				</view>
				<view class="list flex flexWrap justifyContentBetween">
					<view class="item" v-for="(item,index) in 6" :key="index">
						<image src="../../../static/of/4.png" class="item_img"></image>
						<view class="item_info flex flexColumn flexAlignCenter">
							<view class="item_title">超越极限音波拉皮-颈部</view>
							<view class="flex flexAlignEnd justifyContentBetween item_total">
								<view class="flex flexAlignEnd">
									<span class="item_price">￥980</span>
									<span class="item_market">￥2980</span>
								</view>
								<view class="item_market">68人付款</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {post,get} from '@/common/util.js';
	export default{
		data(){
			return{
				scrollLeft:0,
				scrollLeft2:0,
				tabIndex:0,
				tablist:[{id:1,TypeName:'车位'},{id:2,TypeName:'公寓'},{id:3,TypeName:'新房'},{id:4,TypeName:'商业'},{id:5,TypeName:'汽车'},{id:6,TypeName:'牙齿'},{id:7,TypeName:'欧美'},{id:8,TypeName:'近视'},{id:9,TypeName:'近视'},{id:10,TypeName:'近视'},{id:11,TypeName:'近视'},{id:12,TypeName:'近视'}],
				navlist:[{id:1,title:'精选',subtitle:'为您推荐'},{id:2,title:'实惠',subtitle:'超值好货'},{id:3,title:'房产',subtitle:'省心省钱'},{id:4,title:'汽车',subtitle:'款式齐全'},{id:5,title:'服务',subtitle:'服务到位'}],
				datalist:[{id:1,TypeName:'今日推荐'},{id:2,TypeName:'今日推荐'},{id:3,TypeName:'特价倒计时'},{id:4,TypeName:'房产'},{id:5,TypeName:'家居'},{id:6,TypeName:'大健康'}]
			}
		},
		methods:{
			//跳转
			tolink(Url) {
				uni.navigateTo({
					url: Url
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	@import './style';
</style>
