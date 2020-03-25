<template>
	<!-- 车位 -->
	<view class="truckspace">
		<!-- 搜索 -->
		<view class="head">
			<view class="truck">
				<view class="searchbox">
					<view class="searchation">
						<view class="searchboxl">车位</view>
						<view class="searchboxr"><image class="uta" src="../../static/hpicons/uta.svg" mode=""></image></view>
					</view>
					<view class="searchico">
						<view class="searchpole"></view>
						<view class="searchimg"><image class="saarch" src="../../static/hpicons/search.svg"></image></view>
						<input class="input" type="text" value="" placeholder="输入名称"/>
					</view>
				</view>
				<view class="abrogate">取消</view>
			</view>
			<!-- 区域 -->
			<view class="areabox">
				<view class="area">
					<view class="">区域</view>
					<view class="areaimg"><image class="utas" src="../../static/hpicons/uta.svg"></image></view>
				</view>
				<view class="area">
					<view class="">价格</view>
					<view class="areaimg"><image class="utas" src="../../static/hpicons/uta.svg"></image></view>
				</view>
				<view class="area">
					<view class="">面积</view>
					<view class="areaimg"><image class="utas" src="../../static/hpicons/uta.svg"></image></view>
				</view>
			</view>
		</view>

		<!-- 列表 -->
		<view class="trucklist">
			<view class="truckac"></view>
			<view class="">
				<view class="listbox">
					<view class="listimg" @click="totruckspacedetails('/pages/homePage/truckspacedetails')">
						<!-- <image src="" mode=""></image> -->
					</view>
					<view class="listpt">
						<view class="listtitle">创新科技小区车位出售</view>
						<view class="listtitles">前进二路与流塘路交汇处</view>
						<view class="listplace">
							<view class="">14m <span>2</span></view>
							<view class="listpole"></view>
							<view class="">民治</view>
						</view>
						<view class="listprice">
							<view class="listm">
								<view class="selling"><span>¥</span>13万</view>
								<view class="original">¥15万</view>
							</view>
							<view class="listm rt">
								<view class="cash">返</view>
								<view class="cashm">¥2万</view>
							</view>
						</view>
					</view>
				</view>
				<view class="format"></view>
			</view>
			
			<view class="">
				<view class="listbox">
					<view class="listimg">
						<!-- <image src="" mode=""></image> -->
					</view>
					<view class="listpt">
						<view class="listtitle">创新科技小区车位出售</view>
						<view class="listtitles">前进二路与流塘路交汇处</view>
						<view class="listplace">
							<view class="">14m <span>2</span></view>
							<view class="listpole"></view>
							<view class="">民治</view>
						</view>
						<view class="listprice">
							<view class="listm">
								<view class="selling"><span>¥</span>13万</view>
								<view class="original">¥15万</view>
							</view>
							<view class="listm rt">
								<view class="cash">返</view>
								<view class="cashm">¥2万</view>
							</view>
						</view>
					</view>
				</view>
				<view class="format"></view>
			</view>
			
			
			<view class="">
				<view class="listbox">
					<view class="listimg">
						<!-- <image src="" mode=""></image> -->
					</view>
					<view class="listpt">
						<view class="listtitle">创新科技小区车位出售</view>
						<view class="listtitles">前进二路与流塘路交汇处</view>
						<view class="listplace">
							<view class="">14m <span>2</span></view>
							<view class="listpole"></view>
							<view class="">民治</view>
						</view>
						<view class="listprice">
							<view class="listm">
								<view class="selling"><span>¥</span>13万</view>
								<view class="original">¥15万</view>
							</view>
							<view class="listm rt">
								<view class="cash">返</view>
								<view class="cashm">¥2万</view>
							</view>
						</view>
					</view>
				</view>
				<view class="format"></view>
			</view>
			
			
			<view class="">
				<view class="listbox">
					<view class="listimg">
						<!-- <image src="" mode=""></image> -->
					</view>
					<view class="listpt">
						<view class="listtitle">创新科技小区车位出售</view>
						<view class="listtitles">前进二路与流塘路交汇处</view>
						<view class="listplace">
							<view class="">14m <span>2</span></view>
							<view class="listpole"></view>
							<view class="">民治</view>
						</view>
						<view class="listprice">
							<view class="listm">
								<view class="selling"><span>¥</span>13万</view>
								<view class="original">¥15万</view>
							</view>
							<view class="listm rt">
								<view class="cash">返</view>
								<view class="cashm">¥2万</view>
							</view>
						</view>
					</view>
				</view>
				<view class="format"></view>
			</view>
		</view>
	
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			totruckspacedetails(Url) {
				uni.navigateTo({
					url: Url
				})
			},
		}
	}
</script>

<style scoped>
	.truckspace{
		background: #FFFFFF;
	}
	.head{
		position:fixed; 
		width:100%;
		background: #FFFFFF; 
	}
	.truck{
		display: flex;
		/* margin-top: 61rpx;  相距于头部的距离*/  
		margin-left: 30rpx;
	}
	.searchbox{
		display: flex;
		width:606rpx;
		height:68rpx;
		border:1rpx solid rgba(204,204,204,1);
		border-radius:10rpx;
	}
	.searchation{
		display: flex;
	}
	.searchboxl{
		padding-top: 16rpx;
		padding-left: 34rpx;
		font-size:26rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:35rpx;
	}
	.searchboxr{
		width:17rpx;
		height:9rpx;
		margin-left: 16rpx;
	}
	.uta{
		height: 70rpx;
	}
	.searchico{
		display: flex;
	}
	.searchpole{
		margin-top: 20rpx;
		margin-left: 19rpx;
		width:1rpx;
		height:26rpx;
		border:2rpx solid rgba(236,236,236,1);
	}
	.searchimg{
		margin-left: 30rpx;
		width:27rpx;
		height:28rpx;
	}
	.saarch{
		height: 70rpx;
	}
	.input{
		font-size:26rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(204,204,204,1);
		line-height:35rpx;
		margin-left: 17rpx;
		margin-top: 16rpx;
	}
	.abrogate{
		font-size:28rpx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(51,51,51,1);
		line-height:35rpx;
		margin: 20rpx 0 0 30rpx;
	}
	/* 区域 */
	.areabox{
		margin-top: 40rpx;
		display: flex;
		justify-content: space-around;
		width: 100%;
		font-size:28rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(51,51,51,1);
		margin-bottom: 29rpx;
	}
	.area{
		display: flex;
	}
	.areaimg{
		margin-left: 11rpx;
		width:14rpx;
		height:9rpx;
	}
	.utas{
		height:60rpx;
	}
	/* 列表 */
	.trucklist{
		padding-top: 186rpx;
	}
	.truckac{
		width:100%;
		height:20rpx;
		background:rgba(242,242,242,1);
	}
	.listbox{
		/* margin: 20rpx 0 20rpx 31rpx; */
		display: flex;
		padding: 20rpx 30rpx;
	}
	.listimg{
		width:240rpx;
		height:240rpx;
		/* background:rgba(245,245,245,1); */
		background:#F48F18;
		border-radius:12rpx;
	}
	.listpt{
		padding-left:30rpx;
		width: 65%;
	}
	.listtitle{
		font-size:32rpx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.listtitles{
		font-size:26rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(153,153,153,1);
	}
	.listplace{
		display: flex;
		font-size:26rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(153,153,153,1);
		line-height:156rpx;
	}
	.listplace span{
		font-size:14rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(153,153,153,1);
	}
	.listpole{
		width:1rpx;
		height:26rpx;
		border:1rpx solid rgba(204,204,204,1);
		margin:15rpx 11rpx 0 11rpx;
	}
	.listprice{
		display: flex;
		justify-content: space-between;
	}
	.listm{
		display: flex;
	}
	.selling{
		font-size:32rpx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(255,51,51,1);
	}
	.selling span{
		font-size:20rpx;
	}
	.original{
		font-size:22rpx;
		font-family:PingFang;
		font-weight:500;
		text-decoration:line-through;
		color:rgba(153,153,153,1);
		margin: 15rpx 0 0 15rpx;
	}
	.rt{
		width:30%;
		height:42rpx;
		border:1rpx solid rgba(255,51,51,1);
		border-radius:4rpx;
	}
	.cash{
		width:38rpx;
		height:38rpx;
		background:rgba(255,51,51,1);
		border-radius:4rpx 0rpx 0rpx 4rpx;
		font-size:24rpx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(255,255,255,1);
		text-align: center;
	}
	.cashm{
		width:54rpx;
		height:21rpx;
		font-size:24rpx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(255,51,51,1);
		margin-left: 10rpx;
	}
	.format{
		/* width:690px; */
		height:1rpx;
		border:1rpx solid rgba(236,236,236,1);
		margin: 0 30rpx;
	}
		
	
</style>
