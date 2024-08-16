# esh2n.dev

## 使用言語と構成

- 主要言語: TypeScript, Rust
- フロントエンド: React、Next.js, LitElement
- バックエンド: Dify Containers
- BFF (Backend for Frontend): Hono フレームワーク on Cloudflare Workers

## ツール

- パッケージマネージャー: bun
- ビルドツール: wrangler (Cloudflare Workers用), bun
- フォーマッター: Biome
- 型チェック: TypeScript (tsc)
- リンター: Biome

## Frontend

- esh2n.dev v1(https://esh2n-keq3b76jd-esh2n.vercel.app/)のリニューアルサイト
- ベースはNext.jsで、AIChatコンポーネントなど一部LitElementを使用、markdown to htmlのパースはRustで書いたモジュールをwasmとして使用

- home: トップページ
- readme: このサイトについて
- resume: 私の職歴
- aboutme: 私について
- contact: SNSリンクなど
- settings: カラーテーマやAIChatなどの設定

- それぞれのページにはCodeビューを見ることが可能

## BFF

- Honoを使用して、Cloudflare Workers上にデプロイ
- Zodを使用したバリデーション
- キャッシュの使用

- ogp動的生成: satori, resvg-wasmを使ったsvg to png
- notion api連携: フロントからblog記事を取得するためのAPI