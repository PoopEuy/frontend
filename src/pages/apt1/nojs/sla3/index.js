import Sla3 from "@parts/SlaNojs/sla3";
import { connect } from "react-redux";

const index = ({ dataApt1Nojs }) => {
  return <Sla3 type="apt1" dataNojs={dataApt1Nojs} />;
};

const mapStateToProps = (state) => {
  return {
    dataApt1Nojs: state.DataApt1Nojs.dataApt1Nojs,
  };
};

export default connect(mapStateToProps, null)(index);
