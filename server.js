// import dotenv from "dotenv";
import express from "express";
import cors from "cors";

// dotenv.config();

const app = express();
const PORT = process.env.PORT || 2200;
// const apiKey = process.env.API_KEY;

app.use(
  cors({
    origin: "https://gryffin-talk.vercel.app",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.options("/completions", cors());

app.post("/completions", async (req, res) => {
  const userMsg = req.body.message;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [
        {
          role: "system",
          content:
            "You are a magical assistant who attended Hogwarts. Always speak like a wizard from the Harry Potter world. Use wizarding vocabulary and style. Only give your final response, not your reasoning.",
        },
        { role: "user", content: userMsg },
      ],
      max_tokens: 100,
    }),
  };
  try {
    const response = await fetch(
      "https://ai.hackclub.com/chat/completions",
      options
    );
    const data = await response.json();
    let reply = data.choices?.[0]?.message?.content || "NO reply";

    reply = reply.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

    res.send({ reply });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "something went wrong with the ai request! :(" });
  }
});

app.listen(PORT, () => {
  console.log(`wizarding server is running on PORT ${PORT}`);
});
