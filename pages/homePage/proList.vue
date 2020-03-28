<template>
	<!-- 家居 -->
	<view class="truckspace">
		<!-- 搜索 -->
		<view class="head">
			<view class="truck">
				<view class="searchbox">
					<view class="searchation">
						<view class="searchboxl">家居</view>
						<view class="searchboxr"><image class="uta" src="../../static/hpicons/uta.svg" mode=""></image></view>
					</view>
					<view class="searchico">
						<view class="searchpole"></view>
						<view class="searchimg"><image class="saarch" src="../../static/hpicons/search.svg"></image></view>
						<input class="input" type="text" value="" placeholder="输入名称"/>
					</view>
				</view>
				<view class="abrogate">取消</view>
			</view>
			<!-- 区域 -->
			<view class="areabox">
				<view class="area">
					<view class="">区域</view>
					<view class="areaimg"><image class="utas" src="../../static/hpicons/uta.svg"></image></view>
				</view>
				<view class="area">
					<view class="">销量</view>
					<view class="areaimg"><image class="utas" src="../../static/hpicons/uta.svg"></image></view>
				</view>
				<view class="area">
					<view class="">价格</view>
					<view class="areaimg"><image class="utas" src="../../static/hpicons/uta.svg"></image></view>
				</view>
			</view>
		</view>

		<!-- 列表 -->
		<view class="trucklist" v-if="hasData">
			<view class="truckac"></view>
			<block v-for="(item,index) in datalist" :key="index">
				<view class="listbox" @click="tolink('/pages/homePage/details?id='+item.Id)">
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
		</view>
		<view class="uni-tab-bar-loading" v-if="hasData">
			<uni-load-more :loadingType="loadingType"></uni-load-more>
		</view>
		<noData :isShow="noDataIsShow"></noData>
	</view>
</template>

<script>
	import {post,get} from '@/common/util.js';
	import noData from '@/components/noData.vue'; //暂无数据
	import uniLoadMore from '@/components/uni-load-more.vue';
	export default {
		components: {
			noData,
			uniLoadMore
		},
		data() {
			return {
				userId: "",
				token: "",
				page: 1,
				pageSize: 6,
				loadingType: 0, //0加载前，1加载中，2没有更多了
				isLoad: false,
				hasData: false,
				noDataIsShow: false,
				datalist:[]
			}
		},
		onLoad: function() {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
		},
		onShow(){
			this.getprolist();
		},
		methods: {
			tolink(Url) {
				uni.navigateTo({
					url: Url
				})
			},
			//分类商品列表
			async getprolist(){
				let result = await post("Goods/GoodsList", {
				Page: this.page,
				PageSize: this.pageSize,
				TypeId:this.tid,
				ClassId:this.cid
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
		color:rgba(204,204,204,1);
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

</style>
