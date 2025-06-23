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
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are a hogwarts professor. Speak like a wizard. ${req.body.message}`,
            },
          ],
        },
      ],
    }),
  };
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent",
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
