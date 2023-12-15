firebase.initializeApp( {
  apiKey: "AIzaSyAHp8UT50gr_00_R4qqPFcVYzmqqHnt3cA",
  authDomain: "music-player-4b448.firebaseapp.com",
  projectId: "music-player-4b448",
  storageBucket: "music-player-4b448.appspot.com",
  messagingSenderId: "647887233294",
  appId: "1:647887233294:web:4f9c838756d55ba81e775f",
  measurementId: "G-DGCPQYPQ1M"
});

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

let SignUpOrNot = false; 
let username = '';
let usersRef = db.collection('users');;

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

function signUpSummit(){
  console.log('sign up summit');
  auth.createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
    .then((res, user) => {
      console.log(res);
      console.log(emailInput.value + ' ' + passwordInput.value);
      username = usernameInput.value;
      console.log(username);
      setTimeout(() => {
        SignUpAndLoginPageSwitch();
        passwordInput.value = '';
      }, 1500);

      //create user database
      user = res.user;
      usersRef.add({
        uid: user.uid,
        name: username,
        email: user.email,
        playlist: [],
        currentPlaying: 0,
        currentPlayingTime: 0
      });
    })
    .catch((err) => {
      console.log(err);
      console.log('格式錯誤');
      incorrectPasswordOrAcount();
    })
}

function goToHomepage(){
  window.location.href = '../index.html';
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
  console.log("hi");
  if(!userData) {
    console.log("no login");
    return [[], -1, 0];
  }
  else {
    return new Promise((resolve, reject) => {
      usersRef.where('uid', '==', userData.uid).get()
        .then(querySnapshot => {
          const userData = [];
          querySnapshot.forEach(doc => {
            userData.push({
              playlist: doc.data().playlist,
              currentPlaying: doc.data().currentPlaying,
              currentPlayingTime: doc.data().currentPlayingTime,
            });
          });
          resolve(userData);
        })
        .catch(error => {
          console.error('查詢出錯：', error);
          reject([[], -1, 0]);
        });
    });
  }
}

export function addToDB(playlist, curID, curTime) {
  if(!userData) return;
  usersRef.where('uid', '==', userData.uid).onSnapshot(querySnapshot => {
    console.log(querySnapshot.docs);
    querySnapshot.forEach(doc => {
      let docId = doc.id;
      let dataName = doc.data().name;
      let dataUid = doc.data().uid;
      let dataEmail = doc.data().email;
      console.log(docId, dataName, dataUid, dataEmail);
      let userdocRef = usersRef.doc(docId);
      console.log(userdocRef);

      userdocRef.set({
        uid: dataUid,
        name: dataName,
        email: dataEmail,
        playlist: playlist,
        currentPlaying: curID,
        currentPlayingTime: curTime
      });
    });
  });
}

import { loadDataFromDB } from "./db.js";
auth.onAuthStateChanged((user) => {
  userData = user;
  loadDataFromDB();
  if(user){
    console.log(user);

    //query and update
    usersRef.where('uid', '==', user.uid).onSnapshot(querySnapshot => {
      console.log(querySnapshot.docs);
      querySnapshot.forEach(doc => {
        let docId = doc.id;
        let dataName = doc.data().name;
        let dataUid = doc.data().uid;
        let dataEmail = doc.data().email;
        console.log(docId, dataName, dataUid, dataEmail);
        let playlist = doc.data().playlist;
        let currentPlaying = doc.data().currentPlaying;
        let currentPlayingTime = doc.data().currentPlayingTime;
        console.log(playlist, currentPlaying, currentPlayingTime);
        let userdocRef = usersRef.doc(docId);
        console.log(userdocRef);
      });
    })

    usersRef.where('uid', '==', userData.uid).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let a = doc.data().playlist;
          let b = doc.data().currentPlaying;
          let c = doc.data().currentPlayingTime;
          console.log(a, b, c);
        });
      })
      .catch(error => {
        console.error('查詢出錯：', error);
      });

  }
  else {
    console.log('not log in...');
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
