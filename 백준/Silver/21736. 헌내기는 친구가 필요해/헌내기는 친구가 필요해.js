const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 1. 입력 처리
const [N, M] = input[0].split(' ').map(Number); // 첫 줄: N, M
const campus = input.slice(1).map(row => row.split('')); // 캠퍼스 맵 (2차원 배열)

// 2. 도연이 위치 찾기
let start;
for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        if (campus[i][j] === 'I') {
            start = [i, j]; // 도연이 위치 저장
            break;
        }
    }
    if (start) break;
}

// 3. BFS 준비
const visited = Array.from({ length: N }, () => Array(M).fill(false)); // 방문 체크 배열
const queue = [start]; // BFS 큐 (시작점 추가)
visited[start[0]][start[1]] = true; // 시작점 방문 체크
let peopleCount = 0; // 만난 사람 수

// 상하좌우 이동 방향 (dx: 행 변화, dy: 열 변화)
const dx = [-1, 1, 0, 0]; // 상, 하, 좌, 우
const dy = [0, 0, -1, 1];

// 4. BFS 탐색
while (queue.length > 0) {
    const [x, y] = queue.shift(); // 큐에서 현재 위치 꺼내기

    // 현재 위치가 사람(P)라면 카운트 증가
    if (campus[x][y] === 'P') {
        peopleCount++;
    }

    // 상하좌우로 이동 시도
    for (let i = 0; i < 4; i++) {
        const nx = x + dx[i]; // 다음 행
        const ny = y + dy[i]; // 다음 열

        // 캠퍼스 범위 체크
        if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;

        // 벽(X)이거나 이미 방문했으면 스킵
        if (campus[nx][ny] === 'X' || visited[nx][ny]) continue;

        // 이동 가능하면 큐에 추가하고 방문 체크
        queue.push([nx, ny]);
        visited[nx][ny] = true;
    }
}

// 5. 결과 출력
console.log(peopleCount === 0 ? 'TT' : peopleCount);