<template>
  <div class="view-container">
    <!--选项卡标签-->
    <el-tabs v-model="tabsActiveName" type="card" @tab-click="handleClick">
      <el-tab-pane label="初评" name="first">
        <!--筛选-->
        <div class="operateArea">
          <el-input size="small" placeholder="预祝人员姓名" v-model="name"></el-input>
          <el-input size="small" placeholder="证件号码" v-model="idNumber"></el-input>
          <el-button type="primary" icon="search" size="small" @click="select()">查询</el-button>
          <el-button type="danger" icon="delete2" size="small" @click="empty()">清空</el-button>
          <div class="rightArea">
            <router-link to="/dailywork/checkinEdit/0">
              <el-button type="primary" icon="plus"></el-button>
            </router-link>
          </div>
  
        </div>
        <!--表格-->
        <el-table :data="tableData" :stripe="true">
          <el-table-column prop="num" label="序号" width="70"></el-table-column>
          <el-table-column prop="name" label="预住人员姓名"></el-table-column>
          <el-table-column prop="gender" label="性别" width="70"></el-table-column>
          <el-table-column prop="age" label="年龄" width="70"></el-table-column>
          <el-table-column prop="idNumber" label="身份证号" width="186"></el-table-column>
          <el-table-column prop="reservateTime" label="预约时间"></el-table-column>
          <el-table-column prop="contactPerson" label="联系人"></el-table-column>
          <el-table-column prop="phoneNum" label="联系电话"></el-table-column>
          <el-table-column prop="operate" label="操作">
            <template scope="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="面评" name="second"></el-tab-pane>
    </el-tabs>
  
  </div>
</template>
<script>
import { servers } from '../../../api'
export default {
  data() {
    return {
      tabsActiveName: "first",
      tableData: [],//表格数据
      idNumber: "",//筛选条件：身份证号
      name: ""//筛选条件：预住人员姓名
    }
  },
  methods: {
    _init() {
      servers.post('/tableList', (result) => {
        this.tableData = result.data.list
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm('确认删除此条信息?', '删除信息', {
        confirmButtonText: '朕恩准了',
        cancelButtonText: '容朕三思',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => { });
    },
    // 查询
    select() {
      if (this.name != "" || this.idNumber != "") {
        if (this.name != "") {//名字
          let arr = [];
          this.tableData.forEach(function (element) {
            if (element.name.indexOf(this.name) > -1) {
              arr.push(element);
            }
          }, this);
          this.tableData = arr;
        } else if (this.idNumber != "") {

        }
      } else {

      }

    },
    // 清空查询
    empty() {

    }
  },
  created() {
    this._init();
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
    .el-input {
      width: 180px;
      display: inline-block;
    }
    .rightArea {
      float: right;
    }
  }
}
</style>
