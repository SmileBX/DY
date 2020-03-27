<template>
  <div class="pageContent">
    <scroll-view scroll-y @scrolltolower="loadMore" style="height:100%;">
      <div class="cardList" v-if="hasData">
        <div
          class="item flex"
          v-for="(item,index) in cardList"
          :key="index"
          @click="selectCard(index)"
        >
          <div class="cardImg">
            <img :src="item.BankLogo" alt>
          </div>
          <div class="txtBox">
            <p class="title">{{item.BankName}}</p>
            <p class="type">
              <span @click.stop="DeleteBank(index,item.Id)">[解绑银行卡]</span>
            </p>
            <p class="number">
              <span class="xing6" v-for="(item2,index2) in item.cardNoArr" :key="index2">{{item2}}</span>
            </p>
          </div>
        </div>
      </div>
      <div v-else class="no_cardList flex flexColumn flexAlignCenter">
          <img src="/static/icons/nocr.png" alt="" class="no_c">
          <p class="mt2 cg">您还未添加过银行卡</p>
      </div>
      <div class="ftBtn" style="height:100upx" @click="addBankCard">
        <div class="inner fixed bm0">
          <div class="btns">
            <div class="btn center bg_ff952e color_fff">
              <img src="/static/icons/add.png" class="icon-add" alt>添加银行卡
            </div>
          </div>
        </div>
      </div>
    </scroll-view>
  </div>
</template>
<script>
import { post } from "@/common/util.js";
export default {
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
    this.initData();
    this.userId = uni.getStorageSync("userId");
    this.token = uni.getStorageSync("token");
    this.getBankList();
  },
  data() {
    return {
      curPage: "",
      userId: "",
      token: "",
      page: 1,
      pageSize: 10,
      count: 0,
      allPage: 0,
      isLoad: false,
      isOved: false,
      hasData:false,
      noDataIsShow: false,
      cardList: []
    };
  },
  methods: {
    setBarTitle() {
      uni.setNavigationBarTitle({
        title: "我的银行卡"
      });
    },
    initData() {
      this.curPage = "";
      this.userId = "";
      this.token = "";
      this.cardList = [];
    },
    selectCard(index) {
      //选择银行卡后跳转
      const selectMyCard = this.$store.state.selectMyCard;
      if (!selectMyCard.status) {
        return false;
      }
      let myCardInfo = {
        id: this.cardList[index].Id,
        bankLogo: this.cardList[index].BankLogo,
        bankCardName: this.cardList[index].BankName,
        bankCardNo: this.cardList[index].BankCardNo
      };
      this.$store.commit("update", { myCardInfo });
      uni.redirectTo({ url: selectMyCard.url });
    },
    addBankCard() {
      uni.navigateTo({
        url: "/pages/Wallet/bankAdd/bankAdd"
      });
    },
    getBankList() {
      let that = this;
      post(
        "Bank/BankList",
        {
          UserId: that.userId,
          Token: that.token,
        },
        that.curPage
      ).then(result => {
        if (result.code === 0) {
          if (result.data.length > 0) {
            this.hasData=true;
            that.cardList = [];
            result.data.forEach(item => {
              let cardNo = item.BankCardNo.replace(/\s/g, "").replace(
                /(\d{4})\d+(\d{4})$/,
                "**** **** **** $2"
              );
              console.log(cardNo);
              that.$set(item, "cardNoArr", cardNo.split(" "));
            });
            that.cardList = result.data;
          }else{
            this.hasData=false;
          }
        }
      });
    },
    DeleteBank(index, cardId) {
      let that = this;
      uni.showModal({
        title: '解绑银行卡',
        content: '是否确定解绑？',
          confirmColor:'#ff952e',
          cancelColor:'#999',
        success: (res)=>{
          if (res.confirm) {
            this.confirmDelete(index, cardId)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    confirmDelete(index, cardId){
      let that = this;
       post(
        "Bank/DeleteBank",
        {
          UserId: that.userId,
          Token: that.token,
          Id: cardId
        },
        that.curPage
      ).then(result => {
        if (result.code === 0) {
          uni.showToast({
            title: "解绑成功!",
            icon: "none",
            duration: 1500,
            success: function() {
              setTimeout(function() {
                that.cardList.splice(index, 1);
              }, 1500);
            }
          });
        }
      });
    },
    
  }
};
</script>
<style lang='scss' scoped>
.pageContent {
  height: calc(100vh - 20upx);
  background: #fff;
  position: relative;
  top: 20upx;
  overflow: hidden;
  overflow-y: auto;
}

.cardList {
  padding: 30upx;
}

.cardList .item {
  color: rgba(255, 255, 255, 0.8);
  height: 260upx;
  position: relative;
  padding: 40upx;
  box-sizing: border-box;
  margin-bottom: 30upx;
  background-image: -webkit-linear-gradient(left,#5da2d9,#3f69bd);
  border-radius: 16upx;
}

.cardList .item:last-child {
  margin-bottom: 0;
}

.cardList .item .bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.cardImg {
  width: 80upx;
  height: 80upx;
  border-radius: 50%;
  margin-right: 20upx;
  background: rgba(255, 255, 255, 1);
  position: relative;
}

.cardImg img {
  width: 60upx;
  height: 60upx;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  margin: 0 auto;
  margin-top: -30upx;
}

.item .cardImg,
.item .txtBox {
  position: relative;
  z-index: 3;
}

.txtBox .title {
  font-size: 36upx;
}

.txtBox .type {
  font-size: 24upx;
  color: #bee4f7;
}

.txtBox .number {
  line-height: 60upx;
  margin-top: 30upx;
}

.number .xing6 {
  font-size: 38upx;
  color: rgba(255, 255, 255, 1);
  display: inline-block;
  vertical-align: middle;
  margin-right: 50upx;
}

.number .xing6:last-child {
  margin-right: 0;
}

.number .num {
  font-size: 40upx;
}
.icon-add{
  width: 30upx;
  height: 30upx;
  margin-right: 10upx;
  vertical-align: middle;
}
.no_cardList{
  padding:200upx 0;
  .no_c{
    width:144upx;height:100upx;
  }
}
.bg_ff952e{
  background: #FF3333;
}
.btns{
	width: 100%;
	height: 88upx;
	position: fixed;
	bottom: 12upx;
}
.btns .btn{
	width: 690upx;
	margin: 0 auto;
	height: 88upx;
	border-radius: 12upx;
	line-height: 88upx;
	color: #fff;
}
</style>