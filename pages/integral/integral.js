Page({
    data: {
        active: 1,
        title: '我的积分',
        integral: 500
    },
    onChange(event) {
        wx.showToast({
            title: `切换到标签 ${event.detail.index + 1}`,
            icon: 'none'
        });
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
})
