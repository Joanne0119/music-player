const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('play-pause');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const shuffleButton = document.getElementById('shuffle');
const currentTime = document.getElementById('current-time');
const totalTime = document.getElementById('total-time');

let isPlaying = false;

//totalTime.innerHTML = `${Math.floor(audio.duration / 60)}:${Math.floor(audio.duration % 60)}`;

function updateTimeDisplay() {
            
    const currentMinutes =
          (Math.floor(audio.currentTime / 60) < 10)? 
          "0" + Math.floor(audio.currentTime / 60).toString() 
          : Math.floor(audio.currentTime / 60).toString();
    const currentSeconds =
          (Math.floor(audio.currentTime % 60) < 10)? 
          "0" + Math.floor(audio.currentTime % 60).toString() 
          : Math.floor(audio.currentTime % 60).toString();

    const totalMinutes = Math.floor(audio.duration / 60);
    const totalSeconds = Math.floor(audio.duration % 60);

    currentTime.innerHTML = `${currentMinutes}:${currentSeconds}`;
    totalTime.innerHTML = `${totalMinutes}:${totalSeconds}`;
}

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
    updateTimeDisplay();
});

progress.addEventListener('input', () => {
    const seekTime = (progress.value / 100) * audio.duration;
    audio.currentTime = seekTime;
    updateTimeDisplay();
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
