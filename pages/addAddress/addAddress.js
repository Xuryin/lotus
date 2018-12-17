// pages/addAddress/addAddress.js
const app = getApp()
const {toast} = require('../../utils/util')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: '',
        province:[],
        province_index:0,
        city:[],
        city_index:0,
        area:[],
        area_index:0,
        show: false,
        createData:{},
        defaultAddress: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.id) {
            this.getAreaList()
            this.getDefaultAdd(options.id)
            this.setData({
                title: '修改地址'
            })
        } else {
            this.getAreaList()
            this.setData({
                title: '新增地址'
            })
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

    getAreaList (type = 'province',province_id = null,city_id = null) {
        console.log(type)
        let _this = this;
        let data = {};
        if (type == 'city'){
            data.province_id = province_id;
        } else if(type == 'area'){
            data.city_id = city_id;
        }
        app.ajaxMethods.getArea(data).then(res => {
            if (res.code == 10000) {
                let list = res.data;
                list = [{id:0,name:'请选择'}, ...list]
                switch(type){
                    case 'province':
                        _this.setData({ province: list });break;
                    case 'city':
                        _this.setData({ city: list }); break;
                    case 'area':
                        _this.setData({ area: list }); break;
                }
            }
        })
    },

    bindPickerChange(e) {
        // 点击确定时候触发
        let index = e.detail.value, type = e.currentTarget.dataset.type;
        console.log(index)
        if (index == 0) return false
        switch(type){
            case 'province':
                let province = this.data.province;
                console.log(province)
                this.setData({province_index:index});
                this.getAreaList('city',province[index].id);
                this.setData({city_index: 0, area: [], area_index: 0})
                break;
            case 'city':
                let city = this.data.city;
                this.setData({ city_index: index });
                this.getAreaList('area',null,city[index].id)
                this.setData({area_index: 0})
                break;
            case 'area':
                this.setData({ area_index: index });
                let createData = this.data.createData, area = this.data.area;
                createData.district_id = area[index].id;
                break;
        }
    },

    save () {
        // 保存地址
        let reg1 = /^1\d{10}$/
        let regPhone = reg1.test(this.data.createData.contact_phone)
        if (!this.data.createData.district_id) {
            toast('选择地区不正确')
            return false
        } else if (!this.data.createData.contact_name) {
            toast('联系人不能为空')
            return false
        } else if (!this.data.createData.contact_phone) {
            toast('联系号码不能为空')
            return false
        } else if (!this.data.createData.contact_address) {
            toast('详细地址不能为空')
            return false
        } else if (!regPhone) {
            toast('联系号码不正确')
            return false
        } else {
            app.ajaxMethods.addressSave(this.data.createData).then(res => {
                if (res.code == 10000) {
                    toast('保存成功').then(res => {
                        console.log(123)
                    })
                }
            })
        }
    },

    resetList () {
        wx.navigateTo({
            url: '../address/address'
        })
    },

    inputValue (e) {
        let changeKey = e.currentTarget.dataset.key
        let changeValue = e.detail.value
        let create_data = this.data.createData
        create_data[changeKey] = changeValue
        this.setData({
            createData: create_data
        })
    },

    getDefaultAdd (id) {
        app.ajaxMethods.getAddressList().then(res => {
            if (res.code == 10000) {
                if (id) {
                    res.data.map(item => {
                        if (item.id == id) {
                            let op = {
                                contact_name: item.contact_name,
                                contact_address: item.contact_address,
                                contact_phone: item.contact_phone,
                                id: item.id
                            }
                            let province= [], city = [], area = []
                            province.push(item.detail.province)
                            city.push(item.detail.city)
                            area.push(item.detail.area)
                            this.setData({
                                createData: op,
                                province: province,
                                city: city,
                                area: area,
                            })
                        }
                    })
                }
            }
        }).then(res => {

        })
    }
})
