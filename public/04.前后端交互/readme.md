axios的特征

- 支持浏览器和nodejs
- 支持promise
- 能拦截请求和响应
- 自动转换json数据

## axios的基本用法

```js
axios.get('/data').then(result => {
})
```

## axios常用api
- get
```js
    /*通过?参数名=值&参数名2=值2 的方式传值*/
    axios.get('http://localhost/data?id=1').then(res => {
        console.log()
    })

    /* 通过/分割传值 */
    axios.get('http://localhost/data/1').then(res => {
        console.log()
    })

    /* 通过params传值 */
    axios.get('', {
        params: {
            id: 1
        }
    }).then(res => {
        console.log()
    })
```
推荐第三种传值方式，更加方便

- post
```js
    /*直接在url后面，接一个字典对象
    * application/json类型
    * */
    axios.post('http://localhost/data', {
        id: 1,
        name: 'wuyuhang'
    }).then(res => {
        console.log()
    })

    /* 表单类型 application/x-www-form-urlencoded*/
    let params = new URLSearchParams();
    params.append('username', 'zhangsan')
    params.append('age', '20')
    axios.post('http://localhost/data', params).then(res => {
        console.log()
    })
```

- put
```js
    /*在url后面跟上一个对象,和post的json类型请求一致*/
    axios.put('http://locahost/data', {
        'username': 'zhangsan',
        'age': 20
    }).then(res => {
        console.log()
    })
```

## axios全局配置
`axios.defaults.timeout`

设置超时时间

`axios.defaults.baseURL`

设置默认地址,在实际请求的时候就可以不用带上域名了

`axios.defaults.headers['token']='dafad'`

设置请求头

## axios拦截器
- 请求拦截器
- 响应拦截器
```js
    /*请求拦截器
    * 数据发送之前,处理完在发送
    * */
    axios.interceptors.request.use(config => {
        config.headers.mytoken = 'nihao';
        return config
    }, error => {
        console.log(error)
    })

    /*响应拦截器*/
    axios.interceptors.response.use(res => {
        return res.data
    }, error => {
        console.log(error)
    })
```
