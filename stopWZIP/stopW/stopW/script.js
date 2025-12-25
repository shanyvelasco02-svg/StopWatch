let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const display = document.getElementById("display");

setButtons("initial");

function setButtons(state) {
  if (state === "initial") {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;
  }

  if (state === "running") {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    resetBtn.disabled = false;
  }

  if (state === "stopped") {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = false;
  }
}

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((ms % 1000) / 10);

  return (
    String(hours).padStart(2, "0") + ":" +
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0") + "." +
    String(milliseconds).padStart(2, "0")
  );
}

function startTimer() {
  startTime = Date.now() - elapsedTime;

  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
  }, 10);

  setButtons("running");
}

function stopTimer() {
  clearInterval(timerInterval);
  setButtons("stopped");
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  display.textContent = "00:00:00.00";
  setButtons("initial");
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
