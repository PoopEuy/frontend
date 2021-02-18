import Sla3 from "@parts/SlaNojs/sla3";
import { connect } from "react-redux";

const index = ({ dataApt2Nojs }) => {
  return <Sla3 type="apt2" dataNojs={dataApt2Nojs} />;
};

const mapStateToProps = (state) => {
  return {
    dataApt2Nojs: state.DataApt2Nojs.dataApt2Nojs,
  };
};

export default connect(mapStateToProps, null)(index);
