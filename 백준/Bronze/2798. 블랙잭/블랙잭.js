// 입력 처리를 위해 readline 모듈 사용
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];
rl.on('line', (line) => {
    input.push(line);
}).on('close', () => {
    // 입력 처리
    const [N, M] = input[0].split(' ').map(Number);
    const cards = input[1].split(' ').map(Number);
    
    // 결과 계산
    const result = blackjack(N, M, cards);
    console.log(result);
    
    process.exit();
});

function blackjack(N, M, cards) {
    let maxSum = 0;
    
    // 3중 반복문을 통해 모든 가능한 3장의 조합 확인
    for (let i = 0; i < N - 2; i++) {
        for (let j = i + 1; j < N - 1; j++) {
            for (let k = j + 1; k < N; k++) {
                const sum = cards[i] + cards[j] + cards[k];
                // 합이 M을 넘지 않으면서 현재 최대값보다 크면 갱신
                if (sum <= M && sum > maxSum) {
                    maxSum = sum;
                }
            }
        }
    }
    
    return maxSum;
}