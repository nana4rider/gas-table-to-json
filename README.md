# gas-table-to-json
スプレッドシートのテーブルをJSONで取得するWeb API

## 導入
* プロパティに項目を追加  
`[sheet]`はgetパラメータで指定する
```
[sheet]_SPREAD_SHEET_ID=[スプレッドシートのID]
[sheet]_SHEET_NAME=[シート名]
[sheet]_SEARCH_COLUMN=[検索対象列(デフォルト1)]
```

## 実行
```
https://script.google.com/macros/s/[このスクリプトのID]/exec?sheet=[sheet]&search=[検索文字列(オプション)]
```

## プロジェクトのデプロイ
```
npm run deploy
```

## appsscript.jsonのダウンロード
```
npm run pull
```
