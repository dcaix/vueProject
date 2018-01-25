<template>
  <div >
      <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>商品管理</el-breadcrumb-item>
          <el-breadcrumb-item>分类参数</el-breadcrumb-item>
        </el-breadcrumb>
      <div class="block">
         <el-cascader
            :options="cateList"
            :props='propsDefine'
            v-model="selectedOptions"
            @change="handleChange"
            :show-all-levels="false">
          </el-cascader>
        </div>
        <el-tabs type="border-card"  @tab-click='toggleTab'>
            <el-tab-pane label="动态参数">
                <el-table
                :data="dynamicData"
                style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                      <el-tag
                      :key="tag"
                      v-for="tag in props.row.attr_vals.split(',')"
                      closable
                      size="small"
                      :disable-transitions="false"
                      @close="handleClose(tag)">
                      {{tag}}
                    </el-tag>
                    <el-input
                      class="input-new-tag"
                      v-if="inputVisible"
                      v-model="inputValue"
                      ref="saveTagInput"
                      size="mini"
                      @keyup.enter.native="handleInputConfirm"
                      @blur="handleInputConfirm"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="mini" @click="showInput">+ 增加值</el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  label="#"
                  type="index">
                </el-table-column>
                <el-table-column
                  label="商品参数"
                  prop="attr_name">
                </el-table-column>
                <el-table-column
                  label="操作">
                  <template slot-scope="scope">
                      <el-button size='small' type="primary" icon="el-icon-edit"></el-button>
                      <el-button size='small' type="danger" icon="el-icon-delete"></el-button>
                    </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="静态属性">
                <el-table
                :data="staticData"
                style="width: 100%">
                <el-table-column
                  type="index"
                  label="#"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="attr_name"
                  label="属性名称"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="attr_vals"
                  label="属性值">
                </el-table-column>
              </el-table>
            </el-tab-pane>
         </el-tabs>
  </div>
</template>
<script>
import {getCategories, getParams} from '../../api/api.js'
export default {
  data () {
    return {
      dynamicData: [],
      staticData: [],
      nowTab: 0,
      selectedOptions: [],
      propsDefine: {
        value: 'cat_id',
        label: 'cat_name'
      },
      cateList: [],
      inputValue: '',
      inputVisible: false
    }
  },
  methods: {
    toggleTab (val) {
      // 切换选项卡操作
      console.log(val.index)
      if (val.index === '0') {
        this.nowTab = 0
        this._getParamsData('dynamicData')
      } else {
        this.nowTab = 1
        this._getParamsData('staticData')
      }
    },
    handleChange () {
      this.nowTab = 0
      this._getParamsData('dynamicData')
    },
    _getParamsData (tab) {
      var len = this.selectedOptions.length
      if (len !== 3) {
        this.$message({
          message: '必须选择3级分类',
          type: 'warning'
        })
        return
      }
      let cid = this.selectedOptions[2]
      let flag = this.nowTab === 0 ? 'many' : 'only'
      getParams({id: cid, sel: flag}).then(res => {
        if (res.meta.status === 200) {
          console.log(tab + '-------------')
          console.log(res.data[0].attr_vals.split(','))
          console.log(res.data)
          this[tab] = res.data
        }
      })
    },
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  },
  mounted () {
    getCategories({type: 3}).then(res => {
      if (res.meta.status === 200) {
        this.cateList = res.data
      }
    })
  }
}
</script>
<style >
    .el-breadcrumb {
      background-color: #D3DCE6;
      height: 50px;
      line-height: 50px;
      padding-left: 10px;
    }
    .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
