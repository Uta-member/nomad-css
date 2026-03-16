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
| `--progressaccent-color` | `var(--palette-default)` | アクセントカラー |
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
| `--table-striped-bg-color`  | `var(--neutral-lighter)`        | 縞模様の背景色       |
| `--table-striped-color`     | `var(--neutral-accent-lighter)` | 縞模様のテキスト色   |
| `--table-hover-bg-color`    | `var(--neutral-lighter)`        | ホバー時背景色       |
| `--table-hover-color`       | `var(--neutral-accent-lighter)` | ホバー時テキスト色   |
| `--table-hover-row-cursor`  | `unset`                         | 行ホバー時カーソル   |
| `--table-hover-cell-cursor` | `unset`                         | セルホバー時カーソル |

---

## カラーシステム (`src/nomad-css-ui/utilities/`)

### HUE カラー (`_hue-colors.scss`)

HSL 色相環に基づく 12 色の HUE 変数を定義します。
各変数は `:root` に定義され、HUE 値 (0〜360) が格納されています。

| 変数           | HUE  | 彩度 |
| -------------- | ---- | ---- |
| `--hue-red`    | 0°   | 100% |
| `--hue-orange` | 30°  | 100% |
| `--hue-yellow` | 50°  | 100% |
| `--hue-lime`   | 90°  | 100% |
| `--hue-green`  | 125° | 100% |
| `--hue-teal`   | 170° | 100% |
| `--hue-cyan`   | 190° | 100% |
| `--hue-blue`   | 220° | 100% |
| `--hue-indigo` | 240° | 100% |
| `--hue-violet` | 270° | 100% |
| `--hue-purple` | 290° | 100% |
| `--hue-pink`   | 330° | 100% |

### セマンティックカラー (`_semantics.scss`)

アプリケーションでよく使われるセマンティックカラーを定義します。
各カラーは HUE 変数を参照し、`generate-palette()` で CSS 変数を生成します。

| 名前        | HUE                  | 彩度 | 用途             |
| ----------- | -------------------- | ---- | ---------------- |
| `primary`   | `--hue-blue` (220°)  | 80%  | メインアクション |
| `secondary` | `--hue-pink` (330°)  | 80%  | サブアクション   |
| `tertiary`  | `--hue-teal` (170°)  | 60%  | 補助カラー       |
| `success`   | `--hue-green` (125°) | 60%  | 成功・完了       |
| `warning`   | `--hue-yellow` (50°) | 80%  | 警告             |
| `danger`    | `--hue-red` (0°)     | 80%  | エラー・危険     |
| `info`      | `--hue-cyan` (190°)  | 80%  | 情報             |
| `neutral`   | `--hue-blue` (220°)  | 5%   | ニュートラル     |

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
--border-color: var(--neutral-default);
--border-color-subtle: var(--neutral-light);
--border-color-strong: var(--neutral-dark);
```
