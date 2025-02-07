const fs = require('fs');

// 입력 처리
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const beads = input[1].split(" ").map(Number);

// 1. 구슬을 오름차순 정렬
beads.sort((a, b) => a - b);

// 2. reduce를 이용해 인접한 구슬들의 차이를 합산
const minLength = beads.reduce((acc, cur, idx, arr) => {
    if (idx === 0) return 0; // 첫 번째 요소는 계산 안 함
    return acc + Math.abs(cur - arr[idx - 1]);
}, 0) + Math.abs(beads[0] - beads[beads.length - 1]); // 마지막과 첫 번째 연결

console.log(minLength);
