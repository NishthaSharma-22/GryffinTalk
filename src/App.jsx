import { useState, useEffect } from "react";

export default function App() {
  const [value, setValue] = useState(null);
  const [message, setMessage] = useState(null);
  const [chat, setChat] = useState([]);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState([]);

  const getMessages = async () => {
    if (!value) return;
    const userMessage = {role: "user",text:value};
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
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "NO reply";
      const botMessage = {role: "bot", text:reply};
      setMessage(reply);
      setChat((prev)=>[...prev, userMessage, botMessage]);
      setValue("");

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    console.log(currentTitle, value, message)
    if (!currentTitle && value && message){
      setCurrentTitle(value)
    }
    if (currentTitle && value && message) {
      setPreviousChats(prevChats=>(
        [...prevChats, 
          {
title: currentTitle,
role: "user"
content: value
        }, {
          title: currentTitle
role: message.role,
content: message.content
        }]
      ))
    }
  }, [message, currentTitle])
  return (
    <div className="app">
      <section className="side-bar">
        <button className="button">+ New Chat</button>
        <ul className="history"></ul>
        <nav>
          <p>GryffinTalk</p>
        </nav>
      </section>
      <section className="main">
        <h1>GryffinTalk</h1>
        <ul className="talk-feed">
          {chat.map((msg, idx) => (
            <li key={idx} className={msg.role}>
              {msg.role ==="user"?"You":"GryffinTalk"}:{msg.text}
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
};