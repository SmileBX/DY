<template>
  <view style="padding-bottom:120rpx">
    <radio-group class="radio-group" @tap="radioChange" >
      <view class="list bpr-box" v-for="(item, index) in 6" :key="index" @click="choseAddress(index)">
        <view class="jus-b" ><span class="name">item.Consignee</span><span>item.Mobile</span></view>
        <view class="address">item.Address</view>
        <view class="ali-c jus-b foot gou flex justifyContentBetween flexAlignCenter">
          <label @click.stop="changeDefault(index)">
              <radio class="radio" color="#338afb" :checked="item.IsDefault==1" :value="item.Id" >
                <text>默认地址</text>
              </radio>
          </label>
          <view class="ali-c flex justifyContentBetween flexAlignCenter">
            <view class="ali-c btt flex flexAlignCenter" @tap="editSite(item.Id)">
              <image class="write" src="http://jyy.wtvxin.com/static/images/icons/write.png" alt=""></image>
              <span>编辑</span>
            </view>
            <view class="ali-c btt flex flexAlignCenter" @tap="Delete(item.Id,index)">
              <img class="delete" src="http://jyy.wtvxin.com/static/images/icons/del.png" alt="">
              <span>删除</span>
            </view>
          </view>
        </view>    
      </view>
      </radio-group>
      <p  class="nodata_log flex flexColumn flexAlignCenter" style="display: none;">
          <image src="../../../static/my/site.png" alt="" class="site_log"></image>
          <span class="cg mt2">还没有收货地址哦~</span>
          <span class="add_new" @tap="toAddSite()">新建地址</span>
      </p>
      <p
        class="ovedMsg"
        v-if="isOved && page>1"
        style="text-align:center;padding:20rpx;font-size:26rpx;color:#666;"
      >我也是有底线的</p>
      <p class="btnl" @tap="toAddSite()" v-if="list.length>0">添加收货地址</p>
  </view>
</template>

<script>
// import {post} from '@/utils'
// import { formatTime } from '@/utils/index'

export default {
  data () {
    return {
      page: 1,
      pageSize: 4,
      pagetype:"",//页面来源
      count:0,
      allPage:0,
      userId: "",
      token: "",
      isLoad:true,
	  isOved:false,
      list:[]
    }
  },
  onShow(){
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.pagetype=this.$root.$mp.query.pagetype||'';
    wx.setStorageSync("addressinfo",'');
    this.list = []
    this.page = 1
    this.geSiteList()
  },
  methods: {
    
    async geSiteList(){
      const res = await post('Address/AddressList',{
        UserId: this.userId,
        Token: this.token,
        Page: this.page,
        PageSize: this.pageSize
      })
      if(res.code==0){
        this.count = res.count
        if(this.page == 1){
          this.list = []
        }
        if(parseInt(this.count) % this.pageSize == 0){
          this.allPage = this.count / this.pageSize
        }else{
          this.allPage = parseInt(this.count / this.pageSize) + 1
        }
        if(this.allPage > this.page){
          this.isLoad = true;
        }else{
          this.isLoad = false
        }
        this.list = this.list.concat(res.data)
      }
    },
    radioChange(e) {
      //设置选中样式
        var arrs = this.list;
        var that = this;
        for (const x in arrs) {
          if (arrs[x].id == e.target.value) {
            arrs[x].checked = true;
          } else {
            arrs[x].checked = false;
          }
        }
    },
    changeDefault(i) {
      console.log('111111111111')
      //设置默认
      const params = {
        Id: this.list[i].Id,
        UserId: this.userId,
        Token: this.token
      };
      post("Address/SetDefaultaddress", params)
      
    },
     Delete(id, index) {
      //删除地址
      const that = this;
      wx.showModal({
        title: '您确定删除该收货地址吗？',
        content: '删除后无法恢复',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#29a49f',
        success: (result) => {
          if(result.confirm){
              this.SureDel(id,index)
          }
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    },
    SureDel(id,index){
      post(
            "Address/DeleteAddress",
            {
              Id: id,
              UserId: this.userId,
              Token: this.token
            }
          ).then(res => {
            if (res.code === 0) {
              wx.showToast({
                title: "删除成功!",
                success:()=>{
                  this.list.splice(index, 1)
                }
              });
            }
          });
    },
    editSite(id){
       wx.navigateTo({
        url:'/pages/myson/addsite/main?id='+id
      })
    },
    toAddSite(){
      wx.navigateTo({
        url:'/pages/myson/addsite/main'
      })
    },
    choseAddress(i){
      if(this.pagetype == 'confirm'){
        wx.setStorageSync("addressinfo",this.list[i]);
        wx.navigateBack()
      }
    }
  },
  onReachBottom() {
      console.log("ddddd");
      //加载更多
      console.log(this.allPage,this.page,this.isLoad)
      if (this.isLoad) {
        this.page++;
        this.geSiteList()
      } else {
        if (this.page > 1) {
          this.isOved = true;
        } else {
          this.isOved = false;
        }
      }
    }
}
</script>

<style lang='scss' scoped>
.nodata_log{
  padding:200rpx 0;
}
.bpr-box{
	border-radius: 15upx;
	background: #ffffff;
}
.add_new{
  margin-top:80rpx;
  width:200rpx;
  border:1rpx solid #ff3333;border-radius:8rpx;
  color:#ff3333;
  height:60rpx;line-height: 60rpx;
  text-align: center;
}
.site_log{
  width:273rpx;height:363rpx;
}
.btnl{
  width: 100%;
	height: 100rpx;
  background-color: #ff3333;
  text-align: center;
  line-height: 100rpx;
  position: fixed;
  bottom: 0;
  font-size: 30rpx;
  color: #fff;
  margin:auto;
}
.list{
  margin: 20rpx 30rpx 0;
  padding: 40rpx 20rpx 0;
  .btt{
    margin-left: 50rpx
  }
  .foot{
    height: 100rpx;
  }
  .address{
    line-height: 80rpx;
    border-bottom: 1rpx solid #ededed;
    color: #333
  }
  .name{
    font-size: 28rpx;
    color: #3c3c3c;
  }
  .radio{
    transform: scale(0.7);
    position: relative;
    left: -30rpx;
    text{  
      font-size: 40rpx
    }
  }
  .write{
    width: 32rpx;
    height: 31rpx;
    margin-right: 10rpx
  }
  .delete{
    width: 32rpx;
    height: 32rpx;
    margin-right: 10rpx
  }
}
</style>
