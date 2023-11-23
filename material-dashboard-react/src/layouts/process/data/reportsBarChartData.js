import { faker } from "@faker-js/faker";
const labels = ["M", "T", "W", "T", "F", "S", "S"];

export default {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255,255,255,0.4)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255,255,255,0.8)",
    },
  ],
};
