import { connect } from "react-redux"; //redux
import { bindActionCreators } from "redux";
import TableNojs from "@parts/TableNojs"; // components OR parts local
import {
  getApt2Nojs,
  editApt2Nojs,
  addApt2Nojs,
} from "@redux/apt2/nojs/action";
import { useEffect, useState } from "react";

const Apt2Nojs = ({
  dataApt2Nojs,
  errorApt2Nojs,
  getApt2Nojs,
  editApt2Nojs,
  addApt2Nojs,
  dataVendor,
}) => {
  const [state, setState] = useState();
  useEffect(() => {
    if (dataApt2Nojs && dataVendor) {
      const temp = [];
      dataApt2Nojs.forEach((el) => {
        const mitra = dataVendor.find((e) => e.id == el.mitra);
        const gs = dataVendor.find((e) => e.id == el.gs);
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
  }, [dataApt2Nojs, dataVendor]);
  return (
    <TableNojs
      dataNojs={state}
      errorNojs={errorApt2Nojs}
      getAptNojs={getApt2Nojs}
      editAptNojs={editApt2Nojs}
      addAptNojs={addApt2Nojs}
      titleTable="APT2 NOJS"
    />
  );
};

const mapStateToProps = (state) => {
  return {
    dataApt2Nojs: state.DataApt2Nojs.dataApt2Nojs,
    errorApt2Nojs: state.DataApt2Nojs.errorApt2Nojs,
    dataVendor: state.Setting.vendor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editApt2Nojs: bindActionCreators(editApt2Nojs, dispatch),
    addApt2Nojs: bindActionCreators(addApt2Nojs, dispatch),
    getApt2Nojs: bindActionCreators(getApt2Nojs, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Apt2Nojs);
