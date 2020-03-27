<template>
  <view class="sertype">
      <view class="mt2 bg_fff pp3 flex justifyContentBetween">
          <image :src="info.PicNo" alt="" class="shop"></image>
          <view class="flex1 mr2">
              <view>{{info.ProductName}}</view>
              <view class="cg font24 mt1">{{info.SpecText}}</view>
          </view>
      </view>
      <view class="pw3 mt2 bg_fff">
          <view class="menu_item flex justifyContentBetween flexAlignCenter" 
		  @click="goUrl('/pages/myson/sertydetail/main?indexId='+indexId+'&id='+OrderNumber+'&type=1')">
              <view class="flex flexAlignCenter">
                  <image src="http://jyy.wtvxin.com/static/images/icons/huan.png" alt="" class="huan"></image>
                  <view class="mr2">申请换货</view>
              </view>
               <span class="iconfont icon-arrow_r"></span>
          </view>
          <view class="menu_item flex justifyContentBetween flexAlignCenter" 
		  @click="goUrl('/pages/myson/sertydetail/main?indexId='+indexId+'&id='+OrderNumber+'&type=2')">
              <view class="flex flexAlignCenter">
                  <image src="http://jyy.wtvxin.com/static/images/icons/tui.png" alt="" class="huan"></image>
                  <view class="mr2">申请退货退款</view>
              </view>
             <span class="iconfont icon-arrow_r"></span>
          </view>
          <view class="menu_item flex justifyContentBetween flexAlignCenter" 
		  @click="goUrl('/pages/myson/sertydetail/main?indexId='+indexId+'&id='+OrderNumber+'&type=3')">
              <view class="flex flexAlignCenter">
                  <image src="http://jyy.wtvxin.com/static/images/icons/tuiq.png" alt="" class="huan"></image>
                  <view class="mr2">仅退款（无需退货）</view>
              </view>
               <span class="iconfont icon-arrow_r"></span>
          </view>
      </view>
  </view>
</template>

<script>
// import {switchPath,post} from '@/utils/common.js'
export default {

  data () {
    return {
      indexId:0,
      OrderNumber:"",
      info:{}
    }
  },
 
  onShow(){
    this.indexId=this.$mp.query.indexId
    this.OrderNumber=this.$mp.query.id
    this.getDetail();
  },
  methods: {
    getDetail(){
      post('Order/OrderDetails',{
        UserId:wx.getStorageSync("userId"),
        Token:wx.getStorageSync("token"),
        OrderNo:this.$mp.query.id
      }).then(res=>{
        this.info = res.data.OrderDetails[this.indexId];
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
    width:161upx;height:161upx;
  }
  .huan{
    width:42upx;height:40upx;
  }
  .menu_item{
    border-bottom:1upx solid #f5f5f5;
    padding:30upx 0;
  }
</style>
