<template>
	<view class="comment">
		<view class="newsInfo" v-html="Content"></view>
	</view>
</template>
  
<script>
	import {host,post,get,toLogin,getCurrentPageUrlWithArgs} from '@/common/util.js';
	export default {
		data() {
			return {
				Content:""
			}
		},
		onLoad() {
			this.getinfo()
		},
		methods: {
			async getinfo(){
				let res=await get('system/GetUserAuth',{})
				if(res.code==0){
					this.Content=res.data.Content.replace(/(\r\n|\n|\r)/gm, "<br />")
				}
			},
		}
	}
</script>

<style scoped>

.comment{ padding: 0; margin: 0 auto; background: #fff; min-height: 100%;}
.newsInfo{ padding: 30upx;}
.newsInfo .title{ font-size: 30upx;}
.newsInfo .desc{ color: #666; margin: 20upx 0;}
.newsInfo .time{ color: #999; font-size: 26upx;}
.comment {
	height: 100%;
	width: 750upx;
	overflow-x: hidden!important;
	position:relative;
	word-break:break-all; 
}
</style>
