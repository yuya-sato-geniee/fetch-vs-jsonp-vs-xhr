# fetch が早いのか jsonp が早いのか

## 結果

![https://i.imgur.com/77oxCA8.png](https://i.imgur.com/77oxCA8.png)

* 何回か計測した感じ、標準偏差は結構変動するのであまり当てにならなかった
* fetch が若干遅そう？
* 計測にはあまり反映されてないが、jsonp以外の手段だとたまにめっちゃ遅くなる。jsonpは安定してた
* 何回か計測した感じ、XHR が早い
* そもそも適切な条件下でテストできてるのかよくわからない

## ちゃんと考慮した部分

* cache は効かなくした
    - 適当にquerystringを振った
* V8 の Optimize が走らないようにした
    - depotimize させてるのではなく、そもそも TurboFan に見逃してもらってる気がする。多分
* HTTP/2 に揃えた
    - あまりHTTP/1と差がなかったから不要だったかも
* ページ読み込み直後は処理がいろいろありそうだったので、そのタイミングでの計測を避けた
* GC をそれっぽく走らせた
    - 意味があったかどうかは不明

## 考慮できてない部分

* 他になにか Optimize が効いてる気もする・・・

## 自分で実行したい場合

requirement: 新しめのnodeが必要、google chrome

install:

```bash
git clone git@github.com:yuya-sato-geniee/fetch-vs-jsonp-vs-xhr.git
cd fetch-vs-jsonp-vs-xhr
npm install
node http2.js
```

↑をしたら、 https://localhost:3000/ アクセス可。https なので間違えないよう注意

ただし、V8の機能を使うための特殊記法があるため、そのままアクセスしても正しく動作しない。

そのため、 `open /Applications/Google\ Chrome.app --args --js-flags="--allow-natives-syntax"` 

のようにして Chrome を開く必要がある
