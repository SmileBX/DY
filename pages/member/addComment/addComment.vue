<template>
  <div class="foot_list">
      <div class="or_list mt2">
        <div class="or_item mt2">
            <div class="flex or_main bg_fff">
                <img :src="shopInfo.PicNo" alt="" class="shop">
                <div class="flex1 flex flexAlignCenter mr2">
                    <div class="or_left flex flexColumn justifyContentBetween">
                      <div>
                        <p>{{shopInfo.ProductName}}</p>
                        <p class="c-999">{{shopInfo.SpecText}}</p>
                        <p class="cr font30 mt3">￥{{shopInfo.ActualPay}}</p>
                      </div>
                    </div>
                </div>
            </div>
            <!--评分-->
            <div class="flex flexAlignCenter pp3 bg_fff">
              <span class="mb1">评分</span>
              <span class="ml1 flex">
                  <div v-for="(item, index) in 5" :key="index" @click="cliScore(index)">
                    <img src="http://jyy.wtvxin.com/static/images/icons/xh.png" alt="" v-if="score>index" class="xing">
                    <img src="http://jyy.wtvxin.com/static/images/icons/xg.png" alt="" v-else class="xing">
                  </div>
              </span>
              <span class="mb1">{{score==5?'非常满意':score==4?'满意':score==3?'一般':score==2?'差':'很差'}}</span>
            </div>
            <!--遇到的问题-->
            <!-- <div class="mt2">
                <p class="cg font24">请选择您遇到的问题</p>
                <div class="mt2 flex flexWrap">
                    <p v-for="(item,oll) in plist" :key="oll" class="pp_item" :class="{'active':oll==1}">{{item.name}}</p>
                </div>
            </div> -->
            <textarea cols="30" rows="10" class="com_text mt2 bg_fff" v-model="text" placeholder="填写您对商品的评价~"></textarea>
            <div class="p3 bg_fff" style="border-bottom:1upx solid #ededed">
            <!-- <div>上传图片（不超过5张）</div> -->
                <div class="fed_pic flex flexWrap">
                  <div v-for="(item,index) in imgList" :key="index" class="picbox">
                    <span class="" @click="deleteImg(index)">×</span>
                    <image :src="item" alt="" class="pic_itim"></image>
                  </div>
                  <div class="picbox upBtnImg" @click="changeImg()" v-if="imgList.length<4">
                    <img src="http://jyy.wtvxin.com/static/images/icons/add2.png" alt="" class="pic_itim">
                  </div>
                </div>
            </div>
            <div class="porela" @click="pub()">提交</div>
        </div>
      </div>
      
  </div>
</template>

<script>
import {switchPath,post} from '@/common/util.js'
import { pathToBase64, base64ToPath } from '@/common/image-tools.js';
export default {

  data () {
    return {
      // plist:[{id:1,name:'商品问题'},{id:1,name:'客服问题'},{id:1,name:'包装问题'},{id:1,name:'物流问题'},{id:1,name:'其他'}],
      score:5,
      shopInfo:{},
      text:'',
      imgList:[]
    }
  },
  onLoad(){
    this.imgList = []
  },
  onShow(){
    console.log(this.$mp.query) 
    this.getDetail()
  },
  watch: {
    imgList(e){
      console.log(e)
    }
  },
  methods: {
    async pub(){
      if(this.text){
		let imgList= await this.base64Img(this.imgList);
        post('Order/OrderComment',{
          UserId:uni.getStorageSync("userId"),
          Token:uni.getStorageSync("token"),
          OrderNo:this.$mp.query.id,
          CommentList:[{
            Id:this.$mp.query.detailId,
            Rank:this.score,
            ContentText:this.text,
            PicNo:JSON.stringify(imgList)
          }]
        }).then(res=>{
          if(res.code===0){
            uni.showToast({
              icon:'none',
              title:res.msg
            })
            setTimeout(() => {
              uni.navigateBack();
            }, 300);
          }
        })
      }else{
        uni.showToast({
          icon:'none',
          title:'您还没输入评论内容呢~'
        })
      }
    },
    deleteImg(index){
      this.imgList.splice(index,1)
    },
    changeImg(){
      let _this = this
      uni.chooseImage({
        count: 4-this.imgList.length,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {console.log(res.tempFilePaths)
          res.tempFilePaths.map(item=>{
			  _this.imgList = _this.imgList.concat(res.tempFilePaths);
          })
        }
      })
    },
	async base64Img(arr) {
		let base64Arr = [];
		for (let i = 0; i < arr.length; i += 1) {
			const res = await pathToBase64(arr[i]);
			base64Arr.push({
			  PicUrl: res
			});
		  }
		  return base64Arr;
	},
    cliScore(index){//评分
      this.score = index+1
    },
    getDetail(){
      post('Order/OrderDetails',{
        UserId:uni.getStorageSync("userId"),
        Token:uni.getStorageSync("token"),
        OrderNo:this.$mp.query.id,
      }).then(res=>{
        res.data.OrderDetails.forEach(item=>{
          if(item.Id==this.$mp.query.detailId){
            this.shopInfo = item
          }
        })
      })
    },
    goUrl(url,param){
      uni.navigateTo({
        url:url+'?id='+param
      })
    },

    
  },
}
</script>

<style scoped lang='scss'>
.or_list{
  .shop{
    width:161upx;height:161upx;
	margin-right: 20upx;
  }
  .or_item{
    margin-top:20upx;
    .or_left{
      height:100%;
    }
    .or_main{
      padding:20upx 30upx;
    }
  }
  .xing{
    width:42upx;height:40upx;
    margin-right:10upx;
  }
  .mb1{
    margin-bottom: 10upx;
  }
  
}
.pp_item{
  font-size:24upx;
  padding:8upx 20upx;
  border:1upx solid #ededed;border-radius: 10upx;
  margin-right:25upx;
  margin-top:10upx;
  &:nth-child(4n){
    margin-right: 0;
  }
  &.active{
    border:1upx solid #f00;color:#f00;
  }
}
.com_text{
  padding:20upx;height:200upx;width:100%;
}
.picbox{
    width:25%;
    box-sizing: border-box;
    display: flex;
	justify-content: center;
	flex-wrap: wrap;
    margin-top:20upx;
    position: relative;
    span{
      position: absolute;
      width: 32upx;
      height: 32upx;
      background-color: #ff3333;
      color: #fff;
      border-radius: 50%;
      top: -12upx;
      right: 0upx;
      // transform: rotate(45deg);
      // font-weight: 900;
      font-size: 34upx;
      line-height:24upx;
      text-align:center;
	  z-index: 99;
    }
  }
  .pic_itim{
    width:144upx;height:144upx;
  }
  .porela{
    width:690upx;
    margin:0 auto;background:#FF3333;color:#ffffff;
    height:88upx;line-height:88upx;text-align: center;border-radius:15upx;
    margin-top:80upx;
    // p{
    //   width:184upx;height:64upx;color:#444444;border:1upx solid #444444;
    //   border-radius: 10upx;text-align: center;line-height: 64upx;
    //   position: absolute;right:0;
    // }
  }

</style>
