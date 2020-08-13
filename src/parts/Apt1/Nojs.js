import React, { useEffect, useState } from "react";
import TableComponent from "@components/TableComponent";
import { bindActionCreators } from "redux";
import Link from "next/link";

import { connect } from "react-redux";
import jsonToTable from "@helpers/jsonToTable";

import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@material-ui/core";
import { setTableNojs } from "@redux/dataTable/action";
import { useRouter } from "next/router";

const Apt1 = ({ DataApt1Nojs, setTableNojs }) => {
  const { dataApt1Nojs, errorApt1Nojs } = DataApt1Nojs;

  useEffect(() => {
    if (dataApt1Nojs) {
      const result = jsonToTable(dataApt1Nojs);
      result.columns.push({
        name: "nojs",
        label: "Edit",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <div>
                <Link
                  href="/apt1/nojs/edit/[nojs]"
                  as={`/apt1/nojs/edit/${value}`}
                >
                  <IconButton
                    color="default"
                    aria-label="upload picture"
                    component="span"
                  >
                    <EditIcon />
                  </IconButton>
                </Link>
              </div>
            );
          },
        },
      });

      return setTableNojs(result, "APT1 NOJS");
    }
  }, [DataApt1Nojs]);

  return <TableComponent />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTableNojs: bindActionCreators(setTableNojs, dispatch),
  };
};

export default connect((state) => state, mapDispatchToProps)(Apt1);
