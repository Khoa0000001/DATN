/* eslint-disable @typescript-eslint/no-explicit-any */
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ButtonBase from "@mui/material/ButtonBase";

import { Iconify } from "@/components/iconify";

import { usePopover, CustomPopover } from "../custom-popover";

// ----------------------------------------------------------------------

type ChartSelectProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  slotProps?: {
    button?: React.ComponentProps<typeof ButtonBase>["sx"];
    popover?: React.ComponentProps<typeof MenuList>["sx"];
  };
  [key: string]: any;
};

export function ChartSelect({
  options,
  value,
  onChange,
  slotProps,
  ...other
}: ChartSelectProps) {
  const popover = usePopover();

  return (
    <>
      <ButtonBase
        onClick={popover.onOpen}
        sx={{
          pr: 1,
          pl: 1.5,
          gap: 1.5,
          height: 34,
          borderRadius: 1,
          typography: "subtitle2",
          border: "1px solid rgba(0,0,0,0.24)",
          ...slotProps?.button,
        }}
        {...other}
      >
        {value}

        <Iconify
          icon={
            popover.open
              ? "eva:arrow-ios-upward-fill"
              : "eva:arrow-ios-downward-fill"
          }
          sx={{ fontSize: 16 }}
        />
      </ButtonBase>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
      >
        <MenuList sx={slotProps?.popover}>
          {options.map((option) => (
            <MenuItem
              key={option}
              selected={option === value}
              onClick={() => {
                popover.onClose();
                onChange(option);
              }}
            >
              {option}
            </MenuItem>
          ))}
        </MenuList>
      </CustomPopover>
    </>
  );
}
