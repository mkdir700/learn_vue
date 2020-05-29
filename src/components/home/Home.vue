<template>
    <el-container class="home-container">
        <!--头部-->
        <el-header>
            <div>
                <span>电商后台管理系统</span>
            </div>
            <el-button @click="logout" type="info">退出</el-button>
        </el-header>
        <!--页面主体-->
        <el-container>
            <!--主体左侧-->
            <el-aside :width="isCollapse ? '64px':'300px'">
                <!--侧边栏菜单-->
                <div class="toggle-button" @click="toggleCollapse">
                    |||
                </div>
                <el-menu
                        unique-opened
                        :collapse="isCollapse"
                        :collapse-transition="false"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#409eff">
                    <el-submenu
                            :index="item.id+''"
                            v-for="item in menuList"
                            :key="item.id">
                        <template slot="title">
                            <i :class="iconsObj[item.id]"></i>
                            <span>{{item.authName}}</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item :index="subItem.id + ''" v-for="subItem in item.children"
                                          :key="subItem.id">
                                <i class="el-icon-menu"></i>
                                {{subItem.authName}}
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!--主体右侧-->
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                menuList: [],
                iconsObj: {
                    '125': 'el-icon-user-solid',
                    '103': 'el-icon-info',
                    '101': 'el-icon-s-goods',
                    '102': 'el-icon-s-order',
                    '145': 'el-icon-s-claim'
                },
                isCollapse: false,
            }
        },
        created() {
            this.getMenuList()
        },
        methods: {
            logout() {
                /*清空*/
                window.sessionStorage.clear()
                /*跳转到登录页面*/
                this.$router.push({name: 'login'})
            },
            async getMenuList() {
                /*获取所有的菜单*/
                const {data: res} = await this.$http.get('menus')
                if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
                this.menuList = res.data
                // console.log(res)
                // console.log(this.menuList)
            },
            /*切换菜单的折叠与展开*/
            toggleCollapse() {
                this.isCollapse = !this.isCollapse
            }
        }
    }
</script>

<style lang="less" scoped>
    .home-container {
        height: 100%;
    }

    .el-header {
        background-color: #373d41;
        display: flex;
        justify-content: space-between;
        padding-left: 0;
        align-items: center;
        color: #fff;
        font-size: 20px;

        > div {
            display: flex;
            align-items: center;

            span {
                margin-left: 15px;
            }
        }
    }

    .el-container {
        background-color: #373d41;
    }

    .el-aside {
        background-color: #333744;
        .el-menu {
            border-right: none;
        }
    }

    .el-main {
        background-color: #eaedf1;
    }

    .toggle-button {
        background-color: #4a5064;
        font-size: 10px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        letter-spacing: 0.2em;
        cursor: pointer;
    }
</style>