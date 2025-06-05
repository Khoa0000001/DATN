/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from "react";

import Box from "@mui/material/Box";

import { svgColorClasses } from "./classes";

// ----------------------------------------------------------------------

import { SxProps } from "@mui/material";

type SvgColorProps = {
  src: string;
  className?: string;
  sx?: SxProps;
  [key: string]: any;
};

export const SvgColor = forwardRef<HTMLSpanElement, SvgColorProps>(
  ({ src, className, sx, ...other }, ref) => (
    <Box
      ref={ref}
      component="span"
      className={svgColorClasses.root.concat(className ? ` ${className}` : "")}
      sx={{
        width: 24,
        height: 24,
        flexShrink: 0,
        display: "inline-flex",
        bgcolor: "currentColor",
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        ...sx,
      }}
      {...other}
    />
  )
);
