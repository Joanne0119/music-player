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

let currentPlaying = 0;
let isPlaying = false;

currentMusicArea.querySelector("img").src = songsLibrary[currentPlaying].image;
currentMusicArea.querySelector("h4").innerHTML = songsLibrary[currentPlaying].title;
currentMusicArea.querySelector("p").innerHTML = songsLibrary[currentPlaying].singer;
audio.querySelector("source").src = songsLibrary[currentPlaying].audio;
audio.load();
// ToPlay();
// ToPause();
// let totTime = (audio.duration/60).toString() + ":" + (audio.duration%60);
// console.log("audio.duration: ", audio.duration);
totalTime.innerHTML = songsLibrary[currentPlaying].totalTime;

export function UpdateCurrentMusic(musicID) {
    console.log(currentPlaying);
    if(musicID < 0 || musicID >= songsLibrary.length) {
        return;
    }
    currentPlaying = musicID;
    currentMusicArea.querySelector("img").src = songsLibrary[currentPlaying].image;
    currentMusicArea.querySelector("h4").innerHTML = songsLibrary[currentPlaying].title;
    currentMusicArea.querySelector("p").innerHTML = songsLibrary[currentPlaying].singer;
    audio.querySelector("source").src = songsLibrary[currentPlaying].audio;
    audio.load(); ToPlay();
    totalTime.innerHTML = songsLibrary[currentPlaying].totalTime;
}

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

function ToPlay() {
    audio.play();
    playPauseButton.innerHTML = 
    `<img src="images/music-player-controls/pause.png" alt="pause">`;
    isPlaying = true;
}

function ToPause() {
    audio.pause();
    playPauseButton.innerHTML = 
    `<img src="images/music-player-controls/play.png" alt="play">`;
    isPlaying = false;
    console.log("audio.duration: ", audio.duration);
}

playPauseButton.addEventListener('click', () => {
    if (isPlaying) ToPause();
    else ToPlay();
});

audio.addEventListener('timeupdate', () => {
    const progressValue = (audio.currentTime / audio.duration) * 100;
    progress.value = progressValue;
    UpdateTimeDisplay();
});

progress.addEventListener('input', () => {
    const seekTime = (progress.value / 100) * audio.duration;
    if(seekTime >= audio.duration * 0.99999) {
        return;
    }
    audio.currentTime = seekTime;
    UpdateTimeDisplay();
});

volume.addEventListener('input', () => {
    audio.volume = volume.value;
});

function PlayPrevSongs() {
    if(isShuffle) {
        PlayRandomSongs();
        return;
    }
    let cnt = 1;
    while((currentPlaying-cnt) >= 0) {
        if (songsLibrary[currentPlaying-cnt].added) {
            currentPlaying -= cnt;
            break;
        }
        else cnt++;
    }
    UpdateCurrentMusic(currentPlaying);
    ToPlay();
}

function PlayNextSongs() {
    if(isShuffle) {
        PlayRandomSongs();
        return;
    }
    let cnt = 1;
    while((currentPlaying+cnt) < songsLibrary.length) {
        console.log(currentPlaying);
        if (songsLibrary[currentPlaying+cnt].added) {
            currentPlaying += cnt;
            break;
        }
        else cnt++;
    }
    UpdateCurrentMusic(currentPlaying);
    ToPlay();
}

prevButton.addEventListener('click', () => {
    PlayPrevSongs();
});

nextButton.addEventListener('click', () => {
    PlayNextSongs();
});

audio.addEventListener("ended", function() {
    PlayNextSongs();
});

let isShuffle = false;
shuffleButton.addEventListener('click', () => {
    isShuffle = !isShuffle;
    if(isShuffle) {
        shuffleButton.querySelector("img").src = "images/music-player-controls/random-hover.png";
    }
    else {
        shuffleButton.querySelector("img").src = "images/music-player-controls/random.png";
    }
});

function PlayRandomSongs() {
    let musicID = currentPlaying;
    while(musicID < 0 || musicID >= songsLibrary.length || songsLibrary[musicID].added == false || musicID == currentPlaying) {
        console.log("suffle: ",musicID);
        musicID = Math.floor(Math.random() * (songsLibrary.length));
    }
    UpdateCurrentMusic(musicID);
    ToPlay();
}

showPlayerBtn.addEventListener("click", function() {
    if (!playerSection.classList.contains("toShow-player-section")) {
        playerSection.classList.add("toShow-player-section");
    }
    else {
        playerSection.classList.remove("toShow-player-section");
    }
});

let isShowingPlayer = false;

showPlayerBtn.addEventListener("click", function() {
    if (isShowingPlayer) {
        const btnImg = showPlayerBtn.querySelector("img");
        const imgUrl = "images/Coffee beans white.png";
        btnImg.src = imgUrl;
    }
    else {
        const btnImg = showPlayerBtn.querySelector("img");
        const imgUrl = "images/Coffee beans black.png";
        btnImg.src = imgUrl;
    }
    isShowingPlayer = !isShowingPlayer;
});