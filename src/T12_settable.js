const gyou=9
const retu=3
const tbl = document.createElement("table");
const tblBody = document.createElement("tbody");
for (let i = 0; i < gyou; i++) {
    // 表の行を作成
    const row = document.createElement("tr");

    for (let j = 0; j < retu; j++) {
      // <td> 要素とテキストノードを作成し、テキストノードを
      // <td> の内容として、その <td> を表の行の末尾に追加
      const cell = document.createElement("td");
      const cellText = document.createTextNode(`${i} 行目、${j} 列目のセル`);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }

    // 表の本体の末尾に行を追加
    tblBody.appendChild(row);
  }

  // <tbody> を <table> の中に追加
  tbl.appendChild(tblBody);
  // <table> を <body> の中に追加
  document.body.appendChild(tbl);
  // tbl の border 属性を 2 に設定
  tbl.setAttribute("border", "2");