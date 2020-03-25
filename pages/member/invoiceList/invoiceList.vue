<template>
	<view class="content">
		<view class="defaultPage invoiceList__defaultPage">
			<view class="addressList invoiceList" v-if="list.length>0">
				<view class="item" v-for="(item,index) in list" :key="index">
					<view class="item__bd"  @click="selectInv(item.Id)">
						<view class="remarks">
							<text class="name">抬头名称：{{item.HeaderName}}</text>
						</view>
						<view class="type">类型：{{item.InvoiceTitlestr}}</view>
						<view class="type" v-if="item.InvoiceTitle===1">税号：{{item.TaxNumber}}</view>
					</view>
					<view class="item__ft flex">
						<view class="flexItem checkedLabel flex flexAlignCneter" @click="setDefaultInvoice(index,item.Id)">
							<view class="IconsCK IconsCK-radio" :class="{'checked':item.IsDefault===1}"></view><text v-if="item.IsDefault===1" style="color:#89674c;">已设为默认</text><text
							 v-else>设为默认</text>
						</view>
						<view class="flexItem flex1 text_r" v-if="pagetype==0">
							<view class="iconText inline-block"  @click="gotoAddInvoice(item.Id)">
								<view class="uni-icon uni-icon-compose"></view>编辑
							</view>
							<view class="iconText inline-block" @click="deleteBtn(index,item.Id)">
								<view class="iconfont icon-del"></view>删除
							</view>
						</view>
					</view>
				</view>
				<view class="item" v-if="pagetype==1">
					<view class="uni-list-cell-navigate uni-navigate-right" @click="selectInv('')">
						<view class="list-cell-l">本次不开具发票</view>
						<view class="list-cell-r" style="color: #999; padding-right: 30upx;">继续下单</view>	
					</view>
				</view>
			</view>
			<!-- 没有数据的时候 -->
			<view class="noConPage table bg_fff" v-else>
				<view class="table-cell">
					<view class="noDataImg">
						<image src="http://www.sc-mall.net/static/noCart.png" mode="widthFix"></image>
					</view>
					<view class="tips">抱歉，您还没有添加发票哦~</view>
				</view>
			</view>
			<!-- 没有数据的时候 end -->
			<view class="ftBtn" style="height: 92upx;">
				<button type="primary" class="fixed bt0 btn-active radius0" @click="gotoAddInvoice()">
					<view class="uni-icon uni-icon-plus"></view>
					<text>新增发票信息</text>
				</button>
			</view>
		</view>


	</view>
</template>

<script>
	import {host,post,get,getCurrentPageUrlWithArgs,toLogin} from '@/common/util.js';
	import "@/common/dd_style.css";
	export default {
		onLoad:function(option) {
			if(option.pagetype){
				this.pagetype=option.pagetype;
			}
			this.orderSType = option.orderSType; //0：直接下单的，1：购物车过来的
			this.ShareMemberId=option.ShareMemberId;
			if (this.orderSType == 0) {
				this.proId = option.proId;
				this.price = option.price;
				this.number = Number(option.number);
				this.SpecText = option.SpecText;
				if(option.mixInfo){
					this.hasMixPro=true;
					this.mixInfo=option.mixInfo;
				}
			} else if (this.orderSType == 1) {
				this.prolist = JSON.parse(option.prolist); //购物车过来的商品列表
				this.CartIds = option.cartItem;
			}else if (this.orderSType == 2) {
				this.groupId = option.groupId;
				this.groupRecordId = option.groupRecordId;
				this.price = option.price;
				this.number = Number(option.number);
				this.SpecText = option.SpecText;
			}else if(this.orderSType == 3){//众筹
				this.proId = option.proId;
				this.price = option.price;
				this.number = Number(option.number);
				this.SpecText = option.SpecText;
				this.Supppottype=option.Supppottype;
			}
			if(option.addrInfo){
				this.addrInfo=JSON.parse(option.addrInfo);
			}
		},
		onShow() {
			this.list = [];
			this.curPage = getCurrentPageUrlWithArgs().replace(/\?/g, '%3F').replace(/\=/g, '%3D').replace(/\&/g, '%26');
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.getInvoice();
		},
		data() {
			return {
				proId: "", //立即购买商品Id
				SpecText: "", //商品sku
				price: 0, //选择sku的价格
				number: 1, //数量
				CartIds: "", //购物车提交的item的id
				prolist: [], //购物车过来的商品列表
				Supppottype:"",//众筹方式
				orderSType: "", //0：直接下单的，1：购物车过来的 2拼团，3众筹
				InvoiceId:0,
				addrInfo:{},
				groupId:"",//拼团产品id
				groupRecordId:0,//拼团记录id
				mixInfo:"",//组合购商品信息
				hasMixPro:false,
				curPage: "",
				userId: "",
				token: "",
				list: [],
				pagetype:0,
				ShareMemberId:""
			};
		},
		methods: {
			selectInv(id){
				if(this.pagetype==1){//从订单页过来的
					if(this.orderSType==0){
						let addrInfo=this.addrInfo;
						if(this.hasMixPro){
							uni.redirectTo({
								url:"/pages/submitOrder/submitOrder?addrInfo="+JSON.stringify(addrInfo)+'&SpecText='+this.SpecText+'&mixInfo='+this.mixInfo+'&InvoiceId='+id+'&number='+this.number+'&proId='+this.proId+'&price='+this.price+"&orderSType="+this.orderSType+'&ShareMemberId='+this.ShareMemberId,
							})
						}else{
							uni.redirectTo({
								url:"/pages/submitOrder/submitOrder?addrInfo="+JSON.stringify(addrInfo)+'&SpecText='+this.SpecText+'&InvoiceId='+id+'&number='+this.number+'&proId='+this.proId+'&price='+this.price+"&orderSType="+this.orderSType+'&ShareMemberId='+this.ShareMemberId,
							})
						}
					}else if(this.orderSType==1){
						let prolist=this.prolist;
						let addrInfo=this.addrInfo;
						uni.redirectTo({
							url:"/pages/submitOrder/submitOrder?addrInfo="+JSON.stringify(addrInfo)+'&cartItem='+this.CartIds+'&InvoiceId='+id+'&prolist='+JSON.stringify(prolist)+"&orderSType="+this.orderSType,
						})
					}else if(this.orderSType==2){
						let prolist=this.prolist;
						let addrInfo=this.addrInfo;
						uni.redirectTo({
							url:"/pages/PinTuanBuy/pinTuanOrder/pinTuanOrder?addrInfo="+JSON.stringify(addrInfo)+'&SpecText='+this.SpecText+'&InvoiceId='+id+'&number='+this.number+'&groupRecordId='+this.groupRecordId+'&groupId='+this.groupId+'&price='+this.price+"&orderSType="+this.orderSType,
						})
					}else if(this.orderSType==3){
						let prolist=this.prolist;
						let addrInfo=this.addrInfo;
						uni.redirectTo({
							url:"/pages/Crowdfunding/zc_submitOrder/zc_submitOrder?addrInfo="+JSON.stringify(addrInfo)+'&SpecText='+this.SpecText+'&InvoiceId='+id+'&number='+this.number+'&proId='+this.proId+'&price='+this.price+'&Supppottype='+this.Supppottype
						})
					}
				}
			},
			gotoAddInvoice(id) {
				let goUrl = '';
				if(id){
					goUrl = '/pages/member/addInvoice/addInvoice?id='+id
				}else{
					goUrl = '/pages/member/addInvoice/addInvoice'
				}
				uni.navigateTo({
					url: goUrl
				})
			},
			async getInvoice() { //获取发票列表
				let result = await post("Invoice/GetAllInvoiceList", {  //发票列表最多只能有10个，不用做分页
					userId: this.userId,
					token: this.token
				})
				let _this = this;
				if (result.code === 0) {
					if (result.data.length > 0) {
						_this.list = _this.list.concat(result.data);
					}
				} else if (result.code === 2) {
					uni.showToast({
						title: "登录超时！",
						icon: "none",
						duration: 1500,
						success: function() {
							uni.navigateTo({
								url: "/pages/login/login?askUrl=" + _this.curPage
							})
						}
					});
				} else {
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 1500
					});
				}
			},
			async setDefaultInvoice(index,id){  //设为默认
				let result = await post("Invoice/SetDefaultInvoice",{
					UserId:this.userId,
					Token:this.token,
					Id:id
				});
				if(result.code===0){
					for(let i=0;i<this.list.length;i++){
						if(index===i){
							this.$set(this.list[i],'IsDefault',1);
						}else{
							this.$set(this.list[i],'IsDefault',0);
						}
					}
				}else{
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 1500
					});
				}
			},
			deleteBtn(index,fId){
				let _this=this;
				uni.showModal({
					title: '提示',
					content: '您确定要删除该发票信息吗？',
					success: function (res) {
							if (res.confirm) {
								_this.Deleteinvoice(index,fId);
							} else if (res.cancel) {

							}
					}
				});
			},
			async Deleteinvoice(index,fId) { //删除发票
				let result = await post("Invoice/Deleteinvoice", {
					userId: this.userId,
					token: this.token,
					Id: fId
				});
				if (result.code === 0) {
					let _this = this;
					uni.showToast({
						title: "删除成功！",
						icon: "none",
						duration: 1500,
						success: function() {
							_this.$nextTick(function() {
								_this.list.splice(index, 1);
							});
						}
					});
				} else if (result.code === 2) {
					uni.showToast({
						title: "登录超时！",
						icon: "none",
						duration: 1500,
						success: function() {
							uni.navigateTo({
								url: "/pages/login/login?askUrl=" + _this.curPage
							})
						}
					});
				} else {
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 1500
					});
				}
			}
		}
	}
</script>

<style>
	.content {
		height: 100%;
	}

	.defaultPage {
		height: 100%;
	}

	.noConPage {
		height: calc(100% - 92upx);
	}

	.icon-del {
		display: inline-block;
		vertical-align: middle;
		margin-right: 10upx;
		font-size: 38upx;
	}
	.addInvoice__weui-cells .tag.active{
		border-color: #FF3333
	}
</style>
