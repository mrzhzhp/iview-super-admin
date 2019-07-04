<template>
  <div>
    <Card>
      <tables ref="tables"  border editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete"/>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { myTalentsPage } from '../../api/talents'
export default {
  name: 'tables_page',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        { type: 'selection', width: 40, align: 'center', fixed: 'left' },
        { title: 'id', key: 'id', width: 90, sortable: true, fixed: 'left' },
        { title: '姓名', key: 'name', width: 90, sortable: true, fixed: 'left' },
        { title: '性别', key: 'sex', width: 70 },
        { title: '电话', key: 'phone', width: 130 },
        { title: '备用手机', key: 'backup_phone' },
        { title: '在职企业', key: 'customer_short_name' },
        { title: '工作状态', key: 'work_status' },
        { title: '期望工作', key: 'want_job' },
        { title: '最后约访', key: 'last_interview_time' },
        { title: '所属人', key: 'user_id' },
        { title: '中介人', key: 'agency' },
        { title: '约访记录', key: 'last_interview_content' },
        { title: '添加个人时间', key: 'add_individual_time' },
        {
          title: '编辑',
          key: 'handle',
          // options: ['delete'],
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  transfer: true,
                  title: '你确定要删除吗?'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('on-delete', params)
                    vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                  }
                }
              }, [
                h('Button', '删除')
              ])
            }
          ]
        }
      ],
      tableData: []
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted () {
    myTalentsPage().then(res => {
      console.log(res.data)
      this.tableData = res.data.data
    })
  }
}
</script>

<style>

</style>
