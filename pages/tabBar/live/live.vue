<template>
	<view>
		<swiper :vertical="true" @change="changes">
			<swiper-item >
				<!-- #ifdef APP-PLUS -->
				<video  @error="error" :src="data.HLS" :style="{height : height + 'px'}"
				 :autoplay="true" controls ></video>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<view class="H5video" id="H5video" v-if="data.Flag==1" :style="{height : height + 'px'}">
					
				</view>
				<video :src="data.HLS" @error="error" controls="false" poster="http://ddyp.wtvxin.com/static/logo.png" :style="{height : height + 'px',width:'480px'}" v-if="data.Flag==0||data.Flag==2" mode="widthFix"></video>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<live-player style="width:100%;height:100%;" :src="data.HLS" ></live-player>
				<!-- #endif -->
			</swiper-item>
			<swiper-item >
				<!-- #ifndef MP-WEIXIN  -->
				<video  :src="data.HLS"  ></video>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<live-player style="width:100%;height:100%;" :src="data.HLS" ></live-player>
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
				mark:false,
				data:{}
			};
		},
		onLoad(e){
			// #ifdef APP-PLUS
			this.ShopId=e.ShopId
			// #endif

		},
		async onShow() {
			let res = uni.getSystemInfoSync()
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.height=res.windowHeight
			// #ifndef APP-PLUS
			this.ShopId = this.$mp.query.ShopId
			// #endif
			console.log(this.ShopId)
			// this.play()
			let r = await post('TencentCloud/PlayURL',{
				UserId: this.userId,
				Token: this.token,
				ShopId:this.ShopId
			})
			this.data=r.data
			// #ifdef H5
			this.playH5()
			// #endif
			
			
			// console.log(this.$mp.query.ShopId)
		},
		components:{
			
		},
		methods: {
			async play(){
				let res = await post('TencentCloud/PlayURL',{
					UserId: this.userId,
					Token: this.token,
					ShopId:this.ShopId
				})
				this.data=res.data
				console.log(this.data)
			},
			playH5(){
				console.log(this.data)
				TPlay().then(TcPlayer => {
					  var player = new TcPlayer('H5video', {
					  "m3u8": this.data.HLS, //请替换成实际可用的播放地址
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
