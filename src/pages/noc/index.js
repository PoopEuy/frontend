import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import Chart from "@parts/Chart";

const useStyle = makeStyles({
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
});

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
            display: true,
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
          barPercentage: 1,
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

const Noc = () => {
  const classes = useStyle();
  const type = "bar";
  const labels = [];

  let dataEh = [];
  let bgEh = [];

  let dataBv = [];
  let bgBv = [];

  let dataEdl = [];
  let bgEdl = [];

  for (let i = 0; i < 36; i++) {
    const random = Math.floor(Math.random() * (50 - 1 + 1)) + 1;
    const random1 = Math.floor(Math.random() * (30 - 1 + 1)) + 1;
    const random2 = Math.floor(Math.random() * (40 - 1 + 1)) + 1;
    labels.push(i);

    dataEh.push(random);
    bgEh.push("rgba(22, 145, 13, 1)");

    dataBv.push(random1);
    bgBv.push("rgba(52, 67, 203, 1)");

    dataEdl.push(random2 * -1);
    bgEdl.push("rgba(230, 0, 0, 1)");
  }

  return (
    <Box className={classes.chartBox} border={1}>
      <Grid container>
        <Grid item xs={6}>
          <Box border={1}>
            <Typography paragraph className={classes.textStyle}>
              JS70 Sumber Agung
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Typography className={classes.textStyle}>IFORTE 54.6</Typography>
        </Grid>
      </Grid>

      <Box className={classes.chartEh}>
        <Chart
          type={type}
          labels={labels}
          data={dataEh}
          backgroundColor={bgEh}
          options={option(0, 55)}
        />
      </Box>
      <Box className={classes.chartEh}>
        <Chart
          type={type}
          labels={labels}
          data={dataEh}
          backgroundColor={bgEh}
          options={option(0, 55)}
        />
      </Box>

      <Box className={classes.chartBv}>
        <Chart
          type={type}
          labels={labels}
          data={dataBv}
          backgroundColor={bgBv}
          options={option(0, 30)}
        />
      </Box>

      <Box className={classes.chartEdl}>
        <Chart
          type={type}
          labels={labels}
          data={dataEdl}
          backgroundColor={bgEdl}
          options={option(-40, 0)}
        />
      </Box>
      <Box className={classes.chartEdl}>
        <Chart
          type={type}
          labels={labels}
          data={dataEdl}
          backgroundColor={bgEdl}
          options={option(-40, 0)}
        />
      </Box>
    </Box>
  );
};
export async function getServerSideProps() {
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
  return { props: {} };
}

export default Noc;
