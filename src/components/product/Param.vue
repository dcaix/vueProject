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
        <el-tabs type="border-card" :value='nowTab' @tab-click='toggleTab'>
            <el-tab-pane label="动态参数" name="dynamic">
              <el-button type="success" plain @click="addParamVisible = true">添加参数名称</el-button>
              <el-table
                :data="dynamic"
                style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                      <el-tag
                      :key="tag"
                      v-for="tag in props.row.attr_vals?props.row.attr_vals.split(','):null"
                      closable
                      size="small"
                      :disable-transitions="false"
                      @close="deleParam(tag,props.row)">
                      {{tag}}
                    </el-tag>
                    <el-input
                      class="input-new-tag"
                      v-if="props.row.attr_id === clickId"
                      v-model="inputValue"
                      size="mini"
                      ref="saveTagInput"
                      @keyup.enter.native="handleInputConfirm"
                      @blur="handleInputConfirm(props.row)"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="mini" @click="showInput(props.row.attr_id)">+ 增加值 {{props.row.attr_id}}</el-button>
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
            <el-tab-pane label="静态属性" name="stat">
                <el-button type="success" plain @click="addAttrVisible = true">增加静态属性</el-button>
              <el-table
                :data="stat"
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
         <!-- 添加参数名称的对话框 -->
         <el-dialog title="添加参数名称" :visible.sync="addParamVisible">
            <el-form :model="form4addParam">
              <el-form-item label="参数名称" >
                <el-input v-model="form4addParam.name" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addParamVisible = false">取 消</el-button>
              <el-button type="primary" @click="addParam">确 定</el-button>
            </div>
          </el-dialog>
            <!-- 添加静态属性的对话框 -->
         <el-dialog title="添加属性" :visible.sync="addAttrVisible">
            <el-form :model="form4addAttr">
              <el-form-item label="属性名称" >
                <el-input v-model="form4addAttr.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="属性值" >
                  <el-input v-model="form4addAttr.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addAttrVisible = false">取 消</el-button>
              <el-button type="primary" @click="addAttrVisible = false">确 定</el-button>
            </div>
          </el-dialog>
  </div>
</template>
<script>
import {getCategories, getParams, addParam, editParam} from '../../api/api.js'
export default {
  data () {
    return {
      dynamic: [],
      stat: [],
      nowTab: 'dynamic',
      selectedOptions: [],
      propsDefine: {
        value: 'cat_id',
        label: 'cat_name'
      },
      cateList: [],
      inputValue: '',
      inputAdd: '',
      clickId: '',
      addParamVisible: false,
      addAttrVisible: false,
      form4addParam: {
        name: ''
      },
      form4addAttr: {
      }
    }
  },
  methods: {
    addParam (val) {
      let addP = {}
      addP.attr_name = this.form4addParam.name
      addP.attr_sel = 'many'
      addP.attr_vals = ''
      addP.id = this.dynamic[0].cat_id
      addParam(addP).then(res => {
        if (res.meta.status === 201) {
          this._getParamsData('dynamic')
          this.addParamVisible = false
        }
      })
    },
    toggleTab (val) {
      // 切换选项卡操作
      this._getParamsData(val.name)
    },
    handleChange () {
      this._getParamsData('dynamic')
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
      let flag = tab === 'dynamic' ? 'many' : 'only'
      getParams({id: cid, sel: flag}).then(res => {
        if (res.meta.status === 200) {
          this[tab] = res.data
          console.log(res.data)
        }
      })
    },
    handleClose (tag) {
      // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    // 显示输入框
    showInput (id) {
      this.clickId = id
      // 输入框自动聚焦
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 输入框移除光标时提交添加
    handleInputConfirm (val) {
      let inputValue = this.inputValue
      if (inputValue) {
        if (!val.attr_vals) {
          val.attr_vals = inputValue
        } else {
          val.attr_vals = val.attr_vals + ',' + inputValue
        }
      }
      editParam(val).then(res => {
        console.log(res)
        if (res.meta.status === 201) {
          this._getParamsData('dynamic')
          this.addParamVisible = false
        }
      })
      this.clickId = ''
      this.inputValue = ''
    },
    deleParam (tag, val) {
      console.log(tag, val)
      var arr = val.attr_vals.split(',')
      arr.splice(arr.indexOf(tag), 1)
      val.attr_vals = arr.join(',')
      editParam(val).then(res => {
        console.log(res)
        if (res.meta.status === 201) {
          this._getParamsData('dynamic')
          this.addParamVisible = false
        }
      })
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
