const express = require('express');
const cors = require('cors');
const { initializeApp } = require("firebase-admin/app");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase-admin/auth");
initializeApp();

const app = express();
const port = 3000; // Replace with your desired port number

app.use(cors());
app.use(express.json());

// Sign up route
app.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        const auth = getAuth();
        const user = await createUserWithEmailAndPassword(auth, email, password);
        res.status(200).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user', error });
    }
});

// Sign in route
app.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const auth = getAuth();
        const user = await signInWithEmailAndPassword(auth, email, password);
        res.status(200).json({ message: 'User signed in successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Failed to sign in', error });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});