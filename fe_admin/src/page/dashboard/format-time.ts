/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
dayjs.extend(relativeTime);
dayjs.extend(duration);

export function fNumber(
  inputValue: number | string | null | undefined,
  options?: Intl.NumberFormatOptions
): string {
  const number = processInput(inputValue);
  if (number === null) return "";

  const fm = new Intl.NumberFormat("vi-VN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  }).format(number);

  return fm;
}

export function fShortenNumber(
  inputValue: number | string,
  options?: any
): string {
  const number = processInput(inputValue);
  if (number === null) return "";

  const fm = new Intl.NumberFormat("vi-VN", {
    notation: "compact",
    maximumFractionDigits: 2,
    ...options,
  }).format(number);

  return fm.replace(/[A-Z]/g, (match: string) => match.toLowerCase());
}

function processInput(
  inputValue: number | string | null | undefined
): number | null {
  if (inputValue == null || Number.isNaN(inputValue)) return null;
  return Number(inputValue);
}

export interface FToNowOptions {
  date: string | number | Date | dayjs.Dayjs | null | undefined;
}

export function fToNow(date: FToNowOptions["date"]): string | null {
  if (!date) {
    return null;
  }

  const isValid: boolean = dayjs(date).isValid();

  return isValid ? dayjs(date).toNow(true) : "Invalid time value";
}
export interface FDateTimeOptions {
  date: string | number | Date | dayjs.Dayjs | null | undefined;
  format?: string;
}
export const formatStr = {
  dateTime: "DD MMM YYYY h:mm a", // 17 Apr 2022 12:00 am
  date: "DD MMM YYYY", // 17 Apr 2022
  time: "h:mm a", // 12:00 am
  split: {
    dateTime: "DD/MM/YYYY h:mm a", // 17/04/2022 12:00 am
    date: "DD/MM/YYYY", // 17/04/2022
  },
  paramCase: {
    dateTime: "DD-MM-YYYY h:mm a", // 17-04-2022 12:00 am
    date: "DD-MM-YYYY", // 17-04-2022
  },
};
export function fDateTime(
  date: FDateTimeOptions["date"],
  format?: FDateTimeOptions["format"]
): string | null {
  if (!date) {
    return null;
  }

  const isValid: boolean = dayjs(date).isValid();

  return isValid
    ? dayjs(date).format(format ?? formatStr.dateTime)
    : "Invalid time value";
}

export interface FPercentOptions extends Intl.NumberFormatOptions {
  locale?: string;
}

export function fPercent(
  inputValue: number | string | null | undefined,
  options?: FPercentOptions
): string {
  const number = processInput(inputValue);
  if (number === null) return "";

  const locale = options?.locale ?? "vi-VN";

  const fm = new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
    ...options,
    // Remove locale from options to avoid Intl.NumberFormat error
    ...(options?.locale ? { locale: undefined } : {}),
  }).format(number / 100);

  return fm;
}
export function fSub({
  years = 0,
  months = 0,
  days = 0,
  hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0,
}) {
  const result = dayjs()
    .subtract(
      dayjs.duration({
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
        milliseconds,
      })
    )
    .format();

  return result;
}

export function today(format: any) {
  return dayjs(new Date()).startOf("day").format(format);
}
export function fAdd({
  years = 0,
  months = 0,
  days = 0,
  hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0,
}) {
  const result = dayjs()
    .add(
      dayjs.duration({
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
        milliseconds,
      })
    )
    .format();

  return result;
}
