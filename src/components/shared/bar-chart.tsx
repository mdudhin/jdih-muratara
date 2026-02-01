import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

interface BarChartProps {
  datasets: Dataset[];
  labels?: string[];
}

interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string;
}

const BarChart = (props: BarChartProps) => {
  const { datasets, labels } = props;

  const data = {
    labels,
    datasets,
  };
  return <Bar data={data} options={options} />;
};

export default BarChart;
