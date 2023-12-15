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
import { songsList } from "./db.js";
import { currentPlaying } from "./db.js";
import { currentPlayingTime } from "./db.js";
import { updateCurrentPlaying } from "./db.js";
import { updateCurPlayingTime } from "./db.js";

let isPlaying = false;

export function loadPlayer() {
    if(currentPlaying != -1) {
        currentMusicArea.querySelector("img").src = songsLibrary[songsList[currentPlaying]].image;
        currentMusicArea.querySelector("h4").innerHTML = songsLibrary[songsList[currentPlaying]].title;
        currentMusicArea.querySelector("p").innerHTML = songsLibrary[songsList[currentPlaying]].singer;
        audio.querySelector("source").src = songsLibrary[songsList[currentPlaying]].audio;
        audio.load();
        audio.currentTime = currentPlayingTime;
        totalTime.innerHTML = songsLibrary[songsList[currentPlaying]].totalTime;
    }
}

export function addToPlayerFromList(id) {
    updateCurrentPlaying(id);
    id = songsList[id];
    currentMusicArea.querySelector("img").src = songsLibrary[id].image;
    currentMusicArea.querySelector("h4").innerHTML = songsLibrary[id].title;
    currentMusicArea.querySelector("p").innerHTML = songsLibrary[id].singer;
    audio.querySelector("source").src = songsLibrary[id].audio;
    audio.load(); ToPlay();
    totalTime.innerHTML = songsLibrary[id].totalTime;
}

export function addToPlayerFromCard(id) {
    songsLibrary.forEach(song => {
        if(song.id == id) {
            currentMusicArea.querySelector("img").src = song.image;
            currentMusicArea.querySelector("h4").innerHTML = song.title;
            currentMusicArea.querySelector("p").innerHTML = song.singer;
            audio.querySelector("source").src = song.audio;
            audio.load(); ToPlay();
            totalTime.innerHTML = song.totalTime;
            return;
        }
    });
}

function UpdateCurrentMusic(musicID) {
    if(musicID < 0) {
        updateCurrentPlaying(songsList.length - 1);
    }
    else if(musicID >= songsList.length) {
        updateCurrentPlaying(0);
    }
    else {
        updateCurrentPlaying(musicID);
    }
    //currentPlaying = musicID;
    currentMusicArea.querySelector("img").src = songsLibrary[songsList[currentPlaying]].image;
    currentMusicArea.querySelector("h4").innerHTML = songsLibrary[songsList[currentPlaying]].title;
    currentMusicArea.querySelector("p").innerHTML = songsLibrary[songsList[currentPlaying]].singer;
    audio.querySelector("source").src = songsLibrary[songsList[currentPlaying]].audio;
    audio.load(); ToPlay();
    totalTime.innerHTML = songsLibrary[songsList[currentPlaying]].totalTime;
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
}

playPauseButton.addEventListener('click', () => {
    if (isPlaying) ToPause();
    else ToPlay();
    updateCurPlayingTime(audio.currentTime);
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
    UpdateCurrentMusic(currentPlaying-1);
}

function PlayNextSongs() {
    if(isShuffle) {
        PlayRandomSongs();
        return;
    }
    UpdateCurrentMusic(currentPlaying+1);
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
    while(musicID < 0 || musicID >= songsList.length || musicID == currentPlaying) {
        musicID = Math.floor(Math.random() * (songsList.length));
    }
    UpdateCurrentMusic(musicID);
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