document.addEventListener("DOMContentLoaded", () =>  {

    const ctx = document.getElementById("ip_vg_curve_graph").getContext("2d");


    fetch("/routes/api/graf/ip_vg_curve.py")
        .then((res) => res.json())
        .then((data) => {
            // グラフを作成
            new Chart(ctx, {
                type: "line",
                data: {
                    datasets: [
                        {
                            label: "系列Ａ",                      // 系列名
                            data: data["vp230"],           // 系列Ａのデータ
                            tension:0,                         // ★　グラフの線、０ 直線,  ＞０ 曲線
                            fill: false,                           // ★　線とＸ軸で囲まれた範囲の描画 true する, false しない 
                            borderColor: "red",                   // グラフの線の色
                            borderWidth: 2 
                        },
                    ],
                },
                options: {
                    elements: {
                     point:{
                     radius: 0
                     }
               }
            }
            });
        })
        .catch((r) => {
          console.log("データ取得エラーです:", r);
        });
});