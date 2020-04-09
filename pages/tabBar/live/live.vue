<template>
	<view>
		<swiper :vertical="true" @change="changes">
			<swiper-item >
				<!-- <view class="content myCollectPage"> -->
					<!-- <image src="http://ddyp.wtvxin.com/static/of/live.png" mode="widthFix" @click="goUrl('/pages/livepush/livepush')"></image> -->
					<!-- #ifndef MP-WEIXIN -->
					<video v-if="!mark" @error="error" src="http://play.wtvxin.com/live/test.flv"  webkit-playsinline,x5-playsinline,x5-video-player-type='h5' :style="{height : height + 'px'}"
					 :autoplay="true" controls ></video>
					<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
					<live-player style="width:100%;height:100%;" src="http://play.wtvxin.com/live/test.flv" ></live-player>
					<!-- #endif -->
				<!-- </view> -->
			</swiper-item>
			<swiper-item >
				<!-- <view class="content myCollectPage"> -->
					<!-- <image src="http://ddyp.wtvxin.com/static/of/live.png" mode="widthFix" @click="goUrl('/pages/livepush/livepush')"></image> -->
					<!-- #ifndef MP-WEIXIN -->
					<video  src="http://play.wtvxin.com/live/test.flv"  ></video>
					<!-- #endif -->
				<!-- </view> -->
					<!-- #ifdef MP-WEIXIN -->
				<live-player style="width:100%;height:100%;" src="http://play.wtvxin.com/live/test.flv" ></live-player>
				<!-- #endif -->
			</swiper-item>
		</swiper>
		<cover-view class="btn" @click.stop="tolink">开启直播</cover-view>
		<!-- <button class="btn" @click.stop="tolink"></button> -->
	</view>
</template>

<script>
	import {host,post,get,toLogin,} from '@/common/util.js';
	export default {
		data() {
			return {
				height:'',
				mark:false
			};
		},
		onShow() {
			let res = uni.getSystemInfoSync()
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.height=res.windowHeight
		},
		components:{
			
		},
		methods: {
			goUrl(url){
				uni.navigateTo({
					url:url
				})
			},
			changes(e){
				// console.log(e)
			},
			tolink(){
				uni.navigateTo({
					url:"../../livepush/livepush"
				})
			},
			error(e){
				console.log(e)
				if(e){
					uni.showToast({
						title:"直播结束！",
						success() { 
							this.mark = true;
						}
					})
				}
			},
		},
		onPullDownRefresh() { //下拉刷新
			
		},
		onReachBottom() { //上拉加载
			
		}
	}
</script>

<style scoped lang="scss">
	swiper{
		height: 100vh;
		width: 100vw;
		swiper-item,video{
			width: 100%;
			height: 100%;
			/* #ifdef H5 */
			height: 92%;
			/* #endif */
		}
	}
	.btn{
		position: fixed;
		top: 20upx;
		left: 20upx;
		background-color: #ff3333;
		color: #fff;
		border-radius: 40upx;
		width: 180upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
		font-size: 30upx;
	}
</style>
