import PrtgState from "@parts/Prtg/State";
import StatePrtg from "@helpers/api/statePrtg";
import { connect } from "react-redux";

const Apt1PrtgState = ({ dataApt1Nojs }) => {
  return <PrtgState getState={StatePrtg} dataNojs={dataApt1Nojs} />;
};

const mapStateToProps = (state) => {
  return {
    dataApt1Nojs: state.DataApt1Nojs.dataApt1Nojs,
  };
};

export default connect(mapStateToProps, null)(Apt1PrtgState);
