import { connect } from "react-redux"; //redux
import { bindActionCreators } from "redux";
import TableNojs from "@parts/TableNojs"; // components OR parts local
import {
  getApt1Nojs,
  editApt1Nojs,
  addApt1Nojs,
} from "@redux/apt1/nojs/action";
import { useEffect, useState } from "react";

const Apt1Nojs = ({
  dataApt1Nojs,
  errorApt1Nojs,
  getApt1Nojs,
  editApt1Nojs,
  addApt1Nojs,
  dataVendor,
}) => {
  const [state, setState] = useState();
  useEffect(() => {
    if (dataApt1Nojs && dataVendor) {
      const temp = [];
      dataApt1Nojs.forEach((el) => {
        const mitra = dataVendor.find((e) => e.id == el.mitra);
        const gs = dataVendor.find((e) => e.id == el.gs);
        temp.push({
          ...el,
          mitra: mitra ? mitra.pt : "",
          no_mitra: mitra ? mitra.phone : "",
          ip: el.ip,
          gs: gs ? gs.pt : "",
          no_gs: gs ? gs.phone : "",
          laut: el.laut,
        });
      });
      setState(temp);
    }
  }, [dataApt1Nojs, dataVendor]);
  return (
    <TableNojs
      dataNojs={state}
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
    dataVendor: state.Setting.vendor,
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
