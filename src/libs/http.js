/**
 * ajax请求配置
 */
import axios from 'axios'
import { Message } from 'iview' // iview库的消息提示，可以不用
import API from '@/api/index'
// import Qs from 'qs'
import Vue from 'vue'
// import Cookie from 'vue-cookies'
import store from '@/store'
// 创建axios实例
let service = axios.create({
  baseURL: API.apiUrl,
  timeout: 5000,
  headers: {
    'content-type': 'application/json'
    //  "loginToken": Cookie.get("uid"),
    //  "loginType": 'pc'
  },
  data: {
    // loginToken: store.state.user.token !== undefined ? store.state.user.token : '',
    loginType: 'web',
    // ip: localStorage.getItem('Ip'),
    device: window.navigator.userAgent
  }
})
const addErrorLog = errorInfo => {
  const { statusText, status, request: { responseURL } } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}
// request拦截器
service.interceptors.request.use(config => {
  // 重置cookie时间
  // if (Cookie.get("uid")) {
  //     Cookie.set("uid", Cookie.get('uid'), 30 * 60);
  // }

  // !!! 这里开始触发 loading 效果 !!!
  // store.dispatch('SetLoading', true)

  console.log('发送')
  console.log(config)
  // let loginToken = store.state.user.token !== undefined ? store.state.user.token : ''
  // console.log(store.state.layout.loginToken["loginToken"])
  // config.data['loginToken'] = loginToken
  // config.headers['loginToken'] = 111111
  // 设置 token header
  // getToken() && (config.headers['token'] = token)

  // 这个是登录中需要用到 header
  // config.headers['logintoken'] = Cookie.get("uid")
  return config
},
error => {
  // const { response } = error
  // 这里可以根据自己的业务做一些操作，比如说全局提示

  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    // !!! 关闭 loading !!!
    // store.dispatch('SetLoading', false)
    console.log('返回')
    console.log(response)
    const res = response
    if (res.status !== 200) {
      // 这里可以做一些全局性的错误提示，这样就没必要在每个请求都再写一个else,再重复代码提示
      Message.warning('网络异常')
    } else {
      // eslint-disable-next-line eqeqeq
      if (res.data.code == 0) {
        return res.data.data
        // eslint-disable-next-line eqeqeq
      } else if (res.data.code == 999) {
        if (res.data.msg) {
          Message.warning(res.data.msg)
          console.log(res.data.msg)
        } else {
          Message.warning('请重新登录')
          console.log('请重新登录')
        }
        self.location.href = '#/login'
        // Vue.$router.push({ path: '/login' })
        return false
      // eslint-disable-next-line eqeqeq
      } else if (res.data.code == 2) {
        // 弹窗不跳转
        if (res.data.msg) {
          Message.warning(res.data.msg)
        }
        // eslint-disable-next-line eqeqeq
      } else if (res.data.code == 1) {
        // 弹窗跳转
        if (res.data.msg) {
          Message.warning(res.data.msg)
        }
        return false
      } else {
        if (res.data.msg) {
          Message.warning(res.data.msg)
          console.log(res.data.msg)
        } else {
          Message.warning('请求异常')
          console.log('请求异常')
        }
        return false
      }
    }
  },
  error => {
    // !!! 关闭 loading !!!
    // store.dispatch('SetLoading', false)

    // const { response } = error
    // 这里可以根据自己的业务做一些操作，比如说强制登出

    return Promise.reject(error)
  }
)

export default {
  // get请求，其他类型请求复制粘贴，修改method
  get (url, param) {
    return new Promise((resolve, reject) => {
      console.log(API.apiUrl + url)
      service({
        method: 'get',
        url: API.apiUrl + url,
        params: param
      }).then(res => {
        console.log(res)
        if (res) {
          resolve(res)
        } else {
          return false
        }
        // axios返回的是一个promise对象
        // Vue.$router.push({path: "/home"});
      }).catch(err => {
        if (!err.response) {
          Message.warning('请求错误,无法连接服务器')
        } else {
          Message.warning(err.response)
          console.log(err.response, '请求错误,无法连接服务器2')
        }
      })
    })
  },
  // post请求，其他类型请求复制粘贴，修改method
  post (url, data) {
    return new Promise((resolve, reject) => {
      console.log(API.apiUrl + url)
      // console.log(data)
      // console.log(store.state.user.token)
      if (data !== undefined) {
        data.loginToken = store.state.user.token !== undefined ? store.state.user.token : ''
      }
      service({
        method: 'post',
        url: API.apiUrl + url,
        data: data
      }).then(res => {
        console.log(res)
        if (res) {
          resolve(res)
        } else {
          return false
        }

        // axios返回的是一个promise对象
        // Vue.$router.push({path: "/home"});
      }).catch(err => {
        if (!err.response) {
          Message.warning('请求错误,无法连接服务器')
        } else {
          Message.warning(err.response)
          console.log(err.response, '请求错误,无法连接服务器2')
        }
      })
    })
  }

}
