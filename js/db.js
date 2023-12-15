export let songsList = [];
export let currentPlaying = 0;
export let currentPlayingTime = 0;

import { getDataFromDB } from "./login-and-sign-up.js";
import { addToDB } from "./login-and-sign-up.js";1
import { loadPlayer } from "./music-player-controls.js";

export function loadDataFromDB() {
    getDataFromDB().then(userData => {
        console.log(userData);
        songsList = userData[0].playlist;
        currentPlaying = userData[0].currentPlaying;
        currentPlayingTime = userData[0].currentPlayingTime;
        console.log(songsList, currentPlaying, currentPlayingTime);
        loadPlayer();
    })
    .catch(error => {
        console.error('處理資料時出錯：', error);
    });
}

export function addToSongsList(id) {
    songsList.push(id);
    console.log(songsList);
    addToDB(songsList, currentPlaying, currentPlayingTime);
}

export function removeFromSongsList(id) {
    songsList = songsList.filter(item => item !== id);
    addToDB(songsList, currentPlaying, currentPlayingTime);
}

export function updateCurrentPlaying(id) {
    currentPlaying = id;
    addToDB(songsList, currentPlaying, currentPlayingTime);
}

export function updateCurPlayingTime(time) {
    currentPlayingTime = time;
    addToDB(songsList, currentPlaying, currentPlayingTime);
}