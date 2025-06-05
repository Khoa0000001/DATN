/* eslint-disable @typescript-eslint/no-explicit-any */
import ApexChart from "react-apexcharts";

import Box from "@mui/material/Box";

// ----------------------------------------------------------------------

import { SxProps } from "@mui/material";
import { ApexOptions } from "apexcharts";

interface ChartProps {
  sx?: SxProps;
  type?:
    | "area"
    | "line"
    | "bar"
    | "radar"
    | "pie"
    | "donut"
    | "radialBar"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "candlestick"
    | "boxPlot"
    | "polarArea"
    | "rangeBar"
    | "rangeArea"
    | "treemap";
  series: any;
  height?: number | string;
  options?: ApexOptions;
  width?: number | string;
  [key: string]: any;
}

export function Chart({
  sx,
  type,
  series,
  height,
  options,
  width = "100%",
  ...other
}: ChartProps) {
  return (
    <Box
      dir="ltr"
      sx={{
        width,
        height,
        flexShrink: 0,
        borderRadius: 1.5,
        position: "relative",
        ...sx,
      }}
      {...other}
    >
      <ApexChart
        type={type}
        series={series}
        options={options}
        width="100%"
        height="100%"
      />
    </Box>
  );
}
