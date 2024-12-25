const gyou=9
const retu=3
const tbl = document.createElement("table");
const tblBody = document.createElement("tbody");
let row = document.createElement("tr");
const gengo=["増加過程","減少過程","平均値"]
//最初の宣言

for (let i = -1; i < retu; i++) {

  let cell = document.createElement("td");
  if(i<0){
  let cellText = document.createTextNode(`__Vp`);
  cell.appendChild(cellText);
  }else{
  let cellText = document.createTextNode(`${i*20+230}.0V`);
  cell.colSpan="3"
  cell.appendChild(cellText);
  }
  row.appendChild(cell);
}
tblBody.appendChild(row);
row = document.createElement("tr");
for (let i = -1; i < retu*3; i++) {
  const cell = document.createElement("td");
  if(i<0){
  const cellText = document.createTextNode(`Vg__`);
  cell.appendChild(cellText);
  }else {
  const cellText = document.createTextNode(gengo[i%3]);
  cell.appendChild(cellText);
  }
  row.appendChild(cell);
}
tblBody.appendChild(row);
for (let i = 0; i < gyou; i++) {
    // 表の行を作成
    const row = document.createElement("tr");

    for (let j = -1; j < retu*3; j++) {
      // <td> 要素とテキストノードを作成し、テキストノードを
      // <td> の内容として、その <td> を表の行の末尾に追加
      const cell = document.createElement("td");
      if(j<0){
      const cellText = document.createTextNode(`${-20+i*2}.0V`);
      cell.appendChild(cellText);
      }else {
      const cellText = document.createTextNode(`${i}、${j}`);//返り値　反映
      cell.appendChild(cellText);
      }
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