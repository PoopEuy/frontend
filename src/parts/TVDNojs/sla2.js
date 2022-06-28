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

const Apt2NojsSla = ({ getSla, dataNojs, single, v3 }) => {
  const clasess = useStyles();
  const [loading, setLoading] = useState(false);
  const [dataTable, setDataTable] = useState({
    data: { columns: [], data: [] },
    error: false,
  });

  const submit = (data) => {
    tempData = [];
    setDataTable({
      data: { columns: [], data: [] },
      error: false,
    });
    setLoading(true);
    const start = `${data.start.getFullYear()}-${pad(
      data.start.getMonth() + 1
    )}-${pad(data.start.getDate())} ${pad(data.start.getHours())}:${pad(
      data.start.getMinutes()
    )}:00`;
    const end = `${data.end.getFullYear()}-${pad(
      data.end.getMonth() + 1
    )}-${pad(data.end.getDate())} ${pad(data.end.getHours())}:${pad(
      data.end.getMinutes()
    )}:00`;

    const param = v3
      ? {
          nojs: data.nojs.id,
          start: start,
          end: end,
          daily: true,
        }
      : {
          nojs: data.nojs.nojs,
          sdate: start,
          edate: end,
          detail: true,
        };

    const result = getSla(param);

    result
      .then((res) => {
        if (!res.error) {
          const data = v3
            ? jsonToTable(res.data.data)
            : jsonToTable(res.data.daily);
          tempColumns = data.columns;
          tempData = tempData.concat(data.data);
          setDataTable({
            data: { columns: tempColumns, data: tempData },
            error: false,
          });
          return setLoading(false);
        } else {
          setDataTable({
            ...dataTable,
            error: true,
          });
          return setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <Paper elevation={4}>
      <Paper className={clasess.form}>
        <div>
          <FormPickupWithNojs
            submit={submit}
            loading={loading}
            dataNojs={dataNojs}
            single={single}
          />
        </div>
        {dataTable.data.data.length !== 0 && (
          <div className={clasess.table}>
            <TableComponent
              dataTable={dataTable.data}
              error={dataTable.error}
              title="SLA 2 INTERNAL"
              maxTable={2600}
            />
          </div>
        )}
      </Paper>
    </Paper>
  );
};

Apt2NojsSla.propTypes = {
  getSla: PropTypes.func,
  v3: PropTypes.bool,
};

Apt2NojsSla.defaultProps = {
  v3: true,
};

export default Apt2NojsSla;
