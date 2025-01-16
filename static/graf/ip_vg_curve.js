function showIpVgGraph(data){

    const ctx = document.getElementById("ip_vg_curve_graf").getContext("2d");
    const datasets = [];
    fetch("/ip_vg_api",{ // 送信先URL
        method: 'post', // 通信メソッド
        headers: {
          'Content-Type': 'application/json' // JSON形式のデータのヘッダー
        },
        body: JSON.stringify(data) // JSON形式のデータ
      })
        .then((res) => res.json())
        .then((data) => {
            const xValuesArray = [data['consen'][0][0],-8,data['consen'][1][0]];
            const yValuesArray = [data['consen'][0][1],data['dousaten'],data['consen'][1][1]];
            let dataset = createDataset('ten', xValuesArray, yValuesArray, 'rgba(0,0,0,1)', 'scatter', 5, 'black');
            datasets.push(dataset)
            dataset = createDataset('sessen', data['x'], data['sessen'], 'rgba(0,0,0,1)', 'line', 1, 'black');
            datasets.push(dataset)
            dataset = createDataset('vp230', data['x'],data['vp230'], 'rgba(0,0,0,1)', 'line', 1, 'black');
            datasets.push(dataset)
            dataset = createDataset('vp250', data['x'], data['vp250'], 'rgba(0,0,0,1)', 'line', 1, 'black');
            datasets.push(dataset)
            dataset = createDataset('vp270', data['x'], data['vp270'], 'rgba(0,0,0,1)', 'line', 1, 'black');
            datasets.push(dataset)
            // グラフを作成
            new Chart(ctx, {
                type: 'scatter',    // グラフの種類
                data: {
                    datasets: datasets
                },
                options: {
                    aspectRatio:0.67,
                    elements:
                    {
                     point:{
                     radius: 0
                     },
                    },
                    scales: {
                        x:{
                            ticks: {
                                stepSize:1,
                                maxTicksLimit:20,
                            },
                        },
                        y: {
                          min: 0,
                          max: 30,
                          ticks: {
                            stepSize:1,
                        },
                        },
            }}
            });
        },
    )
        .catch((r) => {
          console.log("データ取得エラーです:", r);
        });
};
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