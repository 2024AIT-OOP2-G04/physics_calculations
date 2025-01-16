// const yValuesArray = {
//     "vg_minus6": [15.30, 18.45, 21.98],
//     "vg_minus8": [10.5, 12.83, 15.83],
//     "vg_minus10": [6.23, 8.38, 10.88]
// };



//この関数を呼び出すとグラフを表示します
//引数としてyValuesArrayを上に示すような形式で渡してください
function showIpVpGraph(yValuesArray) {
    const datasets = [];
    const xValuesArray = [230, 250, 270];

    const xPolyfitArray = {};
    const yPolyfitArray = {};

    for (const key in yValuesArray) {
        xPolyfitArray[key] = [];
        yPolyfitArray[key] = [];
    }


    //実データ点を描画する
    for (const key in yValuesArray) {
        const yValues = yValuesArray[key];
        const dataset = createDataset(key, xValuesArray, yValues, 'rgba(255,0,0,1)', 'scatter', 5, 'red'); // データ点を赤く、大きく表示
        datasets.push(dataset);
    }

    //v=-6
    for (let i = 230; i < 270; i++) {
        xPolyfitArray["vg_minus6"].push(i);
        yPolyfitArray["vg_minus6"].push(polynomialInterpolation(xValuesArray, yValuesArray["vg_minus6"], i));
    }

    //v=-8
    for (let i = 180; i < 320; i++) {
        xPolyfitArray["vg_minus8"].push(i);
        yPolyfitArray["vg_minus8"].push(polynomialInterpolation(xValuesArray, yValuesArray["vg_minus8"], i));
    }
    //v=-10
    for (let i = 230; i < 270; i++) {
        xPolyfitArray["vg_minus10"].push(i);
        yPolyfitArray["vg_minus10"].push(polynomialInterpolation(xValuesArray, yValuesArray["vg_minus10"], i));
    }
    for (const key in yPolyfitArray) {
        const dataset = createDataset(key, xPolyfitArray[key], yPolyfitArray[key], 'rgba(0,0,255,1)', 'line', 1, 'blue'); // 2次関数の近似曲線を青色の線で表示
        datasets.push(dataset);
    }
    drawChart(datasets);
}

// // 以下はとりあえずのテストデータ
// const yValuesArrayExample = {
//     "vg_minus6": [15.30, 18.45, 21.98],
//     "vg_minus8": [10.5, 12.83, 15.83],
//     "vg_minus10": [6.23, 8.38, 10.88]
// };

// showGraph(yValuesArrayExample);



function drawChart(datasets) {
    // Chart.jsでグラフを描画
    const ctx = document.getElementById('ip_vp_curve_graf').getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: datasets
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Vp'
                    },
                    min: 180,
                    max: 320
                },
                y: {
                    title: {
                        display: true,
                        text: 'Ip'
                    },
                    min: 2,
                    max: 30
                ,
                    ticks: {
                        stepSize: 2
                    }
                }
            }
        }
    });
}

// データセット作成関数
function createDataset(label, xValues, yValues, color, type = 'line', pointRadius = 3, pointBackgroundColor = 'black') {
    return {
        label: label,
        data: xValues.map((x, i) => ({ x, y: yValues[i] })),
        borderColor: color,
        backgroundColor: 'transparent',
        type: type,
        fill: false,
        pointRadius: pointRadius,
        pointBackgroundColor: pointBackgroundColor,
    };
}

function polynomialInterpolation(x, y, x1_input) {
    // データ点が3つなければエラーを投げる
    if (x.length !== 3 || y.length !== 3) {
        throw new Error("データ点は3つ必要です。");
    }

    // x, y座標の各要素を個別の変数に代入
    const x1 = x[0];
    const x2 = x[1];
    const x3 = x[2];
    const y1 = y[0];
    const y2 = y[1];
    const y3 = y[2];

    // 2次多項式 y = ax^2 + bx + c の係数a, b, cを連立方程式を解いて求める
    // 以下の計算は、3点(x1, y1), (x2, y2), (x3, y3)を通る2次曲線の係数を求める公式です。
    const a = (
        (y3 - y1) * (x2 - x1) - (y2 - y1) * (x3 - x1)
    ) / (
        (x3 * x3 - x1 * x1) * (x2 - x1) - (x2 * x2 - x1 * x1) * (x3 - x1)
    );
    const b = (y2 - y1 - a * (x2 * x2 - x1 * x1)) / (x2 - x1);
    const c = y1 - a * x1 * x1 - b * x1;

    // 与えられたx1_inputに対してyの値を計算
    const y_result = a * x1_input * x1_input + b * x1_input + c;

    // yの値を返す
    return y_result;
}