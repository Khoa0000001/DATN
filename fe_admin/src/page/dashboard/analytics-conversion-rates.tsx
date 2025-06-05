/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { useTheme, alpha as hexAlpha } from "@mui/material/styles";

export function fNumber(
  inputValue: number | string | null | undefined,
  options?: Intl.NumberFormatOptions
): string {
  const number = processInput(inputValue);
  if (number === null) return "";

  const fm = new Intl.NumberFormat("vi", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  }).format(number);

  return fm;
}
function processInput(
  inputValue: number | string | null | undefined
): number | null {
  if (inputValue == null || Number.isNaN(inputValue)) return null;
  return Number(inputValue);
}

import { Chart, useChart } from "@/components/chart";

// ----------------------------------------------------------------------

type AnalyticsConversionRatesProps = {
  title: string;
  subheader?: string;
  chart: {
    colors?: string[];
    categories: string[];
    series: { name: string; data: number[] }[];
    options?: object;
  };
  [key: string]: any;
};

export function AnalyticsConversionRates({
  title,
  subheader,
  chart,
  ...other
}: AnalyticsConversionRatesProps) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [
    theme.palette.primary.dark,
    hexAlpha(theme.palette.primary.dark, 0.24),
  ];

  const chartOptions: any = useChart({
    colors: chartColors,
    stroke: { width: 2, colors: ["transparent"] },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value: number) => fNumber(value),
        title: { formatter: (seriesName: string) => `${seriesName}: ` },
      },
    },
    xaxis: { categories: chart.categories },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: "10px",
        colors: ["#FFFFFF", theme.palette.text.primary],
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 2,
        barHeight: "48%",
        dataLabels: { position: "top" },
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
        height={360}
        sx={{ py: 2.5, pl: 1, pr: 2.5 }}
      />
    </Card>
  );
}
