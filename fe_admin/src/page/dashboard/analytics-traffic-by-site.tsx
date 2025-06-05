/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";

import { fShortenNumber } from "./format-time";

import { SocialIcon } from "@/components/iconify";

// ----------------------------------------------------------------------

type AnalyticsTrafficBySiteProps = {
  title: string;
  subheader?: string;
  list: Array<{
    label: string;
    value: string;
    total: number;
  }>;
  [key: string]: any;
};

export function AnalyticsTrafficBySite({
  title,
  subheader,
  list,
  ...other
}: AnalyticsTrafficBySiteProps) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box
        display="grid"
        gap={2}
        gridTemplateColumns="repeat(2, 1fr)"
        sx={{ p: 3 }}
      >
        {list.map((site) => (
          <Box
            key={site.label}
            sx={{
              py: 2.5,
              display: "flex",
              borderRadius: 1.5,
              textAlign: "center",
              alignItems: "center",
              flexDirection: "column",
              border: `solid 1px #000`,
            }}
          >
            <SocialIcon width={32} icon={site.value} />

            <Typography variant="h6" sx={{ mt: 1 }}>
              {fShortenNumber(site.total)}
            </Typography>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {site.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  );
}
