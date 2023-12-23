const footer = document.querySelector('footer');
const playerSection = document.querySelector('.player-section');

function differentPagesWidth(){
  if(playerSection){
    footer.classList.add('widthCompatible');
  }
  else{
    footer.classList.remove('widthCompatible');
  }
}

differentPagesWidth();