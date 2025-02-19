const fs = require("fs");

// 입력 처리
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = parseInt(input[0]);
const schedule = input.slice(1).map(line => line.split(" ").map(Number));

let maxProfit = 0;

// 백트래킹 DFS 함수
function dfs(day, profit) {
    // 📌 종료 조건: 날짜가 N을 넘으면 탐색 종료
    if (day >= N) {
        maxProfit = Math.max(maxProfit, profit);
        return;
    }

    const [Ti, Pi] = schedule[day];

    // ✅ 1. 상담을 진행하는 경우
    if (day + Ti <= N) {
        dfs(day + Ti, profit + Pi);
    }

    // ✅ 2. 상담을 진행하지 않는 경우
    dfs(day + 1, profit);
}


// 탐색 시작
dfs(0, 0);

console.log(maxProfit);