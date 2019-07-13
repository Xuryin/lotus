// pages/orderList/orderList.js
const app = getApp()
const {toast, imgUrl, setItem} = require('../../utils/util')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: '订单列表',
        goodsGroup: [
            {
                url: '../../static/images/wallet.png',
                text: '待付款',
                tab: 1
            },
            {
                url: '../../static/images/receive.png',
                text: '待发货',
                tab: 2
            },
            {
                url: '../../static/images/car.png',
                text: '待收货',
                tab: 3
            },
            {
                url: '../../static/images/_judges.png',
                text: '待评价',
                tab: 4
            },
            {
                url: '../../static/images/order.png',
                text: '已完成',
                tab: 5
            },
        ],
        dataList: [],
        tab: null,
        imgUrl: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let tab = options.tab
        this.setData({tab: tab, imgUrl: imgUrl})
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.changeList()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    changeList(event) {
        let index
        index = event ? event.detail.index : this.data.tab - 1
        app.ajaxMethods.getOrderList({status: index}).then(res => {
            if (res.code == 10000) {
                this.setData({dataList: res.data})
            }
            console.log(this.data.dataList)
        })
    },

    checkOrder(e) {
        let item = e.currentTarget.dataset.item
        setItem('goodsData', item)
        let type = e.currentTarget.dataset.type
        if (type == 'logistics') {
            toast("功能开发中,请耐心等待")
            return false
        }
        wx.navigateTo({
            url: `/pages/${type}/${type}`
        })
    },

    pay(e) {
        let item = e.currentTarget.dataset.item
    }
})