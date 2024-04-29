require('dotenv').config({ path: '../../.env' });
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
    apiKey: "AIzaSyAKW67y2atOvo9w_l47Lcg-14vHYik1JZw",
    authDomain: "koursehub.firebaseapp.com",
    databaseURL: "https://koursehub-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "koursehub",
    storageBucket: "koursehub.appspot.com",
    messagingSenderId: "955512527180",
    appId: "1:955512527180:web:c721dfb8d2d7d6858a97e9"
  };

firebase.initializeApp(firebaseConfig);

// ----------------------------------------------------------------------
// Initializing of VertexAI Generative Model
// ----------------------------------------------------------------------
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyAXnIG0JxO1BvETAkUGEEpTOLoUntMA0bg");

// ---------------------------------------------------------------------- 

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
    // redirect to interest page form
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
// app.get('/signout', async (req, res) => {
//     firebaseAuth.getAuth().signOut()
//         .then(() => {
//             sessionStorage.removeItem('userId');
//             window.location.href = 'index.html';
//             res.status(200).json({ message: "User signed out successfully!" })
//         })
//         .catch((error) => {
//         });
// });

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

// Get user email


// AI Chatbot + Review route
app.post('/ai-review', async (req, res) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const promptMsg = req.body.promptmsg;
    const result = await model.generateContent(promptMsg);
    const resp = await result.response;
    const text = resp.text();
    return res.status(200).json({ text: text });
})

// ###########################################################################################
// Database settings
// ###########################################################################################

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));;

// Define the User schema
const userSchema = new Schema({
  user_email: String,
  user_name: { type: String, required: true, unique: true },
  user_age: Number
});

// Define the Career Counseling schema
const interestSchema = new Schema({
  user_name: { type: String, ref: 'User', required: true },
  question_one_ans: String,
  question_two_ans: String,
  question_three_ans: String,
  question_four_ans: String,
  question_five_ans: String
});

// Define the Course Assessment schema
const courseAssessmentSchema = new Schema({
  user_name: { type: String, ref: 'User', required: true },
  question_one_ans: String,
  question_two_ans: String,
  question_three_ans: String,
  question_four_ans: String,
  question_five_ans: String
});

// Define the Question schema
const questionSchema = new Schema({
  question_id: { type: Schema.Types.ObjectId, required: true, unique: true },
  user_name: { type: String, ref: 'User' },
  course: String,
  chapter: String,
  question: String,
  answer: String
});

// Course Schema
const courseSchema = new Schema({
    course_id: { type: Schema.Types.ObjectId, required: true, unique: true },
    course_name: { type: String, required: true },
    course_people: [{ type: String }], // Assuming this lists people related to the course
  });
  
  // User-Course Schema for Many-to-Many Relationship
  const userCourseSchema = new Schema({
    user_course_id: { type: Schema.Types.ObjectId, required: true, unique: true },
    course_name: { type: String, ref: 'Course', required: true }, // Refers to a course
    user_name: { type: String, ref: 'User', required: true }, // Refers to a user
  });

// Create models from the schemas
const User = mongoose.model('User', userSchema);
const Interest = mongoose.model('Interest', interestSchema);
const CourseAssessment = mongoose.model('CourseAssessment', courseAssessmentSchema);
const Question = mongoose.model('Question', questionSchema);
const Course = mongoose.model('Course', courseSchema);
const UserCourse = mongoose.model('UserCourse', userCourseSchema);

// Export the models
module.exports = {
    User,
    Interest,
    CourseAssessment,
    Question,
    Course,
    UserCourse
  };

// Route to handle POST request
app.post('/upload-user', async (req, res) => {
    try {
      // Create a new user instance using the request body
      const newUser = new User(req.body);
  
      // Save the user to the database
      await newUser.save();
  
      // Send a successful response back to the client
      res.status(201).send({ message: 'User uploaded successfully', user: newUser });
    } catch (error) {
      // If an error occurs, send an error response
      res.status(500).send({ message: 'Error uploading user', error: error.message });
    }
  });

// Define a GET endpoint
app.get('/get-all-user', async (req, res) => {
    try {
      // Fetch all users from the database
      const users = await User.find();
      
      // Send the list of users as a response
      res.json(users);
    } catch (error) {
      // If there's an error, send a 500 status code and the error message
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get('/get-user/:user_name', async (req, res) => {
    try {
        const { user_name } = req.params; // Extract user_email from path parameters
        const sessions = await User.find({ user_name }); // Find sessions for the specific user
        if (sessions.length === 0) {
            return res.status(404).send({ message: 'No data found for this user' });
        }
        res.json(sessions);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve user', error: error.message });
    }
});

// ---------------------------------------------------------------------------

// POST endpoint to add a new career counseling session
app.post('/upload-interest', async (req, res) => {
    try {
        const newSession = new Interest(req.body);
        await newSession.save();

    } catch (error) {
        res.status(500).send({ message: 'Failed to add session', error: error.message });
    }
});
  
// GET endpoint to retrieve all career counseling sessions
app.get('/get-all-interest', async (req, res) => {
    try {
        const sessions = await Interest.find();
        res.json(sessions);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve sessions', error: error.message });
    }
});

app.get('/get-interest/:user_name', async (req, res) => {
    try {
        const { user_name } = req.params; // Extract user_email from path parameters
        const sessions = await Interest.find({ user_name }); // Find sessions for the specific user
        if (sessions.length === 0) {
            return res.status(404).send({ message: 'No sessions found for this user' });
        }
        res.json(sessions);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve sessions', error: error.message });
    }
});

// ---------------------------------------------------------------------------

// POST endpoint to add a new career counseling session
app.post('/upload-course-assessment', async (req, res) => {
    try {
        const newSession = new CourseAssessment(req.body);
        await newSession.save();
        res.status(201).send({ message: 'New Course Assessment session added', data: newSession });
    } catch (error) {
        res.status(500).send({ message: 'Failed to add session', error: error.message });
    }
});
  
// GET endpoint to retrieve all career counseling sessions
app.get('/get-all-course-assessment', async (req, res) => {
    try {
        const sessions = await CourseAssessment.find();
        res.json(sessions);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve sessions', error: error.message });
    }
});

app.get('/get-course-assessment/:user_name', async (req, res) => {
    try {
        const { user_name } = req.params; // Extract user_email from path parameters
        const sessions = await CourseAssessment.find({ user_name }); // Find sessions for the specific user
        if (sessions.length === 0) {
            return res.status(404).send({ message: 'No sessions found for this user' });
        }
        res.json(sessions);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve sessions', error: error.message });
    }
});

// ---------------------------------------------------------------------------
// // need to use this to create question id
// const { ObjectId } = require('mongoose').Types;

// // Example of creating a new ObjectId
// const id = new ObjectId(); // This will create a new valid ObjectId
// // Convert ObjectId to string
// const stringId = id.toString();

// console.log(stringId);
// ---------------------------------------------------------------------------

// POST endpoint to add a new career counseling session
app.post('/upload-question', async (req, res) => {
    try {
        const newSession = new Question(req.body);
        await newSession.save();
        res.status(201).send({ message: 'New Question added', data: newSession });
    } catch (error) {
        res.status(500).send({ message: 'Failed to add Question', error: error.message });
    }
});
  
// GET endpoint to retrieve all career counseling sessions
app.get('/get-all-question', async (req, res) => {
    try {
        const sessions = await Question.find();
        res.json(sessions);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve Question', error: error.message });
    }
});

app.get('/get-question/:user_name', async (req, res) => {
    try {
        const { user_name } = req.params; // Extract user_email from path parameters
        const sessions = await Question.find({ user_name }); // Find sessions for the specific user
        if (sessions.length === 0) {
            return res.status(404).send({ message: 'No Question found for this user' });
        }
        res.json(sessions);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve Question', error: error.message });
    }
});

// ---------------------------------------------------------------------------

// POST route to add a new course
app.post('/upload-course', async (req, res) => {
    try {
      const newCourse = new Course(req.body);
      await newCourse.save();
      res.status(201).send({ message: 'Course added successfully', data: newCourse });
    } catch (error) {
      res.status(500).send({ message: 'Error adding course', error: error.message });
    }
  });

app.get('/get-course', async (req, res) => {
    try {
        const sessions = await Course.find();
        res.json(sessions);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve Question', error: error.message });
    }
});

app.get('/get-course/:course_name', async (req, res) => {
    try {
        const { course_name } = req.params; // Extract user_email from path parameters
        const sessions = await Course.find({ course_name }); // Find sessions for the specific user
        if (sessions.length === 0) {
            return res.status(404).send({ message: 'No course name' });
        }
        res.json(sessions);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve Question', error: error.message });
    }
});

  // ---------------------------------------------------------------------------
  
  // POST route to add a user-course relationship
  app.post('/upload-user-course', async (req, res) => {
    try {
      const newUserCourse = new UserCourse(req.body);
      await newUserCourse.save();
      res.status(201).send({ message: 'User-Course relationship added successfully', data: newUserCourse });
    } catch (error) {
      res.status(500).send({ message: 'Error adding user-course relationship', error: error.message });
    }
  });


  app.get('/get-user-course', async (req, res) => {
    try {
        const sessions = await UserCourse.find();
        res.json(sessions);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve Question', error: error.message });
    }
});

app.get('/get-user-course/:course_name', async (req, res) => {
    try {
        const { course_name } = req.params; // Extract user_email from path parameters
        const sessions = await UserCourse.find({ course_name }); // Find sessions for the specific user
        if (sessions.length === 0) {
            return res.status(404).send({ message: 'No course name' });
        }
        res.json(sessions);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve Question', error: error.message });
    }
});

app.get('/get-user-course/:user_name', async (req, res) => {
    try {
        const { user_name } = req.params; // Extract user_email from path parameters
        const sessions = await UserCourse.find({ user_name }); // Find sessions for the specific user
        if (sessions.length === 0) {
            return res.status(404).send({ message: 'No user name' });
        }
        res.json(sessions);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve Question', error: error.message });
    }
});

// ---------------------------------------------------------------------------
// // example for adding user
// const newUser = new User({
//   user_name: 'Sattish',
//   user_email: 'STH@example.com',
//   user_age: 21
// });

// newUser.save()
//   .then(doc => console.log('User added:', doc))
//   .catch(err => console.error('Error adding user:', err));



// #####################################################################################################

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
