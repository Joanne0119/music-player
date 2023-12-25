import { songsLibrary } from "./songs.js";
import { removeFromSongsList } from "./db.js";
import { songsList } from "./db.js";
import { addToPlayerFromList } from "./music-player-controls.js";

function addSongHoverEvent(){
  const songs = document.querySelectorAll('.song');
  songs.forEach((song) => {
    const deleteIcons = song.querySelectorAll('i');
    
    song.addEventListener('mouseenter', () => {
      deleteIcons.forEach((deleteIcon) => {
        deleteIcon.classList.add('toDelete');
      });
    })
    song.addEventListener('mouseleave', () => {
      deleteIcons.forEach((deleteIcon) => {
        deleteIcon.classList.remove('toDelete');
      });
    })
  });
}

function addSongPlayingEvent() {
  const songs = document.querySelectorAll('.song');
  songs.forEach((song) => {
    
    song.addEventListener('click', () => {
      addToPlayerFromList(parseInt(song.id));
    });
  });
}

let libraryNumber;
let songsLibraryHTML;
export function renderLibrary() {
  let songsContainer = document.querySelector('.songs-container');
  songsContainer.innerHTML = '';
  songsLibraryHTML = '';
  libraryNumber = 1;
  songsList.forEach((id) => {
      let song;
      songsLibrary.forEach(songData => {
          if(id == songData.id) {
              song = songData;
              return;
          }
      });
      if(!song) return;

      songsLibraryHTML += `
      <div class="song" id="${song.id}">
        <div class="song-main-info">
          <div class="number">${libraryNumber}.</div>
          <img src="${song.image}" alt="${song.title}" class="cover-img">
          <div class="song-info">
            <h4 class="title">${song.title}</h4>
            <p class="singer">${song.singer}</p>
          </div>
        </div>
        <i class="fa-solid fa-plus delete-btn" id="${song.id}"></i>
      </div>
      `;
      libraryNumber++;
      
  });
  songsContainer.innerHTML = songsLibraryHTML;  
  addSongHoverEvent();
  addEventToDeleteButton();
  addSongPlayingEvent();
}

function deleteSong(delBtnId) {
  removeFromSongsList(delBtnId);
  renderLibrary();
}

function addEventToDeleteButton() {
  const delBtns = document.querySelectorAll('.delete-btn');
  
  delBtns.forEach((delBtn) => {
    delBtn.addEventListener('click', function(event) {
      event.stopPropagation();
      const delBtnId = parseInt(delBtn.id);
      deleteSong(delBtnId);
    })
  })
}

