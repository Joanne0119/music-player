import { firebaseInitalize } from "./login-and-sign-up.js";

firebaseInitalize();

const db = firebase.firestore();
let songsListRef = db.collection('songsList');

const fileName = document.getElementById('fileName');
const fileCreater = document.getElementById('fileCreater');
const typeName = document.getElementById('typeName');
const imageFileInput = document.getElementById('imageFileInput');
const audioFileInput = document.getElementById('audioFileInput');
const imageFileStyle = document.getElementById('imageFileStyle');
const audioFileStyle = document.getElementById('audioFileStyle');
const previewImage = document.getElementById('previewImage');
const previewAudio = document.getElementById('previewAudio');
const previewAudioSource = document.getElementById('previewAudioSource');
const uploadBtn = document.querySelector('.upload-btn');

let imgData = '';
let audioData = '';

function imageUpload(){
  if(imageFileInput) {
    imageFileInput.addEventListener('change', (event) => {
      const selectedFile = event.target.files[0]; // Get the first selected file
      let blobFromFile = '';
      let fileNameFromIput = '';
      if (selectedFile) {
        console.log('inI');
        // Create a Blob object from the selected file
        blobFromFile = new Blob([selectedFile], { type: selectedFile.type });
        fileNameFromIput = fileName.value || '';
        // Use FileReader to read the file as a data URL
        const reader = new FileReader();
        reader.onload = (e) => {
          previewImage.src = e.target.result;
          previewImage.style.display = 'block'; // Show the preview image
        };
        reader.readAsDataURL(blobFromFile);
        
        console.log(blobFromFile);
        
        imgData = {
          blobType: 'images',
          blobFromFile: blobFromFile,
          fileNameFromIput: fileNameFromIput
        }
      }
      else{
        console.log('no');
        previewImage.src = '';
      }
    });
  }
}

function audioUpload(){
  if(audioFileInput) {
    audioFileInput.addEventListener('change', (event) => {
      const selectedFile = event.target.files[0]; // Get the first selected file
      let blobFromFile = '';
      let fileNameFromIput = '';
      let audioUrl = '';
      if (selectedFile) {
        // Create a Blob object from the selected file
        console.log('inA')
        blobFromFile = new Blob([selectedFile], { type: selectedFile.type });
        fileNameFromIput = fileName.value || '';
        audioUrl = URL.createObjectURL(blobFromFile, blobFromFile.type); // Create a URL for the audio file
        // Use FileReader to read the file as a data URL
        const reader = new FileReader();
        reader.onload = () => {
          previewAudioSource.src = audioUrl;
          previewAudio.load(); 
          previewAudio.style.display = 'block'; // Show the preview audio
        };
        reader.readAsDataURL(blobFromFile);
        
        console.log(blobFromFile);
        
        audioData = {
          blobType: 'audio',
          blobFromFile: blobFromFile,
          fileNameFromIput: fileNameFromIput
        }
      }
      else{
        console.log('no');
        previewAudioSource.src = '';
        previewAudio.load(); 
      }
    });
  }
}

function checkingAllFilled(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const filled = fileName.value && fileCreater.value && typeName.value && previewImage.src && previewAudioSource.src;
      resolve(filled);
    }, 1000); 
  });
}

function clearTheInputs(){
  fileName.value = '';
  fileCreater.value = '';
  typeName.value = '';
  imageFileInput.value = '';
  audioFileInput.value = '';
  previewImage.src = '';
  previewAudioSource.src = '';
  previewAudio.load(); 
}

function uploadBlobToStorage(type, blob, name) {
  const storage = firebase.storage(); // Get a reference to the Firebase Storage service
  const storageRef = storage.ref(); // Get a reference to the root of your storage bucket
  console.log(blob);
  const filePath = type + '/' + name; // Define the file path

  // Create a reference to the location where you want to store the file in storage
  const fileRef = storageRef.child(filePath); // Replace 'path/to/your/file.jpg' with your desired path and filename

  return fileRef.put(blob);
}

if(uploadBtn) {
  uploadBtn.addEventListener('click', async () => {
    const isFilled = await checkingAllFilled();
    if (isFilled) {
      console.log('upload');
      try{
        const imgUploadTask = uploadBlobToStorage(imgData.blobType, imgData.blobFromFile, imgData.fileNameFromIput);
        const audioUploadTask = uploadBlobToStorage(audioData.blobType, audioData.blobFromFile, audioData.fileNameFromIput);
  
        const [imgSnapshot, audioSnapshot] = await Promise.all([imgUploadTask, audioUploadTask]);
  
        const imgDownloadURL = await imgSnapshot.ref.getDownloadURL();
        const audioDownloadURL = await audioSnapshot.ref.getDownloadURL();
        console.log('Image file available at', imgDownloadURL);
        console.log('audio file available at', audioDownloadURL);
  
        songsListRef.add({
          id: '' + new Date().getTime(),
          title: fileName.value || '',
          singer: fileCreater.value || '',
          image: imgDownloadURL,
          audio: audioDownloadURL,
          type: typeName.value || '',
          view: 0
        }).then((docRef) => {
          console.log('Download URLs stored in Firestore with ID: ', docRef.id);
          clearTheInputs(); // Clear inputs after successful upload
        }).catch((error) => {
          console.error('Error storing download URLs in Firestore: ', error);
        });
      } catch (error) {
        console.error('Error uploading files:', error);
      }
    } else {
      console.log("請填寫所有欄位");
      console.log(previewImage.src);
  
      if(fileName.value == ''){
        fileName.classList.add('mustFillError');
        console.log('name');
        setTimeout(() => {
          fileName.classList.remove('mustFillError');
        },200);
      }
      if(fileCreater.value == ''){
        fileCreater.classList.add('mustFillError');
        console.log('creater');
        setTimeout(() => {
          fileCreater.classList.remove('mustFillError');
        },200);
      }
      if(typeName.value == ''){
        typeName.classList.add('mustFillError');
        console.log('type');
        setTimeout(() => {
          typeName.classList.remove('mustFillError');
        },200);
      }
      if(previewImage.src === ''){
        imageFileStyle.classList.add('mustFillError');
        console.log('img');
        setTimeout(() => {
          imageFileStyle.classList.remove('mustFillError');
        },200);
      }
      if(previewAudioSource.src === ''){
        audioFileStyle.classList.add('mustFillError');
        console.log('audio');
        setTimeout(() => {
          audioFileStyle.classList.remove('mustFillError');
        },200);
      }
    }
  })
}


imageUpload();
audioUpload();

function getSongsData() {
    return new Promise((resolve, reject) => {
      songsListRef.get()
        .then(querySnapshot => {
            const songsData = [];
            querySnapshot.forEach(doc => {
                songsData.push({
                    id: doc.data().id,
                    title: doc.data().title,
                    singer: doc.data().singer,
                    image: doc.data().image,
                    audio: doc.data().audio,
                    type: doc.data().type,
                    view: doc.data().view
                });
            });
            resolve(songsData);
        })
        .catch(error => {
            console.error('fail to load songs library:', error);
            reject([]);
        });
    });
}

export async function fetchSongsData() {
    try {
        const songsData = await getSongsData();
        const keyValueArray = songsData.map(song => ({
            id: song.id,
            title: song.title,
            singer: song.singer,
            image: song.image,
            audio: song.audio,
            type: song.type,
            view: song.view
      }));
      return keyValueArray;
  }
  catch (error) {
      console.error('Error fetching songs data:', error);
      return [];
  }
}