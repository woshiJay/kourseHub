import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';

// Firebase Configurations
const firebaseConfig = {
    apiKey: "AIzaSyAKW67y2atOvo9w_l47Lcg-14vHYik1JZw",
    authDomain: "koursehub.firebaseapp.com",
    databaseURL: "https://koursehub-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "koursehub",
    storageBucket: "koursehub.appspot.com",
    messagingSenderId: "955512527180",
    appId: "1:955512527180:web:c721dfb8d2d7d6858a97e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    
});

// TODO: 
// 1. Add a loading spinner while the user is being authenticated
// 2. Fix looping issue after logging in but prompted to index page again