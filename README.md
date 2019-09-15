# Restaurant List
在網站首頁上能以小圖預覽全部餐廳，小圖上顯示餐廳縮圖、餐廳名字、餐廳分類與餐廳評價，以小圖點入會顯示餐廳詳細資訊，包括地址、電話、簡介...
需註冊與登入才能管理自己的清單

# 更新
+ 1.簡易版面餐廳清單
+ 2.增加CRUD功能，並使用MongoDB連接資料庫 (2019/9/7)
+ 3.重構route，符合MCV規則，並把修改刪除重新寫出符合RESful (2019/9/8)
+ 4.增加排序，可點選排序名稱、排序規則進行排序 (2019/9/8)
+ 5.新增功能，刪除需再次確認
+ 6.新增功能，註冊、登入、三方平台登入，可註冊登入管理自己的清單 (2019/9/15)

# 功能
+ 首頁搜尋bar可以輸入關鍵字搜尋餐館名稱or餐廳類別
+ 首頁新增Create按鈕，可新增一筆餐廳名單
+ 詳細內容頁點選地圖，跳出新頁面連結至google map
+ 可在首頁、詳細內容頁中點選Edit進行資料修改
+ 可在首頁、詳細內容頁中點選Delete刪除資料
+ 可在首頁進行餐廳類別排序
+ 必須註冊登入才行進行以上功能

## 相關安裝
1. 開啟terminal(終端機)，作業目錄下執行：
   ```
   git clone https://github.com/jofu1123/restaurant-list.git
   ```
2. 移動至目錄restaurant-list
   ```
   cd restaurant-list
   ```
3. 使用npm安裝相關套件
   ```
   npm install
   ```
4. 開啟本地MongoDB資料庫
5. 執行listSeeder.js，匯入餐廳預設資料
   ```
   ~/restaurant-list/models/seeds node user2restaurant.js
   ```
6. 輸入指令啟動本機伺服器
   ```
   nodemon app.js
   ```
   出現
   ```
   Express is listening on localhost:3000
   mongodb connected
   ```
   即成功，並移置 http://localhost:3000 顯示結果
   
# 預覽畫面
### 首頁
![index](https://github.com/jofu1123/restaurant-list/blob/master/photo/index1.jpg)
### 詳細內容頁面
![detail](https://github.com/jofu1123/restaurant-list/blob/master/photo/detail.jpg)
### 編輯餐廳頁面
![edit](https://github.com/jofu1123/restaurant-list/blob/master/photo/edit.jpg)
### 註冊頁面
![register](https://github.com/jofu1123/restaurant-list/blob/master/photo/register.jpg)
### 登入頁面
![login](https://github.com/jofu1123/restaurant-list/blob/master/photo/login.jpg)

# 使用工具
 + [Visual Studio Code](https://visualstudio.microsoft.com/zh-hant/) -開發code環境
 + [Express](https://www.npmjs.com/package/express) -應用程式架構
 + [Express-Handlebars](https://www.npmjs.com/package/express-handlebars) -使用模板引擎
 + [body-parser](https://www.npmjs.com/package/body-parser) -處理URLencoded格式的請求
 + [Mongoose](https://www.npmjs.com/package/mongoose) -MongoDB ODM
 + [method-override](https://www.npmjs.com/package/method-override) -處理PUT、DELETE動詞功能
 + [bcrypt-js](https://www.npmjs.com/package/bcrypt) -處理加密功能
 + [connect-flash](https://www.npmjs.com/package/connect-flash) - 暫存器
 + [dotenv](https://www.npmjs.com/package/dotenv) - 隱藏環境變數
 + [passport](https://www.npmjs.com/package/passport) - 驗證系統
