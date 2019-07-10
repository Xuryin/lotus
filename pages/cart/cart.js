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
        stockTop: 100,
        totalMount: null,
        goodsData: [],
        addressData: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.cartGetList()
        this.setData({imgUrl: imgUrl})
        this.getRecommendGoods()
        this.getAddressData()
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
                this.setData({cartData: res.data.list, totalMount: res.data.count})
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

    getAddressData() {
        app.ajaxMethods.getAddressList().then(res => {
            console.log(res)
            if (res.code == 10000) {
                this.setData({addressData: res.data})
            }
        })
    },

    goOrder (e) {
        if(!this.data.addressData.length) {
            toast('请先添加收货地址')
            wx.navigateTo({
                url: '../addAddress/addAddress'
            })
        }
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
    },

    getRecommendGoods () {
        app.ajaxMethods.getRecommendList().then(res => {
            this.setData({
                goodsData: res.data
            })
            console.log(res.data)
        })
    }
})
