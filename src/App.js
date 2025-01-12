import { useEffect, useState } from "react";
import "./app.css";

const App = () => {
  return <DigitalAnalogClock />;
};

export default App;

const DigitalAnalogClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  });

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourDegrees = (hours / 12) * 360;
  const minuteDegrees = (minutes / 60) * 360;
  const secondDegrees = (seconds / 60) * 360;

  return (
    <div className="clock-container">
      <div className="clock-circle">
        <Pointer
          rotation={hourDegrees}
          value={hours % 12 || 12}
          count={5}
          color="blue"
        />
        <Pointer
          rotation={minuteDegrees}
          value={minutes < 10 ? `0${minutes}` : minutes}
          count={8}
          color="red"
        />

        <Pointer
          rotation={secondDegrees}
          value={seconds < 10 ? `0${seconds}` : seconds}
          count={12}
          color="green"
        />
        <div className="center-dot" />
      </div>
    </div>
  );
};

const Pointer = ({ rotation, value, count, color }) => {
  console.log(rotation);
  const digits = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      style={{
        transform: `rotate(${-rotation}deg`,
        color: color,
      }}
    >
      {value}
    </div>
  ));

  return (
    <div
      className="pointer"
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {digits}
    </div>
  );
};
