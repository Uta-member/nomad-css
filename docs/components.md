# コンポーネントリファレンス (`src/nomad-css-ui/`)

nomad-css-ui 層のコンポーネントは、CSS 変数によってスタイルが制御され、テーマ層から上書きすることで外観を変更できます。

---

## ボタン (`_button.scss`)

### 使用方法

```html
<!-- ベース -->
<button class="button">Default</button>

<!-- バリエーション -->
<button class="button filled">Filled</button>
<button class="button tonal">Tonal</button>
<button class="button outlined">Outlined</button>
<button class="button text">Text</button>

<!-- サイズ -->
<button class="button sm">Small</button>
<button class="button lg">Large</button>

<!-- 状態 -->
<button class="button filled" disabled>Disabled</button>
```

### 主な CSS 変数

| 変数                         | 用途                                       |
| ---------------------------- | ------------------------------------------ |
| `--button-bg-color`          | 背景色                                     |
| `--button-hover-bg-color`    | ホバー時背景色                             |
| `--button-active-bg-color`   | アクティブ時背景色                         |
| `--button-focus-bg-color`    | フォーカス時背景色                         |
| `--button-disabled-bg-color` | 無効時背景色                               |
| `--button-color`             | テキスト色                                 |
| `--button-border-color`      | ボーダー色                                 |
| `--button-border-radius`     | 角丸                                       |
| `--button-border-width`      | ボーダー幅                                 |
| `--button-box-shadow`        | 影                                         |
| `--button-focus-box-shadow`  | フォーカス時の影                           |
| `--button-padding`           | パディング                                 |
| `--button-font-size`         | フォントサイズ                             |
| `--button-sm-padding`        | sm サイズのパディング                      |
| `--button-lg-padding`        | lg サイズのパディング                      |
| `--button-cursor`            | カーソル (デフォルト: `pointer`)           |
| `--button-disabled-cursor`   | 無効時カーソル (デフォルト: `not-allowed`) |
| `--button-disabled-opacity`  | 無効時の不透明度                           |
| `--button-transition`        | トランジション                             |

---

## テキスト入力 (`_form-control.scss`)

### 使用方法

```html
<!-- ベース -->
<input type="text" class="form-control" placeholder="入力してください" />
<textarea class="form-control">テキスト</textarea>

<!-- バリエーション -->
<input type="text" class="form-control filled" placeholder="Filled" />
<input type="text" class="form-control underline" placeholder="Underline" />

<!-- サイズ -->
<input type="text" class="form-control sm" />
<input type="text" class="form-control lg" />

<!-- 状態 -->
<input type="text" class="form-control" disabled />
<input type="text" class="form-control" readonly />
```

### 主な CSS 変数

| 変数                                     | 用途                       |
| ---------------------------------------- | -------------------------- |
| `--form-control-color`                   | テキスト色                 |
| `--form-control-placeholder-color`       | プレースホルダー色         |
| `--form-control-filled-bg-color`         | filled バリアントの背景色  |
| `--form-control-border-color`            | ボーダー色                 |
| `--form-control-focus-border-color`      | フォーカス時ボーダー色     |
| `--form-control-border-radius`           | 角丸                       |
| `--form-control-border-top-width`        | 上ボーダー幅               |
| `--form-control-border-right-width`      | 右ボーダー幅               |
| `--form-control-border-bottom-width`     | 下ボーダー幅               |
| `--form-control-border-left-width`       | 左ボーダー幅               |
| `--form-control-focus-ring-width`        | フォーカスリング幅         |
| `--form-control-focus-ring-color`        | フォーカスリング色         |
| `--form-control-focus-ring-offset-width` | フォーカスリングオフセット |
| `--form-control-disabled-opacity`        | 無効時の不透明度           |

---

## セレクトボックス (`_select.scss`)

### 使用方法

```html
<!-- ベース -->
<select class="select">
  <option>選択してください</option>
  <option>オプション1</option>
</select>

<!-- バリエーション -->
<select class="select filled">
  ...
</select>
<select class="select underline">
  ...
</select>
```

### 主な CSS 変数

form-control と同様のパターンで、プレフィックスが `--select-` になります。

---

## チェックボックス (`_checkbox.scss`)

### 使用方法

```html
<input type="checkbox" class="checkbox" />
<input type="checkbox" class="checkbox" checked />
<input type="checkbox" class="checkbox" disabled />

<!-- サイズ -->
<input type="checkbox" class="checkbox sm" />
<input type="checkbox" class="checkbox lg" />
```

### 主な CSS 変数

| 変数                                  | 用途                 |
| ------------------------------------- | -------------------- |
| `--checkbox-bg-color`                 | 未チェック時背景色   |
| `--checkbox-checked-bg-color`         | チェック時背景色     |
| `--checkbox-border-color`             | ボーダー色           |
| `--checkbox-checked-border-color`     | チェック時ボーダー色 |
| `--checkbox-border-radius`            | 角丸                 |
| `--checkbox-border-width`             | ボーダー幅           |
| `--checkbox-mark-color`               | チェックマーク色     |
| `--checkbox-mark-image`               | チェックマーク SVG   |
| `--checkbox-indeterminate-mark-image` | 中間状態マーク SVG   |
| `--checkbox-size`                     | サイズ               |
| `--checkbox-sm-size`                  | sm サイズ            |
| `--checkbox-lg-size`                  | lg サイズ            |
| `--checkbox-cursor`                   | カーソル             |
| `--checkbox-disabled-opacity`         | 無効時の不透明度     |

---

## ラジオボタン (`_radio.scss`)

### 使用方法

```html
<input type="radio" class="radio" name="group" />
<input type="radio" class="radio" name="group" checked />
<input type="radio" class="radio" disabled />

<!-- サイズ -->
<input type="radio" class="radio sm" />
<input type="radio" class="radio lg" />
```

### 主な CSS 変数

checkbox と同様のパターンで、プレフィックスが `--radio-` になります。

---

## レンジスライダー (`_range.scss`)

### 使用方法

```html
<input type="range" class="range" min="0" max="100" value="50" />
```

### 主な CSS 変数

| 変数                   | 用途                                   |
| ---------------------- | -------------------------------------- |
| `--range-accent-color` | アクセントカラー（トラック・つまみ色） |

---

## プログレスバー (`_progress.scss`)

### 使用方法

```html
<progress class="progress" value="70" max="100"></progress>

<!-- サイズ -->
<progress class="progress sm" value="70" max="100"></progress>
<progress class="progress md" value="70" max="100"></progress>
<progress class="progress lg" value="70" max="100"></progress>
```

### 主な CSS 変数

| 変数                     | デフォルト               | 用途             |
| ------------------------ | ------------------------ | ---------------- |
| `--progressaccent-color` | `var(--palette-solid)` | アクセントカラー |
| `--progresssm-size`      | `0.75rem`                | sm サイズの高さ  |
| `--progressmd-size`      | `1rem`                   | md サイズの高さ  |
| `--progresslg-size`      | `1.5rem`                 | lg サイズの高さ  |

---

## テーブル (`_table.scss`)

### 使用方法

```html
<!-- ベース -->
<table class="table">
  <thead>
    <tr>
      <th>列1</th>
      <th>列2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>データ1</td>
      <td>データ2</td>
    </tr>
  </tbody>
</table>

<!-- バリエーション（組み合わせ可） -->
<table class="table striped">
  ...
</table>
<table class="table hover">
  ...
</table>
<table class="table row-bordered">
  ...
</table>
<table class="table column-bordered">
  ...
</table>
<table class="table bordered">
  ...
</table>
<!-- row-bordered + column-bordered -->
```

### 主な CSS 変数

| 変数                        | デフォルト                      | 用途                 |
| --------------------------- | ------------------------------- | -------------------- |
| `--table-border-color`      | `var(--border-color)`           | ボーダー色           |
| `--table-border-width`      | `1px`                           | ボーダー幅           |
| `--table-striped-bg-color`  | `var(--neutral-subtle)`        | 縞模様の背景色       |
| `--table-striped-color`     | `var(--neutral-accent-subtle)` | 縞模様のテキスト色   |
| `--table-hover-bg-color`    | `var(--neutral-subtle)`        | ホバー時背景色       |
| `--table-hover-color`       | `var(--neutral-accent-subtle)` | ホバー時テキスト色   |
| `--table-hover-row-cursor`  | `unset`                         | 行ホバー時カーソル   |
| `--table-hover-cell-cursor` | `unset`                         | セルホバー時カーソル |

### レスポンシブ対応

#### 自動適応

小画面（sm 未満、576px 未満）では、セル内の余白がコンパクト値（`--table-cell-padding-x-sm`、`--table-cell-padding-y-sm`）に自動的に切り替わります。

#### レスポンシブラッパークラス

テーブルを包むコンテナに以下のクラスを付与することで、指定ブレークポイント未満で水平スクロールを可能にします:

| クラス                      | 説明                                         |
| --------------------------- | -------------------------------------------- |
| `.table-responsive`         | すべてのビューポートで常に横スクロール可能   |
| `.table-responsive-sm`      | sm 未満（576px 未満）でのみ横スクロール     |
| `.table-responsive-md`      | md 未満（768px 未満）でのみ横スクロール     |
| `.table-responsive-lg`      | lg 未満（992px 未満）でのみ横スクロール     |
| `.table-responsive-xl`      | xl 未満（1200px 未満）でのみ横スクロール    |
| `.table-responsive-xxl`     | xxl 未満（1400px 未満）でのみ横スクロール   |

#### 使用例

```html
<!-- md未満で横スクロール -->
<div class="table-responsive-md">
  <table class="table striped">
    <thead>
      <tr>
        <th>列1</th>
        <th>列2</th>
        <th>列3</th>
        <th>列4</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>データ1</td>
        <td>データ2</td>
        <td>データ3</td>
        <td>データ4</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- 常に横スクロール可能 -->
<div class="table-responsive">
  <table class="table">...</table>
</div>
```

---

## ダイアログ (`_dialog.scss`)

### 使用方法

```html
<!-- HTML5 <dialog> 要素（推奨） -->
<dialog class="dialog">
  <div class="dialog-header">
    <h2>ダイアログタイトル</h2>
  </div>
  <div class="dialog-body">
    本文です。
  </div>
  <div class="dialog-footer">
    <button>キャンセル</button>
    <button>OK</button>
  </div>
</dialog>

<!-- サイズバリエーション -->
<dialog class="dialog sm">...</dialog>
<dialog class="dialog lg">...</dialog>
<dialog class="dialog xl">...</dialog>

<!-- 全画面表示 -->
<dialog class="dialog full">...</dialog>
```

### 主な CSS 変数

| 変数                         | デフォルト                           | 用途                |
| ---------------------------- | ------------------------------------ | ------------------- |
| `--dialog-bg-color`          | `var(--surface-color-overlay)`       | 背景色              |
| `--dialog-color`             | `var(--text-color)`                  | テキスト色          |
| `--dialog-border-color`      | `var(--border-color)`                | ボーダー色          |
| `--dialog-border-radius`     | `0.375rem`                           | 角丸                |
| `--dialog-border-width`      | `var(--border-width)`                | ボーダー幅          |
| `--dialog-max-width`         | `32rem`                              | 最大幅              |
| `--dialog-max-height`        | `calc(100vh - 4rem)`                 | 最大高さ             |
| `--dialog-padding`           | `1rem`                               | パディング          |
| `--dialog-header-padding`    | `0.75rem 1rem`                       | ヘッダーパディング  |
| `--dialog-footer-padding`    | `0.75rem 1rem`                       | フッターパディング  |
| `--dialog-shadow`            | (8px offset shadow)                  | 影                  |
| `--dialog-header-bg-color`   | `var(--surface-color-sunken)`        | ヘッダー背景色      |
| `--dialog-footer-bg-color`   | `var(--surface-color-sunken)`        | フッター背景色      |
| `--dialog-backdrop-color`    | `rgba(0, 0, 0, 0.5)`                 | バックドロップ色    |

### レスポンシブ対応

#### 自動適応

sm 未満（576px 未満）では、ダイアログが画面からはみ出さないよう `max-width` と `max-height` が自動で拡大します:
- `max-width: calc(100vw - 1rem)` 
- `max-height: calc(100vh - 1rem)`

#### ブレークポイント別全画面表示

以下の修飾クラスを使用すると、指定ブレークポイント未満のときのみ `.full` と同じほぼ全画面表示になります:

| クラス              | 説明                                   |
| ------------------- | -------------------------------------- |
| `.full-sm-down`     | sm 未満（576px 未満）で全画面表示      |
| `.full-md-down`     | md 未満（768px 未満）で全画面表示      |
| `.full-lg-down`     | lg 未満（992px 未満）で全画面表示      |
| `.full-xl-down`     | xl 未満（1200px 未満）で全画面表示     |
| `.full-xxl-down`    | xxl 未満（1400px 未満）で全画面表示    |

#### 使用例

```html
<!-- md未満で全画面、md以上で通常表示 -->
<dialog class="dialog full-md-down">
  <div class="dialog-header">
    <h2>モバイル対応ダイアログ</h2>
  </div>
  <div class="dialog-body">
    本文です。
  </div>
</dialog>

<!-- lg未満で全画面 -->
<dialog class="dialog lg full-lg-down">
  <div class="dialog-header">
    <h2>大型ダイアログ</h2>
  </div>
  <div class="dialog-body">
    本文です。
  </div>
</dialog>
```

---

## ページネーション (`_pagination.scss`)

### 使用方法

```html
<ul class="pagination">
  <li class="page-item disabled">
    <a class="page-link" href="#">前へ</a>
  </li>
  <li class="page-item">
    <a class="page-link" href="#">1</a>
  </li>
  <li class="page-item active">
    <a class="page-link" href="#">2</a>
  </li>
  <li class="page-item">
    <a class="page-link" href="#">3</a>
  </li>
  <li class="page-item">
    <a class="page-link" href="#">次へ</a>
  </li>
</ul>

<!-- サイズ -->
<ul class="pagination sm">...</ul>
<ul class="pagination lg">...</ul>
```

### 主な CSS 変数

| 変数                             | デフォルト                           | 用途                   |
| -------------------------------- | ------------------------------------ | ---------------------- |
| `--pagination-bg-color`          | `var(--surface-color-overlay)`       | 背景色                 |
| `--pagination-color`             | `var(--text-color)`                  | テキスト色             |
| `--pagination-border-color`      | `var(--border-color)`                | ボーダー色             |
| `--pagination-hover-bg-color`    | `var(--surface-color-sunken)`        | ホバー背景色           |
| `--pagination-active-bg-color`   | `var(--palette-solid)`               | アクティブ背景色       |
| `--pagination-active-color`      | `var(--palette-solid-accent)`        | アクティブテキスト色   |
| `--pagination-disabled-color`    | `var(--border-color)`                | 無効テキスト色         |
| `--pagination-padding`           | `0.375rem 0.75rem`                   | パディング             |
| `--pagination-font-size`         | `inherit`                            | フォントサイズ         |
| `--pagination-gap`               | `0.25rem`                            | 項目間隔               |
| `--pagination-border-radius`     | `0.25rem`                            | 角丸                   |
| `--pagination-border-width`      | `var(--border-width)`                | ボーダー幅             |

### レスポンシブ対応

sm 未満（576px 未満）では、パディング・ギャップ・フォントサイズが自動でコンパクト化されます:
- `--pagination-padding`: `0.25rem 0.5rem`
- `--pagination-gap`: `0.125rem`
- `--pagination-font-size`: `0.875em`

これにより、小画面でのスペース効率が向上します。

---

## パンくずリスト (`_breadcrumb.scss`)

### 使用方法

```html
<ul class="breadcrumb">
  <li class="breadcrumb-item">
    <a href="/">ホーム</a>
  </li>
  <li class="breadcrumb-item">
    <a href="/category">カテゴリ</a>
  </li>
  <li class="breadcrumb-item active">
    現在のページ
  </li>
</ul>
```

### 主な CSS 変数

| 変数                         | デフォルト                        | 用途               |
| ---------------------------- | --------------------------------- | ------------------ |
| `--breadcrumb-color`         | `var(--palette-solid)`            | リンク色           |
| `--breadcrumb-hover-color`   | `var(--palette-strong)`           | リンクホバー色     |
| `--breadcrumb-active-color`  | `var(--text-color-subtle)`        | アクティブ色       |
| `--breadcrumb-separator`     | `"/"`                             | セパレータ文字     |
| `--breadcrumb-separator-color` | `var(--text-color-subtle)`      | セパレータ色       |
| `--breadcrumb-gap`           | `0.5rem`                          | 項目間隔           |
| `--breadcrumb-font-size`     | `inherit`                         | フォントサイズ     |

### レスポンシブ対応

sm 未満（576px 未満）では、項目が折り返さず横スクロールになります。項目自体は縮小されず、スクロール内で正常なサイズを保ちます:

```scss
// sm未満でのスタイル
.breadcrumb {
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.breadcrumb-item {
  flex-shrink: 0;
  white-space: nowrap;
}
```

これにより、タッチデバイスでもスムーズにスクロール可能な操作感が実現されます。

---

## カラーシステム (`src/nomad-css-ui/utilities/`)

### 名前付きスケール (`src/utilities/_color-scales.scss`)

OKLCH で知覚的に調整された 21 ファミリー × 12 段階のスケールが
`--{family}-{1..12}`（例: `--blue-7`）として `:root` に具体値で展開されます。

- 有彩色 (17): `red` `orange` `amber` `yellow` `lime` `green` `emerald` `teal` `cyan` `sky` `blue` `indigo` `violet` `purple` `fuchsia` `pink` `rose`
- 無彩色 (4): `slate`（寒色）`gray`（青み）`zinc`（中立）`stone`（暖色）

### セマンティックロール (`_semantics.scss`)

各ロールは名前付きスケールへの参照（`--{role}-{level}`）としてビルド時に解決されます。

| 名前        | デフォルトのスケール | 用途             |
| ----------- | -------------------- | ---------------- |
| `primary`   | `blue`               | メインアクション |
| `secondary` | `pink`               | サブアクション   |
| `tertiary`  | `teal`               | 補助カラー       |
| `success`   | `green`              | 成功・完了       |
| `warning`   | `amber`              | 警告             |
| `danger`    | `red`                | エラー・危険     |
| `info`      | `cyan`               | 情報             |
| `neutral`   | `slate`              | ニュートラル     |

### 共通カラー変数 (`_color-defines.scss`)

テーマ層から必ず上書きが想定される共通カラー変数です。
デフォルト値はライトモードを想定した値になっています。

```css
/* テキストカラー */
--text-color: #1f1f1f;
--text-color-subtle: #3f3f3f;
--text-color-strong: #000000;

/* サーフェスカラー */
--surface-color: #f0f0f0;
--surface-color-raised: #f5f5f5;
--surface-color-overlay: #ffffff;
--surface-color-sunken: #e5e5e5;
--surface-color-deep: #d9d9d9;

/* ボーダーカラー（neutral パレットから自動生成） */
--border-color: var(--neutral-solid);
--border-color-subtle: var(--neutral-tonal);
--border-color-strong: var(--neutral-strong);
```
