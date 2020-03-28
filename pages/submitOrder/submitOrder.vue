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
					<view class="icon icon_addr"><image src="../../static/icons/no_addr2.png" mode="widthFix"></image></view>
					<view class="addtxt center">暂无收货地址，点击添加</view>
				</view>
			</view>
			
			<!-- 购物车过来的产品列表 -->
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
					<view class="orderinfo" v-if="item.UseCouponList.length" @click="openCoupon">
						<view class="orderleft">优惠券</view>
						<view class="orderright">
							<view class="infotxt">不使用</view>
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
					<view class="orderinfo" v-if="item.IsInvoice==1">
						<view class="orderleft">开具发票</view>
						<view class="orderright">
							<view class="infotxt">可开票</view>
							<view class="uni-icon uni-icon-arrowright"></view>
						</view>
					</view>
					<view class="allprice">
						<text>共计{{item.AllNumber}}件商品</text><text>小计：</text><text>￥{{item.AllPrice}}</text>
					</view>
				</view>			
			</view>
			<!-- 立即购买 -->
			<view class="procontent b_radius uni-mb10" style="display: none;">
				<view class="shopbox">
					<view class="iconfont icon-dianpu"></view>
					<text class="shopName">炫宝迪旗舰店</text>
					<view class="uni-icon uni-icon-arrowright"></view>
				</view>
				<view class="outside">
					<view class="pictrueAll">
						<view class="pictrue">
							<image src="../../static/of/2.png" mode="" ></image>
						</view>
					</view>
					<view class="txtBox">
						<view class="title">紫元大厦</view>
						<view class="protype">007oo</view>
						<view class="pronumber">
							<text class="number">x1</text><text class="price">￥13万</text>
						</view>
					</view>
				</view>
				<view class="orderbox">
					<view class="orderinfo">
						<view class="orderleft">运费</view>
						<view class="orderright">
							<block>免邮</block>
						</view>
					</view>
					<view class="orderinfo">
						<view class="orderleft">小计</view>
						<view class="orderright">￥256</view>
					</view>
					<view class="orderinfo">
						<view class="orderleft">券后价</view>
						<view class="orderright">￥255</view>
					</view>
					<view class="orderinfo" style="border: none;">
						<view class="orderleft">订单备注</view>
						<input class="inputtxt" placeholder="填写内容已和商家家协商确认" type="text"/>
					</view>
				</view>			
			</view>
			
			<view class="procontent b_radius" style="display: none;">
				<view class="orderbox">
					<view class="orderinfo">
						<view class="orderleft">开具发票</view>
						<view class="orderright">
							<view class="infotxt">可开票</view>
							<view class="uni-icon uni-icon-arrowright"></view>
						</view>
					</view>
					<view class="orderinfo" @click="openCoupon">
						<view class="orderleft">优惠券</view>
						<view class="orderright">
							<view class="infotxt">不使用</view>
							<view class="uni-icon uni-icon-arrowright"></view>
						</view>
					</view>
					<view class="allprice">
						<text>共计4件商品</text><text>合计：</text><text>￥2566</text>
					</view>
				</view>
			</view>
			
		</view>
		<view style="width: 100%;height: 160upx;"></view>
		<view class="footer flex flex-between">
			<view class="footleft"><text class="color_gray">(共{{info.countItem}}件)</text>总计：<text class="num"><text class="fz12">￥</text>{{info.PayAmount}}</text></view>
			<view class="footright" @click="confirm">提交订单</view>
		</view>
		<!-- 优惠券弹窗 -->
		<uni-popup mode="fixed" :show="showCoupon" :h5Top="true" position="bottom" @hidePopup="closeCoupon">
			<view class="couponbox" style="z-index: 10000;">
				<view class="titlebox">
					<view  @click="closeCoupon" class="uni-icon uni-icon-arrowleft" style="font-size: 50upx;color:#333;"></view>
					<text class="title">选择优惠券</text>
				</view>
				<scroll-view scroll-y style="width: 100%;height: 560upx;">
					<view class="coupon">
						<view class="couponitem">
							<view class="couponname">不使用优惠券</view>
							<view style="margin: 0;" class="IconsCK IconsCK-radio checked"></view>
						</view>
						<view class="couponitem" v-for="(item,index) in 2" :key="index">
							<view class="couponname">满减券：省20元
							</view>
							<view style="margin: 0;" class="IconsCK IconsCK-radio"></view>
						</view>
					</view>
				</scroll-view>
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
				info:{},//产品信息
				addrInfo:{},//地址信息
				isAddress:false,
				addressId:0,//地址id
				couponId:0,//平台优惠券id
				isPayWallet:0,//是否使用余额支付
				isPayScore:0,//是否使用积分抵扣
				InvoiceIdArr:[],
				remarkTxtArr:[]
			};
		},
		onLoad: function() {
			
		},
		onShow() {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.orderSType= this.$root.$mp.query.orderSType;
			this.CartIds=this.$root.$mp.query.cartItem;
			if(uni.getStorageSync("addressinfo")){
			  this.addrInfo=uni.getStorageSync("addressinfo");
			  uni.setStorageSync("addressinfo",null)
			  this.isAddress=true;
			  this.addressId=this.addrInfo.Id;
			}else{
			  this.getAdress();
			}
			if(this.orderSType==1){
				this.GoodsCartList();
			}else{
				
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
			},
			openCoupon(){
				this.showCoupon=true;
				
			},
			//购物车下单获取
			async GoodsCartList(){
			  let result=await post("Cart/ShopsCartList",{
				UserId: this.userId,
				Token: this.token,
				CartIdList:this.CartIds,
				AddressId:this.addressId,
				CouponId:this.couponId
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
			//提交订单
			confirm(){
				if(this.addrInfo){
					if(this.orderSType==0){//立即购买
					  //this.BuyNowSubmitOrder()
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
