<template>
	<view>
		<swiper :vertical="true" @change="changes">
			<swiper-item >
				<!-- <view class="content myCollectPage"> -->
					<!-- <image src="http://ddyp.wtvxin.com/static/of/live.png" mode="widthFix" @click="goUrl('/pages/livepush/livepush')"></image> -->
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
				<!-- </view> -->
			</swiper-item>
			<swiper-item >
				<!-- <view class="content myCollectPage"> -->
					<!-- <image src="http://ddyp.wtvxin.com/static/of/live.png" mode="widthFix" @click="goUrl('/pages/livepush/livepush')"></image> -->
					<!-- #ifndef MP-WEIXIN -->
					<video  src="http://play.wtvxin.com/live/test.m3u8"  ></video>
					<!-- #endif -->
				<!-- </view> -->
					<!-- #ifdef MP-WEIXIN -->
				<live-player style="width:100%;height:100%;" src="http://play.wtvxin.com/live/test.m3u8" ></live-player>
				<!-- #endif -->
			</swiper-item>
		</swiper>
		<!-- #ifndef APP-PLUS -->
		<cover-view class="btn" @click.stop="tolink">开启直播</cover-view>
		<!-- #endif -->
		<!-- <button class="btn" @click.stop="tolink"></button> -->
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
		onUnload(){
		           //在app端不支持cover-view嵌套
				// #ifdef APP-PLUS
					var icon = plus.nativeObj.View.getViewById("icon");
					icon.hide();
				// #endif
			},
		onHide(){
				// #ifdef APP-PLUS
					var icon = plus.nativeObj.View.getViewById("icon");
					icon.hide();
				// #endif
		},
		onShow() {
			// #ifdef APP-PLUS
			var icon = plus.nativeObj.View.getViewById("icon");
			//如果已经存在
			if(icon){    
				//则显示
				icon.show();
			}else{
				//不存在  则创建
				this.createtab();
				console.log(icon)
			}	
			// #endif
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
			createtab: function(){
				// 设置水平居中位置
				var bitmap = new plus.nativeObj.Bitmap('bmp1');
				var view = new plus.nativeObj.View('icon', {
					top: '40px',
					left: '20px',
					width: '80px',
					height: '30px',
					backgroundColor:'#ff3333',
					
				});
			   view.drawText('开始直播',{top:'0px',left:'0px',width:'100%',height:'100%'},{ size: '15px',color:'#fff',},'icon')
				view.addEventListener("click", function(e) {
					console.log(bitmap)
				  uni.navigateTo({
					url:"../../livepush/livepush"
				  })
				}, false);
				view.show();
			},
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
