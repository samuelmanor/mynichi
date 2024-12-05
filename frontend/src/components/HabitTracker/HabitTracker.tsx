import React from "react";
import { FC } from "react";
import { formatMonth } from "../../utils/formatMonth";
import { useSelector } from "react-redux";

interface HabitTrackerProps {}

export const HabitTracker: FC<HabitTrackerProps> = () => {
  // const currentPage = useSelector((state: any) => state.currentPage);
  // const currentWeek = formatMonth(
  //   currentPage.date.month,
  //   currentPage.date.year
  // )[currentPage.date.week - 1];

  return (
    <div>
      habit tracker
      <button onClick={() => console.log("hi")}>cl</button>
    </div>
  );
};
