/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";

import { Chart, useChart, ChartLegends } from "@/components/chart";

// ----------------------------------------------------------------------

interface AnalyticsCurrentSubjectProps {
  title: string;
  subheader?: string;
  chart: {
    colors?: string[];
    categories: string[];
    series: { name: string; data: number[] }[];
    options?: Record<string, any>;
  };
  [key: string]: any;
}

export function AnalyticsCurrentSubject({
  title,
  subheader,
  chart,
  ...other
}: AnalyticsCurrentSubjectProps) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [
    theme.palette.primary.main,
    theme.palette.warning.main,
    theme.palette.info.main,
  ];

  const chartOptions = useChart({
    colors: chartColors,
    stroke: { width: 2 },
    fill: { opacity: 0.48 },
    xaxis: {
      categories: chart.categories,
      labels: {
        style: {
          colors: [...Array(6)].map(() => theme.palette.text.secondary),
        },
      },
    },
    ...{
      ...chart.options,
      legend: {
        ...chart.options?.legend,
        position: (["top", "right", "bottom", "left"].includes(
          chart.options?.legend?.position
        )
          ? chart.options?.legend?.position
          : "bottom") as "top" | "right" | "bottom" | "left",
      },
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Chart
        type="radar"
        series={chart.series}
        options={chartOptions}
        width={300}
        height={300}
        sx={{ my: 1, mx: "auto" }}
      />

      <Divider sx={{ borderStyle: "dashed" }} />

      <ChartLegends
        labels={chart.series.map((item) => item.name)}
        colors={chartOptions?.colors}
        sx={{ p: 3, justifyContent: "center" }}
      />
    </Card>
  );
}
