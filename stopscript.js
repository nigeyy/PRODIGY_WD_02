let timer;
let isRunning = false;
let startTime;
let lapCount = 1;
let elapsedTime = 0;

function startStop() {
  if (isRunning) {
    clearInterval(timer);
    document.querySelector(".startStop").textContent = "Start";
  } else {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateDisplay, 10);
    document.querySelector(".startStop").textContent = "Stop";
  }
  isRunning = !isRunning;
}

function stop() {
  if (isRunning) {
    clearInterval(timer);
    document.querySelector(".startStop").textContent = "Start";
    isRunning = false;
  }
}

function reset() {
  clearInterval(timer);
  document.querySelector("#display").textContent = "00:00:00";
  document.querySelector(".startStop").textContent = "Start";
  document.querySelector(".laps").innerHTML = "";
  isRunning = false;
  lapCount = 1;
  elapsedTime = 0;
}

function recordLap() {
  const lapTime = calculateTime(elapsedTime);
  const lapItem = document.createElement("li");
  lapItem.textContent = `Lap ${lapCount++}: ${lapTime}`;
  document.querySelector(".laps").appendChild(lapItem);
}

function updateDisplay() {
  elapsedTime = Date.now() - startTime;
  document.querySelector("#display").textContent = calculateTime(elapsedTime);
}

function calculateTime(elapsedTime) {
  const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);
  return (
    formatTime(hours) + ":" +
    formatTime(minutes) + ":" +
    formatTime(seconds) + "." +
    formatTime(milliseconds)
  );
}

function formatTime(time) {
  return time < 10 ? "0" + time : time;
}
