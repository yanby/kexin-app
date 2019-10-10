<template>
    <view class="device">
		<view class="device-txt">请选择摊位对应的设备及作物信息</view>
		<view class="content">
			<view class="list">
				<text v-for="(item,index) in pullulateDevices" :key="index" :class="{'cur':tab==item.num}" @click="tabFun(item)">{{item.num}}</text>
			</view>
			<view class="btn" @click="goIndex">确定</view>
		</view>	                        
	</view>
</template>

<script>
	import { request } from '../../static/js/request.js'
	export default {
	    data() {
	       return {
	       	tab: "",
			pullulateDevices: "",
			uuid: "",
			deviceId: ""
	       }
	    },
		onLoad(query){
			this.uuid = plus.device.uuid;
			this.init(query.code)
		},
	    methods: {
			goIndex(){
				if(this.tab == ""){
					uni.showToast({
					  title: "请选择设备",
					  icon: 'none'
					})
					return
				}else{
					request('/pullulate/app/bindDevice', 'post', {
						 uuid: this.uuid,
						 deviceId: this.deviceId
					}).then(res => {
						console.log(res)
						uni.redirectTo({
							url: `/pages/index/index`
						})
					})
				}	
			},
			init(code){
				request('/pullulate/app/getDevicesByInvitationCode', 'post', {
					 code: code
				}).then(res => {
					console.log(res)
					this.pullulateDevices = res.objs.pullulateDevices
				})
			},
			tabFun(item){
				this.tab = item.num;
				this.deviceId = item.id;
			}
	    }
	}
</script>

<style lang='scss'>
	.device{
		padding: 100upx 90upx;
		.login-logo{
			text-align: center;
			margin-bottom: 20upx;
			image{
				width: 276upx;
				height: 101upx;
			}
		}
		.device-txt{
			font-size: 30upx;
			text-align: center;
			margin-bottom: 100upx;
		}
		.content{
			.list{
				display: flex;
				justify-content: space-around;
				text{
					width:70upx;
					height:70upx;
					line-height: 70upx;
					text-align: center;
					font-size: 40upx;
					color: #66CC33;
					background: url(../../static/images/yuan.png) no-repeat;
					-webkit-background-size:100% 100%;
					background-size: 100% 100%;
					border-radius: 50%;
					&.cur{
						color: #fff;
						background: url(../../static/images/yuan-bg.png) no-repeat;
					}
				}
			}
			.btn{
				width:465upx;
				height:77upx;
				line-height: 77upx;
				text-align: center;
				background: #69bb19;
				font-size: 24upx;
				color: #fff;
				margin: 120upx auto 0;
				border-radius: 10upx;
			}
		}
	}
</style>