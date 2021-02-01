import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormPickupWithNojs } from "@parts/FormPickup";
import { pad } from "@helpers/setZeroDateTime";
import TableComponent from "@components/TableComponent";
import jsonToTable from "@helpers/jsonToTable";
import { makeStyles, Paper } from "@material-ui/core";

let tempColumns = [];
let tempData = [];
let status = 0;

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 14,
  },
  form: {
    padding: 35,
  },
  table: {
    marginTop: 35,
  },
}));

const PrtgSla = ({ getSla, ip, dataNojs }) => {
  const clasess = useStyles();
  const [loading, setLoading] = useState(false);
  const [dataTable, setDataTable] = useState({
    data: { columns: [], data: [] },
    error: false,
  });

  const submit = (data) => {
    const nojs = data.nojsMultiple;
    const js = nojs.slice();
    tempData = [];
    setDataTable({
      data: { columns: [], data: [] },
      error: false,
    });

    setLoading(true);
    const start = `${data.start.getFullYear()}-${pad(
      data.start.getMonth() + 1
    )}-${pad(data.start.getDate())}-${pad(data.start.getHours())}-${pad(
      data.start.getMinutes()
    )}`;
    const end = `${data.end.getFullYear()}-${pad(
      data.end.getMonth() + 1
    )}-${pad(data.end.getDate())}-${pad(data.end.getHours())}-${pad(
      data.end.getMinutes()
    )}`;

    js.forEach((e) => {
      let temp = getSla({
        ...e,
        ip: ip,
        sdate: start,
        edate: end,
      });
      status++;

      temp.then((res) => {
        const data = jsonToTable(res);
        tempColumns = data.columns;
        tempData = tempData.concat(data.data);
        setDataTable({
          data: { columns: tempColumns, data: tempData },
          error: false,
        });
        status--;
        if (status == 0) {
          return setLoading(false);
        }
      });
    });
    status == 0 && setLoading(false);
  };

  return (
    <Paper elevation={4}>
      <Paper className={clasess.form}>
        <div>
          <FormPickupWithNojs
            submit={submit}
            loading={loading}
            dataNojs={dataNojs}
          />
        </div>
        {dataTable.data.data.length !== 0 && (
          <div className={clasess.table}>
            <TableComponent
              dataTable={dataTable.data}
              error={dataTable.error}
              title="SLA PRTG"
              maxTable={600}
            />
          </div>
        )}
      </Paper>
    </Paper>
  );
};

PrtgSla.propTypes = {
  getSla: PropTypes.func,
};

export default PrtgSla;
