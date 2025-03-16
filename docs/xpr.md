# xpr 仕様書

xpath を定義するためのファイル（xpath rule definition file）です。

## 目的

サイトを翻訳する際の翻訳対象要素を選択するために使用する xpath を記述するためのファイルです。

## 定義

`<>`は必須の変数です。\
`[]`は任意で指定できる変数です。\
`...`は可変長の配列です。この記号の前の変数を任意の回数繰り返すことができます。\
`,`は変数の区切りを表す記号で、実際は改行`\n`です。`,`は省略できません。

変数の順番は入れ替えることができません。

## 変数の定義

- `comment`\
  改行`\n`を除く任意の文字列です。
- `comment-block`\
  改行を含む任意の文字列です。`-%`はコメントの終わりと判断されるため使用できません。
- `key`\
  翻訳キーをピリオド（`.`）区切りで指定します。翻訳キーには英数字とアンダースコア`_`が使用できます。
- `directory-path`\
  ディレクトリのパスを指定する文字列です。ASCII 文字以外や空白記号を指定する場合は URL エンコードを行ってください。\
  必ずスラッシュ`/`から始める必要があります。\
  ワイルドカードが指定でき、`/@d`は１つの階層のパスを、`/@p`は１つ以上の階層のパスを、`/@f`は任意のファイルを指定できます。\
  例:
  - `/home/@d` → `/home/login`にマッチし、`/home`や`/home/settings/account`にはマッチしません。
  - `/home/@p` → `/home/register`や`/home/settings/account`にマッチし、`/home`にはマッチしません。
  - `/home/@f` → `/home`や`/home/login.php`にマッチし、`/home/login`にはマッチしません。
- `xpath`\
  実際の xpath です。必ずスラッシュ`/`またはコロン 2 つとスラッシュ`::/`から始める必要があります。\
  `::/`は`document.body`からの絶対パス、`/`は`document.body > div#app > main`からの絶対パスになります。
- `multiSelect`\
  要素を複数選択するかどうかを指定します。`*`を指定すると xpath にマッチする要素すべて、省略すると、最初にマッチした要素のみを選択します。
- `attribute`\
  要素のテキストを別の言語に置換するときに、指定した属性の値を置換するようにします。\
  省略時は`.textContent = 値`で、`[属性名]`とすると`.setAttribute(属性名, 値)`となります。
- `customCSS`\
  要素にカスタムなスタイルを適用します。スタイルはシングルクォーテーション`'`で囲み、`プロパティ:値`の形式（例：`'width:150px'`）で指定します。\
  プロパティが複数ある場合はセミコロンで区切り（例：`'width:150px;height:100px'`）、スペースを含めてはいけません。

## 基本構文

- コメントの定義

  - `%`\
    行コメントです。コンバータは、この記号から改行`\n`までの文字列を無視（削除）して出力します。
    - `% <comment>`
  - `%- -%`\
    コメントブロックです。コンバータは、`%-`から`-%`までの改行を含む文字列を無視（削除）して出力します。
    - `%- <comment-block> -%`

- メタデータの定義

  ファイルがどのような振る舞いをしてほしいかを定義します。\
  メタデータはファイルの先頭に記述し、**ノードより後に記述することはできません**。

  - `@includes`\
    要素の選択を実行する対象の URL のディレクトリパスです。\
    これは改行区切りで複数指定できます。パスは最低でも１つ必要です。\
    この項目は省略できません。
    - `@includes { <directory-path>, [directory-path], ... }`
  - `@excludes`\
    `@includes`にマッチしたパスのうち、要素の選択を実行**しない** URL のディレクトリパスです。\
    `@includes`と同じく改行区切りで複数指定できます。
    - `@excludes { [directory-path], ... }`

- ノードの定義
  - 子ノード (`node`変数と同義です)
    xpath で要素を選択する一つのノードです。親がいる場合、親ノードで定義されている xpath と multiSelect を継承します。\
    子ノードは`key`または`customCSS`の**どちらかを必ず**指定する必要があります。\
    テキストノード`/text()`に customCSS を指定することはできません。ただし、コンバータはエラーを出しません。
    - `<xpath> [multiSelect] [attribute] [customCSS] [key],`
  - 親ノード（ネスト可能で、子を持つことができるノード）
    指定した xpath の中に複数の子ノードを含めることができます。\
    その際、子ノードは親ノードで定義されている xpath と multiSelect の値を継承します。
    - `<xpath> [multiSelect] { <node>, [node], ... }`

## xpath の省略記法

- id の指定\
  `div[@id="test"]`は`div#test`と省略することができます。
- クラス名の指定\
  `div[contains(concat(" ", normalize-space(@class), " "), " test ")]`は`div.test`と省略することができます。
- 範囲指定\
  `div[position() >= 1 and position() <= 4]`は`div[1:4]`と省略することができます。\
  `div[position() = 1 or position() = 3]`は`div[1,3]`と省略することができます。\
  注: `[1,2]`や`[1:2]`を使用した場合、マルチセレクタ`*`を付与しなければいけません。ただし、省略してもコンバータはエラーを出しません。

## 実際の例

```
@includes {
  /home/emailtwofactorauth
}

% 確認コード入力フォーム
//form.e2a7b8x6[1]/div[1] {
  % 見出し
  /h4[1] PAGE._EMAILTWOFACTORAUTH.HEADER
  % 説明
  /p[1] PAGE._EMAILTWOFACTORAUTH.PARAGRAPH
  % 無効なコード
  /div[2]/p[1] FORM.VALIDATION
  % 次へ
  //button.e7cdgnz1[1] INPUT.BUTTON
  % これは何？
  /div.e1cgibpb4[1] {
    % 見出し
    //div.e1cgibpb2[1] PAGE._EMAILTWOFACTORAUTH.HEADER
    % 説明
    /div.e1cgibpb1[1] PAGE._EMAILTWOFACTORAUTH.PARAGRAPH
  }
  % ログアウト
  /a.e18c1r7j6[1] INPUT.BUTTON
}
```

上記の xpr ファイルを変換すると以下の中間的な JSON が得られます。
※`transKeys`には`keys.json`の内容が入ります。
```json
{
  "includes": ["/home/emailtwofactorauth"],
  "excludes": [],
  "transKeys": {},
  "nodes": [
    {
      "xpath": "//form.e2a7b8x6[1]/div[1]",
      "nodes": [
        {
          "key": "PAGE._EMAILTWOFACTORAUTH.HEADER",
          "xpath": "/h4[1]",
          "multi": false,
          "attribute": null,
          "custom": null
        },
        {
          "key": "PAGE._EMAILTWOFACTORAUTH.PARAGRAPH",
          "xpath": "/p[1]",
          "multi": false,
          "attribute": null,
          "custom": null
        },
        {
          "key": "FORM.VALIDATION",
          "xpath": "/div[2]/p[1]",
          "multi": false,
          "attribute": null,
          "custom": null
        },
        {
          "key": "INPUT.BUTTON",
          "xpath": "//button.e7cdgnz1[1]",
          "multi": false,
          "attribute": null,
          "custom": null
        },
        {
          "xpath": "/div.e1cgibpb4[1]",
          "nodes": [
            {
              "key": "PAGE._EMAILTWOFACTORAUTH.HEADER",
              "xpath": "//div.e1cgibpb2[1]",
              "multi": false,
              "attribute": null,
              "custom": null
            },
            {
              "key": "PAGE._EMAILTWOFACTORAUTH.PARAGRAPH",
              "xpath": "/div.e1cgibpb1[1]",
              "multi": false,
              "attribute": null,
              "custom": null
            }
          ]
        },
        {
          "key": "INPUT.BUTTON",
          "xpath": "/a.e18c1r7j6[1]",
          "multi": false,
          "attribute": null,
          "custom": null
        }
      ]
    }
  ]
}
```
