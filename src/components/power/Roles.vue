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
                    <el-row :class="['bdbottom', {'bdtop': i1==0}, 'vcenter']" v-for="(item, i1) in scope.row.children"
                            :key="item.id">
                        <!--一级权限-->
                        <el-col :span="5">
                            <el-tag type="primary"
                                    closable
                                    @close="removeRightById(scope.row, item.id)">
                                {{item.authName}}
                            </el-tag>
                            <i class="el-icon-arrow-right"></i>
                        </el-col>
                        <!--二 三级权限-->
                        <el-col :span="19">
                            <el-row :class="['bdtop', {'bdtop': i2!=0}, 'vcenter']"
                                    v-for="(item2, i2) in item.children"
                                    :key="item2.id">
                                <el-col :span="6">
                                    <el-tag
                                            closable
                                            type="success"
                                            @close="removeRightById(scope.row, item2.id)">
                                        {{item2.authName}}
                                    </el-tag>
                                    <i class="el-icon-arrow-right"></i>
                                </el-col>
                                <el-col :span="13">
                                    <el-tag
                                            closable
                                            @close="removeRightById(scope.row, item3.id)"
                                            type="warning"
                                            v-for="(item3, i3) in item2.children"
                                            :key="item3.id">
                                        {{item3.authName}}
                                    </el-tag>
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
                        <el-button size="mini"
                                   icon="el-icon-star-off"
                                   type="warning"
                                   @click="showSetRightDialog(scope.row)">分配权限
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <template>
            <el-dialog
                    title="分配权限"
                    :visible.sync="rightsDialogVisible"
                    @close="closedRightsDialog"
                    width="50%">
                <el-tree
                        :data="rightsList"
                        default-expand-all
                        show-checkbox
                        node-key="id"
                        :default-expanded-keys="[2, 3]"
                        :default-checked-keys="defKeys"
                        :props="defaultProps">
                </el-tree>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="rightsDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="rightsDialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </template>
    </div>
</template>

<script>
    export default {
        name: "Roles",
        data() {
            return {
                rolesList: [],
                /*控制权限对话框的显示与隐藏*/
                rightsDialogVisible: false,
                rightsList: [],
                /*定义结构,children是子分类的名字, label显示单个属性的属性名*/
                defaultProps: {
                    children: 'children',
                    label: 'authName'
                },
                /*默认选中的节点 数组*/
                defKeys: []
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
                // console.log(res.data)
            },
            /*根据id删除对象的权限*/
            removeRightById(row, id) {
                /**/
                this.$confirm('此操作将取消用户权限, 是否继续删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    /*roles/:roleId/rights/:rightId*/
                    this.$http.delete(`roles/${row.id}/rights/${id}`).then(data => {
                        // console.log(data.data.data)
                        /*请求成功后,会获取当前最新的权限列表,将值赋值给row,就不用刷新整个页面去渲染数据了*/
                        row.children = data.data.data
                        this.$message.success('删除成功')
                    }).catch(error => {
                        console.log(error)
                        this.$message.error('删除失败')
                    })
                }).catch(() => {
                    this.$message.info('取消删除')
                })
            },
            /*展示权限分配的对话框*/
            showSetRightDialog(role) {
                /*获取所有权限的数据*/
                this.$http.get('rights/tree').then(res => {
                    /*获取到的权限数据,保存到data*/
                    this.rightsList = res.data.data;
                    // console.log(this.rightsList);
                })
                this.getLeafKeys(role, this.defKeys)
                this.rightsDialogVisible = true
            },
            /*通过递归的形式获取角色下所有三级权限的id,并保存到数组中*/
            getLeafKeys(node, arr) {
                /*如果当前节点不包含,child属性,则为三级节点*/
                if (!node.children) {
                    return arr.push(node.id)
                }
                node.children.forEach(item => this.getLeafKeys(item, arr))
            },
            /*当对话框关闭时,清空defKeys*/
            closedRightsDialog() {
                this.defKeys = []
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

    .vcenter {
        display: flex;
        align-items: center;
    }
</style>