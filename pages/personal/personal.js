//index.js
//获取应用实例
const app = getApp()
const{getItem} = require('../../utils/util')

Page({
    data: {
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        userInfo: {},
        goodsGroup: [
            {
                url: '../../static/images/wallet.png',
                text: '待付款'
            },
            {
                url: '../../static/images/receive.png',
                text: '待发货'
            },
            {
                url: '../../static/images/car.png',
                text: '待收货'
            },
            {
                url: '../../static/images/_judges.png',
                text: '待评价'
            },
        ],
        infoList: [
            {
                extra: '我的积分',
                url: '/pages/integral/integral'
            },
            {
                extra: '我的优惠券',
                url: '/pages/coupon/coupon'
            },
            {
                extra: '我的收藏',
                url: '/pages/collection/collection'
            },
            {
                extra: '收货地址',
                url: '/pages/address/address'
            },
            {
                extra: '关于我们',
                url: '/pages/about/about'
            },
        ]
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function () {
        let userInfo = getItem('userInfo')
        console.log(userInfo)
        this.setData({
            userInfo: userInfo
        })
    },
    routerTo (e) {
      let router = e.currentTarget.dataset.router
        wx.navigateTo({
            url: router,
            success: res => {},
            fail: res => {}
        })
    }
})
