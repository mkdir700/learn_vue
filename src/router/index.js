import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/components/login/Login";
import Home from "@/components/home/Home";

Vue.use(Router)

const router = new Router({
    routes: [
        {path: '/', redirect: '/login'},
        {path: '/login', name: 'login', component: Login},
        {path: '/home', name: 'home', component: Home}
    ]
})

/*to 将要访问的路径
* from 从两个路径跳转而来
* next是一个函数，表示放行
* 直接next表示放行，next()表示强制跳转到括号内的路径*/
router.beforeEach((to, from, next)=>{
    /*通过路径来判断*/
    // if (to.path === '/login') return next()
    /*通过命名来判断*/
    if (to.name === 'login') return next()
    /*获取token*/
    const tokenStr = window.sessionStorage.getItem("token")
    if (!tokenStr) return next({name: 'login'})
    return next()
})

export default router