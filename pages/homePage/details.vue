<template>
	<!-- 家居详情 -->
	<view class="details">
		<!-- 首图展示 -->
		<view class="productBanner">
			
			<!-- #ifdef MP-WEIXIN -->
			<view class="menubtn iconfont icon-cart" @click="tolink('/pages/tabBar/cart/cart',true)"></view>
			<button class="sharebtn" open-type="share"><view class="iconfont icon-share"></view></button>
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
					<image class="close" src="http://ddyp.wtvxin.com/static/hpicons/close.svg" mode=""></image>
				</view>
				
				<view class="broadcast">
					<image class="litre" src="http://ddyp.wtvxin.com/static/hpicons/close.svg" mode=""></image>
					<view class="">直播中</view>
				</view>
			</view>
			<view class="pagination" v-if="hasBanner">{{bannerindex+1}}/{{proInfo.PicData.length}}</view>
		</view>
		<div v-if="isLimint==1" :class="['limitTiem jus-b ali-c',starTimetype!=1?'no':'']">
			  <div class="limt-left">
				<div class="active-price jus-a ali-c">
					<h3><span>¥</span>{{proInfo.TimePrice}}</h3>
					  <p>¥{{proInfo.Price}}</p>
				</div>
				<div class="percentage">
				  <span :style="['width:'+proInfo.StockProportion+'%']"><i>已抢{{proInfo.SalesVolume}}件</i></span>
				</div>
			  </div>
			  <div class="limt-right">
				<div class="txt">限时秒杀</div>
				<div class="time ali-c jus-b" >
					<span class="timetxt">{{starTimetype==1?'距离结束':'距离开始'}}</span>
					<div class="countDown" v-if="timeStr.length">
					  <span>{{timeStr[1]}}</span>:<span>{{timeStr[2]}}</span>:<span>{{timeStr[3]}}</span>
					</div>
				</div>
			  </div>
		  </div>
		<!-- 价格 位置 展示 -->
		<view class="">
			<view class="listpt">
				<view class="listprice" v-if="isLimint==0">
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
			<view class="discount flex flex-between">
				<view class="discount_l" v-if="proInfo.ServiceKeys">
					<view class="merging" v-for="(e,i) in proInfo.ServiceKeys.split(',')" :key="i">{{e}}</view>
				</view>
				<view class="payment">{{proInfo.SalesVolume}}人付款</view>
			</view>
			<view class="site">
				<view class="slogan">{{proInfo.Name}}</view>
				<view class="area">
					{{proInfo.Synopsis}}
				</view>
			</view>
			<view class="slider"></view>
			<view class="flex justifyContentStart bb_shop">
				<image :src="proInfo.ShopData.Logo" class="shop_bb_logo"></image>
				<view class="uni-bold">{{proInfo.ShopData.ShopNick}}</view>
			</view>
			
			<view class="purchase" style="display: none;">
				<view class="picture">
					<view class="portrait">
						<!-- <image src="http://ddyp.wtvxin.com/static/hpicons/back.svg" mode=""></image> -->
					</view>
					<view class="portrait left">
						<!-- <image src="http://ddyp.wtvxin.com/static/hpicons/back.svg" mode=""></image> -->
					</view>
					<view class="portrait left">
						<!-- <image src="http://ddyp.wtvxin.com/static/hpicons/back.svg" mode=""></image> -->
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
					<!-- <image class="exemption" style="width: 20rpx; height: 20rpx;" src="http://ddyp.wtvxin.com/static/hpicons/arrows.svg" mode=""></image> -->
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
			<view class="drawinfo" v-for="(item,index) in proInfo.ServiceInfo" :key="index"><image class="drawimg" src="http://ddyp.wtvxin.com/static/hpicons/draw.svg" mode=""></image>{{item.Name}}</view>
		</view>
		<view class="pole"></view>
		<!-- 商品评价 -->
		<view class="comment">
			<view class="comment_hd">
			  <view class="tit_l">商品评价<span>({{CommentList.length}})</span></view>
			  <view class="tit_r flex flex-end" v-if="hasComment" @click="tolink('/pages/homePage/evaluation?id='+proId)">
				<view class="red">查看全部</view>
				<view class="iconfont icon-arrow_r"></view>
			  </view>
			</view>
			<block v-if="hasComment">
				<view class="comment-item" v-for="(item,index) in CommentList" :key="index">
				  <view class="name ali-c jus-b">
					<view class="ali-c">
					  <img class="tx" :src="item.Avatar||'http://ddyp.wtvxin.com/static/default.png'" alt="">
					  <view>{{item.NickName}}</view>
					</view>
					<view class="flex">
					   <view class="star iconfont icon-collect" v-for="(item1,index1) in item.Rank" :key="index1"></view>
					</view>
				  </view>
				  <view class="detail">{{item.ContentText}}</view>
				  <view class="flex flexWrap"  v-if="item.PicData">
					<block v-for="(i,e) in item.imgArr" :key="e">
					  <img v-if="e<3" :src="i" alt="" class="shop_pic" @click="previewImg(item.imgArr,i)">
					</block>
				  </view>
				  <view class="time">{{item.AddTime}}</view>
				</view>
			</block>
			<view class="uni-comment" v-else>
				<view class="uni-center" style="padding: 20upx; color: #999;">
					暂无评论
				</view>
			</view>
		</view>
		<view class="pole"></view>
		<!-- 商品特别说明 -->
		<view class="explain">
			<view class="pledge border_bottom">
				<image class="safety" src="http://ddyp.wtvxin.com/static/hpicons/safety.svg" mode=""></image>正品保证 
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
				<view class="foot-item" @click="tolink('/pages/brand/shopIndex/shopIndex?ShopId='+proInfo.ShopData.ShopId)">
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
				<!-- 有拼团样式 -->
				<view class="foot-item foot-item-btns" v-if="GroupId>0">
					<view class="btn btn_1 flex" @click="showSku(0)">
						<view class="num" v-if="isLimint==0">¥{{proInfo.Price}}</view>
						<view class="num" v-else>¥{{proInfo.TimePrice}}</view>
						<view class="txt">单独购买</view>
					</view>
					<view class="btn btn_2 flex" @click="showSku(1)">
						<view>
							<view class="num">¥{{GroupPrice}}</view>
							<view class="txt">我要拼团</view>
						</view>
						<view class="listm rt flex" v-if="proInfo.DistributionIncome>0">
							<view class="cash fa" >返</view>
							<view class="cashm fas">¥{{proInfo.DistributionIncome}}</view>
						</view>
					</view>
				</view>
				<!-- 无拼团样式 -->
				<view class="foot-item foot-item-btns" v-else>
					<view class="btn btn_1 flex" @click="showSku(0)">
						<view class="txt">加入购物车</view>
					</view>
					<view class="btn btn_2 flex" @click="showSku(0)">
						<view>
							<view class="txt">立即购买</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 详情底部 end -->
		<view class="topbtn" @click="Top" v-if="isTop"></view>
		<popupsku :proInfo="proInfo"  v-if="isProData" :show="showPopupSku" :showbtntype="showbtntype" :fromPinTuan="fromPinTuan" v-on:hidePopup="hidePopup" v-on:getsku="getsku(arguments)" :isLimint="isLimint*1"></popupsku>
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
				GroupId:0,//拼团id
				GroupPrice:0,//拼团价格
				proInfo:{},
				IsCollect:false, //是否收藏该商品
				bannerindex:0,//当前轮播图
				hasBanner:false,
				showPopupSku:false,
				showPopupinfo:false,//参数
				attrArr:{},//产品参数
				isServiceInfo:false,//服务
				showbtntype:0,
				fromPinTuan:false,//是否是拼团sku
				isProData:false,
				number:1,
				SpecText:'',
				canaddcar:false, //sku齐全可以加入购物车
				price:'',
				plusprice:'',
				hasComment:false,
				CommentList:[],//评价列表
				isLimint:0,//0非限时购产品，1限时购产品
				timer:null,
				timeStr:[],//倒计时
				starTimetype:1,//0秒杀未开始，1一开始，2已结束
				percentage:0,//已售百分比
				GroupSku:[],//拼团商品Sku
				ProSku:[],//普通商品Sku
			}
		},
		onLoad(e) {
			// #ifdef APP-PLUS
			console.log(e.id)
			this.proId=e.id
			// #endif
		},
		onShow(){
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			// #ifndef APP-PLUS
			this.proId=this.$root.$mp.query.id;
			this.isLimint=this.$root.$mp.query.isLimint||0;
			// #endif
			this.Goodsxq();
			this.getCommentList();
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
					this.ProSku=result.data.Sku;
					this.GroupId=this.proInfo.GroupId;
					if(this.proInfo.GroupId>0){//可以拼团
						this.GroupProductInfo()
						this.isProData = false;
					}else{
						this.isProData = true;
					}
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
					this.GetRTime(this.proInfo.FlashSaleEndTime);//限时商品倒计时
				}
			},
			//拼团商品详情
			async GroupProductInfo(){
				let result = await post("GroupBuy/GroupProductInfo", {
					userId:this.userId,
					token:this.token,
					GroupId: this.GroupId
				});
				if(result.code==0){
					var _this=this;
					this.GroupSku=result.data.Sku;
					this.$set(_this.proInfo,'FightingPrice',result.data.FightingPrice);//在普通产品详情添加拼团商品信息，公用一套sku组件
					this.$set(_this.proInfo,'OriginalPrice',result.data.OriginalPrice);
					this.GroupPrice=result.data.FightingPrice;
				}
			},
			//限时商品倒计时
			GetRTime(endTime) {
			  let _this = this;
			  //倒计时
			  let endtime=endTime.replace(/-/g, '/').replace(/T/g, ' ');
			  let EndTime = new Date(endtime); //结束时间
			  this.timer = setInterval(function() {
			  let NowTime = new Date(); //当前时间
			  let t = EndTime.getTime() - NowTime.getTime();
			  if (t > 0) {
				let d = Math.floor(t / 1000 / 60 / 60 / 24); //天
				let h = Math.floor((t / 1000 / 60 / 60) % 24); //时
				let m = Math.floor((t / 1000 / 60) % 60); //分
				let s = Math.floor((t / 1000) % 60); //秒
				if (parseInt(d) < 1) {
				d = "";
				} else {
				d = d + "天";
				}
				if (parseInt(h) < 10) {
				h = "0" + h;
				}
				if (parseInt(m) < 10) {
				m = "0" + m;
				}
				if (parseInt(s) < 10) {
				s = "0" + s;
				}
				_this.timeStr = [d,h,m,s];
			  } else {
				this.starTimetype=2;
				clearInterval(this.timer);
			  }
			  }, 1000);
			},
			//展示底部 Sku
			showSku: function(type) {
				this.isProData = false;
				this.hidePopup();console.log(type)
				var _this=this;
				if(type==1){//替换传给sku组件的值
					this.fromPinTuan=true
					this.$set(_this.proInfo,'Sku',_this.GroupSku);
				}else{
					this.fromPinTuan=false
					this.$set(_this.proInfo,'Sku',_this.ProSku);
				}
				this.showbtntype=type;
				this.showPopupSku = true;
				this.isProData = true;
			},
			//展示底部 参数
			showInfo: function() {
				this.hidePopup();
				this.showPopupinfo = true;
			},
			//统一的关闭popup方法
			hidePopup: function() {
				this.isProData = false;
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
			//评论列表
			async getCommentList(){
			  let res=await post("Order/OrderCommentList",{
				Page:1,
				PageSize: 2,
				ProId:this.proId,
				UserId: this.userId,
				Token: this.token,
			  })
			  if(res.code==0){
				let _this=this
				if(res.data.length){
					_this.hasComment=true;
					res.data.forEach(function(item) {
					  let arr = []
					  for(var i=0;i<item.PicData.length;i++){
						arr.push(item.PicData[i].PicUrl)
						// console.log(arr)
					  }
					  _this.$set(item, "imgArr",arr);
					})
					_this.CommentList=res.data;
				}else{
					_this.hasComment=false;
				}
			   }
			},
			 //预览图片
			previewImg(imgurls,index){
			  uni.previewImage({
				current:index,
				urls: imgurls,
				indicator:imgurls.length
			  });
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
<style scoped lang="scss">
	@import "@/common/details.scss";
	.bb_shop{
		text-align: left;
		padding:30upx;
		align-items: center;;
	}
	.shop_bb_logo{
		width:80upx;height:80upx;
		border-radius: 50%;
		margin:0
	}
	page{ background-color: #fff;}
	.shop_pic{
		width:160upx;height:160upx;
		margin-right:14upx;
		&:nth-child(4n){
			margin-right:0
		}
	}
	.limitTiem{
	    background: #ff3333;
	    color: #fff;
	    padding: 20rpx 30rpx;
	    .limt-left{
	      .active-price{
	        h3{ font-size: 40rpx; margin-right: 10rpx;
	          span{ font-size: 28rpx !important}
	        }
	        p{text-decoration: line-through}
	      } 
	      .percentage{
	          width:210rpx;
	          height:24rpx;
	          line-height:24rpx;
	          font-size:24rpx;
	          background:#ff747a;
	          border-radius:20rpx;
	          text-align:center;
	          position:relative;
	          overflow: hidden;
	          span{
	            position:absolute;
	            top:0;
	            left:0;
	            height:100%;
	            border-radius:20rpx;
	            background:#ffaa01;
	            display:block;
	            i{ display: inline-block;width: 220rpx}
	          }
	        }
	    }
	    .limt-right .txt{ font-size: 40rpx; font-weight: bold;text-align: right;}
	    .countDown span{
	      background: #fff; color: #ff3333; border-radius: 4rpx; margin: 0 6rpx; padding: 0 4rpx;
	    }
	  }
</style>
