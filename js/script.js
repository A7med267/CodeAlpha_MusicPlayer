const container = document.querySelector(".container"),
  musicImg = document.querySelector(".img-area img"),
  musicName = document.querySelector(".song-details .name"),
  musicArtist = document.querySelector(".song-details .artist"),
  playPauseBtn = document.querySelector(".play-pause"),
  prevBtn = document.querySelector("#prev"),
  nextBtn = document.querySelector("#next"),
  mainAudio = document.querySelector("#main-audio"),
  progressArea = document.querySelector(".progress-area"),
  progressBar = document.querySelector(".progress-bar"),
  repeatBtn = document.querySelector("#repeat");

let musicIndex = 0;
let isPlaying = false;

// تحميل الموسيقى عند فتح الصفحة
window.addEventListener("load", () => {
  loadMusic(musicIndex);
});

// دالة تحميل الموسيقى
function loadMusic(indexNum) {
  musicName.innerHTML = allMusic[indexNum].name;
  musicArtist.innerHTML = allMusic[indexNum].artist;
  musicImg.src = allMusic[indexNum].img;
  mainAudio.src = allMusic[indexNum].src;
}

// تشغيل وإيقاف الموسيقى
function playMusic() {
  isPlaying = true;
  playPauseBtn.querySelector("i").classList.replace("fa-circle-play", "fa-circle-pause");
  mainAudio.play();
}

function pauseMusic() {
  isPlaying = false;
  playPauseBtn.querySelector("i").classList.replace("fa-circle-pause", "fa-circle-play");
  mainAudio.pause();
}

playPauseBtn.addEventListener("click", () => {
  isPlaying ? pauseMusic() : playMusic();
});

// الموسيقى التالية
function nextMusic() {
  musicIndex++;  
  if (musicIndex > allMusic.length - 1) musicIndex = 0;
  loadMusic(musicIndex);
  playMusic();
}

nextBtn.addEventListener("click", nextMusic);

// الموسيقى السابقة
function prevMusic() {
  musicIndex--;  
  if (musicIndex < 0) musicIndex = allMusic.length - 1;
  loadMusic(musicIndex);
  playMusic();
}

prevBtn.addEventListener("click", prevMusic);

repeatBtn.addEventListener("click", () => {
  if (repeatBtn.classList.contains("fa-repeat")) {
    repeatBtn.classList.replace("fa-repeat", "fa-1"); 
  } else if (repeatBtn.classList.contains("fa-1")) {
    repeatBtn.classList.replace("fa-1", "fa-repeat"); 
  }
});

mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration || 0;

  
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) currentSec = `0${currentSec}`;


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
