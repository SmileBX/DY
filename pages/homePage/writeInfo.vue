<template>
	<view>
		<view class="bg_fff change_info flex flexColumn flexAlignCenter dot" v-if="IsSalesOffice==1">
			<view>本人或直属亲属是否有去过售楼处或电话咨询售楼处</view>
			<radio-group class="flex justifyContentAround mt2" @change="change">
				<view class="">
					<radio color="#ff3333" value=1 :checked="IsSales==1"></radio>
					<text>有</text>
				</view>
				<view class="">
					<radio  color="#ff3333" value=0 :checked="IsSales==0"></radio>
					<text>没有</text>
				</view>
			</radio-group>
		</view>
		<view class="item bg_fff flex flexAlignCenter justifyContentBetween">
			<text class="left_item">{{IsSalesOffice==1?'会员姓名':'业主姓名'}}</text>
			<input type="text" placeholder="请输入联系人姓名" class="flex1 font26 text_right" v-model="ContactName">
		</view>
		<view class="item bg_fff flex flexAlignCenter justifyContentBetween">
			<text class="left_item">{{IsSalesOffice==1?'会员电话':'业主电话'}}</text>
			<input type="text" placeholder="请输入联系人手机号" class="flex1 font26 text_right" v-model="Tel">
		</view>
		<view class="btn_fix" @click="btnSubmit">确定</view>
		<view class="mask" v-if="showModal"></view>
		<view v-if="showModal" class="pay_mask flex flexColumn flexAlignCenter">
			<view class="pay_info">本产品仅限未去过售楼处的客户购买</view>
			<view class="btn_pay_cc" @click="confirmMask">确认</view>
		</view>
	</view>
</template>

<script>
	import {
		host,
		post,
		get,
		valPhone
	} from '@/common/util.js';
	export default{
		data(){
			return {
				userId: "",
				token: "",
				ContactName:'',
				Tel:'',
				IsSales:0,
				IsSalesOffice:0,//是否是房屋类型显示是否去过售楼部按钮
				showModal:true,
			}
		},
		onLoad(e){
			this.IsSalesOffice=e.IsSalesOffice;console.log(this.IsSalesOffice)
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
		},
		onShow(){
			this.showModal = false
			this.getMemberInfo()
		},
		methods:{
			async getMemberInfo() {
				let result = await post("User/GetMemInfo", {
					"UserId": this.userId,
					"Token": this.token
				})
				if (result.code === 0) {
					this.Tel = result.data.Mobile;
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
			change(e){
				console.log(e,e.mp.detail.value)
				this.IsSales=e.mp.detail.value
			},
			yeanheng(){console.log(this.ContactName)
				if(this.IsSalesOffice==1&&this.IsSales==null){
					uni.showToast({
						title:"请选择是否去过售楼处",
						icon:"none"
					})
					return false
				}
				if(this.ContactName==""){
					uni.showToast({
						title:"请输入联系人姓名",
						icon:"none"
					})
					return false
				}
				return true
			},
			confirmMask(){
				uni.navigateBack({delta: 2});
				console.log('用户点击确定');
			},
			btnSubmit(){			
				if(this.yeanheng()&&valPhone(this.Tel)){
					if(this.IsSales==1&&this.IsSalesOffice==1){
						this.showModal = true
						// uni.showModal({
						//     content: '本产品仅限未去过售楼处的客户购买',
						// 	showCancel: false,
						//     success: function (res) {
						//         if (res.confirm) {
						// 			uni.navigateBack({delta: 2});
						//             console.log('用户点击确定');
						//         }
						//     }
						// });
						// uni.showToast({
						// 	title:"本产品仅限未去过售楼处的客户购买",
						// 	icon:"none",
						// 	duration:2000
						// })
						// setTimeout(res=>{
						// 	uni.navigateBack({});
						// },2000)
					}else{
						// 设置业主参数
						let peopleInfo={ //业主信息
							ContactName:this.ContactName,//业主姓名
							Tel:this.Tel,//业主电话
							IsSalesOffice:this.IsSales,//去过或咨询售楼处 1-有 0-没有
						}
						this.$store.commit("update", { peopleInfo });
						// 跳转到上一页
						uni.navigateBack({});						
					}
				}
			}
				
			
		}
	}
</script>

<style lang="scss">
	.change_info{
		padding:40upx 0;
		border-bottom:1upx solid #f5f5f5;
	}
	.item{
		padding:20upx 30upx;border-bottom: 1upx solid #f5f5f5;
		.left_item{
			width:25%;
		}
	}
	.btn_fix{
		background: #ff3333;text-align: center;
		height:88upx;line-height: 88upx;
		width:690upx;margin:100upx auto;
		color:#ffffff;border-radius:15upx;
	}
	input[type = "radio"] {
		display: none;
	}
	.pay_mask{
		position: fixed;background: #ffffff;
		border-radius:25upx;
		width:600upx;
		height:270upx;
		z-index: 200;
		left:50%;top:50%;
		transform: translate(-50%,-50%);
		.pay_info{
			width:100%;
			font-size:30upx;font-weight: bold;
			height:180upx;line-height: 180upx;
			border-bottom: 1upx solid #e2e2e2;
			text-align: center;
		}
		.btn_pay_cc{
			width: 100%;
			text-align: center;
			height:90upx;
			font-size:28upx;
			line-height: 90upx;color:#ff3333;
		}
	}
	
</style>
