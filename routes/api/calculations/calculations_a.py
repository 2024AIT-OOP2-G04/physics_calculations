from flask import Flask, request, jsonify
import numpy as np
import json

app = Flask(__name__)

# 初期設定
vp = 250.0  # プレート電圧
vg = -8.00  # グリッド電圧

# 入力データ構造
input_data = {
    "input_ip_vg": {
        "vp_230": {
            "inc": [0.00, 0.10, 0.50, 1.45, 3.30, 6.20, 10.00, 15.25, 21.80],
            "dec": [0.00, 0.10, 0.50, 1.50, 3.30, 6.25, 10.10, 15.35, 21.70]
        },
        "vp_250": {
            "inc": [0.05, 0.35, 1.10, 2.60, 5.00, 8.40, 12.80, 18.50, 25.60],
            "dec": [0.05, 0.35, 1.10, 2.65, 4.95, 8.35, 12.85, 18.40, 25.50]
        },
        "vp_270": {
            "inc": [0.25, 0.85, 2.05, 4.10, 7.00, 10.85, 15.95, 22.00, 29.55],
            "dec": [0.25, 0.80, 2.00, 4.05, 6.90, 10.90, 15.70, 21.95, 29.50]
        }
    },
    "calculation_gm": {
        "ip_default": 12.90,  # 表示する Ip の値
        "vg_minus6_ip": 17.7,
        "ip_0_vg": -13.20
    },
    "calculation_gamma_p": {
        "vp_180_ip": 3.00,  # mA
        "vp_300_ip": 20.3   # mA
    },
    "input_vp_vg": {
        "ip_default": 12.90,
        "vg_minus5": [15.30, 18.45, 21.98],
        "vg_default": [10.5, 12.83, 15.83],
        "vg_plus5": [6.23, 8.38, 10.88]
    },
    "calculation_mu": {
        "vp_180_vg": -3.90,
        "vp_300_vg": -10.80
    }
}
calculation_gm_data = {
    "calculation_gm": {
        "ip_default": 12.90,  # 表示する Ip の値
        "vg_minus6_ip": 17.7,
        "ip_0_vg": -13.20
    }
}

calculation_gamma_p_data = {
    "calculation_gamma_p": {
        "vp_180_ip": 3.00,  # mA
        "vp_300_ip": 20.3   # mA
    }
}    

calculation_mu_data={
    "calculation_mu": {
        "vp_180_vg": -3.90,
        "vp_300_vg": -10.80
    }
}


# gmの計算
def calculate_gm(data):
    vg_minus6_ip = data["calculation_gm"]["vg_minus6_ip"] * 0.001  # mA → A
    ip_0_vg = abs(data["calculation_gm"]["ip_0_vg"])  # 絶対値を取る
    
    delta_ip = vg_minus6_ip  # ΔIp
    delta_vg = ip_0_vg - 6.0  # ΔVg

    gm = delta_ip / delta_vg
    return gm

# γpの計算
def calculate_gamma_p(data):
    vp_180_ip = data["calculation_gamma_p"]["vp_180_ip"] * 0.001  # mA → A
    vp_300_ip = data["calculation_gamma_p"]["vp_300_ip"] * 0.001  # mA → A

    delta_vg = 300 - 180  # ΔVg
    delta_ip = vp_300_ip - vp_180_ip  # ΔIp

    gamma_p = delta_vg / delta_ip
    return gamma_p

# μの計算
def calculate_mu(gm, gamma_p):
    mu = gm * gamma_p
    return mu

# Vp-Vgからのμ計算
def calculate_myu(data):
    vp_180_vg = data["calculation_mu"]["vp_180_vg"]
    vp_300_vg = data["calculation_mu"]["vp_300_vg"]

    # Vp-Vg の差分を計算
    delta_vg = 300 - 180  # Vgの差分
    delta_vp = vp_300_vg - vp_180_vg  # Vpの差分

    # μの計算
    myu = delta_vg / abs(delta_vp)
    return myu


# 計算の実行
Ip_default = calculation_gm_data["calculation_gm"]["ip_default"]  # Ip のデフォルト値を取得
gm = calculate_gm(calculation_gm_data)                            # gm計算
gamma_p = calculate_gamma_p(calculation_gamma_p_data)                 # γp計算
mu = calculate_mu(gm, gamma_p)                          # μ計算
myu = calculate_myu(calculation_mu_data)                         # Vp-Vg曲線からのμ計算


# 結果の出力
print(f"vp = {vp} V")
print(f"vg = {vg:.2f} V")
print(f"Ip = {Ip_default:.2f} mA")
print(f"gm = {gm:.6f} Ω-1乗")
print(f"gamma_p = {gamma_p:.2f} Ω")
print(f"μ (gm・γp) = {mu:.2f}")
print(f"μ (vp-vg) = {myu:.2f}")

if __name__ == '__main__':
    app.run(debug=True)