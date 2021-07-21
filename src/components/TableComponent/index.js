import React from "react";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";

import CircularProgress from "@material-ui/core/CircularProgress";

const TableComponent = ({
  dataTable,
  title,
  error,
  customToolbar,
  maxTable,
}) => {
  let options = {
    filter: false,
    sort: true,
    tableBodyMaxHeight: maxTable,
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
    <>
      {dataTable ? (
        <MUIDataTable
          title={title}
          data={dataTable.data}
          columns={dataTable.columns}
          options={options}
        />
      ) : (
        <div>
          {error ? (
            <h1>Network Error</h1>
          ) : (
            <CircularProgress color="secondary" />
          )}
        </div>
      )}
    </>
  );
};

TableComponent.propTypes = {
  customToolbar: PropTypes.func,
  maxTable: PropTypes.number,
  dataTable: PropTypes.any,
  title: PropTypes.string,
  error: PropTypes.any,
};

TableComponent.defaultProps = {
  maxTable: 1550,
};

// const mapStateToProps = (state) => {
//   return {
//     dataTable: state.DataTable.dataTable,
//     title: state.DataTable.title,
//     error: state.DataTable.error,
//   };
// };

export default TableComponent;
