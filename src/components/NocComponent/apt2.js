import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { Bar } from "react-chartjs-2";
import clsx from "clsx";
import { Tooltip } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  chartBox: {
    width: 350,
    margin: 10,
  },
  chartEh: {
    marginRight: 10,
    height: 63,
  },
  chartBv: {
    marginRight: 10,
    height: 32,
  },
  chartEdl: {
    marginRight: 10,
    height: 42,
  },
  textStyle: {
    fontSize: 16,
  },
  title: {
    flexGrow: 1,
    marginLeft: 10,
  },
  bgRed: {
    background: "red",
    color: "white",
  },
  bgYellow: {
    background: "yellow",
    color: theme.palette.secondary.dark,
  },
  bgGreen: {
    background: "green",
    color: "white",
  },
}));

const dataToDataChart = (data) => {
  return {
    labels: data.labels,
    datasets: [
      {
        label: "chart",
        fill: false,
        backgroundColor: data.color,
        borderColor: data.color,
        data: data.data,
      },
    ],
  };
};

const option = (min, max) => {
  return {
    legend: {
      display: false,
    },
    tooltips: {
      mode: false,
      intersect: false,
    },
    hover: {
      mode: false,
      intersect: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            min: min,
            max: max,
            display: false,
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          categorySpacing: 3,
          gridLines: {
            display: false,
          },
          ticks: {
            display: false,
            beginAtZero: true,
          },
        },
      ],
    },
  };
};

const NocApt2Component = ({ data }) => {
  const classes = useStyle();
  const [dataNoc, setDataNoc] = useState(false);
  const [state, setState] = useState({
    pms: 0,
    bv: 0,
  });

  useEffect(() => {
    if (data) {
      setDataNoc(data);
      setState({
        pms: data.data.pms.find((e) => e != null) || 0,
        bv: data.data.bv.find((e) => e != null) || 0,
      });
    }
  }, [data]);
  return (
    <>
      {dataNoc && (
        <Box className={classes.chartBox} border={2}>
          <Tooltip
            title={<span style={{ fontSize: 30 }}>{dataNoc.nojs.ip}</span>}
            leaveDelay={800}
          >
            <Grid container>
              <span className={classes.title}>
                <Typography paragraph className={classes.textStyle}>
                  {dataNoc.nojs.nojs} {dataNoc.nojs.site}
                </Typography>
              </span>
              <span style={{ marginRight: 10 }}>
                <Typography className={classes.textStyle}>
                  {dataNoc.nojs.lc}
                  <span
                    style={{ marginRight: 10, marginLeft: 10 }}
                    className={clsx({
                      [classes.bgGreen]: state.pms > 15,
                      [classes.bgYellow]: state.pms <= 15 && state.pms >= 13,
                      [classes.bgRed]: state.pms < 12,
                    })}
                  >
                    {state.pms}
                  </span>
                  <span
                    className={clsx({
                      [classes.bgGreen]: state.bv > 52.0,
                      [classes.bgYellow]: state.bv <= 52.0 && state.bv >= 51.0,
                      [classes.bgRed]: state.bv < 51.0,
                    })}
                  >
                    {state.bv.toFixed(1)}
                  </span>
                </Typography>
              </span>
            </Grid>
          </Tooltip>

          <Box className={classes.chartEh}>
            <Bar
              data={dataToDataChart({
                labels: dataNoc.data.labels,
                data: dataNoc.data.eh1,
                color: dataNoc.data.color_eh1,
              })}
              options={option(0, 55)}
            />
          </Box>

          <Box className={classes.chartEh}>
            <Bar
              data={dataToDataChart({
                labels: dataNoc.data.labels,
                data: dataNoc.data.eh2,
                color: dataNoc.data.color_eh2,
              })}
              options={option(0, 55)}
            />
          </Box>

          <Box className={classes.chartEh}>
            <Bar
              data={dataToDataChart({
                labels: dataNoc.data.labels,
                data: dataNoc.data.eh3,
                color: dataNoc.data.color_eh3,
              })}
              options={option(0, 55)}
            />
          </Box>

          <Box className={classes.chartBv}>
            <Bar
              data={dataToDataChart({
                labels: dataNoc.data.labels,
                data: dataNoc.data.batt_volt,
                color: dataNoc.data.color_batt_volt,
              })}
              options={option(0, 30)}
            />
          </Box>

          <Box className={classes.chartEdl}>
            <Bar
              data={dataToDataChart({
                labels: dataNoc.data.labels,
                data: dataNoc.data.edl1,
                color: dataNoc.data.color_edl1,
              })}
              options={option(-40, 0)}
            />
          </Box>
          <Box className={classes.chartEdl}>
            <Bar
              data={dataToDataChart({
                labels: dataNoc.data.labels,
                data: dataNoc.data.edl2,
                color: dataNoc.data.color_edl2,
              })}
              options={option(-40, 0)}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

NocApt2Component.propTypes = {
  data: PropTypes.object,
};

export default NocApt2Component;
