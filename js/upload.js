import { firebaseInitalize } from "./login-and-sign-up.js";

firebaseInitalize();

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

function imageUpload(){
  imageFileInput.addEventListener('change', (event) => {
    const blobType = 'images';
    const selectedFile = event.target.files[0]; // Get the first selected file
    if (selectedFile) {
      console.log('inI');
      // Create a Blob object from the selected file
      const blobFromFile = new Blob([selectedFile], { type: selectedFile.type });
      const fileNameFromIput = fileName.value || '';
      // Use FileReader to read the file as a data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImage.src = e.target.result;
        previewImage.style.display = 'block'; // Show the preview image
      };
      reader.readAsDataURL(blobFromFile);
      
      console.log(blobFromFile);
      // You can also use `blobFromFile` for your upload to Firebase Storage if needed
      uploadBlobToStorage(blobType, blobFromFile, fileNameFromIput);
    }
    else{
      console.log('no');
      previewImage.src = '';
    }
  });
  
}

function audioUpload(){
  audioFileInput.addEventListener('change', (event) => {
    const blobType = 'audio';
    const selectedFile = event.target.files[0]; // Get the first selected file
    if (selectedFile) {
      // Create a Blob object from the selected file
      console.log('inA')
      const blobFromFile = new Blob([selectedFile], { type: selectedFile.type });
      const fileNameFromIput = fileName.value || '';
      const audioUrl = URL.createObjectURL(blobFromFile, blobFromFile.type); // Create a URL for the audio file
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
      
      uploadBlobToStorage(blobType, blobFromFile, fileNameFromIput);
    }
    else{
      console.log('no');
      previewAudioSource.src = '';
      previewAudio.load(); 
    }
  });
}

function uploadBlobToStorage(type, blob, name) {
  const storage = firebase.storage(); // Get a reference to the Firebase Storage service
  const storageRef = storage.ref(); // Get a reference to the root of your storage bucket
  console.log(blob);

  uploadBtn.addEventListener('click', () => {
    console.log('upload');
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
   })
}

imageUpload();
audioUpload();