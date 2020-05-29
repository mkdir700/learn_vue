<template>
    <el-container class="home-container">
        <!--头部-->
        <el-header>Header</el-header>
        <!--页面主体-->
        <el-container>
            <!--主体左侧-->
            <el-aside width="200px">Aside</el-aside>
            <!--主体右侧-->
            <el-main>Main</el-main>
            <!--底部-->
            <el-footer>Footer</el-footer>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "Home",
        methods: {
            logout() {
                /*清空*/
                window.sessionStorage.clear()
                /*跳转到登录页面*/
                this.$router.push({name: 'login'})
            }
        }
    }
</script>

<style lang="less" scoped>
    .home-container {
        height: 100%;
    }
    .el-container {
        background-color: #373d41;
    }
    .el-aside {
        background-color: #333744;
    }
    .el-main {
        background-color: #eaedf1;
    }
</style>