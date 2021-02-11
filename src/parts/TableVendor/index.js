import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import EditIcon from "@material-ui/icons/Edit"; //material ui icons
import AddIcon from "@material-ui/icons/Add";

//components OR parts local
import TableComponent from "@components/TableComponent";

import jsonToTable from "@helpers/jsonToTable";
import FormVendor from "@parts/FormVendor";
import OpenDialog from "@components/OpenDialog";
import TooltipComponent from "@components/TooltipComponent";

import Swal from "sweetalert2"; //sweetalert2

const TableVendor = ({
  getVendor,
  editVendor,
  addVendor,
  dataVendor,
  titleTable,
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

  const handleClick = (title, value) => {
    let temp =
      value == null
        ? false
        : nullTostring(dataVendor.find((e) => e.id == value));
    setRecords(temp);
    setTitleDialog(title);
    setOpenDialog(true);
  };

  const customToolbar = () => {
    return (
      <TooltipComponent
        title="Add Vendor"
        onClick={() => handleClick("ADD VENDOR", null)}
        color="inherit"
      >
        <AddIcon />
      </TooltipComponent>
    );
  };

  const submit = async (data) => {
    records ? await editVendor(records.id, data) : await addVendor(data);
    Swal.fire("success!", "Data has been saved!", "success");
    setOpenDialog(false);
    getVendor();
  };

  useEffect(() => {
    if (dataVendor && dataVendor.length > 0) {
      const result = jsonToTable(dataVendor);
      result.columns.push({
        name: "id",
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
      setDataTable({
        data: result,
        error: false,
      });
    } else {
      setDataTable({
        data: { data: [], columns: [] },
        error: false,
      });
    }
  }, [dataVendor]);

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
        <FormVendor submit={(data) => submit(data)} value={records} />
      </OpenDialog>
    </>
  );
};

TableVendor.propTypes = {
  titleTable: PropTypes.string.isRequired,
};

export default TableVendor;
