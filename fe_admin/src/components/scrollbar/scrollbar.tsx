/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from "react";
// @ts-ignore
import SimpleBar from "simplebar-react";

import Box from "@mui/material/Box";

import { scrollbarClasses } from "./classes";

// ----------------------------------------------------------------------

interface ScrollbarProps {
  slotProps?: {
    wrapper?: object;
    contentWrapper?: object;
    content?: object;
  };
  children?: React.ReactNode;
  fillContent?: boolean;
  naturalScroll?: boolean;
  sx?: object;
  [key: string]: any;
}

export const Scrollbar = forwardRef<HTMLDivElement, ScrollbarProps>(
  ({ slotProps, children, fillContent, sx, ...other }, ref) => (
    <Box
      component={SimpleBar}
      scrollableNodeProps={{ ref }}
      clickOnTrack={false}
      className={scrollbarClasses.root}
      minHeight={100}
      sx={{
        minWidth: 0,
        minHeight: 0,
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        "& .simplebar-wrapper": slotProps?.wrapper,
        "& .simplebar-content-wrapper": slotProps?.contentWrapper,
        "& .simplebar-content": {
          ...(fillContent && {
            minHeight: 1,
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
          }),

          ...slotProps?.content,
        },
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  )
);
