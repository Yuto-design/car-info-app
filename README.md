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

## プロジェクト構成（抜粋）

```
src/
├── App.jsx                 # ルーティング・レイアウト
├── components/             # 共通コンポーネント（Layout, Card, Button）
├── features/               # 機能別モジュール
│   ├── home/               # ホーム
│   ├── carList/            # 車種一覧
│   ├── carDetail/          # 車種詳細
│   ├── favorites/          # お気に入り
│   ├── comparison/         # 比較
│   ├── myGarage/           # マイガレージ
│   ├── manufacturerLinks/  # メーカーリンク
│   ├── admin/              # 管理（登録・編集・削除）
│   └── styles/             # 機能別 CSS
├── data/                   # 静的データ（cars, manufacturers 等）
└── utils/                  # ユーティリティ（CSV エクスポート等）
```

## ライセンス

このプロジェクトはプライベートです。
