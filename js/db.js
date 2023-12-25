export let name = "";
export let songsList = [];
export let currentPlaying = -1;
export let currentPlayingTime = 0;
export let playCounts = {};

import { getDataFromDB } from "./login-and-sign-up.js";
import { addToDB } from "./login-and-sign-up.js";1
import { loadPlayer } from "./music-player-controls.js";
import { loadWebContent } from "./reload-page.js";
import { songsLibrary } from "./songs.js";

export function loadDataFromDB() {
    getDataFromDB().then(userData => {
        name = userData[0].name;
        songsList = userData[0].playlist;
        currentPlaying = userData[0].currentPlaying;
        currentPlayingTime = userData[0].currentPlayingTime;
        playCounts = userData[0].playCounts;
        console.log(name, songsList, currentPlaying, currentPlayingTime, playCounts);
        loadPlayer();
        loadWebContent();
    })
    .catch(error => {
        console.error('DB loading wrong：', error);
    });
}

export function addToSongsList(id) {
    if(!songsList.includes(id)) {
        songsList.push(id);
    }
    else {
        return;
    }
    if(songsList.length == 1) {
        currentPlaying = 0;
        loadPlayer();
    }
    songsLibrary.forEach(song => {
        if(song.id == id) {
            song.views += 1;
            playCounts[song.type] = (playCounts[song.type] || 0) + 1;
            return;
        }
    });
    addToDB(songsList, currentPlaying, currentPlayingTime);
}

export function removeFromSongsList(id) {
    songsList = songsList.filter(item => item !== id);
    if(songsList.length == 0) {
        currentPlaying = -1;
        currentPlayingTime = 0;
    }
    addToDB(songsList, currentPlaying, currentPlayingTime);
}

export function updateCurrentPlaying(id) {
    currentPlaying = id;
    addToDB(songsList, currentPlaying, currentPlayingTime);
}

export function updateCurPlayingTime(time) {
    if(songsList.length == 0) return;
    currentPlayingTime = time;
    addToDB(songsList, currentPlaying, currentPlayingTime);
}