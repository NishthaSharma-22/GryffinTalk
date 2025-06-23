import { useState, useEffect } from "react";

const App = () => {
  const [value, setValue] = useState(null);
  const [message, setMessage] = useState(null);
  const getMessages = async () => {
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
      setMessage(reply);

    } catch (error) {
      console.error(error);
    }
  };
  console.log(message);
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
        <ul className="talk-feed"></ul>
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

export default App;
