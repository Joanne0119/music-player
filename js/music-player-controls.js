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
const pullBtn = document.querySelector('.pulloutBtn');
const playerLessThen1250px = document.querySelector('.player-less-than-1250px')
import { songsLibrary } from "./songs.js";
import { songsList } from "./db.js";
import { currentPlaying } from "./db.js";
import { currentPlayingTime } from "./db.js";
import { updateCurrentPlaying } from "./db.js";
import { updateCurPlayingTime } from "./db.js";
import { playCounts } from "./db.js";

let isPlaying = false;
let isPlayingOther = false;

export function loadPlayer() {
    if(!playerSection) return;
    if (currentPlaying != -1) {
        let song;
        songsLibrary.forEach(songData => {
            if(songsList[currentPlaying] == songData.id) {
                song = songData;
                return;
            }
        });
        if(!song) return;
        currentMusicArea.querySelector("img").src = song.image;
        currentMusicArea.querySelector("h4").innerHTML = song.title;
        currentMusicArea.querySelector("p").innerHTML = song.singer;
        audio.querySelector("source").src = song.audio;
        audio.load();
        audio.currentTime = currentPlayingTime;
        isPlaying = false;
        ToPause();
        isPlayingOther = false;
    }
}

export function addToPlayerFromList(id, listId) {
    let song;
    songsLibrary.forEach(songData => {
        if(id == songData.id) {
            song = songData;
            return;
        }
    });
    if(!song) return;
    updateCurrentPlaying(listId);
    currentMusicArea.querySelector("img").src = song.image;
    currentMusicArea.querySelector("h4").innerHTML = song.title;
    currentMusicArea.querySelector("p").innerHTML = song.singer;
    audio.querySelector("source").src = song.audio;
    audio.load(); ToPlay();
    isPlayingOther = false;
}

export function addToPlayerFromCard(id) {
    songsLibrary.forEach(song => {
        if(song.id == id) {
            song.views += 1;
            playCounts[song.type] = (playCounts[song.type] || 0) + 1;
            currentMusicArea.querySelector("img").src = song.image;
            currentMusicArea.querySelector("h4").innerHTML = song.title;
            currentMusicArea.querySelector("p").innerHTML = song.singer;
            audio.querySelector("source").src = song.audio;
            audio.load(); ToPlay();
            return;
        }
    });
    isPlayingOther = true;
}

const toDo_Per1Sec = setInterval(updateTimeToDB, 1000);

function updateTimeToDB() {
    if(isPlayingOther) return;
    if(isPlaying) updateCurPlayingTime(audio.currentTime);
}

function UpdateCurrentMusic(musicID) {
    if(currentPlaying == -1) return;
    if(musicID < 0) {
        updateCurrentPlaying(songsList.length - 1);
    }
    else if(musicID >= songsList.length) {
        updateCurrentPlaying(0);
    }
    else {
        updateCurrentPlaying(musicID);
    }
    let song;
    songsLibrary.forEach(songData => {
        if(songsList[currentPlaying] == songData.id) {
            song = songData;
            return;
        }
    });
    if(!song) return;
    currentMusicArea.querySelector("img").src = song.image;
    currentMusicArea.querySelector("h4").innerHTML = song.title;
    currentMusicArea.querySelector("p").innerHTML = song.singer;
    audio.querySelector("source").src = song.audio;
    audio.load(); ToPlay();
    isPlayingOther = false;
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

function GetTotTime(totTIme) {
    const minutes =
          (Math.floor(totTIme / 60) < 10)? 
          "0" + Math.floor(totTIme / 60).toString() 
          : Math.floor(totTIme / 60).toString();
    const seconds =
          (Math.floor(totTIme % 60) < 10)? 
          "0" + Math.floor(totTIme % 60).toString() 
          : Math.floor(totTIme % 60).toString();
    totalTime.innerHTML = `${minutes}:${seconds}`;
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

function PlayPrevSongs() {
    if(isPlayingOther) return;
    if(isShuffle) {
        PlayRandomSongs();
        return;
    }
    UpdateCurrentMusic(currentPlaying-1);
}

function PlayNextSongs() {
    if(isPlayingOther) return;
    if(isShuffle) {
        PlayRandomSongs();
        return;
    }
    UpdateCurrentMusic(currentPlaying+1);
}

let isShuffle = false;
function PlayRandomSongs() {
    let musicID = currentPlaying;
    while(musicID < 0 || musicID >= songsList.length || musicID == currentPlaying) {
        musicID = Math.floor(Math.random() * (songsList.length));
    }
    UpdateCurrentMusic(musicID);
}



let isShowingPlayer = false;

if(playerSection) {
    playPauseButton.addEventListener('click', () => {
        if (isPlaying) ToPause();
        else ToPlay();
    });

    audio.addEventListener('loadedmetadata', function () {
        GetTotTime(audio.duration);
    });
    
    audio.addEventListener('timeupdate', () => {
        const progressValue = (audio.currentTime / audio.duration) * 100;
        if(progressValue) progress.value = progressValue;
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
    prevButton.addEventListener('click', () => {
        PlayPrevSongs();
    });
    
    nextButton.addEventListener('click', () => {
        PlayNextSongs();
    });
    
    audio.addEventListener("ended", function() {
        ToPause();
        PlayNextSongs();
    });
    shuffleButton.addEventListener('click', () => {
        isShuffle = !isShuffle;
        if(isShuffle) {
            shuffleButton.querySelector("img").src = "images/music-player-controls/random-hover.png";
        }
        else {
            shuffleButton.querySelector("img").src = "images/music-player-controls/random.png";
        }
    });
    pullBtn.addEventListener('click', function(){
        if(!playerLessThen1250px.classList.contains("to-show-player-icon")){
            playerLessThen1250px.classList.add("to-show-player-icon");
            if (!playerSection.classList.contains("toShow-player-section")){
                playerSection.classList.add("toShow-player-section");
            }
        }
        else{
            playerLessThen1250px.classList.remove("to-show-player-icon");
            if (playerSection.classList.contains("toShow-player-section")){
                playerSection.classList.remove("toShow-player-section");
            }
        }
        
    })
    
    showPlayerBtn.addEventListener("click", function() {
        if (!playerSection.classList.contains("toShow-player-section")) {
            playerSection.classList.add("toShow-player-section");
        }
        else {
            playerSection.classList.remove("toShow-player-section");
        }
    });
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
}

