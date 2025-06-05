/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

// ----------------------------------------------------------------------

import { SxProps } from "@mui/material/styles";

interface ChartLoadingProps {
  sx?: SxProps;
  type: string;
  [key: string]: any;
}

export function ChartLoading({ sx, type, ...other }: ChartLoadingProps) {
  const circularTypes = ["donut", "radialBar", "pie", "polarArea"];

  return (
    <Box
      alignItems="center"
      justifyContent="center"
      sx={{
        top: 0,
        left: 0,
        width: 1,
        zIndex: 9,
        height: 1,
        p: "inherit",
        overflow: "hidden",
        position: "absolute",
        borderRadius: "inherit",
        ...sx,
      }}
      {...other}
    >
      <Skeleton
        variant="circular"
        sx={{
          width: 1,
          height: 1,
          borderRadius: "inherit",
          ...(circularTypes.includes(type) && {
            borderRadius: "50%",
          }),
        }}
      />
    </Box>
  );
}
