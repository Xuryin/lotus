// pages/order/order.js
const app = getApp()
const {imgUrl, toast, getItem, setItem} = require('../../utils/util')
Page({
    /**
     * 页面的初始数据
     */
    data: {
        title: '订单确认',
        addressData: [],
        addressId: null,
        imgUrl: '',
        pageData: [],
        total: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({imgUrl: imgUrl})
        if (options.id) {
            this.setData({addressId: options.id})
        }
        this.getOrderData()
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
        this.getAddressData()
        this.getOrderData()
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

    getAddressData() {
        app.ajaxMethods.getAddressList().then(res => {
            if (res.code == 10000) {
                if (this.data.addressId) {
                    let addressArray = []
                    res.data.map((item) => {
                        if (this.data.addressId == item.id) {
                            addressArray.push(item)
                            this.setData({addressData: addressArray})
                        }
                    })
                } else {
                    this.setData({addressData: res.data})
                }
                this.calculateTotal()
            }
        })
    },

    changeAddress (e) {
        wx.navigateTo({
            url: `/pages/address/address?page=order`
        })
    },

    getOrderData () {
        let key = getItem('key')
        app.ajaxMethods.getOrderData({key: key}).then(res => {
            if (res.code == 10000) {
                if (!res.data) {
                    setItem('key', '')
                } else {
                    this.setData({pageData: res.data.data})
                }
            }
        })
    },

    calculateTotal () {
        let total = 0
        this.data.pageData.map((item) => {
            let unit = Number(item.price) * Number(item.number)
            total =+ unit
        })
        this.setData({total: total})
    },

    submitOrder () {
        app.ajaxMethods.prePay({}).then(res => {
            if (res.code == 10000) {

            }
        })
    }
})
