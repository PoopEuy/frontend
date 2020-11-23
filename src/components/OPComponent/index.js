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
import Link from "next/link";

const useStyle = makeStyles((theme) => ({
  chartBox: {
    width: 400,
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  chartHarvest: {
    marginRight: 10,
    height: 85,
    cursor: 'pointer'
  },
  chartEnjoy: {
    marginRight: 10,
    height: 85,
    cursor: 'pointer'
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
    }
    console.log(`Build data ${data.project_name}`, data);
  }, [data]);
  return (
    <>
      {dataOP && (
        <Box className={classes.chartBox} border={2}>
          {/* <Grid container>
            <span className={classes.title}>
              <Typography paragraph className={classes.textStyle}>
                {dataOP.project_name}
              </Typography>
            </span>
          </Grid> */}
          <Tooltip
            title={<span style={{ fontSize: 30 }}>{dataOP.node_id}</span>}
            leaveDelay={800}
          >
            <Grid container>
              <span className={classes.title}>
                <Typography paragraph className={classes.textStyle}>
                  {dataOP.project_name}
                </Typography>
              </span>
            </Grid>
          </Tooltip>

          <Link
            href={{
              pathname: "/outproject/inverter",
              query: { project_name: dataOP.project_name },
            }}
          >
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
          </Link>

          <Link
            href={{
              pathname: "/outproject/chint",
              query: { project_name: dataOP.project_name },
            }}
          >
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
          </Link>
        </Box>
      )}
    </>
  );
};

OPComponent.propTypes = {
  data: PropTypes.object,
};

export default OPComponent;
