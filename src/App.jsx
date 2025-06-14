const App = () => {
  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: "hello how are you?",
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
    } catch (error) {
      console.error(error);
    }
  };

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
            <input />

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
