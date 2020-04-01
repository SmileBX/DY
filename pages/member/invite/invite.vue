<template>
  <view class="invite bg_fff" style="padding-bottom: 30upx;">
	  <view id="bb_canvas">
		  <view class="inn_bg ">
			  <image src="http://jyy.wtvxin.com/static/images/icons/inn.png" alt="" class=" invite"></image>
		  </view>
		  <view class=" flex bg_fff pp3 flexAlignCenter">
			  <view class=" flex flexColumn flex1 justifyContentStart">
				  <view class=" flex flexAlignCenter">
					  <image :src="Avatar" alt="" class="ava mr2"></image>
					  <view class="mr2" style="margin-left:20upx;">
						  <view>{{tel}}</view>
						  <!-- #ifdef H5 -->
						  <input type="text" class="font20 yy_ma mt1" @focus="blur()" :disabled="disabled" 
						   v-model="info.ReferralCode" style="opacity: 0;position: fixed;top: -10000px;">
						  <!-- #endif -->
						  <view class="font20 yy_ma mt1" @click="copybtn()">邀请码：{{info.ReferralCode}}</view>
					  </view>
				  </view>
			  </view>
			  <image :src="info.InviteQRcode" alt="" class="code_img"></image>
		  </view>
	  </view>
	  <view class="yy_scan font30 " @click="showShare">点击分享</view>
      <!--分享-->
      <view class="mask" v-if="isShowShare" @click="cancelShare"></view>
      <view class="modal_mask flex justifyContentAround pp3" v-if="isShowShare">
		  <!-- #ifdef MP-WEIXIN-->
          <button open-type="share" class="flex flexColumn flexAlignCenter">
              <image src="http://jyy.wtvxin.com/static/images/icons/vy.png" alt="" class="circle_img"></image>
              <view class="mt1 flex1 font18">分享微信好友</view>
          </button>
		  <!-- #endif -->
          <view class="flex flexColumn flexAlignCenter" @click="saveImg">
              <image src="http://jyy.wtvxin.com/static/images/icons/quan.png" alt="" class="circle_img"></image>
              <view class="mt1 flex1 font18">分享到朋友圈</view>
          </view>
      </view>
      <!-- 保存海报 -->
      <view class="mask" v-if="showImg"></view>
	  <!-- #ifdef MP-WEIXIN-->
      <view class="imgbox" v-if="showImg">
        <canvas canvas-id="myCanvas" class="share-canvas" v-if="!hasimg"></canvas>
        <image :src="saveImgurl" alt="" v-else></image>
      </view>
	  <!-- #endif -->
	 <!-- #ifdef H5-->
	  <view class="imgbox" v-if="showImg">
	    <image :src="shareImgUrl" alt=""></image>
	  </view>
	  <!-- #endif -->
	  
	   <!-- #ifdef H5-->
	   <view class="saveBtn" v-if="showImg" @click="H5share">长按二维码保存</view>
	   <!-- #endif -->
	   <!-- #ifdef MP-WEIXIN-->
	   <view class="saveBtn" v-if="showImg" @click="Wxshare">保存相册分享到朋友圈</view>
	   <!-- #endif -->
  </view>
</template>

<script>
import {post} from '@/common/util.js'
 //#ifdef H5
import html2canvas from 'html2canvas';
//#endif
export default {
  data () {
    return {
      userId:"",
      token:"",
      tel:"",
      Avatar:"",
      info:{},
      isShowShare:false,
      showImg:false,
      bgurl:"",
      codeurl:"",
      avaurl:"",
      hasimg:false,
      saveImgurl:"",
	  shareImgUrl:'',//h5分享好友图片
	  disabled: false
    }
  },

  onLoad(){
    
  },
  onShow(){
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.hasimg=false;
    this.showImg=false;
    this.isShowShare=false;
    this.InviteFriends();
    this.GetCenterInfo();
  },

  methods: {
    showShare(){
      this.isShowShare=true;
    },
    cancelShare(){
      this.isShowShare=false;
    },
    saveImg(){
      this.showImg=true
      this.isShowShare=false
	  //#ifdef MP-WEIXIN
	  let tempTimeOut = setTimeout(()=>{
		  this.drawCanvas()
		  clearTimeout(tempTimeOut)
	  },100)
      //#endif
	  //#ifdef H5
	  html2canvas(document.getElementById("bb_canvas"), {
	  	allowTaint: true,
	  	taintTest: false,
	  	useCORS: true,
	  }).then((canvas) => {
	  		let shareImgUrl = canvas.toDataURL("image/png");//canvas画布导出图片地址
	  		this.shareImgUrl = shareImgUrl;
	  });
	  //#endif
    },
	blur() {
		this.disabled = true;
	},
	copybtn() {
		// #ifdef  H5
		let url = document.getElementsByTagName("input")[0];
		url.select(); // 选择对象
		document.execCommand("Copy");
		uni.showToast({
			icon: "none",
			title: "复制成功"
		})
		// #endif
		// #ifdef  MP-WEIXIN
		let _this = this;
		uni.setClipboardData({
			data: _this.info.ReferralCode,
			success: function() {
				uni.showToast({
					icon: 'none',
					title: "复制成功"
				})
			}
		});
		// #endif
	},
	H5share() {
		uni.showToast({
			icon: "none",
			title: "请长按保存图片"
		})
	},
	Wxshare() {
			let _this = this
			let aa = wx.getFileSystemManager();
			 aa.writeFile({
			   filePath:wx.env.USER_DATA_PATH+'/test.png',
			   data: _this.qrimg.slice(22),
			   encoding:'base64',
			   success: res => {
			     wx.saveImageToPhotosAlbum({
			       filePath: wx.env.USER_DATA_PATH + '/test.png',
			       success: function (res) {
			         wx.showToast({
			           title: '保存成功',
			         })
			       },
			       fail: function (err) {
			         //需要用户授权设置
					if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
						console.log('用户一开始拒绝了，我们想再次发起授权')
						// 用户授权设置
						wx.showModal({
							title: '提示',
							content: '需要您授权保存相册',
							showCancel: false,
							success:modalSuccess=>{
							  wx.openSetting({
								success(settingdata) {
								  console.log("settingdata", settingdata)
								  if (settingdata.authSetting['scope.writePhotosAlbum']) {
									wx.showModal({
									  title: '提示',
									  content: '获取权限成功,再次点击图片即可保存',
									  showCancel: false,
									})
								  } else {
									wx.showModal({
									  title: '提示',
									  content: '获取权限失败，将无法保存到相册哦~',
									  showCancel: false,
									})
								  }
								},
								fail(failData) {
								  console.log("failData",failData)
								},
								complete(finishData) {
								  console.log("finishData", finishData)
								}
							  })
							}
						  })
			       }
			     
				    }
				 })
			     console.log(res)
			   }, fail: err => {
			     console.log(err)
			   }
			 })
		},
	drawCanvas() {
      if(!this.hasimg){
        const ctx = wx.createCanvasContext('myCanvas');
        //背景图片
        var codeurl = this.codeurl
        var bgurl = this.bgurl
        var avaurl = this.avaurl
        var tel=this.tel
        var code="邀请码："+this.info.ReferralCode
        //画布背景填色
        ctx.setFillStyle('#ffffff')
        ctx.fillRect(0, 0, 300, 500);
        ctx.setFillStyle('#5A4ABA')
        ctx.fillRect(0, 0, 300, 32);
        //图片
        ctx.drawImage(bgurl, 0, 32, 300,348);
        // ctx.drawImage(avaurl, 12, 410, 50,50); //头像没有路径
		ctx.rect(200, 400, 64,64)
		ctx.stroke()
        ctx.drawImage(codeurl, 200, 400, 64,64);
        //说明文字
        ctx.setFontSize(12)
        ctx.setFillStyle('#333333')
        ctx.fillText(tel, 80, 420)
        ctx.setFontSize(9)
		ctx.setFillStyle('#5A4ABA')
		this.drawRoundedRect(ctx,"#7364ca","#7364ca",74,435,90,18,9);
        ctx.setFillStyle('#ffffff')
        ctx.fillText(code, 84, 447.5)
        ctx.draw()
      }
    },
    savebtn(){
      var _this=this
      wx.canvasToTempFilePath({     //将canvas生成图片
        canvasId: 'myCanvas',
        x: 0,
        y: 0,
        width: 256,
        height: 403,
        destWidth: 512,     //截取canvas的宽度
        destHeight: 806,   //截取canvas的高度
        success: function (res) {console.log(res)
          _this.hasimg=true
          _this.saveImgurl=res.tempFilePath;console.log( _this.saveImgurl)
          wx.saveImageToPhotosAlbum({  //保存图片到相册
            filePath: res.tempFilePath,
            success: function () {
              wx.showToast({
                title: "图片保存成功！",
                duration: 2000
              })
              setTimeout(() => {
                wx.navigateBack({})
              }, 2000);
            }
          })
        },
      })
    },
    roundedRect(ctx,x,y,width,height,radius){
        if(width <= 0 || height <= 0){
            ctx.arc(x,y,radius,0,Math.PI*2);
            return;
        }
        ctx.moveTo(x+radius,y);
        ctx.arcTo(x+width,y,x+width,y+height,radius);
        ctx.arcTo(x+width,y+height,x,y+height,radius);
        ctx.arcTo(x,y+height,x,y,radius);
        ctx.arcTo(x,y,x+radius,y,radius);
    },
    drawRoundedRect(ctx,strokeStyle,fillStyle,x,y,width,height,radius){
        ctx.beginPath();
        this.roundedRect(ctx,x,y,width,height,radius);
        ctx.strokeStyle = strokeStyle;
        ctx.fillStyle = fillStyle;
        ctx.stroke();
        ctx.fill();
    },
    GetCenterInfo(){
      post('User/GetCenterInfo',{
        UserId:this.userId,
        Token:this.token
      }).then(res=>{
        this.tel = res.data.Mobile;
        this.Avatar=res.data.Avatar
        var _this=this
         wx.getImageInfo({
            src: "http://jyy.wtvxin.com/static/images/icons/inn.png",//服务器返回的图片地址 
            success: function (res) {
            //res.path是网络图片的本地地址
            _this.bgurl = res.path;
            },
            fail: function (err) {
            //失败回调
            }
        });
        wx.getImageInfo({
            src: this.Avatar,//服务器返回的图片地址 
            success: function (res) {
            //res.path是网络图片的本地地址
            _this.avaurl = res.path;
            },
            fail: function (err) {
            //失败回调
            }
        });
      })
    },
    InviteFriends(){
      post('User/InviteFriends',{
        UserId:this.userId,
        Token:this.token
      }).then(res=>{
        this.info=res.data;
        var _this=this
        wx.getImageInfo({
            src: this.info.InviteQRcode,//服务器返回的图片地址 
            success: function (res) {
            //res.path是网络图片的本地地址
            _this.codeurl = res.path;
            },
            fail: function (err) {
            //失败回调
            }
        });
      })
    },
    copy(str){
      wx.showModal({
        title:'复制邀请码？',
        content:str,
        success(res){
          if(res.confirm){
           wx.setClipboardData({
              data: str,
              success (res) {
              
              }
            })
          }
        }
      })
    },

  },
  onShareAppMessage: function() {
    return {
      title: "大单易拼", //转发页面的标题
      path: '/pages/index/main?shareid='+this.info.ReferralCode
    }
  }
}
</script>

<style scoped lang='scss'>
  .inn_bg{
    width:750upx;height:940upx;
    background-image: linear-gradient(#5645b7, #7364ca);
    position: relative;
    .invite{
      width:750upx;top:100upx;height:auto;
      position: absolute;bottom:0;left:0;
    }
  }
  .ava{
    width:100upx;height:100upx;
	margin:0
  }
  .code_img{
    width:160upx;height:160upx;
  }
  .yy_ma{
    background: #7364ca;padding:2upx 15upx;border-radius: 20upx;
	font-size:24upx;
    color:#ffffff;
  }
  .yy_scan{
    background: #7364ca;color:#ffffff;border-radius: 30upx;
    width:280upx;margin-left:30upx;
    padding:5upx 0;text-align: center;
    display: inline-block;
  }
  .yy_scan_save{
	  background: #7364ca;color:#ffffff;border-radius: 30upx;
	  width:560upx;margin:50upx auto;
	  padding:5upx 0;text-align: center;
	  display:block;
  }
  .modal_mask{
    position: fixed;
    height:200upx;
	z-index:30;width:100%;
    background: #ffffff;
    bottom:0;
    .circle_img{
      width:96upx;height:96upx;
    }
    button{
      margin: 0;
      padding: 0;
      border: none;
      display: block;
      background: #fff;
      line-height:1.3;
      p{
        font-size: 28upx;
      }
      img{
        display: block;
        margin:0 auto;
        width:96upx;height:96upx;
        margin-bottom: 10upx
      }
    }
    button::after {
      border: 0;
    }
  }
.saveBtn{
  width: 100%;
  position: fixed;
  bottom: 0;
  height: 88upx;
  line-height: 88upx;
  background: #ff3333;
  color: #fff;
  text-align: center;
  z-index: 998;
}
.imgbox{
  width: 600upx;
  height:1000upx;
  position: fixed;
  top: 50%;
  left: 50%;border-radius: 15upx;
  transform: translate(-50%,-50%);
  z-index: 10;
  background: #fff;
  .share-canvas{
    width: 100%;
    height: 100%;
  }
  img{
    width: 100%;
    height: 100%;
  }
}
.emptybox{
	display: flex;flex-direction: column;
	justify-content: space-between;
	align-items: center;
	image{
		width:200upx;height:200upx;
	}
}
</style>

