const fs = require('fs');

// 입력을 읽습니다. 예: "6 41" -> ['6', '41']로 나눠지고, 숫자로 변환
const input = fs.readFileSync('/dev/stdin').toString().trim().split(' ');
const D = parseInt(input[0]); // D일째 (3 ≤ D ≤ 30)
const K = parseInt(input[1]); // K개 떡 (10 ≤ K ≤ 100,000)

// 피보나치 수열을 계산하는 함수
function fibonacci(n) {
    const F = new Array(n + 1); // 배열을 만듭니다 (인덱스 1부터 사용할 거예요)
    F[1] = 1; // 첫 번째 피보나치 수
    F[2] = 1; // 두 번째 피보나치 수
    for (let i = 3; i <= n; i++) {
        F[i] = F[i - 1] + F[i - 2]; // 피보나치 규칙: 앞 두 수의 합
    }
    return F; // 계산된 피보나치 수열 배열을 반환
}

// 피보나치 수열을 30까지 계산 (D가 30 이하니까 충분해요)
const F = fibonacci(30);

// 방정식의 계수: c는 A 앞에, d는 B 앞에 붙는 수
const c = F[D - 2]; // F_{D-2}
const d = F[D - 1]; // F_{D-1}

// A를 1부터 K까지 시도하면서 B를 구합니다
for (let A = 1; A <= K; A++) {
    const temp = K - c * A; // 방정식: cA + dB = K -> dB = K - cA
    if (temp < d) continue; // temp < d면 B가 1보다 작아져서 조건에 안 맞아요
    if (temp % d === 0) {   // temp가 d로 나누어 떨어져야 B가 정수가 됩니다
        const B = temp / d; // B 계산
        if (B >= A) {       // 조건: 1 ≤ A ≤ B 확인
            console.log(A); // 첫째 날 떡 개수 출력
            console.log(B); // 둘째 날 떡 개수 출력
            break;          // 답을 찾았으니 반복 멈춤
        }
    }
}