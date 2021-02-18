import Sla3 from "@parts/SlaNojs/sla3";
import { connect } from "react-redux";

const index = ({ dataApt1v3Nojs }) => {
  return <Sla3 type="apt1v3" dataNojs={dataApt1v3Nojs} />;
};

const mapStateToProps = (state) => {
  return {
    dataApt1v3Nojs: state.DataApt1v3.dataApt1v3Nojs,
  };
};

export default connect(mapStateToProps, null)(index);
