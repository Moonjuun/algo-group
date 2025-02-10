const readline = require("readline");

// 입력을 처리하기 위한 인터페이스 생성
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on("line", (line) => {
  input.push(line.trim());
});

rl.on("close", () => {
  const T = parseInt(input[0]); // 테스트 케이스 수
  let idx = 1;

  for (let t = 0; t < T; t++) {
    const N = parseInt(input[idx++]); // 사람 수
    const people = input[idx++].split(""); // 사람 배열

    const peopleCnt = {}; // 각 문자의 빈도수 저장
    const lastIdx = {}; // 각 문자의 마지막 인덱스 저장

    for (let i = 0; i < N; i++) {
      const char = people[i];
      peopleCnt[char] = (peopleCnt[char] || 0) + 1;
      lastIdx[char] = i;
    }

    // Group 객체 생성 및 정렬
    const groups = people.map((char) => ({
      name: char,
      lastIndex: lastIdx[char],
    }));

    groups.sort((a, b) => a.lastIndex - b.lastIndex);

    let ans = 0;
    for (let i = 0; i < N; i++) {
      const current = groups[i].name;
      const groupCnt = peopleCnt[current];

      const lastGroupIdx = i + groupCnt - 1;
      i = lastGroupIdx;

      ans += 5 * (lastIdx[current] - lastGroupIdx) * groupCnt;
    }

    console.log(ans);
  }
});
