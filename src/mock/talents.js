import Mock from 'mockjs'
import { doCustomTimes } from '../libs/util'
// import orgData from './data/org-data'
// import { treeData } from './data/tree-select'
// const Random = Mock.Random

export const myTalentsPage = req => {
  let tableData = []
  doCustomTimes(5, () => {
    tableData.push(Mock.mock(
      {
        'id': 124647,
        'name': '孟宪峰',
        'sex': '男',
        'birth': '1992-11-03',
        'phone': '',
        'QQ': '',
        'want_job': null,
        'user_id': '237',
        'work_status': '待面试',
        'last_update_time': '2019-06-28 16:34:14',
        'click': 1,
        'add_individual_time': '2019-06-28 16:29:39',
        'last_interview_time': null,
        'last_interview_content': null,
        'backup_phone': '',
        'is_black_list': '0',
        'agency': '于观波介',
        'customer_short_name': '歌尔声学'
      }))
  })
  return { data: tableData, total: 800 }
}
