import { useRouter } from "next/router";
import React, { useEffect } from "react";
import FormNojs from "@parts/FormNojs";
import { getApt1NojsDetail, editApt1Nojs } from "@redux/apt1/nojs/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import OpenDialog from "@components/OpenDialog";
import Swal from "sweetalert2";

const nojs = ({ getApt1NojsDetail, editApt1Nojs }) => {
  const router = useRouter();
  const nojs = router.query.nojs;

  const handleSubmit = (data) => {
    editApt1Nojs(nojs, data);
    router.push("/apt1/nojs");
    Swal.fire({
      type: "success",
      title: "Success!",
      text: "Data has been saved!",
    });
  };

  useEffect(() => {
    return getApt1NojsDetail(nojs);
  }, []);

  return (
    <div>
      <OpenDialog>
        <FormNojs onSubmit={(data) => handleSubmit(data)} />
      </OpenDialog>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getApt1NojsDetail: bindActionCreators(getApt1NojsDetail, dispatch),
    editApt1Nojs: bindActionCreators(editApt1Nojs, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(nojs);
