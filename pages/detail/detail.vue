<template>
    <view class="detail">
		<view class="detail-header">
			<view class="header-title">
				<view class="logo"><image :src="farmInfos.log" mode=""></image><text v-if="farmInfos.status==1"></text></view>
				<view class="name">{{farmInfos.name}}</view>
				<view class="biaoqian">{{farmInfos.operatingYear}}年</view>
				<view class="biaoqian">{{farmInfos.area}}亩</view>
				<view class="address" v-if="farmInfos.city"><text></text>{{farmInfos.city}}</view>
			</view>
			<view class="header-msg">
				<view class="msg-img"><image :src="farmInfos.represent" mode=""></image></view>
				<view class="msg-txt">
					<view class="fenshu">
						<view class="youji" v-if="farmInfos.organicBatchCount > 0">{{farmInfos.organicScoreInt}}</view>
						<view class="lvse" v-if="farmInfos.onOrganicBatchCount > 0">{{farmInfos.onOrganicScoreInt}}</view>
					</view>
					<view class="icon">
						<text class="icon1"></text>
						<text class="icon2"></text>
						<text class="icon3"></text>
					</view>
					<view class="icon-txt">
						<view class="txt1">农场可信面积 <text>{{farmInfos.kexinArea}}%</text></view>
						<view class="txt2">作物品类 <text>{{farmInfos.plantCropNum}}</text></view>
						<view class="txt2">可信作物批次 <text>{{farmInfos.batchNum}}</text></view>
					</view>
					<view class="list">
						<view class="list-msg list-msg1"><text class="icon1"></text>{{farmInfos.operatingDateStr}}成立</view>
						<view class="list-msg"><text class="icon2"></text>总面积{{farmInfos.area}}亩</view>
					</view>
					<view class="list">
						<view class="list-msg list-msg1"><text class="icon3"></text>{{farmInfos.contactsPhone}}</view>
						<view class="list-msg"><text class="icon4"></text>{{farmInfos.path}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="detail-content">
			<!-- <view class="content-title">
				<view class="title-left">
					<view class="uni-list-cell-db">
						<picker class="picker" @change="bindPickerChange" :value="index" :range="arr" range-key="name">
							<view class="uni-input">{{arr[index].name}}</view>
						</picker>
					</view>
				</view>
				<view class="title-right">
					<view class="uni-list-cell-db">
						<picker class="picker" @change="bindPickerChange" :value="index" :range="crops" range-key="name">
							<view class="uni-input">{{crops[index].name}}</view>
						</picker>
					</view>
					<view class="uni-list-cell-db">
						<picker class="picker" @change="bindPickerChange" :value="index" :range="arr" range-key="name">
							<view class="uni-input">{{arr[index].name}}</view>
						</picker>
					</view>
				</view>
			</view> -->
			<view class="content-msg">
				<view class="list-wrap" @click="goHistory(item)" :key="index" v-for="(item,index) in batchs">
					<view class="list-left">
						<view class="img"><image :src="item.img" mode=""></image></view>
					</view>
					<view class="list-center">
						<view class="name">{{item.cropName}}</view>
						<view class="txt">{{item.variety}}</view>
						<view class="pici">{{item.coteName}}</view>
						<view class="time">{{item.createTime}}批次</view>
					</view>
					<view class="list-right" v-if="item.kxBatchScore < 60">
						<view class="fenshu fenshu1" >{{item.kxBatchScore}}<text>分</text></view>
						<view class="txt">信用极差</view>
					</view>
					<view class="list-right" v-else-if="item.kxBatchScore >= 60 && item.kxBatchScore <= 79">
						<view class="fenshu fenshu2" >{{item.kxBatchScore}}<text>分</text></view>
						<view class="txt">信用优秀</view>
					</view>
					<view class="list-right" v-else-if="item.kxBatchScore >= 80 && item.kxBatchScore <= 89">
						<view class="fenshu fenshu3">{{item.kxBatchScore}}<text>分</text></view>
						<view class="txt">信用一般</view>
					</view>
					<view class="list-right" v-else-if="item.kxBatchScore >= 90 && item.kxBatchScore <= 100">
						<view class="fenshu fenshu4" >{{item.kxBatchScore}}<text>分</text></view>
						<view class="txt">信用极佳</view>
					</view>
					<view class="list-xinyu" @click.stop="goZhiliao">
						<view class="xinyu-youji" v-if="item.organic > 0">
							<view v-if="item.kxBatchScore >= 60 && item.kxBatchScore <= 79"><text></text></view>
							<view v-else-if="item.kxBatchScore >= 80 && item.kxBatchScore <= 89"><text></text><text></text></view>
							<view v-else-if="item.kxBatchScore >= 90 && item.kxBatchScore <= 100"><text></text><text></text><text></text></view>
						</view>
						<view class="xinyu-lvse" v-if="item.noOrganic > 0">
							<view v-if="item.kxBatchScore >= 60 && item.kxBatchScore <= 79"><text></text></view>
							<view v-else-if="item.kxBatchScore >= 80 && item.kxBatchScore <= 89"><text></text><text></text></view>
							<view v-else-if="item.kxBatchScore >= 90 && item.kxBatchScore <= 100"><text></text><text></text><text></text></view>
						</view>
					</view>
					
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
				index: 0,
				farmId: "",
				farmInfos: "",
				batchs: "",
				crops: "",
				arr: [{name:"撒"},{name:"发"},{name:"啊"}]
	        }
	    },
		onLoad(query){
			this.farmId = query.farmId;
			this.init();
			this.content();
		},
		onShow(){
			uni.setStorageSync("number",1);
		},
	    methods: {
			  bindPickerChange: function(e) {
				 console.log('picker发送选择改变，携带值为', e.target.value)
				 this.index = e.target.value
			 },
			 goHistory(item){
				 uni.navigateTo({
					url: `/pages/history/history?kxBatch=${item.id}`
				 })
			 },
			goZhiliao(){
				uni.navigateTo({
					url: `/pages/zhiliao/zhiliao`
				})
			},
			init(){
				request('/pullulate/app/getFarmInfo', 'post', {
					farmId: this.farmId
				}).then(res => {
					console.log(res)
					this.farmInfos = res.objs.farmInfo
					this.crops = res.objs.crops
				})
			 },
			content(){
				var uuid = plus.device.uuid;
				request('/pullulate/app/getBatchs', 'post', {
					uuid: uuid,
					kxFarm: this.farmId
				}).then(res => {
					console.log(res)
					this.batchs = res.objs.batchs;
				})
			}
	    }
	}
</script>

<style lang='scss'>
	@import "../../static/css/detail.scss";
</style>