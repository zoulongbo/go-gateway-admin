<template>
  <div class="mixin-components-container">
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span v-if="isEdit===false">创建租户</span>
          <span v-if="isEdit===true">修改租户</span>
        </div>
        <div style="margin-bottom:50px;">
          <el-form ref="form" :model="form" label-width="140px">
            <el-form-item label="appId" class="is-required">
              <el-input v-model="form.app_id" placeholder="6-128位字母数字下划线" :disabled="isEdit===true" />
            </el-form-item>
            <el-form-item label="租户名称" class="is-required">
              <el-input v-model="form.name" placeholder="最多255字符，必填" :disabled="isEdit===true" />
            </el-form-item>
            <el-form-item label="32位密钥">
              <el-input v-model="form.secret" placeholder="32位字符串，非必填，自动生成" />
            </el-form-item>
            <el-form-item label="QPS限流">
              <el-input v-model="form.qps" placeholder="0表示无限制" />
            </el-form-item>

            <el-form-item label="日请求量限流">
              <el-input v-model="form.qpd" placeholder="0表示无限制" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :disabled="submitButDisabled" @click="handleSubmit">立即提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { appDetail, appCreate, appEdit } from '@/api/app'

export default {
  name: 'ServiceCreateHttp',
  data() {
    return {
      isEdit: false,
      submitButDisabled: false,
      form: {
        app_id: '',
        name: '',
        secret: '',
        qpd: undefined,
        qps: undefined
      }
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    if (id > 0) {
      this.isEdit = true
      this.fetchData(id)
    }
  },
  methods: {
    fetchData(id) {
      const query = { 'id': id }
      appDetail(query).then(response => {
        this.form.id = response.data.id
        this.form.app_id = response.data.app_id
        this.form.name = response.data.name
        this.form.secret = response.data.secret
        this.form.qpd = response.data.qpd
        this.form.qps = response.data.qps
      }).catch(() => {
      })
    },
    handleSubmit() {
      this.submitButDisabled = true
      const postData = Object.assign({}, this.form)
      console.log(postData)
      postData.qpd = Number(postData.qpd)
      postData.qps = Number(postData.qps)
      if (this.isEdit) {
        appEdit(postData).then(response => {
          this.submitButDisabled = false
          this.$notify({
            title: 'Success',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
        }).catch(() => {
          this.submitButDisabled = false
        })
        this.$router.push('/app/list')
      } else {
        appCreate(postData).then(response => {
          this.submitButDisabled = false
          this.$notify({
            title: 'Success',
            message: '添加成功',
            type: 'success',
            duration: 2000
          })
          this.$router.push('/app/list')
        }).catch(() => {
          this.submitButDisabled = false
        })
      }
    }
  }
}
</script>

<style scoped>
.mixin-components-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: calc(100vh - 84px);
}
.component-item{
  min-height: 100px;
}
</style>
