// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCOKcS1fLRAHL36tc77iALqDX-915eWo2k",
    authDomain: "auth-n-tech.firebaseapp.com",
    projectId: "auth-n-tech",
    storageBucket: "auth-n-tech.appspot.com",
    messagingSenderId: "512173331203",
    appId: "1:512173331203:web:4aabae61b83b8c8a6c8f36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;