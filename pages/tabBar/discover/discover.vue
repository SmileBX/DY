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
					<view class="iconfont icon-caidan" @click="tolink('/pages/classify/classify')"></view>
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
						<view class="flex flexAlignCenter">
							<view class="color_gray">更多</view>
							<view class="uni-icon uni-icon-arrowright"></view>
						</view>
					</view>
					<view class="list flex justifyContentBetween">
						<view class="item" v-for="(item,index) in 3" :key="index">
							<image src="../../../static/icons/hot_bg.png" class="bg"></image>
							<image src="../../../static/of/4.png"></image>
							<view class="item_title">奥迪A4 Avant 先锋派</view>
							<view class="brand">1</view>
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
								<view class="scroll-view-item_H" v-for="(item,index) in 6" :key="index" @click="goDetail(item.Id)">
									<view class="itembox">
										<view class="image-view">
											<image class="img" src="../../../static/of/3.png" mode="aspectFill"></image>
										</view>
										<view class="txtbox">
											<view class="txt uni-ellipsis">珍视明眼药水</view>
											<view class="uni-product-price">
												<text class="uni-product-price-original">￥2万(补贴)</text>
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
					<view class="menu_item flex flexAlignCenter flexColumn" v-for="(item,pll) in navlist" :key="pll" :class="{'active':pll==1}">
						<view class="title">{{item.title}}</view>
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
	
	export default {
		
		data() {
			return {
				navlist:[{id:1,title:'为您推荐'},{id:2,title:'精选推荐'}],
				userId: "",
				token: "",
				curPage:"",
				loadingType: 0, //0加载前，1加载中，2没有更多了
				isLoad: false,
				hasData: false,
				noDataIsShow: false,
				page: 1,
				pageSize: 5,
				allPage: 0,
				count: 0,
				medialist: {},
				tabIndex: 0, //0我的，1指定用户，2推荐，3资讯，4搜索，5店铺,6活动
				tabBars: [{
						name: '推荐',
						type: 2
					},
					{
						name: '此刻',
						type: 4
					},
					{
						name: '体验',
						type: 6
					},
					{
						name: '资讯',
						type: 3
					}
				]
			}
		},
		onLoad: function() {
			
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
		},
		onShow(){
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			// this.tapTab(2);
		},
		methods: {
			search() {
				uni.navigateTo({
					url: '/pages/Search/search_art/search_art'
				});
			},
			Issue() {
				if(toLogin(this.curPage)){
					uni.navigateTo({
						url: '/pages/Article/artPost/artPost'
					})
				}
			},
			/*获取发现列表*/
			
			async FindList() {
				let result;
				let that =this;
				if(this.tabIndex==6){
					result = await post("Find/ActivityList", {
						"UserId": this.userId,
						"Token": this.token,
						"page": this.page,
						"pageSize": this.pageSize,
						"myType": 0,//0全部，1热门，2置顶，3推荐
						"SearchKey": ""
					});
				}else{
					result = await post("Find/FindList", {
						"UserId": this.userId,
						"Token": this.token,
						"page": this.page,
						"pageSize": this.pageSize,
						"myType": this.tabIndex,
						"MemberId": "",
						"SearchKey": ""
					});
				}
				if (result.code === 0) {
					result.data.forEach(function(item) {
						if(that.tabIndex==6){
							item.AddTime=item.AddTime.split("T")[0];
						}else{
							item.Addtime=dateUtils.format(item.Addtime);
						}
					})
					if (result.data.length > 0) {
						this.hasData = true;
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
						this.medialist = result.data;
					}
					if (this.page > 1) {
						this.medialist = this.medialist.concat(
							result.data
						);
					}
					if (this.allPage <= this.page) {
						this.isLoad = false;
						this.loadingType = 2;
					} else {
						this.isLoad = true;
						this.loadingType = 0
					}
				} else if (result.code === 2) {
					 this.userId=uni.setStorageSync("token", "");
					 this.token=uni.setStorageSync("userId", "");
					 this.FindList();
				} else {
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 2000
					});
				}
			},
			tapTab(type) {
				this.tabIndex = type;
				this.loadingType = 0;
				this.hasData = false;
				this.noDataIsShow = false;
				this.isLoad = false;
				this.page = 1;
				this.allPage = 0;
				this.count = 0;
				this.medialist = {};
				// this.FindList();
			},
			//链接详情页
			goDetail(e) {
				if(e.artType==0){//用户发布详情
					uni.navigateTo({
						url: '/pages/Article/artDetail/artDetail?id='+e.id
					})
				}else{//资讯详情、店铺
					uni.navigateTo({
						url: '/pages/Article/NewsDetail/NewsDetail?id='+e.id
					})
				}
			},
			//关注
			async flow(FindType,ShopId,MemberId,index){
				let result;
				if(FindType==0){
					result = await post("Find/FollowOperation", {
						"UserId": this.userId,
						"Token": this.token,
						"ToMemberId":MemberId
					});
				}else if(FindType==1){
					result = await post("Goods/ShopCollection", {
						"UserId": this.userId,
						"Token": this.token,
						"ShopId":ShopId
					});
				}
				if (result.code === 0) {
					uni.showToast({
						title: result.msg
					})
					if(this.medialist[index].IsFollow==0){
						this.medialist[index].IsFollow=1;
					}else{
						this.medialist[index].IsFollow=0;
					}

				} else if (result.code === 2) {
					let _this = this;
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
			//预览图片
			previewImg(obj){
				uni.previewImage({
					current:obj.imgurls[obj.index],
					urls: obj.imgurls,
					indicator:obj.imgurls.length
				});
			}
		},
		onReachBottom: function() {
			if (this.isLoad) {
				this.loadingType = 1;
				this.page++;
				this.FindList();
			} else {
				this.loadingType = 2;
			}
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			let _this=this;
				_this.page=1;
				_this.loadingType = 1;
				_this.medialist={};
			setTimeout(function () {
				_this.FindList();
				uni.stopPullDownRefresh();  //停止下拉刷新动画
			}, 1000);
		}
	}
</script>

<style scoped lang="scss">
	@import "./style";
	.uni-icon{
		
	}
</style>
