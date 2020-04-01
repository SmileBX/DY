<template>
	<view>
		<view class="brand_rec">
			<scroll-view class="scroll-view_H Hotsell-list" scroll-x="true" scroll-left="0">
				<view class="scroll-view-item_H" v-for="(item,index) in proList1" :key="index" @click="tolink('/pages/homePage/details?id='+item.Id)">
					<view class="itembox">
						<view class="image-view">
							<image class="img" :src="item.PicNo" mode="aspectFill"></image>
						</view>
						<view class="txtbox">
							<view class="brandlogo">
								<!-- <image class="img" src="../../../static/of/2.png" mode="aspectFit"></image> -->
								<view class="name uni-ellipsis">剩余{{item.overTime}}</view>
							</view>
							<view class="txt_1 uni-ellipsis">￥{{item.TimePrice}}</view>
							<view class="txt_2 uni-ellipsis">{{item.Name}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
<!-- 		<view class="hot uni-pd10">
			<view class="combox">
				<view class="flex title justifyContentBetween">
					<view class="flex flexAlignEnd">
						<view class="name">品类特惠</view>
						<view class="subtitle">全场4折封顶</view>
					</view>
				</view>
				<view class="list flex justifyContentBetween">
					<view class="item" v-for="(item,index) in 3" :key="index">
						<view class="itembox">
							<view class="image-view">
								<image class="img" src="../../../static/of/3.png" mode="aspectFill"></image>
							</view>
							<view class="txtbox">
								<view class="txt uni-ellipsis">珍视明眼药水</view>
								<view class="uni-product-price">
									<text class="uni-product-price-original"><text class="fz12">￥</text>2万(补贴)</text>
									<text class="uni-product-price-favour">￥299万</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view> -->
		<view class="levelPanel">
			<view class="list">
				<view class="item flex" v-for="(item,index) in proList2" :key="index" @click="tolink('/pages/homePage/details?id='+item.Id)">
					<view class="item_left">
						<image :src="item.PicNo" class="img"></image>
					</view>
					<view class="item_content flex1">
						<view class="uni-bold uni-ellipsis">{{item.Name}}</view>
						<!-- <view class="desc fz12 color_gray">3-4室|100-130㎡|南山</view> -->
						<view class="color_red"><text class="fz12">￥</text>{{item.TimePrice}}<span class="line-thon">¥{{item.Price}}</span></view>
						<view class="flex mt1 item_bt justifyContentBetween">
							<view class="flex flag ">
								<!-- <span class="flag_pill">返</span>
								<span class="flag_mon color_red">￥2万</span> -->
								<text>剩余{{item.overTime}}</text>
							</view>
							<view class="qiang">马上抢</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {post,get,toLogin,navigate} from '@/common/util.js';
	import noData from '@/components/noData.vue'; //暂无数据
	export default {
		data() {
			return {
				proList1:[],
				proList2:[],
				userId: "",
				token: "",
				noDataIsShow: false,
			};
		},
		onShow(){
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.getPsoList()
		},
		methods: {
			async getPsoList(){
				let res = await post("Goods/GoodsList", {
					Page: 1,
					PageSize: 99,
					Sort:1,//人气
					IsFlashSale:1,//1限时
				});
				if(res.code == 0){
					let _this=this
					res.data.forEach(item=>{
						_this.GetRTime(item,item.TimeOver);
					})
					if(res.count>5){
						this.proList1 = res.data.slice(0,5)
						this.proList2 = res.data.slice(5)
					}else{
						this.proList1 = res.data
						this.proList2 = []
					}
				}
			},
			//倒计时
			GetRTime(item,overTime) {
			  var timeStr=""
			  let _this = this;
			  var arr=overTime.split(":")
			  var t=arr[0]*3600+arr[1]*60+arr[2]*1;
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
				// var timeStr=[h,m,s]
				timeStr=h+":"+m+":"+s;
				 _this.$set(item, "overTime", timeStr);
			  } else {
				timeStr="00:00:00";
				clearInterval(timer);
			  }
			  }, 1000);
			  return timeStr;
			},
			//跳转
			tolink(Url) {
				uni.navigateTo({
					url: Url
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	@import './style';
</style>
