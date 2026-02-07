# CSS Standard

フレームワーク非依存のテーマ切り替え可能なCSSライブラリ。

## 特徴

- **マルチフレームワーク**: Node.js、ASP.NET Core、PHPなど様々な環境で使用可能
- **低依存性**: ライブラリへの依存を最小限に抑えた設計
- **レガシー対応**: 古いブラウザでも動作（HSLベースのカラーシステム）
- **テーマ機能**: `data-theme` 属性でテーマ切り替え

## 使い方

```html
<html data-theme="fluent2">
<head>
    <link rel="stylesheet" href="dist/css/fluent2.css">
</head>
<body>
    <button class="button primary">Primary Button</button>
</body>
</html>
```

## パッケージ構成

| パッケージ | 説明 |
|-----------|------|
| `@css-std/props` | デザイントークン（カラー、フォント等） |
| `@css-std/core` | 基本コンポーネント |
| `@css-std/theme-*` | テーマ定義 |

## ドキュメント

- [開発経緯](docs/origin/20260207.md)
- [Copilot向け詳細情報](.github/copilot-instructions.md)
