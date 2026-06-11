# nomad-css

フレームワーク非依存のテーマ切り替え可能なCSSライブラリ。

## 特徴

- **マルチフレームワーク**: Node.js、ASP.NET Core、PHPなど様々な環境で使用可能
- **低依存性**: ライブラリへの依存を最小限に抑えた設計
- **レガシー対応**: 古いブラウザでも動作（HSLベースのカラーシステム）
- **テーマ機能**: `data-theme` 属性でテーマ切り替え、27テーマ収録
- **3層構造**: ユーティリティ → コンポーネント → テーマの段階的利用が可能

## Get Started

使用方法は目的に応じて3つのパターンがあります。詳細は [getting-started.md](docs/getting-started.md) を参照してください。

### パターン1: ユーティリティのみを使用する

Sass ユーティリティ層のみを利用します。スペーシング・ボーダー・レイアウトのヘルパークラスとパレット生成Mixinを使いたい場合に適しています。コンポーネントやテーマは不要です。

```scss
// 個別にインポートして使用
@use "src/utilities/spacing";
@use "src/utilities/border";
@use "src/utilities/container";
@use "src/utilities/fonts";
@use "src/utilities/shadows";
```

```html
<!-- コンパイル後のCSSを使用 -->
<div class="d-flex gap-2 p-3">
  <span class="border rounded">Item</span>
</div>
```

### パターン2: nomad-css-ui を使用する（テーマなし）

ボタン・フォーム・テーブルなど25種類のUIコンポーネントをデフォルトスタイルで使用します。テーマは適用しませんが `default.css` に含まれるデフォルト変数値が適用されます。

```scss
// SCSSプロジェクトからインポートして使用
@use "src/nomad-css-ui/nomad-css-ui.scss";
```

```html
<!-- コンパイル済みのデフォルトCSSを使用 -->
<link rel="stylesheet" href="dist/css/default.css" />

<button class="button filled">Filled</button>
<button class="button outlined">Outlined</button>
<input class="form-control" type="text" placeholder="Input" />
```

### パターン3: テーマを使用する（推奨）

事前定義された27テーマの中から選択して適用します。`data-theme` 属性でテーマを切り替え、`data-color-scheme` でライト/ダークモードを制御できます。

```html
<!-- テーマCSSを読み込む -->
<link rel="stylesheet" href="dist/css/fluent2.css" />

<!-- html要素にdata-theme を指定 -->
<html data-theme="fluent2" data-color-scheme="light">
  <body>
    <button class="button filled">Default</button>
    <button class="button filled primary">Primary</button>
    <input class="form-control" type="text" placeholder="Input" />
    <table class="table striped">
      ...
    </table>
  </body>
</html>
```

## 利用可能なテーマ

| カテゴリ         | テーマ名                                                                           |
| ---------------- | ---------------------------------------------------------------------------------- |
| モダンUI         | `fluent2`, `material3`, `material2`, `material1`                                   |
| デザインシステム | `ant`, `bootstrap`, `chakra`, `carbon`, `primer`, `shadcn`, `spectrum`, `daisyui`  |
| OS風             | `apple-hig`, `win95`, `win7`, `aqua`, `holo`                                       |
| ユニーク         | `cyberpunk`, `terminal`, `neumorphism`, `glass`, `web20`, `skeuomorphic`, `linear` |
| カラー           | `nord`, `solarized`                                                                |
| デフォルト       | `default`                                                                          |

> テーマのプレビューは [ショーケース](https://uta-member.github.io/nomad-css/) で確認できます。

## アーキテクチャ

```
┌─────────────────────────────────────┐
│           テーマ層                   │  src/themes/<theme-name>/
│   (fluent2, material3 など27種)     │  CSS変数を上書きして外観を定義
├─────────────────────────────────────┤
│       nomad-css-ui 層               │  src/nomad-css-ui/
│   (button, form-control, table...)  │  25コンポーネントのプレーン定義
├─────────────────────────────────────┤
│       ユーティリティ層               │  src/utilities/
│   (palette, border, spacing...)     │  テーマ非依存のユーティリティ
└─────────────────────────────────────┘
```

## 開発環境セットアップ

```bash
# 依存関係インストール
npm install

# 全テーマをビルド + ショーケースサイト生成
npm run build

# 開発サーバー起動（ファイル変更を監視）
npm run watch

# 個別テーマのビルド
npm run build:fluent2
npm run build:material3

# コードフォーマット
npm run format
```

## ドキュメント

| ドキュメント                               | 内容                         |
| ------------------------------------------ | ---------------------------- |
| [Getting Started](docs/getting-started.md) | 3パターンの導入手順          |
| [アーキテクチャ](docs/architecture.md)     | 3層構造の詳細説明            |
| [コンポーネント](docs/components.md)       | 全コンポーネントのHTML使用例 |
| [ユーティリティ](docs/utilities.md)        | Mixin・クラスのリファレンス  |
| [テーマ作成ガイド](docs/themes.md)         | カスタムテーマの作成方法     |
| [開発経緯](docs/origin/20260207.md)        | 設計思想・経緯               |
