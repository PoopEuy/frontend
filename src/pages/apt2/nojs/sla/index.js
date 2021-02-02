import SlaNojs from "@parts/SlaNojs/apt2";
import { apt2GetLoggerSla } from "@helpers/api/apt2";
import { connect } from "react-redux";

const Apt2NojsSla = ({ dataApt2Nojs }) => {
  return <SlaNojs getSla={apt2GetLoggerSla} dataNojs={dataApt2Nojs} />;
};

const mapStateToProps = (state) => {
  return {
    dataApt2Nojs: state.DataApt2Nojs.dataApt2Nojs,
  };
};

export default connect(mapStateToProps, null)(Apt2NojsSla);
