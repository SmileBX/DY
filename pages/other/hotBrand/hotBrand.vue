<template>
	<view class="hotBrand">
		<image src="/static/of/hot_bg.png" class="bg mt2"></image>
		<view class="list mt2">
			<view class="item flex" v-for="(item,key) in 5" :key="key">
				<view class="item_left">
					<image src="/static/of/4.png" class="img"></image>
					<image src="/static/icons/b1.png" class="tip"></image>
					<image src="/static/icons/b2.png" class="tip" style="display:none"></image>
					<image src="/static/icons/b3.png" class="tip" style="display:none"></image>
				</view>
				<view class="item_content flex1">
					<view class="uni-bold">奥迪A4 Avant先锋派</view>
					<view class="color_red mt1">￥13万<span class="line-thon ">指导价¥15万</span></view>
					<view class="flex mt1 item_bt justifyContentBetween">
						<view class="flex flag ">
							<span class="flag_pill">返</span>
							<span class="flag_mon color_red">￥2万</span>
						</view>
						<view class="qiang">马上抢</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
</script>

<style scoped lang="scss">
	.hotBrand{
		min-height: 100vh;
		background:#94aebe;
		padding:0 30upx 50upx 30upx;
		.bg{
			height:245upx;
		}
		.list{
			background: #ffffff;border-radius:15upx;padding:10upx 30upx;
			.item{
				padding:10upx 0;
				.item_left{
					width:200upx;height:200upx;position: relative;margin-right:10upx;
					.img{width:100%;height:100%;}
					.tip{
						position: absolute;top:0;left:0;
						width:70upx;height:96upx;
					}
				}
				.item_content{
					padding:10upx 0;
					.line-thon{
						color:#999!important;font-size:22upx;text-decoration: line-through;margin-left: 10upx;
					}
					.item_bt{
						width:100%;
						.qiang{
							background: #f00000;color:#ffffff;border-radius:50upx;font-size:22upx;padding:0 20upx;
						}
					}
				}
			}
		}
		.flag{
			font-size:20upx;height:40upx;box-sizing: border-box;
			.flag_pill{
				background: #f00000;color:#ffffff;line-height: 40upx;padding:0 15upx;height:40upx;
				border-radius: 5upx 0 0 5upx;
			}
			.flag_mon{
				line-height: 40upx;padding:0 10upx;height:40upx;border:1px solid red;
				border-radius: 0 5upx 5upx 0;
			}
		}
	}
</style>
