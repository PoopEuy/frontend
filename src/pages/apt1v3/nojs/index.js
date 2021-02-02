import { connect } from "react-redux"; //redux
import { bindActionCreators } from "redux";
import TableNojs from "@parts/TableNojs"; // components OR parts local

import {
  addApt1v3Nojs,
  editApt1v3Nojs,
  getApt1v3Nojs,
} from "@redux/apt1v3/action";
import { useEffect, useState } from "react";

const Apt2Nojs = ({
  dataApt1v3Nojs,
  errorApt2Nojs,
  getApt1v3Nojs,
  editApt1v3Nojs,
  addApt1v3Nojs,
  dataVendor,
}) => {
  const [state, setState] = useState();
  useEffect(() => {
    if (dataApt1v3Nojs && dataVendor) {
      const temp = [];
      dataApt1v3Nojs.forEach((el) => {
        console.log(el);
        const mitra = dataVendor.find((e) => e.id == el.mitra);
        const gs = dataVendor.find((e) => e.id == el.gs);
        console.log(gs);
        temp.push({
          nojs: el.nojs,
          site: el.site,
          provinsi: el.provinsi,
          lc: el.lc,
          mitra: mitra ? mitra.pt : "",
          no_mitra: mitra ? mitra.phone : "",
          ip: el.ip,
          latitude: el.latitude,
          longitude: el.longitude,
          id_lvdvsat: el.id_lvd_vsat,
          id_ping: el.id_ping,
          id_batvolt: el.id_batt_volt,
          id_vsatcurr: el.id_vsat_curr,
          id_btscurr: el.id_bts_curr,
          darat: el.darat,
          gs: gs ? gs.pt : "",
          no_gs: gs ? gs.phone : "",
          laut: el.laut,
          udara: el.udara,
        });
      });
      setState(temp);
    }
  }, [dataApt1v3Nojs, dataVendor]);
  return (
    <TableNojs
      dataNojs={state}
      errorNojs={errorApt2Nojs}
      getAptNojs={getApt1v3Nojs}
      editAptNojs={editApt1v3Nojs}
      addAptNojs={addApt1v3Nojs}
      titleTable="APT2 NOJS"
    />
  );
};

const mapStateToProps = (state) => {
  return {
    dataApt1v3Nojs: state.DataApt1v3.dataApt1v3Nojs,
    errorApt2Nojs: state.DataApt2Nojs.errorApt2Nojs,
    dataVendor: state.Setting.vendor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editApt1v3Nojs: bindActionCreators(editApt1v3Nojs, dispatch),
    addApt1v3Nojs: bindActionCreators(addApt1v3Nojs, dispatch),
    getApt1v3Nojs: bindActionCreators(getApt1v3Nojs, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Apt2Nojs);
