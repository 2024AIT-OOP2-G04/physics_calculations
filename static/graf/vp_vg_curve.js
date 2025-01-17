function showVpVgGraph(xValuesArray) {
    console.log(xValuesArray)
    const datasets = [];
    const yValuesArray = [230, 250, 270];

    const xPolyfitArray = {};
    const yPolyfitArray = {};

    for (const key in xValuesArray) {
        xPolyfitArray[key] = [];
        yPolyfitArray[key] = [];
    }
    const keys=Object.keys(xValuesArray)
    //実データ点を描画する
    for (const key in xValuesArray) {
        const xValues = xValuesArray[key];
        const dataset = createDataset(key, xValues, yValuesArray, 'rgba(255,0,0,1)', 'scatter', 5, 'red'); // データ点を赤く、大きく表示
        datasets.push(dataset);
    }
    //v=-6
    for (let i = xValuesArray[keys[0]][2]; i <xValuesArray[keys[0]][0]; i=i+0.1) {
        xPolyfitArray[keys[0]].push(i);
        yPolyfitArray[keys[0]].push(polynomialInterpolation(xValuesArray[keys[0]], yValuesArray, i));
    }

    //v=-8
    for (let i = -16; i <-2; i=i+0.1) {
        xPolyfitArray[keys[1]].push(i);
        yPolyfitArray[keys[1]].push(polynomialInterpolation(xValuesArray[keys[1]], yValuesArray, i));
    }
    //v=-10
    for (let i = xValuesArray[keys[2]][2]; i <xValuesArray[keys[2]][0]; i=i+0.1) {
        xPolyfitArray[keys[2]].push(i);
        yPolyfitArray[keys[2]].push(polynomialInterpolation(xValuesArray[keys[2]], yValuesArray, i));
    }
    console.log(xPolyfitArray,yPolyfitArray)
    for (const key in xPolyfitArray) {
        const dataset = createDataset(key, xPolyfitArray[key], yPolyfitArray[key], 'rgba(0,0,255,1)', 'line', 1, 'blue');
        console.log(dataset) // 2次関数の近似曲線を青色の線で表示
        datasets.push(dataset);
    }
    drawChart2(datasets);
}

// // 以下はとりあえずのテストデータ
// const yValuesArrayExample = {
//     "vg_minus6": [15.30, 18.45, 21.98],
//     "vg_minus8": [10.5, 12.83, 15.83],
//     "vg_minus10": [6.23, 8.38, 10.88]
// };

// showGraph(yValuesArrayExample);



function drawChart2(datasets) {
    // Chart.jsでグラフを描画
    const ctx = document.getElementById('vp_vg_curve_graf').getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: datasets
        },
        options: {
            aspectRatio:1,
            responsive: true,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Vg[V]'
                    },
                    min: -16,
                    max: -2
                },
                y: {
                    title: {
                        display: true,
                        text: 'Vp[V]'
                    },
                    min: 180,
                    max: 320
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