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
      - mu_vp_vg.py
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
      - mu_vp_vg.py
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
      - mu_vp_vg.py
      - input_form/
        - 好きに作る
  - app.py

## 　各データの形式
  htmlに入力した表のデータはjson形式で、

  ip_vg_curve.pyによりip_vg特性曲線を作成、接線を引く
  
  ip_vp_curve.py,vp_vg_curve.pyに値を渡し、グラフを作成
  
　ip_vg_curve.pyよりgm.pyに値を渡し、gmの計算
 
　ip_vp_curve.pyよりgamma_p.pyに値を渡し、gamma_pを計算
 
　gm.py,gamma_p.pyよりmu.pyに値を渡し、muを計算
　
　vp_vg_curve.pyよりmu_vp_vg.pyに値を渡し、mu(vp_vg特性曲線より得られるμ)を計算

  htmlに帰ってきた内容を書く

  

  jsonの中身

  ```json
    "vp230":{
      "inc":[
        1,2,3
      ]
      "dec":[
        1,2,3
      ]
    },
    "vp250":{
      "inc":[
        1,2,3
      ]
      "dec":[
        1,2,3
      ]
    },
    "vp270":{
      "inc":[
        1,2,3
      ]
      "dec":[
        1,2,3
      ]
    }
  ```

## プロジェクトの作業分担 詳細はissue

| 役割 | 氏名 | 学籍番号 | 担当箇所 | 
| -------------- | -------------- | ----------- | -------------------------------------- | 
| リーダー | 橋本粋人 | K23095 |   |  |  
| メンバー | 川端文人 | K23043 |   |  |  
| メンバー | 橋本亘 | K23096 |   |  |  
| メンバー | 岡田隆之介 | K23023 |   |  |  
| メンバー | 梶原陽 | K23032 |   |  |  

