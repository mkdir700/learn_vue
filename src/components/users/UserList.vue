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
                <!--搜索与添加-->
                <div style="margin-top: 15px;">
                    <el-row :gutter="20">
                        <el-col :span="7">
                            <el-input placeholder="请输入内容" v-model="queryParams.query" class="input-with-select" clearable @clear="getUserList" @change="getUserList">
                                <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
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
                                    label="状态">
                                <template v-slot="scope">
                                    <el-switch
                                            @change="userStateChange(scope.row)"
                                            v-model="scope.row.mg_state"
                                            active-color="#13ce66"
                                            inactive-color="#ff4949">
                                    </el-switch>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    width="180px"
                                    label="操作">
                                <template v-slot="scope">
                                    <!--编辑按钮-->
                                    <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
                                        <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                                    </el-tooltip>
                                    <!--删除按钮-->
                                    <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
                                        <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                                    </el-tooltip>
                                    <!--分配权限-->
                                    <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                                        <el-button type="warning" icon="el-icon-delete" size="mini"></el-button>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page.sync="queryParams.pagenum"
                                    :page-sizes="[1, 2, 4]"
                                    :page-size="queryParams.pagesize"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="total">
                            </el-pagination>
                        </div>
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
                queryParams: {query: '', pagenum: 1, pagesize: 2},
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
                // console.log(this.userList)
            },
            /*监听pagesize改变的事件*/
            handleSizeChange(newPageSize) {
                this.queryParams.pagesize = newPageSize
                this.getUserList()
            },
            /*监听页码值改变的事件*/
            handleCurrentChange(newPageNum) {
                this.queryParams.pagenum = newPageNum
                this.getUserList()
            },
            /*监听switch开关状态的改变*/
            async userStateChange(userinfo) {
                const {data: res} = await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`)
                if (res.meta.status !== 200) {
                    userinfo.mg_state = !userinfo.mg_state
                    return this.$message.error('状态更改失败')
                }
                this.$message.success('状态更新成功')
                return userinfo
            }
        }
    }
</script>

<style lang="less" scoped>
    .block {
        margin-top: 15px;
    }
</style>