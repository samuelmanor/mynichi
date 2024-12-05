// uses given date to return a 2d array of the month's days

import { FormattedDate } from "./getFormattedDate";

/**
 * Uses the given date to return a 2d array of the month's days.
 * @param {FormattedDate} date The date to format.
 * @returns {number[][]} A 2d array of the month's days.
 */
export const formatMonth = (month: number, year: number): number[][] => {
  // console.log(date);
  // const month = date.month;
  // const year = date.year;
  /** The day of the week that the first day of the month falls on. 0 is Sunday, 6 is Saturday. */
  const firstDayPosition = new Date(year, month - 1, 1).getDay();
  /** The total number of days in the given month. */
  const daysInMonth = new Date(year, month, 0).getDate();
  // console.log(firstDayPosition, daysInMonth);

  const weeksInMonth = Math.ceil((daysInMonth + firstDayPosition) / 7);

  // example of what the array should look like:
  // [
  //   [0, 0, 0, 0, 0, 1, 2],
  //   [3, 4, 5, 6, 7, 8, 9],
  //   [10, 11, 12, 13, 14, 15, 16],
  //   [17, 18, 19, 20, 21, 22, 23],
  //   [24, 25, 26, 27, 28, 29, 30]
  // ]

  let monthArray: number[][] = [];
  let weekArray: number[] = [];

  // fill in the first week with 0s until the first day of the month
  for (let i = 0; i < firstDayPosition; i++) {
    weekArray.push(0);
  }

  // fill in the rest of the days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    weekArray.push(i);
    if (weekArray.length === 7) {
      monthArray.push(weekArray);
      weekArray = [];
    }
  }

  // fill in the last week with 0s until the end of the week, if necessary
  if (monthArray.length < weeksInMonth) {
    while (weekArray.length < 7) {
      weekArray.push(0);
    }
    monthArray.push(weekArray);
  }

  return monthArray;
};
