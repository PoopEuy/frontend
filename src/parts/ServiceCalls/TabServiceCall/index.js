import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

//material ui core
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";

import EditIcon from "@material-ui/icons/Edit"; //material ui icons

import Swal from "sweetalert2"; //sweetalert2

//components OR parts OR helpers local
import TableComponent from "@components/TableComponent";
import TooltipComponent from "@components/TooltipComponent";
import OpenDialog from "@components/OpenDialog";

import { FormPickupServiceCall } from "@parts/FormPickup";
import FormSericeCalls from "@parts/ServiceCalls/FormSericeCalls";
import ChartServiceCalls from "@parts/ServiceCalls/ChartServiceCalls";

import jsonToTable from "@helpers/jsonToTable";
import { pad } from "@helpers/setZeroDateTime";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 25,
    flexGrow: 1,
    padding: 9,
  },
}));

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const TabServiceCall = ({
  PutServiceOpen,
  GetServiceOpen,
  GetServiceChart,
}) => {
  const classes = useStyles();
  const [valueTab, setValueTab] = useState(0);
  const [dataTable, setDataTable] = useState({
    data: false,
    error: false,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [records, setRecords] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chart, setChart] = useState({
    data: false,
    label: false,
    table: false,
    error: false,
  });

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  const handleClick = (value) => {
    setOpenDialog(true);
    setRecords({
      ...value,
      title: `Edit ${value.site} (${value.nojs})`,
    });
  };

  const submit = (data) => {
    const putData = PutServiceOpen(records.service_id, data);
    putData.then((res) => {
      Swal.fire({
        icon: res.error ? "error" : "success",
        title: res.error ? "Oops..." : "success",
        text: res.error ? "Something went wrong!" : "Data has been saved!",
      });
      !res.error && setTable();
      setOpenDialog(false);
    });
  };

  const setTable = () => {
    const result = GetServiceOpen();
    result.then((res) => {
      if (!res.error) {
        const result = jsonToTable(res.data);
        result.columns.push({
          name: "edit",
          label: "Edit",
          options: {
            filter: false,
            sort: false,
            empty: true,
            customBodyRender: (value, dataIndex) => {
              const rowData = {
                service_id: dataIndex.rowData[0],
                nojs: dataIndex.rowData[1],
                site: dataIndex.rowData[2],
                error: dataIndex.rowData[7],
              };
              return (
                <TooltipComponent
                  title={`Edit ${rowData.site} (${rowData.nojs})`}
                  onClick={() => handleClick(rowData)}
                  color="inherit"
                >
                  <EditIcon />
                </TooltipComponent>
              );
            },
          },
        });
        return setDataTable({
          data: result,
          error: res.error,
        });
      }

      return setDataTable({
        data: null,
        error: res.error,
      });
    });
  };

  const handleSubmitChart = (data) => {
    setLoading(true);
    let result;
    if (data.radioButton != null) {
      result = GetServiceChart({
        param: data.radioButton,
      });
    } else {
      const start = `${data.start.getFullYear()}-${pad(
        data.start.getMonth() + 1
      )}-${pad(data.start.getDate())}`;
      const end = `${data.end.getFullYear()}-${pad(
        data.end.getMonth() + 1
      )}-${pad(data.end.getDate())}`;

      result = GetServiceChart({
        start: start,
        end: end,
      });
    }
    result.then((res) => {
      if (!res.error && res.data.sum != 0) {
        let labels = [];
        let temp = [];
        res.data.sum.forEach((element) => {
          temp.push(element.sum);
          labels.push(element.time_local);
        });
        setLoading(false);
        const result = jsonToTable(res.data.sum);

        return setChart({
          ...chart,
          data: temp,
          label: labels,
          table: result,
        });
      }
      setLoading(false);
      return setChart({
        ...chart,
        data: false,
        error: true,
      });
    });
  };

  useEffect(() => {
    setTable();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Component Update");
      setTable();
    }, 100000);
    return () => clearInterval(interval);
  }, [dataTable]);

  return (
    <>
      <Paper elevation={3}>
        <AppBar position="static" color="default">
          <Tabs
            value={valueTab}
            indicatorColor="primary"
            textColor="inherit"
            onChange={handleChange}
            aria-label="servicecalls"
            variant="fullWidth"
          >
            <Tab label="Actived Tab" />
            <Tab label="Chart Tab" />
          </Tabs>
        </AppBar>

        <TabPanel value={valueTab} index={0}>
          <TableComponent
            dataTable={dataTable.data}
            error={dataTable.error}
            title="Service Call"
            maxTable={600}
          />
        </TabPanel>
        <TabPanel value={valueTab} index={1}>
          <FormPickupServiceCall
            submit={(data) => handleSubmitChart(data)}
            loading={loading}
          />

          {chart.data ? (
            <div>
              <Paper className={classes.root} elevation={4}>
                <ChartServiceCalls datas={chart} />
              </Paper>
              <div style={{ marginTop: 25 }}>
                <TableComponent
                  dataTable={chart.table}
                  error={chart.error}
                  title="Service Call"
                  maxTable={600}
                />
              </div>
            </div>
          ) : (
            chart.error && (
              <Paper className={classes.root} elevation={4}>
                <h1>Network Error</h1>
              </Paper>
            )
          )}
        </TabPanel>
      </Paper>
      <OpenDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        title={records.title}
      >
        <FormSericeCalls submit={(data) => submit(data)} value={records} />
      </OpenDialog>
    </>
  );
};

export default TabServiceCall;
