# CSS Standard Library - Copilot Instructions

## プロジェクト概要

CSS Standardは、フレームワーク非依存のプレーンなCSSライブラリです。以下の要件を満たすために開発されています：

- **マルチフレームワーク対応**: Node.js、ASP.NET Core、PHPなど様々なフレームワークで利用可能
- **低依存性**: TailwindやBootstrapのようなライブラリへの高い依存を避ける
- **レガシーブラウザ対応**: 古いブラウザでも動作する（OKLCHなどの新技術を避ける）
- **テーマ切り替え可能**: 複数のテーマを切り替えられる設計
- **カスタマイズの制限**: テーマ確定後は大きなカスタマイズを制限

## アーキテクチャ

### 階層構造

```
┌─────────────────────────────────────┐
│           テーマ層                   │  @css-std/theme-<theme-name>
│   (fluent2, material3, etc.)        │
├─────────────────────────────────────┤
│       コアコンポーネント層            │  @css-std/core
│   (button, container, border)       │
├─────────────────────────────────────┤
│           トークン層                 │  @css-std/props
│   (colors, fonts, prefixes)         │
└─────────────────────────────────────┘
```

### ディレクトリ構造

```
src/
├── props/          # トークン層
│   ├── _prefixes.scss    # CSS変数のプレフィックス定義
│   ├── _defines.scss     # カラー定義のベース設定
│   ├── _colors.scss      # パレットカラー生成Mixin
│   ├── _fonts.scss       # フォント関連のCSS変数
│   └── props.scss        # エントリーポイント
│
├── components/     # コアコンポーネント層
│   ├── _defines.scss     # コンポーネント共通定義
│   ├── _button.scss      # ボタンコンポーネント
│   ├── _container.scss   # レイアウトユーティリティ
│   ├── _border.scss      # ボーダーユーティリティ
│   └── components.scss   # エントリーポイント
│
└── themes/         # テーマ層
    ├── contract/         # 基本テーマ契約（共通設定）
    │   └── _contract.scss
    ├── fluent2/          # Fluent 2テーマ
    │   └── fluent2.scss
    └── material3/        # Material 3テーマ
        └── material3.scss
```

## カラーシステム

### CSS変数プレフィックス

| プレフィックス | 用途 |
|--------------|------|
| `--palette-` | パレット関連 |
| `--palette-color-` | パレットカラー（0-10） |
| `--palette-accent-` | アクセントカラー |
| `--palette-gray-` | グレースケール |
| `--font-` | フォント関連 |
| `--neutral-` | ニュートラルパレット |

### 明度レベル（0-10）

```scss
$palette-lightness-list: (
  0: 97%,   // 最も明るい
  1: 93%,
  2: 85%,
  3: 75%,
  4: 65%,
  5: 50%,   // 中間
  6: 42%,
  7: 34%,
  8: 26%,
  9: 18%,
  10: 10%   // 最も暗い
);
```

### セマンティックレベル

```scss
$semantic-levels: (
  "lighter": 2,
  "light": 3,
  "default": 5,
  "dark": 7,
  "darker": 9
);
```

### HUE定義（HSL色相環）

```scss
$hues: (
  "red": (h: 0, threshold: 50%),
  "orange": (h: 30, threshold: 40%),
  "yellow": (h: 50, threshold: 30%),
  "lime": (h: 90, threshold: 30%),
  "green": (h: 125, threshold: 30%),
  "teal": (h: 170, threshold: 40%),
  "cyan": (h: 190, threshold: 40%),
  "blue": (h: 220, threshold: 50%),
  "indigo": (h: 240, threshold: 70%),
  "violet": (h: 270, threshold: 70%),
  "purple": (h: 290, threshold: 50%),
  "pink": (h: 330, threshold: 55%)
);
```

### セマンティックカラー

- `primary` - メインアクションカラー（青系）
- `secondary` - セカンダリアクションカラー（ピンク系）
- `tertiary` - 第三のカラー（ティール系）
- `success` - 成功状態（緑系）
- `warning` - 警告状態（黄系）
- `danger` - 危険/エラー状態（赤系）
- `info` - 情報状態（シアン系）

## コンポーネント

### ボタン

```html
<button class="button">Default</button>
<button class="button primary">Primary</button>
<button class="button secondary">Secondary</button>
<button class="button success">Success</button>
<button class="button warning">Warning</button>
<button class="button danger">Danger</button>
```

### レイアウトユーティリティ

```css
/* Display */
.d-block, .d-inline, .d-inline-block, .d-flex, .d-inline-flex, 
.d-grid, .d-inline-grid, .d-flow-root, .d-none, .d-contents

/* Flex Direction */
.flex-row, .flex-row-reverse, .flex-column, .flex-column-reverse

/* Flex Wrap */
.flex-wrap, .flex-wrap-reverse, .flex-nowrap

/* Justify Content */
.justify-start, .justify-end, .justify-center, 
.justify-between, .justify-around, .justify-evenly

/* Align Items */
.align-items-start, .align-items-end, .align-items-center,
.align-items-baseline, .align-items-stretch
```

### ボーダーユーティリティ

```css
/* Border */
.border, .border-top, .border-bottom, .border-start, .border-end

/* Border Size */
.border-0, .border-1, .border-2, .border-3, .border-4, .border-5

/* Border Radius */
.rounded, .rounded-0 ~ .rounded-5, .rounded-circle,
.rounded-top, .rounded-bottom, .rounded-start, .rounded-end
```

## テーマ

### テーマの適用方法

```html
<html data-theme="fluent2">
<!-- または -->
<html data-theme="material3">
```

### 利用可能なテーマ

- `fluent2` - Microsoft Fluent 2 風デザイン
- `material3` - Google Material 3 風デザイン

### カスタムテーマの作成

テーマは `contract/_contract.scss` を継承して作成します：

```scss
@use "../contract/_contract.scss";

:root[data-theme="my-theme"] {
    --primary-h: var(--hue-blue);
    --primary-s: 70%;
    // 他のカスタマイズ
}
```

## 主要Mixin

### generate-hues

HUEカラー変数を生成します。

```scss
@include generate-hues($hues, $accent-light, $accent-dark, $default-threshold);
```

### generate-hue-classes

HUEクラスを生成します。

```scss
@include generate-hue-classes($hues, $saturation, $gray-saturation, $default-threshold);
```

### generate-semantic-colors

セマンティックカラーを生成します。

```scss
@include generate-semantic-colors($colors, $gray-saturation, $default-threshold);
```

## 開発ガイドライン

### コーディング規約

1. **CSS変数のプレフィックス**: 必ずプレフィックスを使用する
2. **HSL使用**: カラーはHSL形式で定義（OKLCHは使用しない）
3. **レガシー互換性**: 古いブラウザでも動作するプロパティを使用
4. **Sassモジュール**: `@use` を使用してモジュールをインポート

### ファイル命名規則

- パーシャルファイル: `_filename.scss`
- エントリーポイント: `filename.scss`
- テーマファイル: `themename.scss`

### 新しいコンポーネントの追加

1. `src/components/_newcomponent.scss` を作成
2. `src/components/components.scss` に `@use` を追加
3. 必要に応じてテーマ層でスタイルを上書き

## 技術的な決定事項

- **OKLCHを避ける理由**: 古いブラウザでのサポートが不十分
- **HSLを採用した理由**: 広いブラウザサポートと直感的な色操作
- **CSS変数を活用**: テーマ切り替えをランタイムで実現
- **Sassを使用**: Mixin、変数、モジュールシステムの活用

## 関連ドキュメント

- [開発経緯](docs/origin/20260207.md) - プロジェクト開始の背景と試行錯誤
