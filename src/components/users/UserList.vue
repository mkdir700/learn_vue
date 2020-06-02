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
                            <el-input placeholder="请输入内容" v-model="queryParams.query" class="input-with-select"
                                      clearable @clear="search" @change="search">
                                <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                            </el-input>
                        </el-col>
                        <el-col :span="5">
                            <el-button type="primary" @click="addDialogVisible=true">添加</el-button>
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
                                    <el-button type="primary" icon="el-icon-edit" size="mini"
                                               @click="showEditDialog(scope.row)"></el-button>
                                    <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">

                                    </el-tooltip>
                                    <!--删除按钮-->
                                    <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
                                        <el-popconfirm
                                                @onConfirm="deleteRow(scope.row.id)"
                                                title="您确定删除吗?">
                                            <el-button type="danger" icon="el-icon-delete" size="mini"
                                                       slot="reference"></el-button>
                                        </el-popconfirm>
                                    </el-tooltip>
                                    <!--分配权限-->
                                    <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                                        <el-button @click="showSetRoleDialog(scope.row)" type="warning"
                                                   icon="el-icon-delete" size="mini"></el-button>
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
        <!--添加用户的对话框-->
        <el-dialog
                @close="AddDialogClosed($refs.addFormRef)"
                title="添加用户"
                :visible.sync="addDialogVisible"
                width="50%">
            <!--内容主体区-->
            <el-form
                    :model="addForm"
                    :rules="addFormRules"
                    ref="addFormRef"
                    :status-icon="true"
                    label-width="70px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="addForm.mobile"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="info" @click="$refs.addFormRef.resetFields()">重置</el-button>
                <el-button @click="addDialogVisible=false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </span>
        </el-dialog>
        <!--修改用户的对话框-->
        <el-dialog
                title="修改用户信息"
                :visible.sync="editDialogVisible"
                width="50%">
            <el-form
                    :status-icon="true"
                    :model="editForm"
                    :rules="editFormRules"
                    ref="editFromRefs"
                    label-width="100px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="editForm.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editForm.email"></el-input>
                </el-form-item>
                <el-form-item label="电话号码" prop="mobile">
                    <el-input v-model="editForm.mobile"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editUserInfo">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                @close="closedSetRoleDialog"
                :visible.sync="setRoleDialogVisible"
                width="50%"
                title="修改角色">
            <p>当前用户: {{userInfo.username}}</p>
            <p>当前角色: {{userInfo.role_name}}</p>
            <span>分配角色: </span>
            <template>
                <el-select v-model="selectedRoleId" placeholder="请选择">
                    <el-option
                            v-for="item in rolesList"
                            :key="item.id"
                            :label="item.roleName"
                            :value="item.id">
                    </el-option>
                </el-select>
            </template>
            <span slot="footer" class="dialog-footer">
            <el-button @click="setRoleDialogVisible=false">取 消</el-button>
            <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "UserList",
        data() {
            /*1. 自定义表单验证规则*/
            let checkMobile = (rule, value, callback) => {
                //    验证手机号码的正则
                const regMobile = /^1[3456789]\d{9}$/
                if (regMobile.test(value)) {
                    return callback()
                } else {
                    return callback(new Error('请输入正确的手机号码'))
                }
            }
            return {
                queryParams: {query: '', pagenum: 1, pagesize: 2},
                userList: [],
                total: 0,
                // 控制添加用户框的显示与隐藏
                addDialogVisible: false,
                // 控制编辑用户框的显示与隐藏
                editDialogVisible: false,
                // 添加用户的表单数据
                addForm: {
                    username: '',
                    password: '',
                    email: '',
                    mobile: ''
                },
                editForm: {
                    id: '',
                    username: '',
                    email: '',
                    mobile: ''
                },
                /*添加表单的验证规则对象*/
                addFormRules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 16, message: '用户名长度3到16位之间', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 16, message: '密码长度6到16位之间', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱', trigger: ['blur', 'change']}
                    ],
                    // 2. 设置validator
                    mobile: [
                        {required: true, message: '请输入手机号码', trigger: 'blur'},
                        {validator: checkMobile, trigger: 'blur'}
                    ]
                },
                editFormRules: {
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱', trigger: ['blur', 'change']}
                    ],
                    mobile: [
                        {required: true, message: '请输入手机号码', trigger: 'blur'},
                        {validator: checkMobile, trigger: 'blur'}
                    ]
                },
                //显示/隐藏角色分配对话框
                setRoleDialogVisible: false,
                //需要被分配角色的用户信息
                userInfo: {},
                //角色列表
                rolesList: [],
                //已选中的角色id值
                selectedRoleId: ''
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
            },
            search() {
                this.queryParams.pagenum = 1
                this.getUserList()
            },
            /*当对话框关闭时,触发的函数*/
            AddDialogClosed(addFormRef) {
                addFormRef.resetFields()
            },
            /*点击按钮添加新用户*/
            addUser() {
                this.$refs.addFormRef.validate(async valid => {
                    /*验证不通过*/
                    if (!valid) return false
                    /*通过api发起请求*/
                    const {data: res} = await this.$http.post('users', this.addForm)
                    if (res.meta.status !== 201) return this.$message.error('添加失败')
                    this.$message.success('添加用户成功')
                    // 添加成功后,关闭对话框
                    this.addDialogVisible = false
                    // 用户添加数据后,更新列表
                    await this.getUserList()
                })
            },
            /*展示编辑用户的对话框*/
            showEditDialog(data) {
                this.editForm.id = data.id
                this.editForm.username = data.username
                this.editForm.email = data.email
                this.editForm.mobile = data.mobile
                this.editDialogVisible = true
            },
            editUserInfo() {
                this.$refs.editFromRefs.validate(async valid => {
                    if (!valid) return false
                    const {data: res} = await this.$http.put('users/' + this.editForm.id, {
                        'email': this.editForm.email,
                        'mobile': this.editForm.mobile
                    })
                    if (res.meta.status !== 200) return this.$message.error('更新失败')
                    this.$message.success('更新成功')
                    this.editDialogVisible = false
                    await this.getUserList()
                })
            },
            async deleteRow(id) {
                const {data: res} = await this.$http.delete('users/' + id)
                if (res.meta.status !== 200) return this.$message.error('删除失败')
                this.$message.success('删除成功')
                /*重新获取第一页数据*/
                this.queryParams.pagenum = 1
                await this.getUserList()
            },
            //获取所有角色的数据列表
            showSetRoleDialog(userInfo) {
                this.$http.get('roles').then(res => {
                    //角色列表
                    this.rolesList = res.data.data
                }).catch(() => {
                    this.$message.error('获取角色列表失败')
                })
                this.userInfo = userInfo
                this.setRoleDialogVisible = true
            },
            //点击按钮分配角色
            async saveRoleInfo() {
                if (!this.selectedRoleId) {
                    this.$message.warning('角色不能为空')
                    return false
                }
                this.$http.put(`users/${this.userInfo.id}/role`, {'rid': this.selectedRoleId}).then(res => {
                    this.$message.success('修改成功')
                }).catch(error => {
                    console.log(error)
                    this.$message.error('修改失败')
                })
                this.setRoleDialogVisible=false
                this.getUserList()
            },
            //关闭角色分配对话框时触发
            closedSetRoleDialog() {
                this.selectedRoleId=''
            }
        }
    }
</script>

<style lang="less" scoped>
    .block {
        margin-top: 15px;
    }
</style>