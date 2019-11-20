# i-fetch

> 测试覆盖率 100%，轻量化，快速，基于 typescript 的现代化异步请求库。

## IE 兼容

添加 [fetch-polyfill](https://github.com/github/fetch)
与 [es6-promise](https://github.com/stefanpenner/es6-promise) 即可完美兼容。

## 快速上手

### 安装

```shell script
yarn add io-fetch
```

### 引用

esm:

```javascript
import IoFetch from 'io-fetch';
```

commonjs:

```javascript
const IoFetch = require('io-fetch');
```

### 使用

**get 请求** :

```javascript
const $http = new IoFetch();
// 真实请求url为/article?pageNum=1&pageSize=20
// get 请求不要传body
$http
  .get('/article', {
    params: {
      pageNum: 1,
      pageSize: 20
    }
  })
  .then(response => {
    // 原生response对象
    console.log(response.originResponse);
    // 请求配置
    console.log(response.requestConfig);
    // 经过处理的response-body
    const articleList = response.responseData;

    articleList.map(article => console.log(article));
  })
  .catch(err => {
    console.log(err);
  });
```

**post 请求**

```javascript
const $http = new IoFetch({
  responseType: 'json'
});
$http
  .post('/user', {
    params: {
      status: 0
    },
    body: {
      name: 'foo',
      age: 7
    }
  })
  .then(response => {
    console.log(response);
  });
```

**delete** 请求

```javascript
const $http = new IoFetch({
  responseType: 'json',
  headers: {
    'content-type': 'application/json'
  }
});
$http
  .delete('/user/123', {
    params: {
      status: 0
    }
  })
  .then(response => {
    console.log(response);
  });
```

**put&patch**

```javascript
const $http = new IoFetch({
  responseType: 'json'
});
$http
  .put('/user/123', {
    body: {
      name: 'bar'
    }
  })
  .then(response => {
    console.log(response);
  });

$http
  .patch('/user/123', {
    body: {
      name: 'bar'
    }
  })
  .then(response => {
    console.log(response);
  });
```

**结合 async/await**

```javascript
const $http = new IoFetch();

async function getUser() {
  try {
    const response = await $http.request({ method: 'get', url: '/user' });
    return response.responseData;
    // 或const response = $http.get('/user')
  } catch (e) {
    console.log(e);
  }
}
```

> delete get head 请求不得传入 body

## 拦截器

```javascript
const $http = new IoFetch();

$http.interceptors.request.use(config => {
  return {
    ...config,
    headers: {
      token: 'foo-bar'
    }
  };
});

$http.interceptors.response.use(response => {
  return response.responseData;
});
```

## request-config-api

类 axios/fetch 文档内容待撰写
