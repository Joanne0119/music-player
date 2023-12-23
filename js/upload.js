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
      // You can also use `blobFromFile` for your upload to Firebase Storage if needed
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

function audioUpload(){
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

      // You can also use `blobFromFile` for your upload to Firebase Storage if needed
      
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

  // Upload the file to Firebase Storage
  return fileRef.put(blob);
  // .then((snapshot) => {
  //   console.log('File uploaded successfully');
  //   // Here you can get the download URL if needed
  //   snapshot.ref.getDownloadURL().then((downloadURL) => {
  //     console.log('File available at', downloadURL);

  //     // Do something with the download URL if needed
  //   });
  // }).catch((error) => {
  //   console.error('Error uploading file:', error);
  // });
}

uploadBtn.addEventListener('click', async () => {
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
 
  // uploadBlobToStorage(imgData.blobType, imgData.blobFromFile, imgData.fileNameFromIput);
  // uploadBlobToStorage(audioData.blobType, audioData.blobFromFile, audioData.fileNameFromIput);

  // clearTheInputs();
})

imageUpload();
audioUpload();