const container = document.querySelector(".container"),
  musicImg = document.querySelector(".img-area img"),
  musicName = document.querySelector(".song-details .name"),
  musicArtist = document.querySelector(".song-details .artist"),
  playPauseBtn = document.querySelector(".play-pause"),
  prevBtn = document.querySelector("#prev"),
  nextBtn = document.querySelector("#next"),
  mainAudio = document.querySelector("#main-audio"),
  progressArea = document.querySelector(".progress-area"),
  progressBar = document.querySelector(".progress-bar");

let musicIndex = 0;
let isPlaying = false;

window.addEventListener("load", () => {
  loadMusic(musicIndex);
});

function loadMusic(indexNum) {
  musicName.innerHTML = allMusic[indexNum].name;
  musicArtist.innerHTML = allMusic[indexNum].artist;
  musicImg.src = allMusic[indexNum].img;
  mainAudio.src = allMusic[indexNum].src;
}


function playMusic() {
  isPlaying = true;
  playPauseBtn.querySelector("i").classList.remove("fa-circle-play");
  playPauseBtn.querySelector("i").classList.add("fa-circle-pause");
  mainAudio.play();
}

function pauseMusic() {
  isPlaying = false;
  playPauseBtn.querySelector("i").classList.add("fa-circle-play");
  playPauseBtn.querySelector("i").classList.remove("fa-circle-pause");
  mainAudio.pause();
}

playPauseBtn.addEventListener("click", () => {
  isPlaying ? pauseMusic() : playMusic();
});

function nextMusic() {
  musicIndex++;  
  if (musicIndex > allMusic.length - 1) {
    musicIndex = 0;
  }
  loadMusic(musicIndex);
  playMusic();
}

nextBtn.addEventListener("click", () => {
  nextMusic();
});



function prevMusic() {
  musicIndex--;  
  if (musicIndex < 0) {
    musicIndex = allMusic.length - 1;
  }
  loadMusic(musicIndex);
  playMusic();
}

prevBtn.addEventListener("click", () => {
  prevMusic();
});


const repeatBtn = document.querySelector("#repeat");

repeatBtn.addEventListener("click", () => {
  if (repeatBtn.classList.contains("fa-repeat")) {
    repeatBtn.classList.remove("fa-repeat");
    repeatBtn.classList.add("fa-1"); 
  } else if (repeatBtn.classList.contains("fa-1")) {
    repeatBtn.classList.remove("fa-1");
    repeatBtn.classList.add("fa-repeat"); 
  }
});





mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;

  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

//current time
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) currentSec = `0${currentSec}`;

//time song
  let durationMin = Math.floor(duration / 60);
  let durationSec = Math.floor(duration % 60);
  if (durationSec < 10) durationSec = `0${durationSec}`;

  document.querySelector(".current-time").textContent = `${currentMin}:${currentSec}`;
  document.querySelector(".max-duration").textContent = `${durationMin}:${durationSec}`;
});


progressArea.addEventListener("click", (e) => {
  let progressWidthVal = progressArea.clientWidth;
  let clickedOffsetX = e.offsetX;
  let songDuration = mainAudio.duration;

  mainAudio.currentTime = (clickedOffsetX / progressWidthVal) * songDuration;
});

