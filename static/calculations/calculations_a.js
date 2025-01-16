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
    console.error(parseFloat(document.getElementById('ip_default').value));

    //gmの計算
    calculation_gm_data.calculation_gm.ip_default = parseFloat(document.getElementById('ip_default').value);
    calculation_gm_data.calculation_gm.vg_minus6_ip = parseFloat(document.getElementById('vg_minus6_ip').value);
    calculation_gm_data.calculation_gm.ip_0_vg = parseFloat(document.getElementById('ip_0_vg').value);
    //gamm_pの計算
    calculation_gamma_p_data.calculation_gamma_p.vp_180_ip = parseFloat(document.getElementById('vp_180_ip').value);
    calculation_gamma_p_data.calculation_gamma_p.vp_300_ip = parseFloat(document.getElementById('vp_300_ip').value);
    //muの計算
    calculation_mu_data.calculation_mu.vp_180_vg = parseFloat(document.getElementById('vp_180_vg').value);
    calculation_mu_data.calculation_mu.vp_300_vg = parseFloat(document.getElementById('vp_300_vg').value);


    const gm = calculate_gm(calculation_gm_data);
    const gamma_p = calculate_gamma_p(calculation_gamma_p_data);
    const mu = calculate_mu(gm, gamma_p);
    const myu = calculate_myu(calculation_mu_data);

    // 結果をHTMLに表示
    document.getElementById('result-vp').textContent = 'vp = 250.0 V';
document.getElementById('result-vg').textContent = 'vg = -8.00 V';
document.getElementById('result-ip').textContent = 
    'Ip = ' + calculation_gm_data.calculation_gm.ip_default.toFixed(2) + ' mA';

// gm の分数表記
document.getElementById('result-gm').innerHTML = 
    `<br>gm = <div style="display: inline-block; text-align: center;">
        <div>${calculation_gm_data.calculation_gm.vg_minus6_ip} × 10<sup>-3</sup> A</div>
        <div style="border-top: 1px solid black;">( 13.20 - 6.00 ) V</div>
    </div> = ${gm.toFixed(6)} Ω⁻¹`;

// γp の分数表記
document.getElementById('result-gamma-p').innerHTML = 
    `<br>γp = <div style="display: inline-block; text-align: center;">
        <div>(300 - 180) V</div>
        <div style="border-top: 1px solid black;">
            ${'( '+calculation_gamma_p_data.calculation_gamma_p.vp_300_ip} - 
            ${calculation_gamma_p_data.calculation_gamma_p.vp_180_ip+' )A'}
        </div>
    </div> = ${gamma_p.toFixed(2)} Ω`;

// μ (gm × γp) 
document.getElementById('result-mu').innerHTML = 
    `<br>μ (gm × γp) = <div style="display: inline-block; text-align: center;">
        <div>( ${gm.toFixed(6)} Ω⁻¹ )</div>
        <div style="border-top: 1px solid black;">${gamma_p.toFixed(2)} Ω</div>
    </div> = ${mu.toFixed(2)}`;

// μ (vp-vg) の分数表記
document.getElementById('result-myu').innerHTML = 
    `<br>μ (vp-vg) = <div style="display: inline-block; text-align: center;">
        <div>(300 - 180) V</div>
        <div style="border-top: 1px solid black;">
            ${'('+Math.abs(calculation_mu_data.calculation_mu.vp_300_vg)} - 
            ${Math.abs(calculation_mu_data.calculation_mu.vp_180_vg)+')'}
        </div>
    </div> = ${myu.toFixed(2)}`;


    //document.getElementById('result-vp').textContent = 'vp = 250.0 V';
    //document.getElementById('result-vg').textContent = 'vg = -8.00 V';
    //document.getElementById('result-ip').textContent = 'Ip = ' + calculation_gm_data.calculation_gm.ip_default.toFixed(2) + ' mA';
    //document.getElementById('result-gm').textContent = 'gm = ' + calculation_gm_data.calculation_gm.vg_minus6_ip +'×10^-3A' + ' / ' + '(13.20 - 6.00)V = ' + gm.toFixed(6) + ' Ω⁻¹';
    //document.getElementById('result-gamma-p').textContent  ='γp= (300 - 180)V  /  ' + '(' + calculation_gamma_p_data.calculation_gamma_p.vp_300_ip +' - ' + calculation_gamma_p_data.calculation_gamma_p.vp_180_ip +') = ' + 3.00 + gamma_p.toFixed(2) +  'Ω';
    //document.getElementById('result-mu').textContent = 'μ (gm×γp) = ' +'( ' + gm.toFixed(6) + ' Ω⁻¹) × '+'('+ gamma_p.toFixed(2) +  'Ω )' + ' = '+ mu.toFixed(2);
    //document.getElementById('result-myu').textContent = 'μ (vp-vg) = ' + '(300 - 180)V  /  ( ' + calculation_mu_data.calculation_mu.vp_300_vg +' - ' + calculation_mu_data.calculation_mu.vp_180_vg + ' ) ='+ myu.toFixed(2);
}
