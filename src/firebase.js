/*
 *Instalar firebase npm i firebase, el siguiente codigo nos lo da cuando creamos el proyecto */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBotXvYeiU_718ZXFBfDQnolaMg65ytyL8",
  authDomain: "shop-9edf1.firebaseapp.com",
  projectId: "shop-9edf1",
  storageBucket: "shop-9edf1.appspot.com",
  messagingSenderId: "261517754327",
  appId: "1:261517754327:web:dffdb3d8e6edc3d8375592",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/*
 *Lo exportamos */
export default app;
