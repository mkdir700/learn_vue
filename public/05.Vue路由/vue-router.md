# vue-router
## vue-router基本使用
- 导入`vue-router`js文件
- 创建路由链接

```html
    <router-link to="/user">User</router-link>
    <router-link to="/register">register</router-link>
```
- 添加路由占位符
```html
<router-view></router-view>
```
- 创建路由组件
```js
    const User = {
        template: `<div>User</div>`
    }

    const Register = {
        template: `<div>register</div>`
    }
```
- 配置路由规则
```js
    const router = new VueRouter({
        routes: [
            {path: '/user', component: User},
            {path: '/register', component: Register},
        ]
    })
```
- 在Vue根实例中使用路由规则
```js
    let vm = new Vue({
        el: "#app",
        data: {},
        router
    })
```

## 路由重定向
> 用户访问地址A,强制跳到B地址
>
> 通过路由规则的`redirect`属性,指定一个新的路由地址,可以很方便的设置路由的重定向

```js
    const router = new VueRouter({
        routes: [
            {path: '/', redirect: '/user'},
            {path: '/user', component: User},
            {path: '/register', component: Register},
        ]
    })
```
上述路由规则,当访问`/`路径时,会被重定向到`/user`

## 路由嵌套
> 路由嵌套,在路由规则中使用`children`属性

```js
    const tab1 = {
        template: `
        <h3>tab1 子组件</h3>
        `
    }
    const tab2 = {
        template: `
        <h3>tab2 子组件</h3>
        `
    }

    const Register = {
        template: `<div><h1>register</h1>
子路由链接                    
    <router-link to="/register/tab1">tab1</router-link>
    <router-link to="/register/tab2">tab2</router-link>
子路由占位符    
    <router-view></router-view>
    </div>`
    }

    const router = new VueRouter({
        routes: [
            {path: '/', redirect: '/user'},
            {path: '/user', component: User},
            {
                path: '/register',
                component: Register,
                children: [
                    {path: '/register/tab1', component: tab1},
                    {path: '/register/tab2', component: tab2}
                ]
            },
        ]
    })
```

## 动态路由匹配
```html
    <router-link to="/user/1">User1</router-link>
    <router-link to="/user/2">User2</router-link>
    <router-link to="/user/3">User3</router-link>
    <router-link to="/user/4">User4</router-link>
```
有多个这样的链接，如果没有`动态路由`，那么我们只能一个一个去写路由规则
`/user`是静态的，变化的是后面的数字`id`

```
    {path: '/user/:id', component: User},
```
我们可以这样定义路由规则`:id`，动态的表示id值

在子组件中，我们可以能需要知道这个`id`值是多少，
那么可以在子组件中使用`$route.params.id`获取
```js
    const User = {
        template: `<div><h1>User{{$route.params.id}}</h1></div>`
    }
```

**注意是`$route`**

## props路由传参
> `$router`与对应的路由形成高度耦合，不够灵活
> 所以可以用`props`将组件和路由解耦

- props值为布尔值
```
const User = {
    props: ['id'],
    template: `<div><h1>User{{id}}</h1></div>`
}

{path: '/user/:id', component: User, props: true},
```

- props值为对象
```
const User = {
    props: ['uname', 'age'],
    template: `<div><h1>User{{uname}}  {{age}}</h1></div>`
}

{
    path: '/user/:id', 
    component: User,
    props: {'uname': 'zhangsan', 'age': 20}
}
```

- props值为函数
```
    props: ['id', 'uname', 'age'],
    template: `<div><h1>ID:{{id}} Name:{{uname}}  Age:{{age}}</h1></div>`
    {
        path: '/user/:id', component: User, props: route => {
            return {
                'uname': 'zhangsan',
                'age': 20,
                'id': route.params.id
            }
        }
    }
```

## 命名路由
> 在`router-link`的链接，是写死的
> 我们可以通过设置命名路由，使其灵活许多
> 这个命名路由，在django中也有所接触，用法是差不多的

首先给路由设置一个名字，属性值`name`
```
    {
        name: 'user',
        path: '/user/:id',
        component: User,
        props: route => {
            return {
                'uname': 'zhangsan',
                'age': 20,
                'id': route.params.id
            }
        }
    },
```

然后在`router-link`使用这个`name`
```html
    <router-link :to="{name: 'user', params: {id: 3}}">User3</router-link>
```
`name`路由名称

`params`传递的参数

**注意：这里的`to`是加了`：`的，在Vue中不加`：`默认都是字符串类型**

## 编程式导航
声明式导航: 通过`标签`实现跳转
编程式导航: 通过`api`实现跳转

跳转地址, `this.$router.push()`
```
push可以直接接收路径地址
也可以接收命名路由
```

返回上一级, `this.$router.go(-1)`