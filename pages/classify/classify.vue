<template>
	<view class="content" style="height: 100%;">
		<!-- 固定在顶部的导航栏 -->
		<!--#ifdef H5 || APP-PLUS-->
		<uni-nav-bar color="#333333" background-color="#f5f5f5" shadow="false" fixed="true" left-icon="arrowleft" @click-left="toback">
			<view class="input-view">
				<uni-icons type="search" size="22" color="#666666"></uni-icons>
				<input confirm-type="search" disabled="true" class="input" @click="gotoProductList(0)" type="text"
				 placeholder="输入搜索关键词" />
			</view>
			<!-- <block slot="right">
				<view class="iconfont icon-xiaoxi" style="color: #333;"><text class="uni-badge" v-if="newscount!=0">{{newscount}}</text></view>
			</block> -->
		</uni-nav-bar>
		<!--#endif-->
		<!--#ifdef MP-WEIXIN-->
		<uni-nav-bar color="#333333" background-color="#f5f5f5" shadow="false" fixed="true">
			<view class="input-view">
				<uni-icons type="search" size="22" color="#666666"></uni-icons>
				<input confirm-type="search" disabled="true" class="input" @click="gotoProductList(0)" type="text"
				 placeholder="输入搜索关键词" />
			</view>
		</uni-nav-bar>
		<!--#endif-->
		<view  :style="{'height':barHeight+44+'px'}"></view>
		<!-- 使用非原生导航栏后需要在页面顶部占位 -->
		<view class="container">
			<view class="page-body">
				<scroll-view class="nav-left" scroll-y :style="'height:'+height+'px'" v-if="categoryList.length>0">
					<view class="nav-left-item" @click="categoryClickMain(item.Id,index)" :key="index" :class="index==categoryActive?'active':''"
					 v-for="(item,index) in categoryList">
						{{item.Name}}
					</view>
				</scroll-view>
				<scroll-view class="nav-right" scroll-y :scroll-top="scrollTop" @scroll="scroll" @scrolltolower="loadMore" :style="'height:'+height+'px'"
				 scroll-with-animation>
					<view class="rightbanner" v-if="categoryList.length>0&&categoryList[bannerindex].Pic">
						<image class="img" :src="categoryList[bannerindex].Pic" mode="aspectFill"></image>
					</view>
					<view class="nav-rightList" v-if="hasData">
						<view :id="index===0?'first':''" class="nav-right-item" v-for="(item,index) in subCategoryList" :key="index"
						 @click="navigate('homePage/proList',{typeId:item.TypeId,classId:item.Id})">
							<image :src="item.PicUrl" v-if="item.PicUrl" mode="aspectFill" />
							<image src="/static/noPicmin.png" v-else mode="widthFix"></image>
							<view class="txt">{{item.ClassName}}</view>
						</view>
					</view>
					<block v-if="hasProData">
						<view class="uni-product-list level__product-list uni-mt10" style="padding-left: 20upx;">
							<block v-for="(item,index) in prolist" :key="index">
								<product :data="item" v-on:goDetail="goDetail"></product>
							</block>
						</view>
						<view class="uni-tab-bar-loading">
							<uni-load-more :loadingType="loadingType"></uni-load-more>
						</view>
					</block>
					<noData :isShow="noDataIsShow"></noData>
				</scroll-view>

			</view>
		</view>
	</view>
</template>
<script>
	import {post,get,navigate} from '@/common/util.js';
	import uniNavBar from '@/components/uni-nav-bar.vue';
	import uniIcons from '@/components/uni-icon.vue';
	import noData from '@/components/noData.vue'; //暂无数据
	import uniLoadMore from '@/components/uni-load-more.vue';
	// import product from '@/components/product.vue';
	import '@/common/head.css';
	import '@/common/dd_style.css';
	export default {
		onLoad() {
			// this.classifyNavList();
			// #ifdef APP-PLUS
			var height1 = plus.navigator.getStatusbarHeight();
			this.barHeight = height1;console.log(this.barHeight)
			this.height = uni.getSystemInfoSync().windowHeight-44-height1;
			// #endif
			// #ifndef APP-PLUS
			this.barHeight = 0;
			this.height = uni.getSystemInfoSync().windowHeight-44;
			// #endif
			this.getTypeList()
		},
		onShow() {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			
			//this.NewsCount();
			// this.nweproList()
			
		},
		components: {
			uniNavBar,
			uniIcons,
			noData,
			uniLoadMore,
			// product
		},
		data() {
			return {
				navigate,
				barHeight:0,
				userId: "",
				token: "",
				categoryList: [], //左边的类型数据
				subCategoryList: [], //右边的分类数据
				height: 0,
				categoryActive: 0,
				scrollTop: 0,
				scrollHeight: 0,
				typeId: '',
				newscount:0,//未读消息
				bannerindex:0,//类型banner
				hasData: false,//是否有下级分类
				hasProData: false,//是否有产品
				noDataIsShow: false,
				page: 1,
				pageSize: 6,
				loadingType: 0, //0加载前，1加载中，2没有更多了
				isLoad: false,
				prolist:[],
			}
		},
		methods: {
			toback(){
				uni.navigateBack();
			},
			scroll(e) {
				this.scrollHeight = e.detail.scrollHeight;
			},
			// 点击分类
			categoryClickMain(id, index) {
				this.categoryActive = index;
				this.typeId = id;
				this.scrollTop = -this.scrollHeight * index;
				this.bannerindex=index;
				this.page=1;
				this.isLoad=false;
				this.prolist=[];
				this.hasProData=false;
				this.classifyList();
			},
			getTypeList(){
				post('Goods/TypeList',{}).then(res=>{
					if(res.code==0){
						res.data.forEach(function(item,index){
							if(item.Id==70||item.Id==71){
								res.data.splice(index,2)
							}
						})
						this.categoryList=res.data;
						this.typeId = res.data[0].Id;
						this.categoryClickMain(this.typeId, this.categoryActive); //默认的第一条顶级分类(获取下级分类)
					}
				})
			},
			async classifyList() {
				//获取下级分类
				let result = await post("Goods/GetProductClass", {
					TypeId: this.typeId
				});
				if (result.code === 0) {
					if(result.data.length){
						const data = result.data;
						this.hasData=true;
						this.hasProData=false;
						this.noDataIsShow=false;
						this.subCategoryList = data;
					}else{
						this.noDataIsShow=true;
						this.hasData=false;
					}
					
				}
			},
			// 跳转
			gotoProductList(type, id) {
				if (type === 0) {
					uni.navigateTo({
						url: "/pages/ProductList/ProductList?isfilter=true"
					}); //点击搜素页面跳转，不需要传入参数
				}
				if (type === 1) {
					uni.navigateTo({
						url: "/pages/ProductList/ProductList?id=" + id+"&typeId="+this.typeId
					}); //点击分类跳转，需要传入参数
				}
			},
			//分类商品列表
			async getprolist(){
				let res = await post("Goods/GoodsList", {
				Page: this.page,
				PageSize: this.pageSize,
				TypeId:this.typeId,
				
				});
				if(res.code==0){
					let len=res.data.length;
					if (len > 0) {
					  this.hasProData = true;
					  this.noDataIsShow = false;
					}
					if (len == 0&&this.page==1) {
					  this.noDataIsShow = true;
					  this.hasProData = false;
					}
					if (this.page === 1) {
					  this.prolist = res.data;
					}
					if (this.page > 1) {
					  this.prolist = this.prolist.concat(
					    res.data
					  );
					}
					if (len < this.pageSize) {
					  this.isLoad = false;
					  this.loadingType = 2;
					} else {
					  this.isLoad = true;
					  this.loadingType = 0
					}
				}
			},
			goDetail(id) {
				uni.navigateTo({
					url: '/pages/productDetail/productDetail?proId='+id
				})
			},
			loadMore(){
				if (this.isLoad) {
					this.loadingType = 1;
					this.page++;
					this.getprolist();
				} else {
					this.loadingType = 2;
				}
			}
		}
	}
</script>
<style scoped>
	@import "./style";
	.nav-right{
		background: #fff!important;
	}
	.nav-right .level__product-list /deep/ .uni-product .image-view {
	    width: 200upx !important;
	    height: 200upx !important;
	}
	.nav-right .level__product-list /deep/ .uni-product .uni-product-image {
	    height: 200upx !important;
	}
	.nav-right .level__product-list /deep/ .uni-product .txtbox{
		height: 200upx;
	}
</style>
