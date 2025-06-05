/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from "react";
import { Icon } from "@iconify/react";

import Box from "@mui/material/Box";
import NoSsr from "@mui/material/NoSsr";

import { iconifyClasses } from "./classes";

// ----------------------------------------------------------------------

type IconifyProps = {
  className?: string;
  width?: number;
  sx?: object;
  [key: string]: any;
};

export const Iconify = forwardRef<HTMLSpanElement, IconifyProps>(
  ({ className, width = 20, sx, icon, ...other }, ref) => {
    const baseStyles = {
      width,
      height: width,
      flexShrink: 0,
      display: "inline-flex",
    };

    const renderFallback = (
      <Box
        component="span"
        className={iconifyClasses.root.concat(className ? ` ${className}` : "")}
        sx={{ ...baseStyles, ...sx }}
      />
    );

    return (
      <NoSsr fallback={renderFallback}>
        <Box
          ref={ref}
          component={Icon}
          icon={icon}
          className={iconifyClasses.root.concat(
            className ? ` ${className}` : ""
          )}
          sx={{ ...baseStyles, ...sx }}
          {...other}
        />
      </NoSsr>
    );
  }
);
