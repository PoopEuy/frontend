import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import EditIcon from "@material-ui/icons/Edit"; //material ui icons
import AddIcon from "@material-ui/icons/Add";

//components OR parts local
import TableComponent from "@components/TableComponent";

import jsonToTable from "@helpers/jsonToTable";
import FormNojs from "@parts/FormNojs";
import OpenDialog from "@components/OpenDialog";
import TooltipComponent from "@components/TooltipComponent";

import Swal from "sweetalert2"; //sweetalert2

import { connect } from "react-redux";

const TableNojs = ({
  getAptNojs,
  editAptNojs,
  addAptNojs,
  dataNojs,
  errorNojs,
  titleTable,
  dataVendor,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [titleDialog, setTitleDialog] = useState(false);
  const [dataTable, setDataTable] = useState({
    data: false,
    error: false,
  });
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

  const handleClick = (title, value, data) => {
    let temp =
      value == null
        ? false
        : nullTostring(dataNojs.find((e) => e.nojs == value));

    if (value) {
      const gs = dataVendor.find(
        (e) => e.pt == temp.gs && e.phone == temp.no_gs
      );
      const mitra = dataVendor.find(
        (e) => e.pt == temp.mitra && e.phone == temp.no_mitra
      );
      temp.gs = gs;
      temp.mitra = mitra;
    }
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

  const submit = async (data) => {
    data = {
      ...data,
      id_lvd_vsat: data.id_lvd_vsat == "" ? null : data.id_lvd_vsat,
      id_ping: data.id_ping == "" ? null : data.id_ping,
      id_batt_volt: data.id_batt_volt == "" ? null : data.id_batt_volt,
      id_vsat_curr: data.id_vsat_curr == "" ? null : data.id_vsat_curr,
      id_bts_curr: data.id_bts_curr == "" ? null : +data.id_bts_curr,
      mitra: data.mitra ? data.mitra.id : null,
      gs: data.gs ? data.gs.id : null,
    };
    records ? await editAptNojs(data.nojs, data) : await addAptNojs(data);
    Swal.fire("success!", "Data has been saved!", "success");
    setOpenDialog(false);
    getAptNojs();
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
          customBodyRender: (value, data) => {
            return (
              <TooltipComponent
                title={`Edit ${value}`}
                onClick={() => handleClick(`EDIT ${value}`, value, data)}
                color="inherit"
              >
                <EditIcon />
              </TooltipComponent>
            );
          },
        },
      });
      setDataTable({
        data: result,
        error: false,
      });
    }
    if (errorNojs != false) {
      setDataTable({
        data: false,
        error: true,
      });
    }
  }, [dataNojs, errorNojs]);

  return (
    <>
      <TableComponent
        dataTable={dataTable.data}
        error={dataTable.error}
        title={titleTable}
        customToolbar={customToolbar}
        maxTable={710}
      />
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

TableNojs.propTypes = {
  titleTable: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    dataVendor: state.Setting.vendor,
  };
};

export default connect(mapStateToProps, null)(TableNojs);
