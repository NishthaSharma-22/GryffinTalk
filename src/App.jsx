import { useState, useEffect } from "react";

export default function App() {
  const [value, setValue] = useState(null);
  const [message, setMessage] = useState(null);
  const [chat, setChat] = useState([]);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState("");

  const getMessages = async () => {
    if (!value) return;
    const userMessage = { role: "user", text: value };
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        "http://localhost:2200/completions",
        options
      );
      const data = await response.json();
      console.log(data);
      const reply = data.reply || "NO reply";
      const botMessage = { role: "bot", text: reply };
      setMessage(reply);
      setChat((prev) => [...prev, userMessage, botMessage]);
      setValue("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(currentTitle, value, message);
    if (!currentTitle && value && message) {
      setCurrentTitle(value);
    }
    if (currentTitle && message) {
      setPreviousChats((prevChats) => [
        ...prevChats,
        {
          title: currentTitle,
          role: "user",
          content: chat[chat.length - 2]?.text,
        },
        {
          title: currentTitle,
          role: "bot",
          content: message,
        },
      ]);
    }
  }, [message]);
  return (
    <div className="app">
      <section className="side-bar">
        <button className="nav-button">+ New Chat</button>
        <ul className="history"></ul>
        <nav>
          <p className="bottom-text">GryffinTalk</p>
        </nav>
      </section>
      <section className="main">
        <div>
          <h1>GryffinTalk</h1>
        </div>
        <ul className="talk-feed">
          {chat.map((msg, idx) => (
            <li key={idx} className={msg.role}>
              {msg.role === "user" ? "You" : "GryffinTalk"}:{msg.text}
            </li>
          ))}
        </ul>
        <div className="bottom-section">
          <div className="input-box">
            <input value={value} onChange={(e) => setValue(e.target.value)} />

            <button id="submit" onClick={getMessages}>
              Submit
            </button>
          </div>
          <p className="info">
            GryffinTalk v1.0.0 <br />
            Bridging the world of muggles and magic.
          </p>
        </div>
      </section>
    </div>
  );
}
