import axios from 'axios'
import store from '@/store'
import { Message } from 'iview'
import Cookies from 'js-cookie'
// cookie保存的天数
import config from '../config'
import { notNull } from './util'
const { cookieExpires } = config
// import { TOKEN_KEY } from './util' // iview库的消息提示，可以不用
// import API from '@/api/index'
// import Qs from 'qs'
// import Vue from 'vue'
// import Cookie from 'vue-cookies'
// import { Spin } from 'iview'

// 开启cookie
axios.defaults.withCredentials = true
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

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'content-type': 'application/json'
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      console.log('发送')
      console.log(config)
      if (!notNull(config.data)) {
        config['data'] = {}
      }
      if (notNull(config.data.other)) {
        config.data.other['token'] = notNull(Cookies.get('token')) ? Cookies.get('token') : ''
        config.data.other['loginType'] = 'web'
        config.data.other['device'] = window.navigator.userAgent
      } else {
        config.data.other = {
          token: notNull(Cookies.get('token')) ? Cookies.get('token') : '',
          loginType: 'web',
          // ip: localStorage.getItem('Ip'),
          device: window.navigator.userAgent
        }
      }

      // config.data.other['token'] = null
      // config.data.other['loginType'] = null
      // config.data.other['device'] = null
      // config.data.other['token'] = notNull(Cookies.get('token')) ? Cookies.get('token') : ''
      // config.data.other['loginType'] = 'web'
      // config.data.other['device'] = window.navigator.userAgent
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      Message.warning('网络异常')
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      console.log('返回')
      console.log(res)
      this.destroy(url)

      if (res.status !== 200) {
        // 这里可以做一些全局性的错误提示，这样就没必要在每个请求都再写一个else,再重复代码提示
        Message.warning('网络异常')
      } else {
        // eslint-disable-next-line eqeqeq
        if (res.data.code == 999) {
          if (res.data.msg) {
            Message.warning(res.data.msg)
            console.log(res.data.msg)
          } else {
            Message.warning('请重新登录')
            console.log('请重新登录')
          }
          Cookies.set('token', '', { expires: cookieExpires || 1 })
          self.location.href = document.domain
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
          // let a = notNull(res.data)
          return res
        }
      }
    }, error => {
      Message.warning('连接失败，请稍后再试')
      this.destroy(url)
      let errorInfo = error.response
      if (!errorInfo) {
        const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
        errorInfo = {
          statusText,
          status,
          request: { responseURL: config.url }
        }
      }
      addErrorLog(errorInfo)
      return Promise.reject(error)
    })
  }
  request (options) {
    // console.log(options)
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
