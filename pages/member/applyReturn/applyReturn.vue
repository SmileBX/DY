<template>
  <view class="sertype">
      <view class="mt2 bg_fff pp3 flex justifyContentBetween">
          <image :src="info.PicNo" alt="" class="shop mr2"></image>
         <view class="flex1 mr2">
              <view class="uni-bold">{{info.ProductName}}</view>
              <view class="cg font24 mt1 color_gray">{{info.SpecText}}</view>
			  <view class="cg font24 mt1 color_red">￥{{info.ActualPay}}元</view>
          </view>
      </view>
      <view class="pw3 mt2 bg_fff">
          
          <view class="menu_item flex justifyContentBetween flexAlignCenter" v-if="false">
              <view>货物状态</view>
              <view class="flex flex1 flexAlignCenter">
                  <input type="text" placeholder="请选择" disabled class="flex1 text_right">
                  <img src="http://jyy.wtvxin.com/static/images/icons/right.png" alt="" class="icon_right mr2">
              </view>
          </view>
          
          <view class="menu_item flex justifyContentBetween flexAlignCenter">
              <view>退款原因</view>
              <view class="flex flex1 flexAlignCenter"  @click="showEdit=true">
                  <input type="text" placeholder="请选择" disabled class="flex1 text_right" v-model="typeTxt">
                  <img src="http://jyy.wtvxin.com/static/images/icons/right.png" alt="" class="icon_right mr2">
              </view>
          </view>
          <view class="menu_item flex justifyContentBetween flexAlignCenter">
              <view>退款金额</view>
              <view class="cr">¥{{info.ActualPay}}</view>
          </view>
          <view class="mt2">
              <view>退款说明</view>
              <textarea name="" id="" cols="30" rows="10" class="sign" placeholder="请输入说明详情" v-model="RefundContent"></textarea>
          </view>
      </view>
      <view class="mt2 bg_fff pp3" v-if="false">
        <view>上传凭证（不超过5张）</view>
        <view class="fed_pic flex flexWrap">
          <view v-for="(item,index) in 5" :key="index" class="picbox">
            <image src="http://jyy.wtvxin.com/static/images/icons/add3.png" alt="" class="pic_itim"></image>
          </view>
          <view class="picbox upBtnImg">
            <image src="http://jyy.wtvxin.com/static/images/icons/add3.png" alt="" class="pic_itim"></image>
          </view>
        </view>
      </view>
      <view class="sub_btn" @click="submitSerty()">提交</view>
      <pickers v-if="showEdit" :arr="list" :show.sync="showEdit" @success="gettype"></pickers>
  </view>
</template>

<script>
import {switchPath,post,get,navigate} from '@/common/util.js'
import pickers from '@/components/pickers';
export default {
  components: {pickers},
  data () {
    return {
      indexId:0,
      type:1,//1:申请换货;2:申请退货退款;3:仅退款（无需退货）
      OrderNumber:"",
      info:{},
      RefundContent:"",//退款说明
      RefundReasonId:0,//退原因id
      showEdit:false,
      list:[{code: 0,message: "请选择"}],
      // type:"",
      typeTxt:"请选择",
    }
  },
 
  onShow(){
    this.indexId=this.$mp.query.indexId
    this.OrderNumber=this.$mp.query.id
    this.type=this.$mp.query.type
    this.getDetail();
    this.getCancelReason()
  },
  methods: {
    gettype(e){
      if(e.code){
        this.RefundReasonId=e.code;
        this.typeTxt=e.message;
      }
    },
    getCancelReason(){
      get('Order/CancelReason',{}).then(res=>{
        this.list.push(...res.data)
      })
    },
    getDetail(){
      post('Order/OrderDetails',{
        UserId:wx.getStorageSync("userId"),
        Token:wx.getStorageSync("token"),
        OrderNo:this.$mp.query.id
      }).then(res=>{
        this.info = res.data.OrderDetails[this.indexId];
      })
    },
    submitSerty(){
      if(this.type==1){
        var url='Order/ApplicationBarter'
      }else if(this.type==2){
        var url='Order/ApplicationReturn'
      }else{
        var url='Order/ApplicationRefund'
      }
      post(url,{
        UserId:wx.getStorageSync("userId"),
        Token:wx.getStorageSync("token"),
        OrderNo:this.$mp.query.id,
        OrderItemId:this.info.Id,
        RefundContent:this.RefundContent,
        RefundReasonId: this.RefundReasonId,
      }).then(res=>{
        if(res.code===0){
          wx.showToast({
            title:res.msg
          })
          setTimeout(()=>{
            uni.navigateBack();
          },1500)
        }
      })
    },
    goUrl(url){
      wx.navigateTo({
        url:url
      })
    },
  },
}
</script>

<style scoped lang='scss'>
  .shop{
    width:161rpx;height:161rpx;
  }
  .menu_item{
    border-bottom:1rpx solid #f5f5f5;
    padding:25rpx 0;
  }
  .sign{
    height:150rpx;width:100%;margin-top:20rpx;
  }
  .picbox{
    width:25%;
    box-sizing: border-box;
    display: flex;justify-content: center;
    margin-top:20rpx;
  }
  .pic_itim{
    width:144rpx;height:144rpx;
  }
  .sub_btn{
    background: #ff3333;color:#ffffff;width:100%;
    height:98rpx;line-height: 98rpx;text-align: center;
    position: fixed;bottom:0;
  }
  .sertype{
    padding-bottom:100rpx;
  }
</style>
