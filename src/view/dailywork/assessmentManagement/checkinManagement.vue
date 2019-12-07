<template>
  <div class="view-container">
    <!--选项卡标签-->
    <el-tabs v-model="tabsActiveName" type="card" @tab-click="handleClick">
      <el-tab-pane label="初评" name="first">
        <!--筛选-->
        <div class="operateArea">
          <el-input size="small" placeholder="预祝人员姓名" v-model="selectName"></el-input>
          <el-input size="small" placeholder="证件号码" v-model="idNumber"></el-input>
          <el-button type="primary" icon="search" size="small" @click="getTableList()">查询</el-button>
          <el-button type="danger" icon="delete2" size="small" @click="empty()">清空</el-button>
          <el-button type="warning" icon="plus" size="small" @click="goAddItem()">添加</el-button>

          <div class="rightArea">
            <!--右浮动操作区域-->
          </div>

        </div>
        <!--表格-->
        <el-table :data="tableData" :stripe="true">
          <el-table-column type="index" label="序号" width="70"></el-table-column>
          <el-table-column prop="name" label="预住人员姓名" width="150"></el-table-column>
          <el-table-column prop="gender" label="性别" width="70"></el-table-column>
          <el-table-column prop="age" label="年龄" width="70"></el-table-column>
          <el-table-column prop="idNumber" label="身份证号" ></el-table-column>
          <el-table-column prop="reservationTime" label="预约时间"></el-table-column>
          <el-table-column prop="contactPerson" label="联系人" width="100"></el-table-column>
          <el-table-column prop="contactMobile" label="联系电话"></el-table-column>
          <el-table-column prop="operate" label="操作">
            <template slot-scope="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination v-show="totalCount>=pageSize" @current-change="handleCurrentChange" :total="totalCount" :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="面评" name="second"></el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
import { servers } from '@/service/api'
import store from '@/store'
export default {
  data () {
    return {
      tabsActiveName: 'first',
      tableData: [], // 表格数据
      idNumber: '', // 筛选条件：身份证号
      selectName: '', // 筛选条件：预住人员姓名
      totalCount: 0, // 列表总条数
      currentPage: 1, // 当前页码
      pageSize: 2 // 每页条数
    }
  },
  methods: {
    getTableList () {
      servers.post('/checkinAssessList', { currentPage: this.currentPage, pageSize: this.pageSize, filterName: this.selectName, filterNum: this.idNumber }, (result) => {
        result.list.forEach(function (element) {
          element.reservationTime = element.reservationTime.split('T')[0]
        }, this)
        this.tableData = result.list
        this.totalCount = result.totalCount
      })
    },
    setBreadCrumbs () {
      var list = [{
        name: '评估管理',
        url: null
      }, {
        name: '入住评估',
        url: null
      }]
      store.commit('defineBreadCrumbs', list)
    },
    // 切换tab
    handleClick (tab, event) {
      console.log(tab, event)
    },
    // 编辑信息
    handleEdit (index, row) {
      this.$router.push('/dailywork/checkinEdit/' + row.id)
    },
    // 删除信息
    handleDelete (index, row) {
      this.$confirm('确认删除此条信息?', '删除信息', {
        confirmButtonText: '朕恩准了',
        cancelButtonText: '容朕三思',
        type: 'warning'
      }).then(() => {
        servers.post('/deleteCheckAssessItem', { id: row.id }, (result) => {
          this.getTableList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => { })
    },
    // 清空查询
    empty () {
      this.selectName = ''
      this.idNumber = ''
      this.getTableList()
    },
    // 跳转edit页面
    goAddItem () {
      this.$router.push('/dailywork/checkinEdit/add')
    },
    // 切换分页
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.getTableList()
    }
  },
  created () {
    this.getTableList()
    this.setBreadCrumbs()
  }
}
</script>
<style scoped lang="scss">
@import '../../../sass/common';
.view-container {
  padding: 10px 20px 10px 20px;
  .operateArea {
    margin-bottom: 15px;
    border: 1px solid #E5E9F2;
    padding: 15px;
    background: #EFF2F7;
    border-radius: 5px;
    button {
      a {
        color: #fff;
      }
    }
    .el-input {
      width: 180px;
      display: inline-block;
      margin-right: 10px;
    }
    .rightArea {
      float: right;
    }
  }
  .el-pagination {
    margin-top: 15px;
  }
}
</style>
