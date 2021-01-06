# cordova-vue

## 开发环境

本文档书写时，环境搭配为：

```
1. Android Studio ： v3.6.3
2. gradle ：v6.4.1
3. java sdk： v1.8.0_181
4. cordova v9.0.0
```

## 项目运行、开发调试说明

1. 进入项目根目录，运行`npm i`安装依赖；

2. 进入cordova文件夹（`cd ./cordova`），再使用cordova命令，进行环境检测、平台安装等。

   ```c
   # 检测平台构建app的先决条件是否都满足
   cordova requirements
   
   # 添加平台
   $ cordova platform add android --save
   # 删除平台
   $ cordova platform rm android
   
   # 添加插件
   cordova plugin add <plugin-spec> [...]
   # 移除插件
   cordova plugin remove [...]
   ```

3. cordova的调试运行，以安卓平台为例，电脑通过USB连接手机，可以使用`npm run cordova-serve-browser`；

4. 用上一步骤的方式在电脑端进行开发调试，可能会报[processmessage failed: invalid message:""](http://blog.sina.com.cn/s/blog_6297f9d60102x5q9.html)的错误，此时我们可以==另外新建一个cmd窗口==，然后直接使用`npm run serve`，新开一个调试端口，**只要不涉及到cordova调用元素资源相关的插件或功能等，均可以直接在电脑端Chrome进行调试开发**。

## Project setup

```bash
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Prepare for Cordova
```bash
npm run cordova-prepare # prepare for build (打包html代码，但是仅仅在www文件夹中输出打包后的代码)
```

### Android
```bash
$ npm run cordova-serve-android # Development Android
$ npm run cordova-build-android # Build Android
$ npm run cordova-build-only-www-android # Build only files to src-cordova
```

### IOS
```bash
$ npm run cordova-serve-ios # Development IOS
$ npm run cordova-build-ios # Build IOS
$ npm run cordova-build-only-www-ios # Build only files to src-cordova
```

### OSX
```bash
$ npm run cordova-serve-osx # Development OSX
$ npm run cordova-build-osx # Build OSX
$ npm run cordova-build-only-www-osx # Build only files to src-cordova
```

### Browser
```bash
$ npm run cordova-serve-browser # Development Browser
$ npm run cordova-build-browser # Build Browser
$ npm run cordova-build-only-www-browser # Build only files to src-cordova
```

### Electron
```bash
$ npm run cordova-serve-electron # Development Electron
$ npm run cordova-build-electron # Build Electron
$ npm run cordova-build-only-www-electron # Build only files to src-cordova
```

## 关于演示

- 包含相机调用demo：Camera

## More Info

- See [Configuration Reference](https://cli.vuejs.org/config/).
- 关于插件[vue-cli-plugin-cordova](https://github.com/m0dch3n/vue-cli-plugin-cordova#vue-cli-plugin-cordova).
