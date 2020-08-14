import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import { IconButton } from "@material-ui/core"; //material ui core
import EditIcon from "@material-ui/icons/Edit"; //material ui icons

//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//components OR parts local
import TableComponent from "@components/TableComponent";
import AddNojs from "@components/TableComponent/AddNojs";
import { setTableNojs } from "@redux/dataTable/action";
import jsonToTable from "@helpers/jsonToTable";

const TableNojs = ({ dataNojs, setTableNojs, href, as, title }) => {
  const customToolbar = () => {
    return <AddNojs />;
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
              <div>
                <Link href={href} as={`${as}${value}`}>
                  <IconButton color="default" component="span">
                    <EditIcon />
                  </IconButton>
                </Link>
              </div>
            );
          },
        },
      });
      return setTableNojs(result, title);
    }
  }, [dataNojs]);

  return <TableComponent customToolbar={customToolbar} />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTableNojs: bindActionCreators(setTableNojs, dispatch),
  };
};

TableNojs.propTypes = {
  href: PropTypes.string.isRequired,
  as: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(TableNojs);
