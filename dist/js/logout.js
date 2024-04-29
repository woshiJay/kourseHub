import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

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

// Sign Out
const signOutButton = document.getElementById('signOutButton');
signOutButton.addEventListener('click', (e) => {
    e.preventDefault();

    // Use Firebase's signOut method
    signOut(auth).then(() => {
        console.log("User signed out successfully!");
        sessionStorage.removeItem('userId'); // Remove the user's session data
        window.location.href = 'index.html'; // Redirect to the index page
    }).catch((error) => {
        console.error("Error:", error);
    });
});