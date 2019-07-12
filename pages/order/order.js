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
        imgUrl: '',
        pageData: [],
        total: '',
        show: false,
        columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
        couponData: [],
        index: 0,
        submitData: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({imgUrl: imgUrl})
        if (options.id) {
            this.changeSubmitVal('address_id', options.id)
        }
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
        this.getCouponData()
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

    changeSubmitVal(key, val) {
        let submitData = this.data.submitData
        submitData[key] = val
        this.setData({submitData: submitData})
    },

    getAddressData() {
        app.ajaxMethods.getAddressList().then(res => {
            if (res.code == 10000) {
                if (this.data.submitData.address_id) {
                    let addressArray = []
                    res.data.map((item) => {
                        if (this.data.submitData.address_id == item.id) {
                            addressArray.push(item)
                            this.setData({addressData: addressArray})
                        }
                    })
                } else {
                    this.setData({addressData: res.data})
                    this.changeSubmitVal('address_id', this.data.addressData[0].id)
                }
            }
        })
    },

    changeAddress(e) {
        wx.redirectTo({
            url: `/pages/address/address?page=order`
        })
    },

    getOrderData() {
        let key = getItem('key')
        this.changeSubmitVal('key', key)
        app.ajaxMethods.getOrderData({key: key}).then(res => {
            if (res.code == 10000) {
                if (!res.data) {
                    setItem('key', '')
                } else {
                    this.setData({pageData: res.data.data})
                    this.calculateTotal()
                }
            }
        })
    },

    addAddress() {
        wx.navigateTo({
            url: '../addAddress/addAddress'
        })
    },

    calculateTotal() {
        let total = 0
        this.data.pageData.map((item) => {
            let unit = Number(item.price) * Number(item.number)
            total += unit
        })
        this.setData({total: total})
    },

    getCouponData() {
        app.ajaxMethods.getCoupon().then(res => {
            if (res.code == 10000) {
                let data = [{title: '不使用优惠券', id: 0}, ...res.data]
                this.setData({
                    couponData: data
                })
                this.changeSubmitVal('coupon_id', 0)
            }
        })
    },

    bindPickerChange(e) {
        let index = e.detail.value
        this.setData({index: index})
        this.changeSubmitVal('coupon_id', this.data.couponData[index].id)
    },

    inputValue(e) {
        let remark = e.detail.value
        this.changeSubmitVal('remark', remark)
    },

    onClose() {

    },

    submitOrder() {
        console.log(this.data.submitData)
        if (!this.data.submitData.address_id) {
            toast("请添加地址")
            return false
        }
        // key(结算接口返回)  address_id(用户收货地址id)  remark(订单备注)
        // coupon_id(优惠券)
        /* let remark
         this.data.submitData.remark ? this.changeSubmitVal('remark', remark) :
             this.changeSubmitVal('remark', "") */
        app.ajaxMethods.prePay(this.data.submitData).then(res => {
            if (res.code == 10000) {

            }
        })
    }
})
