<template>
	<view class="content">
		<!-- 填写地址 -->
		<view class="defaultPage eadit__defaultPage" v-if="showaddaddress">
			<view class="addAddress__weui-cells weui-cells mt0">
				<view class="weui-cell">
					<view class="weui-cell__hd">
						<label class="weui-label">收货人</label>
					</view>
					<view class="weui-cell__bd">
						<input type="text" class="weui-input" v-model="name" placeholder="请输入收货人姓名"  />
					</view>
				</view>
				<view class="weui-cell">
					<view class="weui-cell__hd">
						<label class="weui-label">手机号码</label>
					</view>
					<view class="weui-cell__bd">
						<input type="text" class="weui-input" v-model="tel" placeholder="请输入收货人手机号" />
					</view>
				</view>
				<view class="weui-cell" @click="showMulLinkageThreePicker">
					<view class="weui-cell__hd">
						<label class="weui-label">所在地区</label>
					</view>
					<view class="weui-cell__bd">
						<input type="text" class="weui-input" disabled="true" placeholder="请选择所在地区" :value="pickerText"  />
					</view>
				</view>
				<view class="weui-cell flexAlignStart">
					<view class="weui-cell__hd">
						<label class="weui-label">详细地址</label>
					</view>
					<view class="weui-cell__bd">
						<textarea class="weui-Area" v-model="fullAddress" placeholder="道路、门牌号、小区、楼栋号、单元、室等" />
						</view>
				</view>
				<view class="weui-cell">
					<view class="weui-cell__bd">
						设为默认地址
					</view>
					<view class="weui-cell__ft text_r">
						<switch :checked="checked" @change="tab" color="#89674c"/>
					</view>
				</view>
			</view>
			<view class="btnBox" style="padding:100upx 20upx">
				<button type="primary" class="btn_bb" @click="submit">保存</button>
			</view>
			<mpvue-city-picker v-if="hasData" :province="province" :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
			 v-on:onconfirm="onconfirm(arguments)"></mpvue-city-picker>
		</view>
	</view>
</template>

<script>
	import {host,post,get} from '@/common/util.js';
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '@/common/city.data.js';
	import "@/common/dd_style.css";
	export default {
		components: {
			mpvueCityPicker
		},
		data() {
			return {
				proId: "", //立即购买商品Id
				SpecText: "", //商品sku
				price: 0, //选择sku的价格
				number: 1, //数量
				Supppottype:"",//众筹方式
				CartIds: "", //购物车提交的item的id
				prolist: [], //购物车过来的商品列表
				orderSType: "", //0：直接下单的，1：购物车过来的，2 拼团下单,3 众筹下单
				InvoiceId:0,
				groupId:"",//拼团产品id
				groupRecordId:0,//拼团记录id
				mixInfo:"",//组合购商品信息
				hasMixPro:false,
				hasData:false, 
				showaddaddress:true, //弹窗添加地址
				userId:"",
				token:"",
				name: "", //收货人姓名
				tel: "", //收货人电话
				fullAddress: "", //详细地址
				isDefault: 0,   //设为默认地址 
				checked: false,
				province: {}, //省
				provincesCode: "",
				cityCode: "",
				quCode: "",
				cityPickerValueDefault: [0, 0, 1],  //默认选中
				themeColor: '#007AFF',  //改确定的颜色
				pickerText: '',  //选择的地址值
				code:"",  //地址code
				id: "", //收货地址的id
				noaddlist:false, //有收货地址
				addressLists:[], //收货列表
				pagetype:0,
				page:1,
				ShareMemberId:""
			};
		},
		onLoad: function(option) {
			this.pagetype=option.pagetype;
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
			}
			else if (this.orderSType == 2) {
				this.groupId = option.groupId;
				this.groupRecordId = option.groupRecordId;
				this.price = option.price;
				this.number = Number(option.number);
				this.SpecText = option.SpecText;
			}
			else if(this.orderSType == 3){
				this.proId = option.proId;
				this.price = option.price;
				this.number = Number(option.number);
				this.SpecText = option.SpecText;
				this.Supppottype=option.Supppottype;
			}
			if(option.InvoiceId){
				this.InvoiceId=option.InvoiceId
			}
			this.setTitle()
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.getprovinces();
			this.addressList();
		},
		methods:{
			setTitle(){
				uni.setNavigationBarTitle({
					title:'编辑地址'
				})
			},
			//订单页选择地址
			selectaddr(index){
				if(this.pagetype==1){//从订单页过来的
					let addrInfo=this.addressLists[index];
					if(this.orderSType==0){
						if(this.hasMixPro){
							uni.redirectTo({
								url:"/pages/submitOrder/submitOrder?addrInfo="+JSON.stringify(addrInfo)+'&SpecText='+this.SpecText+'&mixInfo='+this.mixInfo+'&InvoiceId='+this.InvoiceId+'&number='+this.number+'&proId='+this.proId+'&price='+this.price+"&orderSType="+this.orderSType+'&ShareMemberId='+this.ShareMemberId,
							})
						}else{
							uni.redirectTo({
								url:"/pages/submitOrder/submitOrder?addrInfo="+JSON.stringify(addrInfo)+'&SpecText='+this.SpecText+'&InvoiceId='+this.InvoiceId+'&number='+this.number+'&proId='+this.proId+'&price='+this.price+"&orderSType="+this.orderSType+'&ShareMemberId='+this.ShareMemberId,
							})
						}
					}else if(this.orderSType==1){
						let prolist=this.prolist;
						uni.redirectTo({
							url:"/pages/submitOrder/submitOrder?addrInfo="+JSON.stringify(addrInfo)+'&cartItem='+this.CartIds+'&InvoiceId='+this.InvoiceId+'&prolist='+JSON.stringify(prolist)+"&orderSType="+this.orderSType,
						})
					}else if(this.orderSType==2){
						let prolist=this.prolist;
						uni.redirectTo({
							url:"/pages/PinTuanBuy/pinTuanOrder/pinTuanOrder?addrInfo="+JSON.stringify(addrInfo)+'&SpecText='+this.SpecText+'&InvoiceId='+this.InvoiceId+'&number='+this.number+'&groupRecordId='+this.groupRecordId+'&groupId='+this.groupId+'&price='+this.price+"&orderSType="+this.orderSType,
						})
					}else if(this.orderSType==3){
						let prolist=this.prolist;
						uni.redirectTo({
							url:"/pages/Crowdfunding/zc_submitOrder/zc_submitOrder?addrInfo="+JSON.stringify(addrInfo)+'&SpecText='+this.SpecText+'&InvoiceId='+this.InvoiceId+'&number='+this.number+'&proId='+this.proId+'&price='+this.price+'&Supppottype='+this.Supppottype
						})
					}
				}
			},
			// 三级联动选择
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show();
			},
      //获取选择的地址code
			onconfirm(code) {
        this.provincesCode=code[0];
				this.cityCode=code[1];
				this.quCode=code[2];
				this.pickerText=code[3];
			},
		//获取省集合
		async getprovinces() {
			this.province = await post("Address/GetArea", {
				Types: "Province"
			});
			this.hasData=true;
		},
		//提交验证
		yanzheng() {
			if (this.name == "" || this.tel == "" || this.fullAddress == "") {
				uni.showToast({
					title: "姓名，电话，详细地址不能为空",
					icon: "none",
					duration: 1000
				});
				return false;
			}
			if (this.name.length) {
				if (this.name.length > 6) {
					uni.showToast({
						title: "姓名的长度不能超过6位",
						icon: "none",
						duration: 1000
					});
					return false;
				}
			}
			if (!/^1[345678]\d{9}$/.test(this.tel)) {
				wx.showToast({
					title: "手机号不合法",
					icon: "none",
					duration: 1000
				});
				return false;
			}
			return true;
		},
		//保存地址
		submit() {
			if (this.yanzheng()) {
				if (this.id) {
					this.setAddressInfo();
				} else {
					this.AddAddress();
				}
			}
		},
		//修改收货地址
    async setAddressInfo() {
      var info = await post("Address/UpdateAddress", {
        UserId: this.userId,
        Token: this.token,
        Id: this.id,
        Consignee: this.name,
        Mobile: this.tel,
        IsDefault: this.isDefault,
        ProvinceCode: this.provincesCode,
        CityCode: this.cityCode,
        DistrictCode: this.quCode,
        // StreetCode: Street,
        FullAddress: this.fullAddress
        // PostCode: Zipcode
      });
      if (info.code == 0) {
        uni.showToast({
          title: "修改成功",
          icon: "none",
          duration: 1000
        });
				let _this=this;
				setTimeout(function() {
					_this.showaddaddress=false;
					_this.addressList()
				},1100)
      }
    },
		//编辑地址
		update(id){
			
			this.id=id;
			this.showaddaddress=true;
			this.GetAddressInfo();
		},
		//获取收货地址信息（指定的收货地址id）
    async GetAddressInfo() {
      var info = await post("Address/GetInfo", {
        UserId: this.userId,
        Token: this.token,
        Id: this.id
      });
      if (info.code == 0) {
        this.name = info.data.name;
        this.tel = info.data.tel;
        this.pickerText = info.data.addressstr;
        this.fullAddress=info.data.address;
        this.hasdef=info.data.is_def;
        this.isDefault=info.data.is_def;
        if (this.id != "") {
          this.provincesCode = info.data.province;
          this.cityCode = info.data.city;
          this.quCode = info.data.district;
        }
        if(info.data.is_def==1){
          this.checked=true
        }
        if(info.data.is_def==0){
          this.checked=false
        }
      }
    },
		//删除
		deletbtn(id){
			let that = this;
			uni.showModal({
				content: "您确定要删除该收货地址吗？",
				confirmColor:"#89674C",
				success: function(res) {
					if (res.confirm) {
						that.deletaddress(id);
					} else if (res.cancel) {
					}
				}
			});
		},
		//删除地址
    async deletaddress(id) {
      var deldet = await post("Address/DeleteAddress", {
        UserId: this.userId,
        Token: this.token,
        Id: id
      });
      if (deldet.code == 0) {
        uni.showToast({
          title: "地址已删除",
          icon: "none",
          duration: 1000
        });
        this.addressList();
      }
    },
		//添加
		async AddAddress(){
			let result = await post("Address/AddAddress", {
			UserId: this.userId,
			Token: this.token,
			Consignee: this.name,
			Mobile: this.tel,
			IsDefault: this.isDefault,
			ProvinceCode: this.provincesCode,
			CityCode: this.cityCode,
			DistrictCode: this.quCode,
			FullAddress: this.fullAddress,
			StreetCode: "",
			});
			if (result.code == 0) {
				uni.showToast({
					title: "添加成功",
					icon: "none",
					duration: 1000
				});
				let _this=this;
				setTimeout(function() {
          _this.showaddaddress=false;
					_this.addressList();
        },1000);
			}
		},
		//收货地址列表
		async addressList() {
			let _this = this;
			let result = await post("Address/AddressList", {
				UserId: _this.userId,
				Token: _this.token,
				page: _this.page,
			});
			if(result.code==0){
				this.addressLists=result.data;
				if(result.data.length==0){
					this.noaddlist=true;
				}
			}else if(result.code==2){
				
			}
		},
		//设置默认
		async SetDefault(id){
			let result = await post("Address/SetDefaultaddress",{
				UserId: this.userId,
				Token: this.token,
				Id: id
			})
			if(result.code==0){
				this.addressList()
			}
		},
		//switch选择是否为默认地址
		tab() {console.log(this.checked)
      //var isDefault = "";
      if (this.isDefault == 1) {
        this.isDefault = 0;
        this.checked = false;
      } else {
        this.isDefault = 1;
        this.checked = true;
      }
      //this.isDefault = isDefault;console.log(this.checked)
    },
		goaddaddress(){
			this.showaddaddress=true;
			this.noaddlist=false;
		}
		}
	}
</script>

<style lang="scss">
.content{
	height: 100%;
	.bg_89674c{
		background: #cc9f68;
	}
}

</style>
