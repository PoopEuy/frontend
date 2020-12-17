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
  },
  chartEnjoy: {
    marginRight: 10,
    height: 85,
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

const ChintComponent = ({ data }) => {
  const classes = useStyle();
  const [dataChint, setdataChint] = useState(false);

  useEffect(() => {
    if (data) {
      setdataChint(data);
    }
    console.log(`Build data Chint ${data.serial_number}`, data);
  }, [data]);
  return (
    <>
      {dataChint && (
        <Box className={classes.chartBox} border={2}>
          {/* <Grid container>
            <span className={classes.title}>
              <Typography paragraph className={classes.textStyle}>
                {dataChint.project_name}
              </Typography>
            </span>
          </Grid> */}
          <Tooltip
            title={
              <span style={{ fontSize: 30 }}>{dataChint.serial_number}</span>
            }
            leaveDelay={800}
          >
            <Grid container>
              <span className={classes.title}>
                <Typography paragraph className={classes.textStyle}>
                  {dataChint.serial_number}
                </Typography>
              </span>
            </Grid>
          </Tooltip>

          <Box className={classes.chartHarvest}>
            <Bar
              data={dataToDataChart({
                labels: dataChint.labels,
                data: dataChint.energy_a,
                color: dataChint.color_energy_a,
              })}
              options={option(0, 100, true)}
            />
          </Box>

          <Box className={classes.chartHarvest}>
            <Bar
              data={dataToDataChart({
                labels: dataChint.labels,
                data: dataChint.energy_b,
                color: dataChint.color_energy_b,
              })}
              options={option(0, 100, true)}
            />
          </Box>

          <Box className={classes.chartHarvest}>
            <Bar
              data={dataToDataChart({
                labels: dataChint.labels,
                data: dataChint.energy_c,
                color: dataChint.color_energy_c,
              })}
              options={option(0, 100, true)}
            />
          </Box>

          {/* <Box className={classes.chartEnjoy}>
            <Bar
              data={dataToDataChart({
                labels: dataChint.labels,
                data: dataChint.enjoy,
                color: dataChint.color_enjoy,
              })}
              options={option(0, 100, true)}
            />
          </Box> */}
        </Box>
      )}
    </>
  );
};

ChintComponent.propTypes = {
  data: PropTypes.object,
};

export default ChintComponent;
