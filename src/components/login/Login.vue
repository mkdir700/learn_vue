<template>
    <div class="login_container">
        <div class="login_box">
            <!--头像-->
            <div class="avatar_box">
                <img src="logo.png" alt="">
            </div>
            <!--表单-->
            <el-form ref="loginFormRef" label-width="0px" class="login_form" :model="form" :rules="formRules">
                <el-form-item prop="username">
                    <el-input prefix-icon="el-icon-user" v-model="form.username" prop="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input prefix-icon="el-icon-key" v-model="form.password" prop="password" show-password></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                form: {
                    'username': '',
                    'password': ''
                },
                /*表单数据验证对象*/
                formRules: {
                    username: [
                        {required: true, message: "请输入用户名", trigger: "blur"},
                        {min: 3, max: 10, message: "长度在3到10个字符之间", trigger: "blur"}
                    ],
                    password: [
                        {required: true, message: "请输入密码", trigger: "blur"},
                        {min: 3, max: 10, message: "长度在3到10个字符之间", trigger: "blur"}
                    ]
                }
            }
        },
        methods: {
            /*重置表单函数*/
            resetForm() {
                this.$refs.loginFormRef.resetFields();
            },
            /*表单的预验证
            * validate(回调函数)
            * 回调函数第一个参数是布尔值.第二个参数是一个对象
            * 通过判断布尔值就可以判断是否校验成功
            * */
            login() {
                /*返回的promise, 使用async异步, await接收数据,可以去掉大部分不需要的数据*/
                this.$refs.loginFormRef.validate(async valid => {
                    // console.log(valid)
                    if (!valid) return false;
                    /*解构出data数据*/
                    const {data: result} = await this.$http.post('login', this.form);
                    console.log(result);
                    if (result.meta.status !== 200){
                        this.$message.error('登录失败')
                        return false
                    }
                    this.$message.success('登录成功')
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    .login_container {
        height: 100%;
        background-color: #2b4b6b;
    }

    .login_box {
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .avatar_box {
        height: 130px;
        width: 130px;
        border: solid 1px #eeeeee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #dddddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eeeeee;
        }
    }

    .btns {
        display: flex;
        justify-content: flex-end;
    }

    .login_form {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }
</style>