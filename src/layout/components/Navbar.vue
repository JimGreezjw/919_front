<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          当前用户： <span>{{ userName }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <!-- <router-link to="/">
            <el-dropdown-item>
              Home
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a> -->
          <el-dropdown-item>
            <span style="display:block;" @click="showPwdDialog"><i class="el-icon-edit" />修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <el-dropdown-item>
              <span style="display:block;" @click="logout"><i class="el-icon-delete" />登出</span>
            </el-dropdown-item>
          </el-dropdown-item></el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" :model="ruleForm" status-icon>
        <el-form-item label="旧密码" :label-width="formLabelWidth" required>
          <el-input v-model="ruleForm.oldPass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" required>
          <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth" required>
          <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      userName: localStorage.getItem('userName'),
      ruleForm: {
        oldPass: '',
        pass: '',
        checkPass: ''
      },
      formLabelWidth: '120px',
      dialogFormVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$store.commit('sdnum/SET_SDNUM', {})
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    showPwdDialog() {
      this.dialogFormVisible = true
      this.ruleForm = {
        oldPass: '',
        pass: '',
        checkPass: ''
      }
    },
    submitForm(formName) {
      console.log(this.ruleForm)
      if (!this.ruleForm.oldPass) {
        alert('旧密码不允许为空')
        return
      }
      if (!this.ruleForm.pass) {
        alert('新密码不允许为空')
        return
      }
      if (!this.ruleForm.checkPass || this.ruleForm.checkPass !== this.ruleForm.pass) {
        alert('两次密码输入不一致')
        return
      }
      this.$store.dispatch('user/changePwd', {
        'id': localStorage.getItem('user'),
        'oldPass': this.ruleForm.oldPass,
        'pass': this.ruleForm.pass
      }).then((res) => {
        if (res.code === 200) {
          this.$message(res.data)
          this.dialogFormVisible = !this.dialogFormVisible
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    color:aqua;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
      span {
        color:blue;
        font-weight:bold
        }

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
