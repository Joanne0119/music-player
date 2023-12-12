const wrapper =  document.querySelector('.wrapper');
const formTitle =  document.querySelector('.form-title');
const usernameInput = document.querySelector('.js-username-input');
const usernameBox = document.querySelector('.username-box');
const emailInput = document.querySelector('.js-email-input');
const passwordInput = document.querySelector('.js-password-input');
const summitBtn = document.querySelector('.summit-btn');
const questionText = document.querySelector('.question-text');
const link = document.querySelector('.link');
const rememberForgot = document.querySelector('.remember-forgot');

let SignUpOrNot = false;

summitBtn.addEventListener('click', () => {
  
})

link.addEventListener('click', () => {
  if(!SignUpOrNot){ //Sign up
    usernameBox.classList.remove('username-not-show');
    usernameBox.innerHTML = `
      <input class="js-username-input" type="text" placeholder="請輸入您的使用者名稱" required>
      <i class="fa-solid fa-user"></i>
    `
    rememberForgot.classList.add('not-show');
    formTitle.innerHTML = `註冊`;
    summitBtn.innerHTML = `註冊`;
    questionText.innerHTML = `已經有帳號了? `;
    link.innerHTML = `登入`;
    console.log(SignUpOrNot);
    SignUpOrNot = !SignUpOrNot;
  }
  else { //Login
    usernameBox.classList.add('username-not-show');
    rememberForgot.classList.remove('not-show');
    usernameBox.innerHTML = `
      <input class="js-username-input" type="text" placeholder="請輸入您的使用者名稱">
      <i class="fa-solid fa-user"></i>
    `
    formTitle.innerHTML = `登入`;
    summitBtn.innerHTML = `登入`;
    questionText.innerHTML = `還沒有帳號? `;
    link.innerHTML = `註冊`;
    console.log(SignUpOrNot);
    SignUpOrNot = !SignUpOrNot;
  }
})

function signUpPageRender() {

}

