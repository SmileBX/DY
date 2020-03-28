<template>
	<!-- 家居 -->
	<view class="truckspace">
		<!-- 搜索 -->
		<view class="head">
			<view class="truck">
				<view class="searchbox">
					<view class="searchation" @click="onClassify">
						<view class="searchboxl">{{classifyDefault}}</view>
						<view class="searchboxr"><image class="uta" src="../../static/hpicons/uta.svg" mode=""></image></view>
					</view>
					<view class="searchico">
						<view class="searchpole"></view>
						<view class="searchimg"><image class="saarch" src="../../static/hpicons/search.svg"></image></view>
						<input class="input" type="text" value="" v-model.trim="Keywords" placeholder="输入名称"/>
					</view>
				</view>
				<view class="abrogate" @click="init">搜索</view>
			</view>
			<!-- 区域 -->
			<view class="areabox">
				<view class="area" @click="showArea">
					<view :class="{'sort_active':AreaCode}">区域</view>
					<view class="areaimg">
						<image class="utas" :class="{'rotate180':Sort===0&&Order===0}" src="../../static/hpicons/uta.svg"></image>
					</view>
				</view>
				<view class="area" @click="onSort(0)">
					<view :class="{'sort_active':Sort===0}">默认</view>
					<view class="areaimg">
						<image class="utas" :class="{'rotate180':Sort===0&&Order===0}" src="../../static/hpicons/uta.svg"></image>
					</view>
				</view>
				<view class="area" @click="onSort(1)">
					<view :class="{'sort_active':Sort===1}">人气</view>
					<view class="areaimg">
						<image class="utas" :class="{'rotate180':Sort===1&&Order===0}" src="../../static/hpicons/uta.svg"></image>
					</view>
				</view>
				<view class="area" @click="onSort(2)">
					<view :class="{'sort_active':Sort===2}">价格</view>
					<view class="areaimg">
						<image class="utas" :class="{'rotate180':Sort===2&&Order===0}" src="../../static/hpicons/uta.svg"></image>
					</view>
				</view>
			</view>
		</view>

		<!-- 列表 -->
		<view class="trucklist">
			<view class="truckac"></view>
			<block v-for="(item,index) in datalist" :key="index" v-show="hasData">
				<view class="listbox" @click="navigate('homePage/details',{id:item.Id})">
					<view class="listimg">
						<image :src="item.PicNo" mode="widthFix"></image>
					</view>
					<view class="listpt">
						<view>
							<view class="listtitle uni-ellipsis">{{item.Name}}</view>
							<view class="listtitles uni-ellipsis" v-if="item.Synopsis">{{item.Synopsis}}</view>
						</view>
						
						<!-- <view class="listplace">
							<view class="">14m <span>2</span></view>
							<view class="listpole"></view>
							<view class="">民治</view>
						</view> -->
						<view>
							<view class="listprice">
								<view class="listm">
									<view class="selling"><span>¥</span>{{item.Price}}</view>
									<view class="original" v-if="item.MarketPrice>item.Price">¥{{item.MarketPrice}}</view>
								</view>
								<view class="listm rt" v-if="item.DistributionIncome>0">
									<view class="cash">返</view>
									<view class="cashm">¥{{item.DistributionIncome}}</view>
								</view>
							</view>
							<view class="listplace lp" v-if="item.ServiceKeys">
								<view class="listkey" v-for="(e,i) in item.ServiceKeys.split(',')" :key="i">{{e}}</view>
							</view>
						</view>
					</view>
				</view>
			</block>
			<noData :isShow="noDataIsShow"></noData>
		</view>
		<view class="uni-tab-bar-loading" v-if="hasData">
			<uni-load-more :loadingType="loadingType"></uni-load-more>
		</view>
		<wpicker 
			mode="selector"
    		:level="2" 
			:defaultVal="classifyDefault"
			@confirm="pickerOk"
			ref="selector"
			:selectList="classifyList"
			themeColor="#f00"
			>
		</wpicker>
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
	</view>
</template>

<script>
	import {post,get,navigate} from '@/common/util.js';
	import areaList from '@/common/areaList.js';
	import noData from '@/components/noData.vue'; //暂无数据
	import uniLoadMore from '@/components/uni-load-more.vue';
	import wpicker from "@/components/w-picker/w-picker.vue";
	export default {
		components: {
			noData,
			uniLoadMore,wpicker
		},
		data() {
			return {
				navigate,
				userId: "",
				token: "",
				page: 1,
				pageSize: 12,
				typeId:'',
				classId:'',
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
		onLoad: function(options) {
			this.typeId = options.typeId||'';
			this.classId = options.classId||'';
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.getClassify();
			this.init();
		},
		onShow(){
		},
		methods: {
			// 每次 切换分类、切换区域，返回默认值
			init(){
				this.Sort=0;
				this.Order=0;
				this.getprolist();
			},
			onSort(sort){
				// 如果已经点击了筛选则更换排序
				if(sort===this.Sort){
					this.Order=this.Order===0?1:0;
				}else{
					this.Sort=sort;
					this.Order=0;
				}
				this.getprolist();
			},
			//分类商品列表
			async getprolist(){
				let result = await post("Goods/GoodsList", {
					Page: this.page,
					PageSize: this.pageSize,
					TypeId:this.typeId,
					ClassId:this.classId,
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
			// 获取分类
			async getClassify(){
				let result = await post("Goods/GetProductClass", {
					TypeId: this.typeId
				});
				const data =  result.data;
				this.classifyList=[];
				data.map(item=>{
					if(this.classId==item.Id){
						this.classifyDefault=item.ClassName;
					}
					this.classifyList.push({
						label:item.ClassName,
						id:item.Id
					});
				})
			},
			// 选择分类
			onClassify(){
				this.$refs['selector'].show();
			},
			// 选择分类值
			pickerOk(e){
				this.classifyDefault=e.result;
				this.classId=e.checkArr.id;
				this.init();
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

<style scoped>
	.truckspace{
		background: #FFFFFF;
		/* height: 100vh; */
	}
	.head{
		position:fixed; 
		width:100%;
		background: #FFFFFF; 
		z-index: 2;
	}
	.truck{
		display: flex;
		/* margin-top: 61rpx;  相距于头部的距离*/  
		margin-left: 30rpx;
	}
	.searchbox{
		display: flex;
		width:606rpx;
		height:68rpx;
		border:1rpx solid rgba(204,204,204,1);
		border-radius:10rpx;
	}
	.searchation{
		display: flex;
	}
	.searchboxl{
		padding-top: 16rpx;
		padding-left: 34rpx;
		font-size:26rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:35rpx;
	}
	.searchboxr{
		width:17rpx;
		height:9rpx;
		margin-left: 16rpx;
	}
	.uta{
		height: 70rpx;
	}
	.searchico{
		display: flex;
	}
	.searchpole{
		margin-top: 20rpx;
		margin-left: 19rpx;
		width:1rpx;
		height:26rpx;
		border:2rpx solid rgba(236,236,236,1);
	}
	.searchimg{
		margin-left: 30rpx;
		width:27rpx;
		height:28rpx;
	}
	.saarch{
		height: 70rpx;
	}
	.input{
		font-size:26rpx;
		font-family:PingFang;
		font-weight:500;
		/* color:rgba(204,204,204,1); */
		line-height:35rpx;
		margin-left: 17rpx;
		margin-top: 16rpx;
	}
	.abrogate{
		font-size:28rpx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(51,51,51,1);
		line-height:35rpx;
		margin: 20rpx 0 0 30rpx;
	}
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
	/* 列表 */
	.trucklist{
		padding-top: 186rpx;
	}
	.truckac{
		width:100%;
		height:20rpx;
		background:rgba(242,242,242,1);
	}
	.listbox{
		/* margin: 20rpx 0 20rpx 31rpx; */
		display: flex;
		padding: 20rpx 30rpx;
		border-bottom: 1px solid #eee;
	}
	.listbox:last-child{ border-bottom: none;}
	.listimg{
		width:240rpx;
		height:240rpx;
		background:#eee;
		border-radius:12rpx;
		overflow: hidden;
	}
	.listpt{
		padding-left:30rpx;
		width: 65%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.listtitle{
		font-size:32rpx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.listtitles{
		font-size:26rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(153,153,153,1);
	}
	.listplace{
		display: flex;
		font-size:26rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(153,153,153,1);
		line-height:156rpx;
	}
	.listplace span{
		font-size:14rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(153,153,153,1);
	}
	/* .listpole{
		width:1rpx;
		height:26rpx;
		border:1rpx solid rgba(204,204,204,1);
		margin:15rpx 11rpx 0 11rpx;
	} */
	.listprice{
		display: flex;
		justify-content: space-between;
	}
	.listm{
		display: flex;
	}
	.selling{
		font-size:32rpx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(255,51,51,1);
	}
	.selling span{
		font-size:20rpx;
	}
	.original{
		font-size:22rpx;
		font-family:PingFang;
		font-weight:500;
		text-decoration:line-through;
		color:rgba(153,153,153,1);
		margin: 15rpx 0 0 15rpx;
	}
	.rt{
		height:42rpx;
		border:1rpx solid rgba(255,51,51,1);
		border-radius:4rpx;
	}
	.cash{
		width:38rpx;
		height:100%;
		background:rgba(255,51,51,1);
		border-radius:4rpx 0rpx 0rpx 4rpx;
		font-size:24rpx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(255,255,255,1);
		text-align: center;
	}
	.cashm{
		height:21rpx;
		font-size:24rpx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(255,51,51,1);
		margin-left: 10rpx;
	}
	.lp{
		font-family:PingFang;
		font-weight:500;
		color:rgba(255,51,51,1);
		padding-top: 10rpx;
	}
	.listkey{
		font-size:24rpx;
		line-height:30rpx;
		padding: 0 10rpx;
		height:32rpx;
		border:1rpx solid rgba(247,192,192,1);
		border-radius:16rpx;
		text-align: center;
		margin-right: 10rpx;
		box-sizing: content-box;
	}
	.rotate180{
		    transform:rotate(180deg);
			-ms-transform:rotate(180deg); /* IE 9 */
			-webkit-transform:rotate(180deg); /* Safari and Chrome */
	}
	.sort_active{
		color:rgba(255,51,51,1);
	}
</style>
