/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "@mui/material/Card";
import Timeline from "@mui/lab/Timeline";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";

import { fDateTime } from "./format-time";

// ----------------------------------------------------------------------

type AnalyticsOrderTimelineProps = {
  title: string;
  subheader?: string;
  list: {
    id: string | number;
    type: string;
    title: string;
    time: string | number | Date;
  }[];
  [key: string]: any;
};

export function AnalyticsOrderTimeline({
  title,
  subheader,
  list,
  ...other
}: AnalyticsOrderTimelineProps) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Timeline
        sx={{
          m: 0,
          p: 3,
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {list.map((item, index) => (
          <Item
            key={item.id}
            item={item}
            lastItem={index === list.length - 1}
          />
        ))}
      </Timeline>
    </Card>
  );
}

type ItemProps = {
  item: {
    id: string | number;
    type: string;
    title: string;
    time: string | number | Date;
  };
  lastItem: boolean;
  [key: string]: any;
};

function Item({ item, lastItem, ...other }: ItemProps) {
  return (
    <TimelineItem {...other}>
      <TimelineSeparator>
        <TimelineDot
          color={
            (item.type === "order1" && "primary") ||
            (item.type === "order2" && "success") ||
            (item.type === "order3" && "info") ||
            (item.type === "order4" && "warning") ||
            "error"
          }
        />
        {lastItem ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="subtitle2">{item.title}</Typography>

        <Typography variant="caption" sx={{ color: "text.disabled" }}>
          {fDateTime(item.time)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
