<template>
    <div class="loginBox">
        <div class="title">欢迎注册</div>
        <div class="loginBody">
            <el-form ref="registerForm" :model="registerForm" :rules="rules">
                <el-form-item label="手机号" prop="mobile" label-width="68px">
                    <el-input v-model.number="registerForm.mobile" placeholder="请输入手机号" :maxlength="11" type="tel"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" label-width="68px">
                    <el-input v-model="registerForm.password" placeholder="请输入密码" type="password" :maxlength="18"></el-input>
                </el-form-item>
                <el-form-item label="重复密码" prop="repPassword" label-width="68px">
                    <el-input v-model="registerForm.repPassword" placeholder="请再一次输入密码" type="password" :maxlength="18"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="vCode" label-width="68px">
                    <el-input v-model.number="registerForm.vCode" placeholder="请输入验证码" :maxlength="6" type="tel" class="vcodeInput"></el-input>
                    <el-button type="danger" class="vcodeBtn" native-type="button" :disabled="isSendVcode" @click="sendVocde()">{{sendVocodeWord}}</el-button>
                </el-form-item>
                <el-button type="primary" @click.prevent="submitForm('registerForm')" class="submitBtn loginBtn" native-type="submit">注 册</el-button>
                <el-button type="danger" class="submitBtn" native-type="button" @click="goLogin()">登录</el-button>
            </el-form>
        </div>
    </div>
</template>
<script>
import { servers } from '../service/api'
export default {
  data () {
    // 手机号
    var checkMobile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          let rex = /^1[3,4,5,7,8]{1}[0-9]{9}$/
          if (!rex.test(value)) {
            callback(new Error('手机号格式不正确'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    // 密码
    var checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        let rex = /^[0-9a-zA-Z_]{6,18}$/
        if (!rex.test(value)) {
          callback(new Error('密码必须为6-18位的数字、字母、下划线'))
        } else {
          callback()
        }
      }
    }
    // 重复密码
    var checkRepPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    // 验证码
    var checkvCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入整数'))
        } else {
          let rex = /^[0-9]{4,6}$/
          if (!rex.test(value)) {
            callback(new Error('验证码必须为4-6位整数'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    return {
      registerForm: {
        mobile: '',
        password: '',
        repPassword: '',
        vCode: ''
      },
      rules: {
        mobile: [{ validator: checkMobile, trigger: 'blur' }],
        password: [{ validator: checkPassword, trigger: 'blur' }],
        repPassword: [{ validator: checkRepPassword, trigger: 'blur' }],
        vCode: [{ validator: checkvCode, trigger: 'blur' }]
      },
      isSendVcode: true, // 是否可以发送验证码
      sendVocodeWord: '发送验证码'
    }
  },
  methods: {
    // 发送验证码
    sendVocde () {
      this.$refs.registerForm.validateField('mobile', (errorMessage) => {
        if (errorMessage === '') {
          this.isSendVcode = true
          this.sendVocodeWord = 60
          const sendvCodeTimer = setInterval(() => {
            if (this.sendVocodeWord === 0) {
              this.sendVocodeWord = '再次发送'
              this.isSendVcode = false
              clearInterval(sendvCodeTimer)
            } else {
              this.sendVocodeWord--
            }
          }, 1000)
        }
      })
    },
    // 提交注册
    submitForm (formName) {
      var self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          servers.post('/register', {
            account: this.registerForm.mobile,
            password: this.registerForm.password,
            vCode: this.registerForm.vCode
          }, (result) => {
            this.$message({
              message: '注册成功',
              type: 'success',
              duration: 1000,
              onClose () {
                self.goLogin()
              }
            })
          })
        }
      })
    },
    // 翻转到登录
    goLogin () {
      this.$emit('changeStatus', 1)
    }
  },
  watch: {
    registerForm: {
      handler (o, n) {
        if (this.registerForm.mobile !== '') {
          this.isSendVcode = false
        }
      },
      deep: true
    }
  }

}
</script>
<style lang="scss" scoped>
@import '../sass/loginCom'
</style>
