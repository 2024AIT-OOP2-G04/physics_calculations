import numpy as np

# 初期設定
vp = 250.0  # プレート電圧
vg = -8.0   # グリッド電圧

# サンプルデータ: (x, y)
# 実験データをここに入力してください
data = [
    (250.0, -8.0, 1.5), (250.0, -8.0, 2.2), (250.0, -8.0, 1.9), 
    (250.0, -8.0, 1.8), (250.0, -8.0, 2.1)
]

# 条件1: Ipを計算 (250V, -8Vの平均)
def calculate_Ip(data, vp, vg):
    relevant_data = [entry[2] for entry in data if entry[0] == vp and entry[1] == vg]
    if len(relevant_data) > 0:
        # 平均値を計算
        avg = np.mean(relevant_data)
        # 有効数字1桁に丸めて最後に0を付ける
        rounded = round(avg, -int(np.floor(np.log10(abs(avg)))) + 1)  # 有効数字1桁に丸める
        return float(f"{rounded:.1g}")  # 文字列として処理して最後に0を付加
    else:
        return None
    
print("vp = 250.0 V")
print("vg = -8.00 V")    

# Ipを計算
Ip = calculate_Ip(data, vp, vg)
print(f"Ip = {Ip} mA")

# 条件2: yが0または5で終わる点を取得
def filter_points(data):
    candidates = []
    for x, y in [(d[0], d[2]) for d in data]:  # (x, y)に変換
        # yが0または5で終わる
        if y % 5 == 0:
            # xも0または5で終わる場合を優先
            if x % 5 == 0:
                candidates.append((x, y, 1))  # 優先度1
            # 次に偶数のx
            elif x % 2 == 0:
                candidates.append((x, y, 2))  # 優先度2
            else:
                candidates.append((x, y, 3))  # 優先度3
    return sorted(candidates, key=lambda p: p[2])  # 優先度でソート

# 条件に従った点を取得
filtered_points = filter_points(data)

# 十分に離れた2点を選ぶ
if len(filtered_points) >= 2:
    point1 = filtered_points[0]
    point2 = None
    for p in filtered_points[1:]:
        if abs(p[0] - point1[0]) > 2:  # 適度な距離を確保
            point2 = p
            break
    if point2:
        print("選ばれた2点:", point1[:2], point2[:2])
    else:
        print("十分に離れた2点が見つかりませんでした。")
else:
    print("条件を満たす点が少なすぎます。")
