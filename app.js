const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

let turnO = true;
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const pos1 = boxes[a].innerText;
    const pos2 = boxes[b].innerText;
    const pos3 = boxes[c].innerText;

    if (pos1 && pos2 && pos3 && pos1 === pos2 && pos2 === pos3) {
      showWinner(pos1);
      return true;
    }
  }
  return false;
};

const showWinner = (winner) => {
  if (winner === "O") {
    msg.innerText = "🎉 You Win!";
  } else {
    msg.innerText = "🤖 Computer Wins!";
  }
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const gameDraw = () => {
  msg.innerText = "🤝 It's a Draw!";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const computerMove = () => {
  const emptyBoxes = [...boxes].filter((box) => box.innerText === "");
  if (emptyBoxes.length === 0) return;

  const randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
  randomBox.innerText = "X";
  randomBox.disabled = true;
  count++;

  if (checkWinner()) return;

  if (count === 9) {
    gameDraw();
  } else {
    turnO = true;
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (!msgContainer.classList.contains("hide")) return;

    if (!turnO || box.innerText !== "") return;

    box.innerText = "O";
    box.disabled = true;
    turnO = false;
    count++;

    if (checkWinner()) return;

    if (count === 9) {
      gameDraw();
      return;
    }

    setTimeout(computerMove, 300);
  });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
