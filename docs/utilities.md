# ユーティリティリファレンス (`src/utilities/`)

ユーティリティ層はテーマや特定のフレームワークに依存しない、汎用的な CSS パーツ群です。
各ファイルは Sass モジュールとして提供され、`@use` で個別にインポートできます。

---

## `_prefixes.scss` — グローバルプレフィックス

CSS 変数のグローバルプレフィックスを定義します。

```scss
@use "src/utilities/prefixes" as prefixes;

$prefix: "" !default; // デフォルトはプレフィックスなし
```

プレフィックスを変更することで、他ライブラリとの変数名衝突を回避できます。

---

## `_color-scales.scss` / `_palette.scss` — カラースケール生成

カラースケール（12段階ランプ）をビルド時に生成する基盤です。

- `_color-scales.scss` — 21ファミリー × 12段階の OKLCH チャンネル値（生データ）。
  Tailwind CSS v4 のパレット（MIT License）に基づく。
- `_palette.scss` — スケールの生成・変換・出力を行う関数と Mixin。

設計・調整は知覚的に均一な OKLCH で行い、**出力は rgb() の具体値のみ**です。
ランタイムの CSS には OKLCH も計算式も含まれないため、カスタムプロパティが
動くブラウザならどこでも動作します。

### 関数

| 関数                          | 説明                                                                |
| ----------------------------- | ------------------------------------------------------------------- |
| `families()`                  | 定義済みファミリー名のリストを返す                                  |
| `scale($name)`                | 名前付きスケールの OKLCH トリプル12個を返す（12段目は外挿で生成）   |
| `make-scale($color)`          | 任意の色から12段階スケールを生成（明度・彩度カーブは参照スケール由来） |
| `step-color($triple)`         | OKLCH トリプルを sRGB 具体値へ変換（色域マッピング込み）            |
| `step-accent-var($triple)`    | ステップの明度に応じた accent 変数参照を返す                        |

### Mixin

| Mixin                                       | 出力                                                       |
| ------------------------------------------- | ----------------------------------------------------------- |
| `emit-scale($name, $scale)`                 | `--{name}-1` 〜 `--{name}-12`（フラットな具体値）           |
| `emit-all-scales()`                         | 全21ファミリーのスケール                                    |
| `emit-levels($prefix, $scale-name, ...)`    | `--{prefix}{level}` + `--{prefix}accent-{level}` トークン   |
| `emit-palette-ref($prefix)`                 | `--palette-{level}` をトークン群への参照として出力          |

### 使用例（ブランドカラーからのスケール生成）

```scss
@use "src/utilities/palette" as palette;

$brand: palette.make-scale(#0078d4);

:root {
  @include palette.emit-scale("brand", $brand);
  @include palette.emit-levels(
    primary-,
    "brand",
    $levels: (subtle: 2, tonal: 3, solid: 7, strong: 8, heavy: 9),
    $scale: $brand
  );
}
```

### デフォルトのレベル対応

| レベル | ステップ | 用途の目安                     |
| ------ | -------- | ------------------------------ |
| subtle | 2        | 淡い背景（tonal ボタンの bg）  |
| tonal  | 3        | 淡い背景のホバー               |
| solid  | 7        | 主たる色（filled ボタンの bg） |
| strong | 8        | solid のホバー                 |
| heavy  | 9        | solid のアクティブ             |

---

## `_breakpoints.scss` — レスポンシブ Mixin

レスポンシブデザイン用のブレークポイント Mixin を提供します。

### ブレークポイント定義

| 名前  | 幅     |
| ----- | ------ |
| `xs`  | 0px    |
| `sm`  | 576px  |
| `md`  | 768px  |
| `lg`  | 992px  |
| `xl`  | 1200px |
| `xxl` | 1400px |

### Mixin 一覧

#### `media-up($breakpoint)` — min-width（モバイルファースト）

```scss
@use "src/utilities/breakpoints" as bp;

@include bp.media-up("md") {
  .element {
    display: flex;
  }
}
// => @media (min-width: 768px) { ... }
```

#### `media-down($breakpoint)` — max-width

```scss
@include bp.media-down("md") {
  .element {
    display: none;
  }
}
// => @media (max-width: 767.98px) { ... }
```

#### `media-between($lower, $upper)` — 範囲指定

```scss
@include bp.media-between("sm", "lg") {
  .element {
    padding: 1rem;
  }
}
// => @media (min-width: 576px) and (max-width: 991.98px) { ... }
```

#### `media-only($breakpoint)` — 特定ブレークポイントのみ

```scss
@include bp.media-only("md") {
  .element {
    font-size: 1rem;
  }
}
// => @media (min-width: 768px) and (max-width: 991.98px) { ... }
```

---

## `_border.scss` — ボーダーユーティリティ

ボーダーの適用・除去・角丸のユーティリティクラスを提供します。

### ボーダー適用

| クラス           | 効果                 |
| ---------------- | -------------------- |
| `.border`        | 全辺にボーダーを適用 |
| `.border-top`    | 上辺のみ             |
| `.border-bottom` | 下辺のみ             |
| `.border-start`  | 左辺のみ             |
| `.border-end`    | 右辺のみ             |

### ボーダー除去

| クラス             | 効果                 |
| ------------------ | -------------------- |
| `.border-top-0`    | 上辺のボーダーを除去 |
| `.border-bottom-0` | 下辺のボーダーを除去 |
| `.border-start-0`  | 左辺のボーダーを除去 |
| `.border-end-0`    | 右辺のボーダーを除去 |

### 角丸

| クラス              | 効果             |
| ------------------- | ---------------- |
| `.rounded`          | 角丸 (4px)       |
| `.rounded-circle`   | 円形 (50%)       |
| `.rounded-pill`     | ピル形 (50rem)   |
| `.rounded-top-0`    | 上部の角丸を除去 |
| `.rounded-bottom-0` | 下部の角丸を除去 |
| `.rounded-start-0`  | 左側の角丸を除去 |
| `.rounded-end-0`    | 右側の角丸を除去 |

### CSS 変数

`.border` クラス内で以下の変数が定義されます:

| 変数             | デフォルト |
| ---------------- | ---------- |
| `--border-width` | `1px`      |
| `--border-style` | `solid`    |
| `--border-color` | `gray`     |

---

## `_container.scss` — レイアウトユーティリティ

Display・Flex・Grid・幅・高さのユーティリティクラスを提供します。

### Display

| クラス            | 効果                    |
| ----------------- | ----------------------- |
| `.d-none`         | `display: none`         |
| `.d-inline`       | `display: inline`       |
| `.d-inline-block` | `display: inline-block` |
| `.d-block`        | `display: block`        |
| `.d-flex`         | `display: flex`         |
| `.d-inline-flex`  | `display: inline-flex`  |
| `.d-grid`         | `display: grid`         |
| `.d-inline-grid`  | `display: inline-grid`  |
| `.d-table`        | `display: table`        |
| `.d-table-cell`   | `display: table-cell`   |
| `.d-table-row`    | `display: table-row`    |

### Flex Direction

| クラス                 | 効果                             |
| ---------------------- | -------------------------------- |
| `.flex-row`            | `flex-direction: row`            |
| `.flex-row-reverse`    | `flex-direction: row-reverse`    |
| `.flex-column`         | `flex-direction: column`         |
| `.flex-column-reverse` | `flex-direction: column-reverse` |

### Flex Wrap

| クラス               | 効果                      |
| -------------------- | ------------------------- |
| `.flex-wrap`         | `flex-wrap: wrap`         |
| `.flex-wrap-reverse` | `flex-wrap: wrap-reverse` |
| `.flex-nowrap`       | `flex-wrap: nowrap`       |

### Justify Content

| クラス             | 効果                             |
| ------------------ | -------------------------------- |
| `.justify-start`   | `justify-content: flex-start`    |
| `.justify-end`     | `justify-content: flex-end`      |
| `.justify-center`  | `justify-content: center`        |
| `.justify-between` | `justify-content: space-between` |
| `.justify-around`  | `justify-content: space-around`  |
| `.justify-evenly`  | `justify-content: space-evenly`  |

### Align Items

| クラス                  | 効果                      |
| ----------------------- | ------------------------- |
| `.align-items-start`    | `align-items: flex-start` |
| `.align-items-end`      | `align-items: flex-end`   |
| `.align-items-center`   | `align-items: center`     |
| `.align-items-baseline` | `align-items: baseline`   |
| `.align-items-stretch`  | `align-items: stretch`    |

### 幅・高さ

| クラス              | 効果                       |
| ------------------- | -------------------------- |
| `.w-25`             | `width: 25%`               |
| `.w-50`             | `width: 50%`               |
| `.w-75`             | `width: 75%`               |
| `.w-100`            | `width: 100%`              |
| `.w-auto`           | `width: auto`              |
| `.mw-100`           | `max-width: 100%`          |
| `.vw-100`           | `width: 100vw`             |
| `.h-25` 〜 `.h-100` | 高さ (25%, 50%, 75%, 100%) |
| `.h-auto`           | `height: auto`             |
| `.mh-100`           | `max-height: 100%`         |
| `.vh-100`           | `height: 100vh`            |

---

## `_fonts.scss` — フォントユーティリティ

見出し要素のフォントサイズ・ウェイトを CSS 変数で管理します。

### CSS 変数 (`:root` に定義)

| 変数                                     | デフォルト値 |
| ---------------------------------------- | ------------ |
| `--font-h1-size`                         | `2.5rem`     |
| `--font-h2-size`                         | `2rem`       |
| `--font-h3-size`                         | `1.75rem`    |
| `--font-h4-size`                         | `1.5rem`     |
| `--font-h5-size`                         | `1.25rem`    |
| `--font-h6-size`                         | `1rem`       |
| `--font-h1-weight` 〜 `--font-h6-weight` | `500`        |

### クラス

`h1`〜`h6` 要素および `.h1`〜`.h6` クラスには上記変数が自動適用されます。

```html
<h1>見出し1</h1>
<p class="h2">h2と同等のサイズ</p>
```

---

## レスポンシブ・ブレークポイント

レスポンシブデザインに用いるブレークポイントと、対応するユーティリティクラスの命名規則について説明します。

### ブレークポイント定義

モバイルファースト設計に基づき、以下のブレークポイントが定義されています（すべて `min-width` 基準）:

| 名前  | 幅      | 説明                   |
| ----- | ------- | ---------------------- |
| `xs`  | 0px     | ベース（接尾辞なし）   |
| `sm`  | 576px   | 小型デバイス           |
| `md`  | 768px   | タブレット             |
| `lg`  | 992px   | 小型デスクトップ       |
| `xl`  | 1200px  | デスクトップ           |
| `xxl` | 1400px  | 大型デスクトップ       |

### レスポンシブ変種クラスの命名規則

ユーティリティクラスにレスポンシブ対応が実装されている場合、ブレークポイント接尾辞を使用できます。
接尾辞はクラス名のキーの直前に挿入されます（Bootstrap 風）:

```
ベース:         .{class}
レスポンシブ:   .{class}-{bp}-{key}
```

例:
- `.d-flex` → `.d-md-flex`（md 以上で `display: flex`）
- `.mt-3` → `.mt-md-3`（md 以上でマージン上部）
- `.text-center` → `.text-md-center`（md 以上でテキスト中央揃え）
- `.fs-5` → `.fs-md-5`（md 以上でフォントサイズ）

### レスポンシブ変種を持つユーティリティ

以下のユーティリティクラスでレスポンシブ変種が利用可能です:

**Display** (`_container.scss`):
- `.d-{bp}-{none|inline|inline-block|block|grid|inline-grid|table|table-cell|table-row|flex|inline-flex}`

**Flex Direction**:
- `.flex-{bp}-{row|row-reverse|column|column-reverse}`

**Flex Wrap**:
- `.flex-{bp}-{nowrap|wrap|wrap-reverse}`
- `.flex-{bp}-fill`

**Justify Content**:
- `.justify-{bp}-{start|end|center|between|around|evenly}`

**Align Items**:
- `.align-items-{bp}-{start|end|center|baseline|stretch}`

**Align Self**:
- `.align-self-{bp}-{start|end|center|baseline|stretch}`

**Align Content**:
- `.align-content-{bp}-{start|end|center|between|around|stretch}`

**Margin** (`_spacing.scss`):
- `.m{|t|r|b|l|x|y}-{bp}-{0..5}`

**Padding**:
- `.p{|t|r|b|l|x|y}-{bp}-{0..5}`

**Gap**:
- `.gap{|x|y}-{bp}-{0..5}`

**Text Align**:
- `.text-{bp}-{start|end|center|justify}`

**Font Size**:
- `.fs-{bp}-{key}`（フォントサイズスケールの全キー）

### 使用例

```html
<!-- モバイルで縦積み、md以上で横並び -->
<div class="d-flex flex-column flex-md-row gap-2 gap-md-4">
  <div class="flex-md-fill">Item 1</div>
  <div class="flex-md-fill">Item 2</div>
</div>

<!-- マージン: モバイルで小さく、lg以上で大きく -->
<section class="mt-2 mt-lg-4 mb-2 mb-lg-4">
  Content
</section>

<!-- テキスト配置: sm未満では開始、md以上では中央 -->
<p class="text-start text-md-center">Responsive text alignment</p>
```

### レスポンシブ変種を持たないユーティリティ

以下のユーティリティはブレークポイント対応していません（すべてのデバイスで共通）:
- ボーダー (`border`, `border-top-0` 等)
- 角丸 (`rounded`, `rounded-circle` 等)
- シャドウ (`shadow` 等)
- フォントウェイト (`fw-*`)
- テキスト変換 (`text-transform` 関連)

### Sass での直接利用

Sass を直接使う場合、`@use` で breakpoints モジュールをインポートしてメディアクエリ Mixin を利用できます:

```scss
@use "src/utilities/breakpoints" as bp;

.my-element {
  padding: 0.5rem;

  @include bp.media-up("lg") {
    padding: 1.5rem;
  }

  @include bp.media-down("sm") {
    display: none;
  }

  @include bp.media-between("md", "xl") {
    padding: 1rem;
  }

  @include bp.media-only("md") {
    font-size: 1.25rem;
  }
}
```
