const readline = require("readline");

// 입력을 받기 위한 인터페이스 생성
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let L, C, letters;
const vowels = new Set(["a", "e", "i", "o", "u"]); // 모음 집합

rl.on("line", (line) => {
  // 첫 번째 입력 줄에서 L과 C를 저장
  if (!L) {
    [L, C] = line.split(" ").map(Number);
  } else {
    // 두 번째 입력 줄에서 주어진 문자들을 배열로 변환 후 사전순 정렬
    letters = line.split(" ").sort();
    rl.close(); // 입력이 완료되었으므로 입력 스트림을 닫음
  }
});

rl.on("close", () => {
  const result = []; // 가능한 암호를 저장할 배열

  // 백트래킹을 이용한 조합 생성 함수
  function dfs(index, password) {
    // L개의 문자를 선택했을 경우, 조건을 만족하는지 확인 후 출력
    if (password.length === L) {
      let vowelCount = 0, consonantCount = 0;

      // 암호 내 모음과 자음 개수를 확인
      for (const char of password) {
        if (vowels.has(char)) vowelCount++;
        else consonantCount++;
      }

      // 모음이 1개 이상이고, 자음이 2개 이상인 경우만 유효한 암호로 처리
      if (vowelCount >= 1 && consonantCount >= 2) {
        result.push(password.join("")); // 배열을 문자열로 변환하여 저장
      }
      return; // 백트래킹을 위해 함수 종료
    }

    // 현재 index부터 C까지 탐색하며 백트래킹 수행
    for (let i = index; i < C; i++) {
      password.push(letters[i]); // 현재 문자를 추가
      dfs(i + 1, password); // 다음 문자 선택을 위해 재귀 호출
      password.pop(); // 백트래킹: 원래 상태로 복구
    }
  }

  dfs(0, []); // DFS 시작 (첫 번째 문자 선택)
  console.log(result.join("\n")); // 가능한 암호들을 개행으로 구분하여 출력
});
