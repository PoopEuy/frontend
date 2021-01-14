import { connect } from "react-redux"; //redux
import { bindActionCreators } from "redux";
import TableNojs from "@parts/TableNojs"; // components OR parts local
import {
  getApt1v3Nojs,
  editApt1v3Nojs,
  addApt1v3Nojs,
} from "@redux/apt1v3/action";
import { useEffect, useState } from "react";

const Apt2Nojs = ({
  dataApt1v3Nojs,
  getApt1v3Nojs,
  editApt1v3Nojs,
  addApt1v3Nojs,
}) => {
  const [state, setState] = useState();
  useEffect(() => {
    if (dataApt1v3Nojs) {
      const temp = [];
      dataApt1v3Nojs.forEach((el) => {
        temp.push({
          nojs: el.nojs,
          site: el.site,
          provinsi: el.provinsi,
          lc: el.lc,
          mitra: el.mitra == " " ? "Valtel" : el.mitra,
          ip: el.ip,
          latitude: el.latitude,
          longitude: el.longitude,
          id_lvdvsat: el.id_lvd_vsat,
          id_ping: el.id_ping,
          id_batvolt: el.id_batt_volt,
          id_vsatcurr: el.id_vsat_curr,
          id_btscurr: el.id_bts_curr,
        });
      });
      setState(temp);
    }
  }, [dataApt1v3Nojs]);
  return (
    <TableNojs
      dataNojs={state}
      errorNojs={false}
      getAptNojs={getApt1v3Nojs}
      editAptNojs={editApt1v3Nojs}
      addAptNojs={addApt1v3Nojs}
      titleTable="APT3 NOJS"
    />
  );
};

const mapStateToProps = (state) => {
  return {
    dataApt1v3Nojs: state.DataApt1v3.dataApt1v3Nojs,
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
