import React, { useState } from "react";
import reactLogo from "../../assets/react.svg";

export default function Companies() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div className="App">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>This page is gonna be auth page bro</p>
        </div>
        <p className="read-the-docs">
          go to modules/Auth/index to delete these shits.
        </p>
      </div>
    </div>
  );
}
