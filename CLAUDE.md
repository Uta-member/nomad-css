# nomad-css

フレームワーク非依存のテーマ切り替え可能なCSSライブラリ。

## アーキテクチャ（3層構造）

```
src/utilities/          ← 層1: テーマ・フレームワーク非依存のユーティリティ
src/nomad-css-ui/       ← 層2: コンポーネント定義（utilities に依存）
src/themes/<name>/      ← 層3: テーマ（nomad-css-ui の CSS変数を上書き）
```

依存方向は一方向のみ: `utilities ← nomad-css-ui ← themes`

## 絶対に守るルール

- **nomad-css-ui 層で色値を直接書かない** — `hsl(210, 100%, 50%)` などの具体値はテーマ層のみ。nomad-css-ui では `var(--border-color)` 等のCSS変数を使う
- **HSL を使う、OKLCH は使わない** — レガシーブラウザ対応のため
- **`@use` を使う、`@import` は使わない** — Sass モジュールシステムのルール
- **セマンティックカラー（primary, danger 等）はテーマ層の責務** — nomad-css-ui 層では定義しない

## CSS変数の命名規則

```
--{component}-{state}-{property}
例: --button-hover-bg-color, --form-control-focus-border-color
```

グローバル変数（テーマ層が必ず上書きする）: `--text-color`, `--surface-color`, `--border-color` とその派生（`-light`, `-dark`, `-lighter`, `-darker`）

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
