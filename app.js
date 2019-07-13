//app.js
const {isLogin, setItem, checkSession} = require('./utils/util')
const ajaxMethods = require('./utils/ajax_methods')

App({
    ajaxMethods: ajaxMethods,
    onLaunch: function (options) {
        console.log(options)
        var parent_id = 0;
        if (options.scene == 1007 || options.scene == 1008) {
            parent_id = options.query.parent_id
        }
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo
                            // console.log(res.userInfo)
                            setItem('userInfo', res.userInfo).then(() => {
                                console.log('userinfo')
                                checkSession().then().catch(() => {
                                    console.log('catch')
                                    isLogin()
                                })
                            })
                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况a
                            if (this.userInfoReadyCallback) {
                                console.log(this.userInfoReadyCallback(res))
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                } else {
                    wx.navigateTo({
                        url: '/pages/authorization/authorization?parent_id=' + parent_id + '&redirect_url=' + '/' + options.path,
                        success: res => {},
                        fail: res => {}
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: null
    }
})
