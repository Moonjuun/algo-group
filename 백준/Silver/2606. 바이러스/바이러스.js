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
  const N = parseInt(input[0]); // 컴퓨터 수
  const M = parseInt(input[1]); // 연결 쌍 수
  const graph = Array.from({ length: N + 1 }, () => []); // 인접 리스트
  const visited = Array(N + 1).fill(false); // 방문 체크 배열
  let count = 0; // 감염된 컴퓨터 수

  // 그래프 만들기 (인접 리스트)
  for (let i = 2; i < 2 + M; i++) {
    const [a, b] = input[i].split(' ').map(Number);
    graph[a].push(b);
    graph[b].push(a); // 양방향 연결
  }

  // DFS 함수
  function dfs(node) {
    visited[node] = true; // 현재 노드 방문 체크
    for (let next of graph[node]) { // 연결된 노드들 탐색
      if (!visited[next]) { // 방문하지 않았다면
        count++; // 감염된 컴퓨터 수 증가
        dfs(next); // 다음 노드로 이동
      }
    }
  }

  // 1번 컴퓨터에서 시작
  dfs(1);

  // 결과 출력 (1번 컴퓨터 제외한 감염된 수)
  console.log(count);
});