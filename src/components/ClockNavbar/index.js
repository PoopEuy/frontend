import React, { useState, useEffect } from "react";
import moment from "moment";

const ClockNavbar = () => {
  const [time, setTime] = useState(moment());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(moment());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <div>{time.format("dddd, MMMM D YYYY HH:mm:ss")}</div>;
};

export default ClockNavbar;
