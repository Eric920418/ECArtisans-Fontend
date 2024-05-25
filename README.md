# ecartisans-fontend
ECArtisans 是一個電商平台，本專案為前端的部分。
![專案封面圖](https://fakeimg.pl/500/)
- [線上觀看連結](https://eliza5852.github.io/ECArtisans-Fontend0/)

## 功能

測試帳號密碼 **（請斟酌提供，建議只提供僅能觀看不能操作的帳號密碼）**

```bash
帳號： example@example.com
密碼： example
```

- 登入
- 登出
- 產品列表
- 用戶註冊和登入
- 瀏覽商品列表和詳細資訊
- 加入購物車
- 下訂單和支付
- 查看歷史訂單

...

## 畫面

> 可提供 1~3 張圖片，讓觀看者透過 README 了解整體畫面

![範例圖片 1](https://fakeimg.pl/500/)
![範例圖片 2](https://fakeimg.pl/500/)
![範例圖片 3](https://fakeimg.pl/500/)

## 安裝

以下將會引導你如何安裝此專案到你的電腦上。

Node.js 版本建議為：`18.17.1` 以上...

### 取得專案

```bash
git clone https://github.com/ERIC955/ECArtisans-Fontend.git
```

### 移動到專案內

```bash
cd ECArtisans-Fontend
```

### 安裝套件

```bash
pnpm install
```

### 環境變數設定

請在終端機輸入 `cp .env.example .env` 來複製 .env.example 檔案，並依據 `.env` 內容調整相關欄位。

### 運行專案

```bash
pnpm run dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

### 開啟專案

在瀏覽器網址列輸入以下即可看到畫面

```bash
http://localhost:5174/ECArtisans-Fontend0/
```

## 環境變數說明

```env
APIPATH= # API 位置
COUSTOMPATH= # 自訂變數
...
```

## 資料夾說明

- public - 靜態資源放置處
  - images - 圖片放置處
- src
  - assets - 靜態資源放置處
    - css 
    - helpers 
    - utils 
  - components - 組件
  - layouts - 切版
  - locales - vee-validate 中文警示
  - router - 路由
  - setup - vee-validate
  - stores - pinia 管理
  - type - typescript interface
  - views - 畫面放置處

...

## 專案技術

- Node.js v18.17.1
- Vue v3.4.21
- Vite v5.1.6
- Vue Router v4.3.0
- Axios v1.6.8
- Bootstrap v5.3.3
- pinia v2.1.7
- socket.io-client v4.7.5

...

## 第三方服務

- 藍新金流
...

## CI/CD 說明 （未來）

此專案有使用 Github Actions，所以發起 PR 時會自動執行以下動作：

- 建立 Node.js 環境
- 安裝相依套件
- 編譯程式碼
- 執行 ESLint 掃描
- 執行測試
...

當專案 merge 到 main 時會自動執行以下動作：

- 建立 Node.js 環境
- 安裝相依套件
- 編譯程式碼
- 執行 ESLint 掃描
- 執行測試
- 部署到 Github Pages
...

## 聯絡作者

你可以透過以下方式與我聯絡

- [部落格](https://israynotarray.com/)
- [Facebook](https://www.facebook.com/israynotarray)
- [Instagram](https://www.instagram.com/isray_notarray/)
...


# ecartisans-fontend

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
