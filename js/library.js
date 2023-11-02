import { songsLibrary } from "./songs.js";
console.log(songsLibrary);
const songs = document.querySelectorAll('.song');

songs.forEach((song) => {
  const deleteIcons = song.querySelectorAll('i');
  
  song.addEventListener('mouseenter', () => {
    console.log('mouse Enter');
    deleteIcons.forEach((deleteIcon) => {
      deleteIcon.classList.add('toDelete');
    });
  })
  song.addEventListener('mouseleave', () => {
    console.log('mouse Leave');
    deleteIcons.forEach((deleteIcon) => {
      deleteIcon.classList.remove('toDelete');
    });
  })
});

let songsLibraryHTML = '';
songsLibrary.forEach((song) => {
  let libraryNumber = 1;
  if(song.added) {
    songsLibraryHTML += `
    <div class="song">
    <div class="song-main-info">
      <div class="number">${libraryNumber}.</div>
      <img src="${song.image}" alt="${song.title}" class="cover-img">
      <div class="song-info">
        <h4 class="title">${song.title}</h4>
        <p class="singer">${song.singer}</p>
      </div>
    </div>
    <i class="fa-solid fa-plus"></i>
  </div>
    `;
  }
});

document.querySelector('.songs-container').innerHTML = songsLibraryHTML;