<template>
	<view>
		<view class="brand_rec">
			<scroll-view class="scroll-view_H Hotsell-list" scroll-x="true" scroll-left="0">
				<view class="scroll-view-item_H" v-for="(item,index) in 6" :key="index">
					<view class="itembox">
						<view class="image-view">
							<image class="img" src="../../../static/of/3.png" mode="aspectFill"></image>
						</view>
						<view class="txtbox">
							<view class="brandlogo">
								<image class="img" src="../../../static/of/2.png" mode="aspectFit"></image>
								<view class="name uni-ellipsis">佳兆业</view>
							</view>
							<view class="txt_1 uni-ellipsis">低至6.8折</view>
							<view class="txt_2 uni-ellipsis">佳兆业房产特惠</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="hot uni-pd10">
			<view class="combox">
				<view class="flex title justifyContentBetween">
					<view class="flex flexAlignEnd">
						<view class="name">品类特惠</view>
						<view class="subtitle">全场4折封顶</view>
					</view>
				</view>
				<view class="list flex justifyContentBetween">
					<view class="item" v-for="(item,index) in 3" :key="index">
						<view class="itembox">
							<view class="image-view">
								<image class="img" src="../../../static/of/3.png" mode="aspectFill"></image>
							</view>
							<view class="txtbox">
								<view class="txt uni-ellipsis">珍视明眼药水</view>
								<view class="uni-product-price">
									<text class="uni-product-price-original"><text class="fz12">￥</text>2万(补贴)</text>
									<text class="uni-product-price-favour">￥299万</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="levelPanel">
			<view class="list">
				<view class="item flex" v-for="(item,index) in 5" :key="index">
					<view class="item_left">
						<image src="../../../static/of/4.png" class="img"></image>
					</view>
					<view class="item_content flex1">
						<view class="uni-bold uni-ellipsis">华侨城创想大厦</view>
						<view class="desc fz12 color_gray">
							3-4室|100-130㎡|南山
						</view>
						<view class="color_red"><text class="fz12">￥</text>3万(补贴)<span class="line-thon">¥150万</span></view>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="scss">
	@import './style';
</style>
