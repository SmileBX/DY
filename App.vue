<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import './common/uni.css';
	@import './common/iconfont.css';
	@import './common/common.scss';
	page{
		background: #f5f5f5;
		height: 100%;
		font-size: 28upx;
		line-height: 1.8;
	}
	.uni-radio-input.uni-radio-input-checked{
		background-color: #cc9f68!important;
		border-color: #cc9f68!important;
	}
</style>
