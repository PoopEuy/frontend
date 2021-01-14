import ChartNoc from "@parts/ChartNoc/apt2";
import { apt2GetLogger } from "@helpers/api/apt2";
import { connect } from "react-redux";

const Apt2Noc = ({ dataApt2Nojs, dataApt2Capacity }) => {
  return (
    <ChartNoc
      getApi={apt2GetLogger}
      nojsUser={dataApt2Nojs}
      capacity={dataApt2Capacity}
      url="/apt2/noc"
      mppt3={true}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    dataApt2Nojs: state.DataApt2Nojs.dataApt2Nojs,
    dataApt2Capacity: state.DataApt2Nojs.dataApt2Capacity,
  };
};

export default connect(mapStateToProps, null)(Apt2Noc);
