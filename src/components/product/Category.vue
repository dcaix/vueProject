<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-button type="success" plain @click='addHandler'>添加分类</el-button>
    </div>
    <div>
        <!-- columns表示所有的列，tree-structure表示数据格式，data-source表示实际的列表数据，deleteCate处理删除操作，showForm处理编辑操作，refresh处理刷新操作 -->
        <tree-grid :columns="columns" :tree-structure="true" :data-source="dataSource" @deleteCate="deleteCategory" @showForm="showEditForm" @refresh="initList"></tree-grid>
    </div>
    <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[5, 10, 50, 100]"
    :page-size="pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
      <!-- 添加分类弹窗 -->
      <el-dialog
      title="添加分类"
      :visible="dialogVisible4Add"
      width="50%">
      <div>
        <span>分类名称：</span>
        <el-input class='cname' v-model="cate.cat_name"></el-input>
      </div>
      <div>
        <span>父级分类：</span>
        <el-cascader
          :options="cateList"
          v-model="selectedOptions"
          :props='propsDefine'
          :show-all-levels="true"
          >
        </el-cascader>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible4Add = false">取 消</el-button>
        <el-button type="primary" @click="submitCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import TreeGrid from './TreeGrid.vue'
import {getCategories, addCate} from '../../api/api.js'

export default {
  data () {
    return {
      propsDefine: {
        value: 'cat_id',
        label: 'cat_name'
      },
      dialogVisible4Add: false,
      cateList: [],
      selectedOptions: [],
      cate: {
        cat_name: ''
      },
      columns: [{
        text: '分类名称',
        dataIndex: 'cat_name',
        width: 500
      }, {
        text: '是否有效',
        dataIndex: 'cat_deleted',
        width: 100
      }, {
        text: '排序',
        dataIndex: 'cat_level',
        width: 100
      }],
      dataSource: [],
      currentPage: 1,
      pagesize: 5,
      total: 0
    }
  },
  components: {
    TreeGrid
  },
  methods: {
    addHandler () {
    // 获取所有的分类列表数据
      getCategories({type: 2}).then(res => {
        if (res.meta.status === 200) {
          this.cateList = res.data
          this.dialogVisible4Add = true
        }
      })
    },
    submitCate () {
      let params = {}
      params.cat_name = this.cate.cat_name
      params.cat_pid = this.selectedOptions[this.selectedOptions.length - 1]
      var length = this.selectedOptions.length
      if (length === 0) {
        params.cat_pid = 0
        params.cat_level = 0
      } else {
        params.cat_level = length === 1 ? 1 : 2
      }
      addCate(params).then(res => {
        if (res.meta.status === 201) {
          // 刷新列表
          this.initList()
          // 关闭窗口
          this.dialogVisible4Add = false
          // 提示
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
        }
      })
    },
    showEditForm (cid) {
      console.log(cid)
    },
    deleteCategory (cid) {
      console.log(cid)
    },
    initList () {
      getCategories({type: 3, pagenum: this.currentPage, pagesize: this.pagesize}).then(res => {
        if (res.meta.status === 200) {
          this.dataSource = res.data.result
          this.total = res.data.total
        }
      })
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.initList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.initList()
    }
  },
  mounted () {
    this.initList()
  }
}

</script>
<style>
    .el-breadcrumb {
      background-color: #D3DCE6;
      height: 50px;
      line-height: 50px;
      padding-left: 10px;
    }
</style>
