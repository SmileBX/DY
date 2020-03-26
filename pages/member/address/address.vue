<template>
	<view>
		<!--没有地址-->
		<view class="flex flexColumn flexAlignCenter nosite" style="display:none">
			<image src="../../../static/my/site.png"></image>
			<view class="mt2 color_gray">还没有收货地址哦~</view>
			<span class="btn_add mt2">新建地址</span>
		</view>
		<!--else-->
		<view class="sitelist pw3">
			<view class="site_item mt2" v-for="(item,index) in 5" :key="index">
				<view class="flex justifyContentBetween">
					<span>陈洛浩</span>
					<span>13812345678</span>
				</view>
				<view class="font18">上海市浦东新区张江微电子港1号楼201室</view>
				<view class="flex mt2 flexAlignCenter" :class="index==0?'justifyContentBetween':'justifyContentEnd'">
					<view class="moren font18" v-if="index==0">默认</view>
					<view class="flex color_gray font18">
						<view class="flex flexAlignCenter mr2">
							<span class="iconfont icon-bianji mr1"></span>
							<view>编辑</view>
						</view>
						<view class="flex flexAlignCenter">
							<span class="iconfont icon-ziyuanxhdpi mr1"></span>
							<view>删除</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	@import './style'
</style>
