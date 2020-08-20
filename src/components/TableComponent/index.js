import React from "react";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";

//material ui core
import { Container } from "@material-ui/core";

//redux
import { connect } from "react-redux";

const TableComponent = ({ dataTable, title, customToolbar }) => {
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

  options = {
    ...options,
    customToolbar: customToolbar,
  };
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
        <h1> Error </h1>
      )}
    </Container>
  );
};

TableComponent.propTypes = {
  customToolbar: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    dataTable: state.DataTable.dataTable,
    title: state.DataTable.title,
  };
};

export default connect(mapStateToProps, null)(TableComponent);
