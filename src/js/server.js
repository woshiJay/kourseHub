const express = require('express')
const cors = require('cors')
const app = express();
const port = 5501;
app.use(express.json());
app.use(cors());

// ----------------------------------------------------------------------
// Initializing of Firebase Admin SDK
// ----------------------------------------------------------------------
const admin = require('firebase-admin')
const { getAuth } = require("firebase-admin/auth");
const serviceAccount = require("../../koursehub-6ebca4ab6372.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://koursehub-default-rtdb.asia-southeast1.firebasedatabase.app"
});

// ----------------------------------------------------------------------
// Initializing of Firebase SDK
// ----------------------------------------------------------------------
const firebase = require("firebase/app");
const firebaseAuth = require("firebase/auth");
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };

  firebase.initializeApp(firebaseConfig);


// Sign up route
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    const auth = getAuth();
    console.log("I am receiving signup request!")
    try {
        const user = await auth.createUser({
            email: email,
            password: password
        })
        .catch((error) => {
            if (error.code === 'auth/email-already-exists') {
                console.log('User already exists')
            } else {
                console.log('Error creating user:', error)
            }
        })

        res.status(200).json({ message: 'User created successfully', user });
    } catch (error) {
        console.log("ERROR", error)
    }
});

// Sign in route
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const firebaseAuthentication = firebaseAuth.getAuth();
    console.log("I am receiving sign in request!")
    try {
        firebaseAuth.signInWithEmailAndPassword(firebaseAuthentication, email, password).then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            res.status(200).json({ message: 'User signed in successfully', user });
        
        })
        
    } catch (error) {
        console.log("ERROR", error)
        res.status(400).json({ message: 'Invalid credentials' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});