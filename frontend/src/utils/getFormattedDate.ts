export type FormattedDate = {
  month: number;
  week: number;
  day: {
    number: number;
    name: string;
  };
  year: number;
};

/**
 * Returns the current date in the format of the FormattedDate type.
 * @returns { FormattedDate } The current date.
 * @example
 * ```
 * const date = getFormattedDate();
 * console.log(date);
 * // {
 * //   month: 11,
 * //   week: 5,
 * //   day: {
 * //     number: 26,
 * //     name: "tue"
 * //   },
 * //   year: 2024
 * // }
 * ```
 */
export const getFormattedDate = (): FormattedDate => {
  const today = new Date();
  return {
    day: {
      number: today.getDate(),
      name: today.toDateString().split(" ")[0].toLowerCase(),
    },
    month: today.getMonth() + 1,
    year: today.getFullYear(),
    week: Math.floor((today.getDate() + today.getDay()) / 7) + 1,
  };
};
