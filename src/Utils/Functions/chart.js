export const pieChartOptions = (title) => ({
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: title,
    },
  },
});

export const backgroundColors = [
  "rgba(255, 99, 132, 0.6)",
  "rgba(54, 162, 235, 0.6)",
  "rgba(255, 206, 86, 0.6)",
];

export const borderColors = [
  "rgba(255,99,132,1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
];

export const barchartOption = (text) => ({
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: {
      display: true,
      text: text,
    },
  },
});
