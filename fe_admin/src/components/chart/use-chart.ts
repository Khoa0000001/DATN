/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTheme } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";

// ----------------------------------------------------------------------

interface ChartAnimations {
  enabled?: boolean;
  speed?: number;
  animateGradually?: { enabled?: boolean; delay?: number };
  dynamicAnimation?: { enabled?: boolean; speed?: number };
  [key: string]: any;
}

interface ChartOptions {
  toolbar?: { show?: boolean };
  zoom?: { enabled?: boolean };
  parentHeightOffset?: number;
  fontFamily?: string;
  foreColor?: string;
  animations?: ChartAnimations;
  [key: string]: any;
}

interface ChartStates {
  hover?: { filter?: { type?: string; value?: number; [key: string]: any } };
  active?: { filter?: { type?: string; value?: number; [key: string]: any } };
  [key: string]: any;
}

interface ChartFill {
  opacity?: number;
  gradient?: {
    type?: string;
    shadeIntensity?: number;
    opacityFrom?: number;
    opacityTo?: number;
    stops?: number[];
    [key: string]: any;
  };
  [key: string]: any;
}

interface ChartStroke {
  width?: number;
  curve?: string;
  lineCap?: string;
  [key: string]: any;
}

interface ChartGrid {
  strokeDashArray?: number;
  borderColor?: string;
  padding?: {
    top?: number;
    right?: number;
    bottom?: number;
    [key: string]: any;
  };
  xaxis?: { lines?: { show?: boolean }; [key: string]: any };
  [key: string]: any;
}

interface ChartAxis {
  axisBorder?: { show?: boolean };
  axisTicks?: { show?: boolean };
  [key: string]: any;
}

interface ChartYAxis {
  tickAmount?: number;
  [key: string]: any;
}

interface ChartMarkers {
  size?: number;
  strokeColors?: string;
  [key: string]: any;
}

interface ChartTooltip {
  theme?: string;
  fillSeriesColor?: boolean;
  x?: { show?: boolean };
  [key: string]: any;
}

interface ChartLegend {
  show?: boolean;
  position?: string;
  fontWeight?: number;
  fontSize?: string;
  horizontalAlign?: string;
  markers?: { radius?: number };
  labels?: { colors?: string };
  itemMargin?: { horizontal?: number; vertical?: number };
  [key: string]: any;
}

interface ChartPlotOptions {
  bar?: {
    borderRadius?: number;
    columnWidth?: string;
    borderRadiusApplication?: string;
    [key: string]: any;
  };
  pie?: {
    donut?: {
      labels?: {
        show?: boolean;
        value?: { [key: string]: any };
        total?: { [key: string]: any };
        [key: string]: any;
      };
      [key: string]: any;
    };
    [key: string]: any;
  };
  radialBar?: {
    hollow?: { margin?: number; size?: string; [key: string]: any };
    track?: {
      margin?: number;
      strokeWidth?: string;
      background?: string;
      [key: string]: any;
    };
    dataLabels?: {
      value?: { [key: string]: any };
      total?: { [key: string]: any };
      [key: string]: any;
    };
    [key: string]: any;
  };
  radar?: {
    polygons?: {
      fill?: { colors?: string[] };
      strokeColors?: string;
      connectorColors?: string;
      [key: string]: any;
    };
    [key: string]: any;
  };
  polarArea?: {
    rings?: { strokeColor?: string };
    spokes?: { connectorColors?: string };
    [key: string]: any;
  };
  heatmap?: { distributed?: boolean; [key: string]: any };
  [key: string]: any;
}

interface ChartResponsiveOption {
  breakpoint: number;
  options: {
    plotOptions?: { bar?: { borderRadius?: number; columnWidth?: string } };
  };
}

interface UseChartOptions {
  chart?: ChartOptions;
  colors?: string[];
  states?: ChartStates;
  fill?: ChartFill;
  dataLabels?: { enabled?: boolean; [key: string]: any };
  stroke?: ChartStroke;
  grid?: ChartGrid;
  xaxis?: ChartAxis;
  yaxis?: ChartYAxis;
  markers?: ChartMarkers;
  tooltip?: ChartTooltip;
  legend?: ChartLegend;
  plotOptions?: ChartPlotOptions;
  responsive?: ChartResponsiveOption[];
  [key: string]: any;
}

export function useChart(options: UseChartOptions) {
  const theme: Theme = useTheme();

  const LABEL_TOTAL = {
    show: true,
    label: "Total",
    color: theme.vars?.palette.text.secondary,
    fontSize: theme.typography.subtitle2.fontSize,
    fontWeight: theme.typography.subtitle2.fontWeight,
  };

  const LABEL_VALUE = {
    offsetY: 8,
    color: theme.vars?.palette.text.primary,
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
  };

  const RESPONSIVE: ChartResponsiveOption[] = [
    {
      breakpoint: theme.breakpoints.values.sm, // sm ~ 600
      options: {
        plotOptions: {
          bar: {
            borderRadius: 3,
            columnWidth: "80%",
          },
        },
      },
    },
    {
      breakpoint: theme.breakpoints.values.md, // md ~ 900
      options: {
        plotOptions: {
          bar: {
            columnWidth: "60%",
          },
        },
      },
    },
    ...(options?.responsive ?? []),
  ];

  return {
    ...options,

    /** **************************************
     * Chart
     *************************************** */
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      parentHeightOffset: 0,
      fontFamily: theme.typography.fontFamily,
      foreColor: theme.vars?.palette.text.disabled,
      ...options?.chart,
      animations: {
        enabled: true,
        speed: 360,
        animateGradually: { enabled: true, delay: 120 },
        dynamicAnimation: { enabled: true, speed: 360 },
        ...options?.chart?.animations,
      },
    },

    /** **************************************
     * Colors
     *************************************** */
    colors: options?.colors ?? [
      theme.palette.primary.main,
      theme.palette.warning.main,
      theme.palette.info.main,
      theme.palette.error.main,
      theme.palette.success.main,
      theme.palette.warning.dark,
      theme.palette.success.dark,
      theme.palette.info.dark,
      theme.palette.info.dark,
    ],

    /** **************************************
     * States
     *************************************** */
    states: {
      ...options?.states,
      hover: {
        ...options?.states?.hover,
        filter: {
          type: "darken",
          value: 0.88,
          ...options?.states?.hover?.filter,
        },
      },
      active: {
        ...options?.states?.active,
        filter: {
          type: "darken",
          value: 0.88,
          ...options?.states?.active?.filter,
        },
      },
    },

    /** **************************************
     * Fill
     *************************************** */
    fill: {
      opacity: 1,
      ...options?.fill,
      gradient: {
        type: "vertical",
        shadeIntensity: 0,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100],
        ...options?.fill?.gradient,
      },
    },

    /** **************************************
     * Data labels
     *************************************** */
    dataLabels: {
      enabled: false,
      ...options?.dataLabels,
    },

    /** **************************************
     * Stroke
     *************************************** */
    stroke: {
      width: 2.5,
      curve: "smooth",
      lineCap: "round",
      ...options?.stroke,
    },

    /** **************************************
     * Grid
     *************************************** */
    grid: {
      strokeDashArray: 3,
      borderColor: theme.vars?.palette.divider,
      ...options?.grid,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        ...options?.grid?.padding,
      },
      xaxis: {
        lines: {
          show: false,
        },
        ...options?.grid?.xaxis,
      },
    },

    /** **************************************
     * Axis
     *************************************** */
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      ...options?.xaxis,
    },
    yaxis: {
      tickAmount: 5,
      ...options?.yaxis,
    },

    /** **************************************
     * Markers
     *************************************** */
    markers: {
      size: 0,
      strokeColors: theme.vars?.palette.background.paper,
      ...options?.markers,
    },

    /** **************************************
     * Tooltip
     *************************************** */
    tooltip: {
      theme: "false",
      fillSeriesColor: false,
      x: {
        show: true,
      },
      ...options?.tooltip,
    },

    /** **************************************
     * Legend
     *************************************** */
    legend: {
      show: false,
      position: "top",
      fontWeight: 500,
      fontSize: "13px",
      horizontalAlign: "right",
      markers: { radius: 12 },
      labels: {
        colors: theme.vars?.palette.text.primary,
      },
      ...options?.legend,
      itemMargin: {
        horizontal: 8,
        vertical: 8,
        ...options?.legend?.itemMargin,
      },
    },

    /** **************************************
     * plotOptions
     *************************************** */
    plotOptions: {
      ...options?.plotOptions,
      // plotOptions: Bar
      bar: {
        borderRadius: 4,
        columnWidth: "48%",
        borderRadiusApplication: "end",
        ...options?.plotOptions?.bar,
      },

      // plotOptions: Pie + Donut
      pie: {
        ...options?.plotOptions?.pie,
        donut: {
          ...options?.plotOptions?.pie?.donut,
          labels: {
            show: true,
            ...options?.plotOptions?.pie?.donut?.labels,
            value: {
              ...LABEL_VALUE,
              ...options?.plotOptions?.pie?.donut?.labels?.value,
            },
            total: {
              ...LABEL_TOTAL,
              ...options?.plotOptions?.pie?.donut?.labels?.total,
            },
          },
        },
      },

      // plotOptions: Radialbar
      radialBar: {
        ...options?.plotOptions?.radialBar,
        hollow: {
          margin: -8,
          size: "100%",
          ...options?.plotOptions?.radialBar?.hollow,
        },
        track: {
          margin: -8,
          strokeWidth: "50%",
          background: "#000",
          ...options?.plotOptions?.radialBar?.track,
        },
        dataLabels: {
          ...options?.plotOptions?.radialBar?.dataLabels,
          value: {
            ...LABEL_VALUE,
            ...options?.plotOptions?.radialBar?.dataLabels?.value,
          },
          total: {
            ...LABEL_TOTAL,
            ...options?.plotOptions?.radialBar?.dataLabels?.total,
          },
        },
      },

      // plotOptions: Radar
      radar: {
        ...options?.plotOptions?.radar,
        polygons: {
          fill: {
            colors: ["transparent"],
          },
          strokeColors: theme.vars?.palette.divider,
          connectorColors: theme.vars?.palette.divider,
          ...options?.plotOptions?.radar?.polygons,
        },
      },

      // plotOptions: polarArea
      polarArea: {
        rings: {
          strokeColor: theme.vars?.palette.divider,
        },
        spokes: {
          connectorColors: theme.vars?.palette.divider,
        },
        ...options?.plotOptions?.polarArea,
      },

      // plotOptions: heatmap
      heatmap: {
        distributed: true,
        ...options?.plotOptions?.heatmap,
      },
    },

    /** **************************************
     * Responsive
     *************************************** */
    responsive: RESPONSIVE.reduce<ChartResponsiveOption[]>((acc, cur) => {
      if (!acc.some((item) => item.breakpoint === cur.breakpoint)) {
        acc.push(cur);
      }
      return acc;
    }, []),
  };
}
