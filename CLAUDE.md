# nomad-css

フレームワーク非依存のテーマ切り替え可能なCSSライブラリ。現状はまだ正式なリリースもしていないため、破壊的な変更を許容します。

## アーキテクチャ（3層構造）

```
src/utilities/          ← 層1: テーマ・フレームワーク非依存のユーティリティ
src/nomad-css-ui/       ← 層2: コンポーネント定義（utilities に依存）
src/themes/<name>/      ← 層3: テーマ（nomad-css-ui の CSS変数を上書き）
```

依存方向は一方向のみ: `utilities ← nomad-css-ui ← themes`

## 絶対に守るルール

- **コンポーネント定義で色値を手書きしない** — nomad-css-ui のコンポーネントは `var(--palette-solid)` や `var(--border-color)` 等のCSS変数のみを参照する。具体値はスケール生成（ビルド時）とテーマ層だけが持つ
- **OKLCH は Sass ビルド時のみ、出力CSSは具体値** — 色の設計・調整は `src/utilities/_color-scales.scss` の OKLCH データと `_palette.scss` の関数で行い、出力される CSS には rgb()/hex の具体値と `var()` 参照しか含めない（レガシーブラウザ対応のため、ランタイムに OKLCH / color-mix / 計算式を出さない）
- **:root のCSS変数を不用意に増やさない** — :root のカスタムプロパティは全要素に継承され、数が膨らむと DevTools が極端に重くなる。中間変数のチェーンを作らず、「スケール（具体値）→ ロールトークン（1ホップ参照）→ ワーキング変数」の3層を維持する
- **`@use` を使う、`@import` は使わない** — Sass モジュールシステムのルール
- **セマンティックロールのデフォルトは nomad-css-ui 層、上書きはテーマ層** — テーマはロールトークン（`--primary-solid` 等）とグローバル変数だけを上書きする。スケールの中間値を繋ぎ直さない

## CSS変数の命名規則

```
--{component}-{state}-{property}
例: --button-hover-bg-color, --form-control-focus-border-color
```

カラー変数の3層構造:

```
--{family}-{1..12}            スケール: 21ファミリー × 12段階の具体値（例: --blue-7）
--{role}-{level}              ロールトークン: スケールへの1ホップ参照（例: --primary-solid）
--{role}-accent-{level}       ロールのテキスト色（accent の明暗はビルド時に判定）
--palette-{level}             ワーキング変数: コンポーネントが消費（.{role}/.{family} クラスで再マッピング）
```

- role: `primary` `secondary` `tertiary` `success` `warning` `danger` `info` `neutral`
- level: `subtle` `tonal` `solid` `strong` `heavy`
- テーマやブランド固有の色は `palette.make-scale($color)` でビルド時にスケール化する

グローバル変数（テーマ層が必ず上書きする）: `--text-color`, `--surface-color`, `--border-color` とその派生（`-subtle`, `-strong`, `-raised`, `-sunken` 等）

## 新しいコンポーネントを追加するとき

1. `src/nomad-css-ui/components/_newcomponent.scss` を作成
2. `src/nomad-css-ui/components/_components.scss` に `@use` を追加
3. 必要に応じて `src/themes/<name>/components/` でCSS変数を上書き

## 新しいユーティリティを追加するとき

1. `src/utilities/_newutility.scss` を作成
2. `src/nomad-css-ui/_nomad-css-ui.scss` に `@use` を追加

## nomad-css-ui 層のコンポーネント設計方針

- **構造・レイアウト・状態（hover, focus, disabled）を定義する**
- バリエーションは `filled`, `tonal`, `outlined`, `text` などの汎用パターン
- すべてのスタイルプロパティはCSS変数経由で定義し、テーマ層でカスタマイズできるようにする

## ビルドコマンド

```sh
npm run build           # 全テーマをビルド
npm run build:fluent2   # dist/css/fluent2.css を生成
npm run build:material3 # dist/css/material3.css を生成
```

## 詳細ドキュメント

- アーキテクチャ詳細: [docs/architecture.md](docs/architecture.md)
- コンポーネント仕様: [docs/components.md](docs/components.md)
- テーマ作成ガイド: [docs/themes.md](docs/themes.md)
- ユーティリティ: [docs/utilities.md](docs/utilities.md)
