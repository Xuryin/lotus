// pages/order/order.js
const app = getApp()
const {toast, imgUrl, setItem} = require('../../utils/util')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: '购物车',
        cartData: [],
        page: 1,
        imgUrl: '',
        stockTop: 100
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.cartGetList()
        this.setData({imgUrl: imgUrl})
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
        this.cartGetList()
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

    cartGetList () {
        app.ajaxMethods.cartGetList({page: this.data.page}).then(res => {
            if (res.code == 10000) {
                this.setData({cartData: res.data})
            }
        })
    },

    onClose(event) {
        const { position, instance } = event.detail;
        let id = event.currentTarget.dataset.id
        switch (position) {
            case 'cell':
                instance.close();
                break;
            case 'right':
                this.delGoods(id)
                instance.close();
        }
    },

    changNumber (event) {
        this.setData({cartValue: event.detail})
        let cart_id = event.currentTarget.dataset.id
        let number = event.detail
        app.ajaxMethods.cartChangeNumber({cart_id: cart_id, number: number}).then(res => {
            if (res.code == 10000) {
                this.cartGetList()
            }
        })
    },

    delGoods (id = null) {
        app.ajaxMethods.cartDel({cart_id: id}).then(res => {
            if (res.code == 10000) {
                toast("删除成功")
                this.cartGetList()
            } else {
                toast(res.msg)
            }
        })
    },

    goOrder (e) {
        let id = ''
        this.data.cartData.map(item => {
            id += `${item.id},`
        })
        console.log(id)
        app.ajaxMethods.orderSettle({cart_ids: id}).then(res => {
            if (res.code == 10000) {
                setItem('key', res.data.key)
                wx.navigateTo({
                    url: '../order/order'
                })
            } else {
                toast(res.message)
            }
        })
    }
})
