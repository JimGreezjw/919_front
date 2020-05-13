<template>
  <div class="app-container">
    <el-form ref="form" label-width="120px">
      <el-form-item v-if="!isNewBill" label="三单编号" placeholder="">
        <el-input v-model="billName" disabled />
      </el-form-item>
      <el-form-item label="三单类型">
        <!--        <el-select v-model="form.sdtype" placeholder="请选择三单类型" :disabled="!isNewBill">-->
        <el-select v-model="form.sdtype" placeholder="请选择三单类型" disabled>
          <el-option
            v-for="item in sdOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="要号原因" placeholder="工作">
        <el-input v-model="form.reason" :disabled="!isNewBill && !edit" />
      </el-form-item>
      <el-form-item v-if="isNewBill" label="激活使用">
        <el-switch v-model="form.active" />
      </el-form-item>

      <el-form-item v-else label="三单状态" placeholder="">
        <template>
          <el-tag :type="billStatus | statusFilter">{{ billStatus | statusFilterName() }}
          </el-tag>
        </template>
      </el-form-item>

      <el-form-item label="内容">
        <el-input v-model="form.content" type="textarea" :disabled="!isNewBill && !edit" />
      </el-form-item>
      <el-form-item v-if="isNewBill || edit" label="文件上传">
        <el-upload
          ref="upload"
          class="upload-demo"
          action="/api/upload/"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :on-success="fileUpSuccess"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
        </el-upload>
      </el-form-item>
      <el-form-item v-else label="附件">
        <template>
          <a style="text-decoration:underline" @click="downLoadFile(realFilePath)">{{ realFilePath | parseFilePath() }}</a>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button v-if="isNewBill" type="primary" @click="onSubmit">要号</el-button>
        <el-button v-else-if="!isNewBill && !edit" type="primary" :disabled="!editable" @click="editBill">编辑</el-button>
        <el-button v-else type="success" @click="modifyBill">确定</el-button>

        <el-button @click="onCancel">{{ !this.isNewBill && this.edit?'取消':'返回' }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getTypes } from '@/api/sdnum'
import { downLoadFile } from '@/api/table'
import { upDateSdnum } from '@/api/sdnum'
import { TableRoute } from '@/utils'

export default {
  data() {
    return {
      form: {
        sdtype: '',
        reason: '',
        active: true,
        content: '',
        resource: '',
        desc: ''
      },
      billName: '',
      billId: '',
      billStatus: '',
      sdOptions: [],
      fileList: [],
      realFilePath: '',
      editable: false,
      isNewBill: true
    }
  },
  computed: {
    edit() {
      return this.$store.state.app.editBills
    }
  },
  created() {
    this.fetchData()
    this.getBillData()
  },
  methods: {
    getBillData() {
      const bill = this.$store.state.sdnum.sdnum
      if (bill && bill.name) {
        this.isNewBill = false
      }
      this.billId = bill.id
      this.billName = bill.name
      this.form.reason = bill.reason
      this.form.sdtype = bill.typeId
      this.form.content = bill.content
      this.realFilePath = bill.bak
      this.billStatus = bill.billStatus
      // eslint-disable-next-line eqeqeq
      this.editable = bill.userId == localStorage.getItem('user') && (bill.billStatus != 8 && bill.billStatus != 9)
    },
    fetchData() {
      getTypes({
        typeName: 'sdtype'
      }).then(response => {
        const typesList = response.data
        typesList.forEach((ele) => {
          this.sdOptions.push({
            value: ele.id,
            label: ele.name
          })
        })
      })
    },
    onSubmit() {
      this.$store.dispatch('sdnum/genSdnum', {
        typeId: this.form.sdtype,
        userId: localStorage.getItem('user'),
        content: this.form.content,
        reason: this.form.reason,
        filepath: this.realFilePath,
        status: Number(this.form.active) + 6
      }).then((res) => {
        if (res.code === 200) {
          this.$message('三单生成成功!')
          this.$router.push(`/table/${TableRoute[this.form.sdtype]}`)
        }
      }).catch(() => {
      })
    },
    modifyBill() {
      upDateSdnum({
        billsId: this.billId,
        content: this.form.content,
        filepath: this.realFilePath,
        reason: this.form.reason
      }).then(res => {
        if (res.code === 200) {
          this.$message('三单修改成功!')
          this.$router.push(`/table/${TableRoute[this.form.sdtype]}`)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    editBill() {
      this.$store.commit('app/EDIT_BILL')
    },
    onCancel() {
      if (!this.isNewBill && this.edit) {
        this.$message({
          message: '取消!',
          type: 'warning'
        })
        this.$store.commit('app/CLOSE_EDIT_BILL')
      } else {
        // this.$message({
        //   message: '取消!',
        //   type: 'warning'
        // })
        this.$router.go(-1)
      }
    },
    fileUpSuccess(res) {
      console.log(111111);
      if (res.code === 200) {
        this.realFilePath = res.data
      }
      // this.fileList=[];
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
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
    }
  }
}
</script>

<style scoped>
  .line {
    text-align: center;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 78px;
    line-height: 78px;
    text-align: center;
  }
</style>

