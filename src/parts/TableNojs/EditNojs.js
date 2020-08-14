import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Swal from "sweetalert2"; //sweetalert2

//components OR parts local
import OpenDialog from "@components/OpenDialog";
import { getApt1Nojs } from "@redux/apt1/nojs/action";
import FormNojs from "@parts/FormNojs";
import { getApt1NojsDetail, editApt1Nojs } from "@redux/apt1/nojs/action";

const EditNojs = ({
  getApt1NojsDetail,
  editApt1Nojs,
  getApt1Nojs,
  id,
  nojs,
  back,
}) => {
  const router = useRouter();

  const handleSubmit = (data) => {
    if (id == "APT1") editApt1Nojs(nojs, data);
    getApt1Nojs();
    router.push(back);
    Swal.fire("success!", "Data has been saved!", "success");
  };

  useEffect(() => {
    if (id == "APT1") getApt1NojsDetail(nojs);
  }, []);

  return (
    <div>
      <OpenDialog back={back}>
        <FormNojs onSubmit={(data) => handleSubmit(data)} />
      </OpenDialog>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getApt1NojsDetail: bindActionCreators(getApt1NojsDetail, dispatch),
    editApt1Nojs: bindActionCreators(editApt1Nojs, dispatch),
    getApt1Nojs: bindActionCreators(getApt1Nojs, dispatch),
  };
};

EditNojs.propTypes = {
  id: PropTypes.string.isRequired,
  nojs: PropTypes.string.isRequired,
  back: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(EditNojs);
