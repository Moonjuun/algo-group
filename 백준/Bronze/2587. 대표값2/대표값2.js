const fs = require('fs');

// 입력 처리
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(Number);

// 평균 계산 (반올림하여 자연수로 변환)
let averageValue = Math.round(input.reduce((acc, cur) => acc + cur, 0) / input.length);

// 중앙값 계산
let centerValue = (() => {
    let sorted = input.sort((a, b) => a - b);
    let mid = Math.floor(sorted.length / 2);
    return sorted[mid]; // 항상 자연수
})();

// 출력
console.log(averageValue);
console.log(centerValue);
