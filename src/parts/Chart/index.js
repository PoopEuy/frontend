import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Chartjs from "chart.js";

const randomInt = () => Math.floor(Math.random() * (10 - 1 + 1)) + 1;

const onButtonClick = () => {
  const data = [
    randomInt(),
    randomInt(),
    randomInt(),
    randomInt(),
    randomInt(),
    randomInt(),
  ];
  updateDataset(0, data);
};

const Chart = ({ type, labels, label, data, backgroundColor, options }) => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  const chartConfig = {
    type: type,
    data: {
      labels: labels,
      datasets: [
        {
          label: label,
          data: data,
          backgroundColor: backgroundColor,
        },
      ],
    },

    options: options,
  };

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  const updateDataset = (datasetIndex, newData) => {
    chartInstance.data.datasets[datasetIndex].data = newData;
    chartInstance.update();
  };

  return <canvas ref={chartContainer} />;
};

Chart.defaultProps = {
  label: "# of Votes",
};

Chart.propTypes = {
  type: PropTypes.string.isRequired,
  labels: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  backgroundColor: PropTypes.array.isRequired,
  lebel: PropTypes.string,
  option: PropTypes.object,
};

export default Chart;
