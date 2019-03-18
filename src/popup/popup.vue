<template>
  <el-main>
    <el-row>
      <el-form ref="form" @submit.native.prevent="onSubmit" :model="form" class="main-wrapper">
        <el-form-item>
          <el-input placeholder="Please input" v-model="form.text" required autofocus="">
            <el-button slot="append" icon="el-icon-search" @click="onSubmit"></el-button>
          </el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row v-if="tableData.length">
      <el-table
        v-loading="isLoading"
        :data="tableData"
        style="width: 100%">
         <el-table-column
          label="Action"
          width="80">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleSave(scope.$index, scope.row)">Save</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="key"
          label="Key">
        </el-table-column>
        <el-table-column
          prop="value"
          label="Value">
        </el-table-column>
      </el-table>
    </el-row>
  </el-main>
</template>

<script>
  import Api from './../ext/api.js'

  export default {
    data: () => ({
      isLoading: false,
      text: null,
      tableData: [],
      form: {
        text: ''
      }
    }),
    computed: { },
    created () {
      this.init()
    },
    mounted () { },
    methods: {
      async init () {
        const text = await navigator.clipboard.readText()
        if (text) {
          this.text = text
          this.onSubmit()
        }
      },
      async onSubmit () {
        this.isLoading = true
        const { translations } = await Api.translate(this.form.text)
        this.tableData = translations.filter(item => !!item)
        this.isLoading = false
      },
      async handleSave (index, row) {
        this.isLoading = true
        await Api.save(row)
        this.isLoading = false
        this.$message({
          showClose: true,
          message: 'Translation saved',
          type: 'success'
        })
      }
    }
  }
</script>
<style lang="scss">
  .main-wrapper {
    width: 400px;
  }
</style>