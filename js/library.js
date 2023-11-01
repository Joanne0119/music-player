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
})