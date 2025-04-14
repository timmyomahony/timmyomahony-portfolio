"use client";

import { parseISO, format } from "date-fns";

type Props = {
  dateString: string;
  formatString?: string;
  includeDay?: boolean;
};

const dayStrings = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

/**
 * Format an ISO date string using `date-fns`
 *
 * WARNING: Frontmatter automatically converts dates into Date objects causing
 * issues:
 *
 * https://github.com/jonschlinkert/gray-matter/issues/62
 *
 * To get around this, make sure that you pass `post.frontmatter.dateString.toISOString()`
 * when passing dates to this component.
 *
 * @param param0
 * @returns
 */
const DateFormatter = ({
  dateString,
  formatString = "LLLL	d, yyyy",
  includeDay = true,
}: Props) => {
  const date = parseISO(dateString);
  const dayString = dayStrings[date.getDay()];
  let dateText = `${format(date, formatString)}`;
  if (includeDay) {
    dateText = `${dayString} &mdash; ${dateText}`;
  }
  return (
    <time
      dateTime={dateString}
      dangerouslySetInnerHTML={{ __html: dateText }}
    ></time>
  );
};

export default DateFormatter;
