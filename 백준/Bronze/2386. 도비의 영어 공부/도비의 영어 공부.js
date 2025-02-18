const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  if (line === "#") {
    rl.close();
    return;
  }

  const key = line[0]; // 첫 번째 문자
  const text = line.slice(2).toLowerCase(); // 나머지 문자열을 소문자로 변환
  const count = text.split("").filter((char) => char === key).length; // key 개수 세기

  console.log(`${key} ${count}`);
});
