import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import EditIcon from "@material-ui/icons/Edit"; //material ui icons
import AddIcon from "@material-ui/icons/Add";

//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//components OR parts local
import TableComponent from "@components/TableComponent";
import { setTableNojs } from "@redux/dataTable/action";
import {
  getApt1Nojs,
  editApt1Nojs,
  addApt1Nojs,
} from "@redux/apt1/nojs/action";
import jsonToTable from "@helpers/jsonToTable";
import FormNojs from "@parts/FormNojs";
import OpenDialog from "@components/OpenDialog";
import TooltipComponent from "@components/TooltipComponent";

import Swal from "sweetalert2"; //sweetalert2

const TableNojs = ({
  getApt1Nojs,
  editApt1Nojs,
  addApt1Nojs,
  dataNojs,
  setTableNojs,
  titleTable,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [titleDialog, setTitleDialog] = useState(false);
  const [records, setRecords] = useState(false);

  const nullTostring = (data) => {
    let result = {};
    Object.keys(data).forEach(function (key) {
      if (data[key] === null) {
        result[key] = "";
      } else {
        result[key] = data[key];
      }
    });
    return result;
  };

  const handleClick = (title, value) => {
    let temp =
      value == null
        ? false
        : nullTostring(dataNojs.find((e) => e.nojs == value));
    setRecords(temp);
    setTitleDialog(title);
    setOpenDialog(true);
  };

  const customToolbar = () => {
    return (
      <TooltipComponent
        title="Add Nojs"
        onClick={() => handleClick("ADD NOJS", null)}
        color="inherit"
      >
        <AddIcon />
      </TooltipComponent>
    );
  };

  const submit = (data) => {
    records ? editApt1Nojs(data.nojs, data) : addApt1Nojs(data);
    getApt1Nojs();
    Swal.fire("success!", "Data has been saved!", "success");
    setOpenDialog(false);
  };

  useEffect(() => {
    if (dataNojs) {
      const result = jsonToTable(dataNojs);
      result.columns.push({
        name: "nojs",
        label: "Edit",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRender: (value) => {
            return (
              <TooltipComponent
                title={`Edit ${value}`}
                onClick={() => handleClick(`EDIT ${value}`, value)}
                color="inherit"
              >
                <EditIcon />
              </TooltipComponent>
            );
          },
        },
      });
      return setTableNojs(result, titleTable);
    }
  }, [dataNojs]);

  return (
    <>
      <TableComponent customToolbar={customToolbar} />
      <OpenDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        title={titleDialog}
      >
        <FormNojs submit={(data) => submit(data)} value={records} />
      </OpenDialog>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTableNojs: bindActionCreators(setTableNojs, dispatch),
    editApt1Nojs: bindActionCreators(editApt1Nojs, dispatch),
    addApt1Nojs: bindActionCreators(addApt1Nojs, dispatch),
    getApt1Nojs: bindActionCreators(getApt1Nojs, dispatch),
  };
};

TableNojs.propTypes = {
  titleTable: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(TableNojs);
