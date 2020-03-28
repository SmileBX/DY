<template>
	<view class="content">
		<!--  #ifndef  MP-WEIXIN -->
		<view class="carthead"  :style="{'padding-top':barHeight+'px'}">
			<text>购物车</text>
			<text @click="ManageCart">{{isEdittxt}}</text>
		</view>
		<!--  #endif -->
		<!--  #ifdef  MP-WEIXIN -->
		<view class="wxcarthead" v-if="hascartlist">
			<text @click="ManageCart">{{isEdittxt}}</text>
		</view>
		<!--  #endif -->
		<view  :style="{'height':barHeight+44+'px'}"></view>
		<view class="hasContentPage" v-if="hascartlist">
			<view class="cartGroupList">
				<view class="item" v-for="(item,index) in cartlist" :key="index">
					<view class="item__hd flex flex-start">
						<view :class="['IconsCK IconsCK-radio',item.select?'checked':'']" @click="shopcheck(index)"></view>
						<view class="shop flex flex-start" @click="golink('/pages/store/storeIndex/storeIndex?shopId='+item.ShopId)">
							<view class="iconfont icon-dianpu"></view>
							<view class="shopName uni-ellipsis">{{item.ShopName}}</view>
							<view class="uni-icon uni-icon-arrowright"></view>
						</view>
						<view class="btn_receive" @click="showCoupon(item.ShopId)">领券</view>
					</view>
					<view class="column levelPanel">
						<view class="item" v-for="(item2,index2) in item.ProData" :key="index2">
							<view class="outside">
								<view class="IconsCK IconsCK-radio" :class="{'disabled':item2.disBuy,'checked':item2.select}" @click="selectStyle(index,index2,item2.select,item2.disBuy,$event)"></view>
								<view class="pictrueAll" @click="gotoDetail(item2.ProductId,item2.Isinvalid)">
									<view class="pictrue">
										<image :src="item2.PicNo" mode="widthFix"></image>
									</view>
								</view>
								<view class="txtBox">
									<view class="title text-line2" @click="gotoDetail(item2.ProductId,item2.Isinvalid)">{{item2.Name}}</view>
									<view class="flex skuBox">
										<view class="flex-item flex1" v-if="item2.SpecText" @click="showSku(item2.ProductId,item2.Id,item2.Number,0)">
											<view class="type">{{item2.SpecText}}<view style="color: #9b9b9b; font-size: 30upx;" class="uni-icon uni-icon-arrowdown"></view>
											</view>
										</view>
										<view class="flex-item">
											<!-- <text class="buyNum">x1</text> -->
										</view>
									</view>
									<view class="flex mt5 flexAlignCneter">
										<view class="flex-item flex1">
											<view class="new-price"><text class="yuan">￥</text>{{item2.Price}}
											<!-- <text class="fz12">返两万</text> -->
										</view>
										</view>
										<view class="flex-item selNumRow">
											<uni-number-box :disabled="false" :value="item2.Number" :min="item2.MinBuyNum" :max="item2.MaxBuyNum" v-on:change="change" :shopindex="index" :index="index2"></uni-number-box>
										</view>
									</view>
									<view class="flex">
										<view class="red fz12" v-if="item2.MinBuyNum>1">{{item2.MaxBuyNum}}件起购</view>
										<view class="red fz12" v-if="item2.MaxBuyNum>0">限购{{item2.MaxBuyNum}}件</view>
										<view class="red fz12" v-if="item2.Stock>0&&item2.Stock<10">仅剩{{item2.Stock}}件</view>
										<view class="red fz12" v-if="item2.Isinvalid>0">{{Isinvalidstr[item2.Isinvalid]}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cartFoot">
				<view class="inner fixed flex flexAlignCneter">
					<view class="left">
						<view :class="['IconsCK IconsCK-radio',allSelect?'checked':'']" @click="Allcheck"></view>全选
					</view>
					<view class="right flex1 text_r">
						<view class="inner1 flex flex-end" v-if="!isEdit">
							<view>
								<view class="hj">总计:<text class="allPrice"><text class="fz12">￥</text>{{allPrice}}</text></view>
								<!-- <view class="red fz12">返2万</view> -->
							</view>
							<button type="primary" size="middle" class="btnPay radius100" @click="settle">结算({{selectlen}})</button>
						</view>
						<view class="deletbox" v-else>
							<button class="delet2" @click="golink('/pages/member/myCollect/myCollect')">我的收藏</button>
							<button class="delet" @click="DelCartBtn">删除</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 没有数据的时候 --> 
		<view class="noConPage table bg_fff nodatalocal" v-if="noDataIsShow">
			<view class="table-cell">
				<view class="noDataImg">
					<image src="../../../static/icons/nocart.png" mode="widthFix"></image>
				</view>
				<view class="tips">购物车空空如也~</view>
				<view class="btnBox">
					<button plain="true" size="middle" class="btn btn-active" style="padding:0 40upx;" @click="goIndex">去购物</button>
				</view>
			</view>
		</view>
		<!-- SKU弹框 --> 
		<popupsku :proInfo="proInfo" v-if="isProData" :show="showPopupSku" :fromcart="fromcart" :showbtntype="1" :h5Top="true" :isPlus="isPLUS" v-on:hidePopup="hidePopup" v-on:selectSku="selectSku" :isLimint="isLimint"></popupsku>
		<!-- 弹出优惠券 -->
		<uni-popup position="bottom" mode="fixed" :show="showPopupCoupon" :h5Top="true" @hidePopup="hidePopup">
			<view class="uni-modal-Coupon">
				<view class="bottom-title">优惠</view>
				<view class="bottom-content">
					<view class="couponlist">
						<view class="coupon1" v-for="(item,index) in CouponList" :key="index">
							<view class="topbox">
								<view class="couponleft">
									<view class="price" v-if="item.DiscountType=='1'"><text>￥</text><text class="num">{{item.Denomination}}</text></view>
									<view class="price" v-if="item.DiscountType=='2'"><text class="num">{{item.Denomination}}</text><text>折</text></view>
									<view class="lefttxt" v-if="item.MeetConditions!='0'">满{{item.MeetConditions}}元可用</view>
									<view class="lefttxt" v-else>无门槛</view>
								</view>
								<view class="couponright">
									<view class="couponname">{{item.Name}}</view>
									<view class="coupontime">{{item.StartTime}}-{{item.EndTime}}</view>
								</view>
								<view class="couponbtn">
									<view class="btn" v-if="item.IsMyAlready" @click="ReceiveCoupon(0,item.Id,index)">立即领取</view>
									<view class="rightimg" v-else><image src="http://www.sc-mall.net/static/coupon5.png" mode=""></image></view>
								</view>
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
	import {post,get,toLogin} from '@/common/util.js';
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import noData from '@/components/noData.vue'; //暂无数据
	import popupsku from '@/components/popupSku.vue';
	import "@/common/dd_style.css";
	export default {
		components: {
			uniNumberBox,uniPopup,popupsku,noData
		},
		data() {
			return {
				userId:"",
				barHeight:0,
				token:"",
				memberInfo:{},//会员信息
				isPLUS:0,//会员是否是plus
				proInfo:{},      //单个商品信息
				isProData:false, //有商品信息
				showPopupSku:false,//sku弹框显示
				showPopupCoupon:false,//优惠券弹出
				skunumber:1,//选sku的商品数量
				skuCartId:"",//选sku的购物车id
				SpecText:"",//选sku的商品规格
				fromcart:true,//SKU显示确定不显示加入购物车
				cartinfo:{},//购物车信息
				cartlist:[], //购物车列表
				hascartlist:true, //购物车有商品
				noDataIsShow: false,
				isEdit:false,//是否编辑购物车
				isEdittxt:"管理",//是否编辑购物车按钮文字
				allSelect:false,//判断是否全选
				checklen:0,//有效产品数量
				selectlen:0,//累计选中的产品
				allPrice:0,//累计选中产品的金额
				CouponList:{},//弹出优惠券列表
				isLimint:0,//0非限时购产品，1限时购产品
				Isinvalidstr:['可购买','告罄','已下架','预售','库存不足','规格不存在']
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
			var height = plus.navigator.getStatusbarHeight();
			this.barHeight = height;
			// #endif
			// #ifdef H5
			this.barHeight = 0;
			// #endif
		},
		onShow() {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			//this.getMemberInfo();
			this.cartlist=[];
			this.getCartList();
			this.isEdit=false;
			this.isEdittxt="管理";
		},
		methods: {
			golink(url){
				uni.navigateTo({
					url:url
				})
			},
			// 跳转商品详情页
			gotoDetail(pid,Isinvalid){
				if(Isinvalid!=2){
					uni.navigateTo({
						url:'/pages/homePage/details?id='+pid
					})
				}else{
					uni.showToast({
						title: "该产品已下架！",
						icon: "none",
						duration: 2000
					});
				}
			},
			//加减商品的数量
			change(msg){
				console.log(msg)
				let number=msg[0];
				let index1=msg[1];
				let index2=msg[2];
				if(this.cartlist[index1].ProData[index2].Isinvalid==0){
					let dataArr=[],json = {};
					json["CartId"] = this.cartlist[index1].ProData[index2].Id;
					json["Total"] = number;
					json["SpecText"] = this.cartlist[index1].ProData[index2].SpecText;
					dataArr.push(json);
					this.eaditCart(dataArr,index1,index2,number);
				}
			},
			//编辑商品规格数量
			async eaditCart(Arr,index1,index2,number) {
				let info = await post("Cart/EditCart", {
					UserId: this.userId,
					Token: this.token,
					data: Arr
				});
				if (info.code === 0) {
					if(number){
						this.cartlist[index1].ProData[index2].Number = number;
						this.cartlist[index1].ProData[index2].select = true;
					}else{
						this.checklen=0;
						this.getCartList()
					}
				 //合计
				this.AllPrice();
				} else if (info.code === 2) {

				}
			},
			//删除购物车
			async DelCart(Arr){
				let result = await post("Cart/DelCart",{
					UserId: this.userId,
					Token: this.token,
					data: Arr
				})
				if (result.code === 0){
					this.getCartList();
				}
			},
			//删除按钮
			DelCartBtn(){
				let _this = this;
				let dataArr=[];
				_this.cartlist.forEach(function(item){
					item.ProData.forEach(function(item2){
						if(item2.select==true){
							let id = item2.Id;
							let json = {};
							json["CartId"] = id;
							dataArr.push(json);
						}
					})
					
				})
				if(dataArr.length){
					let that = this;
					uni.showModal({
						content: "您确定要删除所选商品吗？",
						confirmColor:"#ff3333",
						success: function(res) {
							if (res.confirm) {
								_this.DelCart(dataArr);
							} else if (res.cancel) {
							}
						}
					});
				}else{
					uni.showToast({
						title: "请选择你要删除的数据！",
						icon: "none",
						duration: 1500
					});
				}
			},
		//获取购物车列表
			async getCartList(){
				let result = await post("Cart/ShopsCartList", {
				UserId: this.userId,
				Token: this.token,
				});
				if(result.code==0){
					this.cartinfo=result.data;
					this.cartlist=result.data.CartList;
					this.checklen=0;
					this.selectlen=0;
					if(result.data.CartData.length>0){
						this.checklen=0;
						this.hascartlist=true;
						this.noDataIsShow=false;
						this.allSelect=false;
						this.allPrice=0;
						let _this = this;
						_this.$nextTick(function() {
							_this.cartlist.forEach(function(item) {
								_this.$set(item, "select", false);
								item.ProData.forEach(function(item2){
									_this.$set(item2, "select", false);
									if(item2.Isinvalid!=0){//0-可以购买 1-售罄 2-下架 3-预售 4-库存不足 5-规格不存在
										_this.$set(item2, "disBuy", true);
										_this.$set(item2, "select", false);
									}else{
										_this.checklen++;
										_this.$set(item2, "disBuy", false);
									}
								})
							}); 
						});
					}else{
						this.noDataIsShow=true;
						this.hascartlist=false;
					}
				}else if(result.code==2){
					this.noDataIsShow=true;
				}
			},
			//合计 金额、数量
			AllPrice(){
				let _this = this;
				let eaditallPrice =0;
				let eaditnum =0;
				let singelPrice=0;
				_this.cartlist.forEach(function(item){
					let singelnum=0,editsingelnum=0;
					item.ProData.forEach(function(item2){
						singelnum++;
						if(item2.select==true){
							singelPrice =Number(item2.Price)*parseInt(item2.Number);
							eaditallPrice += singelPrice;
							eaditnum++;
							editsingelnum++;
						}
					})
					if(singelnum==editsingelnum){
						 _this.$set(item, "select", true);	
					}else{
						 _this.$set(item, "select", false);
					}
				});
				this.selectlen=eaditnum;
				if(eaditnum==this.checklen){
						this.allSelect=true;
						this.allPrice= this.cartinfo.PayAmount;
				}else{
					this.allSelect=false;
					this.allPrice= parseFloat(eaditallPrice).toFixed(2);
				}
			},
			//全选、反选
			Allcheck() {
				this.allSelect=!this.allSelect;
				let _this = this;
				if(!this.isEdit){//未打开编辑按钮的全选
					if(this.allSelect){
						this.selectlen = this.checklen;
						_this.cartlist.forEach(function(item) {
							_this.$set(item, "select", true); 
							item.ProData.forEach(function(item2){
								if(item2.Isinvalid==0){
									_this.$set(item2, "select", true); 
								}
							})
						}); 
					}else{
						this.selectlen = 0;
						_this.cartlist.forEach(function(item) {
							_this.$set(item, "select", false); 
							item.ProData.forEach(function(item2){
								if(item2.Isinvalid==0){
									_this.$set(item2, "select", false); 
								}
							})
						}); 
					}
					this.AllPrice();//合计   
				}else{//打开编辑按钮的全选
					if(this.allSelect){
						_this.selectlen = _this.cartlist.length;
						_this.cartlist.forEach(function(item) {
							_this.$set(item, "select", true); 
							item.ProData.forEach(function(item2){
								_this.$set(item2, "select", true);
							})
						}); 
					}else{
						this.selectlen = 0;
						_this.cartlist.forEach(function(item) {
							_this.$set(item, "select", false); 
							item.ProData.forEach(function(item2){
								_this.$set(item2, "select", false); 
							})
						}); 
					} 
				} 
			},
			//单选
			selectStyle(index,index2,select,disBuy,event) {
				let _this=this;
				let item=_this.cartlist[index];
				let item2=item.ProData[index2];
				if(!this.isEdit){//未打开编辑按钮的单选
					if(disBuy){
						this.$set(item2, "select", false);
						event.preventDefault();
					}else{   
						if(select){
							this.$set(item2, "select", false);
						}else{
							this.$set(item2, "select", true);
						}
						this.allSelect=this.Cknum();
						this.AllPrice();//合计
					}
				}else{
					if(select){
						this.$set(item2, "select", false);
					}else{
						this.$set(item2, "select", true);
					}
					this.allSelect=this.Cknum();
				}
			},
			//店铺全选
			shopcheck(index){
				let _this=this;
				let item=_this.cartlist[index];
				_this.$set(item, "select", !item.select);
				if(item.select){
					item.ProData.forEach(function(e){
						_this.$set(e, "select", true);
					})
				}else{
					item.ProData.forEach(function(e){
						_this.$set(e, "select", false);
					})
				}
				_this.allSelect=_this.Cknum();
				if(!_this.isEdit){//未打开编辑按钮的单选
					_this.AllPrice();//合计
				}
			},
			//累计选中
			Cknum(){
				let _this=this;
				let cknum=0,cknumed=0,all=false;
				if(_this.isEdit){
					_this.cartlist.forEach(function(item){
						let itemcknum=0,itemcknumed=0;
						item.ProData.forEach(function(item2){
							cknum++;
							itemcknum++;
							if(item2.select==true){
								cknumed++;
								itemcknumed++;
							}
						})
						if(itemcknum==itemcknumed){
							 _this.$set(item, "select", true);	
						}else{
							 _this.$set(item, "select", false);
						}
					})  
					if(cknum==cknumed){
						all=true;		   
					}else{
						  all=false;
					}
					return all
				}else{
					_this.cartlist.forEach(function(item){
						let itemcknum=0,itemcknumed=0;
						item.ProData.forEach(function(item2){
							if(item2.Isinvalid==0){
								cknum++;
								itemcknum++;
							}
							if(item2.select==true){
								cknumed++;
								itemcknumed++;
							}
						})
						if(itemcknum==itemcknumed){
							 _this.$set(item, "select", true);	
						}else{
							 _this.$set(item, "select", false);
						}
					})  
					if(cknum==cknumed){
						all=true;		   
					}else{
						 all=false;
					}
					console.log(all)
					return all
				}
			},
			
			//打开编辑购物车
			ManageCart(){
				this.isEdit=!this.isEdit;
				let _this=this;
				if(this.isEdit==false){
					this.isEdittxt="管理";
					_this.cartlist.forEach(function(item) {
						item.ProData.forEach(function(item2){
							if(item2.Isinvalid!=0){
								_this.$set(item2, "disBuy", true);
								_this.$set(item2, "select", false);
							}
						})
					}); 
				}else{
					this.isEdittxt="完成";
					_this.cartlist.forEach(function(item) {
						 item.ProData.forEach(function(item2){
							_this.$set(item2, "disBuy", false);
						 })
					}); 
				}
				this.AllPrice();//合计
			},
			//点击结算
			settle(){
				let _this = this;
				let dataArr=[];
				_this.cartlist.forEach(function(item){
					item.ProData.forEach(function(item2){
						if(item2.select==true){
							let id = item2.Id;
							dataArr.push(id);
						}
					})
				});
				if(dataArr.length){
					uni.navigateTo({ 
						url: "/pages/submitOrder/submitOrder?cartItem=" + dataArr.join(",") +'&orderSType=1'
					});
				}else{
					uni.showToast({
						title: "请选择你要购买的产品！",
						icon: "none",
						duration: 1500
					});
				}
			},
			goIndex(){
				uni.switchTab({
					url: '/pages/tabBar/index/index'
				})
			},
			showSku(proId,skuCartId,skunumber,isflash){
				this.isLimint=isflash;
				this.isProData=false
				this.showPopupSku=true;
				this.skuCartId=skuCartId;
				this.skunumber=skunumber;
				this.getProductInfo(proId);
			},
			selectSku(msg){
				//console.log(msg)
				this.SpecText=msg;
				let dataArr=[],json = {};
				json["CartId"] = this.skuCartId;
				json["Total"] = this.skunumber;
				json["SpecText"] = this.SpecText;
				dataArr.push(json);
				this.eaditCart(dataArr);
			},
			//商品详情信息
			async getProductInfo(proId){
				let result = await post("Goods/Goodsxq", {
					Id: proId,
					userId:this.userId,
					token:this.token
				});
				if(result.code==0){
					this.proInfo=result.data;
					this.isProData = true;
				}
			},
			//统一的关闭popup方法
			hidePopup: function() {
				this.showPopupSku=false;
				this.showPopupCoupon=false;
			},
			//弹出优惠券
			showCoupon:function(Shopid){
				this.hidePopup();
				this.CouponCenter(Shopid);
			},
			/*获取优惠券列表*/
			async CouponCenter(Shopid){
				let result = await post("Coupon/CouponCenter", {
					"UserId": this.userId,
					"Token": this.token,
					"page": 1,
					"pageSize": 100,
					"ShopId": Shopid//
				});
				if (result.code === 0){
					if(result.data.length>0){
						this.showPopupCoupon=true;
						this.CouponList=result.data;
						this.CouponList.forEach(function(item){
							if(item.DiscountType==2){
								item.Denomination=item.Denomination*10;
							}
							item.StartTime=item.StartTime.split(" ")[0].replace(/\//g,".");
							item.EndTime=item.EndTime.split(" ")[0].replace(/\//g,".");
						})
					}else{
						uni.showToast({
							title: "该店铺暂无优惠券！",
							icon: "none",
							duration: 2000
						});
					}
				}else if (result.code === 2) {
					let _this =this;
					uni.showModal({
						content: "您还没有登录，是否重新登录？",
						success(res) {
							if (res.confirm) {
								uni.navigateTo({
								  url: "/pages/login/login?askUrl="+_this.curPage
								});
							} else if (res.cancel) {
							}
						}
					});
				} else {
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 2000
					});
				}

			},
			//领取优惠券
			async ReceiveCoupon(utype,Couponid,index){
				let result =await post("Coupon/ReceiveCoupon", {
					"UserId": this.userId,
					"Token": this.token,
					"UseType": utype,
					"CouponId": Couponid
				});
				if (result.code === 0){
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 2000
					});
					this.CouponList[index].Limit--;
					if(this.CouponList[index].Limit==0){
						this.CouponList[index].IsMyAlready=false;
					}
				}else if(result.code === 2){
					let _this =this;
					uni.showModal({
						content: "您还没有登录，是否重新登录？",
						success(res) {
							if (res.confirm) {
								uni.navigateTo({
								  url: "/pages/login/login?askUrl="+_this.curPage
								});
							} else if (res.cancel) {
							}
						}
					});
				}else{
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 2000
					});
				}
			},
			//获取会员信息
			async getMemberInfo() {
				let result = await post("User/GetMemberInfo", {
					"UserId": this.userId,
					"Token": this.token
				})
				if (result.code === 0) {
					this.memberInfo = result.data;
					this.isPLUS=this.memberInfo.IsPlus;
				} else if (result.code === 2) {
					this.userId=uni.setStorageSync("token", "");
					this.token=uni.setStorageSync("userId", "");
				}
			}
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			let _this=this;
				_this.cartlist = [];
			setTimeout(function () {
				_this.getCartList();
				uni.stopPullDownRefresh();  //停止下拉刷新动画
			}, 1000);
		}
	}
</script>

<style>
	.content {
		height: 100%;
	}
	.content::before{
		display: block;
	    content: '';
	    background: #ff3333;
	    width: 150vw;
	    height: 680upx;
	    position: absolute;
	    top: 50px;
	    left: 50%;
	    -webkit-transform: translate(-50%,-50%);
	    transform: translate(-50%,-50%);
	    border-radius: 50%;
	}
	.hasContentPage {
		/* height: 100%; */
		position: relative;
		overflow-y: auto;
	}
/* #ifdef MP-WEIXIN */
.hasContentPage {
		height: calc(100% - 90upx);
		overflow-y: auto;
	}
/* #endif */
	.cartGroupList .item .outside {
		padding: 20upx;
	}

	.btn_receive {
		color: #FF3333;
		font-size: 26upx;
	}
	.levelPanel{border-bottom: 1px dashed #f5f5f5;}
	.levelPanel .item .outside .txtBox .skuBox .type {
		display: inline-block;
		background-color: #f6f6f6;
		padding: 0 10upx;
		position: relative;
	}

	.cartGroupList {
		padding: 0 20upx 120upx;

	}

	.cartGroupList>.item {
		overflow: hidden;
	}
	
	.btnPay:after{
		display: none;
	}
	.right .deletbox{
  height: 74upx;
		
	}
	.right .deletbox .delet{
		padding: 0 20upx;
		height: 60upx;
		line-height: 60upx;
		border-radius: 30upx;
		border: #999 1upx solid;
		color: #999;
		font-size: 27upx;
		display: inline-block;
		margin-top: 8upx;
		margin-left: 30upx;
	}
	.right .deletbox .delet2{
		padding: 0 20upx;
		height: 60upx;
		line-height: 60upx;
		border-radius: 30upx;
		border: #FF3333 1upx solid;
		color: #FF3333;
		font-size: 27upx;
		display: inline-block;
		margin-top: 8upx;
	}
	.carthead{
		background-color: #FF3333;
		width: 750upx;
		padding: 0 20upx;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 88upx;
		z-index: 8;
		position: fixed;
		top: 0;
		box-sizing: border-box;
	}
	.wxcarthead{
		background-color: #FF3333;
		width: 100%;
		padding: 0 20upx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		height: 88upx;
		z-index: 8;
		position: fixed;
		top: 0;
		/* left: 20upx; */
	}
	.carthead text:nth-child(1){
		font-size: 32upx;
		font-weight: bold;
		color: #fff;
	}
	.carthead text:nth-child(2){
		position: absolute;
		right: 20upx;
		color: #fff;
	}
	.nodatalocal{
		position: fixed;
		top: 0;
	}
	.pictrue .mark{ position: absolute; left: 0; top: 10upx; z-index: 3; background: #ff6666; color: #fff; font-size: 24upx; padding: 2upx 16upx; border-radius: 0 100px 100px 0;}
	/* 弹出优惠券 */
	.uni-popup .bottom-title {
		line-height: 60upx;
		font-size: 32upx;
	}
	.uni-popup .bottom-btn {
		height: 80upx;
		line-height: 80upx;
		background: #ff9800;
		font-size: 32upx;
		color: #fff;
		border-radius: 40upx;
	}
	.uni-modal-Coupon{ background: #fff; padding: 20upx; border-radius: 6px 6px 0 0;}
	.uni-modal-Coupon .bottom-content{ margin-bottom: 20upx; max-height: 800upx; overflow-y: auto;}
	.saleScore{ text-align: left; margin-bottom: 20upx;}
	.saleScore .txtbox .ico{ font-size: 24upx; color: #FF5722; background: #facec0; border-radius: 4px; margin-right: 6upx; padding: 2upx 8upx;}
	
	.uni-modal-Coupon .lab{ text-align: left; color: #999; margin-bottom: 16upx;}
	.coupon1{
		margin-bottom: 20upx;
		background-image: url("/static/coupon2.png");
		background-repeat:no-repeat;
	  background-size:100% ;
	}
	.topbox{
		display: flex;
		position: relative;
		width: 100%;
		height: 203upx;
	}
	.coupontxt{
		height: 58upx;
		padding-top: 20upx;
		padding-left: 16upx;
		line-height: 58upx;
		font-size: 23upx;
		color: #999;
	}
	.couponbtn{
		height: 200upx;
		width: 220upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.couponbtn .btn{
		width: 120upx;
		height: 64upx;
		border-radius: 8upx;
		background-color: #ff6666;
		color: #fff;
		font-size: 24upx;
		text-align: center;
		line-height: 64upx;
	}
	.couponleft{
		width: 210upx;
		align-items: center;
		color: #fff;
	}
	.couponleft .price{
		margin: 0 auto;
		margin-top: 50upx;
		text-align: center;
	}
	.couponleft .price text{
		font-size: 30upx;
	}
	.couponleft .price .num{
		font-size: 54upx;
		line-height: 60upx;
	}
	.lefttxt{
		width: 100%;
		text-align: center;
		font-size: 23upx;
	}
	.couponright{
		width: 280upx;
		margin-left: 18upx;
		color: #333;
		text-align: left;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.couponbtn .rightimg{
		width: 120upx;
		height: 120upx;
	}
	.couponbtn .rightimg image{
		width: 100%;
		height: 100%;
	}
	.couponname{
		line-height: 44upx;
		margin-bottom: 10upx;
		word-break: break-all;
	    display: -webkit-box;
	    overflow: hidden;
	    -o-text-overflow: ellipsis;
	    text-overflow: ellipsis;
	    -webkit-box-orient: vertical;
	    -webkit-line-clamp: 2;
	}
	.coupontime{
		font-size: 19upx;
		color: #999;
	}
	.btnBox .btn{
		color: #FF3333;
		border-color: #FF3333 !important;
	}
	.cartFoot .flexAlignCneter{
		box-sizing: border-box;
	}
	/* #ifdef APP-PLUS */
	.cartFoot .inner{
		bottom:0
	}
	/* #endif */
</style>
