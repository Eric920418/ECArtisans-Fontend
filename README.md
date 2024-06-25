# ECArtisans
![專案封面圖](src/assets/img/ECArtisans.svg)
- 首頁：[ECArtisans](https://eliza5852.github.io/ECArtisans-Fontend0/)

ECArtisans 是一個**電商平台**，對於**商家端**而言，可以在平台上面選擇開店方案，建立個人店舖，上架商品、拍賣商品，*實現銷售，即刻開始*。於**買家端**而言，可以收藏商品、購買商品，*盡情購物樂趣*。
關於付費方式，本專案使用**藍新金流**。
## 功能

測試帳號密碼 

【商家1號 : marketPlace】
```bash
帳號： bob@gmail.com
密碼： passwordbob
```

【商家2號 : EcoShop】
```bash
帳號： john@gmail.com
密碼： passwordjhon
```

【買家1號 : michaelchen】

```bash
帳號： michaelchen@gmail.com
密碼： memberpassword_michael
```


## 畫面

![首頁](https://i.imgur.com/2V5u8D3.png)
![商家頁面](https://i.imgur.com/wJ0qMPf.png)
![後台管理](https://i.imgur.com/yeMrQd0.png)


## 安裝

以下將會引導你如何安裝此專案到你的電腦上。

Node.js 版本建議為：`20.1.2` 以上...

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

## 專案技術

- Node.js v20.1.2
- Vue v3.4.21
- Vite v5.1.6
- Vue Router v4.3.0
- Axios v1.6.8
- Bootstrap v5.3.3
- pinia v2.1.7
- socket.io-client v4.7.5

## 第三方服務

- 藍新金流

## CI/CD 說明 （未來）

當專案 merge 到 main 時會自動執行以下動作：

- 建立 Node.js 環境
- 安裝相依套件
- 編譯程式碼
- 執行 ESLint 掃描
- 執行測試
- 部署到 Github Pages
...

## 團隊成員

[![Contributors](https://contrib.rocks/image?repo=ERIC955/ECArtisans-Fontend)](https://github.com/ERIC955/ECArtisans-Fontend/graphs/contributors)

- [Eric](https://github.com/ERIC955)
- [Eliza](https://github.com/EliZa5852)
- [Jonathan](https://github.com/JonathanHsu0817)
- [Amy](https://github.com/stu050418)
