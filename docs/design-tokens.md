# デザイントークン設計

nomad-css のトークン体系の設計方針と命名規則。

---

## トークンの2分類

| 分類 | 説明 | 命名方針 |
|------|------|---------|
| **次元トークン** (dimensional) | 値が大きいほど「大きい・強い」線形スケール | 数値 or tシャツサイズ |
| **役割トークン** (role-based) | 使用目的・強調度を表す | 用途語 |

---

## プリミティブ層（参照トークン）

### 色: 12段階 (1〜12)

各セマンティックカラーに共通して生成されるステップ。数値は強調度・輝度の相対的な位置を示す。

```
1  → 最も淡い（背景tint用）
...
6  → 中間（ボーダー寄り）
...
12 → 最も濃い（テキスト用）
```

デフォルト明度のマッピング例（ライトモード基準）：

| ステップ | 明度 |
|---------|------|
| 1 | 99% |
| 2 | 97% |
| 3 | 93% |
| 4 | 85% |
| 5 | 75% |
| 6 | 65% |
| 7 | 50% |
| 8 | 42% |
| 9 | 34% |
| 10 | 26% |
| 11 | 18% |
| 12 | 10% |

外部から `lightnesses` マップを渡すことでステップ数・明度値ともにカスタマイズ可能。

### フォントサイズ・スペーシング等

**数値ステップ**（`0`〜）の線形スケールで定義する。tシャツサイズ（`xs` `md` 等）やセマンティック語は参照層では使わない。

理由は2つ:

- **拡張性** — 数値ステップは途中への追加・挿入や段数変更が容易（色の 1〜12 と同じ考え方）。最初に `xs`〜`xl` のような固定語彙を付けると段階を増やしにくい。
- **ブレークポイント名との衝突回避** — ブレークポイントは `xs` `sm` `md` `lg` `xl` `xxl`（[_breakpoints.scss](../src/utilities/_breakpoints.scss)）。参照層に同じtシャツ語を使うと、将来 `responsive-utilities` でレスポンシブクラスを生成したとき `.fs-md-md` のような曖昧な名前になる。数値ステップなら `.fs-md-3`（md以上で3）と一意に読める。

tシャツサイズ・重さ名といった語彙は、これらの数値ステップを参照する**セマンティック層**で付与する。

---

## セマンティック層（役割トークン）

役割トークンはカテゴリごとに独立した語彙を持つ。ただし `subtle` / `default` / `strong` は複数カテゴリで共通して登場し、一貫して「最低強調 / 標準 / 最高強調」を意味する。

### パレット色（primary, danger 等）

視覚的重みで5段階。ライト/ダークモードで**値は変わるが名前の意味は変わらない**。

| 段階 | 名前 | 用途例 | 参照ステップ目安 |
|-----|------|--------|----------------|
| 1 | `subtle` | 背景のうっすらしたtint、ghostのhover背景 | 2〜3 |
| 2 | `tonal` | トーナルボタン背景、チップ背景 | 3〜4 |
| 3 | `solid` | 塗りボタン、バッジ（メインfill） | 6〜7 |
| 4 | `strong` | solidのhover状態、強調ボーダー | 7〜8 |
| 5 | `heavy` | active/press状態、最大強調 | 9〜10 |

```css
--primary-subtle
--primary-tonal
--primary-solid
--primary-strong
--primary-heavy
```

### サーフェス（背景・レイヤー）

積み重なる層の深さで4段階。

| 段階 | 名前 | 用途例 |
|-----|------|--------|
| 1 | `base` | ページの基本背景 |
| 2 | `raised` | カード、パネル |
| 3 | `elevated` | ドロップダウン、ツールチップ |
| 4 | `overlay` | モーダルの背景幕、フルオーバーレイ |

```css
--surface-base
--surface-raised
--surface-elevated
--surface-overlay
```

### テキスト色

強調度で4段階。

| 段階 | 名前 | 用途例 |
|-----|------|--------|
| 1 | `default` | 本文テキスト |
| 2 | `muted` | 補助テキスト、ラベル |
| 3 | `subtle` | ヒント、キャプション、プレースホルダー |
| 4 | `disabled` | 無効状態のテキスト |

```css
--text-default
--text-muted
--text-subtle
--text-disabled
```

### ボーダー幅・角丸（次元トークン）

幅・角丸は**数値ステップ**のプリミティブスケールで定義し、CSS変数として公開する（[_border.scss](../src/utilities/_border.scss)）。フォントサイズと同じく、参照層ではtシャツ名を使わない。

```css
/* プリミティブ層（数値スケール） */
--border-width-0 〜 --border-width-5      /* 0, 1px, 2px, 3px, 4px, 5px */
--border-radius-0 〜 --border-radius-5    /* 0, 4px, 8px, 12px, 16px, 20px */

/* 構造的な既定値 */
--border-width   /* → --border-width-1（既定の枠線幅） */
--border-style   /* solid */
```

角丸はセマンティック層でtシャツ名に**マッピング**する（[nomad-css-ui/utilities/_border.scss](../src/nomad-css-ui/utilities/_border.scss)）。クラスは `.rounded-md` 等。幅はセマンティック名を設けず、数値スケール＋`--border-width` の既定値で運用する。

```css
/* セマンティック層（プリミティブの数値ステップを参照） */
--radius-semantic-sm   /* → --border-radius-1 */
--radius-semantic-md   /* → --border-radius-2 */
--radius-semantic-lg   /* → --border-radius-3 */
--radius-semantic-xl   /* → --border-radius-4 */
```

### ボーダー色

ボーダー色は**色のセマンティックトークン**であり、neutral パレットを参照して色層（[nomad-css-ui/utilities/_color-defines.scss](../src/nomad-css-ui/utilities/_color-defines.scss)）で定義する。値はテーマが上書きする（[CLAUDE.md](../CLAUDE.md) のグローバル変数 `--border-color` とその派生に対応）。

| 名前 | 用途例 | 既定の参照先 |
|------|--------|------------|
| `--border-color-subtle` | 区切り線、hairline | `--neutral-lighter` |
| `--border-color` | 入力欄・カードのボーダー（標準） | `--neutral-light` |
| `--border-color-strong` | 強調ボーダー | `--neutral-dark` |

```css
--border-color
--border-color-subtle
--border-color-strong
```

> 注: 参照層 [_border.scss](../src/utilities/_border.scss) は色値を持たない。`.border` 系クラスは `--border-color` を参照するだけで、その値は色層が neutral パレットから供給する。

### フォントサイズ

プリミティブの数値ステップ（`--font-size-0`〜`--font-size-10`）を、tシャツサイズの**セマンティック変数** `--fs-semantic-*` にマッピングする。コンポーネントやユーザーは原則 `--fs-semantic-*` を参照する。

```css
/* セマンティック層（プリミティブの数値ステップを参照） */
--fs-semantic-xs   /* → --font-size-2 */
--fs-semantic-sm   /* → --font-size-4 */
--fs-semantic-md   /* → --font-size-5（本文の基準） */
--fs-semantic-lg   /* → --font-size-6 */
--fs-semantic-xl   /* → --font-size-7 */
--fs-semantic-2xl  /* → --font-size-9 */
--fs-semantic-3xl  /* → --font-size-10 */
```

クラスは `.fs-semantic-md` のように生成される。ユーティリティの数値クラス `.fs-3` 等はプリミティブ層が別途提供する（こちらはレスポンシブ化に向く）。

### フォントウェイト

プリミティブの数値ステップ（`--font-weight-100`〜`--font-weight-900`）を、タイポグラフィ標準の重さ名の**セマンティック変数** `--fw-semantic-*` にマッピングする。

```css
/* セマンティック層 */
--fw-semantic-light     /* → --font-weight-300 */
--fw-semantic-regular   /* → --font-weight-400 */
--fw-semantic-medium    /* → --font-weight-500 */
--fw-semantic-semibold  /* → --font-weight-600 */
--fw-semantic-bold      /* → --font-weight-700 */
```

---

## ライト/ダークモードの考え方

名前は変えず、カラースキームごとに**値だけを上書き**する。

```scss
// ライトモード
:root[data-color-scheme="light"] {
  --primary-subtle: var(--primary-color-2);  // 97% → 明るいtint
  --surface-base:   var(--neutral-color-1);  // 99% → 白に近い背景
  --text-default:   var(--neutral-color-12); // 10% → 濃いテキスト
}

// ダークモード
:root[data-color-scheme="dark"] {
  --primary-subtle: var(--primary-color-9);  // 34% → 暗いtint
  --surface-base:   var(--neutral-color-12); // 10% → 暗い背景
  --text-default:   var(--neutral-color-1);  // 99% → 白に近いテキスト
}
```

`subtle` はどちらのモードでも「最も控えめな使い方」を意味し続ける。

---

## 変数命名規則との対応

[CLAUDE.md](../CLAUDE.md) の命名規則 `--{component}-{state}-{property}` と組み合わせる場合：

```css
/* コンポーネント変数はセマンティックトークンを参照する */
--button-bg-color:        var(--primary-solid);
--button-hover-bg-color:  var(--primary-strong);
--button-border-color:    var(--border-default);
--button-text-color:      var(--text-default);
```
