// const https = "http://192.168.18.236:9001";
const https  = 'http://wxfarms.fpchy.com:9001';

// 请求封装
function request (url, method, data, header) {  
  wx.showLoading({
    title: '加载中',// 数据请求前loading
    mask: true 
  })
  if(method=='get'){
    header = 'application/json'    
  }else{
    header = 'application/x-www-form-urlencoded'
  }
  return new Promise((resolve, reject) => {
   uni.request({
      url: https + url, // 仅为示例，并非真实的接口地址
      method: method,
      data: data,
      header: {
        'content-type': header, // 默认值
        // 'token': wx.getStorageSync('token')
      },
      success: function (res) {
		console.log(res)
        uni.hideLoading()
        if(res.data.code == 1){
          resolve(res.data)
          return
        } else if (res.data.code == -22){
          uni.showToast({
            title: "登录过期，请重新登陆",
            icon: 'none',
            duration: 3000
          })
          uni.reLaunch({
              url: '/pages/login/login'
          })
          return
        } else{
          setTimeout(()=>{
            uni.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 3000
            })
          },500)
        }
      },
      fail: function (err) {
        console.log('失败：' + err)
        uni.hideLoading()
        reject(err, false)
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  })
}

module.exports = {
  https,
  request
}