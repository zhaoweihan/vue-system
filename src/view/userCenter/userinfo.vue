<template>
    <!--个人信息-->
    <div class="userinfo">
        <h2>个人信息
            <i class="el-icon-edit" @click="edit()" v-show="isReadOnly"></i>
        </h2>
        <el-form ref="userinfo" :model="userinfo" label-width="80px">
            <span class="yhtx">用户头像</span>
            <el-upload class="avatar-uploader" :disabled="isReadOnly" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-error="handleAvatarError" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="userinfo.headPic" :src="userinfo.headPic" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-form-item label="用户昵称">
                <el-input v-model="userinfo.nickname" size="small" placeholder="请输入用户昵称" :readonly="isReadOnly"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名">
                <el-input v-model="userinfo.realname" size="small" placeholder="请输入真实姓名" :readonly="isReadOnly"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="userinfo.mobile" type="tel" readonly></el-input>
            </el-form-item>
            <el-form-item label="用户性别">
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
export default {
    data() {
        return {
            userinfo: {
                nickname: localStorage.getItem("nickname"),
                realname: localStorage.getItem("realname"),
                mobile: localStorage.getItem("mobile"),
                gender: localStorage.getItem("gender"),
                headPic: localStorage.getItem("headPic"),
            },
            // 是否只读
            isReadOnly: true,
        }
    },
    methods: {
        handleAvatarSuccess(res, file) {
            this.userinfo.headPic = URL.createObjectURL(file.raw);
        },
        handleAvatarError(err, file) {
            this.userinfo.headPic = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG && !isPNG) {
                this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return (isJPG || isPNG) && isLt2M;
        },
        //编辑个人信息
        edit() {
            this.isReadOnly = false;
        },
        saveinfo(type) {
            if (type) {
                this.isReadOnly = true;
                //TODO: 保存修改后的个人信息
                this.$message({
                    message: '保存成功！',
                    type: 'success'
                });
            } else {
                this.userinfo = {
                    nickname: localStorage.getItem("nickname"),
                    realname: localStorage.getItem("realname"),
                    gender: localStorage.getItem("gender"),
                    mobile: localStorage.getItem("mobile"),
                    headPic: localStorage.getItem("headPic"),
                },
                    this.isReadOnly = true;
                
            }
        }
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


