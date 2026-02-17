# Car Info App

国内の人気車種のスペック・価格・燃費をまとめて比較できる Web アプリです。お気に入り登録や並べ比べで、欲しいクルマを選びやすくします。

## 主な機能

- **ホーム** — サイト紹介とおすすめ車種の表示
- **車種一覧** — フィルター・検索で車種を絞り込み
- **車種詳細** — スペック・価格・燃費などの詳細情報
- **お気に入り** — 気になる車を登録・一覧表示・CSV エクスポート
- **比較** — 複数車種を並べて比較・CSV エクスポート
- **マイガレージ** — 登録した車の管理
- **メーカー公式サイト** — メーカー別リンク一覧
- **管理画面** — 車種の登録・編集・削除（管理者向け）

## 技術スタック

- **React** 19.x
- **React Router** 7.x
- **Create React App**（react-scripts 5.x）
- **Testing Library**（Jest / React Testing Library）

## 必要環境

- Node.js（推奨: 18.x 以上）
- npm

## セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/your-username/car-info-app.git
cd car-info-app

# 依存関係をインストール
npm install
```

## 利用可能なスクリプト

| コマンド | 説明 |
|----------|------|
| `npm start` | 開発サーバーを起動（[http://localhost:3000](http://localhost:3000)） |
| `npm test` | テストを実行（ウォッチモード） |
| `npm run build` | 本番用ビルドを `build` に出力 |
| `npm run eject` | CRA の設定をプロジェクトに展開（非推奨・取り消し不可） |

## ルート一覧

| パス | 説明 |
|------|------|
| `/` | ホーム |
| `/list` | 車種一覧 |
| `/car/:id` | 車種詳細 |
| `/favorites` | お気に入り |
| `/comparison` | 比較 |
| `/my-garage` | マイガレージ |
| `/manufacturers` | メーカー公式サイト |
| `/admin/register` | 車種登録（管理） |
| `/admin/cars` | 車種編集・削除（管理） |

## プロジェクト構成

```
car-info-app/
├── README.md
├── package.json
├── package-lock.json
├── public/
│   ├── index.html
│   └── manifest.json
└── src/
    ├── App.css
    ├── App.jsx
    ├── index.css
    ├── index.js
    ├── reportWebVitals.js
    ├── components/
    │   ├── Button.css
    │   ├── Button.jsx
    │   ├── Card.css
    │   ├── Card.jsx
    │   ├── Layout.css
    │   └── Layout.jsx
    ├── data/
    │   ├── cars.js
    │   ├── comparison.js
    │   ├── favorites.js
    │   └── manufacturers.js
    ├── features/
    │   ├── admin/
    │   │   ├── CarAdminCars.jsx
    │   │   ├── CarAdminForm.jsx
    │   │   └── CarAdminRegister.jsx
    │   ├── carDetail/
    │   │   ├── CarDetail.jsx
    │   │   └── SpecTable.jsx
    │   ├── carList/
    │   │   ├── CarList.jsx
    │   │   ├── CarListFilters.jsx
    │   │   ├── CarListGrid.jsx
    │   │   ├── carListUtils.js
    │   │   └── useCarListFilters.js
    │   ├── comparison/
    │   │   ├── Comparison.jsx
    │   │   ├── ComparisonTable.jsx
    │   │   └── exportComparisonCsv.js
    │   ├── favorites/
    │   │   ├── Favorites.jsx
    │   │   ├── FavoritesEmpty.jsx
    │   │   ├── FavoritesGrid.jsx
    │   │   ├── FavoritesList.jsx
    │   │   ├── exportFavoritesCsv.js
    │   │   └── useFavorites.js
    │   ├── home/
    │   │   ├── Home.jsx
    │   │   ├── HomeFeatured.jsx
    │   │   ├── HomeHeroIcons.jsx
    │   │   └── HomeSiteDescList.jsx
    │   ├── manufacturerLinks/
    │   │   └── ManufacturerLinks.jsx
    │   ├── myGarage/
    │   │   └── MyGarage.jsx
    │   └── styles/
    │       ├── CarAdmin.css
    │       ├── CarDetail.css
    │       ├── CarList.css
    │       ├── CarListFilters.css
    │       ├── Comparison.css
    │       ├── Favorites.css
    │       ├── Home.css
    │       ├── HomeFeatured.css
    │       ├── HomeHeroIcons.css
    │       ├── HomeSiteDescList.css
    │       ├── ManufacturerLinks.css
    │       ├── MyGarage.css
    │       └── SpecTable.css
    └── utils/
        └── exportCarsCsv.js
```

## ファイル説明（.jsx / .js）

### ルート（src/）

| ファイル | 説明 |
|----------|------|
| `App.jsx` | ルーティング定義と共通レイアウト。各ページのルートと `<Layout>` を組み合わせる |
| `index.js` | アプリのエントリポイント。React のマウントと `reportWebVitals` の呼び出し |
| `reportWebVitals.js` | Web Vitals（CLS, FID, FCP, LCP, TTFB）の計測用。パフォーマンス計測に利用 |

### 共通コンポーネント（src/components/）

| ファイル | 説明 |
|----------|------|
| `Layout.jsx` | ヘッダー・ナビゲーション・フッターを含む共通レイアウト。ページタイトルとメニュー表示 |
| `Button.jsx` | 汎用ボタンコンポーネント。variant（primary 等）や `as` でリンク化可能 |
| `Card.jsx` | カード表示用コンポーネント。`href` 指定でリンクカードとしても使用可能 |

### データ（src/data/）

| ファイル | 説明 |
|----------|------|
| `cars.js` | 車種データの取得・追加・更新・削除。localStorage 連携と ID 生成 |
| `comparison.js` | 比較リスト（最大4件）の ID 一覧の読み書き。localStorage で永続化 |
| `favorites.js` | お気に入り ID 一覧の読み書き。localStorage で永続化 |
| `manufacturers.js` | メーカー名・公式URL 等の静的データ（国内・輸入の一覧） |

### ユーティリティ（src/utils/）

| ファイル | 説明 |
|----------|------|
| `exportCarsCsv.js` | 車一覧の CSV ダウンロード、および比較表形式の CSV ダウンロード |

### 機能: 管理（src/features/admin/）

| ファイル | 説明 |
|----------|------|
| `CarAdminRegister.jsx` | 車種の新規登録画面。フォーム送信で `cars.js` に追加 |
| `CarAdminCars.jsx` | 登録済み車種の一覧・編集・削除画面 |
| `CarAdminForm.jsx` | 車種の登録・編集用フォーム（共通コンポーネント） |

### 機能: 車種詳細（src/features/carDetail/）

| ファイル | 説明 |
|----------|------|
| `CarDetail.jsx` | 車種詳細ページ。ID で車を取得し、スペック・価格・燃費等を表示 |
| `SpecTable.jsx` | スペックを表形式で表示するコンポーネント |

### 機能: 車種一覧（src/features/carList/）

| ファイル | 説明 |
|----------|------|
| `CarList.jsx` | 車種一覧ページ。フィルター・検索と一覧表示の組み合わせ |
| `CarListFilters.jsx` | セグメント・メーカー・燃料タイプなどのフィルター UI |
| `CarListGrid.jsx` | 車種カードをグリッドで表示するコンポーネント |
| `carListUtils.js` | 車リストのフィルタ処理（filterCars）とユニーク値取得（getUniqueValues） |
| `useCarListFilters.js` | 車一覧の取得とフィルタ状態・フィルタ結果を返すカスタムフック |

### 機能: 比較（src/features/comparison/）

| ファイル | 説明 |
|----------|------|
| `Comparison.jsx` | 比較ページ。比較リストに登録した車を並べて表示 |
| `ComparisonTable.jsx` | 複数車種を横並びで比較する表コンポーネント |
| `exportComparisonCsv.js` | 比較表を CSV でダウンロードする関数 |

### 機能: お気に入り（src/features/favorites/）

| ファイル | 説明 |
|----------|------|
| `Favorites.jsx` | お気に入り一覧ページ。登録車の表示と CSV エクスポート |
| `FavoritesEmpty.jsx` | お気に入りが0件のときの空状態表示 |
| `FavoritesGrid.jsx` | お気に入り車をグリッド表示するコンポーネント |
| `FavoritesList.jsx` | お気に入り車をリスト表示するコンポーネント |
| `useFavorites.js` | お気に入り ID 一覧と表示用車リスト・削除ハンドラを返すカスタムフック |
| `exportFavoritesCsv.js` | お気に入り一覧を CSV でダウンロードする関数 |

### 機能: ホーム（src/features/home/）

| ファイル | 説明 |
|----------|------|
| `Home.jsx` | ホームページ。ヒーローとおすすめ車種の表示 |
| `HomeFeatured.jsx` | おすすめ・注目車種のセクション |
| `HomeHeroIcons.jsx` | ヒーローエリアのアイコン・ビジュアル |
| `HomeSiteDescList.jsx` | サイトの特徴・説明リスト（比較・お気に入り等） |

### 機能: その他（src/features/）

| ファイル | 説明 |
|----------|------|
| `ManufacturerLinks.jsx` | メーカー公式サイトへのリンク一覧ページ |
| `MyGarage.jsx` | マイガレージページ。ユーザーが登録した車の管理表示 |

## ライセンス

このプロジェクトはプライベートです。
