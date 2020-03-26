<template>
	<view class="wrap">
		<view class="nav">
			<view :class="{active:navindex==index}" v-for="(item,index) in navlist" :key="index" @click="navselect(index)">{{item}}</view>
		</view>
		<view class="couponbox" v-if="!noDataIsShow">
			<view class="couponlist">
				<view style="height: 96upx;"></view>
				<view class="listtop" @click="getConpon">
					<image class="couponimg" src="http://www.sc-mall.net/static/coupon.png"></image>
					<text>领券中心</text>
					<view class="uni-icon uni-icon-arrowright" style="margin: 0 10upx;"></view>
				</view>
				<view class="list1"> 
					<view :class="[navindex==0?'coupon1':'',navindex==1?'coupon2':'',navindex==2?'coupon3':'']" v-for="(item,index) in 3" :key="index">
						<view class="topbox">
							<!-- <view class="couponleft">
								<view class="price" v-if="item.DiscountType=='1'"><text>￥</text><text class="num">{{item.Denomination}}</text></view>
								<view class="price" v-if="item.DiscountType=='2'"><text class="num">{{item.Denomination}}</text><text>折</text></view>
								<view class="lefttxt" v-if="item.MeetConditions!='0'">满{{item.MeetConditions}}元可用</view>
								<view class="lefttxt" >满300元可用</view>
								<view class="lefttxt" v-else>无门槛</view>
							</view> -->
							<view class="couponright">
								<view class="couponname">item.Title</view>
								<view class="coupontime">item.AddTime-item.EndTime</view>
							</view>
							<block v-if="navindex==0">
								<view class="bb_right">
									20 <span class="font26">元</span>
								</view>
								<!-- <view class="couponbtn" @click="gotoUse(item.CouponId)">
									<view>立即使用</view>
								</view>
								<view class="lookmore" @click="showtxt(index)">
									<text :class="['uni-icon',item.hasshowtxt?'uni-icon-arrowup':'uni-icon-arrowdown']" style="color: #9b9b9b; font-size: 36upx;"></text>
								</view> -->
							</block>
						</view>
						<view class="coupontxt" v-if="item.hasshowtxt&&navindex==0">详细信息：{{item.ScopeOfUse}}</view>
					</view>
				</view>
			</view>
			<view class="uni-tab-bar-loading">
				<uni-load-more :loadingType="loadingType"></uni-load-more>
			</view>
		</view>
		<!-- 没数据页面 -->
		<view class="nodata" v-if="noDataIsShow">
			<view style="height: 323upx;"></view>
			<view class="nocoupon"><image src="http://www.sc-mall.net/static/coupon1.png"></image></view>
			<block v-if="navindex==0">
				<view class="notxt1">暂无优惠券</view>
				<view class="notxt2">去领券中心看看吧</view>
				<view class="gotobtn" @click="getConpon">领券中心</view>
			</block>
			<block v-else>
				<view class="notxt1">暂无数据</view>
			</block>
		</view>
	</view>
</template>

<script>
	import {host,post,get,dateUtils,toLogin,getCurrentPageUrlWithArgs} from '@/common/util.js';
	import uniLoadMore from '@/components/uni-load-more.vue';
	export default {
		components:{
			uniLoadMore
		},
		onLoad: function() {
			this.curPage = getCurrentPageUrlWithArgs().replace(/\?/g, '%3F').replace(/\=/g, '%3D').replace(/\&/g, '%26');
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
		},
		onShow(){
			this.navselect(0);
		},
		data() {
			return {
				userId: "",
				token: "",
				curPage:"",
				loadingType: 0, //0加载前，1加载中，2没有更多了
				isLoad: false,
				hasData: false,
				noDataIsShow: false,
				page: 1,
				pageSize: 20,
				allPage: 0,
				count: 0,
				Status:0,//0全部，1已过期，2未使用，3已使用
				couponlist:{},
				navindex:0,
				navlist:["未使用","已使用","已过期/失效"]
			};
		},
		methods: {
			//去领券
			getConpon(){
				uni.navigateTo({
					url:'/pages/couponGet/couponGet'
				})
			},
			//去使用
			gotoUse(couponid){
				uni.navigateTo({
					url:'/pages/ProductList/ProductList?couponid='+couponid
				})
			},
			navselect(index){
				this.navindex=index;
				if(index==0){
					this.Status=2;
				}else if(index==1){
					this.Status=3;
				}else if(index==2){
					this.Status=1;
				}
				this.loadingType = 0;
				this.hasData = false;
				this.noDataIsShow = false;
				this.isLoad = false;
				this.page = 1;
				this.allPage = 0;
				this.count = 0;
				this.couponlist = {};
				this.CouponList();
			},
			/*获取优惠券列表*/
			async CouponList() {
				let result = await post("User/CouponList", {
					"UserId": this.userId,
					"Token": this.token,
					"page": this.page,
					"pageSize": this.pageSize,
					"Status": this.Status
				});
				if (result.code === 0) {
					let _this=this;
					if (result.data.length > 0) {
						this.hasData = true;
						result.data.forEach(function(item){
							if(item.DiscountType=="2"){
								item.Denomination=item.Denomination*10
							}
							item.MeetConditions=parseInt(item.MeetConditions);
							item.AddTime=item.AddTime.split(" ")[0].replace(/\//g,".");
							item.EndTime=item.EndTime.split(" ")[0].replace(/\//g,".");
							_this.$set(item,"hasshowtxt",false);
						})
					}
					this.count = result.count;
					if (this.count == 0) {
						this.noDataIsShow = true;
					}
					if (parseInt(this.count) % this.pageSize === 0) {
						this.allPage = this.count / this.pageSize;
					} else {
						this.allPage = parseInt(this.count / this.pageSize) + 1;
					}
					if (this.page === 1) {
						this.couponlist = result.data;
					}
					if (this.page > 1) {
						this.couponlist = this.couponlist.concat(
							result.data
						);
					}
					if (this.allPage <= this.page) {
						this.isLoad = false;
						this.loadingType = 2;
					} else {
						this.isLoad = true;
						this.loadingType = 0
					};
				} else if (result.code === 2) {
					let _this =this;
					uni.showModal({
						content: "您还没有登录，是否重新登录？",
						success(res) {
							if (res.confirm) {
								uni.navigateTo({
								  url: "/pages/login/login?askUrl="+_this.curPage
								});
							} else if (res.cancel) {
							}
						}
					});
				} else {
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 2000
					});
				}
			},
			showtxt(index){
				this.couponlist[index].hasshowtxt=!this.couponlist[index].hasshowtxt
			}
		},
		onReachBottom: function() {
			if (this.isLoad) {
				this.loadingType = 1;
				this.page++;
				this.CouponList();
			} else {
				this.loadingType = 2;
			}
		},
		onPullDownRefresh() { //下拉刷新
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			let _this=this;
			_this.page = 1;
			_this.loadingType = 1;
			setTimeout(function () {
				_this.CouponList();
				uni.stopPullDownRefresh();  //停止下拉刷新动画
			}, 1000);
		},
	}
</script>

<style scoped>
@import "./style";
</style>
