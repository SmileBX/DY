<template>
	<!-- 家居 -->
	<view class="truckspace">
		<!-- 搜索 -->
		<view class="head_Screen">
			<view class="truck">
				<view class="searchbox">
					<view class="searchation" @click="onClassify">
						<view class="searchboxl">{{classifyDefault}}</view>
						<view class="searchboxr"><image class="uta" src="http://ddyp.wtvxin.com/static/hpicons/uta.svg" mode=""></image></view>
					</view>
					<view class="searchico">
						<view class="searchpole"></view>
						<view class="searchimg"><image class="saarch" src="http://ddyp.wtvxin.com/static/hpicons/search.svg"></image></view>
						<input class="input" type="text" value="" v-model.trim="Keywords" placeholder="输入名称"  :focus="isOpen==1"/>
					</view>
				</view>
				<view class="abrogate" @click="init">搜索</view>
			</view>
			<!-- 区域 -->
			<view class="areabox">
				<view class="area" @click="showArea">
					<view :class="{'sort_active':AreaCode}">区域</view>
					<view class="areaimg">
						<image class="utas" src="http://ddyp.wtvxin.com/static/hpicons/uta.svg"></image>
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
		</view>

		<!-- 列表 -->
		<view class="trucklist uni-bg-white">
			<view class="truckac"></view>
			<block v-for="(item,index) in datalist" :key="index" v-show="hasData">
				<view class="listbox" @click="navigate('homePage/details',{id:item.Id})">
					<view class="listimg">
						<image :src="item.PicNo" mode="aspectFill"></image>
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
								<view class="listm rt" v-if="item.DistributionIncome!='0'">
									<view class="cash">补贴</view>
									<view class="cashm">¥{{item.DistributionIncome}}</view>
								</view>
							</view>
							<view class="listplace lp" v-if="item.newServiceKeys">
								<view class="listkey" v-for="(e,i) in item.newServiceKeys" :key="i">{{e}}</view>
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
			@confirm="pickerclassOk"
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
				isClass:false,
				isOpen:0,//是否自动获取输入焦点
			}
		},
		onLoad: function(options) {
			this.typeId = options.typeId||'';
			this.classId = options.classId||'';
			this.isOpen = options.isOpen||0;console.log(this.isOpen)
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.keyWords="";
			this.AreaCode="";
			this.AreaType=0;
			if(this.classId){
				this.isClass=true;
				this.getClassify();
			}else{
				this.isClass=false;
				this.getTypeList();
			}
			this.init();
		},
		onShow(){
		},
		methods: {
			// 每次 切换分类、切换区域，返回默认值
			init(){
				this.page=1;
				this.Sort=0;
				this.Order=0;
				this.getprolist();
			},
			// 如果已经点击了筛选则更换排序
			onSort(sort){
				this.page=1;
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
					// console.log(this.AreaType)
					this.AreaType=0
					
					console.log(this.areaDefault)
					if(this.areaDefault.length==2){
						this.AreaType=1
					}else if(this.areaDefault[2]==="不限" ){
						console.log(this.areaDefault,5555)
						this.AreaType=1
					}else{
						this.AreaType=0
					}
					if (result.data.length > 0) {
						this.hasData = true;
						this.noDataIsShow = false;
						result.data.map(item =>{console.log(item)
							if(item.ServiceKeys!=""){
								var arr=item.ServiceKeys.split(',')
							}else{
								var arr=[]
							}
							this.$set(item,'newServiceKeys',arr)
						})
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
			getTypeList(){
				post('Goods/TypeList',{}).then(res=>{
					if(res.code==0){
						if(!this.typeId){
							this.typeId=res.data[0].Id
						}
						this.classifyList=[];
						res.data.map(item=>{
							if(this.typeId==item.Id){
								this.classifyDefault=item.Name;
							}
							this.classifyList.push({
								label:item.Name,
								id:item.Id
							});
						})
					}
				})
			},
			// 获取分类
			async getClassify(){
				let result = await post("Goods/GetProductClass", {
					TypeId: this.typeId
				});
				if(result.code==0){
					let _this=this;
					if(result.data.length){
						const data =  result.data;
						this.classifyList=[];
						data.map(item=>{
							if(_this.classId==item.Id){
								_this.classifyDefault=item.ClassName;
							}
							_this.classifyList.push({
								label:item.ClassName,
								id:item.Id
							});
						})
					}else{
						this.hasclass=false;
					}
				}
			},
			// 选择分类
			onClassify(){
				this.$refs['selector'].show();
			},
			pickerclassOk(e){
				this.classifyDefault=e.result;
				if(this.isClass){
					this.classId=e.checkArr.id;
				}else{
					this.typeId=e.checkArr.id;
				}
				this.init();
			},
			// 地区
			showArea(){
				this.$refs['area'].show();
			},
			areaOk(e){
				this.areaDefault=e.checkArr;
				// console.log(this.areaDefault)
				if(e.checkArr.length===2){
					this.AreaType=1
				}else if(e.checkArr[2]=="不限" ){
					this.AreaType=1
				}else{
					this.AreaType=0
				}
				this.AreaCode=e.checkValue[e.checkValue.length-1];
				this.init();
			},
			areaCancel(e){
				this.AreaCode='';
				this.init();
			}
		},
		onPullDownRefresh(){
			uni.stopPullDownRefresh();
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.keyWords="";
			this.AreaCode="";
			this.AreaType=0;
			this.init();
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
	.head_Screen{
		position:fixed; 
		width:100%;
		background: #FFFFFF; 
		z-index: 2;
	}
	.truck{
		display: flex;
		/* margin-top: 61upx;  相距于头部的距离*/  
		margin-left: 30upx;
	}
	.searchbox{
		display: flex;
		width:606upx;
		height:68upx;
		border:1upx solid rgba(204,204,204,1);
		border-radius:10upx;
	}
	.searchation{
		display: flex;
	}
	.searchboxl{
		padding-top: 16upx;
		padding-left: 34upx;
		font-size:26upx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:35upx;
	}
	.searchboxr{
		width:17upx;
		height:9upx;
		margin-left: 16upx;
	}
	.uta{
		height: 70upx;
	}
	.searchico{
		display: flex;
	}
	.searchpole{
		margin-top: 20upx;
		margin-left: 19upx;
		width:1upx;
		height:26upx;
		border:2upx solid rgba(236,236,236,1);
	}
	.searchimg{
		margin-left: 30upx;
		width:27upx;
		height:28upx;
	}
	.saarch{
		height: 70upx;
	}
	.input{
		font-size:26upx;
		font-family:PingFang;
		font-weight:500;
		/* color:rgba(204,204,204,1); */
		line-height:35upx;
		margin-left: 17upx;
		margin-top: 16upx;
	}
	.abrogate{
		font-size:28upx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(51,51,51,1);
		line-height:35upx;
		margin: 20upx 0 0 30upx;
	}
	/* 区域 */
	.areabox{
		margin-top: 20upx;
		display: flex;
		justify-content: space-around;
		width: 100%;
		font-size:28upx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(51,51,51,1);
		margin-bottom: 20upx;
	}
	.area{
		display: flex;
	}
	.areaimg{
		margin-left: 11upx;
		width:14upx;
		height:9upx;
	}
	.utas{
		height:60upx;
	}
	/* 列表 */
	.trucklist{
		padding-top: 158upx;
	}
	.truckac{
		width:100%;
		height:20upx;
		background:rgba(242,242,242,1);
	}
	.listbox{
		/* margin: 20upx 0 20upx 31upx; */
		display: flex;
		padding: 20upx 30upx;
		border-bottom: 1px solid #eee;
	}
	.listbox:last-child{ border-bottom: none;}
	.listimg{
		width:240upx;
		height:240upx;
		background:#eee;
		border-radius:12upx;
		overflow: hidden;
	}
	.listimg image{
		width:100%;
		height:100%;
	}
	.listpt{
		padding-left:30upx;
		width: 65%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.listtitle{
		font-size:32upx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.listtitles{
		font-size:26upx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(153,153,153,1);
	}
	.listplace{
		display: flex;
		flex-wrap:wrap;
		font-size:24upx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(153,153,153,1);
		line-height:156upx;
	}
	.listplace span{
		font-size:24upx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(153,153,153,1);
	}
	/* .listpole{
		width:1upx;
		height:26upx;
		border:1upx solid rgba(204,204,204,1);
		margin:15upx 11upx 0 11upx;
	} */
	.listprice{
		display: flex;
		justify-content: space-between;
	}
	.listm{
		display: flex;
	}
	.selling{
		font-size:32upx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(255,51,51,1);
	}
	.selling span{
		font-size:20upx;
	}
	.original{
		font-size:22upx;
		font-family:PingFang;
		font-weight:500;
		text-decoration:line-through;
		color:rgba(153,153,153,1);
		margin: 15upx 0 0 15upx;
	}
	.rt{
		height:42upx;
		border-radius:4upx;
	}
	.cash{
		/* width:38upx; */
		padding: 0 6upx;
		height:42upx;
		line-height:42upx;
		background:rgba(255,51,51,1);
		border-radius:4upx 0upx 0upx 4upx;
		font-size:24upx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(255,255,255,1);
		text-align: center;
	}
	.cashm{
		height:42upx;
		line-height:42upx;
		font-size:24upx;
		font-family:PingFang;
		font-weight:bold;
		padding:0 5upx;
		border:1upx solid rgba(255,51,51,1);
		color:rgba(255,51,51,1);
	}
	.lp{
		font-family:PingFang;
		font-weight:500;
		color:rgba(255,51,51,1);
		padding-top: 10upx;
	}
	.listkey{
		font-size:24upx!important;
		line-height:30upx;
		padding: 0 10upx;
		height:32upx;
		border:1upx solid rgba(247,192,192,1);
		border-radius:16upx;
		text-align: center;
		margin-right: 10upx;
		margin-top:10upx;
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
