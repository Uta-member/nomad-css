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

数値ステップ（`1`〜）またはtシャツサイズ（`xs` `sm` `md` `lg` `xl`）を使う。セマンティック語は使わない。

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

### ボーダー色

太さ・用途で4段階。

| 段階 | 名前 | 用途例 |
|-----|------|--------|
| 1 | `subtle` | 区切り線、hairline |
| 2 | `default` | 入力欄、カードのボーダー |
| 3 | `strong` | 強調ボーダー |
| 4 | `focus` | フォーカスリング |

```css
--border-subtle
--border-default
--border-strong
--border-focus
```

### フォントサイズ

tシャツサイズで定義する。

```css
--font-size-xs
--font-size-sm
--font-size-md
--font-size-lg
--font-size-xl
--font-size-2xl
--font-size-3xl
```

### フォントウェイト

タイポグラフィ標準の重さ名を使う。

```css
--font-weight-light     /* 300 */
--font-weight-regular   /* 400 */
--font-weight-medium    /* 500 */
--font-weight-semibold  /* 600 */
--font-weight-bold      /* 700 */
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
