<template>
    <el-row>
        <el-col :span="3">
            <div class="station">1</div>
        </el-col>
        <el-col :span="6">
            <el-form ref="form" :model="form" label-width="180px">
                <el-form-item label="预住人员姓名：">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="性别：">
                    <el-radio-group v-model="form.age">
                        <el-radio-button label="男"></el-radio-button>
                        <el-radio-button label="女"></el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="年龄：">
                    <el-input type="tel" v-model="form.gender"></el-input>
                </el-form-item>
                <el-form-item label="身份证号：">
                    <el-input type="tel" v-model="form.idNumber"></el-input>
                </el-form-item>
                <el-form-item label="预约时间：">
                    <el-date-picker v-model="form.reservateTim" type="date" placeholder="选择日期" :editable="false" :picker-options="pickerOptions1">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="联系人：">
                    <el-input v-model="form.contactPerson"></el-input>
                </el-form-item>
                <el-form-item label="预约电话：">
                    <el-input type="tel" v-model="form.phoneNum"></el-input>
                </el-form-item>
                <div class="submit"><el-button type="primary" size="large" @click="onSubmit">保 存</el-button></div>
                
            </el-form>
        </el-col>
        <el-col :span="15">
            <div class="station">{{form}}</div>
        </el-col>
    </el-row>
</template>
<script>
export default {
    data() {
        return {
            msg: "alk",
            form: {
                name: '',
                gender: '',
                age: '',
                idNumber: '',
                reservateTim: '',
                contactPerson: '',
                phoneNum: '',
            },
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
    methods:{
        onSubmit(){
            alert("ok");
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../../sass/common';
.station {
    visibility: hidden;
}

.el-form {
    margin: 15px 0;
    .submit{
        text-align: center;
    }
}
</style>


