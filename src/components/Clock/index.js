import { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { wrapper } from "@redux/store";
import { serverRenderClock, startClock } from "@redux/clock/action";

const Index = ({ startClock, clock }) => {
  useEffect(() => {
    const timer = startClock();
    return () => {
      clearInterval(timer);
    };
  }, [clock]);

  return <div>{format(new Date(clock))}</div>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    startClock: bindActionCreators(startClock, dispatch),
  };
};

const mapStateToProps = (state) => {
  return {
    clock: state.Clock.lastUpdate,
  };
};

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const format = (t) =>
  `${days[t.getDay()]}, ${pad(t.getHours())}:${pad(t.getMinutes())}:${pad(
    t.getSeconds()
  )}`;

const pad = (n) => (n < 10 ? `0${n}` : n);

export default connect(mapStateToProps, mapDispatchToProps)(Index);
