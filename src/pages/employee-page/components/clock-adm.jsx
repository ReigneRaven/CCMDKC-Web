import React, { useState, useEffect } from 'react';

const ClockAdm = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Convert 24-hour format to 12-hour format
  const formattedHours = hours % 12 || 12;
  const amPm = hours >= 12 ? 'pm' : 'am';

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <div className="clock-wrapper-adm">
      <div className="round-clock-adm">
        <div className="hand hour-hand-adm" style={{ transform: `rotate(${(formattedHours % 12) * 30 + minutes * 0.5}deg)` }}></div>
        <div className="hand minute-hand-adm" style={{ transform: `rotate(${minutes * 6}deg)` }}></div>
        <div className="hand second-hand" style={{ transform: `rotate(${seconds * 6}deg)` }}></div>
        <div className="clock-center-adm"></div>
      </div>
      <p id="clock-p-adm">Current Time</p>
      <p id="time-p-adm">{`${formattedHours}:${formattedMinutes}:${formattedSeconds} ${amPm}`}</p>
    </div>
  );
};

export default ClockAdm;
