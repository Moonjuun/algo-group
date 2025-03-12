const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 입력을 저장할 변수
let input = [];
rl.on('line', (line) => {
    input.push(line.split(' ').map(Number));
}).on('close', () => {
    // 첫 줄에서 M(가로), N(세로) 추출
    const [M, N] = input[0];
    // 토마토 격자 데이터 (2차원 배열)
    const grid = input.slice(1);

    // BFS를 위한 큐와 방문 체크 배열
    const queue = [];
    let unripeTomatoes = 0; // 익지 않은 토마토 개수
    const dx = [0, 0, 1, -1]; // 상하좌우 이동 (x 방향)
    const dy = [1, -1, 0, 0]; // 상하좌우 이동 (y 방향)

    // 초기 상태: 익은 토마토(1)의 위치를 큐에 넣고, 익지 않은 토마토(0) 개수 세기
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (grid[i][j] === 1) {
                queue.push([i, j, 0]); // [y, x, 날짜]
            } else if (grid[i][j] === 0) {
                unripeTomatoes++;
            }
        }
    }

    // BFS 함수
    function bfs() {
        let index = 0; // 큐의 현재 위치
        let days = 0; // 최소 일수

        while (index < queue.length) {
            const [y, x, day] = queue[index];
            index++;
            days = day; // 현재 날짜 갱신

            // 상하좌우 4방향 탐색
            for (let i = 0; i < 4; i++) {
                const ny = y + dy[i];
                const nx = x + dx[i];

                // 격자 범위 안에 있고, 익지 않은 토마토(0)일 경우
                if (ny >= 0 && ny < N && nx >= 0 && nx < M && grid[ny][nx] === 0) {
                    grid[ny][nx] = 1; // 익었다고 표시
                    unripeTomatoes--; // 익지 않은 토마토 감소
                    queue.push([ny, nx, day + 1]); // 다음 날짜로 큐에 추가
                }
            }
        }

        // 모든 토마토가 익었는지 확인
        return unripeTomatoes === 0 ? days : -1;
    }

    // 결과 출력
    if (unripeTomatoes === 0) {
        console.log(0); // 처음부터 다 익은 경우
    } else {
        const result = bfs();
        console.log(result);
    }

    process.exit();
});