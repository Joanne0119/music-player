const playerSection = document.getElementById("player-section");
const currentMusicArea = document.getElementById("current-music");
const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('play-pause');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const shuffleButton = document.getElementById('shuffle');
const currentTime = document.getElementById('current-time');
const totalTime = document.getElementById('total-time');
const showPlayerBtn = document.getElementById('show-player');
import { songsLibrary } from "./songs.js";

function UpdateCurrentMusic(currentPlaying) {
    currentMusicArea.querySelector("img").src = songsLibrary[currentPlaying].image;
    currentMusicArea.querySelector("h4").innerHTML = songsLibrary[currentPlaying].title;
    currentMusicArea.querySelector("p").innerHTML = songsLibrary[currentPlaying].singer;
    audio.querySelector("source").src = songsLibrary[currentPlaying].audio;
    totalTime.innerHTML = songsLibrary[currentPlaying].totalTime;
}

UpdateCurrentMusic(4);

function UpdateTimeDisplay() {
    const currentMinutes =
          (Math.floor(audio.currentTime / 60) < 10)? 
          "0" + Math.floor(audio.currentTime / 60).toString() 
          : Math.floor(audio.currentTime / 60).toString();
    const currentSeconds =
          (Math.floor(audio.currentTime % 60) < 10)? 
          "0" + Math.floor(audio.currentTime % 60).toString() 
          : Math.floor(audio.currentTime % 60).toString();
    currentTime.innerHTML = `${currentMinutes}:${currentSeconds}`;
}

let isPlaying = false;
playPauseButton.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseButton.innerHTML = 
        `<img src="images/music-player-controls/play.png" alt="play">`;
    }
    else {
        audio.play();
        playPauseButton.innerHTML = 
        `<img src="images/music-player-controls/pause.png" alt="play">`;
    }
    isPlaying = !isPlaying;
});

audio.addEventListener('timeupdate', () => {
    const progressValue = (audio.currentTime / audio.duration) * 100;
    progress.value = progressValue;
    UpdateTimeDisplay();
});

progress.addEventListener('input', () => {
    const seekTime = (progress.value / 100) * audio.duration;
    audio.currentTime = seekTime;
    UpdateTimeDisplay();
});

volume.addEventListener('input', () => {
    audio.volume = volume.value;
});

prevButton.addEventListener('click', () => {

});

nextButton.addEventListener('click', () => {

});

shuffleButton.addEventListener('click', () => {
    
});

showPlayerBtn.addEventListener("click", function() {
    if (!playerSection.classList.contains("toShow-player-section")) {
        playerSection.classList.add("toShow-player-section");
    }
    else {
        playerSection.classList.remove("toShow-player-section");
    }
});

showPlayerBtn.addEventListener("mouseenter", function() {
    const btnImg = showPlayerBtn.querySelector("img");
    const imgUrl = "images/Coffee beans black.png";
    btnImg.src = imgUrl;
});

showPlayerBtn.addEventListener("mouseleave", function() {
    const btnImg = showPlayerBtn.querySelector("img");
    const imgUrl = "images/Coffee beans white.png";
    btnImg.src = imgUrl;
});


