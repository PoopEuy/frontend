import { connect } from "react-redux"; //redux
import { bindActionCreators } from "redux";
import TableVendor from "@parts/TableVendor"; // components OR parts local
import { getVendor, editVendor, addVendor } from "@redux/setting/action";
import { useEffect, useState } from "react";

const index = ({ dataVendor, getVendor, editVendor, addVendor }) => {
  const [state, setState] = useState();
  useEffect(() => {
    if (dataVendor) {
      setState(dataVendor);
    }
  }, [dataVendor]);
  return (
    <TableVendor
      dataVendor={state}
      getVendor={getVendor}
      editVendor={editVendor}
      addVendor={addVendor}
      titleTable="Vendor"
    />
  );
};

const mapStateToProps = (state) => {
  return {
    dataVendor: state.Setting.vendor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editVendor: bindActionCreators(editVendor, dispatch),
    addVendor: bindActionCreators(addVendor, dispatch),
    getVendor: bindActionCreators(getVendor, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
