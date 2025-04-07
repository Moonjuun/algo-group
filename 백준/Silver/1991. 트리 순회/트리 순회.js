// Node.js에서 입력을 받기 위해 readline 모듈 사용
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 이진 트리를 저장할 객체
const tree = {};
let N; // 노드 개수

// 입력을 처리하는 부분
const input = [];
rl.on('line', (line) => {
    input.push(line);
}).on('close', () => {
    N = parseInt(input[0]); // 첫 줄은 노드 개수
    for (let i = 1; i <= N; i++) {
        const [node, left, right] = input[i].split(' ');
        tree[node] = { left: left === '.' ? null : left, right: right === '.' ? null : right };
    }

    // 결과 저장 변수
    let preorderResult = '';
    let inorderResult = '';
    let postorderResult = '';

    // 전위 순회 (root -> left -> right)
    function preorder(node) {
        if (node === null) return;
        preorderResult += node; // 먼저 루트 방문
        preorder(tree[node].left); // 왼쪽 자식
        preorder(tree[node].right); // 오른쪽 자식
    }

    // 중위 순회 (left -> root -> right)
    function inorder(node) {
        if (node === null) return;
        inorder(tree[node].left); // 왼쪽 자식 먼저
        inorderResult += node; // 루트 방문
        inorder(tree[node].right); // 오른쪽 자식
    }

    // 후위 순회 (left -> right -> root)
    function postorder(node) {
        if (node === null) return;
        postorder(tree[node].left); // 왼쪽 자식
        postorder(tree[node].right); // 오른쪽 자식
        postorderResult += node; // 마지막으로 루트
    }

    // 순회 시작 (루트는 항상 'A')
    preorder('A');
    inorder('A');
    postorder('A');

    // 결과 출력
    console.log(preorderResult);
    console.log(inorderResult);
    console.log(postorderResult);

    process.exit();
});