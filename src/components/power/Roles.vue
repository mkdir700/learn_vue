<template>
    <div>
        <el-breadcrumb>
            <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <!--添加角色-->
            <el-row>
                <el-col>
                    <el-button type="primary">添加角色</el-button>
                </el-col>
            </el-row>
            <el-table :data="rolesList" border>
                <el-table-column type="expand" v-slot="scope">
                    <el-row :class="['bdbottom', {'bdtop': i1==0}]" v-for="(item, i1) in scope.row.children" :key="item.id">
                        <!--一级权限-->
                        <el-col :span="5">
                            <el-tag type="primary">{{item.authName}}</el-tag>
                            <i class="el-icon-arrow-right"></i>
                        </el-col>
                        <!--二级权限-->
                        <el-col :span="19">
                            <el-row :class="['bdtop', {'bdtop': i2!=0}]" v-for="(item2, i2) in item.children" :key="item2.id">
                                <el-col :span="6">
                                    <el-tag type="success">{{item2.authName}}</el-tag>
                                    <i class="el-icon-arrow-right"></i>
                                </el-col>
                                <el-col :span="13">
                                    <el-tag type="warning" v-for="(item3, i3) in item2.children" :key="item3.id">{{item.authName}}</el-tag>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-table-column>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="角色名称" prop="roleName"></el-table-column>
                <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
                <el-table-column label="操作" width="300">
                    <template v-slot="scope">
                        <el-button size="mini" icon="el-icon-edit" type="primary">编辑</el-button>
                        <el-button size="mini" icon="el-icon-delete" type="danger">删除</el-button>
                        <el-button size="mini" icon="el-icon-star-off" type="warning">分配权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Roles",
        data() {
            return {
                rolesList: []
            }
        },
        created() {
            this.getRolesList()
        },
        methods: {
            async getRolesList() {
                const {data: res} = await this.$http.get('roles')
                if (res.meta.status !== 200) return this.$message.error('获取权限列表失败')
                this.rolesList = res.data
                console.log(res.data)
            }
        }
    }
</script>

<style scoped>
    .el-tag {
        margin: 7px;
    }
    .bdtop {
        border-top: 1px solid #eeeeee;
    }
    .bdbottom {
        border-bottom: 1px solid #eeeeee;
    }
</style>