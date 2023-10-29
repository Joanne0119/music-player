const loader = document.querySelector('.loading-container');

window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add("loader-hidden");

    loader.addEventListener('transitionend', () => {
    document.body.removeChild(loader);
  })
  }, 3500);
})