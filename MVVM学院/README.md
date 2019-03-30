# 1. San 入门手册

## 1.1. 安装

### 1.1.1. 下载

#### 1.1.1.1. 直接下载

[下载地址](https://github.com/baidu/san/releases)

#### 1.1.1.2. CDN

开发版本：

```js
<script src="https://unpkg.com/san@latest/dist/san.dev.js" />
```

生产版本：

```js
<script src="https://unpkg.com/san@latest" />
```

#### 1.1.1.3. NPM

```bash
npm i san
```

### 1.1.2. 使用

一个语法如下的 `.san` 文件，就是一个 `San component`

```js
<template>
    <div class="hello">hello {{msg}}</div>
</template>

<script>
    export default {
        initData () {
            return {
                msg: 'world'
            };
        }
    }
</script>

<style>
    .hello {
        color: blue;
    }
</style>
```

> 在 `webpack` 中可以使用 `san-loader` 来加载 `.san` 文件

## 1.2. 数据操作

### 1.2.1. `initData` 初始化数据

通过定义`initData`方法，可以定义组件的初始化数据

```js
initData(){
    return {
        name: '',
        age: '',
        contain: ''
    }
```

### 1.2.2. `get` 从 data 中获取数据

```js
initData () {
    return {
        width: 200,
        top: 100,
        left: -1000
    }
},
attached() {
    this.data.get('width'); // 200
}
```

> get 方法获取到的数据不能直接修改，否则可能导致不一致的问题

### 1.2.3. `set` 修改数据

```js
this.data.set('name', 'zs')
```

## 1.3. 条件与循环

### 1.3.1. 条件

- `s-if`
- `s-else-if`
- `s-else`

### 1.3.2. 循环

- `s-for="p,index in persons"`

- `trackBy`: 相当于 key，就地复用

## 1.4. 事件处理

在 San 中，通过 `on-`前缀绑定事件

```html
<button on-click="clicker(item)">按钮</button>
```

```js
clicker(item) {
    console.log('123')
}
```

- 指定参数时，指定 `$event` 将引用到 DOM Event 对象。从而可以拿到事件触发的 DOM 对象、鼠标事件的鼠标位置等事件信息。

```html
<button type="button" on-click="clicker($event)">click here</button>
```

```js
clicker: function (e) {
    alert(e.target.tagName); // BUTTON
}
```

### 修饰符

- `.capture`：事件将被绑定到捕获阶段
- `.native`：事件将被绑定到组件根元素的 DOM 事件

## 表单

- input

  ```html
  <input type="text" value="{= name =}" />
  ```

- checkbox

     ```html
       <div>
          <label><input type="checkbox" value="errorrik" checked="{= online =}">errorrik</label>
          <label><input type="checkbox" value="otakustay" checked="{= online =}">otakustay</label>
          <label><input type="checkbox" value="firede" checked="{= online =}">firede</label>
       </div>
      ```

- radio

      ```html
      <div>
          <label><input type="radio" value="errorrik" checked="{= online =}" name="online">errorrik</label>
          <label><input type="radio" value="otakustay" checked="{= online =}" name="online">otakustay</label>
          <label><input type="radio" value="firede" checked="{= online =}" name="online">firede</label>
      </div>
      ```

- select

      ```html
      <select value="{= online =}">
          <option value="errorrik">errorrik</option>
          <option value="otakustay">otakustay</option>
          <option value="firede">firede</option>
      </select>
      ```

## 插槽

在视图模板中可以通过 `slot` 声明一个插槽的位置，其位置的内容可以由外层组件定义。
插入 `slot` 部分的内容，其数据环境为 声明时的环境。

## 过渡动画

- `s-transition`
- 我们通常把 `s-transition` 和条件或循环指令一起使用
- 过渡动画控制器：`enter` 和 `leave`
- 使用 css 动画，在 `transitionend` 或 `animationend` 事件监听中回调 `done`
- 使用 `requestAnimationFrame` 控制动画，完成后回调 done
- 在老旧浏览器使用 `setTimeout` / `setInterval` 控制动画，完成后回调 `done`

## 生命周期

- compiled - 组件视图模板编译完成
- inited - 组件实例初始化完成
- created - 组件元素创建完成
- attached - 组件已被附加到页面中（发请求）
- detached - 组件从页面中移除
- disposed - 组件卸载完成

## 组件通讯

- `dispatch` ：组件可以向组件树的上层派发消息
- `messages` ：声明组件要处理的消息，`messages` 是一个对象，`key` 是消息名称，`value` 是消息处理的函数，接收一个包含 `target` 和 `value` 的参数对象。
