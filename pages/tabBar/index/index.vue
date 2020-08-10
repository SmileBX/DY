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
			<scroll-view id="tab-bar" class="scroll-tab mt2" scroll-x :show-scrollbar="false" :scroll-left="scrollLeft" style="display: flex;">
				<view v-for="(tab,index) in Typelist" :key="index" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']" :id="'tabNum'+index"
				 :data-current="index" @click="tapTab(index,tab.Id)">
					<view class="s"> {{tab.Name}} </view>
				</view> 
			</scroll-view> 
		</view>
		<view class="index_Content uni-tab-bar" :style="{'height':headheight+'px'}">
			<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
				<swiper-item>
					<scroll-view class="uni-index-wrap" scroll-y @scrolltolower="loadMore(-1)">
						<!--轮播图-->
						<view class="page-section swiper">
							<view class="page-section-spacing">
								<swiper class="swiper" :indicator-dots="true" :autoplay="false" :interval="5000" :duration="500" indicator-color="#fff" indicator-active-color="#ff3333">
									<swiper-item v-for="(banner,key) in bannerlist" :key="key" @click="bannerchlik(banner)">
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
										<view  class="tab_item" v-for="(tab, index) in val" :key="index"
										 @click="tolink('/pages/homePage/proList?typeId='+tab.Id)">
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
							<image src="http://shop.dadanyipin.com/static/of/f1.png" mode="widthFix"></image>
							<!-- <view class="pin_list flex">
								<view class="pin_item flex justifyContentBetween flexAlignEnd" v-for="(item,key) in brandList" :key="key" :class="{'bg1':key==0,'bg2':key==1,'bg3':key==2,'bg4':key==3}" @click="tolink('/pages/brand/brandIndex/brandIndex?BrandId='+item.Id)">
									<view class="flex flexColumn flexAlignStart pp_left flex1">
										<view class="item_logo">
											<image :src="item.Logo"></image>
										</view>
										<view class="flex justifyContentBetween item_info">
											<view :class="{'color1':key==0,'color2':key==1,'color3':key==2,'color4':key==3}">
												
												<view class="text_flow item_sige">{{item.Intro}}</view>
											</view>
										</view>
									</view>
									<view class="right_img">
										<image :src="item.Pic" mode="aspectFill"></image>
									</view>
								</view>
							</view> -->
							<view class="pin_list flex">
								<view class="pin_item flex justifyContentBetween flexAlignEnd" v-for="(item,key) in brandList" :key="key" :class="{'bg1':key==0,'bg2':key==1,'bg3':key==2,'bg4':key==3}" @click="tolink('/pages/brand/brandIndex/brandIndex?BrandId='+item.Id)">
									<!-- <view class="flex flexColumn flexAlignStart pp_left flex1">
										<view class="item_logo">
											<image :src="item.Logo"></image>
										</view>
										<view class="flex justifyContentBetween item_info">
											<view :class="{'color1':key==0,'color2':key==1,'color3':key==2,'color4':key==3}">
												
												<view class="text_flow item_sige">{{item.Intro}}</view>
											</view>
										</view>
									</view> -->
									<view class="right_img">
										<image :src="item.Pic" ></image>
									</view>
								</view>
							</view>
						</view>
						<!--特惠-->
						<view class="hui mt2">
							<image src="http://shop.dadanyipin.com/static/of/f2.png" mode="aspectFill" class="hui_bg"></image>
							<view class="flex hui_title">
								<view class="mr2">{{system.Pp_Desc}}</view>
								<view class="flex tile_time" v-if="timeStr.length>0">
									<view class="mr1">仅剩</view>
									<view class="flex justifyContentCenter flexAlignCneter">
										<span class="time_span">{{timeStr[0]}}</span>:
										<span class="time_span">{{timeStr[1]}}</span>:
										<span class="time_span">{{timeStr[2]}}</span>
									</view>
								</view>
							</view>
							<view class="list flex justifyContentBetween">
								<view v-for="(item,index) in PPbannerlist" :key="index" class="item_img" 
								@click="tolink('/pages/brand/brandproLsit/brandproLsit')">
									<image :src="item.Pic" mode="aspectFill" v-if="index<3"></image>
								</view>
							</view>
						</view>
						<!--推荐推荐-->
						<view class="jian mt2" v-if="hasrec">
							<image src="http://shop.dadanyipin.com/static/of/f3.png" mode="aspectFill" class="jian_bg"></image>
							<view class="jian_sign">美 好 生 活 抢 先 到</view>
							<view class="page-section HotsellList uni-bg-white uni-pd10 uni-mb10">
								<view class="uni-bd uni-mt10" >
									<swiper class="scroll-view_H Hotsell-list" style="height: 350upx;" :indicator-dots="showdots" 
									:autoplay="false" :interval="5000" :duration="500" indicator-color="#fff" indicator-active-color="#ff3333">
										<swiper-item v-for="(val,index) in recProductlist" :key="index" class="scroll-view-item_H flex" 
										scroll-x :scroll-left="scrollLeft2" style='display: flex;'>
											<view class="itembox" v-for="(item, index) in val" :key="index">
												<view class="itembox" @click="tolink('/pages/homePage/details?id='+item.Id)">
													<view class="image-view"> 
														<image class="img" :src="item.PicNo" mode="aspectFill"></image>
													</view>
													<view class="txtbox">
														<view class="txt uni-ellipsis">{{item.Name}}</view>
														<view class="uni-product-price">
															<text class="uni-product-price-original">￥{{item.Price}}</text>
															<text class="uni-product-price-favour" v-if="item.MarketPrice!=0">￥{{item.MarketPrice}}</text>
														</view>
													</view>
													<view style="display: flex;justify-content: space-between;padding-top: 10upx;">
														<view v-if="item.DistributionIncome!= '0'" style="height: 36upx;border-radius: 20upx;
														background: #f0370b;color: #fff;line-height: 36upx;padding: 0 12upx;">
															补贴￥{{item.DistributionIncome}}
														</view>
													</view>
												</view>
											</view>
										</swiper-item>
									</swiper>
									<!-- <scroll-view class="scroll-view_H Hotsell-list" scroll-x style="width:100%;border:1px solid red" >
										<view class="scroll-view-item_H" v-for="(item,index1) in recProductlist" :key="index1" >
											<view class="itembox" @click="tolink('/pages/homePage/details?id='+item.Id)">
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
												<view style="display: flex;justify-content: space-between;padding-top: 10upx;">
													<view v-if="item.DistributionIncome!= '0'" style="height: 36upx;border-radius: 20upx;
													background: #f0370b;color: #fff;line-height: 36upx;padding: 0 12upx;">
														补贴￥{{item.DistributionIncome}}
													</view>
												</view>
											</view>
										</view>
									</scroll-view> -->
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
										<view class="item_title text_flow">{{item.Name}}</view>
										<view class="flex flexAlignEnd justifyContentBetween item_total">
											<view class="flex flexAlignEnd">
												<span class="item_price">￥{{item.Price}}</span>
												<span class="item_market line-through" v-if="item.MarketPrice!=0">￥{{item.MarketPrice}}</span>
											</view>
										</view>
										<view class="" style="display: flex;justify-content: space-between;padding-top: 10upx;">
											<view v-if="item.DistributionIncome !== '0'" style="height: 36upx;border-radius: 20upx;background: #f00000;color: #fff;line-height: 36upx;padding: 0 12upx;">
												补贴￥{{item.DistributionIncome}}</view>
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
										<view class="item_title text_flow">{{item.Name}}</view>
										<view class="flex flexAlignEnd justifyContentBetween item_total">
											<view class="flex flexAlignEnd">
												<span class="item_price">￥{{item.Price}}</span>
												<span class="item_market line-through" v-if="item.MarketPrice!=0">￥{{item.MarketPrice}}</span>
											</view>
										</view>
										<view class="" style="display: flex;justify-content: space-between;padding-top: 10upx;">
											<view v-if="item.DistributionIncome !== '0'" style="height: 36upx;
											border-radius: 20upx;background: #f00000;color: #fff;line-height: 36upx;padding: 0 12upx;">
												补贴￥{{item.DistributionIncome}}</view>
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
		<!-- 广告弹框 -->
		<view class="advbox" v-if="showAdv">
			<view class="imgbox">
				<image :src="advimg" mode="widthFix" class="advimg"></image>
				<image src="http://shop.dadanyipin.com/static/close.png" mode="widthFix" class="close" @click="showAdv=false"></image>
			</view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view class="advbox" v-if="showXY=='block'">
			<view class="imgbox">
				<view class="textbox">
					<view class="title">服务协议和隐私政策</view>
					<view class="main">
						请你务必审慎阅读、充分理解“服务协议”和“隐私政策”各条款，包括但不限于：为了向你提供附近的商品筛选、实时视频等服务，我们需要获取您的定位信息、相机等权限。您可以在“设置”中查看、变更、删除个人信息并管理授权。
					</view>
					<view class="main">
						您可阅读<text class="colorblue" @click="tolink('/pages/message/agreement/agreement')">《服务协议》</text>和<text class="colorblue" @click="tolink('/pages/message/agreementTwo/agreementTwo')">《隐私政策》</text>了解详细信息。如您同意，请点击“同意”开始接受我们的服务。
					</view>
					<view class="btnbox">
						<view class="" @click="xytab(0)">暂不使用</view>
						<view class="colorblue" @click="xytab(1)">同意</view>
					</view>
				</view>
			</view>
		</view>
		<!-- #endif -->
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
				AreaCode:"",//区域国家码
				AreaType:0,//1不限市，区
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
				inviteCode:'',
				showAdv:true,//
				advimg:"",//广告图
				showXY:"none",//"none":不显示 "block"显示
			}
		},
		onLoad(e) {
			// #ifdef APP-PLUS
			var hasXY=uni.getStorageSync("showXY");console.log(hasXY,hasXY!="",hasXY!="undefined")
			if(hasXY!=""&&hasXY!="undefined"){
				this.showXY=hasXY;console.log(this.showXY,'++++++++++++++++++++++++')
			}else{
				this.showXY="block";
			}
			var height = plus.navigator.getStatusbarHeight();
			this.barHeight = height;
			if(e.inviteCode){
			  this.inviteCode = e.inviteCode
			  uni.setStorageSync('inviteCode',this.inviteCode);
			  console.log("app:",this.inviteCode)
			}
			// #endif
			// #ifdef H5
			this.barHeight = 0;
			if(this.$root.$mp.query.inviteCode){
			  this.inviteCode = this.$root.$mp.query.inviteCode
			  wx.setStorageSync('inviteCode',this.inviteCode);
			  console.log("aaaaaaaaaa:",this.inviteCode)
			}
			// #endif
			this.banner();
			this.getAdvimg()
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
			    success: function (res) {console.log(res)
					// #ifdef APP-PLUS
					var cityname=res.address.city.replace(/市/,'')
					uni.setStorageSync('cityname',cityname)
					_this.cityname=cityname
					_this.getAreaCode(cityname)
					// #endif
					// #ifdef MP-WEIXIN
					_this.wxGetCity(res.longitude,res.latitude)
					// #endif
			        // console.log(res);
			    },
				fail:function(){
					// #ifdef MP-WEIXIN
					_this.hasgps()
					// #endif
					// #ifdef APP-PLUS
					uni.showModal({
					    content: '定位失败，请在设置中打开大单易拼的位置权限',
						showCancel: false,
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
					        }
					    }
					});
					// #endif
				}
			});
			// #endif
			//百度定位
			// #ifdef H5
			MP(0).then(BMap => {
				var _this=this
				let myCity = new BMap.LocalCity()
				myCity.get(function (res) {
					var cityname=res.name.replace(/市/,'')
					uni.setStorageSync('cityname',cityname)
					_this.cityname=cityname
					_this.getAreaCode(cityname)
				console.log(cityname,"ooooooooo")
				})
			})
			// #endif
			
		},
		onShow(){
			// #ifndef APP-PLUS
			if(this.$root.$mp.query.inviteCode){
			  this.inviteCode = this.$root.$mp.query.inviteCode
			  wx.setStorageSync('inviteCode',this.inviteCode);
			  console.log("aaaaaaaaaa:",this.inviteCode)
			}
			// #endif
			
			if(uni.getStorageSync("userId")&&uni.getStorageSync("token")){
				this.NewsCount();
			}
			this.cityname=uni.getStorageSync("cityname");
			this.getAreaCode(this.cityname)
			// console.log(this.cityname+'222222')
		},
		components:{noData,uniLoadMore},
		methods:{

			//小程序解析经纬度获取城市
			// #ifdef MP-WEIXIN
			wxGetCity(lon,lat){
				var _this=this
				wx.request({
					url:'https://api.map.baidu.com/reverse_geocoding/v3/?ak=3wwDKCk09o6hU0PK1605QUXOCBqGVHGx&location=' + lat + ',' + lon + '&output=json&coordtype=wgs84ll',
					data: {},
					header: {
						'content-type': 'application/json' // 默认值
					},
					success (res) {
					    // console.log(res)
						var cityname=res.data.result.addressComponent.city.replace(/市/,'')
						uni.setStorageSync('cityname',cityname)
						_this.cityname=cityname
						_this.getAreaCode(cityname)
					}
				})
			},
			hasgps(){
				uni.getSetting({
				  success: (res) => {
					if (!res.authSetting['scope.userLocation'])
					  wx.showModal({
						content: '检测到您没打开大单易拼的定位权限，是否去设置打开？',
						confirmText: "确认",
						cancelText: "取消",
						success: function (res) {
						  console.log(res);
						  //点击“确认”时打开设置页面
						  if (res.confirm) {
							console.log('用户点击确认')
							wx.openSetting({
							  success: (res) => { }
							})
						  } else {
							console.log('用户点击取消')
						  }
						}
					  });
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
					ClassId:this.cid,
					ShowCity:this.AreaCode,//区域国家码
					// AreaType:this.AreaType,//1不限市，区
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
				let result = await post('Goods/GoodsList',{
					Page: 1,
					PageSize: 10,
					IsRecommend: 1,
					IsHot:1,
					ShowCity:this.AreaCode,//区域国家码
					// AreaType:this.AreaType,//1不限市，区
				})
				if(result.code==0){ //首页精选推荐
					if(result.data.length){
						this.hasrec=true;
						this.recProductlist=[];
						let unm = result.data
						unm.forEach((val,index) => {
							let page = Math.floor(index / 3)
							if(!this.recProductlist[page]){
								this.recProductlist[page] = []
							}
							this.recProductlist[page].push(val)
						})
						console.log(this.recProductlist,"this.recProductlist//////////////")
						
						
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
				let datajson={};console.log(this.indexs,"#########")
				if(this.indexs==0){
					datajson={
						Page: this.page,
						PageSize: this.pageSize,
						IsHot: 1, //推荐
						ShowCity:this.AreaCode,//区域国家码
						// AreaType:this.AreaType,//1不限市，区
					}
				}else if(this.indexs==1){
					datajson={
						Page: this.page,
						PageSize: this.pageSize,
						IsSubsidy:1,//有补贴
						//IsUseCoupons:1//有券
						ShowCity:this.AreaCode,//区域国家码
						// AreaType:this.AreaType,//1不限市，区
					}
				}else{
					datajson={
						Page: this.page,
						PageSize: this.pageSize,
						TypeId:this.indextid,
						ShowCity:this.AreaCode,//区域国家码
						// AreaType:this.AreaType,//1不限市，区
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
					console.log(this.isLoad)
				}
			},
			//顶部导航滑动切换
			async changeTab(e) {
				this.page=1;
				let index = e.detail.current;
				this.tid= this.Typelist[index].Id;
				this.cid='';
				this.tabIndex = index;
				this.setScrollLeft(index)
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
			bannerchlik(item){
				// #ifdef APP-PLUS
				if(item.AppUrl){
					uni.navigateTo({
						url:item.AppUrl
					})
				}
				// #endif
				// #ifdef MP-WEIXIN
				if(item.WxUrl){
					uni.navigateTo({
						url:item.WxUrl
					})
				}
				// #endif
				// #ifdef H5
				if(item.Url){
					var hashttp=item.Url.indexOf("http")
					if(hashttp==-1){
						uni.navigateTo({
							url:item.Url
						})
					}else{
						window.location.href=item.Url
					}
				}
				// #endif
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
			// 轮播图
			async getAdvimg() {
				let res = await post("Banner/HomePicList", {
				});
				if (res.code === 0) {
					if(res.data.length>0){
						this.advimg=res.data[0].Logo;
						this.showAdv=true
					}else{
						this.showAdv=false
					}
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
			  var t=arr[0]*3600+arr[1]*60+arr[2]*1;	(t)
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
				_this.timeStr=[h,m,s];
				// timeStr=h+":"+m+":"+s;
			  } else {
				_this.timeStr=[];
				clearInterval(timer);
			  }
			  }, 1000);
			},
			// 城市名获取国家码
			async getAreaCode(name) {
				if(name&&name!='全国'){
					let result = await post("Area/GetCityCode", {
						Name:name
					});
					if (result.code === 0) {
						this.AreaCode = result.data.Code;
						this.AreaType = 1;
						this.Recprolist();//精选推荐
						this.hand();//获取精选等分类列表
					}
				}else if(name=='全国'){
					this.AreaCode = "";
					this.AreaType = 0;
					this.Recprolist();//精选推荐
					this.hand();//获取精选等分类列表
				}else{
					this.AreaCode = "";
					this.AreaType = 0;
				}
				uni.setStorageSync('AreaCode',this.AreaCode);
			},
			loadMore(e) {console.log(e)
				if (this.isLoad) {
					this.loadingType = 1;
					this.page++;
					if(e>=0){
						this.getprolist();
					}else{
						this.hand();
					}
				} else {
					this.loadingType = 2;
				}
			},
			xytab(id){
				this.showXY=false;
				if(id==0){
					plus.runtime.quit();
				}else{
					uni.setStorageSync('showXY',"none");
				}
			}
			
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
		// #ifdef  MP-WEIXIN
		onShareAppMessage(res) {
			if (res.from === 'button') {
				// 来自页面内转发按钮
				
			}
		},
		// #endif
			
		
	}
</script>

<style scoped lang="scss">
	@import './style';
	.advbox{
		width: 100%;
		height: 100vh;
		position: fixed;
		left: 0%;
		top: 0;
		background: rgba(0,0,0,.6);
		z-index: 999;
	}
	.imgbox{
		width: 70%;
		position: fixed;
		left: 15%;
		top: 50%;
		transform: translateY(-50%);
	}
	.advimg{
		display: block;
		width: 100%;
		border-radius: 20upx;
	}
	.close{
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: -80upx;
		width: 50upx;
		height: 50upx;
	}
	.textbox{
		padding: 40upx 30upx 20upx;
		border-radius: 16upx;
		overflow: hidden;
		background: #fff;
	}
	.textbox .title{
		text-align: center;
		color: #000;
		font-size: 30upx;
		font-weight: 600;
	}
	.textbox .main{
		font-size: 26upx;
	}
	.textbox .btnbox{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 20upx;
	}
	.btnbox view{
		flex: 1;
		text-align: center;
		line-height: 2.4;
	}
	.colorblue{
		color:#0ea0ce
	}
</style>
