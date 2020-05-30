const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const timestamp = document.getElementById('timestamp');
const progress = document.getElementById('progress');

let updateProgress = true;

/* FUNCTIONS */

// Toggles the pause and play button when the video is playing or paused
function togglePlayPause() {
  if (video.paused) {
    playVideo();
  } else {
    pauseVideo();
  }
}

// Plays the video and updates the button to show a pause icon
function playVideo() {
  video.play();
  play.innerHTML = '<i class="fas fa-pause fa-2x"></i>';
}

// Pauses the video and updates the button to show a play icon
function pauseVideo() {
  video.pause();
  play.innerHTML = '<i class="fas fa-play fa-2x"></i>';
}

// Stops the video
function stopVideo() {
  video.currentTime = 0;
  pauseVideo();
}

// Updates the timestamp
function updateTimestamp() {
  let minutes = Math.floor(video.currentTime / 60);
  let seconds = Math.floor(video.currentTime % 60);

  minutes = leadingZero(minutes);
  seconds = leadingZero(seconds);
  timestamp.innerText = `${minutes}:${seconds}`;
  updateProgressBar();
}

function updateProgressBar() {
  if (updateProgress) {
    progress.value = (video.currentTime / video.duration) * 100;
  }
}

// Sets the video time to the progress bar value
function setVideoTime() {
  togglePlayPause();
  video.currentTime = (progress.value / 100) * video.duration;
  togglePlayPause();
}

// Adds a leading zero to time
function leadingZero(time) {
  if (time < 10) {
    time = '0' + time;
  }
  return time;
}

/* EVENT LISTENERS */

video.addEventListener('click', togglePlayPause);
video.addEventListener('timeupdate', updateTimestamp);
play.addEventListener('click', togglePlayPause);
stop.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoTime);
