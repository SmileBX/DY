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
	@import './common/lz.css';
	@import './components/uParse/src/wxParse.css';
	page{
		background: #f5f5f5;
		height: 100%;
		font-size: 28upx;
		line-height: 1.8;
	}
	.uni-radio-input.uni-radio-input-checked{
		background-color: #FF3333!important;
		border-color: #FF3333!important;
	}
	uni-switch .uni-switch-input.uni-switch-input-checked{
		background-color: #FF3333!important;
		border-color: #FF3333!important;
	}
</style>
