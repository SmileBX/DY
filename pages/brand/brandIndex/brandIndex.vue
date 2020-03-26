<template>
	<view>
		<view class="BrandInfo" style="background-image: url(../../../static/icons/user_bg.png);">
			<!-- #ifdef MP-WEIXIN -->
			<view class="menubtn iconfont icon-aixin"></view>
			<button class="sharebtn" open-type="share"><view class="iconfont icon-fenxiang1"></view></button>
			<!-- #endif -->
			<view class="inner flex flex-start">
				<view class="logoBox">
					<image class="img" src="../../../static/of/yd.png" mode="widthFix"></image>
				</view>
				<view class="textbox">
					<view class="name">源氏木语</view>
					<view class="brand-desc">源氏木语专场-品牌钜惠</view>
				</view>
			</view>
		</view>
		<view class="baolist">
			<view class="combox">
				<view class="flex title justifyContentBetween">
					<view class="flex flexAlignEnd">
						<view class="name">商家力推</view>
					</view>
				</view>
				<view class="page-section HotsellList uni-bg-white uni-pd10 uni-mb10">
					<view class="uni-bd">
						<scroll-view class="scroll-view_H Hotsell-list" scroll-x="true" scroll-left="0">
							<view class="scroll-view-item_H" v-for="(item,index) in 6" :key="index" @click="goDetail(item.Id)">
								<view class="itembox">
									<view class="image-view">
										<image class="img" src="../../../static/of/3.png" mode="aspectFill"></image>
									</view>
									<view class="txtbox">
										<view class="txt uni-ellipsis">珍视明眼药水</view>
										<view class="uni-product-price">
											<text class="uni-product-price-original">￥299</text>
											<text class="uni-product-price-favour">￥399</text>
										</view>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
		</view>
		<view class="filter-Pro">
			<view class="filterMenu">
				<view class="menu flex flex-between center">
					<view class="item" :class="{'active':item.active}" @click="shiftFilterTab(index)" v-for="(item,index) in filterTab"
					 :key="index">{{item.name}}<text v-if="item.isSortorder" class="filterBtn" :class="{'upBtn':item.sortorder==1,'downBtn':item.sortorder==0}"></text></view>
					<view class="item">分类</view>
				</view>
			</view>
			<view class="uni-mt10">
				<view class="proList flex flexWrap justifyContentBetween">
					<view class="item" v-for="(item,index) in 6" :key="index">
						<image src="../../../static/of/4.png" class="item_img"></image>
						<view class="item_info flex flexColumn flexAlignCenter">
							<view class="item_title">超越极限音波拉皮-颈部</view>
							<view class="flex flexAlignEnd justifyContentBetween item_total">
								<view class="flex flexAlignEnd">
									<span class="item_price">￥980</span>
									<span class="item_market line-through">￥2980</span>
								</view>
								<view class="item_market">68人付款</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import "@/common/product.scss";
	export default {
		data() {
			return {
				filterTab: [{
						name: "默认",
						sortname: "m",
						isSortorder: false,
						active: true
					},
					{
						name: "价格",
						sortorder: "", //0：倒序；1:为顺序
						sortname: "j",
						isSortorder: true,
						active: false
					},
					{
						name: "销量",
						sortorder: "", //0：倒序；1:为顺序
						sortname: "s",
						isSortorder: true,
						active: false
					}
				],
			}
		},
		methods: {
			shiftFilterTab(index) {
				let _this = this;
				_this.filterTab.forEach(function(item, subIndex) {
					if (subIndex === index) {
						_this.$set(item, 'active', true);
						if (item.isSortorder) {
							if (item.sortorder == "") {
								_this.$set(item, 'sortorder', "1");
								return false;
							} else if (item.sortorder == "0") {
								_this.$set(item, 'sortorder', "1");
								return false;
							} else {
								_this.$set(item, 'sortorder', "0");
								return false;
							}
						}
					} else {
						_this.$set(item, 'active', false);
						_this.$set(item, 'sortorder', "");
						return false;
					}
				});
				_this.sortname = _this.filterTab[index].sortname;
				if (_this.filterTab[index].isSortorder) {
					_this.sortorder = _this.filterTab[index].sortorder;
				} else {
					_this.sortorder = "";
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	@import './style';
</style>
