import { Configuration, CreateCompletionRequest, OpenAIApi } from "openai";

async function openAIApi(prompt: String) {
  const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  return await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${prompt}\n\nTl;dr`,
    temperature: 0.7,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 1,
  });
}

export { openAIApi };
