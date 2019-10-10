<template>
    <view class="history">
		<view class="history-msg">
			<view class="list-wrap" @click="goHistory">
				<view class="list-left">
					<view class="img"><image :src="batchInfo.img" mode=""></image></view>
				</view>
				<view class="list-center">
					<view class="name">{{batchInfo.cropName}}</view>
					<view class="txt">{{batchInfo.variety}}</view>
					<view class="pici">{{batchInfo.coteName}}</view>
					<view class="time">{{batchInfo.createTimeStr}}批次</view>
				</view>
				<view class="list-right" v-if="batchInfo.source < 60">
					<view class="fenshu fenshu1" >{{batchInfo.source}}<text>分</text></view>
					<view class="txt">信用极差</view>
				</view>
				<view class="list-right" v-else-if="batchInfo.source >= 60 && batchInfo.source <= 79">
					<view class="fenshu fenshu2" >{{batchInfo.source}}<text>分</text></view>
					<view class="txt">信用优秀</view>
				</view>
				<view class="list-right" v-else-if="batchInfo.source >= 80 && batchInfo.source <= 89">
					<view class="fenshu fenshu3">{{batchInfo.source}}<text>分</text></view>
					<view class="txt">信用一般</view>
				</view>
				<view class="list-right" v-else-if="batchInfo.source >= 90 && batchInfo.source <= 100">
					<view class="fenshu fenshu4" >{{batchInfo.source}}<text>分</text></view>
					<view class="txt">信用极佳</view>
				</view>
				<view class="list-xinyu" @click.stop="goZhiliao">
					<view class="xinyu-youji" v-if="batchInfo.organic > 0">
						<view v-if="batchInfo.source >= 60 && batchInfo.source <= 79"><text></text></view>
						<view v-else-if="batchInfo.source >= 80 && batchInfo.source <= 89"><text></text><text></text></view>
						<view v-else-if="batchInfo.source >= 90 && batchInfo.source <= 100"><text></text><text></text><text></text></view>
					</view>
					<view class="xinyu-lvse" v-if="batchInfo.noOrganic > 0">
						<view v-if="batchInfo.source >= 60 && batchInfo.source <= 79"><text></text></view>
						<view v-else-if="batchInfo.source >= 80 && batchInfo.source <= 89"><text></text><text></text></view>
						<view v-else-if="batchInfo.source >= 90 && batchInfo.source <= 100"><text></text><text></text><text></text></view>
					</view>
				</view>
			</view>
		</view>
		<view class="history-content">
			<view class="title">
				<text :class="{'cur':tab==1}" @click="tab=1">农事记录</text>
				<text :class="{'cur':tab==2}" @click="tab=2">检测报告</text>
			</view>
			<view class="content">
				<view class="jilu" v-if="tab==1">
					<view class="list" v-if="item.workName != '采收'"  v-for="(item,index) in batchInfo.batchInfoTakes" :key="index">
					
						<view class="time">
							<view class="year">{{item.year}}</view>
							<view class="mounth">{{item.moonDay}}</view>
						</view>
						
						<view class="yuan"></view>
						<view class="msg">
							<view class="txt">{{item.workName}}</view>
							<view class="img"><image :src="item1" mode="" v-if="index1 < 3" v-for="(item1,index1) in item.imgs" :key="index1" @click="imgPre(item)"></image></view>
						</view>
						<view class="line" v-if="index != batchInfo.batchInfoTakes.length-1"></view>
						
					</view>
				</view>
				<view class="baogao" v-else-if="tab==2">
					<swiper class="swiper" :indicator-dots="indicatorDots">
						<swiper-item v-for="(item) in batchReports" :key="item">
							<view class="swiper-item"><image :src="item.img" mode=""></image></view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { request } from '../../static/js/request.js'
	export default {
	    data() {
	        return {
				tab: 1,
				batchInfo: "",
				batchReports: "",
				indicatorDots: true
	        }
	    },
		onLoad(query){
			this.kxBatch = query.kxBatch;
			this.init();
		},
		onShow(){
			uni.setStorageSync("number",1);
		},
	    methods: {
			 bindChange(){
				  console.log(1)
			 },
			 goZhiliao(){
				uni.navigateTo({
					url: `/pages/zhiliao/zhiliao`
				})
			},
			init(){
				request('/pullulate/app/getBatchInfo', 'post', {
					kxBatch: this.kxBatch
				}).then(res => {
					console.log(res)
					this.batchInfo = res.objs.batchInfo
					this.batchReports = res.objs.batchReports
				})
			},
			imgPre(item){
				uni.previewImage({
					urls: item.imgs
				});
			}
	    }
	}
</script>

<style lang='scss'>
	@import "../../static/css/history.scss";
</style>