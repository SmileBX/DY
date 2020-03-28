<template>
  <div class="page">
    <div class="weui-cells card__weui-cells">
      <div class="weui-cell" @click="shiftCardList">
        <img :src="bankLogo||'http://jyy.wtvxin.com/static/images/icons/bankcard.png'" class="cardpic" alt>
        <div class="weui-cell__bd" v-if="hasData">
          <p class="name">{{bankCardName}}</p>
          <p class="cardnnum">尾号{{bankCardNo}}储蓄卡</p>
        </div>
        <div class="weui-cell__bd" v-else>
          <p class="name">请选择银行卡</p>
        </div>
        <span class="icon-arrow arrow-right"></span>
      </div>
    </div>
    <div class="widthdrawBox bg_fff mt10">
      <div class="charge">
        <p class="apoint" style="padding-top:20upx;">提现金额</p>
        <p class="flex flexAlignBaseline" style="padding-top:10upx;padding-bottom:20upx;">
          <span class="fh">￥</span>
          <input v-model="amount" type="number" class="inputPrice flex1">
        </p>
      </div>
      <div class="tips" style="padding:20upx 0;border-top:1px solid #f2f2f2;">可提现余额：{{Wallet}}
        <span class="font22 cfc" @click="Allwithdraw">全部提现</span>
      </div>
    </div>
    <div class="btns">
      <div class="btn boxSize bg_ff952e color_fff center" @click="submitWithdraw">预计{{CashWithdrawalTime}}小时处理，确认提现</div>
    </div>
  </div>
</template>
<script>
import { post} from "@/common/util.js";
export default {
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
    this.Wallet = this.$store.state.Wallet;
    this.amount = '';
    //  console.log("余额"+this.Wallet);
    this.bankCardId = this.$store.state.myCardInfo.id;
    this.bankLogo = this.$store.state.myCardInfo.bankLogo;
    this.bankCardName = this.$store.state.myCardInfo.bankCardName;
    this.bankCardNo = this.$store.state.myCardInfo.bankCardNo.substring(
      this.$store.state.myCardInfo.bankCardNo.length - 4,
      this.$store.state.myCardInfo.bankCardNo.length
    );
    this.userId = uni.getStorageSync("userId");
    this.token = uni.getStorageSync("token");
    if (this.hasDefaultCard) {
      this.getBankList();
    }
     //获取提现的限制条件
    this.getLimitationOfWithdrawal()
     
  },
  data() {
    return {
      Wallet:0,
      curPage: "",
      userId: "",
      token: "",
      hasData: false,
      bankCardId: "",
      bankLogo: "",
      bankCardName: "中国银行",
      bankCardNo: "3790",
      hasDefaultCard: true,
      amount: "" ,//提现的金额
      MinWithdrawal:'',	//每次提现最小额度
      MaxWithdrawal:'',	//每次提现最大额度
      WithdrawalFee:'',	//提现手续费百分比（100为顶）
      CashWithdrawalTime:'',	//提现审核时间（单位：小时）
      DayWithdrawalMaxNum:'',	//会员每日提现最大次数
      DaySurplusNum:'',//当天剩余提现次数
    };
  },
  methods: {
    setBarTitle() {
      uni.setNavigationBarTitle({
        title: "提现选择"
      });
    },
    //获取提现限制条件
    getLimitationOfWithdrawal(){
      post('DrawMoney/LimitationOfWithdrawal',{
          UserId: this.userId,
          Token: this.token
      },this.curPage).then(res=>{
          // console.log(res)
          this.MinWithdrawal =res.data.MinWithdrawal //每次提现最小额度
          this.MaxWithdrawal =res.data.MaxWithdrawal  //每次提现最大额度
          this.WithdrawalFee =res.data.WithdrawalFee //提现手续费百分比（100为顶）
          this.CashWithdrawalTime =res.data.CashWithdrawalTime //提现审核时间（单位：小时）
          this.DayWithdrawalMaxNum =res.data.DayWithdrawalMaxNum	//会员每日提现最大次数
          this.DaySurplusNum = res.data.DaySurplusNum//当天剩余提现次数
      })
    },
    shiftCardList() {
      this.hasDefaultCard = false;
      this.$store.commit("setSelectMyCard", {
        url: "/pages/other/withdraw/withdraw",
        status: true
      });
      uni.navigateTo({ url: "/pages/Wallet/bankCard/bankCard" });
    },
    valOther() {
      let price = Number(this.amount);
      if (price < this.MinWithdrawal) {
        uni.showToast({
          title: `最低提现金额为${this.MinWithdrawal}元!`,
          icon: "none",
          duration: 1500
        });
        return false;
      }
      if (this.MaxWithdrawal>0 && price > this.MaxWithdrawal) {
        uni.showToast({
          title: `最高提现金额为${this.MaxWithdrawal}元!`,
          icon: "none",
          duration: 1500
        });
        return false;
      }
      if (!this.bankCardId) {
        uni.showToast({
          title: "请选择提现的银行卡!",
          icon: "none",
          duration: 1500
        });
        return false;
      }
      if (this.DaySurplusNum<=0) {
        uni.showToast({
          title: "今日提现次数已使用完！",
          icon: "none",
          duration: 1500
        });
        return false;
      }
      return true;
    },
    submitWithdraw() {
      //提现
      if (this.valOther()) {
        this.DrawMoneyApply();
      }
    },
   
    getBankList() {
      //获取银行卡
      let that = this;
      post(
        "Bank/BankList",
        {
          UserId: that.userId,
          Token: that.token
        },
        that.curPage
      ).then(result => {
        if (result.code === 0) {
          if (result.data.length > 0) {
            that.hasData = true
            that.bankCardId = result.data[0].Id;
            that.bankLogo = result.data[0].BankLogo;
            that.bankCardName = result.data[0].BankName;
            that.bankCardNo = result.data[0].BankCardNo.substring(
              result.data[0].BankCardNo.length - 4,
              result.data[0].BankCardNo.length
            );
          }
        }
      });
    },
    Allwithdraw(){
      this.amount=this.Wallet;
    },
    DrawMoneyApply() {
      //提现
      let that = this;
      post(
        "DrawMoney/memberDrawMoneyApply",
        {
          UserId: that.userId,
          Token: that.token,
          Amount: that.amount,
          BankId: that.bankCardId
        },
        that.curPage
      ).then(result => {
        if (result.code === 0) {
          //提现成功
          uni.showToast({
            title: "提现申请成功！",
            icon: "none",
            duration: 1500,
            success: function() {
              setTimeout(function() {
                uni.redirectTo({
                  url: "/pages/myson2/mywallet/main"
                });
              }, 1500);
            }
          });
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.cardpic {
  width: 58upx;
  height: 58upx;
}
.widthdrawBox{
  padding:0 30upx;
}
.card__weui-cells{
  .weui-cell{
    line-height: 1.5;
  }
}
.cardnnum{
  font-size: 24upx;
  color: #999;
}
.charge {
  .apoint {
    padding: 10upx 0;
    font-size: 30upx;
  }
  input {
    flex-grow: 1;
    margin-left: 20upx;
  }
}

.tips {
  color: #999;
}
.fh{
  font-size: 32upx;
}
.inputPrice {
  margin-left: 0 !important;
  font-size: 50upx;
}
.btns{
	height:88upx;line-height: 88upx;color:#ffffff;
  margin-top:60upx;
  .btn{
    border-radius: 16upx;margin:0 auto;
  }
  .bg_ff952e{
    background: #ff3333;
  }
}
</style>