/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import { Iconify } from "../iconify";

// ----------------------------------------------------------------------

export const StyledLegend = styled(Box)(({ theme }) => ({
  gap: 6,
  alignItems: "center",
  display: "inline-flex",
  justifyContent: "flex-start",
  fontSize: theme.typography.pxToRem(13),
  fontWeight: theme.typography.fontWeightMedium,
}));

export const StyledDot = styled(Box)(() => ({
  width: 12,
  height: 12,
  flexShrink: 0,
  display: "flex",
  borderRadius: "50%",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "currentColor",
}));

// ----------------------------------------------------------------------

interface ChartLegendsProps {
  labels?: string[];
  colors?: string[];
  values?: (string | number)[];
  sublabels?: (string | number)[];
  icons?: string[];
  [key: string]: any;
}

export function ChartLegends({
  labels = [],
  colors = [],
  values,
  sublabels,
  icons,
  ...other
}: ChartLegendsProps) {
  return (
    <Stack direction="row" flexWrap="wrap" spacing={2} {...other}>
      {labels?.map((series, index) => (
        <Stack key={series} spacing={1}>
          <StyledLegend>
            {icons?.length ? (
              <Box
                component="span"
                sx={{
                  color: colors[index],
                  "& svg, & img": { width: 20, height: 20 },
                }}
              >
                <Iconify icon={icons?.[index]} />
              </Box>
            ) : (
              <StyledDot as="span" sx={{ color: colors[index] }} />
            )}

            <Box component="span" sx={{ flexShrink: 0 }}>
              {series}
              {sublabels && <> {` (${sublabels[index]})`}</>}
            </Box>
          </StyledLegend>

          {values && <Box sx={{ typography: "h6" }}>{values[index]}</Box>}
        </Stack>
      ))}
    </Stack>
  );
}
