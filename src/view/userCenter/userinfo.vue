<template>
    <!--个人信息-->
    <div class="userinfo">
        <h2>个人信息
            <i class="el-icon-edit" @click="edit()" v-show="isReadOnly"></i>
        </h2>
        <el-form ref="userinfo" :model="userinfo" label-width="80px" :rules="rules">
            <span class="yhtx">用户头像</span>
            <el-upload class="avatar-uploader" :disabled="isReadOnly" :data="uploadHeadImgData" action="http://upload-z1.qiniu.com" :show-file-list="false" :on-error="handleAvatarError" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="userinfo.headPic" :src="userinfo.headPic" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-form-item label="用户昵称" prop="nickname">
                <el-input v-model="userinfo.nickname" size="small" placeholder="请输入用户昵称" :readonly="isReadOnly"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="realname">
                <el-input v-model="userinfo.realname" size="small" placeholder="请输入真实姓名" :readonly="isReadOnly"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="userinfo.mobile" type="tel" readonly></el-input>
            </el-form-item>
            <el-form-item label="用户性别" prop="gender">
                <el-radio-group v-model="userinfo.gender" :disabled="isReadOnly">
                    <el-radio label="男" name="gender">男</el-radio>
                    <el-radio label="女" name="gender">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-button type="success" class="saveBtn" @click="saveinfo(true)" v-if="!isReadOnly">保存</el-button>
            <el-button type="warning" @click="saveinfo(false)" v-if="!isReadOnly">取消</el-button>
        </el-form>
    </div>
</template>
<script>
import store from '@/store'
import { servers } from '@/service/api'
import defaultHead from '@/assets/defaultHead2.svg'
export default {
  data () {
    return {
      uploadHeadImgData: {
        id: localStorage.getItem('id'),
        token: ''
      },
      userinfo: {
        nickname: '',
        realname: '',
        mobile: localStorage.getItem('mobile'),
        gender: '',
        headPic: ''
      },
      // 是否只读
      isReadOnly: true,
      rules: {
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        realname: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }]
      }
    }
  },
  methods: {
    getUserInfo () {
      servers.post('/getUserInfo', { id: localStorage.getItem('id') }, (result) => {
        if (!result.headPic) {
          result.headPic = defaultHead
        }
        if (!result.nickname) {
          result.nickname = localStorage.getItem('mobile')
        }
        this.userinfo.nickname = result.nickname
        this.userinfo.realname = result.realname
        this.userinfo.headPic = result.headPic
        this.userinfo.gender = result.gender
        // 获取上传头像的token
        this.getUploadToken()
      })
    },
    handleAvatarSuccess (res, file) {
      // this.userinfo.headPic = URL.createObjectURL(file.raw);
      this.userinfo.headPic = 'http://oupf1bxll.bkt.clouddn.com/' + res.key
      this.$message({
        message: '上传成功',
        type: 'success'
      })
    },
    handleAvatarError () {
      this.$message.error('上传失败，请重新上传')
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG或PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return (isJPG || isPNG) && isLt2M
    },
    // 编辑个人信息
    edit () {
      this.isReadOnly = false
    },
    saveinfo (type) {
      if (type) {
        this.$refs['userinfo'].validate((valid) => {
          if (valid) {
            servers.post('/updateUserInfo', { id: localStorage.getItem('id'), userinfo: this.userinfo }, (result) => {
              store.commit('setNickName', this.userinfo.nickname)
              store.commit('setHeadPic', this.userinfo.headPic)
              store.commit('setRealName', this.userinfo.realname)
              store.commit('setGender', this.userinfo.gender)
              this.$message({
                message: '保存成功！',
                type: 'success'
              })
              this.isReadOnly = true
            })
          }
        })
      } else {
        this.userinfo = {
          nickname: store.state.nickname,
          realname: store.state.realname,
          gender: store.state.gender,
          mobile: localStorage.getItem('mobile'),
          headPic: store.state.headPic
        }
        this.isReadOnly = true
      }
    },
    getUploadToken () {
      var self = this
      servers.post('/getQiniuToken', { id: localStorage.getItem('id'), fileName: self.userinfo.headPic }, (result) => {
        this.uploadHeadImgData.token = result.uploadToken
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>
<style  lang="scss">
@import '../../sass/common.scss';
.userinfo {
    width: 400px;
    margin: 50px auto;
    h2 {
        color: #555;
        i {
            font-size: 14px;
            margin-left: 10px;
            color: $Blue;
            cursor: pointer;
        }
    }
    .yhtx {
        position: relative;
        top: 60px;
        color: #666;
        left: 12px;
    }
    input {
        color: #666;
        &[readonly] {
            border: 0;
        }
    }
    .saveBtn {
        margin-left: 80px;
    }
    .avatar-uploader {
        $height: 100px;
        .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            left: 90px;
            overflow: hidden;
            &:hover {
                border-color: #20a0ff;
            }
            .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: $height;
                height: $height;
                line-height: $height;
                text-align: center;
            }
            .avatar {
                width: $height;
                height: $height;
                display: block;
            }
        }
    }
}
</style>
