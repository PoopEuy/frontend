import React from "react";
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { Container, Button, IconButton } from "@material-ui/core";
import Link from "next/link";

const TableComponent = ({ DataTable }) => {
  const options = {
    filter: false,
    sort: true,
    tableBodyMaxHeight: "550px",
    selectableRowsHideCheckboxes: true,
    selectableRowsHeader: false,
    responsive: "standard",
    draggableColumns: {
      enabled: false,
    },
    download: true,
    downloadOptions: {
      filename: "excel-format.csv",
      separator: ";",
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true,
      },
    },
    onDownload: (buildHead, buildBody, columns, data) => {
      return `${buildHead(columns)}${buildBody(data)}`.trim();
    },
  };

  const { dataTable, errorApt1Nojs, title } = DataTable;
  return (
    <Container>
      {dataTable ? (
        <MUIDataTable
          title={title}
          data={dataTable.data}
          columns={dataTable.columns}
          options={options}
        />
      ) : (
        <h1> {errorApt1Nojs} </h1>
      )}
    </Container>
  );
};

export default connect((state) => state)(TableComponent);
