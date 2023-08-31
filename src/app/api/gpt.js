const { Configuration, OpenAIApi } = require("openai");

export default async function handler(req, res) {
  const configuration = new Configuration({
    apiKey: "FjlC2zmTtoANvVeYVyyaT3BlbkFJnT7D5kRl85PWeb22CAFk",
  });

  const openai = new OpenAIApi(configuration);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Who won the world series in 2020?" },
      { role: "assistant", content: "The Los Angeles Dodgers." },
      { role: "user", content: "Where was it played?" },
    ],
    max_tokens: 50,
    n: 1,
    stop: null,
    temperature: 1,
  });

  const answer = response.data.choices[0].message.content;

  res.status(200).json({ answer });
}
