<template>
    <view class="merchant">
		<view class="merchant-logo"><image :src="logo"></image></view>
		<view class="content">
			<rich-text :nodes="content"></rich-text>                 
		</view>
	</view>
</template>

<script>
	import { request } from '../../static/js/request.js'
	export default {
	    data() {
	       return{
			   logo: "",
			   content: ""
		   }
	    },
		onLoad(){
			this.logo = uni.getStorageSync('contextLogo');
			this.content = uni.getStorageSync('context');
		},
		onShow(){
			uni.setStorageSync("number",1);
		},
	    methods: {
	     
	    }
	}
</script>

<style lang='scss'>
	.merchant{
		padding: 100upx 90upx;
		.merchant-logo{
			margin-bottom: 50upx;
			text-align: center;
			image{
				width: 174upx;
				height: 165upx;
			}
		}
		.content{
			rich-text{
				font-size: 16upx;
				text-indent: 2em;
				margin-bottom: 20upx;
				line-height: 30upx;
			}
		}
	}
</style>