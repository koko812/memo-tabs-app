# 📝 タブ付きメモ帳アプリ（React + Tailwind）

このアプリは、**React × Tailwind CSS × Markdown** を活用して構築された **タブ切り替え式の軽量メモ帳アプリ**です。

複数のメモをタブで管理しながら、リアルタイムで Markdown プレビューを確認でき、URL を貼ると自動で OGP カードが表示されます。Notion や Obsidian にインスパイアされた構造的な表示を、**軽量・快適なUIで実現**しています。

---

## 🚀 主な機能（ver 2.3 現在）

* ✅ 複数メモをタブとして追加・切り替え・削除
* ✅ タブ名のインライン編集（ダブルクリックで変更）
* ✅ Markdown 記法によるリアルタイムプレビュー表示（`react-markdown`）
* ✅ Tailwind Typography Plugin（`prose`）で美しい整形表示
* ✅ 検索語を文本全体から検索し `<mark>` ハイライト表示
* ✅ URL を貼ると Microlink API により OGP プレビューカードを自動表示
* ✅ ローカル保存（`localStorage`）によって状態を永続化

---

## 🛠 技術スタック

| 分類          | 使用技術                        | 備考                      |
| ----------- | --------------------------- | ----------------------- |
| フロントエンド     | **React**                   | Create React App ベース    |
| スタイリング      | **Tailwind CSS**            | UI全体をユーティリティクラスで構築      |
| Markdown 表示 | **ReactMarkdown**           | Markdown → JSX に変換      |
| Markdown 整形 | **@tailwindcss/typography** | `prose`による読みやすいスタイル     |
| OGPカード表示    | **Microlink API**           | URL を検出してカード表示（キャッシュ付き） |
| 状態管理        | `useState`, `useEffect`     | React Hooks             |
| 永続化         | `localStorage`              | タブ・選択状態・カウントを保存         |
| 検索ハイライト     | `<mark>` + 正規表現分割           | 構造とアクセシビリティを両立          |

---

## 📂 ディレクトリ構成（簡易版）

```
src/
├── App.js              // メインUIロジック
├── App.module.css      // スタイル（Tailwind移行前の残り）
├── index.js            // エントリーポイント
```

---

## 🔧 セットアップ（ローカル実行）

```bash
npm install
npm start
```

アプリは `http://localhost:3000` で起動します。

---

## 🔮 今後の拡張アイデア

* [ ] コードブロックへのシンタックスハイライト（`rehype-highlight`など）
* [ ] 画像・リンク挿入の簡易支援
* [ ] OGP キャッシュの `localStorage` 永続化対応
* [ ] ノート一覧・タブ並び替え機能
* [ ] Notion風の WYSIWYG モードへの発展（Lexical, TipTap など）
* [ ] Vite への移行によるビルド高速化

---

## 👤 製作メモ

このプロジェクトは、「**Zenn や Obsidian のようなリッチ表示**」と「**日常使いできる軽さ**」の両立を目指しています。

Tailwind の持つ構造性と Markdown の柔軟性を活かしながら、「ちょっとしたメモに最適化された、軽やかな書き心地」を追求しています。
