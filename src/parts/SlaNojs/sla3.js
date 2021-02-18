import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormPickupWithNojs } from "@parts/FormPickup";
import { pad } from "@helpers/setZeroDateTime";
import TableComponent from "@components/TableComponent";
import { makeStyles, Paper } from "@material-ui/core";
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

const baseURLApt1 = process.env.NEXT_PUBLIC_BASE_URL_APT1;
const baseURLApt1V3 = process.env.NEXT_PUBLIC_BASE_URL_APT1V3;
const baseURLApt2 = process.env.NEXT_PUBLIC_BASE_URL_APT2;

const Apt2NojsSla3 = ({ type, dataNojs }) => {
  const clasess = useStyles();
  const [loading, setLoading] = useState(false);
  const [dataTable, setDataTable] = useState({
    data: { columns: [], data: [] },
    error: false,
  });

  const submit = (data) => {
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
    const nojs = data.nojs;

    if (type == "apt1") {
      window.open(
        `${baseURLApt1}/export?site=${nojs.site}&nojs=${nojs.nojs}&sdate=${start}&edate=${end}`
      );
    } else if (type == "apt1v3") {
      window.open(
        `${baseURLApt1V3}/api/export?nojs=${nojs.id}&start=${start}&end=${end}`
      );
    } else if (type == "apt2") {
      window.open(
        `${baseURLApt2}/api/export?nojs=${nojs.id}&start=${start}&end=${end}&apt2=true`
      );
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
            single={true}
          />
        </div>
        {dataTable.data.data.length !== 0 && (
          <div className={clasess.table}>
            <TableComponent
              dataTable={dataTable.data}
              error={dataTable.error}
              title="SLA NOC"
              maxTable={600}
            />
          </div>
        )}
      </Paper>
    </Paper>
  );
};

Apt2NojsSla3.propTypes = {
  getSla: PropTypes.func,
};

export default Apt2NojsSla3;
