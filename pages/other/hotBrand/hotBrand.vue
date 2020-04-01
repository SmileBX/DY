<template>
	<view class="hotBrand">
		<image src="http://ddyp.wtvxin.com/static/of/hot_bg.png" class="bg mt2"></image>
		<view class="list mt2">
			<scroll-view class="hot_wrap" scroll-y>
				<view class="item flex" v-for="(item,index) in datalist" :key="index">
					<view class="item_left">
						<image :src="item.PicNo" class="img"></image>
						<image src="http://ddyp.wtvxin.com/static/icons/b1.png" class="tip" v-if="index==0"></image>
						<image src="http://ddyp.wtvxin.com/static/icons/b2.png" class="tip" v-if="index==1"></image>
						<image src="http://ddyp.wtvxin.com/static/icons/b3.png" class="tip" v-if="index==2"></image>
					</view>
					<view class="item_content flex1">
						<view class="uni-bold">{{item.Name}}</view>
						<view class="color_red mt1">￥{{item.Price}}万<span class="line-thon ">指导价¥{{item.MarketPrice}}万</span></view>
						<view class="flex mt1 item_bt justifyContentBetween">
							<view class="flex flag ">
								<span class="flag_pill">返</span>
								<span class="flag_mon color_red">￥{{item.DistributionIncome}}万</span>
							</view>
							<view class="qiang" @click="toDetail(item)">马上抢</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
	
</template>

<script>
	import {post} from '@/common/util.js'
	export default{
		data(){
			return{
				datalist:[],
			}
		},
		onShow(){
			this.getHotList()
		},
		methods:{
			async getHotList(){
				const res = await post('Goods/GoodsList',{
					Page:1,
					IsHits:1,
					PageSize: 10,
				})
				if(res.code == 0){
					this.datalist = res.data
				}
			},
			toDetail(item) {
				uni.navigateTo({
					url:'/pages/homePage/details?id='+item.Id
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.hotBrand{
		min-height: 100vh;
		background:#94aebe;
		padding:0 30upx 50upx 30upx;
		.bg{
			height:245upx;
		}
		.list{
			background: #ffffff;border-radius:15upx;padding:10upx 30upx;
			.item{
				padding:10upx 0;
				.item_left{
					width:200upx;height:200upx;position: relative;margin-right:10upx;
					.img{width:100%;height:100%;}
					.tip{
						position: absolute;top:0;left:0;
						width:70upx;height:96upx;
					}
				}
				.item_content{
					padding:10upx 0;
					.line-thon{
						color:#999!important;font-size:22upx;text-decoration: line-through;margin-left: 10upx;
					}
					.item_bt{
						width:100%;
						.qiang{
							background: #f00000;color:#ffffff;border-radius:50upx;font-size:22upx;padding:0 20upx;
						}
					}
				}
			}
		}
		.flag{
			font-size:20upx;height:40upx;box-sizing: border-box;
			.flag_pill{
				background: #f00000;color:#ffffff;line-height: 40upx;padding:0 15upx;height:40upx;
				border-radius: 5upx 0 0 5upx;
			}
			.flag_mon{
				line-height: 40upx;padding:0 10upx;height:40upx;border:1px solid red;
				border-radius: 0 5upx 5upx 0;
			}
		}
	}
	.hot_wrap{
		height:calc(100vh-284upx);
	}
</style>
