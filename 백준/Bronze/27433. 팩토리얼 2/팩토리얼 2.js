const fs = require('fs');

// 입력값을 받아옵니다.
const N = parseInt(fs.readFileSync('/dev/stdin').toString().trim());

// 팩토리얼을 계산하는 함수
function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

// 결과 출력
console.log(factorial(N));
