//曜日ごとのコメント
const schedule = {
    Monday: "a",
    Tuesday: "b",
    Wednesday: "c",
    Thursday: "d",
    Friday: "e",
    Saturday: "f",
    Sunday: "g"
};

//現実世界の曜日を読み取る
const daysOfWeek = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];
const currentDay = daysOfWeek[new Date().getDay()];

//現実世界の曜日に合わせてコメントを対応
const message = schedule[currentDay] || "対応していません";

console.log(`今日は ${currentDay}.`);
console.log(`評価: ${message}`);

// div要素を作成
const div = document.createElement('div');

// テキスト内容を設定
div.innerText = `評価: ${message}`;

// 作成したdivをbodyに追加
document.body.appendChild(div);
