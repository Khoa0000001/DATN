/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";

import { fNumber } from "./format-time";

import { Chart, useChart, ChartLegends } from "@/components/chart";

// ----------------------------------------------------------------------

type AnalyticsCurrentVisitsProps = {
  title: string;
  subheader?: string;
  chart: {
    series: { label: string; value: number }[];
    colors?: string[];
    options?: any;
  };
  [key: string]: any;
};

export function AnalyticsCurrentVisits({
  title,
  subheader,
  chart,
  ...other
}: AnalyticsCurrentVisitsProps) {
  const theme = useTheme();

  const chartSeries = chart.series.map((item) => item.value);

  const chartColors = chart.colors ?? [
    theme.palette.primary.main,
    theme.palette.warning.light,
    theme.palette.info.dark,
    theme.palette.error.main,
  ];

  interface ChartSeriesItem {
    label: string;
    value: number;
  }

  const chartOptions: any = useChart({
    chart: { sparkline: { enabled: true } },
    colors: chartColors,
    labels: chart.series.map((item: ChartSeriesItem) => item.label),
    stroke: { width: 0 },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      y: {
        formatter: (value: number) => fNumber(value),
        title: { formatter: (seriesName: string) => `${seriesName}` },
      },
    },
    plotOptions: { pie: { donut: { labels: { show: false } } } },
    ...chart.options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Chart
        type="pie"
        series={chartSeries}
        options={chartOptions}
        width={260}
        height={260}
        sx={{ my: 6, mx: "auto" }}
      />

      <Divider sx={{ borderStyle: "dashed" }} />

      <ChartLegends
        labels={chartOptions?.labels}
        colors={chartOptions?.colors}
        sx={{ p: 3, justifyContent: "center" }}
      />
    </Card>
  );
}
