<template>
	<view class="content">
		<view style="width: 100%;background:#ff3737;" :style="{'height':barHeight+'px'}"></view>
		<view class="top-box">
			<view class="memberTop">
				<view class="iconBtnBox">
					<view @click="golink('/pages/message/messageClass/messageClass')" class="iconfont icon-xiaoxi iconBtn"><text class="uni-badge" v-if="newscount!=0">{{newscount}}</text></view>
				</view>
				<view class="conBox">
					<view class="tx_info" @click="golink('/pages/member/editinfo/editinfo?Memberid='+memberInfo.Id)">
						<view>
							<image class="tx" v-if="memberInfo.Avatar" :src="memberInfo.Avatar" mode="aspectFill"></image>
							<image class="tx" v-else src="/static/default.png" mode="aspectFill"></image>
						</view>
						<view class="info flex">
							<view class="info-item" style="width: 100%;">
								<view class="name">
									<text class="txt" style="max-width: 100%;">{{memberInfo.NickName||'您还未登录，请先登录！'}}</text>
									<text class="plusicon" v-if="memberInfo.IsVip==1">VIP</text>
								</view>
								<view class="perId">ID:<text id="MemberID">{{memberInfo.Id||"00000"}}</text></view>
							</view>
						</view>
					</view>
					<view class="flowdata flex flex-center">
						<view class="item">
							<view class="title" @click="golink('/pages/tabBar/my/collect?index=0')">收藏商品</view>
							<view class="num">0</view>
						</view>
						<view class="item">
							<view class="title" @click="golink('/pages/tabBar/my/collect?index=1')">收藏店铺</view>
							<view class="num">0</view>
						</view>
						<view class="item">
							<view class="title" @click="golink('/pages/tabBar/my/anchor')">关注主播</view>
							<view class="num">0</view>
						</view>
					</view>
				</view>
			</view>		
		</view>
		
		<!-- 我的订单 -->
		<view class="memberIndex__section b_radius myOrder">
			<view class="section__hd weui-cell" @click="golink('/pages/member/order/order?tabIndex=0')">
				<view class="weui-cell__bd">
					<view class="title">我的订单</view>
				</view>
				<view class="weui-cell__ft">
					<text class="more">查看全部</text>
					<view class="uni-icon uni-icon-arrowright"></view>
				</view>
			</view>
			<view class="section__bd">
				<view class="dd-list col__list li_20 center clear pt5 flex" >
					<view class="item flex1" @click="golink('/pages/member/order/order?tabIndex=1')">
						<view class="iconImg">
							<image class="icon" src="../../../static/icons/u_order1.png" mode="widthFix"></image>
							<view class="circleNum" v-if="memberInfo.num_dfk>0">{{memberInfo.num_dfk}}</view>
						</view>
						<view class="txt">待付款</view>
					</view>
					<view class="item flex1" @click="golink('/pages/member/order/order?tabIndex=2')">
						<view class="iconImg">
							<image class="icon" src="../../../static/icons/u_order2.png" mode="widthFix"></image>
							<view class="circleNum" v-if="memberInfo.num_dfh>0">{{memberInfo.num_dfh}}</view>
						</view>
						<view class="txt">待发货</view>
					</view>
					<view class="item flex1" @click="golink('/pages/member/order/order?tabIndex=3')">
						<view class="iconImg">
							<image class="icon" src="../../../static/icons/u_order3.png" mode="widthFix"></image>
							<view class="circleNum" v-if="memberInfo.num_dsh>0">{{memberInfo.num_dsh}}</view>
						</view>
						<view class="txt">待收货</view>
					</view>
					<view class="item flex1" @click="golink('/pages/member/order/order?tabIndex=4')">
						<view class="iconImg">
							<image class="icon" src="../../../static/icons/u_order4.png" mode="widthFix"></image>
							<view class="circleNum" v-if="memberInfo.num_dpj>0">{{memberInfo.num_dpj}}</view>
						</view>
						<view class="txt">待评价</view>
					</view>
					<view class="item" @click="golink('/pages/member/orderTui/orderTui')">
						<view class="iconImg">
							<image class="icon" src="../../../static/icons/u_order5.png" mode="widthFix"></image>
						</view>
						<view class="txt">退款/售后</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 我的订单 end-->

		<!-- 我的服务 -->
		<view class="memberIndex__section b_radius uni-mb10">
			<view class="section__hd weui-cell">
				<view class="weui-cell__bd">
					<view class="title">我的服务</view>
				</view>
			</view>
			<view class="section__bd Sevice">
				<view class="dd-list col__list li_25 center clear">
					<view class="item" @click="golink('/pages/tabBar/my/wallet?id='+memberInfo.Wallet)">
						<image class="iconImg" src="../../../static/icons/u_qb.png" mode=""></image>
						<view class="txt">我的钱包</view>
					</view>
					<view class="item" @click="golink('/pages/other/myAcount/myAcount')">
						<image class="iconImg" src="../../../static/icons/u_sy.png" mode=""></image>
						<view class="txt">我的收益</view>
					</view>
					<view class="item" @click="golink('/pages/other/myguest/myguest')">
						<image class="iconImg" src="../../../static/icons/u_team.png" mode=""></image>
						<view class="txt">我的团队</view>
					</view>
					<view class="item" @click="golink('/pages/tabBar/my/browsing')">
						<image class="iconImg" src="../../../static/icons/u_zj.png" mode=""></image>
						<view class="txt">浏览记录</view>
					</view>
					<view class="item" @click="golink('/pages/member/myAppraise/myAppraise')">
						<image class="iconImg" src="../../../static/icons/u_pj.png" mode=""></image>
						<view class="txt">我的评价</view>
					</view>
					<view class="item" @click="golink('/pages/member/invoiceList/invoiceList')">
						<image class="iconImg" src="../../../static/icons/u_fp.png" mode=""></image>
						<view class="txt">发票信息</view>
					</view>
					<view class="item" @click="golink('/pages/member/invite/invite')">
						<image class="iconImg" src="../../../static/icons/u_yq.png" mode=""></image>
						<view class="txt">推荐好友</view>
					</view>
					<view class="item" @click="golink('/pages/member/address/address')">
						<image class="iconImg" src="../../../static/icons/u_addr.png" mode=""></image>
						<view class="txt">地址管理</view>
					</view>
					<view class="item">
						<image class="iconImg" src="../../../static/icons/u_kf.png" mode=""></image>
						<view class="txt">官方客服</view>
					</view>
					<view class="item" @click="golink('/pages/member/question/question')">
						<image class="iconImg" src="../../../static/icons/u_fk.png" mode=""></image>
						<view class="txt">常见问题</view>
					</view>
					<view class="item" @click="golink('/pages/other/set/set')">
						<image class="iconImg" src="../../../static/icons/u_set.png" mode=""></image>
						<view class="txt">设置</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 我的服务  end-->
		
	</view>
</template>

<script>
	import {host,post,get,toLogin} from '@/common/util.js';
	import "@/common/dd_style.css";
	export default {
		data() {
			return {
				barHeight:0,//app端增加状态栏高度
				userId: "",
				token: "",
				memberInfo:{},
				OrderInfo:{},
				newscount:0,
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
			this.token = uni.getStorageSync("token");console.log(toLogin())
			if (toLogin()) {
				this.NewsCount();
			    this.getMemberInfo();
			}
		},
		methods: {
			golink(url){
				if(toLogin()){
					uni.navigateTo({
						url:url
					})
				}
			},
			async getMemberInfo() {
				let result = await post("User/GetCenterInfo", {
					"UserId": this.userId,
					"Token": this.token
				})
				if (result.code === 0) {
					this.memberInfo = result.data;
				} else if (result.code === 2) {
					let _this = this;
					uni.showModal({
						content: "您还没有登录，是否重新登录？",
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
			async NewsCount() {
				let result = await post("News/NewsCount", {
					"UserId": this.userId,
					"Token": this.token
				});
				if (result.code === 0) {
					this.newscount = result.count;
				} 
			},
			// #ifndef MP
			QQSevice(){
				this.golink('/pages/home/kefu/kefu')
				// if(toLogin(this.curPage)){
				// 	window.location.href = "http://wpa.qq.com/msgrd?v=3&uin=8888888&site=qq&menu=yes"
				// }
			}
			// #endif
		}
	}
</script>

<style scoped>
	.content{height: 100%;overflow-y: auto;}
	.Sevice .dd-list{padding: 26upx 0 0;}
	.Sevice .dd-list .item{ padding: 0; margin-bottom: 20upx;}
	.WEIXIN_btn{ position: absolute; left: 0; top: 0; width: 100%; height: 100%; opacity: 0;}
	.item .iconImg{
		width: 64rpx;
		height: 64rpx;
		display: block;
	}
	.myOrder{ margin-top: -120upx;position: relative;}
	.myOrder .dd-list .iconImg{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	/* #ifdef MP-WEIXIN */
	.myOrder .dd-list .iconImg image {
		width: 56upx;
		height: 56upx;
	}
	/* #endif */
	.b_radius{ margin-left: 30upx; margin-right: 30upx; border-radius: 14upx; overflow: hidden;}
	.vip-section{ padding: 0 30upx; position: relative;}
	.vip-section image{ display: block;}
</style>
