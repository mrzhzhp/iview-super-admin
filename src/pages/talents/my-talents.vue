<template>
  <div>
    <Card>
      <tables ref="tables" border editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete"/>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
      <Page
        :total="search.total"
        :current="search.page"
        :page-size="search.pageSize"
        size="small"
        :page-size-opts="search.pageSizeOpts"
        show-sizer
        @on-change="on-change-page"
        @on-page-size-change="on-page-size-change"
      />
    </Card>

  </div>
</template>

<script>
import Tables from '_c/tables'
import expandRow from '_c/tables/table-expand.vue'
import { myTalentsPage } from '../../api/talents'
export default {
  name: 'tables_page',
  components: {
    Tables
  },
  data () {
    return {
      search: {
        total: 0,
        page: 1,
        pageSize: 40,
        pageSizeOpts: [40, 80, 160]
      },
      columns: [
        { type: 'selection', width: 35, align: 'center', fixed: 'left', key: 'handle' },
        { type: 'index', width: 50, align: 'center', fixed: 'left', key: 'handle' },
        { title: '姓名', key: 'name', align: 'center', fixed: 'left' },
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
                  { title: '约访记录', key: 'last_interview_content' },
                  { title: '备用手机', key: 'backup_phone' },
                  { title: '中介人', key: 'agency' },
                  { title: '热度', key: 'click' },
                  { title: '添加个人时间', key: 'add_individual_time' },
                  { title: '最后更新时间', key: 'last_update_time' }
                ]
              }
            })
          },
          fixed: 'left'
        },
        { title: '性别',
          key: 'sex',
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
        { title: '电话', key: 'phone', width: 170, editable: true },
        { title: '在职企业', key: 'customer_short_name' },
        { title: '工作状态', key: 'work_status', noSearch: true },
        { title: '期望工作', key: 'want_job' },
        { title: '最后约访', key: 'last_interview_time', noSearch: true },
        { title: '所属人', key: 'user_id' },
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
    }
  },
  mounted () {
    myTalentsPage().then(res => {
      this.tableData = res.data.data
      this.search.total = res.data.total
    })
  }
}
</script>

<style>

</style>
