<template>
	<view>
		<swiper :vertical="true" @change="changes">
			<swiper-item >
				<!-- #ifdef APP-PLUS -->
				<video  @error="error" src="http://play.wtvxin.com/live/test.m3u8" :style="{height : height + 'px'}"
				 :autoplay="true" controls ></video>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<view class="H5video" id="H5video" :style="{height : height + 'px'}">
					
				</view>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<live-player style="width:100%;height:100%;" src="http://play.wtvxin.com/live/test.m3u8" ></live-player>
				<!-- #endif -->
			</swiper-item>
			<swiper-item >
				<!-- #ifndef MP-WEIXIN -->
				<video  src="http://play.wtvxin.com/live/test.m3u8"  ></video>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<live-player style="width:100%;height:100%;" src="http://play.wtvxin.com/live/test.m3u8" ></live-player>
				<!-- #endif -->
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {host,post,get,toLogin,} from '@/common/util.js';
	import {TPlay} from '@/common/TcPlayer.js';
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
			// #ifdef H5
			this.playH5()
			// #endif
		},
		components:{
			
		},
		methods: {
			playH5(){
				TPlay().then(TcPlayer => {
					  var player = new TcPlayer('H5video', {
					  "m3u8": "http://play.wtvxin.com/live/test.m3u8", //请替换成实际可用的播放地址
					  "autoplay" : true,      //iOS 下 safari 浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
					  "poster" : "http://ddyp.wtvxin.com/static/logo.png",
					  "width" :  '480',//视频的显示宽度，请尽量使用视频分辨率宽度
					  "height" : this.height//视频的显示高度，请尽量使用视频分辨率高度
					  });
				  })
			},
			goUrl(url){
				uni.navigateTo({
					url:url
				})
			},
			changes(e){
				// console.log(e)
			},
			error(e){
				console.log(e)
				if(e){
					uni.showToast({
						title:"直播结束！",
						icon:'none',
						success() { 
							this.mark = true;
							setTimeout(res=>{
								uni.navigateBack({})
							},1500)
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
		top: 40upx;
		left: 20upx;
		background-color: #ff3333;
		color: #fff;
		// border-radius: 40upx;
		width: 160upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
		font-size: 30upx;
		z-index: 200;
	}
	.H5video{
		width: 100%;
	}
</style>
