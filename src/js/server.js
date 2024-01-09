const admin = require('firebase-admin')
const { getAuth } = require("firebase-admin/auth");
const express = require('express')
const cors = require('cors')
const serviceAccount = require("../../koursehub-6ebca4ab6372.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://koursehub-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const app = express();
const port = 5501;
app.use(express.json());
app.use(cors());


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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});