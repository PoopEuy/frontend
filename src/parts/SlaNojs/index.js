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

const Apt1NojsSla = ({ getSla, dataNojs }) => {
  const clasess = useStyles();
  const [loading, setLoading] = useState(false);
  const [dataTable, setDataTable] = useState({
    data: { columns: [], data: [] },
    error: false,
  });
  const [csvName, setCsvFileName] = useState();

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
    )}-${pad(data.start.getDate())} ${pad(data.start.getHours())}:${pad(
      data.start.getMinutes()
    )}:00`;
    const end = `${data.end.getFullYear()}-${pad(
      data.end.getMonth() + 1
    )}-${pad(data.end.getDate())} ${pad(data.end.getHours())}:${pad(
      data.end.getMinutes()
    )}:00`;

    const csvFileName = "SLA1 APT1OLD " + start + " sampai " + end;
    setCsvFileName(csvFileName);

    while (js.length != 0) {
      const temp = js.splice(0, 5);
      const dataNojs = temp.slice();

      temp = temp.map((a) => a.nojs);
      const param = {
        nojs: temp,
        sdate: start,
        edate: end,
        data: dataNojs,
      };
      status++;

      const result = getSla(param);
      result.then((res) => {
        if (!res.error) {
          const data = jsonToTable(res.data);
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
        } else {
          setDataTable({
            ...dataTable,
            error: true,
          });
          return setLoading(false);
        }
      });
    }
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
              title={csvName}
              maxTable={600}
            />
          </div>
        )}
      </Paper>
    </Paper>
  );
};

Apt1NojsSla.propTypes = {
  getSla: PropTypes.func,
};

export default Apt1NojsSla;
