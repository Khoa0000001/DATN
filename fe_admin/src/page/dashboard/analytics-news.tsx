/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import ListItemText from "@mui/material/ListItemText";

import { fToNow } from "./format-time";

import { Iconify } from "@/components/iconify";

// ----------------------------------------------------------------------

type AnalyticsNewsProps = {
  title: string;
  subheader?: string;
  list: {
    id: string | number;
    title: string;
    description: string;
    coverUrl: string;
    postedAt: Date | string | number;
  }[];
  [key: string]: any;
};

export function AnalyticsNews({
  title,
  subheader,
  list,
  ...other
}: AnalyticsNewsProps) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 1 }} />

      <Box sx={{ minWidth: 640 }}>
        {list.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </Box>

      <Box sx={{ p: 2, textAlign: "right" }}>
        <Button
          size="small"
          color="inherit"
          endIcon={
            <Iconify
              icon="eva:arrow-ios-forward-fill"
              width={18}
              sx={{ ml: -0.5 }}
            />
          }
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}

type ItemProps = {
  item: {
    id: string | number;
    title: string;
    description: string;
    coverUrl: string;
    postedAt: Date | string | number;
  };
  sx?: any;
  [key: string]: any;
};

function Item({ item, sx, ...other }: ItemProps) {
  return (
    <Box
      sx={{
        py: 2,
        px: 3,
        gap: 2,
        display: "flex",
        alignItems: "center",
        borderBottom: () => `dashed 1px #000`,
        ...sx,
      }}
      {...other}
    >
      <Avatar
        variant="rounded"
        alt={item.title}
        src={item.coverUrl}
        sx={{ width: 48, height: 48, flexShrink: 0 }}
      />

      <ListItemText
        primary={item.title}
        secondary={item.description}
        primaryTypographyProps={{ noWrap: true, typography: "subtitle2" }}
        secondaryTypographyProps={{ mt: 0.5, noWrap: true, component: "span" }}
      />

      <Box
        sx={{ flexShrink: 0, color: "text.disabled", typography: "caption" }}
      >
        {fToNow(item.postedAt)}
      </Box>
    </Box>
  );
}
