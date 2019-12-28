<template>
    
<div class="dashboard-container">
  <el-row>
  <el-button @click="onSubmit(1)">偏离单</el-button>
  <el-button @click="onSubmit(2)" type="primary">更改单</el-button>
  <el-button @click="onSubmit(3)" type="success">外协传真</el-button>
  <el-button @click="onSubmit(4)" type="info">交接单</el-button>
  <el-button @click="onSubmit(5)" type="warning">会议记录</el-button>
  <!-- <el-button type="danger">危险按钮</el-button> -->
</el-row>
  
        <br>
        <el-card class="box-card" shadow="always">
  <div slot="header" class="clearfix">
    <span>新三单编号</span>
    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
  </div>
  <div>
  <span>编号:</span> {{ sdnum.name }}
  </div>
  <br>
  <div>
  日期: {{ sdnum.createDate | parseTimestamp()}}
  </div>
  <br>
</el-card>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'sdnum'
    ])
  },
  filters: {
    timeFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  methods: {
    onSubmit(typeId) {
      this.$store.dispatch('sdnum/genSdnum', {typeId:typeId,userId:this.$store.getters.userId}).then(() => {
          }).catch(() => {
          })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
    width: 800px;
    max-width: 100%;
    margin: 100px auto;
    .pan-back-btn {
      background: #008489;
      color: #fff;
      border: none!important;
    }
    .pan-gif {
      margin: 0 auto;
      display: block;
    }
    .pan-img {
      display: block;
      margin: 0 auto;
      width: 100%;
    }
    .text-jumbo {
      font-size: 60px;
      font-weight: 700;
      color: #484848;
    }
    .list-unstyled {
      font-size: 14px;
      li {
        padding-bottom: 5px;
      }
      a {
        color: #008489;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
}
</style>
