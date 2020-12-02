import { connect } from "react-redux"; //redux
import { bindActionCreators } from "redux";
import TableNojs from "@parts/TableNojs"; // components OR parts local
import {
  getApt1Nojs,
  editApt1Nojs,
  addApt1Nojs,
} from "@redux/apt1/nojs/action";

const Apt1Nojs = ({
  dataApt1Nojs,
  errorApt1Nojs,
  getApt1Nojs,
  editApt1Nojs,
  addApt1Nojs,
}) => {
  return (
    <TableNojs
      dataNojs={dataApt1Nojs}
      errorNojs={errorApt1Nojs}
      getAptNojs={getApt1Nojs}
      editAptNojs={editApt1Nojs}
      addAptNojs={addApt1Nojs}
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

const mapDispatchToProps = (dispatch) => {
  return {
    editApt1Nojs: bindActionCreators(editApt1Nojs, dispatch),
    addApt1Nojs: bindActionCreators(addApt1Nojs, dispatch),
    getApt1Nojs: bindActionCreators(getApt1Nojs, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Apt1Nojs);
