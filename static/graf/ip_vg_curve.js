function showIpVgGraph(data){

    const ctx = document.getElementById("ip_vg_curve_graf").getContext("2d");
    const ctx2=document.getElementById("ip_vg_curve_graf2").getContext("2d");

    
    fetch("/ip_vg_api",{ // 送信先URL
        method: 'post', // 通信メソッド
        headers: {
          'Content-Type': 'application/json' // JSON形式のデータのヘッダー
        },
        body: JSON.stringify(data) // JSON形式のデータ
      })
        .then((res) => res.json())
        .then((data) => {
            // グラフを作成
            new Chart(ctx, {
                type: "line",    // グラフの種類
                data: { // Ｘ軸のラベル
                    labels:  data['x'],
                    datasets: [
                        {
                            label: "sessen",                      // 系列名
                            data: data['sessen'],           // 系列Ａのデータ
                            tension: 0,                         // ★　グラフの線、０ 直線,  ＞０ 曲線
                            fill: false,                           // ★　線とＸ軸で囲まれた範囲の描画 true する, false しない 
                            borderColor: "red",                   // グラフの線の色
                            borderWidth: 1  
                        },
                        {
                            label: "vp=230",                      // 系列名
                            data: data['vp230'],           // 系列Ａのデータ
                            tension: 0,                         // ★　グラフの線、０ 直線,  ＞０ 曲線
                            fill: false,                           // ★　線とＸ軸で囲まれた範囲の描画 true する, false しない 
                            borderColor: "brack",                   // グラフの線の色
                            borderWidth: 1                        // グラフの線の太さ
                        },
                        {
                            label: "vp=250",                      // 系列名
                            data: data['vp250'],           // 系列Ａのデータ
                            tension: 0,                         // ★　グラフの線、０ 直線,  ＞０ 曲線
                            fill: false,                           // ★　線とＸ軸で囲まれた範囲の描画 true する, false しない 
                            borderColor: "blue",                   // グラフの線の色
                            borderWidth: 1                        // グラフの線の太さ
                        },
                        {
                            label: "vp=270",                      // 系列名
                            data: data['vp270'],           // 系列Ａのデータ
                            tension: 0,                         // ★　グラフの線、０ 直線,  ＞０ 曲線
                            fill: false,                           // ★　線とＸ軸で囲まれた範囲の描画 true する, false しない 
                            borderColor: "green",                   // グラフの線の色
                            borderWidth: 1                       // グラフの線の太さ
                        },
                        {
                            label: "dousa",                      // 系列名
                            data: data['dousaf'],           // 系列Ａのデータ
                            tension: 0,                         // ★　グラフの線、０ 直線,  ＞０ 曲線
                            fill: false,                           // ★　線とＸ軸で囲まれた範囲の描画 true する, false しない 
                            borderColor: "brack",                   // グラフの線の色
                            borderWidth: 1                        // グラフの線の太さ
                        }
                    ]
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
            ctx2.fillStyle = 'black';
            ctx2.fillRect(27, 32+31.03*(30-data['dousaten']), 400, 2); 
        },
    )
        .catch((r) => {
          console.log("データ取得エラーです:", r);
        });
};