/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import faker from "faker";
const labels = ["M", "T", "W", "T", "F", "S", "S"];

export default {
  // labels: ["Label 1", "Label 2", "Label 3"],
  // datasets: [
  //   { data: [10, 4, 1], stack: "Stack A", label: "Series A1" },
  //   { data: [4, 3, 1], stack: "Stack A", label: "Series A2" },
  //   { data: [4, 2, 5], stack: "Stack B", label: "Series B1" },
  //   { data: [2, 8, 1], stack: "Stack B", label: "Series B2" },
  // ],
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
