<template>
  <div>
    <Card>
      <tables
        ref="tables"
        :total="total"
        :page="search.page"
        :pageSize="search.pageSize"
        border
        editable
        searchable
        search-place="top"
        v-model="tableData"
        :columns="columns"
        @emitData="getData"
        @on-filter-change="onFilterChange"
        @on-delete="handleDelete"/>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
    </Card>

  </div>
</template>

<script>
import Tables from '_c/tables'
import expandRow from '_c/tables/table-expand.vue'
import { searchTalentsPage } from '../../api/talents'
export default {
  name: 'tables_page',
  components: {
    Tables
  },
  data () {
    return {
      search: {
        page: 1,
        pageSize: 40
      },
      total: 0,
      columns: [
        { type: 'selection', width: 35, align: 'center', fixed: 'left', key: 'handle' },
        { type: 'index', width: 50, align: 'center', fixed: 'left', key: 'handle' },
        { title: '姓名', key: 'tr_name', align: 'center', fixed: 'left', autoSql: 'LIKEtr_name' },
        { title: '更多',
          type: 'expand',
          noSearch: true,
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row,
                data: [
                  { title: 'ID', key: 'id' },
                  { title: '约访记录', key: 'tr_last_interview_content' },
                  // { title: '备用手机', key: 'tr_backup_phone' },
                  { title: '中介人', key: 'tr_agency' },
                  { title: '热度', key: 'tr_click' },
                  { title: '最后更新时间', key: 'tr_last_update_time' }
                ]
              }
            })
          },
          fixed: 'left'
        },
        { title: '性别',
          key: 'tr_sex',
          noSearch: true,
          width: 60,
          filters: [
            {
              label: '男',
              value: '男'
            },
            {
              label: '女',
              value: '女'
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            return row.sex === value
          } },
        // { title: '电话', key: 'tr_phone', width: 170, editable: true, autoSql: 'LIKEtr_phone' },
        { title: '在职企业', key: 'ci_customer_short_name', autoSql: 'LIKEci_customer_short_name' },
        { title: '工作状态', key: 'tp_work_status', noSearch: true },
        { title: '期望工作', key: 'tr_want_job', autoSql: 'LIKEtr_want_job' },
        { title: '最后约访', key: 'tr_last_interview_time', noSearch: true, time: true },
        // { title: '所属人id', key: 'tr_user_id' },
        { title: '所属人', key: 'su_name', autoSql: 'LIKEsu_name' },
        // { title: '添加个人时间', key: 'tr_add_individual_time', noSearch: true },
        {
          title: '编辑',
          key: 'handle',
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  transfer: true,
                  title: '你确定要编辑【' + params.row.name + '】的信息吗?'
                },
                on: {
                  'on-ok': () => {
                    this.show(params.index)
                  }
                }
              }, [
                h('Button', '编辑')
              ])
            }]
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
    },
    show (index) {
      this.$Modal.info({
        title: `编辑${this.tableData[index].name}的信息`,
        fullscreen: true,
        content: `名字：${this.tableData[index].name}
<br>
性别：${this.tableData[index].sex}
<br>
电话：${this.tableData[index].phone}`
      })
    },
    remove (index) {
      this.tableData.splice(index, 1)
    },
    getData (res) {
      this.search = res
      console.log(res)
      searchTalentsPage(this.search).then(res => {
        this.tableData = res.data.data
        this.total = res.data.data[0].total
      })
    },
    onFilterChange (row) {
      console.log(row)
    }
  },
  mounted () {
    searchTalentsPage(this.search).then(res => {
      this.tableData = res.data.data
      this.total = res.data.data[0].total
    })
  }
}
</script>

<style>

</style>
