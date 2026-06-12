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
