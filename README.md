### 作者

加賀井　凰我

### アプリ名

Restaurants Finder

#### コンセプト

周辺のレストランの情報を視覚的にわかりやすく、店舗にアクセスしやすくなるアプリ。

#### こだわったポイント

- 検索一覧のレストラン情報を google maps の API を用いて視覚的にわかりやすく、行きたい店舗にアクセスしやすくしました。
- ページ選択バーを画面の最下部ではなく、マップと一覧情報の間にすることにより、ユーザーがスクロールする回数を減少させ使用感をより良いものにしました。
- ページ選択バーの左側に 1 ページ目に戻るボタンを追加することで使用感を向上させました。
- 一般的に普及している google に似たデザインにすることでユーザーが親しみやすいデザインにしました。

### 該当プロジェクトのリポジトリ URL（GitHub,GitLab など Git ホスティングサービスを利用されている場合）

https://github.com/mikage2006/restaurants-finder

## 開発環境

### 開発環境

Visual Studio Code

### 開発言語

TypeScript+JavaScript(React+Vite)

## 動作対象端末・OS

### 動作対象 OS・Browser

Google Chrome (version: 131.0.6778.205)

## 開発期間

6 日

## アプリケーション機能

### 機能一覧

- レストラン検索：ホットペッパーグルメサーチ API と Gelocation API を使用して、現在地周辺の飲食店を検索する。
- レストラン情報取得：ホットペッパーグルメサーチ API を使用して、飲食店の詳細情報を取得する。
- レストラン詳細情報: ホットペッパーグルメサーチ API を使用して、詳細情報を取得したのち、さらに任意のボタンによってホットペッパーグルメの店舗情報ページに移動する。
- google maps 連携: google map の API を使用して、検索したレストランの位置と現在地からの距離をマップに表示する。

### 画面一覧

- 検索画面 ：検索範囲を指定してレストランを検索する。
- 一覧画面 ：検索結果の飲食店を一覧表示し、現在地と店舗の位置をマップに表示する。

### 使用している API,SDK,ライブラリなど

- ホットペッパーグルメサーチ API
- Geolocation API
- Google Maps JavaScript API
- React+Vite(Typescript)

### アドバイスして欲しいポイント

- IOS や Android などの携帯端末にも対応させたい。
- UI のデザインや画面全体の配置などの改善ポイントが知りたい。
- 他人が見やすいコードの書き方を知りたい。
- 細かい機能として追加したほうが良い機能が知りたい。

### 自己評価

知識不足で、TypeScriptやReact、corsについて勉強するために期間の半分を使ったので開発期間が大幅に削れてしまったのが失敗だったと考えています。
アプリについては、
- 詳細情報のモックアップで価格帯を表示
- 選択条件を連携させた絞り込み機能
  
を追加したかったのですが時間的な要因と知識不足による技術不足により実装できませんでした。
次にアプリ開発を行うときには、事前に必要な知識を考え、それを習得してから他の似た機能のアプリを研究し、そのアプリの良い点を取り込みながら独自の機能を実装したいと考えています。
