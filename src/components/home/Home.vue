<template>
    <div class="xxx">
        <p>Home</p>
        <el-button type="info" @click="logout">退出</el-button>
    </div>
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

<style scoped>

</style>