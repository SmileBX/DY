<template>
	<view class="content myCollectPage">
		
		<view class="carthead"  :style="{'padding-top':barHeight+'px'}">
			<text>收藏</text>
		</view>
		<view class="hasContentPage">
			<view class="uni-tab-bar bg_fff">
				<scroll-view id="tab-bar" :class="['uni-swiper-tab tabList li_50',isMultipleStore>0?'':'w50']">
					<view :class="['swiper-tab-list',tabIndex==0 ? 'active' : '']" id="list0" @click="tapTab(0)">
						<view class="s">商品收藏</view>
					</view>
					<view v-if="isMultipleStore>0" :class="['swiper-tab-list',tabIndex==1 ? 'active' : '']" id="list1" @click="tapTab(1)">
						<view class="s">店铺收藏</view>
					</view>
				</scroll-view>
			</view>
			<noData :isShow="noDataIsShow"></noData>
			<scroll-view scroll-y="true"  @scrolltolower="loadMore">
				<view>
					<view class="collect_list">
						<!--店铺收藏-->
						<view class="list" style="display: none;">
							<view class="item mt10" v-for="(item,key) in 4" :key="key">
								<view class="flex item_shop flexAlignCenter">
									<image src="../../../static/of/shop.png" class="shop_logo"></image>
									<view class="flex1 uni-bold">雅邦美妆旗舰店</view>
								</view>
								<view class="item_list flex mt2">
									<view class="flex flexColumn flexAlignCenter item_list_fill" v-for="(item,index) in 3" :key="index">
										<view class="img flex flexAlignCenter justifyContentCenter">
											<image src="../../../static/of/car.png"></image>
										</view>
										<view>¥33万</view>
									</view>
								</view>
							</view>
						</view>
						<!--商品收藏-->
						<view class="list">
							<view class="pro_item_list" v-for="(item,index) in 3" :key="index">
								<view class="pp2">1天前</view>
								<view class="item_view">
									<view class="item_pro flex" v-for="(item,key) in 2" :key="key">
										<image src="../../../static/of/4.png"></image>
										<view class="flex flexColumn flex1">
											<view class="uni-bold">牙套牙齿矫正器</view>
											<view class="flex">
												<view class="color_red">¥1680 <span class="line_thin">￥2080</span></view>
												<view class="flex flag">
													<span class="flag_pill">返</span>
													<span class="flag_mon color_red">￥2万</span>
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 没有更多数据了 -->
					<view class="uni-tab-bar-loading">
						<uni-load-more :loadingType="loadingType"></uni-load-more>
					</view>
				</view>			
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import noData from '@/components/noData.vue'; //暂无数据
	import uniLoadMore from '@/components/uni-load-more.vue'; //加载更多
	import {host,post,get,dateUtils,toLogin,getCurrentPageUrlWithArgs} from '@/common/util.js';
	import "@/common/dd_style.css";
	export default {
		onLoad() {
          // this.initData();
		  // #ifdef APP-PLUS
		  var height = plus.navigator.getStatusbarHeight();
		  this.barHeight = height;
		  // #endif
		  // #ifdef H5
		  this.barHeight = 0;
		  // #endif
          
		},
		onShow() {
			this.initData();
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.curPage = getCurrentPageUrlWithArgs().replace(/\?/g, '%3F').replace(/\=/g, '%3D').replace(/\&/g, '%26');
			// this.SystemInfo();
			// this.collectionsList();
		},
		data() {
			return {
				barHeight:0,
				tabIndex: 0,
				curPage:"",
				userId: "",
				token: "",
				isMultipleStore:1,//0表示没有店铺
				type: 0, //0:产品收藏；1：商家收藏 2：众筹收藏
				list: [],
				proIdArr:[],
				listLength:0,
				page: 1,
				pageSize: 8,
				count: 0,
				allPage: 0,
				isLoad: false,
				isOved: false,
				isShowDel:false,  //是否显示删除的底部
				noDataIsShow:false,
				loadingType: 0, //0加载前，1加载中，2没有更多了
			};
		},
		components:{
			noData,
			uniLoadMore
		},
		methods: {
			//是否开启多店铺
			async SystemInfo(){
				let result = await get("System/GetWebConfiguration",{});
				if (result.code === 0) {
					this.isMultipleStore = result.data.IsMultipleStores;
				}
			},
			tapTab(index) { //点击tab-bar
				this.tabIndex = index;
				this.type = index;
				this.initData();
				this.collectionsList();
			},
			gotoPage(id) {
				let gotoUrl = '';
				if(this.type===0){  //产品收藏
					gotoUrl = "/pages/productDetail/productDetail?proId="+id;
				}
				if(this.type===1){  //店铺收藏
					gotoUrl = "/pages/store/storeIndex/storeIndex?shopId="+id;
				}
				if(this.type===2){  //众筹收藏
					gotoUrl = "/pages/Crowdfunding/zc_details/zc_details?proId="+id;
				}
				uni.navigateTo({
					url: gotoUrl
				})
			},
			initData() {
				this.list = [];
				this.proIdArr = [];
				this.page = 1;
				this.count = 0;
				this.allPage = 0;
				this.isShowDel = false;
				this.loadingType = 0;
				this.noDataIsShow = false;
			},
			shiftChecked(index){  //选择
				this.list[index].checked=!this.list[index].checked;
			},
			//点击编辑
			ShowDel(){
				this.isShowDel=true;
			},
			cancelDel(){
				this.isShowDel=false;
				this.proIdArr=[];
				this.list.forEach(function(item) {
					item.checked=false;
				})
			},
			btnDel(){  //删除收藏的产品
				let _this = this;
				this.list.forEach(function(item){
					if(item.checked==true){
						_this.proIdArr.push(item.Id);
					}
				})
				if(this.proIdArr.length>0){
					this.DeleteCollections();
				}else{
					uni.showToast({
						title: "请选择需要删除的项！",
						icon: "none",
						duration: 1500
					});
				}
			},
			loadMore(){  //加载更多
				if (this.isLoad) {
					this.page++;
					this.collectionsList();
				} else {
					if (this.page > 1) {
						this.isOved = true;
					} else {
						this.isOved = false;
					}
				}
			},
			async collectionsList() {
				let result = await post("User/MemberCollectionsList", {
					UserId: this.userId,
					Token: this.token,
					Type: this.type,
					page: this.page,
					pageSize: this.pageSize
				});
				if (result.code === 0) {
					this.count = result.count;
					if (this.count == 0) {
						this.noDataIsShow = true;
					}
					if (parseInt(this.count) % this.pageSize === 0) {
						this.allPage = this.count / this.pageSize;
					} else {
						this.allPage = parseInt(this.count / this.pageSize) + 1;
					}
					if (result.data.length > 0) {
						for(let i=0;i<result.data.length;i++){
							this.$set(result.data[i],"checked",false);
							this.$set(result.data[i],"collectTxt",true);
						}
						this.list = this.list.concat(result.data);
					}
					if (this.allPage > this.page) {
						this.isLoad = true;
						this.loadingType = 0
					} else {
						this.isLoad = false;
						this.loadingType = 2;
					}
					this.listLength = this.list.length;
				}else if(result.code===2){
					let _this = this;
					uni.showToast({
						title: "登录超时！",
						icon: "none",
						duration: 1500,
						success:function(){
							setTimeout(function(){
								uni.navigateTo({
									url:"/pages/login/login?askUrl?="+_this.curPage
								})
							},1500)
						}
					});
				}else{
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 1500
					});
				}
			},
			async DeleteCollections(){  //取消产品收藏
				let result = await post("User/DeleteCollections",{
					UserId:this.userId,
					Token:this.token,
					Id:this.proIdArr.join(",")
				});
				if(result.code===0){
					let _this = this;
					for(let j=0;j<_this.proIdArr.length;j++){
						for(let i=0;i<_this.listLength;i++){
							if(_this.list[i]){
								if(_this.proIdArr[j]==_this.list[i].Id){
									_this.list.splice(i,1);
								}
							}
						}
					}
					_this.listLength = _this.list.length;
					_this.proIdArr = [];
					_this.proIndexArr = [];
					if(this.list.length===0){
						this.noDataIsShow = true;
					}
					uni.showToast({
						title: "取消成功！",
						icon: "none",
						duration: 1500
					});
				}
			},
			//添加取消收藏
			async DeleteCrowdfundcollect(ZcProId,index){
				let result = await post("Crowdfunding/CrowdfundingCollection", {
					ZcProId: ZcProId,
					userId:this.userId,
					token:this.token,
				  });
				if(result.code==0){
					uni.showToast({
						title: result.msg,
						icon:"none",
						duration: 1500
					});
					this.list[index].collectTxt=!this.list[index].collectTxt;
				};
				if(result.code==2){
					//登录超时，请重新登录
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
				}
			}
		},
		onPullDownRefresh() { //下拉刷新
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			let _this=this;
			_this.initData();
			setTimeout(function () {
				_this.collectionsList();
				uni.stopPullDownRefresh();  //停止下拉刷新动画
			}, 1000);
		},
		onReachBottom() { //上拉加载
			
		}
	}
</script>

<style scoped lang="scss">
	@import './style';
	.hasContentPage {
		position: relative;top:88upx;
		height: calc(100% - 88upx);
		overflow-y: auto;
	}
	
	.uni-tab-bar {
		height: 80upx;
	}
	.li_50 .swiper-tab-list {
		width: 50%;
		margin: 0;
	}
	.li_33.w50 .swiper-tab-list{ width: 50%;}
	.li_33 .swiper-tab-list .s {
		display: inline-block;
		line-height: 80upx;
		height: 80upx;
	}

</style>
