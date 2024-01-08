const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyDT78vWMf3PSG65mylFkLYrfis0ug_CBSM");

// ...
async function run() {

    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const prompt = "student name = Jay, course = English, Grammar mistakes made = 4 out of 10 questions, time taken to complete 10 questions = 15 minutes. What practices can or how can Jay improve, include studying tips as if you're the course teacher"

    const result = await model.generateContent(prompt);
    const resp = await result.response;
    const text = resp.text();
    console.log(text);
    // ...
}

run();