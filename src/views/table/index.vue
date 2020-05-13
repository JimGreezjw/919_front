<template>
  <div class="app-container">
    <el-row>
      <el-button type="primary" icon="el-icon-document" @click="handleDownload">excel导出</el-button>
      <el-button type="success" icon="el-icon-document" @click="newBill">新建三单</el-button>
    </el-row>
    <br>
    <el-table
      v-loading="listLoading"
      :data="list"
      :default-sort="{prop: 'created_at', order: 'descending'}"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      :row-class-name="tableRowClassName"
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index +1 }}
        </template>
      </el-table-column>
      <el-table-column label="编号" width="160">
        <template slot-scope="scope">
          <a style="text-decoration:underline" @click="viewClick(scope.row)">{{ scope.row.bills.name }}</a>
        </template>
      </el-table-column>
      <el-table-column
        label="要号人"
        prop="name"
        width="110"
        align="center"
        :filters="userList"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.user.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="要号原因" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.bills.reason }}
        </template>
      </el-table-column>
      <el-table-column label="三单内容" align="center">
        <template slot-scope="scope">
          <span style="white-space: nowrap;text-overflow:ellipsis;overflow: hidden;">{{ scope.row.bills.content }}</span>
        </template>
      </el-table-column>
      <el-table-column label="附件" width="160" align="center">
        <template slot-scope="scope">
          <a style="text-decoration:underline" @click="downLoadFile(scope.row.bills.bak)">{{ scope.row.bills.bak |
            parseFilePath() }}</a>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.bills.billStatus | statusFilter">{{ scope.row.bills.billStatus | statusFilterName()
          }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="要号时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.bills.createDate | parseTimestamp() }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template v-if="scope.row.user.id==user" slot-scope="scope">
          <a v-if="scope.row.bills.billStatus==7">
            <el-tooltip content="作废" placement="bottom" effect="light">
              <el-button type="danger" icon="el-icon-delete" circle size="small" @click="delBills(scope.row.bills)" />
            </el-tooltip>
            <el-tooltip content="完成" placement="bottom" effect="light">
              <el-button type="success" icon="el-icon-check" circle size="small" @click="complBills(scope.row.bills)" />
            </el-tooltip>
          </a>
          <a v-else-if="scope.row.bills.billStatus==6">
            <el-tooltip content="作废" placement="bottom" effect="light">
              <el-button type="danger" icon="el-icon-delete" circle size="small" @click="delBills(scope.row.bills)" />
            </el-tooltip>
            <el-tooltip content="执行" placement="bottom" effect="light">
              <el-button type="primary" icon="el-icon-edit" circle size="small" @click="exeBills(scope.row.bills)" />
            </el-tooltip>
          </a>
          <a v-else />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList, downLoadFile } from '@/api/table'
import { upDateSdnum } from '@/api/sdnum'

import { TableTypes, TableNames } from '@/utils'
import { parseTimestamp } from '@/filters'

export default {
  filters: {
  },
  data() {
    return {
      list: null,
      listLoading: true,
      user: '',
      userList: []
    }
  },
  created() {
    this.fetchData(TableTypes[this.$route.name])
    this.$store.dispatch('user/getUserList').then(res => {
      res.forEach(uu => {
        this.userList.push({
          text: uu.userName, value: uu.id
        })
      })
      this.user = localStorage.getItem('user')
    })
  },
  beforeMount() {
  },
  methods: {
    fetchData(typeId) {
      this.listLoading = true
      getList({
        type: typeId
      }).then(response => {
        this.list = response.data.list
        this.listLoading = false
      })
    },
    viewClick(row) {
      this.$store.commit('sdnum/SET_SDNUM', row.bills)
      this.$store.commit('app/CLOSE_EDIT_BILL')
      // this.$router.push('/dashboard')
      this.$router.push('/form/index')
    },
    newBill() {
      this.$store.commit('sdnum/SET_SDNUM', { typeId: TableTypes[this.$route.name] })
      this.$store.commit('app/EDIT_BILL')
      this.$router.push('/form/index')
    },
    downLoadFile(file) {
      const pathList = file.split('/')
      const fileName = pathList[pathList.length - 1]
      downLoadFile(file).then((res) => {
        const data = res.data
        if (!data || data.size <= 0) {
          this.$message.error('文件不存在或已删除！')
          return
        }
        const blob = new Blob([data])
        if (window.navigator.msSaveOrOpenBlob) { // 兼容IE10
          navigator.msSaveBlob(blob, fileName)
        } else { // 其他非IE内核支持H5的浏览器
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', fileName)
          document.body.appendChild(link)
          link.click()
        }
      }
      )
        .catch((err) => {
          this.$message.error(err + '')
        })
    },
    filterTag(value, row) {
      return row.user.id === value
    },
    delBills(bills) {
      if (bills.billStatus === 6 || bills.billStatus === 7) {
        upDateSdnum({
          billsId: bills.id,
          billStatus: 9
        }).then(res => {
          bills.billStatus = 9
        }).catch(err => {
          console.log(err)
        })
      }
    },
    complBills(bills) {
      if (bills.billStatus === 6 || bills.billStatus === 7) {
        upDateSdnum({
          billsId: bills.id,
          billStatus: 8
        }).then(res => {
          bills.billStatus = 8
        }).catch(err => {
          console.log(err)
        })
      }
    },
    exeBills(bills) {
      if (bills.billStatus === 6) {
        upDateSdnum({
          billsId: bills.id,
          billStatus: 7
        }).then(res => {
          console.log(res)
          bills.billStatus = 7
        }).catch(err => {
          console.log(err)
        })
      }
    },
    handleDownload() {
      this.downloadLoading = true

      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['Id', '编号', '要号人', '要号原因', '三单内容', '要号时间']
        const filterVal = ['id', 'name', 'userId', 'reason', 'content', 'createDate']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: TableNames[TableTypes[this.$route.name]] + '单据统计列表',
          autoWidth: true,
          bookType: 'xlsx'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      const users = {}
      this.userList.forEach(user => {
        users[user['value']] = user['text']
      })
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'createDate') {
          return parseTimestamp(v.bills[j])
        } else if (j === 'userId') {
          return users[v.bills[j]]
        } else {
          return v.bills[j]
        }
      }))
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.bills.id === this.$store.state.sdnum.sdnum.id) {
        return 'success-row'
      }
      return ''
    }
  }
}
</script>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
