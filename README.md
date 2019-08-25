# Restaurant List
在網站首頁上能以小圖預覽全部餐廳，小圖上顯示餐廳縮圖、餐廳名字、餐廳分類與餐廳評價，以小圖點入會顯示餐廳詳細資訊，包括地址、電話、簡介...

# 功能
+ 首頁搜尋bar可以輸入關鍵字搜尋餐館名稱or餐廳類別
+ 詳細內容頁點選地圖，跳出新頁面連結至google map

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
4. 輸入指令啟動本機伺服器
   ```
   nodemon app.js
   ```
   出現Express is listening on localhost:3000即成功，並移置 http://localhost:3000 顯示結果
   
# 預覽畫面
### 首頁
![index](https://github.com/jofu1123/restaurant-list/blob/master/photo/1566734053510.jpg)
### 詳細內容頁面
![detail](https://github.com/jofu1123/restaurant-list/blob/master/photo/1566742946875.jpg)

# 使用工具
 + [Visual Studio Code](https://visualstudio.microsoft.com/zh-hant/) -開發code環境
 + [Express](https://www.npmjs.com/package/express) -應用程式架構
 + [Express-Handlebars](https://www.npmjs.com/package/express-handlebars) -使用模板引擎
