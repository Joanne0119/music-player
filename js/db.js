let isLogin = true;
export let songsList = [];
export let currentPlaying = 0;
export let currentPlayingTime = 0;

if(isLogin) {
    songsList = [1,3,5,7];
    currentPlaying = 1;
    currentPlayingTime = 120;
}
else {
    songsList = [];
    currentPlaying = -1;
    currentPlayingTime = 0;
}

export function addToSongsList(id) {
    songsList.push(id);
    if(isLogin) {
        // db
    }
}

export function removeFromSongsList(id) {
    songsList.forEach(song => {
        if(song == id) {
            songsList = songsList.filter(item => item !== song);
            return;
        }
    });
    if(isLogin) {
        // db
    }
}

export function updateCurrentPlaying(id) {
    currentPlaying = id;
    if(isLogin) {
        // db
    }
}