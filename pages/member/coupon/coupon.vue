<template>
  <view class="ticket">
      <view class="tab flex">
        <view class="flex1 flexc" :class="{'active':tabIndex==index}" v-for="(item, index) in tabList" :key="index" @click="cliTab(index)">{{item}}</view>
        <span :style="'left:'+tabStyle+'upx'"></span>
      </view>
      <block v-if="hasData">
        <view class="list jus-b" v-for="(item,index) in datalist" :key="index">
          <view class="left">
            <view>{{item.Title}}</view>
            <span>有效期{{item.AddTime}}至{{item.EndTime}}</span>
            <view class="useinfo oneline" v-if="item.ScopeOfUse">{{item.ScopeOfUse}}</view>
            <view class="flexc" :class="tabIndex==0?'back_col':'use'">减满券</view>
          </view>
          <view class="right flexc" :class="tabIndex==0?'back_col':''">
            <view>
              <view>{{item.DiscountType==1?item.Denomination:item.Denomination*10}}<span>{{item.DiscountType==1?'元':'折'}}</span></view>
              <span>满{{item.MeetConditions}}元可使用</span>
            </view>
          </view>
        </view>
      </block>
      <noData :isShow="noDataIsShow"></noData>
      <view class="loading" v-if="hasData">
        <load-more :loadingType="loadingType"></load-more>
      </view>
      <view class="btn_de" @click="goUrl('/pages/myson/couponCenter/main')">领券中心</view>
  </view>
</template>

<script>
// import {post} from '@/utils'
// import noData from "@/components/noData"; //没有数据的通用提示
// import LoadMore from '@/components/load-more';
export default {
  data () {
    return {
      tabList:['未使用','已使用','已失效'],
      tabIndex:0,
      couponStatus:1,//0全部，1可用，2已使用，3已失效
      userId:"",
      token:"",
      hasData:false,
			noDataIsShow: false,//没有数据的提示是否显示
			page: 1,
      pageSize: 8,
			isLoad: false,
			isOved:false,       //显示已经到底了
			loadingType: 0, //0加载前，1加载中，2没有更多了
      datalist:{},
    }
  },
  computed: {
    tabStyle(){
      return ((750/this.tabList.length)*this.tabIndex)+(((750/this.tabList.length)-50)/2)
    }
  },
  onShow(){
    this.userId = wx.getStorageSync("userId")
    this.token = wx.getStorageSync("token")
    this.page=1;
    // this.CouponList()
  },
  // components: {
  //   noData,
		// LoadMore
  // },
  methods: {
    goUrl(url){
      wx.navigateTo({
        url:url
      })
    },
    cliTab(index){
      this.tabIndex = index;
      this.couponStatus=index+1;
      this.page=1;
      this.noDataIsShow=false;
      this.hasData=false;
      this.CouponList();
    },
    //我的优惠券
    CouponList(){
      post('User/CouponList',{
          UserId:this.userId,
          Token:this.token,
          Page:this.page,
          PageSize:this.pageSize,
          Status:this.couponStatus
      }).then(res=>{
        if(res.code==0){
          let _this = this;
          let len=res.data.length;
          if (len > 0) {
            this.hasData = true;
            this.noDataIsShow = false;
            res.data.map(item=>{
              item.AddTime=item.AddTime.split("T")[0];
              item.EndTime=item.EndTime.split("T")[0];
            })
          }
          if (len == 0&&this.page==1) {
            this.noDataIsShow = true;
            this.hasData = false;
          }
          if (this.page === 1) {
            this.datalist = res.data;
          }
          if (this.page > 1) {
            this.datalist = this.datalist.concat(
              res.data
            );
          }
          if (len < this.pageSize) {
            this.isLoad = false;
            this.loadingType = 2;
          } else {
            this.isLoad = true;
            this.loadingType = 0
          }
          
        }
      })
    },

  },
  onReachBottom: function() {
    if (this.isLoad) {
      this.loadingType = 1;
      this.isOved = false;
      this.page++;
      this.CouponList();
    } else {
      this.loadingType = 2;
      if (this.page > 1) {
        this.isOved = true;
      } else {
        this.isOved = false;
      }
    }
  }
}
</script>

<style scoped lang='scss'>
	@import '../../../common/lz.css';
.list::after{
  content:'';
  display: inline-block;
  position: absolute;
  top: -20upx;
  left: 450upx;
  width: 40upx;
  height: 40upx;
  border-radius: 50%;
  background-color: #f5f5f5;
}
.list::before{
  content:'';
  display: inline-block;
  position: absolute;
  bottom: -20upx;
  left: 450upx;
  width: 40upx;
  height: 40upx;
  border-radius: 50%;
  background-color: #f5f5f5;
}
.list{
  width: 690upx;
  height: 180upx;
  border-radius: 15upx;
  margin: 30upx;
  background-color: #fff;
  overflow: hidden;
  position: relative;
  .use{
    background-color: #d4d5d6!important
  }
  .left{
    width: 460upx;
    padding: 60upx 0 0 35upx;
    position: relative;
    span{
      font-size: 20upx;
      color: #999;
    }
    view{
      width: 128upx;
	    height: 40upx;
      border-radius: 0 0 24px 0;
      position: absolute;
      top: 0;
      left: 0;
      font-size: 24upx;
      color: #fff
    }
  }
  .right{
    width: 230upx;
    background-color: #d4d5d6;
    text-align: center;
    p{
      color: #fff;
      font-size: 56upx;
      font-weight: 900;
      span{
        font-size: 20upx
      }
    }
    span{
      font-size: 20upx;
      color: #fff;
    }
  }
}
.tab{
  position: relative;
  height: 92upx;
  background-color: #fff;
  position: relative;
  .active{
    color: #f00
  }
  span{
    position: absolute;
    bottom: 0;
    transition: all .2s;
    height: 5upx;
    width: 50upx;
    background-color: #f00
  }
}
.back_col{
  background-color: #f00!important;
}
.btn_de{
  width:100%;position: fixed;bottom:0;
  height:88upx;line-height: 88upx;background: #f00;
  color:#ffffff;text-align: center;
}
</style>
