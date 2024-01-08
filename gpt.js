const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateText(prompt) {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003", // Replace with your preferred model
      prompt: prompt,
      max_tokens: 150
    });
    console.log(response.data.choices[0].text);
  } catch (error) {
    console.error(error);
  }
}

generateText("Translate the following English text to French: 'Hello, how are you?'");
