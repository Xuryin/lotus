const app = getApp()
const {imgUrl} = require('../../utils/util')
Page({
    data: {
        active: 1,
        title: '我的积分',
        integral: 500,
        index: 0,
        integralList: [],
        changeList: [],
        imgUrl: ''
    },
    onLoad: function (options) {
        this.setData({imgUrl: imgUrl})
    },
    onShow () {
        this.getIntegralList()
    },
    onChange(event) {
        let index = event.detail.index
        console.log(index)
        this.setData({index: index})
        index ? this.getChangeList() : this.getIntegralList()
    },
    onTabsChange(e) {
        console.log('onTabsChange', e)
        const { key } = e.detail
        const index = this.data.tabs.map((n) => n.key).indexOf(key)

        this.setData({
            key,
            index,
        })
    },
    onSwiperChange(e) {
        console.log('onSwiperChange', e)
        const { current: index, source } = e.detail
        const { key } = this.data.tabs[index]

        if (!!source) {
            this.setData({
                key,
                index,
            })
        }
    },

    getIntegralList () {
        app.ajaxMethods.integralList().then(res => {
            if (res.code == 10000) {
                this.setData({
                    integralList: res.data
                })
            }
        })
    },

    getChangeList () {
        console.log('我的兑换')
    }
})
