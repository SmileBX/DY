<template>
  <div class="ticket pw3">
      <div class="bg_statu pp3 boxSize">
          <p class="order_statu mt1">{{info.StatusName}}</p>
          <!-- <p class="font22 mt1">剩余00:59:13自动取消订单</p> -->
      </div>
      <div class="or_list">
        <!-- <div class="pp2 flex justifyContentBetween  bg_fff bor_tit flexAlignEnd">
            <img src="http://jyy.wtvxin.com/static/images/icons/kc.png" alt="" class="kc_icon">
            <div class="flex flex1 flexAlignCenter">
                <div class="flex1">
                    <p class="cr">
                         [深圳市] 投递并签收，签收人：他人收 韵达，感谢使用 EMS经济快递，期待...
                    </p>
                    <p class=" cg mt1">2019-09-26 18:52:10</p>
                </div>
                <img src="http://jyy.wtvxin.com/static/images/icons/right.png" alt="" class="icon_right mr2">
            </div>
        </div> -->
        <div class="pp2 flex justifyContentBetween radius flexWrap flexAlignEnd bg_fff ">
            <img src="http://jyy.wtvxin.com/static/images/icons/lc.png" alt="" class="icon_lc">
            <div class="flex1">
                <p>
                    <span>{{info.ContactName}}</span><span class="mr5">{{info.Tel}}</span>
                </p>
                <p class="font24 cg mt1">{{info.Addr}}</p>
            </div>
        </div>
        <div class="or_item bg_fff radius">
            <div class="pp3 flex bor_tit" v-for="(item, index) in info.OrderDetails" :key="index">
                <img :src="item.PicNo" alt="" class="shop">
                <div class="flex1 flex  mr2">
                    <div class="or_left flex flexColumn justifyContentBetween">
                      <p>{{item.ProductName}}</p>
                      <p class="c-999">{{item.SpecText}}</p>
                      <p class="cr font30">￥{{item.ActualPay}}</p>
                    </div>
                    <div class="mr3 flex flexColumn flexAlignEnd">
                      <span>x{{item.Number}}</span>
                      <span class="tui_pill mt2" v-if="item.IsRefund!==0" @click="navigate('member/afterSaleType/afterSaleType',{indexId:index,id:info.OrderNumber})">退款</span>
                    </div>
                </div>
            </div>
            <div class="bor_tit pp2">
                <p class="flex justifyContentBetween">
                    <span>支付方式</span>
                    <span>在线支付</span>
                </p>
                <p class="flex justifyContentBetween mt1">
                    <span>商品总价</span>
                    <span>¥{{info.TotalAmount}}</span>
                </p>
                <p class="flex justifyContentBetween">
                    <span>优惠</span>
                    <span>¥{{info.DiscountedAmount}}</span>
                </p>
                <p class="flex justifyContentBetween mt1">
                    <span>运费</span>
                    <span>¥{{info.ExpressPrice}}</span>
                </p>
            </div>
            <div class="flex justifyContentBetween mt1 pp2">
                <span>实付</span>
                <span class="cr">¥{{info.Total}}</span>
            </div>
        </div>
      </div>
      <!---订单信息-->
      <div class="bg_fff mt2 pp3 bor_tit radius order_posi">
          <div class="">
              <span class="order_title">订单信息</span>
          </div>
          <div class="cg mt2 order_info font24">
              <p>订单编号：{{info.OrderNumber}} <span class="copy" @click="cop(info.OrderNumber)">复制</span> </p>
              <p>创建时间：{{info.OrderTime}}</p>
              <!-- <p>取消时间：2019-12-20 09:18:30</p>
              <p>发货时间：2019-12-20 09:18:30</p> -->
              <p>成交时间：{{info.Paytime}}</p>
          </div>
      </div>
      <div class="bg_fff pp2 flex justifyContentCenter flexAlignCenter radius mt2 order_posi">
          <img src="http://jyy.wtvxin.com/static/images/icons/kcf.png" alt="" class="icon_ch">
          <span>联系客服</span>
      </div>
      <div class="flex justifyContentEnd bg_fff mt2 bb_fix btnbox">
          <p class="btn btn_gray" v-if="info.StatusName=='已发货'||info.StatusName=='已收货'" @click="goUrl('/pages/member/logistics/logistics?orderNo='+info.OrderNumber)">查看物流</p>
          <p class="btn btn_gray" v-if="info.IsCancel==1" @click="chooseOrders(info.OrderNumber,1)">取消订单</p>
          <p class="btn btn_gray" v-if="info.IsDel==1" @click="chooseOrders(info.OrderNumber,2)">删除订单</p>
          <p class="btn btn_red" v-if="info.Ispay==1" @click="goUrl('/pages/pay/pay?orderNo='+info.OrderNumber)">立即支付</p>
          <p class="btn btn_red" v-if="info.IsConfirmReceipt==1" @click="chooseOrders(info.OrderNumber,3)">确认收货</p>
      </div>
  </div>
</template>

<script>
import {switchPath,post,navigate} from '@/common/util.js'
export default {

  data () {
    return {
      navigate,
      info:{},
    }
  },
  onShow(){
    this.getDetail()
  },
  methods: {
    getDetail(){
      post('Order/OrderDetails',{
        UserId:uni.getStorageSync("userId"),
        Token:uni.getStorageSync("token"),
        OrderNo:this.$mp.query.id
      }).then(res=>{
        this.info = res.data;
      })
    },
    //微信支付需参数
    async ConfirmWeiXinSmallPay(no){
      let result = await post('Order/ConfirmWeiXinSmallPay',{
        OrderNo:no,
        UserId:uni.getStorageSync("userId"),
        Token:uni.getStorageSync("token"),
        WxCode:uni.getStorageSync("wxCode"),
		WxOpenid:uni.getStorageSync("openId")
      })
      let payData=JSON.parse(result.data.JsParam)
      if(result.code==0){
        let _this=this;
        uni.requestPayment({
          timeStamp: payData.timeStamp,
          nonceStr: payData.nonceStr,
          package: payData.package,
          signType: payData.signType,
          paySign: payData.paySign,
          success(res) {
              uni.redirectTo({
                url: "/pages/goodsSon/paysuccess/main?OrderNo="+no
              })
            },
          fail(res) {
            console.log(res);
            uni.redirectTo({
              url: "/pages/goodsSon/paysuccess/main?OrderNo="+no+"&msg=fail"
            })
          }
        })
      }
    },
    chooseOrders(OrderNo,type){//确认取消
      if(type==1){
        var content="您确定要取消此订单吗？"
        var url="Order/CancelOrders"
      }else if(type==2){
        var content="您确定要删除此订单吗？"
        var url="Order/DeleteOrders"
      }else{
        var content="您确定收货成功吗？"
        var url="Order/ConfirmReceipt"
      }
      uni.showModal({
        title: '提示',
        cancelText:"再想想",
        content: content,
        success (res) {
          if (res.confirm) {
            post(url,{
              UserId:uni.getStorageSync("userId"),
              Token:uni.getStorageSync("token"),
              OrderNo:OrderNo,
            }).then(res=>{
              uni.showToast({
                icon:'none',
                title:res.msg
              })
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    cop(dataNo){
        uni.showToast({
          icon:'none',
          title: '复制成功',
        })
        uni.setClipboardData({
          data: dataNo,
          success: function (res) {
            uni.getClipboardData({ 
              success: function (res) {
                console.log(res.data) // data
              }
            })
          }
        })
    },
    goUrl(url){
      uni.navigateTo({
        url:url
      })
    },
  },
}
</script>

<style scoped lang='scss'>
  .ticket{
    padding-bottom:300upx;
  }
.back_col{
  background-color: #f00!important;
}
.or_list{
  position: relative;top:180upx;left:0;
  .shop_logo{
    width:40upx;height:36upx;
  }
  .shop{
    width:161upx;height:161upx;
  }
  .or_item{
    margin-top:20upx;
    &:first-child{
      margin-top:0;
    }
    .or_left{
      width:88%;
      height:98%;
    }
  }
}
  .bor_tit{
      border-bottom:1upx solid #f5f5f5;
    }
  .btn{
    width:50%;height:88upx;text-align: center;line-height: 88upx;
    margin-left:20upx;border-radius: 5upx;
    flex: 1;
  }
  .btn_gray{
    color:#858585;
  }
  .btn_red{
    color:#ffffff;background:#ff3333; 
  }
  .btnbox .btn:nth-child(2){
    color:#ffffff;background:#ff3333;
  }
  .order_title{
   border-left:4upx solid #f00;padding-left:20upx;
 }
 .order_info p{
   padding:5upx 0;
 }
 .copy{
   padding:0upx 20upx;border:1upx solid red;color:#f00;font-size:20upx;
   border-radius: 5upx;
 }

 .bg_statu{
   width:750upx;background: #ff3333;
   height:245upx;position: absolute;top:0;left:0;
   color:#ffffff;
 }
 .icon_lc{
   width:60upx;height:61upx;margin-right:20upx;
   margin-bottom:6upx;
 }
 .kc_icon{
   width:43upx;height:33upx;margin-right:20upx;
   margin-bottom:6upx;
 }
  .icon_ch{
    width:34upx;height:34upx;margin-right:15upx;
  }
  .btn_menu{
    height:80upx;
    width:50%;border-left:1px solid #f5f5f5;
    &:first-child{
      border-left:0;
    }
  }
  .radius{
    border-radius:15upx;
  }
  .tui_pill{
    width:86upx;font-size:22upx;padding:5upx 0;text-align: center;
    border:1upx solid #999999;color:#999999;border-radius: 10upx;
  }
  .bb_fix{
    position: fixed;width:100%;bottom:0;left:0;
  }
  .order_statu{
    font-size:38upx;
  }
  .order_posi{
    position: relative;top:180upx;left:0;
  }
</style>
