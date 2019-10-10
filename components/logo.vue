<template>
	<view class="logo" @click="goMerchant">
		<image :src="logo"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				logo: ""
			}
		},
		onLoad(){
			console.log(uni.getStorageSync('logo'))
			this.logo = uni.getStorageSync('logo')
		},
		methods: {
			goMerchant(){
				uni.navigateTo({
					url: `/pages/merchant/merchant`
				})
			}
		}
	}
</script>

<style lang='scss'>
.logo{
	width: 100%;
	padding: 10upx 0;
	image{
		width: 100%;
		height: 76upx;
	}
}
</style>
