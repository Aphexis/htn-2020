import React from 'react';
import { useLocation } from 'react-router-dom';
import PageContainer from './PageContainer';
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const renderTime = ({ remainingTime }) => {
  const hours = ("0" + Math.floor(remainingTime / 3600)).slice(-2)
  const minutes = ("0" + Math.floor((remainingTime % 3600) / 60)).slice(-2)
  const seconds = ("0" + remainingTime % 60).slice(-2)

  return `${hours}:${minutes}:${seconds}`
};

function CountComponent() {
  return (
    <div
      className="timer-wrapper"
      style={{
        display: "flex",
        justifyContent: "center"
      }}>
      <CountdownCircleTimer
        isPlaying
        duration={3600}
        colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}>
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
}

const CurrentTaskComponent = () => {
  const location = useLocation();

  return (
    <div>
      <h1>
        Task Name
      </h1>
      <br />
      <CountComponent />
      <br />
      <p className="info">
        You can do it!
      </p>
    </div>
  )
}

const CurrentTaskPage = () => {
  return (
    <PageContainer className="FormPage">
      <CurrentTaskComponent />
    </PageContainer>
  )
}

export default CurrentTaskPage;
