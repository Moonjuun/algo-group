const readline = require('readline');

// 입력 인터페이스 설정
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const inputs = [];

// 입력 받기
rl.on('line', (line) => {
  const number = parseInt(line.trim());
  if (number === 0) rl.close(); // 0 입력 시 종료
  else inputs.push(number);
});

rl.on('close', () => {
  // 각 입력 값에 대해 이진 탐색 수행
  inputs.forEach(target => {
    const result = searchRabbit(1, 50, target);
    console.log(result.join(' '));
  });
});

// 이진 탐색 함수
function searchRabbit(start, end, target) {
  const path = [];

  while (start <= end) {
    const mid = Math.floor((start + end) / 2); // 중간 값
    path.push(mid);

    if (mid === target) break; // 토끼를 찾으면 종료
    if (mid < target) start = mid + 1;
    else end = mid - 1;
  }

  return path;
}
