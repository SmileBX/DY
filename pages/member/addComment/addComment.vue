<template>
	<div class="foot_list">
		<div class="or_item">
			<view class="bg_fff uni-mt10">
				<view class="product-comment">
					<view class="pictrue">
						<image class="img" :src="shopInfo.PicNo" mode="aspectFill"></image>
					</view>
					<view class="rate-item">
						<view class="title">描述相符</view>
						<uni-rate size="18" margin="10" color="#bbb" :starType="1" :showtxt="true" active-color="#ffc405" value="5"
						 @change="onChange"></uni-rate>
					</view>
				</view>
				<!--遇到的问题-->
				<!-- <div class="mt2">
		  	      <p class="cg font24">请选择您遇到的问题</p>
		  	      <div class="mt2 flex flexWrap">
		  	          <p v-for="(item,oll) in plist" :key="oll" class="pp_item" :class="{'active':oll==1}">{{item.name}}</p>
		  	      </div>
		  	  </div> -->
				<textarea cols="30" rows="10" maxlength="300" @input="limitInput" class="com_text" v-model="text" placeholder="填写您对商品的评价~"></textarea>
				<view class="counter"><text class="num">{{inputTxtLength}}</text>/300</view>
				<div class="p3" style="padding-bottom: 30upx;">
					<!-- <div>上传图片（不超过5张）</div> -->
					<div class="fed_pic flex flexWrap">
						<div v-for="(item,index) in imgList" :key="index" class="picbox">
							<span class="" @click="deleteImg(index)">×</span>
							<image :src="item" alt="" class="pic_itim"></image>
						</div>
						<div class="picbox upBtnImg" @click="changeImg()" v-if="imgList.length<4">
							<img src="http://jyy.wtvxin.com/static/images/icons/add2.png" alt="" class="pic_itim">
						</div>
					</div>
				</div>
			</view>
			<view class="uni-bg-white uni-mt10">
				<view class="appraiseContent__hd">
					<view class="title">
						店铺评分
					</view>
				</view>
				<view class="rateContent">
					<view class="rate-item flex flex-start">
						<view class="title">物流服务</view>
						<view class="grade">
							<uni-rate size="18" margin="10" color="#bbb" :starType="2" :showtxt="true" active-color="#ffc405" value="0"
							 @change="onChange"></uni-rate>
						</view>
					</view>
					<view class="rate-item flex flex-start">
						<view class="title">服务态度</view>
						<view class="grade">
							<uni-rate size="18" margin="10" color="#bbb" :starType="3" :showtxt="true" active-color="#ffc405" value="0"
							 @change="onChange"></uni-rate>
						</view>
					</view>
				</view>
			</view>
			<div class="porela" @click="pub()">提交</div>
		</div>
	</div>
</template>

<script>
	import {
		switchPath,
		post
	} from '@/common/util.js'
	import {
		pathToBase64,
		base64ToPath
	} from '@/common/image-tools.js';
	import uniRate from '@/components/uni-rate.vue';
	export default {
		components: {
			uniRate
		},
		data() {
			return {
				// plist:[{id:1,name:'商品问题'},{id:1,name:'客服问题'},{id:1,name:'包装问题'},{id:1,name:'物流问题'},{id:1,name:'其他'}],
				shopInfo: {},
				text: '',
				imgList: [],
				proRank: 5, //产品评价等级
				serRank: 0, //服务评价等级
				logRank: 0, //物流评价等级
				inputTxtLength: 0, //当前输入字数
			}
		},
		onLoad() {
			this.imgList = []
		},
		onShow() {
			console.log(this.$mp.query)
			this.getDetail()
		},
		watch: {
			imgList(e) {
				console.log(e,";;;;;;;;;;;;")
			}
		},
		methods: {
			async pub() {
				if (this.text) {
					let imgList = await this.base64Img(this.imgList);
					post('Order/CommentProduct', {
						"UserId": uni.getStorageSync("userId"),
						"Token": uni.getStorageSync("token"),
						"OrderNo": this.$mp.query.id,
						"OrderDetailId": this.$mp.query.detailId,
						"Content": this.text,
						"PicList": JSON.stringify(imgList),
						"ProductStarNum": this.proRank,
						"ServiceStarNum": this.serRank,
						"LogisticsStarNum": this.logRank
					}).then(res => {
						if (res.code === 0) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
							setTimeout(() => {
								uni.navigateBack();
							}, 300);
						}
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '您还没输入评论内容呢~'
					})
				}
			},
			deleteImg(index) {
				this.imgList.splice(index, 1)
			},
			changeImg() {
				let _this = this
				let count = 4 - this.imgList.length
				uni.chooseImage({
					count: count,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						res.tempFilePaths.map(item => {
							_this.imgList.push(item);
						})
					}
				})
			},
			limitInput() {
				this.inputTxtLength = this.text.length;
			},
			//设置评价等级
			onChange(e) {
				if (e.type === 1) {
					this.proRank = e.value;
				}
				if (e.type === 2) {
					this.serRank = e.value;
				}
				if (e.type === 3) {
					this.logRank = e.value;
				}
			},
			async base64Img(arr) {
				let base64Arr = [];
				for (let i = 0; i < arr.length; i += 1) {
					const res = await pathToBase64(arr[i]);
					base64Arr.push({
						PicUrl: res
					});
				}
				return base64Arr;
			},

			getDetail() {
				post('Order/OrderDetails', {
					UserId: uni.getStorageSync("userId"),
					Token: uni.getStorageSync("token"),
					OrderNo: this.$mp.query.id,
				}).then(res => {
					res.data.OrderDetails.forEach(item => {
						if (item.Id == this.$mp.query.detailId) {
							this.shopInfo = item
						}
					})
				})
			},
			goUrl(url, param) {
				uni.navigateTo({
					url: url + '?id=' + param
				})
			},


		},
	}
</script>

<style scoped lang='scss'>
	.product-comment {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		border-bottom: 1px solid #F2F2F2;
		padding: 20upx;

		.pictrue {
			width: 80upx;
			height: 80upx;
			margin-right: 20upx;
			overflow: hidden;
			display: flex;
			flex-direction: row;

			.img {
				width: 100%;
				height: 100%;
			}
		}

		.rate-item {
			display: flex;
			flex-direction: row;
			align-items: center;
		}

		uni-view {
			line-height: 80upx;
		}

		.uni-rate {
			height: 48upx;
		}
	}

	.pp_item {
		font-size: 24upx;
		padding: 8upx 20upx;
		border: 1upx solid #ededed;
		border-radius: 10upx;
		margin-right: 25upx;
		margin-top: 10upx;

		&:nth-child(4n) {
			margin-right: 0;
		}

		&.active {
			border: 1upx solid #f00;
			color: #f00;
		}
	}

	.com_text {
		padding: 20upx;
		height: 200upx;
		width: 100%;
	}

	.picbox {
		width: 25%;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		margin-top: 20upx;
		position: relative;

		span {
			position: absolute;
			width: 32upx;
			height: 32upx;
			background-color: #ff3333;
			color: #fff;
			border-radius: 50%;
			top: -12upx;
			right: 0upx;
			/* transform: rotate(45deg);
      font-weight: 900; */
			font-size: 34upx;
			line-height: 24upx;
			text-align: center;
			z-index: 99;
		}
	}

	.pic_itim {
		width: 144upx;
		height: 144upx;
	}

	.porela {
		width: 690upx;
		margin: 0 auto;
		background: #FF3333;
		color: #ffffff;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		border-radius: 12upx;
		margin-top: 60upx;
	}

	.appraiseContent__hd {
		padding: 20upx;
		border-bottom: 1px solid #F2F2F2;
	}

	.appraiseContent__hd .title {
		font-size: 30upx;
		color: #333;
	}

	.rateContent {
		padding: 20upx 0;
		margin: 0 20upx;
	}

	.rateContent .rate-item {
		margin: 10upx 0;
	}

	.rateContent .rate-item .title {
		color: #333;
	}

	.counter {
		padding: 0 20upx;
		text-align: right;
		font-size: 24upx;
		color: #B2B2B2;
	}
</style>
