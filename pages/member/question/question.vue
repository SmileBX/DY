<template>
	<view class="question">
		<view class="qu_list">
			<view class="qu_item" v-for="(item,index) in 3" :key="index">
				<view class="flex flexAlignCenter item_head bg_fff">
					<view class="title flex flexAlignCenter flex1">
						<span class="spill">{{index+1}}</span>
						<view>订单什么时候发货</view>
					</view>
					<span class="iconfont icon-iconset0418" :class="index==2?'icon-arrow_r':''"></span>
				</view>
				<view class="content">这个是内容详情飞飞说法发生法发飞洒发顺丰飞洒发发发生发生发生法发撒噶沙司搞撒嘎嘎啊傻瓜</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	@import "./style";
</style>
