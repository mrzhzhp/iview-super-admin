<template>
  <div>
    <Modals title="编辑人才信息" :modalsData="modalsData" :modalsShow="modalsShow" @on-cancel="onCancel"></Modals>

    <Card>
      <tables
        ref="tables"
        :total="total"
        :page="search.page"
        :pageSize="search.pageSize"
        border
        editable
        searchable
        :height="height"
        search-place="top"
        v-model="tableData"
        :columns="columns"
        @on-filter-change="onFilterChange"
        @on-sort-change="onSortChange"
        @on-save-edit="onSaveEdit"
        @emitData="getData"
        @on-delete="handleDelete"/>
      <!-- <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button> -->
    </Card>

  </div>
</template>

<script>
import Tables from '_c/willin/tables'
import Modals from '_c/willin/modals-edit-talents'
import expandRow from '_c/tables/table-expand.vue'
import { myTalentsPage } from '../../api/talents'
import { array_str } from '../../libs/util'
export default {
  name: 'tables_page',
  components: {
    Tables,
    Modals
  },
  data () {
    return {
      search: {
        page: 1,
        pageSize: 40
      },
      modalsData: {},
      modalsShow: false,
      total: 0,
      height: 400,
      columns: [
        { type: 'selection', width: 35, align: 'center', fixed: 'left', noSearch: true },
        { type: 'index', width: 40, align: 'center', fixed: 'left', noSearch: true },
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
                  { title: '备用手机', key: 'tr_backup_phone' },
                  { title: '中介人', key: 'tr_agency' },
                  { title: '热度', key: 'tr_click' },
                  { title: '最后更新时间', key: 'tr_last_update_time' }
                ]
              }
            })
          },
          fixed: 'left'
        },
        { title: '年龄', key: 'tr_age', width: 60, sortable: true, noSearch: true },
        { title: '最小年龄', key: 'MItr_age', width: 80, noSearch: true, noShow: true, MINMAX: true },
        { title: '最大年龄', key: 'MAtr_age', width: 80, noSearch: true, noShow: true, MINMAX: true },
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
          // filterMultiple: false,
          filterMethod (value, row) {
            return row.tr_sex === value
          } },
        { title: '电话', key: 'tr_phone', width: 170, editable: true, autoSql: 'LIKEtr_phone' },
        { title: '在职企业', key: 'ci_customer_short_name', autoSql: 'LIKEci_customer_short_name' },
        { title: '工作状态',
          key: 'tr_work_status',
          noSearch: true,
          filters: [
            {
              label: '在职中',
              value: '在职中'
            },
            {
              label: '待面试',
              value: '待面试'
            },
            {
              label: '待体检',
              value: '待体检'
            },
            {
              label: '待入职',
              value: '待入职'
            },
            {
              label: '费用到期',
              value: '费用到期'
            },
            {
              label: '无工作',
              value: '无工作'
            }
          ],
          // filterMultiple: false,
          filterMethod (value, row) {
            return row.tr_work_status === value
          } },
        { title: '期望工作', key: 'tr_want_job', autoSql: 'LIKEtr_want_job' },
        // { title: '所属人id', key: 'tr_user_id' },
        { title: '所属人', key: 'su_name', autoSql: 'LIKEsu_name' },
        { title: '最后约访', key: 'tr_last_interview_time', noSearch: true, width: 130, time: true, sortable: true },
        { title: '添加个人时间', key: 'tr_add_individual_time', width: 130, noSearch: true, sortable: true },
        {
          title: '编辑',
          key: 'handle',
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  transfer: true,
                  title: '你确定要编辑【' + params.row.tr_name + '】的信息吗?'
                },
                on: {
                  'on-ok': () => {
                    this.show(params)
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
    /**
     * 导出表格
     */
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    },
    /**
     * 显示页面
     */
    show (data) {
      // console.log(data)
      this.modalsShow = true
      this.modalsData = data.row
    },
    remove (index) {
      this.tableData.splice(index, 1)
    },
    /**
     * 接收页面搜索信息
     * @param res
     */
    getData (res) {
      this.search = res
      console.log(res)
      this.postPage()
    },
    /**
     * 总接口
     */
    postPage () {
      myTalentsPage(this.search).then(res => {
        this.tableData = res.data.data
        this.total = res.data.data[0].total
      })
    },
    onFilterChange (row) {
      this.search['IN' + row.key] = array_str(row._filterChecked)
      // console.log(row)
      this.postPage()
    },
    /**
     * 接收排序
     * @param row
     */
    onSortChange (row) {
      if (row.order !== 'normal') {
        this.search.order = row.key
        this.search.prop = row.order
      } else {
        this.search.order = ''
        this.search.prop = ''
      }
      this.postPage()
      console.log(row)
    },
    /**
     * 接收编辑信息
     * @param data
     */
    onSaveEdit (res) {
      console.log(res)
    },
    onCancel (res) {
      this.modalsShow = res
    }
  },
  mounted () {
    // 自动适应屏幕高度
    this.height = document.body.clientHeight - 64 - 40 - 24 - 31.89 - 26 - 100
    this.postPage()
  }
}
</script>

<style>

</style>
