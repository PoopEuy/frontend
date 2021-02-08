import Sla2 from "@parts/SlaNojs/sla2";
import { apt1GetLogger } from "@helpers/api/apt1";
import { connect } from "react-redux";

const Apt1NojsSla = ({ dataApt1Nojs }) => {
  return (
    <Sla2
      getSla={apt1GetLogger}
      dataNojs={dataApt1Nojs}
      single={true}
      v3={false}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    dataApt1Nojs: state.DataApt1Nojs.dataApt1Nojs,
  };
};

export default connect(mapStateToProps, null)(Apt1NojsSla);
