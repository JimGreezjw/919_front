<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="三单类型">
      <el-input v-model="form.first_name" />
    </el-form-item>
    <el-form-item label="第一位">
      <el-input v-model="form.first_name" />
    </el-form-item>
    <el-form-item label="第二位">
      <el-select v-model="form.second_name" placeholder="请选择活动区域">
        <el-option label="-" value="-" />
        <el-option label="" value=" " />
      </el-select>
    </el-form-item>
    <el-form-item label="第三位">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="两位数年份" value="两位数年份" />
        <el-option label="四位数年份" value="四位数年份" />
      </el-select>
    </el-form-item>
    <el-form-item label="第四位">
      <el-switch v-model="form.delivery" />
    </el-form-item>
    <el-form-item label="第五位">
      <el-radio-group v-model="form.resource">
        <el-radio label="线上品牌商赞助" />
        <el-radio label="线下场地免费" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="第六位">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item label="第七位">
      <el-radio-group v-model="form.resource">
        <el-radio label="线上品牌商赞助" />
        <el-radio label="线下场地免费" />
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        first_name: '',
        second_name: '',
        third_name: '',
        fourth_name: '',
        fifth_name: '',
        sixth_name: '',
        sevenths_name: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>
