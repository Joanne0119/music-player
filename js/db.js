import { songsLibrary } from "./songs";

let isLogin = true;
export const songsList = [];
export let currentPlaying;

if(isLogin) {
    songsList = [1,3,5,7];
    currentPlaying = 1;
}
else {
    songsList = [];
    currentPlaying = 0;
}