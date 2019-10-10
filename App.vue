<script>
	export default {
		onShow: function() {
			plus.navigator.setFullscreen(true)//全屏显示
			uni.setStorageSync("number",1);
			setInterval(function () {
				var number = uni.getStorageSync('number')
				if( number <= 0 ){
					uni.setStorageSync("number",1); 
					uni.reLaunch({
						url: '/pages/index/index'
					})
				}else{
					uni.setStorageSync("number",number - 1); 
				}
				console.log(uni.getStorageSync('number'))
			}, 1000*5*60);
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
