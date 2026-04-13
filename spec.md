# サービス仕様書: Japan Life Guide

## 基本情報
- **サービス名:** Japan Life Guide
- **タグライン:** "Step-by-step guides for everyday life in Japan"
- **対象ニーズ:** 日本在住外国人が病院受診・行政手続き・日常生活で直面する「何をどうすればいいかわからない」問題
- **種類:** 静的サイト（マルチページ）
- **デプロイ先:** GitHub Pages
- **差別化:** 既存3サービス（japan-pro-finder=専門家検索、japan-bureaucracy-buddy=書類記入、japan-emergency-phrases=緊急フレーズ）の隙間を埋める。手順ウォークスルーに特化

### Reddit裏付け
- r/Osaka — English speaking doctors/hospitals検索需要
- r/japanlife — 名古屋で病院たらい回し体験
- r/Kyoto — 京都で出産すべきか（手続き不明で不安）

---

## 使うコード
- **URL:** 自作（該当リポなし）。手順ウォークスルー特化の既存リポなし
- **ライセンス:** MIT（自作）
- **ライブラリ（CDN）:** Tailwind CSS（モバイルファーストUI）、Fuse.js（ファジー検索）

---

## 核となる機能（1つだけ）

**生活場面を選ぶ → ステップバイステップで「何をする・何を持っていく・何を言う」がわかる**

---

## アーキテクチャ（マルチページ）

```
projects/japan-life-guide/
├── spec.md
├── index.html            ← カテゴリ一覧+検索（ランディング）
├── medical.html          ← 医療ガイド一覧
├── admin.html            ← 行政手続きガイド一覧
├── daily.html            ← 日常生活ガイド一覧
├── guide.html            ← 個別ガイド表示（JSでJSON読み込み）
├── js/
│   ├── guides-data.js    ← ガイドJSON配列
│   ├── resources-data.js ← リソースJSON配列
│   ├── app.js            ← 検索+ナビ+ガイドレンダリング
│   └── components.js     ← ヘッダー/フッター/カード共通部品
├── css/style.css         ← Tailwind補助カスタム
├── data/
│   ├── guides.json       ← マスターデータ
│   └── resources.json    ← 外部リンク集
└── robots.txt / sitemap.xml
```
各HTML 200行以内。ガイド本文はJS配列から動的生成。

---

## データスキーマ

### guides.json
```json
{
  "id": "visit-doctor",
  "category": "medical",
  "title": "How to Visit a Doctor in Japan",
  "summary": "What to bring, what to expect, step by step",
  "steps": [
    { "order": 1, "title": "Bring your insurance card",
      "detail": "Your NHI or company insurance card. Without it you pay 100%.",
      "tip": "If you forgot it, come back within the same month for a refund." }
  ],
  "bring": ["Insurance card", "My Number card (optional)", "Cash"],
  "phrases": [
    {"ja": "初診です", "en": "This is my first visit", "romaji": "shoshin desu"}
  ],
  "disclaimer": "general-info",
  "lastVerified": "2026-04"
}
```

### resources.json
```json
{
  "id": "amda-hotline",
  "name": "AMDA International Medical Information Center",
  "url": "https://www.amdamedicalcenter.com/",
  "phone": "03-6233-9266",
  "description": "Multilingual medical consultation hotline",
  "category": "medical",
  "type": "hotline"
}
```

---

## トピックカテゴリ（MVP 9ガイド）

**Medical:** (1) How to visit a doctor (2) How to call an ambulance/119 (3) How to find English-speaking clinics (4) How to use NHI at a pharmacy
**Admin:** (5) How to register at city hall (6) How to get a My Number card (7) How to renew your residence card
**Daily Life:** (8) How to set up utilities (9) How to sort garbage

---

## データ収集アプローチ
- **医療:** AMDA公式、TELL公式、各市区町村の多言語医療ガイド（公開PDF）
- **行政:** 各市区町村の英語版手続きページ、Immigration Services Agency公式
- **NHI/119:** 厚労省英語版NHI説明ページ、総務省消防庁多言語119ガイド
- **ダミーデータ禁止。** 全情報は公式ソースから収集。URL掲載前にHTTP生存確認
- **免責:** 全ページに "This is general information, not legal or medical advice" 表示

---

## 収益モデル
- **初期:** 無料公開（SEO+Reddit流入でユーザー獲得）
- **寄付:** Ko-fi / Buy Me a Coffee
- **アフィリエイト:** Amazon Japan（必要持ち物リンク: 体温計、お薬手帳等）
- **将来:** 都市別ガイド拡張でロングテールSEO → 広告検討

---

## ビルドステップ
1. `guides.json` MVPデータ作成（9ガイド、公式ソースのみ）
2. `resources.json` リソースデータ作成（AMDA/TELL/119等）
3. `components.js` 共通UI部品（ヘッダー/フッター/免責バナー）
4. `index.html` ランディング（カテゴリカード+検索）
5. カテゴリページ3枚（medical/admin/daily）
6. `guide.html` 個別ガイド表示（URLパラメータでJSON切替）
7. `app.js` 検索+ルーティング+レンダリング
8. レスポンシブ検証（480px/768px/1024px）
9. robots.txt + sitemap.xml → GitHub Pages デプロイ

---

## Publish計画
- **サービスURL:** https://humancronadmin.github.io/japan-life-guide/
- **ターゲット:** 日本在住・移住予定の外国人（英語話者）
- **投稿先:** r/japanlife, r/movingtojapan, r/Osaka, r/Kyoto, r/Tokyo
- **訴求:** "Visiting a doctor in Japan for the first time? Here's exactly what to bring and what to expect."
- **既存サービス連携:** japan-pro-finder、japan-emergency-phrases、japan-bureaucracy-buddyから相互リンク
- **SEO:** 各ガイドが個別URL → "how to visit doctor japan" 等のロングテール狙い
