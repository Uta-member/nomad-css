# nomad-css アーキテクチャ

## プロジェクト構造

nomad-css は以下の 3 つの独立した層で構成されています。

```
┌─────────────────────────────────────┐
│           テーマ層                   │  src/themes/<theme-name>/
│   (fluent2, material3, etc.)        │  CSS変数を上書きして外観を定義
├─────────────────────────────────────┤
│       nomad-css-ui 層               │  src/nomad-css-ui/
│   (button, form-control, table...)  │  プレーンなコンポーネント定義
├─────────────────────────────────────┤
│       ユーティリティ層               │  src/utilities/
│   (palette, border, fonts...)       │  テーマ非依存のユーティリティ
└─────────────────────────────────────┘
```

---

## 各層の役割

### 1. ユーティリティ層 (`src/utilities/`)

テーマにも特定のフレームワークにも依存しない、汎用的な CSS ユーティリティ群です。
**nomad-css 直下のコアコンセプト**がここに配置されます。

**責務**:

- パレットカラーを生成する Mixin の提供
- ボーダー・フォント・レイアウトなどの汎用ユーティリティクラスの提供
- レスポンシブ対応のブレークポイント Mixin の提供
- CSS 変数プレフィックスの定義

**ファイル一覧**:

| ファイル            | 役割                                                            |
| ------------------- | --------------------------------------------------------------- |
| `_prefixes.scss`    | CSS 変数のグローバルプレフィックス (`$prefix`) を定義           |
| `_palette.scss`     | パレット生成 Mixin `generate-palette()` を提供                  |
| `_border.scss`      | `.border`, `.border-top` 等のボーダーユーティリティクラス       |
| `_breakpoints.scss` | `media-up()`, `media-down()` 等のブレークポイント Mixin         |
| `_container.scss`   | Display・Flex・Width・Height 等のレイアウトユーティリティクラス |
| `_fonts.scss`       | 見出し (h1〜h6) のフォントサイズ・ウェイト変数とクラス          |

---

### 2. nomad-css-ui 層 (`src/nomad-css-ui/`)

`src/utilities/` に依存し、よく使われる UI コンポーネントをプレーンな形で定義する層です。
各テーマから CSS 変数を上書きすることで、外観を自在に変えることができます。

**責務**:

- 各コンポーネントの構造・動作 (hover, focus, disabled) の定義
- コンポーネントが参照する CSS 変数にデフォルト値を設定
- HUE カラー・セマンティックカラーの変数生成
- 共通カラー変数 (`--border-color`, `--text-color`, `--surface-color`) の定義

**ディレクトリ構造**:

```
src/nomad-css-ui/
├── _nomad-css-ui.scss      # エントリーポイント（utilities と components を統合）
├── components/             # コンポーネント定義
│   ├── _components.scss    # コンポーネントのエントリーポイント
│   ├── _button.scss        # ボタン
│   ├── _checkbox.scss      # チェックボックス
│   ├── _radio.scss         # ラジオボタン
│   ├── _form-control.scss  # テキスト入力 (input)
│   ├── _select.scss        # セレクトボックス
│   ├── _range.scss         # レンジスライダー
│   ├── _progress.scss      # プログレスバー
│   └── _table.scss         # テーブル
└── utilities/              # nomad-css-ui 固有のユーティリティ
    ├── _palette.scss       # HUE + セマンティックカラーのパレット統合
    ├── _color-defines.scss # 共通カラー変数のデフォルト値設定
    ├── _hue-colors.scss    # HSL 色相環 12 色の定義
    ├── _semantics.scss     # セマンティックカラー (primary, danger 等) の定義
    └── _fonts.scss         # nomad-css-ui 固有のフォント変数
```

**コンポーネントの設計ルール**:

- すべてのスタイルプロパティは CSS 変数経由で定義する
- 具体的な色値 (`hsl(210, 100%, 50%)` 等) を直接記述しない
- セマンティックカラー変数 (`var(--palette-default)` 等) または共通カラー変数 (`var(--border-color)` 等) を参照する

---

### 3. テーマ層 (`src/themes/`)

`src/nomad-css-ui/` の CSS 変数を上書きし、特定のデザインシステムの見た目を実現する層です。

**責務**:

- `data-theme` 属性セレクタ内で CSS 変数を上書き
- テーマごとの kaidan (色・角丸・影・フォント等) の定義
- `data-color-scheme` 対応 (ライト/ダーク モード)

**ディレクトリ構造**:

```
src/themes/
├── default/
│   └── default.scss            # デフォルトテーマ（最小限の定義）
├── fluent2/
│   ├── fluent2.scss            # エントリーポイント
│   ├── utilities/
│   │   ├── _prefixes.scss      # テーマ名・カラースキーム名の定義
│   │   ├── _colors.scss        # text-color, surface-color 等のカラー定義
│   │   └── _fonts.scss         # フォントファミリー等の定義
│   └── components/
│       ├── _components.scss    # コンポーネント上書きのエントリーポイント
│       └── _button.scss        # ボタンの上書き
└── material3/
    ├── material3.scss          # エントリーポイント
    ├── utilities/              # (fluent2 と同様の構成)
    └── components/
```

**テーマエントリーポイントの構成**:

```scss
// fluent2.scss の例
@use "../../nomad-css-ui/nomad-css-ui.scss"; // nomad-css-ui をベースとして読み込む
@use "./utilities/prefixes" as prefixes;
@use "./utilities/colors" as colors;
@use "./utilities/fonts" as fonts;
@use "./components/components" as components;
```

---

## CSS 変数の命名規則

### プレフィックス体系

```
--{component}-{state}-{property}
```

例:

- `--button-bg-color` — ボタンの背景色
- `--button-hover-bg-color` — ボタンのホバー時背景色
- `--form-control-focus-border-color` — 入力欄のフォーカス時ボーダー色

### グローバルカラー変数

テーマ層から必ず上書きが想定される共通変数:

| 変数                      | 用途                               |
| ------------------------- | ---------------------------------- |
| `--text-color`            | 基本テキスト色                     |
| `--text-color-subtle`     | 控えめなテキスト色（ヒント等）     |
| `--text-color-muted`      | ミュートなテキスト色（disabled等） |
| `--text-color-strong`     | 強調テキスト色                     |
| `--surface-color`         | 基本背景色                         |
| `--surface-color-raised`  | 浮き上がった背景色（カード等）     |
| `--surface-color-overlay` | 最上位背景色（ダイアログ等）       |
| `--surface-color-sunken`  | 沈んだ背景色（ホバー等）           |
| `--surface-color-deep`    | 最低位背景色（skeleton等）         |
| `--border-color`          | 基本ボーダー色                     |
| `--border-color-subtle`   | 控えめなボーダー色（無効state等）  |
| `--border-color-strong`   | 強調ボーダー色（フォーカス等）     |

### パレット変数

`generate-palette()` Mixin が生成する変数:

| 変数                                          | 用途                                    |
| --------------------------------------------- | --------------------------------------- |
| `--palette-hue`                               | 色相 (0〜360)                           |
| `--palette-saturation`                        | 彩度                                    |
| `--palette-color-0` 〜 `--palette-color-10`   | 明度段階ごとのカラー値                  |
| `--palette-accent-0` 〜 `--palette-accent-10` | アクセントカラー (テキスト色自動反転用) |
| `--palette-lighter`                           | セマンティックレベル「lighter」のカラー |
| `--palette-light`                             | セマンティックレベル「light」のカラー   |
| `--palette-default`                           | セマンティックレベル「default」のカラー |
| `--palette-dark`                              | セマンティックレベル「dark」のカラー    |
| `--palette-darker`                            | セマンティックレベル「darker」のカラー  |

---

## テーマの適用方法

### HTML 属性

```html
<!-- テーマの適用 -->
<html data-theme="fluent2">
  <!-- カラースキームの適用 -->
  <html data-theme="fluent2" data-color-scheme="light">
    <html data-theme="fluent2" data-color-scheme="dark"></html>
  </html>
</html>
```

### CSS ビルド

各テーマは独立した CSS としてビルドされます:

```sh
npm run build:fluent2   # dist/css/fluent2.css を生成
npm run build:material3 # dist/css/material3.css を生成
npm run build           # 全テーマをビルド
```

---

## 依存関係

```
src/utilities/
  └── (依存なし。Sass 標準モジュールのみ使用)

src/nomad-css-ui/
  └── src/utilities/ に依存

src/themes/<theme>/
  └── src/nomad-css-ui/ に依存（fluent2.scss 等でインポート）
```

テーマは必ず `nomad-css-ui.scss` を `@use` することで、コンポーネントの CSS 変数とデフォルト値が読み込まれます。
