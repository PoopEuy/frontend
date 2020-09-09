import { connect } from "react-redux"; //redux
import TableNojs from "@parts/TableNojs"; // components OR parts local

const Apt1Nojs = ({ dataApt1Nojs, errorApt1Nojs }) => {
  // console.log(errorApt1Nojs);
  return (
    <TableNojs
      dataNojs={dataApt1Nojs}
      errorNojs={errorApt1Nojs}
      titleTable="APT1 NOJS"
    />
  );
};

const mapStateToProps = (state) => {
  return {
    dataApt1Nojs: state.DataApt1Nojs.dataApt1Nojs,
    errorApt1Nojs: state.DataApt1Nojs.errorApt1Nojs,
  };
};

export default connect(mapStateToProps, null)(Apt1Nojs);
