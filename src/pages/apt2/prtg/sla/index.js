import PrtgSla from "@parts/Prtg/Sla";
import slaPrtg from "@helpers/api/slaPrtg";
import { connect } from "react-redux";

const Apt2PrtgSla = ({ dataApt2Nojs }) => {
  return (
    <PrtgSla getSla={slaPrtg} ip="202.43.73.187" dataNojs={dataApt2Nojs} />
  );
};

const mapStateToProps = (state) => {
  return {
    dataApt2Nojs: state.DataApt2Nojs.dataApt2Nojs,
  };
};
export default connect(mapStateToProps, null)(Apt2PrtgSla);
