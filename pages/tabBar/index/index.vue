<template>
	<view class="home index" style="height: 100%;" id="allmap">
		<view style="width: 100%;background:#ff3333;" :style="{'height':barHeight+'px'}"></view>
		<!--顶部搜索导航-->
		<view class="index_nav uni-tab-bar">
			<view class="flex justifyContentBetween">
				<view class="flex flexAlignCenter" @click="tolink('/pages/other/chooseCity/chooseCity')">
					<view class="locale uni-ellipsis">{{cityname}}</view>
					<view class="iconfont icon-shouhuodizhi font12"></view>
				</view>
				<view class="flex search flexAlignCenter pw2" @click="tolink('/pages/homePage/proList?typeId='+menubarlist[0][0].Id+'&isOpen=1')">
					<view class="iconfont icon-sousuo"></view>
					<input type="text" placeholder="请输入关键字" disabled="true">
					<!-- <view class="iconfont icon-xiangji"></view> -->
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
		<view class="index_Content uni-tab-bar" :style="{'height':headheight+'px'}">
			<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
				<swiper-item>
					<scroll-view class="uni-index-wrap" scroll-y @scrolltolower="loadMore">
						<!--轮播图-->
						<view class="page-section swiper">
							<view class="page-section-spacing">
								<swiper class="swiper" :indicator-dots="true" :autoplay="false" :interval="5000" :duration="500" indicator-color="#fff" indicator-active-color="#ff3333">
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
								<swiper class="swiper" style="height: 400upx;" :indicator-dots="showdots" :autoplay="false" :interval="5000" :duration="500" indicator-color="#fff" indicator-active-color="#ff3333">
									<swiper-item v-for="(val,index) in menubarlist" :key="index" class="tab_list" scroll-x :scroll-left="scrollLeft2">
										<view  class="tab_item" v-for="(tab, index) in val" :key="index" @click="tolink('/pages/homePage/proList?typeId='+tab.Id)">
											<view>
												<image :src="tab.Pic" class="tab_img" mode="aspectFill"></image> 
											</view>
											<view class="tab_name center"> {{tab.Name}} </view>
										</view>
									</swiper-item>
								</swiper>
							</view>
						</view>
						<!--拼品牌馆-->
						<view class="index_pin">
							<image src="http://ddyp.wtvxin.com/static/of/f1.png" mode="widthFix"></image>
							<view class="pin_list flex">
								<view class="pin_item flex justifyContentBetween flexAlignEnd" v-for="(item,key) in brandList" :key="key" :class="{'bg1':key==0,'bg2':key==1,'bg3':key==2,'bg4':key==3}" @click="tolink('/pages/brand/brandIndex/brandIndex?BrandId='+item.Id)">
									<view class="flex flexColumn flexAlignStart pp_left flex1">
										<view class="item_logo">
											<image :src="item.Logo" mode="aspectFill"></image>
										</view>
										<view class="flex justifyContentBetween item_info">
											<view :class="{'color1':key==0,'color2':key==1,'color3':key==2,'color4':key==3}">
												<!-- <view class="item_info_title">{{item.Name}}</view> -->
												<view class="item_sige">{{item.Intro}}</view>
											</view>
										</view>
									</view>
									<view class="right_img">
										<image :src="item.Pic" mode="aspectFill"></image>
									</view>
								</view>
							</view>
						</view>
						<!--特惠-->
						<view class="hui mt2">
							<image src="http://ddyp.wtvxin.com/static/of/f2.png" mode="aspectFill" class="hui_bg"></image>
							<view class="flex hui_title">
								<view class="mr2">{{system.Pp_Desc}}</view>
								<view class="flex tile_time">
									<view class="mr1">仅剩</view>
									<view class="flex justifyContentCenter flexAlignCneter">
										<span class="time_span">{{timeStr[0]}}</span>:
										<span class="time_span">{{timeStr[1]}}</span>:
										<span class="time_span">{{timeStr[2]}}</span>
									</view>
								</view>
							</view>
							<view class="list flex justifyContentBetween">
								<view v-for="(item,index) in PPbannerlist" :key="index" class="item_img" @click="tolink('/pages/brand/brandproLsit/brandproLsit')">
									<image :src="item.Pic" mode="aspectFill" v-if="index<3"></image>
								</view>
							</view>
						</view>
						<!--推荐推荐-->
						<view class="jian mt2" v-if="hasrec">
							<image src="http://ddyp.wtvxin.com/static/of/f3.png" mode="aspectFill" class="jian_bg"></image>
							<view class="jian_sign">美 好 生 活 抢 先 到</view>
							<view class="page-section HotsellList uni-bg-white uni-pd10 uni-mb10">
								<view class="uni-bd uni-mt10">
									<scroll-view class="scroll-view_H Hotsell-list" scroll-x="true" scroll-left="0">
										<view class="scroll-view-item_H" v-for="(item,index) in recProductlist" :key="index" @click="tolink('/pages/homePage/details?id='+item.Id)">
											<view class="itembox">
												<view class="image-view">
													<image class="img" :src="item.PicNo" mode="aspectFill"></image>
												</view>
												<view class="txtbox">
													<view class="txt uni-ellipsis">{{item.Name}}</view>
													<view class="uni-product-price">
														<text class="uni-product-price-original">￥{{item.Price}}</text>
														<text class="uni-product-price-favour" v-if="item.MarketPrice>item.Price">￥{{item.MarketPrice}}</text>
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
									<image :src="item.PicNo" class="item_img" mode="aspectFill"></image>
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
							<view class="uni-tab-bar-loading"><uni-load-more :loadingType="loadingType"></uni-load-more></view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item v-if="index1<Typelist.length-1" v-for="(tab,index1) in Typelist" :key="index1">
					<scroll-view class="menu_wrap" scroll-y @scrolltolower="loadMore(index1)">
						<view class="menu">
							<view class="list flex flexWrap justifyContentBetween" v-if="hasData">
								<view class="item" v-for="(item,index) in datalist" :key="index" @click="tolink('/pages/homePage/details?id='+item.Id)">
									<image :src="item.PicNo" mode="aspectFill" class="item_img"></image>
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
							<view class="uni-tab-bar-loading" v-if="hasData"><uni-load-more :loadingType="loadingType"></uni-load-more></view>
							<noData :isShow="noDataIsShow"></noData>
						</view>	
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		
	</view>
</template>

<script>
	import {post,get,toLogin} from '@/common/util.js';
	// #ifdef H5
	import {MP} from '@/common/map.js';//h5百度定位
	// #endif
	import noData from '@/components/noData.vue'; //暂无数据
	import uniLoadMore from '@/components/uni-load-more.vue'; //加载更多
	export default{
		data(){
			return{
				cityname:"",//定位城市
				bannerlist:[], // 轮播图
				PPbannerlist:[],//品牌馆特惠banner
				system:{},//平台信息
				timeStr:[],//特惠倒计时
				Typelist:[],           // 头部
				menubarlist:[],        // 菜单
				hasrec:false,
				recProductlist:[],        // 精选推荐
				hashand:false,
				handpick:[],           // 精选
				indextid:"",//首页tab切换分类id
				handlist:[],           // 精选列表
				brandList:[],          //品牌馆
				scrollLeft:0,
				scrollLeft2:0,
				tabIndex:0,
				indexs:0,
				IsRecommend:1,//1: 推荐
				IsHot:1,//精选
				IsNew:1,//新品
				tid:"",//类型id
				cid:"",//分类id
				hasData: false,
				noDataIsShow: false,
				loadingType: 0, //0加载前，1加载中，2没有更多了
				pageSize:6,
				page: 1,
				isLoad: false,
				datalist:[],//顶部分类产品
				newscount:0,
				barHeight:0,
				headheight:0,
				showdots:false,
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
			var height = plus.navigator.getStatusbarHeight();
			this.barHeight = height;
			// #endif
			// #ifdef H5
			this.barHeight = 0;
			// #endif
			this.banner();
			this.typelist();
			this.getsystem();//平台设置
			this.getBrandList() //品牌馆
			this.Recprolist();//精选推荐
			this.hand();//获取精选等分类列表
			this.headheight=uni.getSystemInfoSync().windowHeight-this.barHeight-uni.upx2px(180);
			var _this=this
			// #ifdef APP-PLUS||MP-WEIXIN
			uni.getLocation({
			    type: 'wgs84',
				geocode: true,
			    success: function (res) {
					// #ifdef APP-PLUS
					var cityname=res.address.city.replace(/市/,'')
					uni.setStorageSync('cityname',cityname)
					// #endif
					// #ifdef MP-WEIXIN
					_this.wxGetCity(res.longitude,res.latitude)
					// #endif
			        console.log(res);
			    }
			});
			// #endif
			//百度定位
			// #ifdef H5
			MP().then(BMap => {
				var _this=this
				let myCity = new BMap.LocalCity()
				myCity.get(function (res) {
					var cityname=res.name.replace(/市/,'')
					uni.setStorageSync('cityname',cityname)
					_this.cityname=cityname
				console.log(cityname)
				})
			})
			// #endif
			
		},
		onShow(){
			if(uni.getStorageSync("userId")&&uni.getStorageSync("token")){
				this.NewsCount();
			}
			this.cityname=uni.getStorageSync("cityname");console.log(this.cityname+'222222')
		},
		components:{noData,uniLoadMore},
		methods:{
			//小程序解析经纬度获取城市
			// #ifdef MP-WEIXIN
			wxGetCity(lon,lat){
				var _this=this
				wx.request({
					url:'https://api.map.baidu.com/reverse_geocoding/v3/?ak=thbHKWI9ZZtgGYxwGFbKSolcNe9gCZKG&location=' + lat + ',' + lon + '&output=json&coordtype=wgs84ll',
					data: {},
					header: {
						'content-type': 'application/json' // 默认值
					},
					success (res) {
					    console.log(res)
						var cityname=res.data.result.addressComponent.city.replace(/市/,'')
						uni.setStorageSync('cityname',cityname)
						_this.cityname=cityname
					}
				})
			},
			// #endif
			async getBrandList(){
				let res = await post('Goods/BrandList',{})
				if(res.code == 0){
					this.brandList = res.data.slice(0,4)
				}
			},
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
			async getprolist() {
				let result = await post("Goods/GoodsList", {
					Page: this.page,
					PageSize: this.pageSize,
					TypeId:this.tid,
					ClassId:this.cid
				}); 
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
			
			//获取精选推荐产品
			async Recprolist(){
				let res = await post('Goods/GoodsList',{
					Page: 1,
					PageSize: 10,
					IsRecommend: 1,
					IsHot:1
				})
				if(res.code==0){ //首页精选推荐
					if(res.data.length){
						this.hasrec=true;
						this.recProductlist = res.data
					}else{
						this.hasrec=false;
					}
				}
			},
			handItem(id,index){
				if (this.indexs === index) {
					return false;
				}else{
					this.page=1;
					this.indextid=id;
					this.indexs = index;
					this.hand();
				}
			},
			//精选列表获取分类列表
			async hand() {
				let datajson={};
				if(this.indexs==0){
					datajson={
						Page: this.page,
						PageSize: this.pageSize,
						IsHot: 1, //推荐
					}
				}else if(this.indexs==1){
					datajson={
						Page: this.page,
						PageSize: this.pageSize,
						IsSubsidy:1,//有补贴
						//IsUseCoupons:1//有券
					}
				}else{
					datajson={
						Page: this.page,
						PageSize: this.pageSize,
						TypeId:this.indextid,
					}
				}
				let result = await post("Goods/GoodsList",datajson);
				if (result.code === 0) {
					let _this=this;
					if (result.data.length > 0) {
						this.hashand = true;
						this.noDataIsShow = false;
					}
					if (result.data.length == 0&&this.page==1) {
						this.noDataIsShow = true;
						this.hashand = false;
					}
					if (this.page === 1) {
						this.handlist = result.data;
					}
					if (this.page > 1) {
						this.handlist = this.handlist.concat(
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
			//顶部导航滑动切换
			async changeTab(e) {
				this.page=1;
				let index = e.detail.current;
				this.tid= this.Typelist[index].Id;
				this.cid='';
				this.tabIndex = index;
				this.getprolist()
			},
			//顶部导航点击跳转
			tapTab(index,id){
				if (this.tabIndex === index) {
					return false;
				} else {
					this.page=1;
					this.tabIndex = index;
					this.setScrollLeft(index)
					this.tid=id;
					this.cid='';
					this.getprolist()
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
				let res = await post("Banner/BannerList", {
					Cid:4
				});
				if (result.code === 0) {
					this.bannerlist = result.data
				}
				if (res.code === 0) {
					this.PPbannerlist = res.data.slice(0,3)
				}
			},
			// 获取类型(商品)
			async typelist(){
				this.menubarlist = []
				let result = await post("Goods/TypeList", {
					Type:0
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
					if(this.menubarlist.length>1){
						this.showdots=true
					}else{
						this.showdots=false
					}
				}
			},
			async getsystem(){
				let res=await get('system/GetWebConfiguration',{})
				if(res.code==0){
					this.system=res.data;
					this.GetRTime(res.data.Pp_ExpireTime)
				}
			},
			//倒计时
			GetRTime(overTime) {
			  let _this = this;
			  var arr=overTime.split(":")
			  var t=arr[0]*3600+arr[1]*60+arr[2]*1;console.log(t)
			  var timer = setInterval(function() {
			  t--
			  if (t > 0) {
				let min = Math.floor(t % 3600)
				let h = Math.floor(t / 3600);//时
				let m = Math.floor(min / 60); //分
				let s = Math.floor(t % 60); //秒
				if (parseInt(h) < 10) {
				h = "0" + h;
				}
				if (parseInt(m) < 10) {
				m = "0" + m;
				}
				if (parseInt(s) < 10) {
				s = "0" + s;
				}
				_this.timeStr=[h,m,s];console.log(_this.timeStr)
				// timeStr=h+":"+m+":"+s;
			  } else {
				_this.timeStr=['00','00','00'];
				clearInterval(timer);
			  }
			  }, 1000);
			},
			loadMore(e) {
				if (this.isLoad) {
					this.loadingType = 1;
					this.page++;
					if(e){
						this.getprolist();
					}else{
						this.hand();
					}
				} else {
					this.loadingType = 2;
				}
			},
			
		},
		// 上拉加载
		// onReachBottom: function() {
		// 	if (this.isLoad) {
		// 		this.loadingType = 1;
		// 		this.page++;
		// 		this.productlist();
		// 		this.hand();
		// 	} else {
		// 		this.loadingType = 2;
		// 	}
		// }

			
		
	}
</script>

<style scoped lang="scss">
	@import './style';
</style>
