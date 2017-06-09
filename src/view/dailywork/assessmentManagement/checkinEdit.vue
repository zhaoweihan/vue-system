<template>
    <el-row>
        <el-col :span="3">
            <div class="station">1</div>
        </el-col>
        <el-col :span="6">
            <el-form ref="form" :model="form" label-width="180px">
                <el-form-item label="预住人员姓名：">
                    <el-input v-model="forms.name" name="username" :maxlength="6"></el-input>
                </el-form-item>
                <el-form-item label="性别：">
                    <el-radio-group v-model="forms.age">
                        <el-radio-button label="男"></el-radio-button>
                        <el-radio-button label="女"></el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="年龄：">
                    <el-input type="tel" v-model="forms.gender"></el-input>
                </el-form-item>
                <el-form-item label="身份证号：">
                    <el-input type="tel" v-model="forms.idNumber" :maxlength="18"></el-input>
                </el-form-item>
                <el-form-item label="预约时间：">
                    <el-date-picker v-model="forms.reservateTime" type="date" placeholder="选择日期" :editable="false" :picker-options="pickerOptions1">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="联系人：">
                    <el-input v-model="forms.contactPerson" :maxlength="6"></el-input>
                </el-form-item>
                <el-form-item label="预约电话：">
                    <el-input type="tel" v-model="forms.phoneNum" :maxlength="11"></el-input>
                </el-form-item>
    
                <div class="submit">
                    <el-button type="primary" size="large" @click="onSubmit">保 存</el-button>
                </div>
    
            </el-form>
        </el-col>
        <el-col :span="15">
            <div class="station">{{forms}}</div>
            <!--<input type="text" name="mobile" v-validate="'required|mobile'">
                                        <p>
                                            <span v-show="errors.has('mobile')" class="help is-danger">{{ errors.first('mobile') }}</span>
                                        </p>-->
        </el-col>
    </el-row>
</template>
<script>
import store from '@/store'
export default {
    data() {
        return {
            forms: {
                name: '',
                gender: '',
                age: '',
                idNumber: '',
                reservateTime: '',
                contactPerson: '',
                phoneNum: '',
            },
            form: {},
            pickerOptions1: {
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
        }
    },
    methods: {
        init() {
            if (this.$route.params.id != "add") {
                let tableData = JSON.parse(localStorage.getItem("tableData"));
                this.forms = tableData[this.$route.params.id];
            }
        },
        setBreadCrumbs() {
            var list = [{
                name: '评估管理',
                url: null,
            }, {
                name: '入住评估',
                url: '/dailywork/checkinManagement'
            }, {
                name: '评估编辑',
                url: null
            }]
            store.commit('defineBreadCrumbs', list)
        },
        onSubmit(submitKey = true) {
            const self = this;
            for (var key in this.forms) {
                if (this.forms[key] == "") {
                    submitKey = false;
                }
            }
            if (submitKey) {
                if (localStorage.getItem('tableData')) {//首先判断缓存里是否有值，没有则新声明一个数据否则，直接用缓存里的数组
                    var arr = JSON.parse(localStorage.getItem("tableData"));//拿到缓存中的数据
                    if (this.$route.params.id != "add") {//判断是新建还是修改，修改的话则改动原数据
                        arr[this.$route.params.id] = this.forms;
                    } else {//新建，直接插入数据
                        arr.push(this.forms);
                    }
                } else {//缓存里没值，新声明数组并直接插入数据
                    var arr = []
                    arr.push(this.forms);
                }


                localStorage.setItem("tableData", JSON.stringify(arr));
                this.$message({
                    message: '保存成功',
                    type: 'success',
                    duration: 1500,
                    onClose(msg) {
                        self.$router.push('/dailywork/checkinManagement');
                    }
                });
            } else {
                this.$message.error('所有输入项必须全部完成');
            }
        }
    },
    created() {
        this.init();
        this.setBreadCrumbs();
    }
}
</script>
<style  lang="scss">
@import '../../../sass/common';
.station {
    visibility: hidden;
}

.el-form {
    margin: 15px 0;
    .el-input.error {
        input {
            border: 1px solid $Danger;
        }
    }
    .errorMsg {
        color: $Danger;
    }
    .submit {
        text-align: center;
    }
}
</style>


