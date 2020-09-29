import PrtgState from "@parts/Prtg/State";
import StatePrtg from "@helpers/api/statePrtg";

const Apt1PrtgState = () => {
  return <PrtgState getState={StatePrtg} />;
};

export default Apt1PrtgState;
