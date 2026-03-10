# nomad-css コンポーネント実装 TODO

HTML標準コンポーネント（button / checkbox / radio / range / progress / form-control / select / table）の実装完了後に追加するコンポーネントの一覧です。

**方針:** 純粋CSSのみで動作するコンポーネントを優先する。JS が必要な挙動（ドロップダウン開閉など）は CSS 変数・構造の定義のみ行い、JS 実装は別途対応とする。

---

## 実装状況

| ステータス  | バッジ |
| ----------- | ------ |
| TODO        | ☐      |
| In Progress | 🔄     |
| Done        | ✅     |

---

## フィードバック・ステータス表示

### ☐ Alert （優先度: High）

成功・警告・エラー・情報を伝えるメッセージバナー。

**HTML構造:**

```html
<!-- バリエーション -->
<div class="alert">Default alert</div>
<div class="alert success">Success!</div>
<div class="alert warning">Warning!</div>
<div class="alert danger">Something went wrong.</div>
<div class="alert info">FYI...</div>

<!-- タイトル付き -->
<div class="alert success">
  <strong class="alert-title">Success</strong>
  <span class="alert-body">操作が完了しました。</span>
</div>

<!-- アイコン付き（アイコンは別途用意） -->
<div class="alert danger">
  <span class="alert-icon">⚠</span>
  <span>エラーが発生しました。</span>
</div>

<!-- Outlined バリエーション -->
<div class="alert outlined success">Outlined Success</div>
```

**実装クラス:**

- `.alert` — ベース
- `.alert.success` / `.warning` / `.danger` / `.info` — セマンティックカラー
- `.alert.outlined` — ボーダーのみ（背景透明）バリエーション
- `.alert-title` — タイトル要素
- `.alert-body` — 本文要素
- `.alert-icon` — アイコン配置用

**nomad-css-ui層で定義するCSS変数:**
| 変数 | 用途 |
|---|---|
| `--alert-bg-color` | 背景色 |
| `--alert-color` | テキスト色 |
| `--alert-border-color` | ボーダー色 |
| `--alert-border-width` | ボーダー幅 |
| `--alert-border-radius` | 角丸 |
| `--alert-padding` | パディング |
| `--alert-icon-size` | アイコンサイズ |

**テーマ層に委譲する内容:** セマンティックカラーの具体的な色値、角丸のスタイル。

---

### ☐ Badge （優先度: High）

ボタンやアバターに重ねる数値・状態インジケーター。

**HTML構造:**

```html
<!-- スタンドアロン -->
<span class="badge">5</span>
<span class="badge success">New</span>
<span class="badge danger">99+</span>

<!-- 重ねて表示（親要素に position: relative が必要） -->
<div style="position: relative; display: inline-block;">
  <button class="button">通知</button>
  <span class="badge overlay">3</span>
</div>

<!-- ドット（数値なし） -->
<span class="badge dot"></span>
```

**実装クラス:**

- `.badge` — ベース
- `.badge.success` / `.warning` / `.danger` / `.info` — セマンティックカラー
- `.badge.overlay` — 右上に重ねる absolute positioning
- `.badge.dot` — 数値なしドットインジケーター
- `.badge.sm` / `.lg` — サイズバリエーション

**nomad-css-ui層で定義するCSS変数:**
| 変数 | 用途 |
|---|---|
| `--badge-bg-color` | 背景色 |
| `--badge-color` | テキスト色 |
| `--badge-border-radius` | 角丸（pill形状） |
| `--badge-padding` | パディング |
| `--badge-font-size` | フォントサイズ |
| `--badge-dot-size` | ドットサイズ |
| `--badge-overlay-top` | overlay 時の上端位置 |
| `--badge-overlay-right` | overlay 時の右端位置 |

**テーマ層に委譲する内容:** セマンティックカラー、角丸スタイル。

---

### ☐ Chip / Tag （優先度: Medium）

コンパクトなラベル・フィルター・タグ要素。

**HTML構造:**

```html
<!-- ベース -->
<span class="chip">Default</span>
<span class="chip success">Success</span>
<span class="chip outlined">Outlined</span>

<!-- 削除ボタン付き（dismiss は JS で非表示切替） -->
<span class="chip">
  Tag
  <button class="chip-dismiss" aria-label="削除">×</button>
</span>

<!-- アイコン付き -->
<span class="chip">
  <span class="chip-icon">★</span>
  Featured
</span>

<!-- サイズ -->
<span class="chip sm">Small</span>
<span class="chip lg">Large</span>
```

**実装クラス:**

- `.chip` — ベース
- `.chip.success` / `.warning` / `.danger` / `.info` — セマンティックカラー
- `.chip.outlined` — ボーダーのみバリエーション
- `.chip.tonal` — 薄い背景バリエーション
- `.chip-dismiss` — 削除ボタン要素
- `.chip-icon` — アイコン配置用
- `.chip.sm` / `.lg` — サイズバリエーション

**nomad-css-ui層で定義するCSS変数:**
| 変数 | 用途 |
|---|---|
| `--chip-bg-color` | 背景色 |
| `--chip-color` | テキスト色 |
| `--chip-border-color` | ボーダー色 |
| `--chip-border-radius` | 角丸 |
| `--chip-padding` | パディング |
| `--chip-font-size` | フォントサイズ |
| `--chip-dismiss-color` | 削除ボタンの色 |
| `--chip-dismiss-hover-color` | 削除ボタンホバー色 |

**テーマ層に委譲する内容:** セマンティックカラー、角丸スタイル。

---

### ☐ Spinner （優先度: High）

CSSアニメーションによるローディングインジケーター。

**HTML構造:**

```html
<!-- ベース（円形スピナー） -->
<span class="spinner"></span>

<!-- サイズ -->
<span class="spinner sm"></span>
<span class="spinner lg"></span>

<!-- カラーバリエーション -->
<span class="spinner success"></span>
<span class="spinner danger"></span>

<!-- ボタン内 -->
<button class="button filled" disabled>
  <span class="spinner sm"></span>
  読み込み中...
</button>
```

**実装クラス:**

- `.spinner` — ベース（border アニメーション）
- `.spinner.sm` / `.lg` — サイズバリエーション
- `.spinner.success` / `.warning` / `.danger` / `.info` — セマンティックカラー

**nomad-css-ui層で定義するCSS変数:**
| 変数 | 用途 |
|---|---|
| `--spinner-size` | スピナーサイズ |
| `--spinner-sm-size` | sm サイズ |
| `--spinner-lg-size` | lg サイズ |
| `--spinner-border-width` | ボーダー幅 |
| `--spinner-color` | スピナー色（アクティブ部分） |
| `--spinner-track-color` | トラック色（非アクティブ部分） |
| `--spinner-speed` | アニメーション速度 |

**テーマ層に委譲する内容:** カラー、サイズ調整。

---

### ☐ Skeleton （優先度: Medium）

コンテンツ読み込み中のシマーアニメーションプレースホルダー。

**HTML構造:**

```html
<!-- テキスト行 -->
<div class="skeleton text"></div>
<div class="skeleton text" style="width: 60%"></div>

<!-- 矩形（画像プレースホルダー等） -->
<div class="skeleton rect" style="width: 200px; height: 150px;"></div>

<!-- 円形（アバタープレースホルダー） -->
<div class="skeleton circle" style="width: 48px; height: 48px;"></div>

<!-- カード全体のスケルトン -->
<div class="card">
  <div class="skeleton circle" style="width: 48px; height: 48px;"></div>
  <div>
    <div class="skeleton text"></div>
    <div class="skeleton text" style="width: 70%"></div>
  </div>
</div>
```

**実装クラス:**

- `.skeleton` — ベース（シマーアニメーション）
- `.skeleton.text` — テキスト行形状
- `.skeleton.rect` — 矩形形状
- `.skeleton.circle` — 円形形状

**nomad-css-ui層で定義するCSS変数:**
| 変数 | 用途 |
|---|---|
| `--skeleton-bg-color` | ベース背景色 |
| `--skeleton-shimmer-color` | シマー（光沢）色 |
| `--skeleton-border-radius` | 角丸（text用） |
| `--skeleton-text-height` | テキスト行の高さ |
| `--skeleton-speed` | アニメーション速度 |

**テーマ層に委譲する内容:** カラー調整（ダークモード対応）。

---

## インタラクティブ入力

### ☐ Switch / Toggle （優先度: High）

`input[type="checkbox"]` をベースにしたトグルスイッチ。

**HTML構造:**

```html
<!-- ベース -->
<label class="switch">
  <input type="checkbox" class="switch-input" />
  <span class="switch-track">
    <span class="switch-thumb"></span>
  </span>
</label>

<!-- テキストラベル付き -->
<label class="switch">
  <input type="checkbox" class="switch-input" />
  <span class="switch-track">
    <span class="switch-thumb"></span>
  </span>
  <span class="switch-label">通知を受け取る</span>
</label>

<!-- サイズ -->
<label class="switch sm"> ... </label>
<label class="switch lg"> ... </label>

<!-- 無効 -->
<label class="switch">
  <input type="checkbox" class="switch-input" disabled />
  ...
</label>
```

**実装クラス:**

- `.switch` — ラベルラッパー
- `.switch-input` — 実際の `input[type="checkbox"]`（視覚的に非表示）
- `.switch-track` — スライダー背景（トラック）
- `.switch-thumb` — スライダーつまみ
- `.switch-label` — テキストラベル
- `.switch.sm` / `.lg` — サイズバリエーション

**nomad-css-ui層で定義するCSS変数:**
| 変数 | 用途 |
|---|---|
| `--switch-track-width` | トラック幅 |
| `--switch-track-height` | トラック高さ |
| `--switch-track-bg-color` | オフ時トラック色 |
| `--switch-track-checked-bg-color` | オン時トラック色 |
| `--switch-track-border-radius` | トラック角丸 |
| `--switch-thumb-size` | サムサイズ |
| `--switch-thumb-bg-color` | サム色 |
| `--switch-thumb-checked-bg-color` | オン時サム色 |
| `--switch-transition` | アニメーション |
| `--switch-disabled-opacity` | 無効時透明度 |

**テーマ層に委譲する内容:** カラー（primary色等）、角丸、サイズ調整。

---

### ☐ Accordion （優先度: Medium）

`<details>` + `<summary>` タグを活用したアコーディオン。

**HTML構造:**

```html
<!-- ベース -->
<details class="accordion">
  <summary class="accordion-header">セクション 1</summary>
  <div class="accordion-body">コンテンツ内容</div>
</details>

<!-- 複数（グループ） -->
<div class="accordion-group">
  <details class="accordion">
    <summary class="accordion-header">セクション 1</summary>
    <div class="accordion-body">コンテンツ</div>
  </details>
  <details class="accordion">
    <summary class="accordion-header">セクション 2</summary>
    <div class="accordion-body">コンテンツ</div>
  </details>
</div>
```

**実装クラス:**

- `.accordion` — `<details>` ラッパー
- `.accordion-header` — `<summary>` ヘッダー
- `.accordion-body` — コンテンツエリア
- `.accordion-group` — 複数アコーディオンのグループ（ボーダー共有）

**nomad-css-ui層で定義するCSS変数:**
| 変数 | 用途 |
|---|---|
| `--accordion-bg-color` | ボディ背景色 |
| `--accordion-header-bg-color` | ヘッダー背景色 |
| `--accordion-header-hover-bg-color` | ヘッダーホバー色 |
| `--accordion-header-color` | ヘッダーテキスト色 |
| `--accordion-border-color` | ボーダー色 |
| `--accordion-border-radius` | 角丸 |
| `--accordion-padding` | パディング |
| `--accordion-marker-content` | 展開インジケーター（`::`before/after） |

**テーマ層に委譲する内容:** カラー、角丸、インジケータースタイル。

---

### ☐ Tooltip （優先度: Medium）

`data-tooltip` 属性 + CSS `:hover` → `::after` によるCSS-onlyツールチップ。

> ⚠️ **注意:** タッチデバイス（スマートフォン等）では `:hover` が機能しないため、タッチサポートが必要な場合はJS実装が必要です。

**HTML構造:**

```html
<!-- ベース（上） -->
<span class="tooltip" data-tooltip="ツールチップテキスト"
  >ホバーしてください</span
>

<!-- 方向 -->
<span class="tooltip tooltip-top" data-tooltip="上">上</span>
<span class="tooltip tooltip-right" data-tooltip="右">右</span>
<span class="tooltip tooltip-bottom" data-tooltip="下">下</span>
<span class="tooltip tooltip-left" data-tooltip="左">左</span>
```

**実装クラス:**

- `.tooltip` — ベース（デフォルト: 上）
- `.tooltip-top` / `.tooltip-right` / `.tooltip-bottom` / `.tooltip-left` — 表示方向
- `.tooltip[data-tooltip]` — `::after` 疑似要素でコンテンツ生成

**nomad-css-ui層で定義するCSS変数:**
| 変数 | 用途 |
|---|---|
| `--tooltip-bg-color` | ツールチップ背景色 |
| `--tooltip-color` | ツールチップテキスト色 |
| `--tooltip-border-radius` | 角丸 |
| `--tooltip-padding` | パディング |
| `--tooltip-font-size` | フォントサイズ |
| `--tooltip-max-width` | 最大幅 |
| `--tooltip-offset` | 対象要素からの距離 |
| `--tooltip-z-index` | z-index |

**テーマ層に委譲する内容:** カラー、角丸スタイル。

---

## ナビゲーション

### ☐ Breadcrumb （優先度: Medium）

`::before` 疑似要素セパレーターを使ったパンくずリスト。

**HTML構造:**

```html
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    <li class="breadcrumb-item"><a href="#">Category</a></li>
    <li class="breadcrumb-item active" aria-current="page">Current Page</li>
  </ol>
</nav>
```

**実装クラス:**

- `.breadcrumb` — `<ol>` リストベース
- `.breadcrumb-item` — リスト項目
- `.breadcrumb-item.active` — 現在のページ（リンクなし）

**nomad-css-ui層で定義するCSS変数:**
| 変数 | 用途 |
|---|---|
| `--breadcrumb-color` | リンク色 |
| `--breadcrumb-active-color` | アクティブ項目のテキスト色 |
| `--breadcrumb-separator` | セパレーター文字（`"/"` 等） |
| `--breadcrumb-separator-color` | セパレーター色 |
| `--breadcrumb-gap` | 項目間のギャップ |
| `--breadcrumb-font-size` | フォントサイズ |

**テーマ層に委譲する内容:** セパレーター文字、カラースタイル。

---

### ☐ Pagination （優先度: Medium）

ページネーションリンク群。

**HTML構造:**

```html
<nav aria-label="pagination">
  <ul class="pagination">
    <li class="page-item"><a class="page-link" href="#">«</a></li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item active"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item disabled"><a class="page-link">»</a></li>
  </ul>
</nav>

<!-- サイズ -->
<ul class="pagination sm">
  ...
</ul>
<ul class="pagination lg">
  ...
</ul>
```

**実装クラス:**

- `.pagination` — `<ul>` ベース
- `.page-item` — リスト項目
- `.page-item.active` — 現在のページ
- `.page-item.disabled` — 無効項目
- `.page-link` — リンク/ボタン要素
- `.pagination.sm` / `.lg` — サイズバリエーション

**nomad-css-ui層で定義するCSS変数:**
| 変数 | 用途 |
|---|---|
| `--pagination-bg-color` | ページリンク背景色 |
| `--pagination-color` | テキスト色 |
| `--pagination-border-color` | ボーダー色 |
| `--pagination-hover-bg-color` | ホバー時背景色 |
| `--pagination-active-bg-color` | アクティブ時背景色 |
| `--pagination-active-color` | アクティブ時テキスト色 |
| `--pagination-disabled-color` | 無効時テキスト色 |
| `--pagination-border-radius` | 角丸 |
| `--pagination-padding` | パディング |
| `--pagination-font-size` | フォントサイズ |

**テーマ層に委譲する内容:** カラー、角丸スタイル。

---

## レイアウト・コンテナ

### ☐ Card （優先度: High）

`.card-header` / `.card-body` / `.card-footer` を持つコンテナ。

**HTML構造:**

```html
<!-- ベース -->
<div class="card">
  <div class="card-body">コンテンツ</div>
</div>

<!-- ヘッダー・フッター付き -->
<div class="card">
  <div class="card-header">タイトル</div>
  <div class="card-body">
    <p>本文テキスト</p>
  </div>
  <div class="card-footer">フッター</div>
</div>

<!-- 画像付き（上部） -->
<div class="card">
  <img class="card-img" src="..." alt="..." />
  <div class="card-body">本文</div>
</div>

<!-- 画像付き（下部） -->
<div class="card">
  <div class="card-body">本文</div>
  <img class="card-img-bottom" src="..." alt="..." />
</div>

<!-- Outlined バリエーション -->
<div class="card outlined">...</div>
```

**実装クラス:**

- `.card` — ベース（デフォルトは elevation shadow）
- `.card.outlined` — ボーダーのみ（影なし）
- `.card-header` — ヘッダー要素
- `.card-body` — ボディ要素
- `.card-footer` — フッター要素
- `.card-img` — 上部画像
- `.card-img-bottom` — 下部画像

**nomad-css-ui層で定義するCSS変数:**
| 変数 | 用途 |
|---|---|
| `--card-bg-color` | 背景色 |
| `--card-color` | テキスト色 |
| `--card-border-color` | ボーダー色 |
| `--card-border-width` | ボーダー幅 |
| `--card-border-radius` | 角丸 |
| `--card-box-shadow` | 影（elevation） |
| `--card-padding` | ボディパディング |
| `--card-header-bg-color` | ヘッダー背景色 |
| `--card-header-padding` | ヘッダーパディング |
| `--card-footer-bg-color` | フッター背景色 |
| `--card-footer-padding` | フッターパディング |

**テーマ層に委譲する内容:** shadow / elevation スタイル、角丸、カラー。

---

### ☐ Divider （優先度: Low）

セクション区切り線。`<hr>` 要素またはクラスによる汎用区切り。

**HTML構造:**

```html
<!-- 水平区切り -->
<hr class="divider" />

<!-- テキスト付き区切り -->
<div class="divider">または</div>

<!-- 垂直区切り（インライン） -->
<span class="divider vertical"></span>
```

**実装クラス:**

- `.divider` — ベース（水平線）
- `.divider.vertical` — 垂直線（`display: inline-block`）
- `<div class="divider">` — テキスト付き（`::before` / `::after` で線生成）

**nomad-css-ui層で定義するCSS変数:**
| 変数 | 用途 |
|---|---|
| `--divider-color` | 線の色 |
| `--divider-width` | 線の幅（水平: height / 垂直: width） |
| `--divider-margin` | 上下マージン |
| `--divider-text-color` | テキスト付き時のテキスト色 |
| `--divider-text-gap` | テキストと線の間のギャップ |

**テーマ層に委譲する内容:** カラー調整。

---

## データ表示

### ☐ Avatar （優先度: Medium）

プロフィール画像・イニシャル・アイコンの表示コンポーネント。

**HTML構造:**

```html
<!-- 画像 -->
<span class="avatar">
  <img src="profile.jpg" alt="User Name" />
</span>

<!-- イニシャル（文字）-->
<span class="avatar">AB</span>

<!-- アイコン -->
<span class="avatar">★</span>

<!-- サイズ -->
<span class="avatar sm">AB</span>
<span class="avatar lg">AB</span>

<!-- 形状 -->
<span class="avatar circle">AB</span>
<!-- デフォルト -->
<span class="avatar square">AB</span>
<span class="avatar rounded">AB</span>

<!-- バッジと組み合わせる -->
<span style="position: relative; display: inline-block;">
  <span class="avatar">AB</span>
  <span class="badge overlay dot success"></span>
</span>
```

**実装クラス:**

- `.avatar` — ベース（デフォルト: circle）
- `.avatar.circle` / `.square` / `.rounded` — 形状バリエーション
- `.avatar.sm` / `.lg` — サイズバリエーション

**nomad-css-ui層で定義するCSS変数:**
| 変数 | 用途 |
|---|---|
| `--avatar-size` | アバターサイズ |
| `--avatar-sm-size` | sm サイズ |
| `--avatar-lg-size` | lg サイズ |
| `--avatar-bg-color` | 背景色 |
| `--avatar-color` | テキスト色 |
| `--avatar-border-radius` | 角丸（circle: 50%, rounded: 0.5rem等） |
| `--avatar-font-size` | フォントサイズ（イニシャル用） |
| `--avatar-border-color` | ボーダー色（任意） |
| `--avatar-border-width` | ボーダー幅（任意） |

**テーマ層に委譲する内容:** カラー調整、角丸スタイル。

---

### ☐ List （優先度: Low）

スタイル付きリストコンポーネント。

**HTML構造:**

```html
<!-- ベース -->
<ul class="list">
  <li class="list-item">アイテム 1</li>
  <li class="list-item">アイテム 2</li>
  <li class="list-item active">アクティブ アイテム</li>
  <li class="list-item disabled">無効 アイテム</li>
</ul>

<!-- ボーダー付き（list-group） -->
<ul class="list-group">
  <li class="list-group-item">アイテム 1</li>
  <li class="list-group-item active">アクティブ</li>
</ul>

<!-- リンク付き list-group -->
<div class="list-group">
  <a href="#" class="list-group-item">リンクアイテム</a>
  <a href="#" class="list-group-item active">アクティブリンク</a>
</div>

<!-- フラッシュスタイル -->
<ul class="list flush">
  <li class="list-item">アイテム 1</li>
</ul>
```

**実装クラス:**

- `.list` — ベース（list-style除去 / パディングリセット）
- `.list-item` — リスト項目
- `.list-item.active` — アクティブ状態
- `.list-item.disabled` — 無効状態
- `.list-group` — ボーダー付きグループリスト
- `.list-group-item` — グループリスト項目
- `.list.flush` / `.list-group.flush` — 外側ボーダーなし

**nomad-css-ui層で定義するCSS変数:**
| 変数 | 用途 |
|---|---|
| `--list-bg-color` | 背景色 |
| `--list-color` | テキスト色 |
| `--list-hover-bg-color` | ホバー時背景色 |
| `--list-active-bg-color` | アクティブ時背景色 |
| `--list-active-color` | アクティブ時テキスト色 |
| `--list-disabled-color` | 無効時テキスト色 |
| `--list-border-color` | ボーダー色 |
| `--list-border-radius` | 角丸 |
| `--list-padding` | アイテムパディング |

**テーマ層に委譲する内容:** カラー、角丸スタイル。

---

## 実装後の対応

各コンポーネント実装後に行う作業:

1. `src/nomad-css-ui/components/_components.scss` に `@use` を追加
2. 必要に応じて `src/themes/fluent2/components/` と `src/themes/material3/components/` のオーバーライドを追加
3. `docs/components.md` にコンポーネントのリファレンスを追記
4. 本ファイルのステータスを **Done ✅** に更新
