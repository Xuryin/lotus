// pages/addAddress/addAddress.js
const {area} = require('../../utils/area')
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: '新增地址',
        addressData: ['请选择', '请选择', '请选择'],
        show: false,
        areaList: area,
        createData: {},
        index: 0,
        array: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getAreaList(1)
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

    getAreaList (type) {
        let data = {}
        console.log(type)
        switch (type) {
            case 1:
                data = {
                    province_id: null,
                    city_id: null
                }
                break;
            case 2:
                data = {
                    province_id: null,
                    city_id: null
                }
                break;
            case 3:
                data = {
                    province_id: null,
                    city_id: null
                }
                break;
        }
        app.ajaxMethods.getArea(data).then(res => {
            if (res.code == 10000) {
                let list = []
                res.data.map(item => {
                    list.push(item.name)
                })
                this.setData({array: list})
            }
        })
    },

    bindPickerChange(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },

    save () {
        // 保存地址
        console.log(this.data.createData)
        /*app.ajaxMethods.addressSave({data: this.data.createData}).then(res => {

        })*/
    },

    inputValue (e) {
        let changeKey = e.currentTarget.dataset.key
        let changeValue = e.detail.value
        let create_data = this.data.createData
        create_data[changeKey] = changeValue
        this.setData({
            createData: create_data
        })
    }
})
