const fs = require("fs");
const input = fs.readFileSync("/dev/stdin", "utf8").trim().split(" ").map(Number);
const [N, M] = input;

function backtrack(start, combination) {
  if (combination.length === M) {
    console.log(combination.join(" "));
    return;
  }

  for (let i = start; i <= N; i++) {
    backtrack(i + 1, [...combination, i]);
  }
}

backtrack(1, []);
