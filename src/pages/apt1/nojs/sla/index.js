import SlaNojs from "@parts/SlaNojs";
import { apt1GetSla } from "@helpers/api/apt1";
import { connect } from "react-redux";

const Apt1NojsSla = ({ dataApt1Nojs }) => {
  return <SlaNojs getSla={apt1GetSla} dataNojs={dataApt1Nojs} />;
};

const mapStateToProps = (state) => {
  return {
    dataApt1Nojs: state.DataApt1Nojs.dataApt1Nojs,
  };
};

export default connect(mapStateToProps, null)(Apt1NojsSla);
