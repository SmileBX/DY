<template>
	<view>
		<view class="content">
			<scroll-view scroll-y="true" class="scr0llbox" :scroll-into-view="toitem" scroll-with-animation=true :style="{'height':height+'px'}">
				<view class="item" v-for="(item,index) in citylist" :key="index">
					<view class="citytitle" :id="item.initial">{{item.initial}}</view>
					<view class="citybox">
						<view :class="['city',cityname==item1.name ? 'active' : '']" v-for="(item1,index1) in item.list" :key="index1" @click="choosecity(item1.name)">{{item1.name}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="zimubox">
			<view class="zimuname" v-for="(item,index) in citylist" :key="index" @click="chooseZM(item.initial)">
				{{item.initial}}
			</view>
		</view>
	</view>
</template>

<script>
	import cityData from '@/common/cityname.js';
	export default {
		data() {
			return {
				citylist:cityData,
				height:"",
				toitem:'A',
				cityname:""
			}
		},
		onShow() {
			let res = uni.getSystemInfoSync()
			this.height = res.windowHeight;
		},
		methods: {
			chooseZM(zm){
				this.toitem=zm
			},
			choosecity(name){
				this.cityname=name;
				uni.setStorageSync('cityname',name)
				uni.showToast({
				  title: '已重新定位城市',
				  success(){
					setTimeout(res=>{
						uni.navigateBack({})
					},1500)
				  }
				})
			}
		}
	}
</script>

<style>
	page{
		background: #fff;
	}
	.scr0llbox{
		width: 100%;
	}
.content{
	box-sizing: border-box;
	width: 100%;
	padding: 20upx 40upx 20upx 30upx;
}
.citybox{
	display: flex;
	flex-wrap: wrap;
}
.city{
	width: 180upx;
	margin: 20upx 0;
	margin-right: 46upx;
	background: #eee;
	text-align: center;
	padding: 6upx 10upx;
	border-radius: 4upx;
}
.zimubox{
	width: 80upx;
	position: fixed;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
}
.zimuname{
	margin:10upx 20upx;
	width: 40upx;
	line-height: 40upx;
	text-align: center;
	background: #ddd;
	border-radius: 50%;
	font-size: 22upx;
}
.citybox .active{
	background: #55aaff;
	color: #fff;
}
</style>
