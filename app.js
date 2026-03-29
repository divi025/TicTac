let boxes = document.querySelectorAll(".box");
let rstbtn = document.querySelector("#resetbtn");
let newbtn = document.querySelector("#newbtn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let moveSound = document.querySelector("#moveSound");
let winSound = document.querySelector("#winSound");

// Function to play sound safely
const playSound = (audio) => {
  if (audio) {
    audio.currentTime = 0; // Reset to beginning
    audio.play().catch(e => {
      console.log("Audio play failed:", e);
    });
  } else {
    console.log("Audio element not found");
  }
};

// Check if audio files loaded
moveSound.addEventListener('canplaythrough', () => {
  console.log('Move sound loaded successfully');
});
moveSound.addEventListener('error', (e) => {
  console.log('Move sound failed to load:', e);
});

winSound.addEventListener('canplaythrough', () => {
  console.log('Win sound loaded successfully');
});
winSound.addEventListener('error', (e) => {
  console.log('Win sound failed to load:', e);
});

let turn0 = true; 

const winningpattern = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
];


boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      box.innerText = "O";
      box.classList.add("o");
      turn0 = false;
    } else {
      box.innerText = "X";
      box.classList.add("x");
      turn0 = true;
    }
    box.disabled = true;
    playSound(moveSound);
    checkwinner();
  });
});


const checkwinner = () => {
  for (let pattern of winningpattern) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      showwinner(pos1);
      return;
    }
  }
};
const showwinner = (winner) => {
  msg.innerText = `🎉 Congratulations! Winner is ${winner}`;
  msgcontainer.classList.add("show");   
  playSound(winSound);
  disableBoxes();
};

const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};


const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("x", "o");
  });
};


const resetgame = () => {
  turn0 = true;                         
  enableBoxes();
  msgcontainer.classList.remove("show");
};


newbtn.addEventListener("click", resetgame);
rstbtn.addEventListener("click", resetgame);
