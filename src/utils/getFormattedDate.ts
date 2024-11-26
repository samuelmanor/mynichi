export type FormattedDate = {
  month: number;
  day: {
    number: number;
    name: string;
  };
  year: number;
};

/**
 * Returns the current date in the format of the Date type.
 * @returns {Date} The current date.
 */
export const getFormattedDate = (): FormattedDate => {
  return {
    day: {
      number: new Date().getDate(),
      name: new Date().toDateString().split(" ")[0].toLowerCase(),
    },
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  };
};
