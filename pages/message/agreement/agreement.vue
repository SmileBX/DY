<template>
	<view class="comment">
		<view class="newsInfo">
			<view class="title">
				{{datainfo.Title}} 
			</view>
			<view class="desc">
				<uParse :content="datainfo.Memo" />
			</view>
		</view>
	</view>
</template>
  
<script>
	import {post,get,dateUtils} from '@/common/util.js';
	import uParse from '@/components/uParse/src/wxParse.vue';
	export default {
		components:{
			uParse
		},
		data() {
			return {
				userId: "",
				token: "",
				Msgid:"",
				datainfo:{
					Memo: "<p>这是一条测试消息这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息</p>",
					PubTime: "2019-07-31 13:43:50",
					Title: "测试消息"
				}
			}
		},
		onLoad: function(e) {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
		},
		onShow(){
		},
		methods: {
			
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
