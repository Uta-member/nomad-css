# Nomad CSS コンポーネント利用ガイド

## はじめに
Nomad CSSはCSS変数ベースでカスタマイズ可能なコンポーネントライブラリです。
使用するには、ベースとなるCSSを読み込み、`<html>` タグ等で `data-theme` 属性を指定します。

```html
<!DOCTYPE html>
<html lang="ja" data-theme="fluent2"> <!-- or "material3" -->
<head>
    <link rel="stylesheet" href="dist/nomad.css">
</head>
<body>
    ...
</body>
</html>
```

---

## Button (ボタン)

### 基本的な使い方
`.button` クラスを使用します。

```html
<button class="button">Default Button</button>
```

### バリエーション (Variant)
用途に合わせてスタイルを切り替えます。スタイルは `_contract.scss` で一元管理されています。

| クラス名 | 説明 |
| --- | --- |
| `.filled` | 背景色付き（標準）。アクションを強調する場合に使用。 |
| `.tonal` | 薄い背景色。優先度の低いアクションに使用。 |
| `.outlined` |枠線のみ。補助的なアクションに使用。 |
| `.text` | テキストのみ。控えめなアクションに使用。 |

```html
<button class="button filled">Filled</button>
<button class="button tonal">Tonal</button>
<button class="button outlined">Outlined</button>
<button class="button text">Text</button>
```

### サイズ
テーマによって実際のサイズ値は異なりますが、相対的な大小を指定できます。

```html
<button class="button button-sm">Small</button>
<button class="button">Default</button>
<button class="button button-lg">Large</button>
```

### アイコン
アイコンのみのボタンを作成する場合は `.icon-only` を追加します。正方形のアスペクト比が維持されます。

```html
<button class="button icon-only">
    <span class="icon">★</span>
</button>
```

---

## Input (入力フォーム)

### 基本的な使い方
`.input` クラスを使用します。

```html
<input type="text" class="input" placeholder="Type here...">
```

### Textarea
`<textarea>` にも同じ `.input` クラスを使用します。

```html
<textarea class="input" placeholder="Type details..."></textarea>
```

### バリエーション
Material Design風の下線スタイルなどを利用できます。

```html
<!-- 全面塗りつぶし/枠線なし背景あり -->
<input type="text" class="input input-filled" placeholder="Filled">

<!-- 下線のみ -->
<input type="text" class="input input-underline" placeholder="Underline">

<!-- 枠線なし -->
<input type="text" class="input input-borderless" placeholder="Borderless">
```

### サイズ

```html
<input type="text" class="input input-sm" placeholder="Small">
<input type="text" class="input input-lg" placeholder="Large">
```

---

## Select (セレクトボックス)

ネイティブの `<select>` 要素をスタイリングします。
※ ブラウザの仕様上、ドロップダウンリスト（`<option>`部分）のスタイル制御には限界があります。

### 基本的な使い方
`.select` クラスを使用します。

```html
<select class="select">
    <option>Option 1</option>
    <option>Option 2</option>
</select>
```

### バリエーション & サイズ
Inputコンポーネントと同様のクラスが使用可能です。

```html
<select class="select select-filled">...</select>
<select class="select select-underline">...</select>
<select class="select select-sm">...</select>
```

---

## 入力グループ (Input Group)

アイコンやテキストを入力欄と一体化させて表示します。

```html
<!-- テキストアドオン -->
<div class="input-group">
    <span class="input-addon">https://</span>
    <input type="text" class="input" placeholder="example.com">
</div>

<!-- アイコン付き入力 -->
<div class="input-icon">
    <span class="input-icon-left">🔍</span>
    <input type="text" class="input" placeholder="Search...">
</div>
```

---

## テーマのカスタマイズ

各テーマ（Fluent2 / Material3）はCSS定義済みですが、CSS変数を上書きすることで部分的なカスタマイズが可能です。

```css
/* 例: Fluent2テーマのプライマリカラーを赤に変更 */
:root[data-theme="fluent2"] {
    --primary-h: 0; /* Red Hue */
    --primary-s: 80%;
}
---

## **Components 実装ガイド**

- **目的**: コンポーネント層は構造とレイアウト、及び最小限の公開CSS変数（サイズ・色・トランジション等）を提供します。セマンティックカラーやサイズバリアントはテーマ層で定義してください。

- **共通構造**:
    - 各コンポーネントはSCSSで `$<name>-prefix` と `$<name>-class-name` を持ちます（例: `$select-prefix`, `$select-class-name`）。
    - CSSカスタムプロパティは直接散らさず、`$<component>-<prop>-var` をラップして使います。参照は `var(#{$<component>-<prop>-var})`。実例: [src/components/_select.scss](src/components/_select.scss)。
    - デフォルト値はグローバル `:root` ではなく `.#{$<component>-class-name}` の中に置きます。テーマは `:root[data-theme="..."]` で上書きします。

- **命名規約（推奨）**:
    - プレフィックス: `$<component>-prefix: "<prefix>-"`。
    - クラス名: `$<component>-class-name: "<name>"`。
    - CSS変数ラッパー: `$<component>-<prop>-var: --#{$<component>-prefix}<prop>`。

- **状態・擬似要素の扱い**:
    - `:hover`, `:active`, `:focus`, `:disabled` 等はコンポーネント内でCSS変数を参照して記述し、実際の色/サイズはテーマで設定します。
    - ブラウザ差異のための擬似要素（例: `::-webkit-slider-thumb`）はそのまま維持し、色/サイズのみ変数参照化してください（例: [src/components/_range.scss](src/components/_range.scss)）。

- **実装手順（新コンポーネント追加）**:
    1. `src/components/_newcomponent.scss` を作成。
    2. `$new-prefix` と `$new-class-name` を定義。
    3. 必要な `$new-*-var` を列挙し、`.#{$new-class-name}` にデフォルトを置く。
    4. スタイル中は `var(#{$new-*-var})` を使用する（直接ハードコードしない）。
    5. サイズ/semantic/validation ロジックはコアに入れずテーマ/アプリ層で実装すること。

- **既存コンポーネントの参照例**:
    - Select: [src/components/_select.scss](src/components/_select.scss)
    - Range: [src/components/_range.scss](src/components/_range.scss)
    - Progress / Input: `src/components/_progress.scss`, `src/components/_input.scss`

- **テスト / ビルドの確認**:
    - Sass をビルドして（`npm run build` 等）スタイルがコンパイルされることを確認してください。
    - ブラウザで主要コントロールの見た目・キーボード操作を検証してください。

- **次の推奨作業**:
    - 各テーマ（`fluent2`, `material3`）へサイズ（sm/lg等）とセマンティック色の具体値を追加する。
    - コンポーネント単位のアクセシビリティチェックリストを整備する（キーボード操作、フォーカス、コントラストなど）。

(注) このガイドはコア方針に合わせて随時更新してください。
```
