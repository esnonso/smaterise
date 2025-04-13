const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      ticks: {
        callback: function (value) {
          return Number.isInteger(value) ? value : "";
        },
        stepSize: 1,
        font: {
          family: "inherit",
          size: 12,
          lineHeight: 1.2,
        },
      },
      beginAtZero: true,
    },
    x: {
      ticks: {
        font: {
          family: "inherit",
          size: 12,
          lineHeight: 1.2,
        },
      },
    },
  },
};

export default chartOptions;
