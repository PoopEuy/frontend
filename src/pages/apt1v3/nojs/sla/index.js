import SlaNojs from "@parts/SlaNojs/apt2";
import { apt1v3GetLoggerSla } from "@helpers/api/apt1v3";
import { connect } from "react-redux";

const Apt2NojsSla = ({ dataApt1v3Nojs }) => {
  return <SlaNojs getSla={apt1v3GetLoggerSla} dataNojs={dataApt1v3Nojs} />;
};

const mapStateToProps = (state) => {
  return {
    dataApt1v3Nojs: state.DataApt1v3.dataApt1v3Nojs,
  };
};

export default connect(mapStateToProps, null)(Apt2NojsSla);
