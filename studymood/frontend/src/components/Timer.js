// src/components/Timer.js
import React, { useState, useEffect } from "react";
import "./Timer.css";

const Timer = ({ minutes, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (onComplete) onComplete();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onComplete]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="timer-container">
      <h2 className="timer-title">Focus Timer</h2>
      <p className="timer-display">{formatTime(timeLeft)}</p>
      <div className="timer-buttons">
        {!isRunning && (
          <button
            onClick={() => setIsRunning(true)}
            className="start-btn"
          >
            Start
          </button>
        )}
        {isRunning && (
          <button
            onClick={() => setIsRunning(false)}
            className="pause-btn"
          >
            Pause
          </button>
        )}
        <button
          onClick={() => {
            setIsRunning(false);
            setTimeLeft(minutes * 60);
          }}
          className="reset-btn"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
