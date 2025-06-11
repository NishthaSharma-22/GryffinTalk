
const App = () => {

  return (
    <div className="app">
      <section className="side-bar">
        <button className="button">+ New Chat</button>
        <ul className="history">
          <li>Chat 1</li>
          <li>Chat 2</li>
        </ul>
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
            <div id="submit">Submit</div>
          </div>
          <p className="info">
            GryffinTalk v1.0.0 <br />Bridging the world of muggles and magic.
          </p>
        </div>
      </section>
    </div>
  );

}

export default App
