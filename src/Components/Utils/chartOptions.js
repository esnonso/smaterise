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
          family: "inherit", // Custom font family
          size: 12, // Font size for Y-axis ticks
          lineHeight: 1.2, // Line height for ticks
        },
      },
      beginAtZero: true,
    },
    x: {
      ticks: {
        font: {
          family: "inherit", // Custom font family for X-axis
          size: 12, // Font size for X-axis ticks
          lineHeight: 1.2, // Line height for ticks
        },
      },
    },
  },
};

export default chartOptions;
