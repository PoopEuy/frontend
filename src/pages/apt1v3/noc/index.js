import ChartNoc from "@parts/ChartNoc/apt2";
import { apt1v3GetLogger } from "@helpers/api/apt1v3";
import { connect } from "react-redux";

const Apt2Noc = ({ dataApt1v3Nojs, dataApt1v3Capacity }) => {
  return (
    <ChartNoc
      getApi={apt1v3GetLogger}
      nojsUser={dataApt1v3Nojs}
      capacity={dataApt1v3Capacity}
      url="/apt1v3/noc"
      mppt3={false}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    dataApt1v3Nojs: state.DataApt1v3.dataApt1v3Nojs,
    dataApt1v3Capacity: state.DataApt1v3.dataApt1v3Capacity,
  };
};

export default connect(mapStateToProps, null)(Apt2Noc);
