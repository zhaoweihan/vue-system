<template>
    <div class="loginBox">
        <div class="title">欢迎登录</div>
        <div class="loginBody">
            <el-form ref="loginForm" :model="loginForm" :rules="rules">
                <el-form-item label="手机号" prop="account" label-width="54px">
                    <el-input v-model.number="loginForm.account" placeholder="请输入手机号" :maxlength="11" type="tel"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" label-width="54px">
                    <el-input v-model="loginForm.password" placeholder="请输入密码" :type="sayPwdStatus" :icon="sayPwdIcon" :on-icon-click="sayPwd"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="vCode" label-width="54px">
                    <el-input v-model.number="loginForm.vCode" placeholder="请输入验证码" :maxlength="6" type="tel"></el-input>
                </el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')" class="submitBtn loginBtn" native-type="submit">登 录</el-button>
                <el-button type="danger" class="submitBtn" native-type="button" @click="goRegister()">注 册</el-button>
                <p class="findPw">
                    <a href="javascript:;">找回密码</a>
                </p>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        // 手机号
        var checkMobile = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('手机号不能为空'));
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    let rex = /^1[3,4,5,7,8]{1}[0-9]{9}$/;
                    if (!rex.test(value)) {
                        callback(new Error('手机号格式不正确'));
                    } else {
                        callback();
                    }
                }
            }, 1000);
        };
        // 密码
        var checkPassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                let rex = /^[0-9a-zA-Z_]{6,18}$/;
                if (!rex.test(value)) {
                    callback(new Error('密码必须为6-18位的数字、字母、下划线'));
                } else {
                    callback();
                }
            }
        };
        // 验证码
        var checkvCode = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('验证码不能为空'));
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入整数'));
                } else {
                    let rex = /^[0-9]{4,6}$/;
                    if (!rex.test(value)) {
                        callback(new Error('验证码格式不正确'));
                    } else {
                        callback();
                    }
                }
            }, 1000);
        };
        return {
            loginForm: {
                account: '',
                password: '',
                vCode: ''
            },
            rules: {
                account: [{ validator: checkMobile, trigger: 'blur' }],
                password: [{ validator: checkPassword, trigger: 'blur' }],
                vCode: [{ validator: checkvCode, trigger: 'blur' }]

            },
            sayPwdStatus: 'password',
            sayPwdIcon:'view'
        }
    },
    methods: {
        sayPwd(ev) {
            if (this.sayPwdStatus == 'password') {
                this.sayPwdStatus = 'text'
                this.sayPwdIcon='search'
            } else {
                this.sayPwdStatus = 'password'
                this.sayPwdIcon='view'
            }
        },
        submitForm(formName) {
            const self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$message({
                        message: '恭喜你，登录成功',
                        type: 'success',
                        duration: 1000,
                        onClose() {
                            localStorage.setItem('mobile', self.loginForm.account);
                            localStorage.setItem('nickname', '黑色摩天轮');
                            localStorage.setItem('realname', '赵日天');
                            localStorage.setItem('gender', '男');
                            localStorage.setItem('headPic', 'http://ocif3scej.bkt.clouddn.com/tz2.jpg');
                            self.$router.replace('/dailywork/checkinManagement');
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 去注册
        goRegister(){
             this.$emit('changeStatus', 0)
        }
    }
}
</script>

<style lang="scss">
    @import '../sass/loginCom'
</style>

