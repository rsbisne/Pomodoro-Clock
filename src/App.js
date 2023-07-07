import React, { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [paused, setPaused] = useState(true);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    const int = setInterval(() => {
      if (!paused) {
        setSeconds((s) => s - 1);
      }
    }, 1000);

    return () => {
      clearInterval(int);
    };
  }, [paused]);

  useEffect(() => {
    if (seconds === 0) {
      setIsBreak((b) => !b);
      setSeconds(isBreak ? 25 * 60 : 5 * 60);
    }
    // eslint-disable-next-line
  }, [seconds]);

  function startTimer() {
    setPaused(false);
  }

  function pauseTimer() {
    setPaused(true);
  }

  function resetTimer() {
    setPaused(true);
    setIsBreak(false);
    setSeconds(25 * 60);
  }

  return (
    <>
      <div className="timer">
        <h1>{`${Math.floor(seconds / 60)}:${("00" + (seconds % 60)).slice(
          -2
        )}`}</h1>
        <p>{isBreak ? "Break! Time." : "Work! Time."}</p>
        <button onClick={paused ? startTimer : pauseTimer}>
          {paused ? "Start" : "Pause"}
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </>
  );
}
export default App;
