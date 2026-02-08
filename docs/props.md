# Nomad CSS トークン & プロパティ (Props) ガイド

Nomad CSSは `src/props/` 配下で定義された「トークン（CSS変数）」を基盤に構築されています。
これらの変数を活用することで、アプリケーション全体の一貫性を保ちながらカスタマイズを行うことができます。

## プレフィックス (Variable Prefixes)

名前空間の衝突を避けるため（または将来的にプレフィックスを変更可能にするため）、SCSS変数としてプレフィックスを管理しています。
デフォルトでは以下のようになっていますが、ビルド設定で変更可能です。

| カテゴリ | プレフィックス | 例 |
| --- | --- | --- |
| パレット | `--palette-` | `--palette-blue-500` |
| フォント | `--font-` | `--font-size-base` |
| ニュートラル | `--neutral-` | `--neutral-color-text` |
| コンポーネント | `--[component]-` | `--button-bg`, `--input-height` |

---

## タイポグラフィ (Typography)

フォントサイズ、ウェイト、行高は `src/props/_fonts.scss` で定義されています。

### フォントウェイト
| 変数名 | 値 | 説明 |
| --- | --- | --- |
| `--font-weight-1` | 100 | Thin |
| `--font-weight-4` | 400 | Regular (Normal) |
| `--font-weight-7` | 700 | Bold |
| `--font-weight-9` | 900 | Black |

### フォントサイズ
| 変数名 | 値 (rem) | 値 (px換算) |
| --- | --- | --- |
| `--font-size-0` | 0.75rem | 12px |
| `--font-size-1` | 1rem | 16px |
| `--font-size-2` | 1.25rem | 20px |
| `--font-size-3` | 1.5rem | 24px |
| ... | ... | ... |

---

## カラーシステム (Color System)

Nomad CSSは **HSL (Hue, Saturation, Lightness)** モデルを採用しています。
基本となる「HUE（色相）」と「Saturation（彩度）」を定義するだけで、明度（Lightness）の異なる11段階（0～10）のカラーパレットを自動生成します。

### セマンティックパレット
テーマ層（`_contract.scss` 等）で定義される「意味を持つ」色のセットです。

- **primary**: メインアクション
- **secondary**: サブアクション
- **tertiary**: アクセント
- **success**: 成功・ポジティブ
- **warning**: 警告・注意
- **danger**: エラー・危険
- **info**: 情報・通知

### パレットの生成ロジック
各セマンティックカラーには `levels`（明度レベルのマッピング）が設定されています。

```scss
"primary": (
    h: var(--hue-blue),  // 220
    s: 80%, 
    levels: (
      lighter: 2, // 明るい背景
      light: 3,   // ホバー時の背景など
      default: 6, // 標準ボタンの背景
      dark: 8,    // 濃い文字色
      darker: 9   // さらに濃い色
    )
)
```

この設定により、`--palette-default` や `--palette-lighter` といった抽象的な変数名で色を利用できるようになります。

---

## ブレークポイント (Breakpoints)

レスポンシブデザイン用のブレークポイントはBootstrap互換で定義されています。

| 変数名 | 値 |
| --- | --- |
| `--breakpoint-xs` | 0 |
| `--breakpoint-sm` | 576px |
| `--breakpoint-md` | 768px |
| `--breakpoint-lg` | 992px |
| `--breakpoint-xl` | 1200px |
| `--breakpoint-xxl` | 1400px |

SCSSでは `media-breakpoint-up($name)` などのMixinも提供されています。
