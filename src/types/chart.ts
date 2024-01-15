/* eslint-disable @typescript-eslint/no-unused-vars */
type LineChart = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    tension?: number;
  }[];
};

type LineChartProps = DefaultProps;

type DounutChart = {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  };
  options: {
    legend: {
      display: boolean;
      position: string;
    };
  };
};

type DounutChartProps = DefaultProps;

type PolarAreaChart = {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderWidth: number;
    }[];
  };
  options: {
    legend: {
      display: boolean;
      position: string;
    };
  };
};

type PolarAreaChartProps = DefaultProps;

type BarChartProps = DefaultProps & {
  avg: number;
};

type DefaultProps = {
  body: number[];
  labels: string[];
};
