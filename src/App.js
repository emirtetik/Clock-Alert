import React, { useState, useEffect } from 'react';
import "./App.css"
import {FaArrowDown,FaArrowUp,FaPause,FaPlay,FaSyncAlt} from "react-icons/fa"






const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerLabel, setTimerLabel] = useState('Session');
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    setTimeLeft(sessionLength * 60);
  }, [sessionLength]);

  const handleBreakDecrement = () => {
    if (breakLength > 1 && !isRunning) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleBreakIncrement = () => {
    if (breakLength < 60 && !isRunning) {
      setBreakLength(breakLength + 1);
    }
  };

  const handleSessionDecrement = () => {
    if (sessionLength > 1 && !isRunning) {
      setSessionLength(sessionLength - 1);
    }
  };

  const handleSessionIncrement = () => {
    if (sessionLength < 60 && !isRunning) {
      setSessionLength(sessionLength + 1);
    }
  };

  const handleReset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimerLabel('Session');
    setTimeLeft(25 * 60);
    setIsRunning(false);
    clearInterval(intervalId);
    const beep = document.getElementById('beep');
    beep.pause();
    beep.currentTime = 0;
  };

  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(intervalId);
      setIsRunning(false);
    } else {
      const newIntervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft === 0) {
            const beep = document.getElementById('beep');
            beep.play();
            if (timerLabel === 'Session') {
              setTimerLabel('Break');
              return breakLength * 60;
            } else {
              setTimerLabel('Session');
              return sessionLength * 60;
            }
          } else {
            return prevTimeLeft - 1;
          }
        });
      }, 1000);

      setIntervalId(newIntervalId);
      setIsRunning(true);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="container">
      <h1 className='clock'>25 + 5 Clock</h1>
      <div className="row">
        <div className="col">
          <h3 id="break-label">Break Length</h3>
          <div className="row">
            <button
              id="break-decrement"
              className="btn btn-primary"
              onClick={handleBreakDecrement}
            >
             <FaArrowDown/>
            </button>
            <div id="break-length">{breakLength}</div>
            <button
              id="break-increment"
              className="btn btn-primary"
              onClick={handleBreakIncrement}
            >
            <FaArrowDown />
            </button>
          </div>
        </div>
        <div className="col">
          <h3 id="session-label">Session Length</h3>
          <div className="row">
            <button
              id="session-decrement"
              className="btn btn-primary"
              onClick={handleSessionDecrement}
            >
             <FaArrowDown/>
            </button>
            <div id="session-length">{sessionLength}</div>
            <button
              id="session-increment"
              className="btn btn-primary"
              onClick={handleSessionIncrement}
            >
            <FaArrowUp/>
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div id="times" className="col">
          <div id="timer-label">
            {timerLabel}
          </div>
          <div  id="time-left" className={timeLeft <= breakLength * 60 ? "red" : ""}>
            {formatTime(timeLeft)}
          </div>
          <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
          <button
            id="start_stop"
            className="btn"
            onClick={handleStartStop}
          >
         <FaPlay/> | <FaPause/> 
          </button>
          <button
            id="reset"
            className="btn btn-primary"
            onClick={handleReset}
          >
           <FaSyncAlt/>
          </button>
        </div>
    
      </div>
      <div className="author">
        Designed and Coded By  <br />
        <a href="https://emirfy.com/" target="_blank" rel="noreferrer">Emir Tetik</a>
      </div>
    </div>
  );
};

export default App;
