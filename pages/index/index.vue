<template>
    <view class="index">
		<view class="logo" @click="goMerchant">
			<image :src="logo"></image>
		</view>
        <view class="uni-padding-wrap">
            <view class="page-section swiper">
                <view class="page-section-spacing">
                    <swiper class="swiper" @change="swiperChange" :indicator-dots="indicatorDots">
                        <swiper-item :key="index" v-for="(item,index) in farmInfos">
                            <view class="swiper-item" @click="goDeatil(item)">
								<image :src="item.represent"></image>
								<view class="farm-msg">
									<view class="farm-top">
										<view class="img"><image :src="item.log" mode=""></image><text v-if="item.status==1"></text></view>
										<view class="name">{{item.name}}</view>
										<view class="tips">{{item.operatingYear}}年</view>
										<view class="tips">{{item.area}}亩</view>
									</view>
									<view class="address" v-if="item.city"><text></text>{{item.city}}</view>
									<!-- <view class="farm-bottom">
										
									</view> -->
								</view>
								<view class="farm-fenshu">
									<view class="youji" v-if="item.organicBatchCount > 0">{{item.organicScoreInt}}</view>
									<view class="lvse" v-if="item.onOrganicBatchCount > 0">{{item.onOrganicScoreInt}}</view>
								</view>
								<view class="farm-zuowu">
									<view class="zuowu-top">
										<view class="name"><text></text>可信作物</view>
										<view class="quanbu">全部 > </view>
									</view>
									<view class="zuowu-bottom">
										<view class="list" :key="index1" v-for="(item1,index1) in item.cropInfo">
											<view class="img"><image :src="item1.cropImg" mode=""></image></view>
											<view class="txt">{{item.cropName}}</view>
										</view>
									</view>
								</view>
							</view>
                        </swiper-item>
                    </swiper>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
	import { request } from '../../static/js/request.js'
	import Logo from '@/components/logo';
	export default {
	    data() {
	        return {
				logo: "",
				farmInfos: "",
				indicatorDots: true
	        }
	    },
		onLoad(){
			
			this.init()
		},
		onShow(){
			// var that = this
			// setInterval(function(){
			// 	var uuid = plus.device.uuid;
			// 	request('/pullulate/app/getFarms', 'post', {
			// 		 uuid: uuid
			// 	}).then(res => {
			// 		console.log(res)
			// 		that.farmInfos = res.objs.farmInfos
			// 	})
			// },60*60*1000*1)
		},
		onPullDownRefresh(){
			this.init()
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
	    methods: {
	        swiperChange(e) {
	           console.log(e.detail.current)
	        },
			goDeatil(item){
				uni.navigateTo({
					url: `/pages/detail/detail?farmId=${item.id}`
				})
			},
			goMerchant(){
				uni.navigateTo({
					url: `/pages/merchant/merchant`
				})
			},
			init(){
				var uuid = plus.device.uuid;
				request('/pullulate/app/getFarms', 'post', {
					 uuid: uuid
				}).then(res => {
					console.log(res)
					this.farmInfos = res.objs.farmInfos;
					this.logo = res.objs.pullulateDevice.logo;
					uni.setStorageSync('logo', res.objs.pullulateDevice.logo);
					uni.setStorageSync('context', res.objs.pullulateDevice.context);
					uni.setStorageSync('contextLogo', res.objs.pullulateDevice.contextLogo);
				})
			}
	    }
	}
</script>

<style lang='scss'>
	@import "../../static/css/index.scss";
</style>