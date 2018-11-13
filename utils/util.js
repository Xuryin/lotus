const {getSessionId, updateUser} = require('./ajax_methods')

const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const setItem = (key, val) => {
    return new Promise((resolve, reject) => {
        wx.setStorage({
            key: key,
            data: val,
            success: (res) => {
                resolve()
            }
        })
    })
}

const getItem = (key) => {
    return wx.getStorageSync(key)
}

const routerTo = (dir) => {
    wx.reLaunch({
        url: `/pages/${dir}/${dir}` ,
        success: res => {},
        fail: res => {}
    })
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

const checkSession = () => {
    return new Promise((resolve, reject) => {
        wx.checkSession({
            success: res => {
                resolve()
                console.log(123)
            },
            fail: res => {
                console.log(456);
                isLogin();
            }
        })
    })
}

const isLogin = (up) => {
    wx.login({
        success: res => {
            let code = res.code
            console.log(res.code)
            uploadCode(code, up)
        }
    })
}

const uploadCode = (code, up) => {
    getSessionId({code: code}).then(res => {
        if (res.code == 10000) {
            setItem("session_key", res.data.session_key)
            let userInfo = getItem('userInfo')
            UploadUserInfo(userInfo)
        }
    })
}

const UploadUserInfo = (data, up) => {
    let obj = {
        nick_name: data.nickName,
        img_url: data.avatarUrl
    }
    updateUser(obj).then(res => {
        routerTo('index')
    })
}

module.exports = {
    formatTime: formatTime,
    isLogin: isLogin,
    setItem: setItem,
    getItem: getItem,
    checkSession: checkSession
}
