const startButton = document.querySelector(".start_game");
const computerTurn = document.querySelector(".computer_turn");
const yourTurn = document.querySelector(".your_turn");

let totalTime;
let colours = [];
let sequence = [];
let response = [];

Array.from(
  document.querySelector(".container").getElementsByTagName("div")
).forEach((element) => {
  colours.push(element.id);
});

function displaySequence() {
  Array.from(colours).forEach((id) => {
    let time = 0;
    for (let index = 0; index < sequence.length; index++) {
      const element = document.getElementById(`${colours[sequence[index]]}`);

      let full = () => {
        let wait = () => {
          element.style.backgroundColor = "white";
        };

        let show = () => {
          element.style.backgroundColor = `${colours[sequence[index]]}`;
        };

        setTimeout(wait, 500);
        setTimeout(show, 1000);
      };

      setTimeout(full, time);
      time = time + 1000;
      totalTime = time + 1000;
    }
  });
}

function checkSequence() {
  for (let index = 0; index < response.length; index++) {
    if (response[index] != sequence[index]) {
      return 1;
    }
  }
  if (sequence[0] != response[0]) {
    return 1;
  }
  if (sequence.length == response.length) {
    response = response.slice(response.length);
    startTheGame();
  }
  return 0;
}

function startTheGame() {
  startButton.classList.add("hidden");
  computerTurn.classList.remove("hidden");
  yourTurn.classList.add("hidden");

  document.querySelector(".score").innerHTML = `SCORE : ${sequence.length}`;

  sequence.push(Math.floor(Math.random() * colours.length));

  displaySequence();

  let wait = () => {
    computerTurn.classList.add("hidden");
    yourTurn.classList.remove("hidden");
  };

  setTimeout(wait, totalTime);
}

function nowDisplay() {
  computerTurn.classList.add("hidden");
  startButton.classList.remove("hidden");
  startButton.addEventListener("click", startTheGame);
}

Array.from(
  document.querySelector(".container").getElementsByTagName("div")
).forEach((element) => {
  element.addEventListener("click", (e) => {
    if (computerTurn.classList.contains("hidden")) {
      for (let index = 0; index < colours.length; index++) {
        if (element.id == colours[index]) {
          response.push(index);
        }
      }
      if (checkSequence()) {
        alert(`Game Over : Your Score is ${sequence.length - 1}`);
        yourTurn.classList.add("hidden");
        response = response.slice(response.length);
        sequence = sequence.slice(sequence.length);
        document.querySelector(".score").innerHTML = "SCORE : 0";
        nowDisplay();
      }
    }
  });
});

startButton.addEventListener("click", startTheGame);
