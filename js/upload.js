import { firebaseInitalize } from "./login-and-sign-up.js";
import { songsLibrary } from "./songs.js";

firebaseInitalize();

const fileName = document.getElementById('fileName');
const nameShow = document.getElementById('nameShow');
const imageFileInput = document.getElementById('imageFileInput');
const audioFileInput = document.getElementById('audioFileInput');
const previewImage = document.getElementById('previewImage');
const previewAudio = document.getElementById('previewAudio');
const previewAudioSource = document.getElementById('previewAudioSource');
const summitBtn = document.querySelector('.summit-btn');

function imageUpload(){
  imageFileInput.addEventListener('change', (event) => {
    const blobType = 'images';
    const selectedFile = event.target.files[0]; // Get the first selected file
    if (selectedFile) {
      // Create a Blob object from the selected file
      const blobFromFile = new Blob([selectedFile], { type: selectedFile.type });
      const fileNameFromIput = fileName.value || '';
      // Use FileReader to read the file as a data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        nameShow.innerHTML = fileNameFromIput;
        previewImage.src = e.target.result;
        previewImage.style.display = 'block'; // Show the preview image
      };
      reader.readAsDataURL(blobFromFile);
      
      // You can also use `blobFromFile` for your upload to Firebase Storage if needed
      uploadBlobToStorage(blobType, blobFromFile, fileNameFromIput);
    }
  });
  
}

function audioUpload(){
  audioFileInput.addEventListener('change', (event) => {
    const blobType = 'audio';
    const selectedFile = event.target.files[0]; // Get the first selected file
    if (selectedFile) {
      // Create a Blob object from the selected file
      console.log('in')
      const blobFromFile = new Blob([selectedFile], { type: selectedFile.type });
      const fileNameFromIput = fileName.value || '';
      // Use FileReader to read the file as a data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        previewAudioSource.src = e.target.result;
        previewAudio.style.display = 'block'; // Show the preview audio
      };
      reader.readAsDataURL(blobFromFile);
      
      // You can also use `blobFromFile` for your upload to Firebase Storage if needed
      uploadBlobToStorage(blobType, blobFromFile, fileNameFromIput);
    }
  });
}

function uploadBlobToStorage(type, blob, name) {
  const storage = firebase.storage(); // Get a reference to the Firebase Storage service
  const storageRef = storage.ref(); // Get a reference to the root of your storage bucket
  console.log(blob);
  const filePath = type + '/' + name; // Define the file path

  // Create a reference to the location where you want to store the file in storage
  const fileRef = storageRef.child(filePath); // Replace 'path/to/your/file.jpg' with your desired path and filename

  // Upload the file to Firebase Storage
  fileRef.put(blob).then((snapshot) => {
    console.log('File uploaded successfully');
    // Here you can get the download URL if needed
    snapshot.ref.getDownloadURL().then((downloadURL) => {
      console.log('File available at', downloadURL);
      // Do something with the download URL if needed
    });
  }).catch((error) => {
    console.error('Error uploading file:', error);
  });
}