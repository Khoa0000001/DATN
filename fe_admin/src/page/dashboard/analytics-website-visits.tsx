/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { useTheme, alpha as hexAlpha } from "@mui/material/styles";

import { Chart, useChart } from "@/components/chart";

// ----------------------------------------------------------------------

interface AnalyticsWebsiteVisitsProps {
  title: string;
  subheader?: string;
  chart: {
    colors?: string[];
    categories: string[];
    series: any[];
    options?: Record<string, any>;
  };
  [key: string]: any;
}

export function AnalyticsWebsiteVisits({
  title,
  subheader,
  chart,
  ...other
}: AnalyticsWebsiteVisitsProps) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [
    hexAlpha(theme.palette.primary.dark, 0.8),
    hexAlpha(theme.palette.warning.main, 0.8),
  ];

  const chartOptions: any = useChart({
    colors: chartColors,
    stroke: {
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: chart.categories,
    },
    legend: {
      show: true,
    },
    tooltip: {
      y: {
        formatter: (value: number) => `${value} visits`,
      },
    },
    ...chart.options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Chart
        type="bar"
        series={chart.series}
        options={chartOptions}
        height={364}
        sx={{ py: 2.5, pl: 1, pr: 2.5 }}
      />
    </Card>
  );
}
