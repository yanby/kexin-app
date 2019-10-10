<template>
    <view class="login">
		<view class="login-logo"><image src="/static/images/kexin-logo.png" mode=""></image></view>
		<view class="login-txt">欢迎使用可信农场云屏</view>
		<view class="content">
			<view class="uni-common-mt">
				<view class="uni-form-item uni-column">
					<view class="title">邀请码：</view>
					<input class="uni-input" placeholder="请输入邀请码" @input="inputBlur" v-model="code"/>
					<view class="saoma" @click="saomaFun"><image src="/static/images/saoma.png" mode=""></view>
				</view>
			</view>
			<view class="btn" @click="goDevice()">登录</view>
		</view>	                        
	</view>
</template>

<script>
	import { request } from '../../static/js/request.js'
	export default {
	    data() {
	       return {
	       	code: ""
	       }
	    },
		onLoad(){
			
		},
	    methods: {
			goDevice(){
				var that = this;
				setTimeout(()=>{
					if(that.code == ""){
						uni.showToast({
						  title: "请输入邀请码",
						  icon: 'none'
						})
						return
					}else{
						request('/pullulate/app/getDevicesByInvitationCode', 'post', {
							 code: that.code
						}).then(res => {
							console.log(res)
							uni.navigateTo({
								url: `/pages/device/device?code=${that.code}`
							})
						})
					}
				},500)
			},
			inputBlur(e){
				console.log(e.detail)
				this.code = e.detail;
			},
			saomaFun(){
				var that = this;
				uni.scanCode({
				    success: function (res) {
						console.log(res)
				       that.code = res.result;
				    }
				});
			}
	    }
	}
</script>

<style lang='scss'>
	.login{
		padding: 100upx 90upx;
		.login-logo{
			text-align: center;
			margin-bottom: 20upx;
			image{
				width: 276upx;
				height: 101upx;
			}
		}
		.login-txt{
			font-size: 30upx;
			text-align: center;
			margin-bottom: 100upx;
		}
		.content{
			.uni-common-mt{
				.uni-form-item{
					position: relative;
					width: 465upx;
					height: 60upx;
					margin: 0 auto;
					border-bottom: 2upx solid #eaeaea;
					.title{
						position: absolute;
						left: 0;
						top: 17upx;
						font-size: 28upx;
					}
					.saoma{
						position: absolute;
						right: 0;
						top: 17upx;
						font-size: 28upx;
						width: 40upx;
						height: 36upx;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.uni-input{
						width: 260upx;
						height: 70upx;
						padding-left: 150upx;
						font-size: 25upx;
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