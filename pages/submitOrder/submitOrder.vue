<template>
	<view class="wrap">
		<view class="uni-pd10 p_re">
			<view class="addrbox uni-bg-white b_radius uni-mb10">
				<view class="address flex flex-between" v-if="isAddress" @click="golink('/pages/member/address/address?pagetype=confirm&checkId='+addrInfo.Id)">
					<view class="local">
						<view class="iconfont icon-dizhi"></view>
					</view>
					<view class="addrdetail">
						<view class="receiver">
							<text>{{addrInfo.Consignee}}</text><text>{{addrInfo.Mobile}}</text>
						</view>
						<view class="addr">
							{{addrInfo.Address}}
						</view>
						<view class="addresstips">(温馨提示：请核对收货地址是否正确)</view>
					</view>
					<view class="next">
						<view class="uni-icon uni-icon-arrowright"></view>
					</view>
				</view>
				<view class="noaddr" v-else @click="golink('/pages/member/address/address?pagetype=confirm')">
					<view class="icon icon_addr"><image src="http://ddyp.wtvxin.com/static/icons/no_addr2.png" mode="widthFix"></image></view>
					<view class="addtxt center">暂无收货地址，点击添加</view>
				</view>
			</view>
			
			<!-- 购物车过来的产品列表 -->
			<block v-if="orderSType==1">
				<view class="procontent b_radius uni-mb10" v-for="(item,index) in info.CartList" :key="index">
					<view class="shopbox">
						<view class="iconfont icon-dianpu"></view>
						<text class="shopName">{{item.ShopName}}</text>
						<view class="uni-icon uni-icon-arrowright"></view>
					</view>
					<view class="outside" v-for="(item2,index2) in item.ProData" :key="index2">
						<view class="pictrueAll">
							<view class="pictrue">
								<image :src="item2.PicNo" mode="aspectFill" ></image>
							</view>
						</view>
						<view class="txtBox">
							<view class="title">{{item2.Name}}</view>
							<view class="protype" v-if="item2.SpecText">{{item2.SpecText}}</view>
							<view class="pronumber">
								<view class="number">x{{item2.Number}}</view><view class="price">￥{{item2.Price}}</view>
							</view>
						</view>
					</view>
					<view class="orderbox">
						<view class="orderinfo">
							<view class="orderleft">运费</view>
							<view class="orderright">
								{{item.Freight>0?'￥'+item.Freight:'免邮'}}
							</view>
						</view>
						<view class="orderinfo">
							<view class="orderleft">合计</view>
							<view class="orderright">￥{{item.TotalPrice}}</view>
						</view>
						<view class="orderinfo" v-if="item.UseCouponList.length" @click="openCoupon(item.UseCouponList,item.CouponId,index)">
							<view class="orderleft">优惠券</view>
							<view class="orderright">
								<block v-for="(e,i) in item.UseCouponList" :key="i">
									<view class="infotxt">{{e.Id==item.CouponId?e.Title:'不使用'}}</view>
								</block>
								<view class="uni-icon uni-icon-arrowright"></view>
							</view>
						</view>
						<view class="orderinfo" v-if="item.yhPrice>0">
							<view class="orderleft">店铺优惠</view>
							<view class="orderright">￥{{item.yhPrice}}</view>
						</view>
						<view class="orderinfo" v-if="item.zkPrice>0">
							<view class="orderleft">折扣金额</view>
							<view class="orderright">￥{{item.zkPrice}}</view>
						</view>
						<view class="orderinfo" style="border: none;">
							<view class="orderleft">订单备注</view>
							<input class="inputtxt" placeholder="填写内容已和商家家协商确认" type="text" v-model="remarkTxtArr[index]"/>
						</view>
						<view class="orderinfo" v-if="item.IsInvoice==1" @click="ChooseInvoice(index)">
							<view class="orderleft">开具发票</view>
							<view class="orderright">
								<view class="infotxt flex flex-end">{{Invoicetxt[index]||'可开票'}}
									<span v-if="InvoiceIdArr[index]>0" @click.stop="delInvoicet(index)" class="delinvoice">×</span>
								</view>
								<view class="uni-icon uni-icon-arrowright"></view>
							</view>
						</view>
						<view class="allprice">
							<text>共计{{item.AllNumber}}件商品</text><text>小计：</text><text>￥{{item.AllPrice}}</text>
						</view>
					</view>			
				</view>
			</block>
			<!-- 立即购买 -->
			<view v-else class="procontent b_radius uni-mb10">
				<view class="shopbox">
					<view class="iconfont icon-dianpu"></view>
					<text class="shopName">{{info.ShopName}}</text>
					<view class="uni-icon uni-icon-arrowright"></view>
				</view>
				<view class="outside" v-for="(item2,index2) in info.ProData" :key="index2">
					<view class="pictrueAll">
						<view class="pictrue">
							<image :src="item2.PicNo" mode="aspectFill" ></image>
						</view>
					</view>
					<view class="txtBox">
						<view class="title">{{item2.Name}}</view>
						<view class="protype" v-if="item2.SpecText">{{item2.SpecText}}</view>
						<view class="pronumber">
							<view class="number">x{{item2.Number}}</view><view class="price">￥{{item2.Price}}</view>
						</view>
					</view>
				</view>
				<view class="orderbox">
					<view class="orderinfo">
						<view class="orderleft">运费</view>
						<view class="orderright">
							{{info.Freight>0?'￥'+info.Freight:'免邮'}}
						</view>
					</view>
					<view class="orderinfo">
						<view class="orderleft">合计</view>
						<view class="orderright">￥{{info.TotalPrice}}</view>
					</view>
					<view class="orderinfo" v-if="hasCoupon" @click="openCoupon(info.UseCouponList,info.ShopCouponId,0)">
						<view class="orderleft">优惠券</view>
						<view class="orderright">
							<block v-for="(e,i) in info.UseCouponList" :key="i">
								<view class="infotxt">{{e.Id==info.ShopCouponId?e.Title:'不使用'}}</view>
							</block>
							<view class="uni-icon uni-icon-arrowright"></view>
						</view>
					</view>
					<view class="orderinfo" v-if="info.yhPrice>0">
						<view class="orderleft">店铺优惠</view>
						<view class="orderright">￥{{info.yhPrice}}</view>
					</view>
					<view class="orderinfo" v-if="info.zkPrice>0">
						<view class="orderleft">折扣金额</view>
						<view class="orderright">￥{{info.zkPrice}}</view>
					</view>
					<view class="orderinfo" style="border: none;">
						<view class="orderleft">订单备注</view>
						<input class="inputtxt" placeholder="填写内容已和商家家协商确认" type="text" v-model="remarkTxtArr[0]"/>
					</view>
					<view class="orderinfo" v-if="info.IsInvoice==1" @click="ChooseInvoice(0)">
						<view class="orderleft">开具发票</view>
						<view class="orderright">
							<view class="infotxt flex flex-end">{{Invoicetxt[0]||'可开票'}}
								<span v-if="InvoiceIdArr[0]>0" @click.stop="delInvoicet(0)" class="delinvoice">×</span>
							</view>
							<view class="uni-icon uni-icon-arrowright"></view>
						</view>
					</view>
					<view class="allprice">
						<text>共计{{info.AllNumber}}件商品</text><text>小计：</text><text>￥{{info.AllPrice}}</text>
					</view>
				</view>				
			</view>
			
		</view>
		<view style="width: 100%;height: 160upx;"></view>
		<view class="footer flex flex-between">
			<view class="footleft" v-if="orderSType==1"><text class="color_gray fz12">(共{{info.countItem}}件)</text>总计：<text class="num"><text class="fz12">￥</text>{{info.PayAmount}}</text></view>
			<view class="footleft" v-if="orderSType==0"><text class="color_gray fz12">(共{{info.AllNumber}}件)</text>总计：<text class="num"><text class="fz12">￥</text>{{info.AllPrice}}</text></view>
			<view class="footright" @click="confirm">提交订单</view>
		</view>
		<!-- 优惠券弹窗 -->
		<uni-popup mode="fixed" :show="showCoupon" :h5Top="true" position="bottom" @hidePopup="closeCoupon">
			<view class="couponbox" style="z-index: 10000;">
				<view class="bottom-title">
					选择优惠券
				</view>
				<view class="uni-close-btn" @click="closeCoupon">
					<view class="iconfont icon-close"></view>
				</view>
				<scroll-view scroll-y style="width: 100%;height: 560upx;">
					<view class="coupon">
						<view class="couponitem" @click="selectCoupon(-1)">
							<view class="couponname">不使用</view>
							<view style="margin: 0;" :class="['IconsCK IconsCK-radio',popCouponId<0?'checked':'']"></view>
						</view>
						<view class="couponitem" v-for="(item,index) in popcouponData" :key="index" @click="selectCoupon(item.Id)">
							<view class="couponname">{{item.Title}}
							</view>
							<view style="margin: 0;" :class="['IconsCK IconsCK-radio',popCouponId==item.Id?'checked':'']"></view>
						</view>
					</view>
				</scroll-view>
				<view class="bottom-btn" @click="selectCouponok">完成</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {post,get} from '@/common/util.js';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import "@/common/dd_style.css";
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				userId: "",
				token: "",
				orderSType:1,//0立即购买，1购物车
				showCoupon:false,//优惠券弹框
				CartIds: "", //购物车提交的item的id
				ProId:"",//产品Id(立即购买)
				Total:"",//购买总数量(立即购买)
				SpecText:"",//产品规格文本(立即购买)
				hasCoupon:false,//是否有店铺券（立即购买）
				info:{},//产品信息
				addrInfo:{},//地址信息
				isAddress:false,
				addressId:0,//地址id
				couponId:0,//平台优惠券id
				isPayWallet:0,//是否使用余额支付
				isPayScore:0,//是否使用积分抵扣
				shopIndex:0,
				InvoiceIdArr:[],
				Invoicetxt:[],
				remarkTxtArr:[],
				popcouponData:[],//弹出优惠券数据
				popCouponId:-1,//弹出选中优惠券id
				popCouponIdArr:[],
				popshopCouponIndex:0,
			};
		},
		onLoad: function() {
			
		},
		onShow() {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.orderSType= this.$root.$mp.query.orderSType;
			this.CartIds=this.$root.$mp.query.cartItem;
			this.ProId=this.$root.$mp.query.id;
			this.Total=this.$root.$mp.query.number;
			this.SpecText=this.$root.$mp.query.SpecText;
			if(uni.getStorageSync("addressinfo")){
			  this.addrInfo=uni.getStorageSync("addressinfo");
			  uni.setStorageSync("addressinfo",null)
			  this.isAddress=true;
			  this.addressId=this.addrInfo.Id;
			}else{
			  this.getAdress();
			}
			if(uni.getStorageSync("invoiceinfo")){
			  this.InvoiceInfo=uni.getStorageSync("invoiceinfo");
			  this.shopIndex= this.InvoiceInfo.shopIndex;
			  this.InvoiceIdArr[this.shopIndex]=this.InvoiceInfo.Id;//发票的id
			  this.Invoicetxt[this.shopIndex]=this.InvoiceInfo.InvoiceTitleStr+"："+this.InvoiceInfo.HeaderName;
			}else{
			  this.InvoiceIdArr[this.shopIndex]=0;//发票的id
			  this.Invoicetxt[this.shopIndex]="可开票";
			}
			if(this.orderSType==1){
				this.GoodsCartList();
			}else{
				this.BuyNowGoods();
			}
		},
		methods: {
			golink(url){
				uni.navigateTo({
					url:url
				})
			},
			//获取默认地址
			async getAdress(){
			  let res=await post("Address/DefaultAddress",{
				UserId: this.userId,
				Token: this.token,
				Id:0
			  })
			  if(res.code==0){
				if(res.data){
				  this.addrInfo=res.data;
				  this.addressId=this.addrInfo.Id;
				  this.isAddress=true;
				}else{
				  this.isAddress=false;
				} 
			  }
			},
			
			closeCoupon(){
				this.showCoupon=false;
				this.popcouponData=[];
			},
			openCoupon(data,id,index){
				this.showCoupon=true;
				this.popcouponData=data;
				this.popCouponId=id;
				this.popshopCouponIndex=index;
			},
			//选择优惠券
			selectCoupon(id){
				this.popCouponId=id;
			},
			selectCouponok(){
				this.popCouponIdArr[this.popshopCouponIndex]=this.popCouponId;
				if(this.orderSType==1){
					let DataArr = [];
					for (let i = 0; i < this.info.CartList.length; i++) {
						let json = {};
						json["ShopId"] = this.info.CartList[i].ShopId;
						json["CouponId"]=this.popCouponIdArr[i];
						DataArr.push(json);
					}
					this.GoodsCartList(DataArr);
				}else{
					this.BuyNowGoods();
				}
				this.closeCoupon();
			},
			//选择发票
			ChooseInvoice(index){
				uni.navigateTo({
					url:'/pages/member/invoiceList/invoiceList?pagetype=confirm&shopIndex='+index
				})
			},
			delInvoicet(i){
				let _this=this;
			  _this.$set(_this.InvoiceIdArr,i,0);
			  _this.$set(_this.Invoicetxt,i,"可开票");
			  uni.setStorageSync("invoiceinfo","");
			},
			//购物车下单获取
			async GoodsCartList(DataArr){
			  let result=await post("Cart/ShopsCartList",{
				UserId: this.userId,
				Token: this.token,
				CartIdList:this.CartIds,
				AddressId:this.addressId,
				CouponId:this.couponId,
				ShopData:DataArr
			  })
			  if(result.code==0){
				this.info=result.data;
				let countItem=0;
				this.info.CartData.forEach(function(item){
					countItem+=item.Total
				})
				this.$set(this.info,"countItem",countItem)
			  }else{
				uni.showToast({
				  title: result.msg,
				  icon: "none",
				  duration: 1000
				});
			  }
			},
			//购物车提交订单
			async BuyCart(DataArr) {
				let result = await post("Order/ShopsBuyCart", {
					UserId: this.userId,
					Token: this.token,
					CartIds: this.CartIds,
					AddressId: this.addressId,
					IsPayWallet:this.isPayWallet,
					IsPayScore:this.isPayScore,
					CouponId:this.couponId,
					ShopData:DataArr
				})
				if (result.code == 0) {
					uni.showToast({
					  title: '订单提交成功',
					  success(){
						setTimeout(res=>{
							uni.redirectTo({
								url: '/pages/pay/pay?orderNo='+result.data+'&source=1'
							})
						},1500)
					  }
					})
				}else{
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 1500
					});
				}
			},
			//立即购买订单渲染
			async BuyNowGoods(){
				let dataArr=[{
					ProId:this.ProId,//产品Id
					Total:this.Total,//购买总数量
					SpecText:this.SpecText//产品规格文本
				}];
			  let result=await post("Order/BuyNowGoods",{
				UserId: this.userId,
				Token: this.token,
				AddressId:this.addressId,
				CouponId:this.couponId,
				ShopCouponId:this.popCouponIdArr[0],
				data:dataArr,
			  })
			  if(result.code==0){
				  let _this=this;
				_this.info=result.data;
				if(result.data.UseCouponList.length){
					this.hasCoupon=true;
				}else{
					this.hasCoupon=false;
				}
				_this.$set(_this.info,"countItem",_this.infoAllNumber)
			  }else{
				uni.showToast({
				  title: result.msg,
				  icon: "none",
				  duration: 1000
				});
			  }
			},
			//立即购买提交
			async BuyNowSubmitOrder(){
			  let result=await post("Order/BuyNowSubmitOrder",{
				UserId: this.userId,
				Token: this.token,
				ProId:this.ProId,//产品Id
				Number:this.Total,
				SpecText:this.SpecText,
				AddressId:this.addressId,
				CouponId:this.couponId,
				ShopCouponId:this.popCouponIdArr[0],
				InvoiceId:this.InvoiceIdArr[0],
				Remark:this.remarkTxtArr[0]
			  })
			  if(result.code==0){
				uni.showToast({
				  title: '订单提交成功',
				  success(){
					setTimeout(res=>{
						uni.redirectTo({
							url: '/pages/pay/pay?orderNo='+result.data+'&source=1'
						})
					},1500)
				  }
				})
			  }else{
				uni.showToast({
				  title: result.msg,
				  icon: "none",
				  duration: 1000
				});
			  }
			},
			//提交订单
			confirm(){
				if(this.addrInfo){
					if(this.orderSType==0){//立即购买
					  this.BuyNowSubmitOrder();
					}else{
					  let DataArr = [];
					  for (let i = 0; i < this.info.CartList.length; i++) {
					  	let json = {};
					  	json["ShopId"] = this.info.CartList[i].ShopId;
						json["CouponId"]=this.info.CartList[i].CouponId;
						json["InvoiceId"]= this.InvoiceIdArr[i];
					  	json["Remark"] = this.remarkTxtArr[i];
					  	DataArr.push(json);
					  }
					  this.BuyCart(DataArr);
					}
				}else{
					uni.showToast({
					  title:"请选择收货地址！",
					  icon:"none"
					})
				}
			},
		}
	}
</script>

<style scoped>
	@import "./style";
	
</style>
