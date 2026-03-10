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

## `_palette.scss` — パレット生成 Mixin

HSL カラーパレットの CSS 変数を一括生成する `generate-palette()` Mixin を提供します。

### Mixin: `generate-palette($palette)`

指定したパレット定義から、明度段階カラー・アクセントカラー・グレースケール等の CSS 変数を生成します。

#### パラメーター

```scss
@include palette.generate-palette(
  (
    hue: 220,
    // 必須: 色相 (0〜360)
    saturation: 80%,
    // 必須: 彩度
    accent-threshold: 50%,
    // アクセント切り替え輝度（デフォルト: 50%）
    levels: (
        // セマンティックレベル（省略時はデフォルト値）
        "lighter": 2,
        "light": 3,
        "default": 5,
        "dark": 7,
        "darker": 9,
      ),
    lightnesses: (
      // 明度リスト（省略時はデフォルト値）
      0: 97%,
      1: 93%,
      2: 85%,
      3: 75%,
      4: 65%,
      5: 50%,
      6: 42%,
      7: 34%,
      8: 26%,
      9: 18%,
      10: 10%,
    ),
    names: (
      // 変数名のオーバーライド（省略可）
      palette-prefix: "my-palette-",
      palette-hue-var: "--my-palette-hue",
    ),
  )
);
```

#### 生成される CSS 変数

```css
--palette-hue: 220;
--palette-saturation: 80%;
--palette-color-0: hsl(220, 80%, 97%);
/* ... --palette-color-1 〜 --palette-color-10 */
--palette-accent-0: hsl(220, 80%, 10%); /* 暗いアクセント（明るいカラー用） */
/* ... --palette-accent-1 〜 --palette-accent-10 */
--palette-lighter: hsl(220, 80%, 85%); /* levels の lighter = 2 に対応 */
--palette-light: hsl(220, 80%, 75%);
--palette-default: hsl(220, 80%, 50%);
--palette-dark: hsl(220, 80%, 34%);
--palette-darker: hsl(220, 80%, 18%);
--palette-gray-0: hsl(220, 5%, 97%); /* グレースケール */
/* ... */
```

### デフォルト明度レベル (0〜10)

| レベル | 明度             |
| ------ | ---------------- |
| 0      | 97% (最も明るい) |
| 1      | 93%              |
| 2      | 85%              |
| 3      | 75%              |
| 4      | 65%              |
| 5      | 50% (中間)       |
| 6      | 42%              |
| 7      | 34%              |
| 8      | 26%              |
| 9      | 18%              |
| 10     | 10% (最も暗い)   |

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
