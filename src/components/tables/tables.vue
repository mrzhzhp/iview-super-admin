<template>
  <div>
    <div v-if="searchable && searchPlace === 'top'" class="search-con search-con-top">
      <Select v-model="searchKey" class="search-col">
        <Option v-for="item in columns" v-if="item.key !== 'handle' && !item.noSearch" :value="item.key" :key="`search-col-${item.key}`">{{ item.title }}</Option>
      </Select>
      <Input @on-change="handleClear" clearable placeholder="输入关键字搜索" class="search-input" v-model="searchValue"/>
      <DatePicker
        v-for="item in columns"
        v-if="item.time"
        :key="item.key"
        type="daterange"
        split-panels
        :placeholder="item.title"
        @on-change="onChangeTime"
        @on-clear="onClearTime"
        style="width: 200px;margin-left: 5px">
      </DatePicker>
      <Input
        v-for="item  in columns"
        v-if="item.MINMAX"
        :key="item.key"
        :id="item.key"
        type="number"
        @on-blur="onBlurInput"
        :placeholder="item.title"
        style="width: 80px;margin-left: 5px"/>
      <Button @click="handleSearch" class="search-btn" type="primary" style="margin-right:10px"><Icon type="search"/>&nbsp;&nbsp;搜索</Button>
      <Tag
        v-for="(value, key, index)  in searchData"
        v-if="value!=undefined && value && value!=='' && value!=null && key!='page' && key!='pageSize' && key!='other' && key.includes('MI') && key.includes('MA')"
        :key="index"
        closable
        @on-close="handleClose(key)">
        {{ value }}
      </Tag>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
    </div>
    <Table
      ref="tablesMain"
      :data="insideTableData"
      :columns="insideColumns"
      :stripe="stripe"
      :border="border"
      :show-header="showHeader"
      :width="width"
      :height="height"
      :loading="loading"
      :disabled-hover="disabledHover"
      :highlight-row="highlightRow"
      :row-class-name="rowClassName"
      :size="size"
      :no-data-text="noDataText"
      :no-filtered-data-text="noFilteredDataText"
      @on-current-change="onCurrentChange"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-select-all="onSelectAll"
      @on-selection-change="onSelectionChange"
      @on-sort-change="onSortChange"
      @on-filter-change="onFilterChange"
      @on-row-click="onRowClick"
      @on-row-dblclick="onRowDblclick"
      @on-expand="onExpand"
    >
      <slot name="header" slot="header"></slot>
      <slot name="footer" slot="footer"></slot>
      <slot name="loading" slot="loading"></slot>
    </Table>
    <Page
    style="padding-top:10px"
      :total="total"
      :current="searchData.page"
      :page-size="searchData.pageSize"
      size="small"
      :page-size-opts="pageSizeOpts"
      show-sizer
      @on-change="onChangePage"
      @on-page-size-change="onPageSizeChange"
    />

    <div v-if="searchable && searchPlace === 'bottom'" class="search-con search-con-top">
      <Select v-model="searchKey" class="search-col">
        <Option v-for="item in columns" v-if="item.key !== 'handle' && !item.noSearch" :value="item.key" :key="`search-col-${item.key}`">{{ item.title }}</Option>
      </Select>
      <Input @on-change="handleClear"  placeholder="输入关键字搜索" class="search-input" v-model="searchValue"/>
      <Button   @click="handleSearch"  class="search-btn" type="primary"><Icon type="search"/>&nbsp;&nbsp;搜索</Button>
    </div>
    <a id="hrefToExportTable" style="display: none;width: 0px;height: 0px;"></a>
  </div>
</template>

<script>
import TablesEdit from './edit.vue'
import handleBtns from './handle-btns'
import { autoSql } from '../../libs/util'
import './index.less'
export default {
  name: 'Tables',
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    size: String,
    width: {
      type: [Number, String]
    },
    height: {
      type: [Number, String]
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    highlightRow: {
      type: Boolean,
      default: false
    },
    rowClassName: {
      type: Function,
      default () {
        return ''
      }
    },
    context: {
      type: Object
    },
    noDataText: {
      type: String
    },
    noFilteredDataText: {
      type: String
    },
    disabledHover: {
      type: Boolean
    },
    loading: {
      type: Boolean,
      default: false
    },
    page: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 40
    },
    total: {
      type: Number,
      default: 0
    },
    /**
     * @description 全局设置是否可编辑
     */
    editable: {
      type: Boolean,
      default: false
    },
    /**
     * @description 是否可搜索
     */
    searchable: {
      type: Boolean,
      default: false
    },
    /**
     * @description 搜索控件所在位置，'top' / 'bottom'
     */
    searchPlace: {
      type: String,
      default: 'top'
    }
  },
  /**
   * Events
   * @on-start-edit 返回值 {Object} ：同iview中render函数中的params对象 { row, index, column }
   * @on-cancel-edit 返回值 {Object} 同上
   * @on-save-edit 返回值 {Object} ：除上面三个参数外，还有一个value: 修改后的数据
   */
  data () {
    return {
      insideColumns: [],
      allColumns: [],
      insideTableData: [],
      edittingCellId: '',
      edittingText: '',
      searchValue: '',
      searchKey: '',
      searchData: {
        other: {}
      },
      pageSizeOpts: [40, 80, 160]
    }
  },
  methods: {
    /**
     * 监听输入框
     */
    onBlurInput (event) {
      console.log(event)
      for (let item of this.allColumns) {
        if (item.title === event.target.placeholder && item.key !== undefined) {
          this.searchData[item.key] = event.target.value
          console.log(item.key)
          console.log(event.target.value)
        }
      }
    },
    /**
     * 导出表格
     */
    exportExcel () {
      this.$refs.tablesMain.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    },
    /**
     * 重构编辑
     * @param item
     * @param index
     * @returns {*}
     */
    suportEdit (item, index) {
      item.render = (h, params) => {
        return h(TablesEdit, {
          props: {
            params: params,
            value: this.insideTableData[params.index][params.column.key],
            edittingCellId: this.edittingCellId,
            editable: this.editable
          },
          on: {
            'input': val => {
              this.edittingText = val
            },
            'on-start-edit': (params) => {
              this.edittingCellId = `editting-${params.index}-${params.column.key}`
              this.$emit('on-start-edit', params)
            },
            'on-cancel-edit': (params) => {
              this.edittingCellId = ''
              this.$emit('on-cancel-edit', params)
            },
            'on-save-edit': (params) => {
              this.value[params.row.initRowIndex][params.column.key] = this.edittingText
              this.$emit('input', this.value)
              this.$emit('on-save-edit', Object.assign(params, { value: this.edittingText }))
              this.edittingCellId = ''
            }
          }
        })
      }
      return item
    },
    /**
     * 重构自定义组件
     * @param item
     * @returns {*}
     */
    surportHandle (item) {
      let options = item.options || []
      let insideBtns = []
      options.forEach(item => {
        if (handleBtns[item]) insideBtns.push(handleBtns[item])
      })
      let btns = item.button ? [].concat(insideBtns, item.button) : insideBtns
      item.render = (h, params) => {
        params.tableData = this.value
        return h('div', btns.map(item => item(h, params, this)))
      }
      return item
    },
    /**
     * 初始化表头
     * @param columns
     */
    handleColumns (columns) {
      let data
      let returnData = []
      data = columns.map((item, index) => {
        let res = item
        if (res.editable) res = this.suportEdit(res, index)
        if (res.key === 'handle') res = this.surportHandle(res)
        return res
      })
      // 去除noShow为true的
      for (let index in data) {
        if (!data[index].noShow) {
          returnData.push(data[index])
        }
      }
      this.allColumns = data
      this.insideColumns = returnData
      // console.log(returnData)
    },
    setDefaultSearchKey () {
      this.searchKey = this.columns[0].key !== 'handle' ? this.columns[0].key : (this.columns.length > 1 ? this.columns[1].key : '')
    },
    handleClear (e) {
      if (e.target.value === '') this.insideTableData = this.value
    },
    /**
     * 点击搜索按钮
     */
    handleSearch () {
      this.insideTableData = this.value.filter(item => ('' + item[this.searchKey] + '').indexOf(this.searchValue) > -1)
      if (this.searchKey !== 'handle' && this.searchKey !== undefined) this.searchData[this.searchKey] = this.searchValue
      this.searchData.page = 1
      // this.searchValue = ''
      console.log(autoSql(this.allColumns, this.searchData))
      this.$emit('emitData', autoSql(this.columns, this.searchData))
    },
    handleClose (key) {
      console.log(key)
      delete this.searchData[key]
      this.searchData.page = 1
      // this.searchValue = ''
      this.insideTableData = this.value
      this.$emit('emitData', autoSql(this.columns, this.searchData))
    },
    handleTableData () {
      this.insideTableData = this.value.map((item, index) => {
        let res = item
        res.initRowIndex = index
        return res
      })
    },
    exportCsv (params) {
      this.$refs.tablesMain.exportCsv(params)
    },
    clearCurrentRow () {
      this.$refs.talbesMain.clearCurrentRow()
    },
    onCurrentChange (currentRow, oldCurrentRow) {
      this.$emit('on-current-change', currentRow, oldCurrentRow)
    },
    onSelect (selection, row) {
      this.$emit('on-select', selection, row)
    },
    onSelectCancel (selection, row) {
      this.$emit('on-select-cancel', selection, row)
    },
    onSelectAll (selection) {
      this.$emit('on-select-all', selection)
    },
    onSelectionChange (selection) {
      this.$emit('on-selection-change', selection)
    },
    onSortChange (column, key, order) {
      this.$emit('on-sort-change', column, key, order)
    },
    onFilterChange (row) {
      this.$emit('on-filter-change', row)
    },
    onRowClick (row, index) {
      this.$emit('on-row-click', row, index)
    },
    onRowDblclick (row, index) {
      this.$emit('on-row-dblclick', row, index)
    },
    onExpand (row, status) {
      this.$emit('on-expand', row, status)
    },
    onClearTime () {
      console.log('清除时间')
    },
    onChangeTime (res) {
      for (let index in this.columns) {
        if (this.columns[index].time) {
          if (res[0] === '') {
            delete this.searchData.other[this.columns[index].key]
          } else {
            this.searchData.other[this.columns[index].key] = res
          }
        }
      };
      console.log(this.searchData)
    },
    onChangePage (res) {
      this.searchData.page = res
      this.$emit('emitData', autoSql(this.columns, this.searchData))
      console.log(res)
    },
    onPageSizeChange (res) {
      this.searchData.pageSize = res
      this.$emit('emitData', autoSql(this.columns, this.searchData))
      console.log(res)
    }
  },
  watch: {
    columns (columns) {
      this.handleColumns(columns)
      this.setDefaultSearchKey()
    },
    value (val) {
      this.handleTableData()
      // if (this.searchable) this.handleSearch()
    }
  },
  mounted () {
    this.handleColumns(this.columns)
    this.setDefaultSearchKey()
    this.handleTableData()
    this.searchData.pageSize = this.pageSize
    this.searchData.page = this.page
  }
}
</script>
