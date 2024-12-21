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
    グラフ作成api
      - ip_vg_curve.py 橋本亘
      - ip_vp_curve.py　岡田
      - vp_vg_curve.py　未定
    - calculations/
      計算api 計算結果を返す
      - calculations_a.py 村瀬
  - template/
    - index.html 梶原
  - static/
    - graf/
      グラフ描写用js pyファイルに値を送るために使う
      - ip_vg_curve.js 橋本亘
      - ip_vp_curve.js 岡田
      - vp_vg_curve.js 未定
    - calculations/
    　計算結果用js　pyファイルに値を送るために使う
      - calculations_a.js　村瀬
    - comment
      - comment.py 川端
  - app.py　基本誰も変更しない

## 実際のデータの動き
  
  ip_vg_curve.pyによりip_vg特性曲線を作成、接線を引く 接線は現状はユーザに入力させる
  
  ip_vp_curve.py,vp_vg_curve.pyに値を渡し、グラフを作成
  
　ip_vg_curve.pyよりcalculations_a.pyに値を渡し、gmの計算

　ip_vp_curve.pyよりcalculations_a.pyに値を渡し、gamma_pを計算

　gm.py,gamma_p.pyよりcalculations_a.pyに値を渡し、muを計算

　 vp_vg_curve.pyよりcalculations_a.pyに値を渡し、mu(vp_vg特性曲線より得られるμ)を計算

  htmlに帰ってきた内容を書く

## 　各データの形式

  ip_vg特性曲線用のinputデータ
  incは増加、decは減少過程 要素数9の配列

  ```json
  input_ip_vg:{
    "vp_230":{
      "inc":[
        0.00, 0.10, 0.50, 1.45, 3.30, 6.20, 10.00, 15.25, 21.80
      ],
      "dec":[
        0.00, 0.10, 0.50, 1.50, 3.30, 6.25, 10.10, 15.35, 21.70
      ]
    },
    "vp_250":{
      "inc":[
        0.05, 0.35, 1.10, 2.60, 5.00,8.40, 12.80, 18.50, 25.60
      ],
      "dec":[
        0.05, 0.35, 1.10, 2.65, 4.95 8.35, 12.85, 18.40, 25.50
      ]
    },
    "vp_270":{
      "inc":[
        0.25, 0.85, 2.05, 4.10, 7.00, 10.85, 15.95, 22.00, 29.55
      ],
      "dec":[
        0.25, 0.80, 2.00, 4.05, 6.90, 10.90, 15.70, 21.95, 29.50
      ]
    }
  }  
  ```

  gm計算用の値 json、辞書型データ
  
  ```json
  calculation_gm:{
    // 動作点のip
    "ip_default":12.90,
    //vg=-6のときのip
    "vg_minus6_ip":17.70,
    // ip=0のときのvg
    // この値は絶対値にして計算したい
    "ip_0_vg":-13.20
  }  
  ```

　ip_vp特性曲線用のinputデータ
  -6,-8,-10Vのデータを作成する
  要素数3の配列

  ```json
  input_ip_vp:{
    "vg_minus6":[
      15.30,18.45,21.98
    ],
    "vg_minus8":[
      10.5,12.83,15.83
    ],
    "vg_minus10":[
      6.23,8.38,10.88
    ]
  }  
  ```

  gamma_p計算用の値 json、辞書型データ
  
  ```json
  calculation_gamma_p:{
    //vp=180のときのip(vg=-8V)
    "vp_180_ip":3.00,
    //vp=300のときのip(vg=-8V)
    "vp_300_ip":20.3,
  }  
  ```

  vp_vg特性曲線用のinputデータ
  ip_defaultは接線を引いたところのip
  要素数3の配列

  ```json
  input_vp_vg:{
    // 動作点のip
    "ip_default":12.90,
    "vg_minus5":[
      15.30,18.45,21.98
    ],
    "vg_default":[
      10.5,12.83,15.83
    ],
    "vg_plus5":[
      6.23,8.38,10.88
    ]
  }  
  ```

  mu計算用の値はgm,gamma_pを計算より出して渡すため、pythonの関数の引数に入れるだけでいい

## プロジェクトの作業分担 詳細はissue

| 役割     | 氏名       | 学籍番号 | 担当箇所                      |
| -------- | ---------- | -------- | ----------------------------- |
| リーダー | 橋本粋人   | K23095   | 進捗の管理                    |
| メンバー | 川端文人   | K23043   | 曜日わけしたコメントを作成    |
| メンバー | 橋本亘     | K23096   | ip_vg特性曲線の作成P100の上側 |
| メンバー | 岡田隆之介 | K23023   | ip_vp特性曲線の作成P100の左下 |
| メンバー | 梶原陽     | K23032   | 入力フォームを作成            |
| メンバー | 村瀬瑠月   | K23126   | 計算                          |

## 制作の流れ

- 川端
- 橋本亘
- 岡田
- 梶原
- 村瀬