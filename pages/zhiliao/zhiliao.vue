<template>
    <view class="zhiliao">
		<view class="zhiliao-logo"><image src="/static/images/zhiliao-logo.png"></image></view>
		<view class="zhiliao-txt">可信农产品信用评价体系——知了信用</view>
		<view class="content">
			<view class="youji"><image src="/static/images/youji-jieshao.png" mode=""></image></view>
			<view class="lvse"><image src="/static/images/lvse-jieshao.png" mode=""></image></view>
		</view>
		<view class="tips">* 数据提供与认证服务源于可信农场</view>
		<view class="more" @click="goKexin">了解更多</view>
	</view>
</template>

<script>
	import { request } from '../../static/js/request.js'
	export default {
	    data() {
	       return {
	       	name: ""
	       }
	    },
		onShow(){
			uni.setStorageSync("number",1);
		},
	    methods: {
			goKexin(){
				uni.setStorageSync("number",1);
				uni.navigateTo({
					url: `/pages/kexin/kexin`
				})
			}
	    }
	}
</script>

<style lang='scss'>
	.zhiliao{
		padding:20upx 76upx 60upx;
		background: #f7f7f7;
		.zhiliao-logo{
			text-align: center;
			image{
				width: 155upx;
				height: 156upx;
			}
		}
		.zhiliao-txt{
			font-size: 24upx;
			text-align: center;
			margin-bottom: 20upx;
		}
		.content{
			.youji{
				text-align: center;
				image{
					width: 646upx;
					height: 320upx;
				}
			}
			.lvse{
				text-align: center;
				image{
					width: 646upx;
					height: 320upx;
				}
			}
		}
		.tips{
			font-size: 15upx;
			color: #939393;
			text-align: center;
			margin-bottom: 10upx;
		}
		.more{
			text-align: center;
			font-size: 15upx;
			color: #69BB19;
		}
	}
</style>