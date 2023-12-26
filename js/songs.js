export let songsLibrary = [];
export let typeLibrary = {};
export let sortedTypeLibrary = [];

import { fetchSongsData } from "./upload.js";
import { loadWebContent } from "./reload-page.js";
import { loadPlayer } from "./music-player-controls.js";

export async function loadSongsLibrary() {
    songsLibrary = await fetchSongsData();
    console.log('songsLibrary:', songsLibrary);
    setTypeLibrary();
    loadWebContent();
    loadPlayer();
}

function setTypeLibrary() {
    songsLibrary.forEach(song => {
        typeLibrary[song.type] = typeLibrary[song.type] ? (typeLibrary[song.type]+song.view):song.view;
    });
    sortedTypeLibrary = Object.keys(typeLibrary);
    sortedTypeLibrary.sort((a, b) => typeLibrary[b] - typeLibrary[a]);
    console.log(sortedTypeLibrary);
}