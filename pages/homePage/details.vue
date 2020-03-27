<template>
	<!-- 家居详情 -->
	<view class="details">
		<!-- 首图展示 -->
		<view class="productBanner">
			
			<!-- #ifdef MP-WEIXIN -->
			<view class="menubtn iconfont icon-cart" @click="tolink('/pages/tabBar/cart/cart',true)"></view>
			<button class="sharebtn" open-type="share"><view class="iconfont icon-fenxiang2"></view></button>
			<!-- #endif -->
			<swiper class="swiper" :indicator-dots="false" :autoplay="false" :interval="5000" :duration="500" @change="changeBanner">
				<swiper-item v-for="(item,index) in proInfo.PicData" :key="index">
					<view class="swiper-item">
						<image class="img" :src="item.PicUrl" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
			<view class="streaming" v-if="false">
				<image class="figure" src="" mode=""></image>
				<view class="closes">
					<image class="close" src="../../static/hpicons/close.svg" mode=""></image>
				</view>
				
				<view class="broadcast">
					<image class="litre" src="../../static/hpicons/close.svg" mode=""></image>
					<view class="">直播中</view>
				</view>
			</view>
			<view class="pagination" v-if="hasBanner">{{bannerindex+1}}/{{proInfo.PicData.length}}</view>
		</view>
		<!-- 价格 位置 展示 -->
		<view class="">
			<view class="listpt">
				<view class="listprice">
					<view class="listm">
						<view class="selling"><span>¥</span>{{proInfo.Price}}</view>
						<view class="original" v-if="proInfo.MarketPrice>proInfo.Price">¥{{proInfo.MarketPrice}}</view>
					</view>
					<view class="listm rt" v-if="proInfo.DistributionIncome>0">
						<view class="cash">返</view>
						<view class="cashm">¥{{proInfo.DistributionIncome}}</view>
					</view>
				</view>
			</view>
			<view class="discount">
				<view class="merging"><span>拼单折扣</span></view>
				<view class="mergings"><span>专项补贴3%</span></view>
				<view class="payment">{{proInfo.SalesVolume}}人付款</view>
			</view>
			<view class="site">
				<view class="slogan">{{proInfo.Name}}</view>
				<view class="area">
					{{proInfo.Synopsis}}
				</view>
			</view>
			<view class="purchase" style="display: none;">
				<view class="picture">
					<view class="portrait">
						<!-- <image src="../../static/hpicons/back.svg" mode=""></image> -->
					</view>
					<view class="portrait left">
						<!-- <image src="../../static/hpicons/back.svg" mode=""></image> -->
					</view>
					<view class="portrait left">
						<!-- <image src="../../static/hpicons/back.svg" mode=""></image> -->
					</view>
				</view>
				<view class="screen">心善若水</view>
				<view class="make">这些人刚刚购买成功</view>
				<view class="bill">去拼单</view>
			</view>
		</view>
		<view class="pole"></view>
		<!-- 发货选择 -->
		<view class="shipments">
			<view class="pick">
				<view class="shipmentsbox">
					<view class="">快递</view>
					<!-- <input class="province" type="text" placeholder="广东 广州" disabled> -->
					<view class="">{{proInfo.Freight==0?'包邮':proInfo.Freight}}</view>
					<!-- <image class="exemption" style="width: 20rpx; height: 20rpx;" src="../../static/hpicons/arrows.svg" mode=""></image> -->
				</view>
			</view>
			<view class="pick" @click="showSku(0)">
				<view class="shipmentsbox">
					<view class="">规格</view>
					<input class="province" type="text" placeholder="1件" disabled v-model="SpecText">
					<view class="iconfont icon-arrow_r"></view>
				</view>
			</view>
			<view class="pick" v-if="proInfo.ParameterJson!=='{}'&&proInfo.ParameterJson!==''" @click="showInfo">
				<view class="shipmentsbox">
					<view class="">参数</view>
					<input class="province" type="text" placeholder="产品参数" disabled>
					<view class="iconfont icon-arrow_r"></view>
				</view>
			</view>
		</view>
		<!-- 品牌介绍 -->
		<view class="needknow" v-if="isServiceInfo">
			<view class="drawinfo" v-for="(item,index) in proInfo.ServiceInfo" :key="index"><image class="drawimg" src="../../static/hpicons/draw.svg" mode=""></image>{{item.Name}}</view>
		</view>
		<view class="pole"></view>
		<!-- 商品评价 -->
		<view class="merchandise">
			<view class="evaluate">
				<view class="">商品评价<span>(3)</span></view>
				<view class="whole" @click="toevaluation('/pages/homePage/evaluation')">查看全部
					<image class="arrows" src="../../static/hpicons/arrows.svg" mode=""></image>
				</view>
			</view>
		</view>
		
		<view class=""></view>
		<!-- 商品评价详情 -->
		<view class="minute">
			<view class="given">
				<view class="picture">
					<view class="portrait">
						<!-- <image src="../../static/hpicons/back.svg" mode=""></image> -->
					</view>
				</view>
				<view class="screen">筱风月忆</view>
				<view class="stars">
					<image class="star" src="../../static/hpicons/collect.svg" mode=""></image>
					<image class="star" src="../../static/hpicons/collect.svg" mode=""></image>
					<image class="star" src="../../static/hpicons/collect.svg" mode=""></image>
					<image class="star" src="../../static/hpicons/collect.svg" mode=""></image>
					<image class="star" src="../../static/hpicons/collect.svg" mode=""></image>
					</view>
				<view class="min">2019-09-08</view>
			</view>
			<view class="carport">柜子做工很好，适合家里装修风格，尺寸标准，空间够大 做工方面精致，几乎没什么气味！很实用！</view>
			<view class="carportimg">
				<image class="carportimgs" src="" mode=""></image>
				<image class="carportimgs" src="" mode=""></image>
				<image class="carportimgs" src="" mode=""></image>
			</view>
		</view>
		<view class="pole"></view>
		<!-- 商品特别说明 -->
		<view class="explain">
			<view class="pledge border_bottom">
				<image class="safety" src="../../static/hpicons/safety.svg" mode=""></image>正品保证 
				<span>100%正品 品牌直采</span>
			</view>
			<view class="especially">
				<view class="especiallys">特别说明</view>
				<view class="activity">
					<view class="">1.</view>
					<view class="">	本次活动的六重豪礼仅限在活动期间下订，并成功购买车位用户享有，权益限量100名，以实际拼付订单的顺序为准;</view>
				</view>
				<view class="activity">
					<view class="">2.</view>
					<view class="">活动权益方法时间:电商礼一价值1000元大单易拼电子消费券将在用户购买车位发票至旗舰店在线客服处审核后2-3个月内,发放至用户钱包;</view>
				</view>
				<view class="activity">
					<view class="">3.</view>
					<view class="">其他豪礼以线下销售客服为准;</view>
				</view>
				<view class="activity">
					<view class="">4.</view>
					<view class="">详情请咨询万科云子代销商在线客服。</view>
				</view>
			</view>
			<view class="pole"></view>
		</view>
		<!-- 拼单流程 -->
		<view class="flow">
			<view class="joint">
				<view class="stream"></view>
				<view class="process">拼单流程</view>
				<view class="stream"></view>
			</view>
			<view class="online">
				<view class="serials">
					<image class="serialimg" src="" mode=""></image>
					<view class="once">1</view>
					<view class="contract">在线选择意向车位编号 及就近签约地点。</view>
				</view>
				<view class="serials">
					<image class="serialimg" src="" mode=""></image>
					<view class="once">2</view>
					<view class="contract">拼单并备注购车位信息 (业主姓名、联系方式)</view>
				</view>
				<view class="serials">
					<image class="serialimg" src="" mode=""></image>
					<view class="once">3</view>
					<view class="contract">凭短信验证码到签约 中心核销完成购车位。</view>
				</view>
			</view>
			<view class="online">
				<view class="serials">
					<image class="serialimg" src="" mode=""></image>
					<view class="once">4</view>
					<view class="contract">成功购车位后将购车位 发票提交至万科云子代. 销商在线客服处审核。</view>
				</view>
				<view class="serials">
					<image class="serialimg" src="" mode=""></image>
					<view class="once">5</view>
					<view class="contract">审核通过后即可获取 大单易拼相关活动权。</view>
				</view>
			</view>
		</view>
		<!-- 图片展砂 -->
		<view class="pole"></view>
		<view class="graphic">
			<view class="brand">图文详情</view>
			<view class="detailhtml" v-if="proInfo.ContentDetail">
				<uParse :content="proInfo.ContentDetail" />
			</view>
		</view>
		<!-- 详情底部 -->
		<view style="height: 100upx;"></view>
		<view class="foot-fiexd">
			<view class="dd-foot">
				<view class="border-top"></view>
				<view class="foot-item">
					<view class="bd"><view class="iconfont icon-dianpu"></view>店铺</view>
				</view>
				<view class="foot-item" style="position: relative;">
					<view class="bd"><view class="iconfont icon-kefu"></view>客服</view>
					<!-- #ifndef MP-WEIXIN -->
					<a class="WEIXIN_btn" href="mqqapi://card/show_pslcard?src_type=internal&version=1&uin=996889692&card_type=group&source=qrcode"></a>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
					<button open-type="contact" class="WEIXIN_btn"></button>
					<!-- #endif -->
				</view>
				<view class="foot-item">
					<view class="bd"><view class="iconfont" :class="[IsCollect ? 'icon-collect' : 'icon-collect1']" @click="collect"></view>收藏</view>
					<!-- 实心 icon-collect-->
				</view>
				<view class="foot-item foot-item-btns">
					<view class="btn btn_1 flex" @click="showSku(0)">
						<view class="num">¥{{proInfo.Price}}</view>
						<view class="txt">单独购买</view>
					</view>
					<view class="btn btn_2 flex" @click="showSku(1)">
						<view>
							<view class="num">¥126</view>
							<view class="txt">我要拼团</view>
						</view>
						<view class="listm rt flex" v-if="proInfo.DistributionIncome>0">
							<view class="cash fa" >返</view>
							<view class="cashm fas">¥{{proInfo.DistributionIncome}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 详情底部 end -->
		<view class="topbtn" @click="Top" v-if="isTop"></view>
		<popupsku :proInfo="proInfo"  v-if="isProData" :show="showPopupSku" :showbtntype="showbtntype" v-on:hidePopup="hidePopup" v-on:getsku="getsku(arguments)" :isLimint="0"></popupsku>
		<!-- 弹出产品参数 -->
		<uni-popup position="bottom" mode="fixed" :show="showPopupinfo" :h5Top="true" @hidePopup="hidePopup">
			<view class="uni-modal-Attr">
				<view class="bottom-title">产品参数</view>
				<view class="bottom-content">
					<view class="uni-list attrlist">
						<view class="uni-list-cell" v-for="(item,index) in attrArr" :key="index">
							<view class="uni-list-cell-navigate">
								{{index}}
								<text class="list-cell-r">{{item}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="bottom-btn" @click="hidePopup">完成</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {post,get} from '@/common/util.js';
	import uParse from '@/components/uParse/src/wxParse.vue';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import popupsku from '@/components/popupSku.vue';
	import uniRate from '@/components/uni-rate.vue';
	import "@/common/details.css";
	export default {
		components: {
			uParse,
			uniPopup,
			popupsku,
			uniRate
		},
		data() {
			return {
				userId: "",
				token: "",
				isTop:false,//是否显示置顶
				proId:'',//商品id
				proInfo:{},
				IsCollect:false, //是否收藏该商品
				bannerindex:0,//当前轮播图
				hasBanner:false,
				showPopupSku:false,
				showPopupinfo:false,//参数
				attrArr:{},//产品参数
				isServiceInfo:false,//服务
				showbtntype:0,
				isProData:false,
				number:1,
				SpecText:'',
				canaddcar:false, //sku齐全可以加入购物车
				price:'',
				plusprice:'',
			}
		},
		onLoad() {
			
		},
		onShow(){
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.proId=this.$root.$mp.query.id;
			this.Goodsxq();
		},
		onNavigationBarButtonTap(e) {
			if(e.index===0){
				//分享
			}else{
				uni.reLaunch({
					url: '/pages/tabBar/cart/cart'
				})
			}
		},
		methods: {
			//跳转
			tolink(Url,tabBar) {
				if(tabBar){
					uni.switchTab({
						url: Url
					})
				}else{
					uni.navigateTo({
						url: Url
					})
				}
			},
			changeBanner(e){
				this.bannerindex=e.detail.current;
			},
			//返回顶部
			Top(){
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 200
				});
			},
			//商品详情
			async Goodsxq(){
				let result = await post("Goods/Goodsxq", {
					userId:this.userId,
					token:this.token,
					Id: this.proId
				});
				if(result.code==0){
					this.proInfo=result.data;
					this.isProData = true;
					if(this.proInfo.PicData.length){
						this.hasBanner=true;
					}
					this.IsCollect=result.data.IsCollection.Value;
					if(this.proInfo.ServiceInfo.length){
						this.isServiceInfo=true
					}
					if(this.proInfo.ParameterJson!=""&&this.proInfo.ParameterJson!="{}"){
						this.attrArr=JSON.parse(this.proInfo.ParameterJson);
					}
				}
			},
			//展示底部 Sku
			showSku: function(type) {
				this.hidePopup();
				this.showbtntype=type;
				this.showPopupSku = true;
			},
			//展示底部 参数
			showInfo: function() {
				this.hidePopup();
				this.showPopupinfo = true;
			},
			//统一的关闭popup方法
			hidePopup: function() {
				this.showPopupSku=false;
				this.showPopupinfo = false;
			},
			 getsku:function(msg){
			  this.number=msg[0];
			  this.SpecText=msg[1];
			  this.canaddcar=msg[2];
			  this.price=msg[3];
			  this.plusprice=msg[4];
			},
			//添加取消收藏
			async collect(){
				let objUrl = ''
				if(this.IsCollect){
					objUrl = "User/ReCollections"
				}else{
					objUrl = "User/AddCollections"
				}
				let result = await post(objUrl, {
					Id: this.proId,
					userId:this.userId,
					token:this.token,
				  });
				if(result.code==0){
					if(this.IsCollect){
						uni.showToast({
							title: "已取消收藏！",
							icon:"none",
							duration: 1500
						});
						this.IsCollect=false;
					}else{
						uni.showToast({
							title: "添加收藏成功！",
							icon:"none",
							duration: 1500
						});
						this.IsCollect=true;
					}
				};
				if(result.code==2){
					let _this =this;
					uni.showModal({
						content: "您当前未登录，无法收藏，是否登录？",
						success(res) {
							if (res.confirm) {
								uni.navigateTo({
								  url: "/pages/login/login"
								});
							} else if (res.cancel) {
							}
						}
					});
				}
			},
			
		},
		onPageScroll(e){
			if(e.scrollTop>300){
				this.isTop=true;
			}else{
				this.isTop=false;
			}
		}
	}
</script>
<style scoped>
	page{ background-color: #fff;}
</style>
