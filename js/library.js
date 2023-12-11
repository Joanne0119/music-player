import { songsLibrary } from "./songs.js";
console.log(songsLibrary);

function addSongHoverEvent(){
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
}

let libraryNumber;
let songsLibraryHTML;
export function renderLibrary() {
  let songsContainer = document.querySelector('.songs-container');
  songsContainer.innerHTML = '';
  songsLibraryHTML = '';
  libraryNumber = 1;
  songsLibrary.forEach((song) => {
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
      <i class="fa-solid fa-plus delete-btn" id="id${song.id}"></i>
    </div>
      `;
      libraryNumber++;
    }
  });
  
  songsContainer.innerHTML = songsLibraryHTML;  
  addSongHoverEvent();
  addEventToDeleteButton();
  console.log(songsLibraryHTML);
  console.log(songsLibrary)
}

function deleteSong(delBtnId) {
  songsLibrary.forEach((song) => {
    if(delBtnId === `id${song.id}`){
      song.added = false;
      console.log(song);
    }
    renderLibrary();
  })
  console.log('delete!');
  localStorage.setItem('songsLibrary', JSON.stringify(songsLibrary));
  console.log(songsLibrary);
}



function addEventToDeleteButton() {
  const delBtns = document.querySelectorAll('.delete-btn');
  console.log(delBtns)
  
  delBtns.forEach((delBtn) => {
    delBtn.addEventListener('click', () => {
      const delBtnId = String(delBtn.id);
      console.log(delBtnId);
      deleteSong(delBtnId);
    })
  })
}

