# テーマ作成ガイド (`src/themes/`)

テーマは `src/nomad-css-ui/nomad-css-ui.scss` をベースとし、CSS 変数を上書きすることでコンポーネントの外観を定義します。

---

## テーマの基本構造

```
src/themes/<theme-name>/
├── <theme-name>.scss       # エントリーポイント
├── utilities/
│   ├── _prefixes.scss      # テーマ名・カラースキーム名の定義
│   ├── _colors.scss        # text-color, surface-color 等のカラー定義
│   └── _fonts.scss         # フォントファミリー等のフォント定義
└── components/
    ├── _components.scss    # コンポーネント上書きのエントリーポイント
    └── _button.scss        # ボタンの上書き（例）
```

### エントリーポイントの構成

```scss
// <theme-name>.scss
@use "../../nomad-css-ui/nomad-css-ui.scss"; // ベースとして読み込む（必須）
@use "./utilities/prefixes" as prefixes;
@use "./utilities/colors" as colors;
@use "./utilities/fonts" as fonts;
@use "./components/components" as components;
```

---

## テーマの適用方法

### HTML への適用

```html
<!-- テーマのみ指定 -->
<html data-theme="my-theme">
  <!-- ライトモードを明示 -->
  <html data-theme="my-theme" data-color-scheme="light">
    <!-- ダークモードを指定 -->
    <html data-theme="my-theme" data-color-scheme="dark"></html>
  </html>
</html>
```

---

## Step 1: `_prefixes.scss` — テーマ名の定義

```scss
// src/themes/my-theme/utilities/_prefixes.scss
$theme-name: "my-theme";
$light-mode-name: "light";
$dark-mode-name: "dark";
```

---

## Step 2: `_colors.scss` — カラーの定義

テーマのメインカラーと共通カラー変数を定義します。

```scss
// src/themes/my-theme/utilities/_colors.scss
@use "../utilities/prefixes" as prefixes;

// メインパレット（primary カラー）の色相・彩度を上書き
:root[data-theme="#{prefixes.$theme-name}"] {
  --palette-hue: 200; // 色相（0〜360）
  --palette-saturation: 70%; // 彩度
}

// ライトモードのカラー定義
:root[data-theme="#{prefixes.$theme-name}"],
:root[data-theme="#{prefixes.$theme-name}"][data-color-scheme="#{prefixes.$light-mode-name}"] {
  --text-color: #1f1f1f;
  --text-color-subtle: #3f3f3f;
  --text-color-strong: #000000;

  --surface-color: #f0f0f0;
  --surface-color-raised: #f5f5f5;
  --surface-color-overlay: #ffffff;
  --surface-color-sunken: #e5e5e5;
  --surface-color-deep: #d9d9d9;
}

// ダークモードのカラー定義
:root[data-theme="#{prefixes.$theme-name}"][data-color-scheme="#{prefixes.$dark-mode-name}"] {
  --text-color: #f0f0f0;
  --text-color-subtle: #f5f5f5;
  --text-color-strong: #e5e5e5;

  --surface-color: #0d0d0d;
  --surface-color-raised: #1a1a1a;
  --surface-color-overlay: #262626;
  --surface-color-sunken: #0a0a0a;
  --surface-color-deep: #050505;
}
```

---

## Step 3: `_fonts.scss` — フォントの定義

```scss
// src/themes/my-theme/utilities/_fonts.scss
@use "../utilities/prefixes" as prefixes;

:root[data-theme="#{prefixes.$theme-name}"] {
  --font-family: "Segoe UI", sans-serif;
  --font-body-size: 14px;

  // 見出しサイズのカスタマイズ（必要な場合のみ）
  --font-h1-size: 2rem;
  --font-h1-weight: 600;
}
```

---

## Step 4: コンポーネントの上書き

### ボタンの例 (`_button.scss`)

コンポーネントの CSS 変数を上書きして外観を定義します。

```scss
// src/themes/my-theme/components/_button.scss
@use "../utilities/prefixes" as prefixes;

:root[data-theme="#{prefixes.$theme-name}"] {
  .button {
    // 全バリエーション共通
    --button-border-width: 1px;
    --button-border-radius: 4px; // Fluent2 風の角丸

    // filled バリエーション
    &.filled {
      --button-border-color: var(--button-bg-color);
      --button-hover-border-color: var(--button-hover-bg-color);
      --button-active-border-color: var(--button-active-bg-color);
    }

    // outlined バリエーション
    &.outlined {
      --button-bg-color: transparent;
      --button-border-color: var(--palette-default);
      --button-color: var(--palette-default);
    }

    // 無効状態
    &:disabled {
      --button-disabled-opacity: 0.5;
    }
  }
}
```

### セマンティックカラーの例

```scss
:root[data-theme="#{prefixes.$theme-name}"] {
  .button.primary {
    // primary クラスが付いた場合の色は CSS 変数で制御
    // nomad-css-ui 側の .primary セレクタで palette-hue 等を上書きしている
  }

  // secondary ボタンをサーフェスカラーで表現
  .button.filled.secondary {
    --button-bg-color: var(--surface-color-overlay);
    --button-color: var(--text-color);
    --button-border-color: var(--border-color);
    --button-hover-bg-color: var(--surface-color);
    --button-active-bg-color: var(--surface-color-sunken);
  }
}
```

### `_components.scss` — エントリーポイント

```scss
// src/themes/my-theme/components/_components.scss
@use "./button" as *;
// 他のコンポーネント上書きがあれば追加
```

---

## カスタマイズリファレンス

### 上書き可能な主要変数

#### グローバルカラー

| 変数                      | 推奨上書きタイミング                                      |
| ------------------------- | --------------------------------------------------------- |
| `--text-color`            | ライト/ダーク両モードで必須                               |
| `--surface-color`         | ライト/ダーク両モードで必須                               |
| `--surface-color-overlay` | ライト/ダーク両モードで必須                               |
| `--border-color`          | 必要に応じて（デフォルトは neutral パレットから自動生成） |

#### パレット

| 変数                   | 説明                                                         |
| ---------------------- | ------------------------------------------------------------ |
| `--palette-hue`        | テーマのメインカラーの色相                                   |
| `--palette-saturation` | テーマのメインカラーの彩度                                   |
| `--palette-default`    | デフォルト明度のカラー（通常は `var(--palette-color-5)` 等） |

#### ボタン

| 変数                     | 説明                                       |
| ------------------------ | ------------------------------------------ |
| `--button-border-radius` | 角丸（Fluent2: `4px`, Material3: `10rem`） |
| `--button-border-width`  | ボーダー幅                                 |
| `--button-transition`    | アニメーション                             |

---

## 既存テーマの実装例

### Fluent 2 (`src/themes/fluent2/`)

Microsoft Fluent Design System 2 に基づくデザインです。

- **色相**: デフォルト（primary パレットの HUE を上書きなし）
- **角丸**: `4px`（やや角ばった印象）
- **フォント**: `'Yu Gothic UI', 'Segoe UI', sans-serif`
- **Dark Mode**: 対応 (`--surface-color: #0d0d0d` 等)

```html
<html data-theme="fluent2">
  <html data-theme="fluent2" data-color-scheme="dark"></html>
</html>
```

### Material 3 (`src/themes/material3/`)

Google Material Design 3 に基づくデザインです。

- **色相**: HUE 260 (紫系)、彩度 70%
- **角丸**: `10rem`（完全な丸みを帯びたボタン）
- **フォント**: `'Roboto', sans-serif`

```html
<html data-theme="material3"></html>
```

---

## CSS のビルド

新しいテーマを追加したら、`package.json` にビルドスクリプトを追加します:

```json
{
  "scripts": {
    "build:my-theme": "sass src/themes/my-theme/my-theme.scss:dist/css/my-theme.css --style=expanded",
    "build": "npm run build:fluent2 && npm run build:material3 && npm run build:my-theme"
  }
}
```

```sh
npm run build:my-theme
```
