# AGAIN 官網（一頁式推廣 + 法律文件）

建議用 **GitHub Pages** 託管整站：推廣 landing、隱私政策、使用條款、社群規範同一網域，審核與行銷都方便。

## 檔案

| 檔案 | 用途 |
|------|------|
| `index.html` | 一頁式推廣官網（含 App 功能、活動、點數、安全說明） |
| `help.html` | 幫助中心 FAQ（與 App 內幫助中心同步） |
| `privacy.html` | 隱私政策（App Store / Play 必填 URL） |
| `terms.html` | 使用條款 |
| `community.html` | 社群規範 |
| `en/index.html` | 英文首頁 |
| `en/help.html` | 英文幫助中心 |
| `styles.css` | 共用樣式 |

## 與 App 同步

法律文件正文應與 `docs/legal/` 一致（App `LEGAL_BASE_URL` 可指向本官網或 Firebase Hosting）。更新流程：

```bash
# 1. 先改 docs/legal/*.html（或從該目錄複製正文）
cp docs/legal/terms.html docs/web/terms.html   # 需保留 web 的 back-link 與 styles.css 外殼
cp docs/legal/privacy.html docs/web/privacy.html
cp docs/legal/community.html docs/web/community.html

# 2. 若使用 Firebase 備用 hosting
cp docs/legal/*.{html,css} AgainApp/hosting/legal/

# 3. 幫助中心 FAQ 與 App 同步來源
# AgainApp/src/constants/helpCenter.js → docs/web/help.html
```

## GitHub Pages 部署（建議）

### 1. 建立 repo

在 GitHub 新建 **公開** repo，例如：`again-web`（名稱可自訂）

### 2. 上傳本目錄內容

將 `docs/web/` 內所有檔案放到 repo **根目錄**（不是放進子資料夾）：

```bash
cd docs/web
git init
git add .
git commit -m "chore: AGAIN 官網與法律文件"
git branch -M main
git remote add origin https://github.com/你的帳號/again-web.git
git push -u origin main
```

### 3. 開啟 Pages

Repo → **Settings** → **Pages** → Source 選 **main** branch、**/ (root)** → Save

數分鐘後網址為：

```text
https://你的帳號.github.io/again-web/
```

### 4. 審核用 URL（填進 App Store / Google Play）

```text
https://你的帳號.github.io/again-web/privacy.html
https://你的帳號.github.io/again-web/terms.html
```

### 5. 更新 App 內連結

`AgainApp/.env`：

```env
LEGAL_BASE_URL=https://你的帳號.github.io/again-web
```

改完需重啟 Metro（`npm run start:reset`）。

### 6. 未來自訂網域（選用）

若購買 `again.app`，在 Pages 設定 Custom domain，並在 DNS 加 CNAME。

---

## 與 Firebase Hosting 的關係

- **官網推廣** → 建議 GitHub Pages（或日後自訂網域）
- **App 後端** → 繼續用 Firebase（Auth、Firestore）
- 兩者分開、互不干擾，是常見做法

`AgainApp/hosting/legal/` 僅作 Firebase 備用；以 GitHub Pages 為官網時可忽略。
