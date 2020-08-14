import React from "react";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";

//material ui core
import { Container } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

//redux
import { connect } from "react-redux";

const TableComponent = ({ DataTable, customToolbar }) => {
  const { dataTable, errorApt1Nojs, title } = DataTable;

  let options = {
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
      filename: `${title}.csv`,
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

  const theme = createMuiTheme({
    palette: { type: "dark" },
    typography: { useNextVariants: true },
  });

  options = {
    ...options,
    customToolbar: customToolbar,
  };
  return (
    <Container>
      {dataTable ? (
        <MuiThemeProvider theme={theme}>
          <MUIDataTable
            title={title}
            data={dataTable.data}
            columns={dataTable.columns}
            options={options}
          />
        </MuiThemeProvider>
      ) : (
        <h1> {errorApt1Nojs} </h1>
      )}
    </Container>
  );
};

TableComponent.propTypes = {
  customToolbar: PropTypes.func,
};

export default connect((state) => state)(TableComponent);
