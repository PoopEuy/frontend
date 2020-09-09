import React from "react";
import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core";

const ChartServiceCalls = ({ datas }) => {
  const theme = useTheme();
  const data = {
    labels: datas.label,
    datasets: [
      {
        label: "Service Calls",
        fill: false,
        backgroundColor: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main,
        data: datas.data,
      },
    ],
  };
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div>
      <Line data={data} height={450} options={options} />
    </div>
  );
};

ChartServiceCalls.propTypes = {
  datas: PropTypes.object.isRequired,
};

export default ChartServiceCalls;
