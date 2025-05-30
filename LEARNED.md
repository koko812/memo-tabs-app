# 📘 LEARNED.md - タブ切り替えメモ帳（ステップ１）

## 📘 LEARNED.md - ver 2.6（UI のデザイン整理と Preview 表示改善）

---

### ✅ 今回やったこと

* Tailwind による全体レイアウトの統一（グレー背景、白背景カード、中央寄せ）
* UI 構造の整理：検索ボックス、タブバー、メモ本文をそれぞれコンポーネント化
* コンポーネント単位で装飾・デザインの分離と可読性向上
* Markdown 内のリンクプレビュー表示の実装（`CustomLinkRenderer`）
* OGP 表示の `PreviewCard` をリンク直下に挿入し、Markdown 内に自然に溶け込ませる

---

### 🧠 学び・気づき

#### 🔹 UI デザインの階層的整理

* `min-h-screen`, `bg-gray-100`, `max-w-4xl`, `mx-auto`, `space-y-6` を使って、アプリ全体に整った外観を実装
* 各セクション（検索、タブ、本文）に `bg-white rounded-xl shadow p-4` を付け、情報のグループ感を演出
* コンポーネントごとに余白やフォント階層を定義することで、自然な視線誘導を実現

#### 🔹 コンポーネント分離による再利用性と保守性

* `TabBar`, `SearchBar`, `NoteEditor` をそれぞれ切り出し
* props で必要な情報やハンドラを受け渡すことで状態管理は親コンポーネントに集約
* JSX の return 文が非常にスッキリし、見通し・改変性ともに大幅に改善

#### 🔹 Markdown 内リンクに OGP カードを自然に挿入

* `react-markdown` の `components.a` によって `<a>` タグをカスタム表示
* `CustomLinkRenderer` コンポーネントを導入し、リンク href を元に `Microlink API` から OGP 情報を非同期で取得
* `fetchPreview()` 関数でキャッシュ処理を行い、同じ URL の再取得を防止（Mapを使用）
* OGP情報が取得できた場合、タイトル・説明文・画像を含んだ `PreviewCard` を表示し、Markdown のすぐ下にレンダリング
* Markdown に `[表示名](URL)` 形式で記述されたリンクに反応し、URL単体の記述には反応しないように設計（ユーザーの意図を尊重）
* プレビューと元リンクを同時に表示することで、UX を損なわず自然な流れで OGP が埋め込まれる体験を実現

---

### 🛠 使用技術と工夫

| 分類         | 使用技術                             | 解説                                    |
| ---------- | -------------------------------- | ------------------------------------- |
| UIフレームワーク  | Tailwind CSS                     | クラスベースで UI 構成。構造と装飾が近接しており素早い試行錯誤が可能。 |
| Markdown描画 | react-markdown                   | Markdown記法で記述された文字列を安全に HTML に変換。     |
| OGP取得      | Microlink API                    | 指定 URL からメタ情報を取得。                     |
| 条件付き描画     | && / ? :                         | JSX 内で if の代わりに描画制御。                  |
| 再利用        | PreviewCard / CustomLinkRenderer | 複数箇所で同一コンポーネントを活用。                    |
| コンポーネント構造  | props                            | 状態を親が持ち、子に関数として委譲。                    |
| APIキャッシュ   | Mapによるキャッシュ制御                    | 同一 URL に対して再リクエストを防ぎ、表示速度と負荷を改善。      |

---

### 📝 コミットメッセージ案

```
refactor: UI構造を整理し、Markdown内リンクにOGPプレビューを自然に表示
```

* 全体レイアウトを整理し、見通しの良い構成に改善
* 各 UI 要素をコンポーネント化し保守性とデザイン性を向上
* Markdown内のリンクに Microlink プレビューを挿入する CustomLinkRenderer を導入

---

### 🔮 次に取り組みたいこと

* Markdown内の**複数URLに対する非同期OGP描画**の最適化
* PreviewCard のデザイン統一（カード高さ、アイコン、Favicon対応など）
* Tailwind Typography Plugin の統合による Markdown 表示の美しさ強化
* Markdown へのテーマ切り替え（ライト / ダーク）対応
* ヘッダーやフッターを導入してアプリとしての完成度を高める

</br>
</br>
</br>

## 📘 LEARNED.md - ver 2.5（TabBar / SearchBar / NoteEditor のコンポーネント分離）

---

### ✅ 今回やったこと

* `App.js` が大きくなってきたので、UI部分を一部分割
* `SearchBar`, `TabBar`, `NoteEditor` を個別コンポーネント化
* `props` による情報渡しの機構を理解
* `App.js` の `return` 部分が大幅に短縮
* 同時に Tailwind CSS でのスタイリングの効果を保ちながら保存

---

### 🧠 学び・気づき

#### ▹ 「props に関数を渡す」というReactの基本

* `SearchBar` では `onSearch={setSearchText}` のように、親の状態更替関数を子に渡す
* 子は `props.onSearch("text")` のように呼び出して通信
* 対話型、指示型の実装になる

#### ▹ TabBarの切り出しで理解できたこと

* `tabs.map()` による複数ボタン表示は、実際にはかなり長文になりがち
* `editingTabId === tab.id` で「編集モード」を分分で表現
* `TabBar.jsx` に切り出したことで、App側は `<TabBar ... />` で簡潔に
* 編集モードのイベントも `onDoubleClick`, `onBlur`, `onKeyDown` ですっきり分離

#### ▹ JSX の分離の利点

* `App.js` の `return` が 100行近くあったのが、40行前後に短縮
* `NoteEditor.jsx` に分離したことで、Markdown表示やOGPプレビューの説明が分離されてはるかに見通しが良くなった

---

### 🔎 コンポーネント化の構成

```txt
src/
├── App.js
└── components/
    ├── SearchBar.jsx
    ├── TabBar.jsx
    ├── NoteEditor.jsx
    └── PreviewCard.jsx
```

---

### 🖊️ コミットメッセージ案

```
refactor: SearchBar / TabBar / NoteEditor を分割して構造を改善
```

* 各UI部分を個別のコンポーネントとして分離
* `props` で情報をやり取りする指向を明確化
* Tailwind CSS や local state はそのまま残して移行性を確保

---

### 🔮 次にやりたいこと

* `NoteEditor.module.css` などの CSS 分離
* OGP プレビューの複数URL対応
* Tailwind Typography + shadcn/ui による表示統一
* コンポーネント単位でのテスト通過
* localStorage キャッシュのモジュール化 (indexedDB?)

---

### 🌟 さらに感じたこと

* `useEffect(() => { ... })` は便利だが、処理名をつけた方が分かりやすい

  * 例: `useEffect(() => { restoreFromLocalStorage() }, [])`
* `props` に関数を渡す構造はReactの心臓であり、上位解耦の有力な工具
* 分割

</br>
</br>
</br>

## 📘 LEARNED.md - ver 2.4（OGPプレビュー表示の改善とTailwind活用の理解）

---

### ✅ 今回やったこと

* OGPカードの画像サイズ・構成を改善し、視認性を向上
* Tailwind CSS のユーティリティクラスを活用してスタイル調整を細かく制御
* `linkPreview && (...)` による描画ガード、`? :` による表示分岐の意味を整理

---

### 🧠 学び・気づき

#### 🔹 Tailwind CSS のクラスによる構成

Tailwind では CSS ファイルを分けなくても、以下のようなクラスで十分に実用的かつ視認性の高いUIが構築できる：

| カテゴリ  | クラス例                                 | 説明              |
| ----- | ------------------------------------ | --------------- |
| レイアウト | `max-w-md`, `w-full`, `h-auto`       | 横幅・高さの制御、はみ出し防止 |
| 余白    | `p-4`, `mb-2`, `px-3 py-2`           | 内外余白の整え方        |
| 枠線・影  | `border`, `rounded-lg`, `shadow-sm`  | カード風のまとまりある表示   |
| テキスト  | `text-sm`, `text-gray-700`, `italic` | 文章の明暗・補助表現の整理   |

このように、\*\*「構造とスタイルがその場で完結する」ことによる視認性と開発効率の向上（DX）\*\*を実感できた。

#### 🔹 各 Tailwind クラスの詳細な解説

* `max-w-md`：最大幅を `28rem` に制限（約448px）。カードや入力フォームなど、横幅を広げすぎず読みやすくしたい場面に使う。
* `w-full`：横幅を親要素いっぱいに広げる。画像やボタン、フォームなどで、領域全体を使いたいときに有効。
* `h-auto`：高さを自動で調整。画像などでアスペクト比を保ったまま高さを制限したいときに利用。
* `p-4`：内側に1remのパディング（16px）を加える。カードやボックスの中身と枠との距離感を作る。
* `mb-2`, `mb-4`：下方向のマージンを追加。複数要素の間に間隔を持たせる。
* `px-3 py-2`：横に12px、縦に8pxのパディングを設定。ボタンや入力欄でよく使われるサイズ感。
* `border`：標準の境界線（1pxのグレー）を表示。ボックスの視覚的な区切り。
* `rounded-lg`：角丸を大きめにする。やわらかく、視認性のよいUIを作る。
* `shadow-sm`：軽いドロップシャドウ（影）をつけることで浮き上がって見えるように。
* `text-sm`, `text-lg`：フォントサイズを調整（小さめ・大きめ）。情報の強弱をつけるときに便利。
* `text-gray-700`：やや濃いグレーの文字色。本文など、ブラックよりも柔らかく読みやすい印象。
* `text-gray-400`：薄めのグレー。補助的なテキスト（注釈や説明がないことを示すラベルなど）に適している。
* `italic`：斜体。補助表現として使いやすく、柔らかさや区別を演出できる。
* `object-contain`：画像が枠内に収まるように縮小・拡大される。OGPカードの画像が枠からはみ出さず、かつ中央寄せで表示される。
* `max-h-48`：最大高さを `12rem`（192px）に制限。画像が大きくなりすぎることを防ぎ、全体のバランスを保つ。
* `no-underline`：リンクから下線を除去。OGPカード全体をリンクにしたとき、装飾が煩わしい場合に有効。

これらのクラスの組み合わせにより、CSSファイルを明示的に記述することなく、**その場でUIの見た目を制御・調整できる**。

#### 🔹 OGP プレビューカードの最適化

以下のように画像サイズを調整することで、カードがコンテンツに対して大きくなりすぎないようにした：

```jsx
<img
  src={linkPreview.image.url}
  alt=""
  className="w-full h-auto rounded max-h-48 object-contain"
/>
```

* `max-h-48`: 高さを最大12remに制限（192px）
* `object-contain`: アスペクト比を保ちつつはみ出しを防止

#### 🔹 JSX におけるネスト構造と条件分岐

```jsx
{linkPreview && (
  <div>
    <h4>{linkPreview.title || linkPreview.url}</h4>
    {linkPreview.description
      ? <p>{linkPreview.description}</p>
      : <p className="text-gray-400 italic">説明文は見つかりませんでした</p>}
  </div>
)}
```

このような構造は、

1. `linkPreview` が存在するか（描画ガード）
2. `description` が存在するか（三項演算子）

という2段階のチェックを `if` を使わず安全に記述している。

* JSX 内では `if` 文は使えない（statement）
* 代わりに `&&` や `? :` を使った **式ベースの条件分岐** が求められる

この構文の理解により、今後の UI 表現の幅が大きく広がる。

---

### 📝 コミットメッセージ案

```
refactor: OGPプレビューカードの表示改善とTailwindクラスによるスタイル最適化
```

* 画像サイズ調整による圧迫感の軽減
* 説明文の有無による分岐表現を導入
* Tailwind ユーティリティクラスによって視認性と柔軟性を両立

---

### 🔮 次に取り組みたいこと

* PreviewCard コンポーネントとしての分離と props 化
* 複数 URL 対応と非同期並列処理の工夫
* Markdown 表示部とのレイアウト統合と OGP 表示の階層制御
* `localStorage` への OGP キャッシュ永続化
* shadcn/ui や headless-ui の導入検討による Tailwind のさらなる活用

</br>
</br>
</br>

## 📘 LEARNED.md - ver 2.3（Tailwind Typography Plugin `prose` の本格導入）

---

### ✅ 今回やったこと

* Tailwind CSS の Typography Plugin（`@tailwindcss/typography`）を導入し、Markdown表示を大幅に美しくした
* Markdown を表示していた `<ReactMarkdown>` を `<div className="prose max-w-none">` でラップ
* 検索時は従来通り `highlightMatch()` による `<mark>` ハイライトを適用し、検索表示と Markdown 表示を共存
* UI全体の読みやすさ・構造的な整合性が向上し、まるで Zenn や Obsidian のようなリッチメモに進化

---

### 🧠 学び・気づき

#### 🔹 Tailwind Typography Plugin (`prose`) の力

* Tailwind に付属するプラグインであり、`prose` クラスをつけるだけで Markdown 表示が構造的に整う
* `h1~h6`, `ul`, `ol`, `p`, `code`, `blockquote`, `table` などを自動で整形
* `max-w-prose` がデフォルトのため、`max-w-none` を指定することで横幅を広げた

#### 🔹 Markdown と検索ハイライトの両立

* 検索中は Markdown を通常の `ReactMarkdown` でレンダリングせず、文字列として扱って `<mark>` タグで囲んで表示
* それ以外は `prose` によって整形された見た目を採用し、美しさと検索体験を両立

```jsx
{searchText ? (
  <div className={styles.previewText}>
    {highlightMatch(activeTab.content, searchText)}
  </div>
) : (
  <div className="prose max-w-none">
    <ReactMarkdown>{activeTab.content}</ReactMarkdown>
  </div>
)}
```

#### 🔹 `<mark>` タグとセマンティクス

* ただの背景装飾ではなく、「検索結果・注目ポイント」として意味をもたせたタグ
* スクリーンリーダー等にも有効で、意味のある HTML 構造に

---

### ❓ WYSIWYG とは？

> **What You See Is What You Get（見たまま編集）**

* 実際の表示と同じレイアウトで編集できる形式のエディタ
* 例：Notion、Google Docs、Word など
* Markdown のようなプレーンテキストではなく、太字・見出し・画像などをその場で編集可能

Tailwind や Markdown パーサーの組み合わせでも、WYSIWYG 的なUIを構築することは可能（やや難易度は高め）

---

### 📝 コミットメッセージ案

```
feat: prose クラスによる Markdown の美しい整形を導入（Tailwind Typography）
```

---

### 🚀 今後やりたいこと

* コードブロックのシンタックスハイライト追加
* 画像貼り付けやリンク挿入の支援
* Markdown + WYSIWYG のハイブリッドモード実装（例：Notion風エディタ）
* ノート一覧・タブの並び替えなどもUX向上ポイント

今後は Tailwind + Markdown の力を最大限に活かして、より「実用的な日常メモツール」に進化させていきたい！

</br>
</br>
</br>

## 📘 LEARNED.md - ver 2.1（Tailwind CSS 導入とスタイル整理）

---

### ✅ 今回やったこと

* Tailwind CSS を v3 系でインストールし、React プロジェクトに導入
* 検索ボックスを含む主要 UI（タブ・本文・見出しなど）に Tailwind クラスを適用し、洗練された見た目に
* インライン `style={...}` で書かれていたスタイル定義を削除し、`className` に統一
* Tailwind による一貫した設計により、スタイル調整やテーマ変更が圧倒的にやりやすくなった
* Tailwind の動作を確認するための見出し (`Tailwind きてる？🚀`) をテスト表示

---

### 🧠 学び・気づき

#### 🔹 Tailwind 導入の過程でつまずいた点と解決策

* `npx tailwindcss init -p` 実行時に `command not found` が出た → 原因は `tailwindcss` が2重にインストールされていたこと
  * `react-scripts` 内部の Tailwind v3.4.17 と、手動インストールした v4.1.7 が競合していた
  * 解決方法：`node_modules` と `package-lock.json` を削除し、`tailwindcss@3` に固定して再インストール

```bash
rm -rf node_modules package-lock.json
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

* `tailwindcss --version` が動かないのは仕様（v3では --version が正常に動かないだけ）

---

#### 🔹 なぜ Tailwind を使いたかったのか？

* `style={...}` が多くなりすぎてコードが読みにくくなってきた
* Tailwind のユーティリティクラスなら短く、かつ意味が明確なクラス名でスタイル指定できる
* className にまとめて書くことで、「このUIはどういう見た目か」が一目でわかる
* CSS モジュールや Sass と違い、グローバルな命名衝突もなく安全

---

#### 🔹 Tailwind クラスの効果的な使い方がわかってきた！

* `w-full`, `px-3 py-2`, `mb-6`, `rounded-md`, `border` などの組み合わせで、構造的にも美しい見た目が実現
* 検索バーは以下のように書くだけで整ったUIに：

```jsx
<input
  type="text"
  placeholder="検索..."
  value={searchText}
  onChange={(e) => setSearchText(e.target.value)}
  className="w-full px-3 py-2 mb-6 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
/>
```

* 今後、レスポンシブやダークモードにも `sm:`, `md:` や `dark:` をつけるだけで対応できる！

---

#### 🔹 npm install との関係にも理解が深まった

* `rm -rf node_modules` をすると実際には全ての依存が削除されるため、再度 `npm install` が必要
* これを忘れると、`react`, `react-dom`, `tailwindcss`, `microlink`, すべてが壊れた状態になる
* `package.json` が設計図、`package-lock.json` が部品表、`node_modules` が実体という関係性が腑に落ちた

---

#### 🔹 Tailwind の有効確認の喜び

```jsx
<h1 className="text-2xl text-blue-600 font-bold">
  Tailwind きてる？🚀
</h1>
```

これが見た目に現れた瞬間、**「自分がスタイルを操っている」感覚が一気に高まった！**

---

### 📝 コミットメッセージ案

```
style: Tailwind CSS による検索バーとレイアウトの改善（v2.1 導入）
```

---

### 🎯 次にやりたいこと

* タブのボタンをより綺麗に並べたい
* Markdown 表示部分（ReactMarkdown）にも Tailwind クラスを適用したい
* Tailwind Typography Plugin（`prose`）の導入も候補
* 本文編集部と OGP プレビューの余白・階層・デザイン整理
* 最終的には全体的なレイアウト設計を Tailwind 中心に置き換えていきたい
---

#### 🔹 CRA（Create React App）と Vite の違いも学んだ！

* 今回は CRA を使っているが、最近は Vite の方が人気になりつつある
* 主な違いは以下の通り：

| 項目 | CRA（Create React App） | Vite |
|------|--------------------------|------|
| バンドラー | Webpack | esbuild（+rollup） |
| 起動速度 | やや遅い（全体バンドル） | 超高速（即時モジュール配信） |
| ビルド速度 | Webpack依存で重め | 差分ビルドで爆速 |
| 構成ファイル | 隠蔽されていてカスタマイズしにくい | 最初から構成可能で柔軟 |
| 状態 | メンテナンスは続いているが停滞気味 | 活発で先進的、人気上昇中 |

* CRA は初心者にやさしく、「何も考えずにReactを始められる」環境として便利
* 一方、Vite は大規模開発・高速化・細かい制御が必要なときに真価を発揮
* **最終的にはプロジェクト規模や目的に応じて使い分けるのがベスト！**

* Tailwind との親和性でいうと Vite のほうが導入もコンパイルも軽快。
  将来的に Vite に移行する可能性も視野に入れておくとよさそう！

</br>
</br>
</br>

## 📘 LEARNED.md - ver 2.0（CSS Modules によるスタイル分離）

---

### ✅ 今回やったこと

* `App.module.css` を新たに作成し、スタイル定義を外部ファイルに移行
* JSX 内の `style={{...}}` をすべて `className={styles.x}` という形で指定
* スタイルの一部（アクティブなタブなど）は `.tabButton` + `.active` のような **クラス切り替え** で表現
* `App.js` では `import styles from './App.module.css'` によりスタイルを読み込み、React の中で型安全に使えるようにした

---

### 🧠 学び・気づき

#### 🔹 CSS Modules（モジュールCSS）とは？

* `.module.css` というファイル名で書くことで、**コンポーネント単位のスコープを持つスタイル**になる
* 通常の CSS と違って、クラス名が内部的に一意（`button_xxxx123` のように）に変換されるため、**他と衝突しない**
* `styles.x` という形で使えるのは、ビルド時にクラス名が自動変換されているから

#### 🔹 className 指定は「間接的」なスタイル指定

* いままでの `style={{...}}` は **直接指定（inline）** だったが、
* 今回の `className={styles.x}` は **クラス名を通じて「外部スタイルを呼び出す」方法**である
* この「間接性」により、スタイルの再利用・整理・見通しの良さが大きく向上する

#### 🔹 クラス切り替えによる状態管理の柔軟さ

```jsx
className={
  tab.id === activeTabId
    ? styles.tabButton + ' ' + styles.active
    : styles.tabButton
}
```

* このように `active` の状態を別のクラスで管理することで、**状態に応じたスタイル変更**がスッキリ書ける
* Tailwind CSS でも `className` ベースの指定になるため、今回の記法はそのまま応用可能

#### 🔹 JSX の中で書いているのは「return の中」だけ

* JSX は基本的に React コンポーネントの `return (...)` の中でしか使わない
* それ以外のロジックは通常の JavaScript で記述し、JSX に渡すことで構造とロジックを分離できる
* 例外的に JSX を変数に代入して return に使うことも可能（式だから）

---

### 📝 コミットメッセージ案

```
refactor: スタイルを App.module.css に分離し、className ベースに移行
```

- すべてのスタイルを `App.module.css` に統合
- `style={{...}}` を className 形式に置き換え
- アクティブタブやテキスト領域もクラスベースで整理
- JSX の可読性とスタイル再利用性が向上

---

### 🚀 次のステップ候補

* Tailwind CSS を導入し、モダンで一貫性のある UI スタイル設計へ移行
* ダークモードやレスポンシブ対応など、CSS設計力をさらに高める
* コンポーネント単位への分割（TabBar, Editor, Preview）により再利用性を意識したUI設計へ進化

</br>
</br>
</br>

## 📘 LEARNED.md - ver 1.9（スタイル整理 & 安全性向上編）

---

### ✅ 今回やったこと

* JSX に直接書かれていたインラインスタイル（style={{...}}）を `const styles = {}` に統合し、可読性と保守性を向上
* 条件付きスタイル（アクティブなタブなど）には `styles.tabButton(isActive)` のように関数スタイルを導入
* JSX 側はすべて `style={styles.x}` の形式に統一し、スタイルとロジックを分離
* `activeTab` が存在しない場合に発生するエラー（`Cannot read properties of undefined`）を、`{activeTab && (...)}` の形式で「描画ガード」することで安全に対処

---

### 🧠 学び・気づき

#### 🔹 JSX の中に if 文が書けない理由

* JSX の `{}` の中に書けるのは「式（expression）」だけで、「文（statement）」はNG
  * ✅ OK: `condition && <p>表示</p>` / `a ? b : c`
  * ❌ NG: `if (a) { return b }`
* 書きたい場合は、外で変数に代入する or 三項演算子で書く

#### 🔹 React.Fragment（`<> ... </>`）の役割

* 複数の要素を `return` でまとめたいときに使う「透明な箱」
* `<div>` とは違って DOM に影響を与えず、HTMLツリーを汚さない
* JSX の中で複数要素を返したいときの定番手段

#### 🔹 「ガード描画」の基本構文

```jsx
{activeTab && (
  <textarea value={activeTab.content} ... />
)}
```

* `activeTab` が null や undefined のときに描画をスキップできる
* 特に `useEffect()` の処理より先に描画が走る可能性がある場合には非常に重要
* エラーを未然に防ぐことで安定性が向上する

#### 🔹 JSX構文の整理効果を実感

* `style={{...}}` を `style={styles.xxx}` に統一するだけで、コードの読みやすさが段違いに改善
* スタイルや構造が複雑になる前に分離しておくと、将来的な保守や再利用に強くなる

---

### 📝 コミットメッセージ案

```
refactor: JSX のスタイル定義を styles オブジェクトに分離 & 安全な描画ガードを導入
```

- `const styles = {}` によってインラインスタイルの肥大化を防止
- アクティブ状態などの動的スタイルも関数で定義可能に
- `activeTab` の存在チェックによってクラッシュ防止を実現
- JSXの構文的な理解と視認性向上のための整理を実施

---

### 🪄 次のステップ候補

* スタイルを `App.module.css` に切り出してより再利用性を高める
* UI フレームワーク（Tailwind CSS / Chakra UI など）導入によるデザイン改善
* レスポンシブ対応・フォントやカラーリング調整による「使いたくなる」UIへの昇華

</br>
</br>
</br>

## 📘 LEARNED.md - ver 1.8.1（URLプレビューのキャッシュ対応）

---

### ✅ 今回やったこと

* Microlink API による URL プレビュー取得処理に対して、`Map` を用いたメモリ内キャッシュを導入
* 同じ URL に対する API リクエストを 1 回だけに制限し、再表示時の高速化と API 負荷の軽減を実現
* キャッシュは `App` 関数の外で定義し、React の再レンダリングに左右されない持続性を確保
* `useEffect` では `fetchPreview().then(setLinkPreview)` の形で簡潔に非同期処理を記述

---

### 🧠 学び・気づき

#### 🔹 `Map()` と `.map()` の違いを正確に理解

* `Map()` はキーと値のペアを保持するための組み込みオブジェクト（連想配列のようなもの）
* `.map()` は配列の各要素に処理を適用して新しい配列を作るメソッドで、まったく別物
* キャッシュ用途では `Map()` が適しており、`has()`・`get()`・`set()` で操作可能

#### 🔹 `Map` は関数コンポーネントの外に置くべき理由

* React の関数コンポーネントは状態変更などで再実行されるため、中で `new Map()` すると毎回初期化される
* 関数外で定義すれば、モジュール読み込み時に一度だけ生成され、状態に左右されず持続的に使える

#### 🔹 `async/await` の使いどころと React との関係

* API などの非同期処理には `async/await` が適しており、コードの可読性が向上する
* ただし `useEffect` に直接 `async` を使うのは NG（戻り値が Promise になるため）
* `useEffect` 内に別の `async` 関数を定義し、それを即時実行するのが一般的なパターン

#### 🔹 `.then()` の有用性も再認識

* `fetchPreview().then(setLinkPreview)` のように、即座に簡潔な処理をしたいときは `.then()` が便利
* async/await と .then はどちらも Promise を扱う手段であり、場面に応じて適切に使い分けられると強力

#### 🔹 なぜ今回は `async` を使ったのか

* Microlink API による OGP 情報取得はネットワーク越しの非同期処理
* `await fetch(...)` により通信完了まで待機 → 結果を使ってキャッシュに保存
* 非同期処理であっても、React の描画と整合性が取れるよう安全に設計されている

---

### 📝 コミットメッセージ案

```
feat: Microlink API の URL プレビューにキャッシュ機能を追加
```

- 同じ URL に対する API リクエストを省略して高速化を実現
- `Map` を使ったメモリキャッシュにより、React の状態と独立して持続的に機能
- `fetchPreview` の中でキャッシュ確認・保存のロジックを一元化
- コードの可読性と API 負荷の削減を両立した実装に改善

---

### 🔮 次のステップ候補

* `localStorage` を用いたキャッシュの永続化（ページ再読み込み後も保持）
* 複数 URL 対応（本文に複数のリンクがある場合すべてにプレビューを表示）
* 非同期プレビュー取得中のプレースホルダー表示など UX 向上施策
* キャッシュ容量制限や TTL（期限）付きキャッシュ戦略の導入

</br>
</br>
</br>

## 📘 LEARNED.md - ver 1.8（URLプレビュー機能の追加）

---

### ✅ 今回やったこと

* メモ本文にURLが含まれていた場合、Microlink API を使ってそのリンク先の OGP 情報（タイトル・説明・画像）を取得
* 最初に見つかったURLを検出し、APIからプレビュー情報を取得・表示する処理を `useEffect` に追加
* API取得の結果を状態として保持し、JSXでプレビューカードとして描画
* Markdown表示・編集の流れの中に自然に統合されるようにUIを配置
* APIキーなしで動作確認、Microlinkの簡易導入が可能なことを確認

---

### 🧠 学び・気づき

#### 🔹 URLプレビューの基本的な実装

* URL文字列の抽出には `/https?:\/\/[^\s]+/g` のような正規表現を使用
* `fetch()` で Microlink API を叩き、OGP情報を取得してJSONとして処理
* タイトル・説明・画像を含むリッチなカードUIを JSXで表示
* `<textarea>` の下に非同期的に描画することで自然な流れに組み込める

#### 🔹 Microlink API の使いやすさ

* Microlink はAPIキーなしでも使える（制限あり）
* 外部APIに頼ってもCORS問題がなく、クライアントからそのまま叩ける
* フロントエンドの試作・学習に最適なAPI設計（即反映・無料）

#### 🔹 Obsidian との比較で得られた洞察

* Obsidianの標準機能ではURLのOGPプレビューは出ないが、Rich Links Pluginなどを使えば可能
* ただし、Obsidianのリッチリンク機能は手動でのコマンド実行が必要で、自動変換ではない
* Microlink API を使えば、Reactアプリでは**自動でOGPを取得＆表示**でき、NotionやSlackのような体験に近づける
* 将来的にはObsidianのように、リンク検出＋自動リッチ化の流れを自作アプリでも拡張可能

#### 🔹 API使用回数の最適化に向けた気づき

* 同じURLに対して何度もAPIを叩くのは無駄 → `Map` を使ったキャッシュ戦略が有効
* 取得済みのプレビューは再取得せず、保持しておけば高速化＆API制限の節約が可能
* 今後 `localStorage` や `IndexedDB` を使えば、セッションをまたいだキャッシュも可能

#### 🔹 表示UXの最適化アイデア

* 遅延表示（プレースホルダー「プレビュー取得中...」）を導入すればUXが向上する
* MarkdownでURLを貼るだけでOGPカードが出ることで、よりリッチなメモ体験が実現
* OGPが設定されていないページではnull表示になることもある点は要考慮

#### 🔹 User-Agent に関する理解

* MicrolinkのようにAPIキーが不要なサービスでは、アクセス元をIPアドレスやUser-Agentで識別している可能性が高い
* User-Agent はブラウザが送信する自己申告型の文字列で、簡単に偽装可能であることも確認
* 正確なユーザー判別には不向きだが、乱用防止レベルの識別には有効な補助情報になる

#### 🔹 useEffect と通常の関数の違い

* `const hoge = () => {}` は定義しただけでは実行されない。明示的に呼び出す必要がある
* 一方、`useEffect(() => {...}, [...])` は React が自動で呼び出す「副作用処理のフック」であり、**状態が変化したときに自動実行**される
* 特に今回のように `activeTab?.content` を依存配列に含めることで、「メモの内容が変わったらプレビューを取得する」という再実行タイミングを自然に制御できる

#### 🔹 `activeTab?.content` の ?. について

* `activeTab?.content` の `?.` は「オプショナルチェイニング演算子」
* `activeTab` が null や undefined の場合にエラーを出さず、代わりに undefined を返して処理を止めてくれる安全機構
* つまり、activeTab が存在する場合にのみ content を参照するという**安全な条件付きアクセス**になっている

---

### 📝 コミットメッセージ案

```
feat: URLプレビュー機能を追加（Microlink APIによるOGP表示）
```

* メモ本文中に含まれるURLを検出してMicrolinkからOGP情報を取得
* タイトル・画像・説明を含むプレビューカードとして描画
* APIキー不要で動作し、Markdown編集体験が向上
* 今後のキャッシュ戦略や高速化の基盤を整備

---

次はキャッシュ機能や複数URL対応、localStorageによる保存対応にも挑戦可能なフェーズです！
また、OGPの取得方式を外部APIから自前バックエンドに切り替えることで、さらに高度な制御が可能になる将来像も見えてきました。

Obsidianなどの既存ツールの動作原理を知ることで、今後の自作アプリ開発に役立つ視点が多数得られた回となりました。


</br>
</br>
</br>

## 📘 LEARNED.md - ver 1.7（Markdown入力 & プレビュー機能の追加）

---

### ✅ 今回やったこと

* `react-markdown` を導入し、Markdown記法による装飾表示が可能に
* `textarea` で入力された内容をリアルタイムに `<ReactMarkdown>` でプレビュー表示
* Markdownによって、タイトルや太字、リスト、コードブロックなどが整った見た目で表示可能に
* 検索中はハイライト表示（`highlightMatch()`）を使い、それ以外はMarkdown表示と分岐
* `<ReactMarkdown>{activeTab.content}</ReactMarkdown>` の構造と動作原理を理解

---

### 🧠 学び・気づき

#### 🔹 `<ReactMarkdown>` の仕組みとすごさ（タグで囲むだけの手軽さ）

* Markdown文字列をHTML（JSX）に変換する魔法のコンポーネント
* 裏では `remark` ライブラリなどを使って Markdown → 構文木 → React要素 に変換している
* `# 見出し` → `<h1>`、`**太字**` → `<strong>`、リストやコードブロックも自動でHTML化
* JSX内に簡単に組み込めるため、エディタUIとの親和性が高い
* 特に驚くべきは、`<ReactMarkdown>{activeTab.content}</ReactMarkdown>` と**タグで囲むだけで自動でMarkdownが反映される**という手軽さ。導入のハードルが非常に低いのが魅力

#### 🔹 Markdown表示と検索ハイライトの両立について

* Markdown表示中に `<mark>` を差し込むのは構文木操作が必要でやや高度
* 現実的には「検索時はハイライト、それ以外はMarkdown」で切り替える方法が実用的かつ安全
* 条件分岐で `{searchText ? highlightMatch(...) : <ReactMarkdown>...}` の構成が現実解

#### 🔹 JSXの条件描画パターンの違い

```jsx
{cond ? <Component /> : null}  // 三項演算子
{cond && <Component />}        // AND演算子（よりシンプル）
```

* 今回のような「truthy のときだけ表示したい」ケースでは `&&` の方が簡潔
* JSX内での条件描画のバリエーションを習得

#### 🔹 `react-markdown` のインストールと管理

* 自分で `npm install react-markdown` した場合、`package.json` に自動で依存が記録される
* 他の人が `git clone` して使うときも、`npm install` すれば自動でインストールされる
* `node_modules/` は `.gitignore` でGit管理から除外しておくのが基本

---

### 📝 コミットメッセージ案

```
feat: Markdown入力とリアルタイムプレビュー機能を追加
```

* `react-markdown` を導入して、Markdown記法に対応
* 入力中のメモ本文をリアルタイムでHTMLに変換して表示
* 検索時は `highlightMatch()`、それ以外はMarkdown表示に分岐処理
* JSXの条件描画に `&&` パターンを活用

---

次は Markdownの保存拡張、コードブロックのハイライト、TypeScript化などにも挑戦できるフェーズです！

</br>
</br>
</br>

## 📘 LEARNED.md - ver 1.6（検索結果のハイライトと状態設計の深掘り）

---

### ✅ 今回やったこと

* 検索語を含むタブタイトル・本文の一致部分をハイライト表示する機能を追加

  * `highlightMatch(text, keyword)` 関数を実装し、JSX内で `<mark>` タグを使って強調表示
  * `split()` + `RegExp()` + `map()` の合わせ技で、キーワードを含むテキストを柔軟にパーツ分割
  * 大文字小文字の違いを無視して一致させるため、`.toLowerCase()` を比較に活用
* `<mark>` タグのスタイルを `index.css` に追加し、柔らかい見た目に整形
* JSX中の `textarea` に加え、検索語に一致した本文のプレビュー（`<p>`）も表示する構成に調整
* 検索欄と本文の間に余白や区切り線（`<hr>`）を追加し、UIの視認性を改善

---

### 🧠 学び・気づき

#### 🔹 `<mark>` タグのセマンティクス

* `mark` は単なる背景色ではなく、「注目箇所・検索結果」を意味するHTML5の意味付きタグ
* スクリーンリーダーなどの支援技術にも有益な構造であり、意味のあるマークアップが実現できる

#### 🔹 `highlightMatch()` 関数の構造美

```js
const highlightMatch = (text, keyword) => {
  if (!keyword) return text;
  const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <mark key={i}>{part}</mark>
    ) : (
      <span key={i}>{part}</span>
    )
  );
};
```

* 正規表現で検索語をグルーピングしつつ分割
* `map()` と三項演算子で JSX を分岐描画
* `toLowerCase()` による case-insensitive 比較が鍵
* `key` を使って React の再描画最適化も考慮

#### 🔹 `<mark>` と `<span>` を使い分ける理由

* 検索語と一致した部分は `<mark>` でハイライト、それ以外は `<span>` にして通常表示
* 一致／非一致の部分を明確に分離し、視認性と意味を両立させた構成になっている

#### 🔹 `key` 属性の役割と効果

* Reactでは `.map()` で繰り返し描画する際、各要素に一意な `key` を付ける必要がある
* `key` によって React は要素の変更差分を正確に把握し、不要な再描画を防ぐことができる（パフォーマンス最適化）
* 今回は単純な文字列分割なので `index` をそのまま `key` に使っても安全
* 一致箇所が複数あっても、split() で分割された部分は順番に parts[0], parts[1], ... となるため、i（配列のインデックス）をそのまま key として使っても重複せず一意性が保たれる

#### 🔹 CSSを適用するために必要な import

* `index.css` を使う場合は、`index.js` に `import './index.css';` を追加することで全体に適用される

#### 🔹 状態の初期値は意味を持つ

```js
const [tabs, setTabs] = useState([]);              // 配列（データ）
const [activeTabId, setActiveTabId] = useState(null); // ID or null（選択なし）
const [nextTabNumber, setNextTabNumber] = useState(1); // 数字（カウンター）
const [editingTabId, setEditingTabId] = useState(null); // 編集対象ID
const [searchText, setSearchText] = useState('');     // 検索キーワード
```

* 状態が「どんな意味を持っているか」を初期値が物語っている
* `null` を使うことで「まだ何も選ばれていない」などの状態を明示できる

#### 🔹 TypeScript で書けばさらに読みやすくなる予感

* `useState<number | null>(null)` のように型を明示できれば、コードの意図がさらに明確に
* 今の設計はすでに型に分解できるほどしっかりしており、TS化の土台が整っている

---

### 📝 コミットメッセージ案

```
feat: 検索結果のハイライト表示を追加
```

* `highlightMatch()` 関数を追加し、検索語にマッチした部分を `<mark>` タグで強調
* `mark` タグのスタイルを `index.css` に追加して視認性アップ
* 大文字小文字の違いを無視したマッチング処理に対応
* JSX内で `split()` + `map()` による部分描画制御を実現

---

次は TypeScript 化や Markdown対応、保存形式の拡張などに進める土台が整いました！

</br>
</br>
</br>

## 📘 LEARNED.md - ver 1.4（タブタイトルのインライン編集と状態の再設計）

---

### ✅ 今回やったこと

* タブタイトルを「インライン編集」できるように機能追加

  * `editingTabId` を導入し、編集対象のタブIDを一時的に管理
  * `editingTabId === tab.id` の場合に `<input>` を表示、そうでなければ `<button>`
  * `onDoubleClick` で編集モードに入り、`onBlur` や `Enter` キーで編集確定
* 編集中は `autoFocus` を用いて即座に入力可能なUXを実現
* タイトル変更時は `setTabs()` を使って対象の `tab.title` を更新
* 編集後のタイトルも `tabs` の一部として `localStorage` に保存されるため、リロードしても保持される
* JSX内の三項演算子を用いた条件描画に慣れ始めた

---

### 🧠 学び・気づき

#### 🔹 JSX内の三項演算子の活用

* `condition ? <A /> : <B />` という構文は、JSX内で「UIを出し分ける」ための定番手法
* `if` 文が使えない理由は、`if` が「文（statement）」であり、JSXの `{}` 内には「式（expression）」しか書けないため

#### 🔹 `editingTabId` と `activeTabId` の役割の分離

* 編集中のタブ（=タイトルを書き換え中）とアクティブなタブ（=本文を編集中）は**意味が違う**
* 状態を分けておくことで、UIの責任が明確になり、柔軟に制御できる

#### 🔹 `autoFocus` の役割

* `<input autoFocus />` と書くことで、描画と同時にフォーカス（カーソル）を自動で入れることができる
* `autoFocus={true}` と同義。Boolean属性として簡略記法が可能

#### 🔹 JSXとDOMの対応関係への理解

* `return <div>...</div>` は、JavaScriptにおける `document.createElement()` + `appendChild()` の進化形
* Reactは `React.createElement()` を使って仮想DOMを生成し、変更がある部分だけを差分レンダリングする

#### 🔹 `onChange` の基本と応用

* `onChange` は入力要素の値が変更された時に実行されるイベントハンドラ
* `e.target.value` によって、現在の入力内容を取得できる
* `onChange={(e) => setText(e.target.value)}` はReactにおける「Controlled Component」の基本パターン

#### 🔹 状態更新関数における「関数型引数」の意味

* `setNextTabNumber(n => n + 1)` のように関数を渡すことで、**最新の状態を安全に参照して更新**できる
* 同期的な処理内での複数回更新や、競合の回避に有効

#### 🔹 初期値を明示的に与える必要性

* `setNextTabNumber(n => n + 1)` を使うには、**`n` の初期値が必須**
* 初回だけ `setNextTabNumber(2)` を明示しているのは、`"メモ1"` を最初に手動で生成しているから
* 初期値がないまま `+1` をしようとすると `undefined + 1 = NaN` になりバグの原因に

#### 🔹 `useEffect(..., [])` の意味

* 第二引数 `[]` は「依存配列」
* 何も依存していないことを意味するので、**マウント時（初回レンダリング時）に1回だけ実行される**
* `componentDidMount` 相当の処理をReact関数型で書くための定石パターン

#### 🔹 `nextTabNumber` を明示的に持つ設計意図

* `"メモ${nextTabNumber}"` のように連番でタイトルをつける設計では、削除の影響を受けずに一意なタイトルを維持できる
* `tabs.length + 1` を使う方法もあるが、削除があるとタイトル重複のリスクがあるため、状態で保持する方が安全

---

### 📝 コミットメッセージ案

```
feat: タブタイトルのインライン編集機能を実装
```

* `editingTabId` によって編集モードを制御
* 三項演算子で `<button>` / `<input>` を条件分岐
* 編集内容は `tabs` の一部として保持・保存
* `autoFocus` によりUX向上

</br>
</br>
</br>

## 📘 LEARNED.md - ver 1.3（localStorageによる状態の永続化）

### ✅ 今回やったこと

* Reactの`useEffect`を活用して、`tabs`や`activeTabId`、`nextTabNumber`といった状態をlocalStorageに保存
* アプリの起動時にlocalStorageから以前の状態を復元するロジックを追加
* データが存在しない（初回アクセス時）場合は、`メモ1`を自動的に生成するように初期化処理を実装
* localStorageの更新は、`tabs`, `activeTabId`, `nextTabNumber`のいずれかが変化したときに自動で実行されるように構成
* 再読み込み（F5）やブラウザ再起動後でもメモ状態が保持されることを確認

---

### 🧠 学び・気づき

#### 🔹 `useEffect`の本当の役割が見えてきた

* `useEffect` は「**副作用（＝レンダリング以外の処理）を扱う場所**」であり、
  状態の読み書き・保存などの処理はここで行うのが正しい。
* 特に localStorage のように「**外部とやり取りする処理**」は `useState` ではできず、**描画が終わったあとに実行される `useEffect` に書くのが自然**。
* 初回のみ実行するためには、`useEffect(() => {...}, [])` のように **依存配列を空にする**。

#### 🔹 localStorageの仕組みと制約を深く理解した

* **オリジン（プロトコル + ホスト + ポート）ごとに完全に分離されている**ため、別ポートやサブドメインでは共有されない。
* ブラウザを閉じても消えない一方で、**タブをまたいで状態が共有されている**ため、編集競合の可能性がある。
* `sessionStorage` との違いも実感：sessionStorage はタブごとで独立し、タブを閉じると消える。

#### 🔹 保存と復元のロジックの落とし穴に気づいた

* `localStorage.getItem()` で取得できるのは文字列なので、必ず `JSON.parse()` が必要。
* `getItem()` で得られた文字列が `"[]"` のような\*\*「空配列」でも truthy な値\*\*として判定されるため、初期化処理が実行されず不具合が起きる可能性がある。
* 解決策としては、`Array.isArray(parsed) && parsed.length > 0` のような**具体的な中身チェック**が有効だった。

#### 🔹 JSON.parse の失敗例と具体的なリスクを知った

* `"[]"`（空配列）は truthy なので `if (saved)` のような書き方では**初期化処理が実行されない可能性**がある。
* `"[object Object]"` のような誤った文字列を `JSON.parse()` すると `SyntaxError` が発生する。
* 対策として、`Array.isArray(parsed) && parsed.length > 0` のような**構造と中身のチェック**が有効だった。
* `try...catch` でエラーを安全に処理することで、破損した保存データにも耐性のある設計が可能になる。

#### 🔹 TypeScript による型安全な復元処理の可能性を感じた

* JavaScriptでは、`localStorage.getItem()` の戻り値が `string | null` であることを**見落としやすい**。
* `TypeScript` を使うことで、これがコンパイル時に明示的にチェックされるようになり、**nullチェックや型ガードの書き忘れを防げる**。
* また、`unknown` 型から始めて、`Array.isArray()` や `"id" in tab` などで型を徐々に確定させていく流れがとても強力。
* これにより、アプリの復元処理が「**安心して読める構造化された安全なコード**」へと昇華される。

#### 🔹 `.tsx` にするだけでもアプリは動作するという事実

* `App.js` → `App.tsx` にファイル名を変えるだけで、Reactは TypeScript モードに切り替わる。
* 型を明示的に書かなくても動作は可能で、**型の追加を徐々に進められる設計移行がしやすい**。
* `.tsx` にしておくことで、今後の拡張（`type Tab` の導入や `useState<T>()` の活用）が**非常にやりやすくなる基盤が整う**。
* 将来的に型安全を取り入れた設計へとステップアップしたくなったときの「足がかり」として有効。

---

### 📝 コミットメッセージ案

```
feat: localStorage を用いたタブ状態の永続化機能を実装
```

* `useEffect` を使って状態を保存・復元
* 初期化・保存・再読み込み後の復元に対応
* tabs.length === 0 のときの初期化処理も追加
* localStorage の仕様に応じた復元ロジックを強化

</br></br></br>
## 📘 LEARNED.md - ver 1.2（タブ削除機能 & タイトル重複防止）
### ✅ 今回やったこと

* 各タブの横に 🗑 ボタンを設置し、個別に削除できるようにした
* `handleDeleteTab()` 関数を追加し、対象の `tab.id` を除外するように `setTabs()` を更新
* 削除されたタブがアクティブだった場合、先頭の残存タブを自動的に選択するように切り替え処理を追加
* タブのタイトル番号がj重複しないよう、`nextTabNumber` を状態として管理
* `handleAddTab()` で `nextTabNumber` を用いてタイトルを生成し、タブ追加のたびにカウントを進める

---

### 🧠 学び・気づき

* `Array.prototype.filter()` を使って「ある要素を除外した新しい配列」を作れる。

  * 例：`tabs.filter(tab => tab.id !== id)` → 特定のタブIDを除外した一覧を新しく作る（元の配列は壊さない）

* 状態が依存する場合（例：アクティブタブIDが削除されたとき）は、それに合わせて **フォールバック処理** を入れる必要がある。

  * 例：削除されたタブがアクティブだったら `newTabs[0]?.id ?? null` を使って代わりを設定

* `tabs.length + 1` ではなく `nextTabNumber` のように **通し番号を別で管理する方が安全**。

* 状態を分けて管理すると、ロジックが明確で保守しやすくなる（表示用 `title` と内部 `id` は独立しておくと便利）

---

#### ⏱ タイムスタンプを使った ID 管理の理解

（※このセクション末尾に「厳密なID生成関数」の補足あり）

* `Date.now()` を使うことで、**1970年1月1日 00:00:00 UTC** からの経過ミリ秒数を `id` として利用できる。

  * 例：`Date.now()` → `1716185203883` のような13桁の数値
  * 数値なのでソート・比較がしやすく、一意性もある程度確保できる（同じミリ秒内で複数回実行すると重複の可能性はある）

* この「1970年基準」の考え方は UNIX で定められたもので、**UNIXエポック**（UNIX Epoch）と呼ばれる。

  * JavaScriptだけでなく、Python、C、Go、Linuxコマンドなど、多くの言語・環境で共有されている基準
  * これにより、**異なる言語やシステム間でも時刻の共有がしやすくなる**

* `Date.now()` のような仕組みは、**Y2K（2000年問題）には影響を受けなかった**。

  * Y2K問題の原因は「西暦の下2桁だけ保存していたこと」による誤解（例："00"が1900年か2000年か分からない）
  * 一方、`Date.now()` は年ではなく「経過ミリ秒」で記録するため、そういった誤認が起きない

* ただし、32bitシステムでは\*\*2038年問題（Y2K38）\*\*がある。

  * UNIXタイム（秒）を 32bit 整数で扱うと、2038年1月19日でオーバーフロー（2147483647秒）
  * モダンな JavaScript（64bit）やブラウザではすでに対応済みなので問題なし

* 今回のように `id` に `Date.now()` を使うと：

  * `id` の重複を避けやすくなる
  * 整数なのでパフォーマンス的にも軽く、シンプルに管理できる
  * 将来的に「作成日時でソート」なども自然に対応できる

* `Array.prototype.filter()` を使って「ある要素を除外した新しい配列」を作れる。

  * 例：`tabs.filter(tab => tab.id !== id)` → 特定のタブIDを除外した一覧を新しく作る（元の配列は壊さない）

* 状態が依存する場合（例：アクティブタブIDが削除されたとき）は、それに合わせて **フォールバック処理** を入れる必要がある。

  * 例：削除されたタブがアクティブだったら `newTabs[0]?.id ?? null` を使って代わりを設定

* `tabs.length + 1` ではなく `nextTabNumber` のように **通し番号を別で管理する方が安全**。

* 状態を分けて管理すると、ロジックが明確で保守しやすくなる（表示用 `title` と内部 `id` は独立しておくと便利）

* `Array.prototype.filter()` を使って「ある要素を除外した新しい配列」を作れる

* 状態が依存する場合（例：アクティブタブIDが削除されたとき）は、それに合わせて **フォールバック処理** を入れる必要がある

* `tabs.length + 1` ではなく `nextTabNumber` のように **通し番号を別で管理する方が安全**

* 状態を分けて管理すると、ロジックが明確で保守しやすくなる（表示用 `title` と内部 `id` は独立しておくと便利）

---

#### 🛡️ 厳密に ID を管理するには？

* `Date.now()` は簡易的な一意性が欲しいときには便利だが、**厳密な一意性が絶対に必要な場面ではやや不十分**。
* 特に「同じミリ秒内に複数のIDが生成される可能性」や、「時間を操作された環境での衝突」などの懸念がある。

##### ✅ JavaScript で使える一意な ID 生成手段：

1. **`crypto.randomUUID()`**（推奨・モダン環境）

```js
const id = crypto.randomUUID();
// 例: 'de305d54-75b4-431b-adb2-eb6b9e546014'
```

* 128bitのUUID（バージョン4）を安全な乱数で生成
* 重複の心配ほぼなし、ユースケースに広く対応
* モダンなブラウザやNode.js（v14.17以降）で使用可能

2. **`uuid` ライブラリ（npm）を使う**

```bash
npm install uuid
```

```js
import { v4 as uuidv4 } from 'uuid';
const id = uuidv4();
```

* サーバー/クライアント問わず安定して使える定番手段

##### 💡 使い分けの目安：

| 手法                    | 特徴           | 用途例                 |
| --------------------- | ------------ | ------------------- |
| `Date.now()`          | 軽量・数値・お手軽    | タブID、UI側の一時データなど    |
| `crypto.randomUUID()` | 安全・厳密・衝突しにくい | データベースID、ログ、セッションなど |
| `uuid` ライブラリ          | 多用途・信頼性高い    | 大規模アプリ、APIリソース識別など  |

---

### 📝 コミットメッセージ案

```
feat: タブ削除機能とタイトル重複防止用の通し番号管理を追加
```

* 各タブの横に 🗑 ボタンを設置し、個別に削除できるようにした
* `handleDeleteTab()` 関数を追加し、対象の `tab.id` を除外するように `setTabs()` を更新
* 削除されたタブがアクティブだった場合、先頭の残存タブを自動的に選択するように切り替え処理を追加
* タブのタイトル番号が重複しないよう、`nextTabNumber` を状態として管理
* `handleAddTab()` で `nextTabNumber` を用いてタイトルを生成し、タブ追加のたびにカウントを進める

---
</br></br></br>

## ✅ 今回やったこと(ver1.1)

* `useState` を使ってメモ（タブ）一覧を状態として管理
* 各タブに `id`, `title`, `content` を持たせて構造化
* `activeTabId` を使って現在のタブを跡貫
* `tabs.map()` で全タブをボタンとして描画
* タブのクリックでアクティブなタブを切り替え
* `＋` ボタンで新しいタブを追加し、自動的に選択状態に
* アクティブなタブの本文を `<textarea>` で編集できるようにした
* `handleChangeContent` の実装により、特定のタブだけを更新するロジックを経由

---

## 🧠 学び・気づき

* タブの状態をオブジェクト配列で持つことで、**構造がシンプルに保てる**
* `id` を `Date.now()` で生成すると、**indexより安定して跡貫できる**
* 条件付きで `style` を切り替えることで、選択中のUIが簡単に実現できる
* `map()` による描画と状態管理は React の基本構k造！
* 最小限の構成（`App.js`, `index.js`）でもアプリが動くという安心感！
* `textarea` は React の **Controlled Component** の例：状態が全てを管理する
* React はレンダリングが起きるたびに **Virtual DOM で少ない部分だけ更新するため高速**
* `onChange` は入力のたびに呼ばれるが、軽い理由がわかった

---

## 🛠 次にやりたいこと

* タブ削除（🗑）機能の追加
* データの保存先を localStorage or API に切り替える
* Markdown入力 & プレビューもゆくゆく試してみたい

---

## 📝 コミットメッセージ案

```
feat: タブの追加と切り替え機能を実装（本文編集機能付き）
```

---

## 🗂 フォルダ構成（最小構成）

```txt
src/
├── App.js        ← メインUI
└── index.js      ← エントリーポイント
```


</br>
</br>
</br>

## ver1.0

## ✅ 今回やったこと

* `useState` を使ってメモ（タブ）一覧を状態として管理
* 各タブに `id`, `title`, `content` を持たせて構造化
* `activeTabId` を使って現在のタブを跡貫
* `tabs.map()` で全タブをボタンとして描画
* タブのクリックでアクティブなタブを切り替え
* `＋` ボタンで新しいタブを追加し、自動的に選択状態に

---

## 🧠 学び・気づき

* タブの状態をオブジェクト配列で持つことで、**構造がシンプルに保てる**
* `id` を `Date.now()` で生成すると、**indexより安定して跡貫できる**
* 条件付きで `style` を切り替えることで、選択中のUIが簡単に実現できる
* `map()` による描画と状態管理は React の基本構造！
* 最小限の構成（`App.js`, `index.js`）でもアプリが動くという安心感！

---

## 🛠 次にやりたいこと

* `textarea` を使ってメモの本文を編集できるようにする
* タブ削除（🗑）機能の追加
* データの保存先を localStorage or API に切り替える
* Markdown入力 & プレビューもゆくゆく試してみたい

---

## 📝 コミットメッセージ案

```
feat: タブの追加と切り替え機能を実装
```

---

## 🗂 フォルダ構成（最小構成）

```txt
src/
├── App.js        ← メインUI
└── index.js      ← エントリーポイント
```
