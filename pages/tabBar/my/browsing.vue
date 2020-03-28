<template>
	<!-- 浏览记录 -->
	<view class="browsing">
		<view class="nav">
			<view class="" @click="toback()"><image class="back" src="../../../static/hpicons/back.svg" mode=""></image></view>
			<view class="mine">我的足迹</view>
			<view class="redact" v-if="isShowDel" @click="cancelDel">编辑</view>
			<view class="redact" v-else @click="ShowDel">完成</view>
		</view>
		<view class="">
			<view class="minbox">
				<view class="min">今天</view>
				<view class="arrowss"><image class="arrows" src="../../../static/hpicons/arrows2.svg" mode=""></image></view>
			</view>
			<view class="listbox">
				<view class="choose" v-if="isShowDel"><view class="IconsCK IconsCK-radio checked"></view></view>
				<view class="drawing">
					<view class=""><image class="imgs" src="" mode=""></image></view>
					<view class="brace">
						<view class="being">牙套牙齿矫正器</view>
						<view class="correct">
							<span class="spanl">¥</span>
							1680
							<span class="spanr">¥1888</span>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="lect" v-if="isShowDel">
			<view class="lects"><view class="IconsCK IconsCK-radio checked"></view></view>
			<view class="cancel">
				<view class="cover">全选</view>
				<view class="covers">删除</view>
			</view>
		</view>
		<view class="uni-tab-bar-loading"><uni-load-more :loadingType="loadingType"></uni-load-more></view>
	</view>
</template>

<script>
import { post, get } from '@/common/util.js';
import uniLoadMore from '@/components/uni-load-more.vue'; //加载更多
export default {
	data() {
		return {
			isShowDel: false, //编辑完成
			userId: '',
			token: '',
			page: 1,
			pageSize: 10,
			loadingType: 0 //0加载前，1加载中，2没有更多了
		};
	},
	components: {
		uniLoadMore
	},
	onLoad() {
		this.userId = uni.getStorageSync('userId');
		this.token = uni.getStorageSync('token');
		console.log(this.userId, 'this.userId');
		console.log(this.token, 'this.token');
		this.FootprintList();
	},
	methods: {
		toback() {
			uni.switchTab({
				url: '/pages/tabBar/my/my'
			});
		},
		//点击编辑
		ShowDel() {
			this.isShowDel = true;
		},
		cancelDel() {
			this.isShowDel = false;
		},
		/*获取足迹列表*/
		async FootprintList() {
			let result = await post('User/MemberFootprintList', {
				UserId: this.userId,
				Token: this.token,
				page: this.page,
				pageSize: this.pageSize
			});
			if (result.code === 0) {
				console.log(result.data, '获取足迹列表');
			}
		},
		async DeleteMyFootprint() {
			let result = await post('User/DeleteMyFootprint', {
				UserId: this.userId,
				Token: this.token,
				Id: this.Ids.join(',')
			});
		},
		// 下拉刷新
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			let _this = this;
			_this.page = 1;
			_this.loadingType = 1;
			setTimeout(function() {
				_this.FootprintList();
				// uni.stopPullDownRefresh(); //停止下拉刷新动画
			}, 1000);
		},
		// 上拉加载
		onReachBottom: function() {
			if (this.isLoad) {
				this.loadingType = 1;
				this.page++;
				this.FootprintList();
			} else {
				this.loadingType = 2;
			}
		}
	}
};
</script>

<style scoped>
.browsing {
	background: #ffffff;
}
.nav {
	height: 88rpx;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 30rpx;
}
.back {
	width: 35rpx;
	height: 50rpx;
}
.mine {
	font-size: 34rpx;
	font-family: PingFang;
	font-weight: bold;
	color: rgba(51, 51, 51, 1);
}
.redact {
	font-size: 32rpx;
	font-family: PingFang;
	font-weight: 500;
	color: rgba(51, 51, 51, 1);
}
.minbox {
	width: 100%;
	height: 60rpx;
	background: rgba(236, 236, 236, 1);
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 30rpx;
}
.min {
	font-size: 24rpx;
	font-family: PingFang;
	font-weight: 500;
	color: rgba(102, 102, 102, 1);
}
.arrowss {
	width: 36rpx;
	height: 36rpx;
	background: rgba(255, 255, 255, 1);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.arrows {
	width: 27rpx;
	height: 20rpx;
}
.listbox {
	padding: 30rpx;
	display: flex;
	border-bottom: 1rpx solid rgba(236, 236, 236, 1);
}
.choose {
	width: 130rpx;
	display: flex;
	align-items: center;
}
.drawing {
	display: flex;
}
.imgs {
	width: 160rpx;
	height: 160rpx;
	border-radius: 10rpx;
	background: #cab38b;
}
.brace {
	font-family: PingFang;
	font-weight: 500;
}
.being {
	font-size: 28rpx;
	color: rgba(51, 51, 51, 1);
	padding-left: 20rpx;
}
.correct {
	font-size: 28rpx;
	color: rgba(255, 51, 51, 1);
	padding-left: 20rpx;
	line-height: 66rpx;
}
.spanl {
	font-size: 20rpx;
	color: rgba(255, 51, 51, 1);
}
.spanr {
	font-size: 22rpx;
	text-decoration: line-through;
	color: rgba(153, 153, 153, 1);
	padding-left: 20rpx;
}
.lect {
	height: 100rpx;
	width: 100%;
	background: rgba(0, 0, 0, 0.8);
	position: fixed;
	bottom: 0;
	display: flex;
	padding-left: 30rpx;
}
.lects {
	display: flex;
	align-items: center;
}
.cancel {
	display: flex;
	align-items: center;
	width: 100%;
}
.cover {
	width: 70%;
	height: 100rpx;
	display: flex;
	align-items: center;
	font-size: 28rpx;
	color: rgba(255, 255, 255, 1);
}
.covers {
	width: 30%;
	height: 100rpx;
	background: rgba(255, 51, 51, 1);
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 32rpx;
	color: rgba(255, 255, 255, 1);
}
</style>
