import axios from '@/libs/api.request'
import url from '../config/url'
// import store from '../store'
export const myTalentsPage = (data) => {
  // console.log(store.state.user.token)
  return axios.request({
    url: url.myTalentsPage,
    data,
    method: 'post'
  })
}
