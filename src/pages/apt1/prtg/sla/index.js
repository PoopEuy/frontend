import PrtgSla from "@parts/Prtg/Sla";
import slaPrtg from "@helpers/api/slaPrtg";
import { connect } from "react-redux";

const Apt1PrtgSla = ({ dataApt1Nojs }) => {
  return (
    <PrtgSla getSla={slaPrtg} ip="202.43.73.187" dataNojs={dataApt1Nojs} />
  );
};

const mapStateToProps = (state) => {
  return {
    dataApt1Nojs: state.DataApt1Nojs.dataApt1Nojs,
  };
};
export default connect(mapStateToProps, null)(Apt1PrtgSla);
