<template>
    <div>
        <!--面包屑导航-->
        <el-breadcrumb>
            <el-breadcrumb-item :to="{name: 'home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--卡片-->
        <el-card>
            <div slot="header" class="clearfix">
                <span>卡片名称</span>
                <!--搜索与添加-->
                <div style="margin-top: 15px;">
                    <el-row :gutter="20">
                        <el-col :span="7">
                            <el-input placeholder="请输入内容" class="input-with-select">
                                <el-button slot="append" icon="el-icon-search"></el-button>
                            </el-input>
                        </el-col>
                        <el-col :span="5">
                            <el-button type="primary">添加</el-button>
                        </el-col>
                    </el-row>
                    <template>
                        <el-table
                                border
                                :data="userList"
                                stripe
                                style="width: 100%">
                            <!--索引列-->
                            <el-table-column type="index" label="#"></el-table-column>
                            <el-table-column
                                    prop="username"
                                    label="姓名"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="mobile"
                                    label="电话">
                            </el-table-column>
                            <el-table-column
                                    prop="email"
                                    label="邮箱">
                            </el-table-column>
                            <el-table-column
                                    prop="create_time"
                                    label="创建时间">
                            </el-table-column>
                            <el-table-column
                                    prop="role_name"
                                    label="角色">
                            </el-table-column>
                            <el-table-column
                                    prop="mg_state"
                                    label="状态">
                            </el-table-column>
                            <el-table-column
                                    label="操作">
                            </el-table-column>
                        </el-table>
                    </template>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "UserList",
        data() {
            return {
                queryParams: {query: '', pagenum: '1', pagesize: '2'},
                userList: [],
                total: 0
            }
        },
        created() {
            this.getUserList()
        },
        methods: {
            async getUserList() {
                const {data: res} = await this.$http.get('users', {params: this.queryParams})
                if (res.meta.status !== 200) return this.$message.error('获取失败')
                this.userList = res.data.users
                this.total = res.data.total
                console.log(this.userList)
            }
        }
    }
</script>

<style lang="less" scoped>

</style>