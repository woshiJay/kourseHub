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
const db = admin.database();

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

// ----------------------------------------------------------------------
// Initializing of VertexAI Generative Model
// ----------------------------------------------------------------------
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyDT78vWMf3PSG65mylFkLYrfis0ug_CBSM");

// Sign up route
app.post('/signup', async (req, res) => {

    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).json({ alert: 'Please ensure that all fields are filled.' });
        return;
    }
    const auth = getAuth();

    const userRecord = await auth.createUser({
        email: email,
        password: password
    })
        .catch((error) => {
            if (error.code === 'auth/email-already-exists') {
                res.status(400).json({ alert: 'Email already exists! Please proceed to Login.' });
            } else {
                res.status(400).json({ alert: error.code })
            }
        })

    const userId = userRecord.uid;
    const userRef = db.ref(`users/${userId}`);
    await userRef.set({ username: username })
    res.status(200).json({ redirect: '/dist/login.html' });
});

// Sign in route
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const firebaseAuthentication = firebaseAuth.getAuth();

    firebaseAuth.signInWithEmailAndPassword(firebaseAuthentication, email, password)
        .then((userCredential) => {
            // Signed in
            res.status(200).json({ message: "User signed in successfully!", uid: userCredential.user.uid })
        })
        .catch((error) => {
            res.status(401).json({ alert: 'Invalid email or password! Please try again.' });
        });
});

// Sign out route
app.get('/signout', async (req, res) => {
    firebaseAuth.getAuth().signOut()
        .then(() => {
            res.status(200).json({ message: "User signed out successfully!" })
        })
        .catch((error) => {
        });
});

// Get username route
app.get('/get-username', async (req, res) => {
    const userId = req.query.uid;
    if (!userId) {
        return res.status(400).json({ alert: "User ID is required!" });
    }

    const userRef = db.ref(`users/${userId}`);
    try {
        const snapshot = await userRef.once('value');
        if (snapshot.exists()) {
            const username = snapshot.val().username;
            return res.status(200).json({ username: username });
        } else {
            return res.status(404).json({ alert: "User does not exist!" });
        }
    } catch (err) {
        console.error("Error fetching username: ", err);
        return res.status(500).json({ alert: "Error fetching username!" });
    }
});

// AI Review route
app.post('/ai-review', async (req, res) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const promptMsg = req.body.promptmsg;
    const result = await model.generateContent(promptMsg);
    const resp = await result.response;
    const text = resp.text();
    return res.status(200).json({ text: text });
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});