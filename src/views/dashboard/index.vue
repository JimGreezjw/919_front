<template>

  <div class="dashboard-container">
    <el-card class="box-card" shadow="always">
      <div slot="header" class="clearfix">
        <span><i class="el-icon-upload el-icon--right"></i>&nbsp;&nbsp;三单详情</span>
<!--        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
      </div>
      <div style="margin-top:30px;letter-spacing: 0.15em;">
        <ul><i class="el-icon-caret-right" />&nbsp;&nbsp;编号:<span style="letter-spacing: 0.1em;font-family: 'Times New Roman';color: #1482f0">{{ sdnum.name }}</span></ul>
        <ul><i class="el-icon-caret-right" />&nbsp;&nbsp;日期:<span style="letter-spacing: 0.1em;font-family: 'Times New Roman';color: #1482f0"> {{ sdnum.createDate | parseTimestamp() }}</span></ul>
          <ul><i class="el-icon-caret-right" />&nbsp;&nbsp;要号原因:<span style="letter-spacing: 0.1em;font-family: '楷体';color: #1482f0"> {{ sdnum.reason }}</span></ul>
        <ul><i class="el-icon-caret-right" />&nbsp;&nbsp;内容: <article style="letter-spacing: 0.1em;font-family: '楷体';color: #1482f0;text-indent:2em;padding: 1em 2em 0 1em;line-height:2em;
">{{ sdnum.content }}</article></ul>
        <ul><i class="el-icon-caret-right" />&nbsp;&nbsp;附件: <span style="letter-spacing: 0.1em;font-family: '楷体';color: #1482f0">{{ sdnum.bak | parseFilePath}}</span></ul>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: '',
  computed: {
    ...mapGetters([
      'sdnum'
    ])
  },

  created() {
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
  methods: {}
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
      border: none !important;
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
      letter-spacing: 0.3em;

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
