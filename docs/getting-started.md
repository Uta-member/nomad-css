# Getting Started

nomad-css は目的に応じて 3 つのパターンで利用できます。プロジェクトの規模や要件に合わせて選択してください。

---

## 前提条件

- **Node.js** (v18 以上)
- **Sass** (Dart Sass)

```bash
# Node.js プロジェクトで Sass をインストール
npm install -D sass
```

---

## パターン1: ユーティリティのみを使用する

`src/utilities/` 層の Sass Mixin・ユーティリティクラスのみを使用します。
UIコンポーネントやテーマは不要で、**スペーシング・ボーダー・レイアウト・パレット生成**のような基礎的なCSSヘルパーだけが必要な場合に適しています。

### 使用できるもの

| ファイル            | 提供するもの                                                    |
| ------------------- | --------------------------------------------------------------- |
| `_palette.scss`     | `generate-palette()` Mixin — HSLパレットのCSS変数を一括生成     |
| `_border.scss`      | `.border`, `.rounded` 等のボーダーユーティリティクラス          |
| `_breakpoints.scss` | `media-up()`, `media-down()` 等のレスポンシブMixin              |
| `_container.scss`   | `.d-flex`, `.justify-center` 等のレイアウトユーティリティクラス |
| `_fonts.scss`       | `h1`〜`h6` のフォントサイズ変数・クラス                         |
| `_shadows.scss`     | `.shadow-0`〜`.shadow-5` のシャドウユーティリティクラス         |
| `_spacing.scss`     | `.m-2`, `.p-3`, `.gap-1` 等のスペーシングクラス                 |

### SCSSで個別インポート

```scss
// 必要なユーティリティだけを選択してインポート
@use "path/to/nomad-css/src/utilities/spacing";
@use "path/to/nomad-css/src/utilities/border";
@use "path/to/nomad-css/src/utilities/container";
@use "path/to/nomad-css/src/utilities/fonts";
@use "path/to/nomad-css/src/utilities/shadows";
```

### パレット生成Mixinの使用例

```scss
@use "path/to/nomad-css/src/utilities/palette" as palette;

:root {
  // HSLパレットのCSS変数を生成
  @include palette.generate-palette(
    (
      hue: 220,
      // 色相 (0〜360)
      saturation: 80%,
      // 彩度
      accent-threshold: 50%,
      // アクセントカラー切り替え輝度
    )
  );
}
```

生成されるCSS変数:

```css
:root {
  --palette-hue: 220;
  --palette-saturation: 80%;
  --palette-color-0: hsl(220, 80%, 97%); /* 最も明るい */
  --palette-color-5: hsl(220, 80%, 50%); /* 中間 */
  --palette-color-10: hsl(220, 80%, 10%); /* 最も暗い */
  --palette-lighter: hsl(220, 80%, 85%);
  --palette-light: hsl(220, 80%, 75%);
  --palette-default: hsl(220, 80%, 50%);
  --palette-dark: hsl(220, 80%, 34%);
  --palette-darker: hsl(220, 80%, 18%);
  /* ...その他 accent-*, gray-* も生成 */
}
```

### レスポンシブMixinの使用例

```scss
@use "path/to/nomad-css/src/utilities/breakpoints" as breakpoints;

.my-component {
  width: 100%;

  @include breakpoints.media-up("md") {
    // min-width: 768px 以上
    width: 50%;
  }

  @include breakpoints.media-down("sm") {
    // max-width: 575.98px 以下
    padding: 0.5rem;
  }
}
```

**ブレークポイント**: `xs(0px)` / `sm(576px)` / `md(768px)` / `lg(992px)` / `xl(1200px)` / `xxl(1400px)`

### HTMLでの使用例

```html
<div class="d-flex flex-column gap-2 p-3">
  <h2 class="h4">見出し</h2>
  <span class="border rounded px-2 py-1 shadow-1">ボーダー付きアイテム</span>
</div>
```

---

## パターン2: nomad-css-ui を使用する（テーマなし）

`src/nomad-css-ui/nomad-css-ui.scss` をインポートし、**25種類のUIコンポーネント**をデフォルトスタイルで使用します。
テーマ固有のブランドカラーは適用されませんが、機能的なUIコンポーネントがすぐに使えます。

### 利用可能なコンポーネント（25種）

| カテゴリ       | コンポーネント                                                                          |
| -------------- | --------------------------------------------------------------------------------------- |
| フォーム       | `button`, `form-control`, `form-hint`, `select`, `checkbox`, `radio`, `range`, `switch` |
| データ表示     | `table`, `badge`, `chip`, `avatar`, `list`                                              |
| フィードバック | `alert`, `spinner`, `skeleton`, `progress`                                              |
| ナビゲーション | `breadcrumb`, `pagination`                                                              |
| レイアウト     | `card`, `divider`, `accordion`, `dialog`                                                |
| オーバーレイ   | `tooltip`                                                                               |

### SCSSからインポートして使用

```scss
// nomad-css-ui 全体をインポート（utilities も含む）
@use "path/to/nomad-css/src/nomad-css-ui/nomad-css-ui.scss";
```

### コンパイル済みCSSを直接使用

ビルド済みの `dist/css/default.css` を読み込むだけで使用できます。

```bash
# ビルドを実行
npm run build:default
# → dist/css/default.css が生成される
```

```html
<link rel="stylesheet" href="dist/css/default.css" />
```

### HTMLでの使用例

```html
<link rel="stylesheet" href="dist/css/default.css" />

<!-- ボタン -->
<button class="button">Default</button>
<button class="button filled">Filled</button>
<button class="button tonal">Tonal</button>
<button class="button outlined">Outlined</button>
<button class="button text">Text</button>

<!-- フォームコントロール -->
<input class="form-control" type="text" placeholder="テキスト入力" />
<select class="select">
  <option>選択肢1</option>
  <option>選択肢2</option>
</select>

<!-- テーブル -->
<table class="table striped bordered hover">
  <thead>
    <tr>
      <th>名前</th>
      <th>値</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>item1</td>
      <td>100</td>
    </tr>
  </tbody>
</table>

<!-- バッジ・チップ -->
<span class="badge">NEW</span>
<span class="chip">タグ</span>

<!-- アラート -->
<div class="alert">情報メッセージ</div>

<!-- スピナー -->
<span class="spinner"></span>
```

> **補足**: `data-theme` 属性なしで使用できますが、テーマ固有のカラーバリエーション（`primary`, `danger` 等）は機能しません。

---

## パターン3: テーマを使用する（推奨）

事前定義された27テーマを使用してUIコンポーネントを適用します。
`data-theme` 属性でテーマを切り替え、`data-color-scheme` でライト/ダークモードを制御できます。

### ステップ1: テーマCSSを読み込む

使用したいテーマのCSSを読み込みます。

```bash
# ビルドを実行
npm run build:fluent2
# → dist/css/fluent2.css が生成される

# または全テーマを一括ビルド
npm run build:css
```

```html
<link rel="stylesheet" href="dist/css/fluent2.css" />
```

### ステップ2: `<html>` にテーマを指定する

```html
<!-- テーマのみ指定（ライトモードがデフォルト） -->
<html data-theme="fluent2">
  <!-- ライトモードを明示 -->
  <html data-theme="fluent2" data-color-scheme="light">
    <!-- ダークモードを指定 -->
    <html data-theme="fluent2" data-color-scheme="dark"></html>
  </html>
</html>
```

### ステップ3: コンポーネントを使用する

```html
<!DOCTYPE html>
<html lang="ja" data-theme="fluent2" data-color-scheme="light">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="dist/css/fluent2.css" />
    <title>My App</title>
  </head>
  <body>
    <!-- ボタン（セマンティックカラー付き） -->
    <button class="button filled">Default</button>
    <button class="button filled primary">Primary</button>
    <button class="button filled danger">Danger</button>
    <button class="button outlined secondary">Secondary</button>

    <!-- フォーム -->
    <input class="form-control" type="text" placeholder="入力してください" />

    <!-- カード -->
    <div class="card">
      <div class="card-header">タイトル</div>
      <div class="card-body">コンテンツ</div>
      <div class="card-footer">フッター</div>
    </div>
  </body>
</html>
```

### 利用可能なテーマ一覧

| カテゴリ         | テーマ名       | 対応CSSファイル             |
| ---------------- | -------------- | --------------------------- |
| モダンUI         | `fluent2`      | `dist/css/fluent2.css`      |
| モダンUI         | `material3`    | `dist/css/material3.css`    |
| モダンUI         | `material2`    | `dist/css/material2.css`    |
| モダンUI         | `material1`    | `dist/css/material1.css`    |
| デザインシステム | `ant`          | `dist/css/ant.css`          |
| デザインシステム | `bootstrap`    | `dist/css/bootstrap.css`    |
| デザインシステム | `chakra`       | `dist/css/chakra.css`       |
| デザインシステム | `carbon`       | `dist/css/carbon.css`       |
| デザインシステム | `primer`       | `dist/css/primer.css`       |
| デザインシステム | `shadcn`       | `dist/css/shadcn.css`       |
| デザインシステム | `spectrum`     | `dist/css/spectrum.css`     |
| デザインシステム | `daisyui`      | `dist/css/daisyui.css`      |
| OS風             | `apple-hig`    | `dist/css/apple-hig.css`    |
| OS風             | `win95`        | `dist/css/win95.css`        |
| OS風             | `win7`         | `dist/css/win7.css`         |
| OS風             | `aqua`         | `dist/css/aqua.css`         |
| OS風             | `holo`         | `dist/css/holo.css`         |
| ユニーク         | `cyberpunk`    | `dist/css/cyberpunk.css`    |
| ユニーク         | `terminal`     | `dist/css/terminal.css`     |
| ユニーク         | `neumorphism`  | `dist/css/neumorphism.css`  |
| ユニーク         | `glass`        | `dist/css/glass.css`        |
| ユニーク         | `web20`        | `dist/css/web20.css`        |
| ユニーク         | `skeuomorphic` | `dist/css/skeuomorphic.css` |
| ユニーク         | `linear`       | `dist/css/linear.css`       |
| カラー           | `nord`         | `dist/css/nord.css`         |
| カラー           | `solarized`    | `dist/css/solarized.css`    |
| デフォルト       | `default`      | `dist/css/default.css`      |

### JavaScriptでテーマを動的に切り替える

```js
// テーマを切り替える
document.documentElement.setAttribute("data-theme", "material3");

// ダークモードに切り替える
document.documentElement.setAttribute("data-color-scheme", "dark");

// ライトモードに切り替える
document.documentElement.setAttribute("data-color-scheme", "light");
```

---

## 開発環境でのセットアップ

### Sass をウォッチモードで起動する

```bash
# ファイル変更を監視してCSSを自動リビルド + ショーケースサーバーを起動
npm run watch

# Sassのみ監視（ショーケースなし）
npm run watch:css
```

### 全テーマをビルドする

```bash
npm run build:css      # 全27テーマをコンパイル
npm run build          # CSS + ショーケースサイトを生成
```

---

## 次のステップ

- **カスタムテーマを作成する**: [テーマ作成ガイド](themes.md)
- **コンポーネントの詳細**: [コンポーネントリファレンス](components.md)
- **ユーティリティの詳細**: [ユーティリティリファレンス](utilities.md)
- **アーキテクチャを理解する**: [アーキテクチャ詳細](architecture.md)
