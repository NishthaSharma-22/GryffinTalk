import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = 2200;
const apiKey = process.env.API_KEY;

app.use(cors());
app.use(express.json());

app.post("/completions", async (req, res) => {
  const userMsg = req.body.message;
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a magical assistant who attended Hogwarts. Always speak like a wizard from the Harry Potter world. Use wizarding vocabulary and style.",
        },
        { role: "user", content: userMsg },
      ],
      max_tokens: 100,
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => {
  console.log(`Your server is running on PORT ${PORT}`);
});
