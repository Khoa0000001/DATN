/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { useTheme } from "@mui/material/styles";

import { fNumber, fPercent, fShortenNumber } from "./format-time";

import { Iconify } from "@/components/iconify";
import { Chart, useChart } from "@/components/chart";
import { SvgColor } from "@/components/svg-color";

// ----------------------------------------------------------------------

type AnalyticsWidgetSummaryProps = {
  icon: React.ReactNode;
  title: string;
  total: number;
  chart: {
    categories: string[];
    series: number[];
    options?: object;
  };
  percent: number;
  color?: string;
  sx?: object;
  [key: string]: any;
  colorGrd: any;
};

export function bgGradient({ color, imgUrl }: { color: any; imgUrl?: any }) {
  if (imgUrl) {
    return {
      background: `linear-gradient(${color}), url(${imgUrl})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
    };
  }
  return { background: `linear-gradient(${color})` };
}

export function AnalyticsWidgetSummary({
  icon,
  title,
  total,
  chart,
  percent,
  color = "primary",
  sx,
  colorGrd,
  ...other
}: AnalyticsWidgetSummaryProps) {
  const theme = useTheme();

  const chartColors = [
    (theme.palette as unknown as Record<string, { dark: string }>)[color]
      ?.dark || theme.palette.primary.dark,
  ];

  const chartOptions: any = useChart({
    chart: { sparkline: { enabled: true } },
    colors: chartColors,
    xaxis: { categories: chart.categories },
    grid: {
      padding: {
        top: 6,
        left: 6,
        right: 6,
        bottom: 6,
      },
    },
    tooltip: {
      y: {
        formatter: (value: number) => fNumber(value),
        title: { formatter: () => "" },
      },
    },
    ...chart.options,
  });

  const renderTrending = (
    <Box
      sx={{
        top: 16,
        gap: 0.5,
        right: 16,
        display: "flex",
        position: "absolute",
        alignItems: "center",
      }}
    >
      <Iconify
        width={20}
        icon={percent < 0 ? "eva:trending-down-fill" : "eva:trending-up-fill"}
      />
      <Box component="span" sx={{ typography: "subtitle2" }}>
        {percent > 0 && "+"}
        {fPercent(percent)}
      </Box>
    </Box>
  );

  return (
    <Card
      sx={{
        ...bgGradient({
          color: `135deg, ${colorGrd[0]} 0%, ${colorGrd[1]} 100%`,
        }),
        p: 3,
        boxShadow: "none",
        position: "relative",
        color: `${color}.darker`,
        backgroundColor: "common.white",
        borderRadius: 6,
        ...sx,
      }}
      {...other}
    >
      <Box sx={{ width: 48, height: 48, mb: 3 }}>{icon}</Box>

      {renderTrending}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <Box sx={{ flexGrow: 1, minWidth: 112 }}>
          <Box sx={{ mb: 1, typography: "subtitle2" }}>{title}</Box>
          <Box sx={{ typography: "h4" }}>{fShortenNumber(total)}</Box>
        </Box>

        <Chart
          type="line"
          series={[{ data: chart.series }]}
          options={chartOptions}
          width={84}
          height={56}
          zIndex={20}
        />
      </Box>

      <SvgColor
        src="/assets/background/shape-square.svg"
        sx={{
          top: 0,
          left: -20,
          width: 240,
          zIndex: 0,
          height: 240,
          opacity: 0.24,
          position: "absolute",
          color: `${color}.main`,
        }}
      />
    </Card>
  );
}
