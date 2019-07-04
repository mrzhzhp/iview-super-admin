import Mock from 'mockjs'
import { doCustomTimes } from '../libs/util'
// import orgData from './data/org-data'
// import { treeData } from './data/tree-select'
// const Random = Mock.Random

export const myTalentsPage = req => {
  let tableData = []
  doCustomTimes(5, () => {
    tableData.push(Mock.mock({
      name: '@name',
      email: '@email',
      createTime: '@date',
      city: '@city(true)',
      QQ: '360222252',
      agency: '所属人',
      sex: '男',
      birth: '1977-08-02',
      is_edit: true, // 是否允许编辑
      click: 35,
      add_individual_time: '@date', // 添加个人时间
      last_update_time: '@date',
      backup_phone: '备用手机',
      phone: '',
      user_id: 123
    }))
  })
  return tableData
}
