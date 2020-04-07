<template>
	<view>
		<view class="BrandInfo" :style="{background: 'url('+ShopInfo.BannerPicNo+')'}">
			<!-- #ifdef MP-WEIXIN -->
			<view class="flex justifyContentBetween bb_mt">
				<view class="menubtn iconfont icon-aixin"></view>
				<button class="sharebtn" open-type="share"><view class="iconfont icon-fenxiang1"></view></button>
			</view>
			<!-- #endif -->
			<view class="inner flex flex-start">
				<view class="logoBox">
					<image class="img" :src="ShopInfo.Logo" mode="widthFix"></image>
				</view>
				<view class="textbox">
					<view class="name">{{ShopInfo.ShopNick}}</view>
					<view class="brand-desc">{{ShopInfo.Theme}}</view>
				</view>
			</view>
		</view>
		<view class="baolist">
			<view class="combox">
				<view class="flex title justifyContentBetween">
					<view class="flex flexAlignEnd">
						<view class="name">商家力推</view>
					</view>
				</view>
				<view class="page-section HotsellList uni-bg-white uni-pd10 uni-mb10">
					<view class="uni-bd" v-if="proList.length>0">
						<scroll-view class="scroll-view_H Hotsell-list" scroll-x="true" scroll-left="0">
							<view class="scroll-view-item_H" v-for="(item,index) in proList" :key="index" @click="goDetail(item.Id)">
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
					<view v-else class="uni-bd color_gray text_center">暂无推荐</view>
				</view>
			</view>
		</view>
		<view class="filter-Pro">
			<view class="areabox">
				<view class="area" @click="showArea">
					<view :class="{'sort_active':AreaCode}">区域</view>
					<view class="areaimg">
						<image class="utas" :class="{'rotate180':Sort===0&&Order===0}" src="http://ddyp.wtvxin.com/static/hpicons/uta.svg"></image>
					</view>
				</view>
				<view class="area" @click="onSort(0)">
					<view :class="{'sort_active':Sort===0}">默认</view>
					<view class="areaimg">
						<image class="utas" :class="{'rotate180':Sort===0&&Order===0}" src="http://ddyp.wtvxin.com/static/hpicons/uta.svg"></image>
					</view>
				</view>
				<view class="area" @click="onSort(1)">
					<view :class="{'sort_active':Sort===1}">人气</view>
					<view class="areaimg">
						<image class="utas" :class="{'rotate180':Sort===1&&Order===0}" src="http://ddyp.wtvxin.com/static/hpicons/uta.svg"></image>
					</view>
				</view>
				<view class="area" @click="onSort(2)">
					<view :class="{'sort_active':Sort===2}">价格</view>
					<view class="areaimg">
						<image class="utas" :class="{'rotate180':Sort===2&&Order===0}" src="http://ddyp.wtvxin.com/static/hpicons/uta.svg"></image>
					</view>
				</view>
			</view>
			<!-- <view class="filterMenu">
				<view class="menu flex flex-between center">
					<view class="item" :class="{'active':item.active}" @click="shiftFilterTab(index)" v-for="(item,index) in filterTab"
					 :key="index">{{item.name}}<text v-if="item.isSortorder" class="filterBtn" :class="{'upBtn':item.sortorder==1,'downBtn':item.sortorder==0}"></text></view>
					<view class="item">分类</view>
				</view>
			</view> -->
			<view class="uni-mt10">
				<view class="proList flex flexWrap justifyContentBetween">
					<view class="item" v-for="(item,index) in datalist" :key="index">
						<image :src="item.PicNo" class="item_img"></image>
						<view class="item_info flex flexColumn flexAlignCenter">
							<view class="item_title">{{item.Name}}</view>
							<view class="flex flexAlignEnd justifyContentBetween item_total">
								<view class="flex flexAlignEnd">
									<span class="item_price">￥{{item.Price}}</span>
									<span class="item_market line-through">￥{{item.MarketPrice}}</span>
								</view>
								<view class="item_market">{{item.SalesVolume}}人付款</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<wpicker
				mode="linkage"
				:level="3" 
				:defaultVal="areaDefault"
				@confirm="areaOk"
				@cancel="areaCancel"
				ref="area"
				:linkList="areaList"
				themeColor="#f00"
				>
			</wpicker>
			<noData :isShow="noDataIsShow"></noData>
		</view>
	</view>
</template>

<script>
	import {post,get,toLogin,navigate} from '@/common/util.js';
	import areaList from '@/common/areaList.js';
	import noData from '@/components/noData.vue'; //暂无数据
	import uniLoadMore from '@/components/uni-load-more.vue';
	import wpicker from "@/components/w-picker/w-picker.vue";
	import "@/common/product.scss";
	export default {
		components: {
			noData,
			uniLoadMore,wpicker
		},
		data() {
			return {
				proList:[],//推荐列表
				ShopInfo:{},//品牌信息
				navigate,
				userId: "",
				token: "",
				page: 1,
				pageSize: 12,
				ShopId:'',
				loadingType: 0, //0加载前，1加载中，2没有更多了
				isLoad: false,
				hasData: false,
				noDataIsShow: false,
				datalist:[],
				Sort:0,//0-默认1-人气2-价格
				Order:0,//排序方式0-升序，1-降序
				IsRecommend:0,//1推荐
				IsHot:0,//1精选
				IsNew:0,//1新品
				IsUseCoupons:0,//1优惠券专区商品
				CouponId:'',//优惠券Id
				Keywords:'',//关键词
				AreaCode:'',//地区代码
				AreaType:0,//0--默认按地区码，1--省不限市，市不限区
				classifyDefault:'',
				classifyList:[{label:"",value:""}],
				areaDefault:['广东省','深圳市'],
				areaList,
			}
		},
		onShow(){
			this.ShopId = this.$root.$mp.query.ShopId
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.keyWords="";
			this.AreaCode="";
			this.AreaType=0;
			this.init();
			this.getShop()
			this.getPsoList()
			this.getcommonProList()
		},
		methods: {
			goDetail(id){
				uni.navigateTo({
					url:'/pages/homePage/details?id='+id
				})
			},
			async getShop(){
				const res = await post('Shop/ReadShop',{ShopId:this.ShopId,})
				if(res.code == 0){
					this.ShopInfo=res.data
				}
			},
			async getPsoList(){
				let res = await post("Goods/GoodsList", {
					Page: 1,
					PageSize: 8,
					ShopId:this.ShopId,
					IsRecommend:1,//1推荐
				});
				if(res.code == 0){
					this.proList = res.data
				}
			},
			// 每次 切换分类、切换区域，返回默认值
			init(){
				this.Sort=0;
				this.Order=0;
				this.getcommonProList();
			},
			onSort(sort){
				// 如果已经点击了筛选则更换排序
				if(sort===this.Sort){
					this.Order=this.Order===0?1:0;
				}else{
					this.Sort=sort;
					this.Order=0;
				}
				this.getcommonProList();
			},
			//分类商品列表
			async getcommonProList(){
				let result = await post("Goods/GoodsList", {
					Page: this.page,
					PageSize: this.pageSize,
					ShopId:this.ShopId,
					Sort:this.Sort,//0-默认1-人气2-价格
					Order:this.Order,//排序方式0-升序，1-降序
					IsRecommend:this.IsRecommend,//1推荐
					IsHot:this.IsHot,//1精选
					IsNew:this.IsNew,//1新品
					IsUseCoupons:this.IsUseCoupons,//1优惠券专区商品
					CouponId:this.CouponId,//优惠券Id
					Keywords:this.Keywords,//关键词
					AreaCode:this.AreaCode,//地区代码
					AreaType:this.AreaType,//0--默认按地区码，1--省不限市，市不限区
				});
				if(result.code==0){
					let _this=this;
					if (result.data.length > 0) {
						this.hasData = true;
						this.noDataIsShow = false;
					}
					if (result.data.length == 0&&this.page==1) {
						this.noDataIsShow = true;
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
			// 地区
			showArea(){
				this.$refs['area'].show();
			},
			areaOk(e){
				this.areaDefault=e.checkArr;
				this.AreaCode=e.checkValue[e.checkValue.length-1];
				this.init();
			},
			areaCancel(e){
				this.AreaCode='';
				this.init();
			}
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
	/* 区域 */
	.areabox{
		margin-top: 40rpx;
		display: flex;
		justify-content: space-around;
		width: 100%;
		font-size:28rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(51,51,51,1);
		margin-bottom: 29rpx;
	}
	.area{
		display: flex;
	}
	.areaimg{
		margin-left: 11rpx;
		width:14rpx;
		height:9rpx;
	}
	.utas{
		height:60rpx;
	}
	.sort_active{
		color:rgba(255,51,51,1);
	}
	.rotate180{
		transform:rotate(180deg);
		-ms-transform:rotate(180deg); /* IE 9 */
		-webkit-transform:rotate(180deg); /* Safari and Chrome */
	}
	.BrandInfo{
		height: 360upx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		.inner{
			padding: 90upx 20upx 40upx;
			.logoBox{
				width: 120upx;
				height: 120upx;
				margin-right: 20upx;
				display: flex;
				justify-content: center;
				flex-direction: column;
			}
			.name{ font-size: 32upx; font-weight:bold;}
			.brand-desc{ font-size: 28upx;}
		}
	}
	.baolist{
		background: #ffffff;
		border-radius:20upx 20upx 0 0;
		margin-top: -40upx;
		.title{
			padding:20upx 20upx 0;
			.name{
				font-size:32upx;margin-right:10upx;
			}
			.subtitle{
				font-size:24upx;color:#999;
			}
		}
		.scroll-view_H {
			white-space: nowrap;
			width: 100%;
		}
		.scroll-view-item_H {
			display: inline-block;
		}
		.HotsellList .uni-bd {
			margin-right: -20upx;
		}
		
		.Hotsell-list .itembox {
			width: 280upx;
			margin-right: 20upx;
			overflow: hidden;
		}
		
		.Hotsell-list .image-view {
			width: 280upx;
			height: 280upx;
			margin: 0;
		}
		
		.Hotsell-list .image-view .img {
			width: 100%;
			height: 100%;
		}
		
		.Hotsell-list .uni-product-price {
			margin-top: 0;
		}
		
		.Hotsell-list .uni-product-price .uni-product-price-favour {
			font-size: 24upx;
		}
	}
	.bb_mt{
		padding:0 30upx;
	}
	.sharebtn{
		width:50upx;height:50upx;border-radius:50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
