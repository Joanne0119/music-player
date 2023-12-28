export function firebaseInitalize(){
  return firebase.initializeApp( {
    apiKey: "AIzaSyCF3s-mPifwQF5mHLhF6pnPGEOXldPG24s",
    authDomain: "music-6716e.firebaseapp.com",
    projectId: "music-6716e",
    storageBucket: "music-6716e.appspot.com",
    messagingSenderId: "985965400915",
    appId: "1:985965400915:web:3495b9196029e01b3e87a6",
    measurementId: "G-J51M0SKZLK"
  });
}

firebaseInitalize();

// Initialize Firebase
const auth = firebase.auth();
const db = firebase.firestore();

const wrapper =  document.querySelector('.wrapper');
const inputBox = document.querySelectorAll('.input-box');
const formTitle =  document.querySelector('.form-title');
const usernameInput = document.querySelector('.js-username-input');
const usernameBox = document.querySelector('.username-box');
const emailInput = document.querySelector('.js-email-input');
const passwordInput = document.querySelector('.js-password-input');
const summitBtn = document.querySelector('.summit-btn');
const questionText = document.querySelector('.question-text');
const link = document.querySelector('.link');
const rememberForgot = document.querySelector('.remember-forgot');
const navLogin = document.querySelector('.nav-login');

let SignUpOrNot = false; 
let username = '';
let usersRef = db.collection('users');

function loginSummit(){
  console.log('login summit');
  auth.signInWithEmailAndPassword(emailInput.value, passwordInput.value)
    .then((res) => {
      console.log(res);
      console.log(emailInput.value + ' ' + passwordInput.value);
      goToHomepage();
    })
    .catch((err) => {
      incorrectPasswordOrAcount();
      console.log(err);
      console.log('帳密錯誤或帳號不存在');
    })
}

async function signUpSummit() {
  try {
    console.log('sign up summit');
    const res = await auth.createUserWithEmailAndPassword(emailInput.value, passwordInput.value);

    console.log(res);
    console.log(emailInput.value + ' ' + passwordInput.value);
    const username = usernameInput.value || "user";

    setTimeout(() => {
      SignUpAndLoginPageSwitch();
      passwordInput.value = '';
    }, 1500);

    const user = res.user;

    await usersRef.add({
      uid: user.uid,
      name: username,
      email: user.email,
      playlist: [],
      currentPlaying: -1,
      currentPlayingTime: 0,
      playCounts: {}
    });

    await auth.signOut();
    console.log('User signed out after signing up');
    return navLoginHTML();
  } catch (err) {
    console.log(err);
    console.log('格式錯誤');
    incorrectPasswordOrAcount();
  }
}

function navLoginHTML(){
  document.querySelector('.nav-login').innerHTML = "登入／註冊";
  console.log(navLogin);
  location.reload();
}

export function signOut() {
  console.log('sign out');
  auth.signOut();
}

function goToHomepage(){
  window.location.href = 'index.html?toload=home';
}

function incorrectPasswordOrAcount(){
  inputBox.forEach((box) => {
    box.classList.add('incorrect');
  });
  usernameInput.value = '';
  emailInput.value = '';
  passwordInput.value = '';
  setTimeout(() => {
    inputBox.forEach((box) => {
      box.classList.remove('incorrect');
    });
  },200);
}
  
function SignUpAndLoginPageSwitch(){
  if(!SignUpOrNot){ //Sign up
    usernameBox.classList.remove('username-not-show');
    usernameInput.attributes.required = true;
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
    usernameInput.attributes.required = false;
    formTitle.innerHTML = `登入`;
    summitBtn.innerHTML = `登入`;
    questionText.innerHTML = `還沒有帳號? `;
    link.innerHTML = `註冊`;
    console.log(SignUpOrNot);
    SignUpOrNot = !SignUpOrNot;
  }
}

function summitBtnFun(){
  if(SignUpOrNot){
    signUpSummit();
  }else{
    loginSummit();
  }
}

let userData;

export function getDataFromDB() {
  return new Promise((resolve, reject) => {
    if (!userData) {
      resolve(["", [], -1, 0, {}]);
    } else {
      usersRef.where('uid', '==', userData.uid).get()
        .then(querySnapshot => {
          const userData = [];
          querySnapshot.forEach(doc => {
            userData.push({
              name: doc.data().name,
              playlist: doc.data().playlist,
              currentPlaying: doc.data().currentPlaying,
              currentPlayingTime: doc.data().currentPlayingTime,
              playCounts: doc.data().playCounts
            });
          });
          resolve(userData);
        })
        .catch(error => {
          console.error('fail to getDataFromDB():', error);
          reject(["", [], -1, 0, {}]);
        });
    }
  });
}

export function updateUserDataToDB(playlist, curID, curTime) {
  if(!userData) return;
  usersRef.where('uid', '==', userData.uid).get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let userdocRef = usersRef.doc(doc.id);
        userdocRef.update({
          playlist: playlist,
          currentPlaying: curID,
          currentPlayingTime: curTime
        })
        .catch(error => {
          console.error("Error updating document: ", error);
        });
      });
    })
    .catch(error => {
      console.error("Error fetching documents: ", error);
    });
}

export function updateUserDataToDBByplayCounts(playCounts) {
  if(!userData) return;
  usersRef.where('uid', '==', userData.uid).get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let userdocRef = usersRef.doc(doc.id);
        userdocRef.update({
          playCounts: playCounts,
        })
        .catch(error => {
          console.error("Error updating document: ", error);
        });
      });
    })
    .catch(error => {
      console.error("Error fetching documents: ", error);
    });
}

import { loadDataFromDB } from "./db.js";
import { loadSongsLibrary } from "./songs.js";

auth.onAuthStateChanged((user) => {
  userData = user;
  if(user){
    console.log("hi,", user);
    navLogin.innerHTML = "登出";
    navLogin.href = "index.html";
    loadDataFromDB();
  }
  else {
    console.log('not log in...');
    navLogin.innerHTML = "登入／註冊";
    navLogin.href = "login-and-sign-up.html";
    loadSongsLibrary();
  }
});

if(summitBtn) {
  summitBtn.addEventListener('click', () => {
    summitBtnFun();
  });
}

if(link) {
  link.addEventListener('click', () => {
    SignUpAndLoginPageSwitch();
  });
}
