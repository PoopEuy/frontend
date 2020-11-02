import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { Bar } from "react-chartjs-2";
import clsx from "clsx";
import TooltipComponent from "@components/TooltipComponent";
import { Tooltip } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  chartBox: {
    width: 350,
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  chartHarvest: {
    marginRight: 10,
    height: 60,
  },
  chartEnjoy: {
    marginRight: 10,
    height: 60,
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

const option = (min, max, reverse = false) => {
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
            reverse: reverse,
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

const OPComponent = ({ data }) => {
  const classes = useStyle();
  const [dataOP, setdataOP] = useState(false);

  useEffect(() => {
    if (data) {
      setdataOP(data);
      //   setState({
      //     pms: data.data.pms.find((e) => e != null) || 0,
      //     bv: data.data.bv.find((e) => e != null) || 0,
      //   });
    }
    console.log(`Build data ${data.project_name}`, data);
  }, [data]);
  return (
    <>
      {dataOP && (
        <Box className={classes.chartBox} border={2}>
          <Grid container>
            <span className={classes.title}>
              <Typography paragraph className={classes.textStyle}>
                {dataOP.project_name}
              </Typography>
            </span>
          </Grid>
          {/* <Tooltip
            title={<span style={{ fontSize: 30 }}>{dataOP.nojs.ip}</span>}
            leaveDelay={800}
          >
            <Grid container>
              <span className={classes.title}>
                <Typography paragraph className={classes.textStyle}>
                  {dataOP.nojs.nojs} {dataOP.nojs.site}
                </Typography>
              </span>
              <span style={{ marginRight: 10 }}>
                <Typography className={classes.textStyle}>
                  {dataOP.nojs.lc}
                  <span
                    style={{ marginRight: 10, marginLeft: 10 }}
                    className={clsx({
                      [classes.bgGreen]: state.pms > 15,
                      [classes.bgYellow]: state.pms <= 15 && state.pms > 13,
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
          </Tooltip> */}

          <Box className={classes.chartHarvest}>
            <Bar
              data={dataToDataChart({
                labels: dataOP.labels,
                data: dataOP.harvest,
                color: dataOP.color_harvest,
              })}
              options={option(0, 100)}
            />
          </Box>

          <Box className={classes.chartEnjoy}>
            <Bar
              data={dataToDataChart({
                labels: dataOP.labels,
                data: dataOP.enjoy,
                color: dataOP.color_enjoy,
              })}
              options={option(0, 100, true)}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

OPComponent.propTypes = {
  data: PropTypes.object,
};

export default OPComponent;
