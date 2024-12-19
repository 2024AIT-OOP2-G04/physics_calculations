# 物理実験T12の計算を行ってくれるアプリ

## コーディングルール

## ブランチ名

## コミットメッセージ

## デザイン案

figmaで作成
<https://www.figma.com/design/Gr80gdfILDFXDs2F4B4hEC/oop2_%E8%87%AA%E7%94%B1%E8%AA%B2%E9%A1%8C?node-id=1-2&p=f&t=hIriKCd0JuMXlyLH-0>

## 使用技術

## ディレクトリ構造

- root/
  - api/
    - graf/
      - ip_vg_curve.py
      - ip_vp_curve.py
      - vp_vg_curve.py
    - calculations/
      - gm.py
      - gamma_p.py
      - mu.py
    - input_form/
      - 好きに作る
  - template/
    - index.html
    - graf/
      - ip_vg_curve.html
      - ip_vp_curve.html
      - vp_vg_curve.html
    - calculations/
      - gm.html
      - gamma_p.html
      - mu.html
    - input_form/
      - 好きに作る
  - static/
    - graf/
      - ip_vg_curve.js
      - ip_vp_curve.js
      - vp_vg_curve.js
    - calculations/
      - gm.js
      - gamma_p.js
      - mu.js
      - input_form/
        - 好きに作る
  - app.py

## 　各データの形式

  htmlに入力した表のデータはjson形式で、
  pyファイルで読み取って計算
  jsファイルにて計算結果をfetch
  htmlに帰ってきた内容を書く

  jsonの中身間違ってたらごめん

  ```json
    "vp230":[
      "inc":[
        1,2,3
      ]
      "dec":[
        1,2,3
      ]
    ]
    "vp250":[
      "inc":[
        1,2,3
      ]
      "dec":[
        1,2,3
      ]
    ]
    "vp270":[
      "inc":[
        1,2,3
      ]
      "dec":[
        1,2,3
      ]
    ]
  ```

## プロジェクトの作業分担
