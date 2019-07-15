import axios from '@/libs/api.request'
import url from '../config/url'
// import store from '../store'
/**
 * 我的人才
 * @param data
 * @returns {*|never}
 */
export const myTalentsPage = (data) => {
  console.log(data)
  return axios.request({
    url: url.myTalentsPage,
    data: data,
    method: 'post'
  })
}
/**
 * 全部人才
 * @param data
 * @returns {*|never}
 */
export const searchTalentsPage = (data) => {
  console.log(data)
  return axios.request({
    url: url.searchTalentsPage,
    data: data,
    method: 'post'
  })
}
