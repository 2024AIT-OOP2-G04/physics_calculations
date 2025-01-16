// Python の関数を JavaScript に変換したもの

// gm の計算
function calculate_gm(data) {
    const vg_minus6_ip = data.calculation_gm.vg_minus6_ip * 0.001;  // mA → A
    const ip_0_vg = Math.abs(data.calculation_gm.ip_0_vg);  // 絶対値を取る

    const delta_ip = vg_minus6_ip;  // ΔIp
    const delta_vg = ip_0_vg - 6.0;  // ΔVg

    const gm = delta_ip / delta_vg;
    return gm;
}

// γp の計算
function calculate_gamma_p(data) {
    const vp_180_ip = data.calculation_gamma_p.vp_180_ip * 0.001;  // mA → A
    const vp_300_ip = data.calculation_gamma_p.vp_300_ip * 0.001;  // mA → A

    const delta_vg = 300 - 180;  // ΔVg
    const delta_ip = vp_300_ip - vp_180_ip;  // ΔIp

    const gamma_p = delta_vg / delta_ip;
    return gamma_p;
}

// μ の計算
function calculate_mu(gm, gamma_p) {
    const mu = gm * gamma_p;
    return mu;
}

// Vp-Vg からの μ 計算
function calculate_myu(data) {
    const vp_180_vg = data.calculation_mu.vp_180_vg;
    const vp_300_vg = data.calculation_mu.vp_300_vg;

    // Vp-Vg の差分を計算
    const delta_vg = 300 - 180;  // Vg の差分
    const delta_vp = vp_300_vg - vp_180_vg;  // Vp の差分

    // μ の計算
    const myu = delta_vg / Math.abs(delta_vp);
    return myu;
}

// 計算に使用するデータ
const calculation_gm_data = {
    "calculation_gm": {
        "ip_default": 12.90,  // Ip のデフォルト値
        "vg_minus6_ip": 17.7,
        "ip_0_vg": -13.20
    }
};

const calculation_gamma_p_data = {
    "calculation_gamma_p": {
        "vp_180_ip": 3.00,  // mA
        "vp_300_ip": 20.3   // mA
    }
};

const calculation_mu_data = {
    "calculation_mu": {
        "vp_180_vg": -3.90,
        "vp_300_vg": -10.80
    }
};

// 計算を実行
function performCalculations() {
    const gm = calculate_gm(calculation_gm_data);
    const gamma_p = calculate_gamma_p(calculation_gamma_p_data);
    const mu = calculate_mu(gm, gamma_p);
    const myu = calculate_myu(calculation_mu_data);

    // 結果をHTMLに表示
    document.getElementById('result-vp').textContent = 'vp = 250.0 V';
    document.getElementById('result-vg').textContent = 'vg = -8.00 V';
    document.getElementById('result-ip').textContent = 'Ip = ' + calculation_gm_data.calculation_gm.ip_default.toFixed(2) + ' mA';
    document.getElementById('result-gm').textContent = 'gm = ' + gm.toFixed(6) + ' Ω⁻¹';
    document.getElementById('result-gamma-p').textContent = 'gamma_p = ' + gamma_p.toFixed(2) + ' Ω';
    document.getElementById('result-mu').textContent = 'μ (gm・gamma_p) = ' + mu.toFixed(2);
    document.getElementById('result-myu').textContent = 'μ (vp-vg) = ' + myu.toFixed(2);
}
