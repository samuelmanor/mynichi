import React from "react";
import { FC } from "react";
import { formatMonth } from "../../utils/formatMonth";
import { useSelector } from "react-redux";
// @ts-ignore
import { GET_WEEKLY_HABITS } from "../../utils/queries";
import { useQuery } from "@apollo/client";

interface HabitTrackerProps {}

export const HabitTracker: FC<HabitTrackerProps> = () => {
  const currentPage = useSelector((state: any) => state.currentPage);

  const habits = useQuery(GET_WEEKLY_HABITS, {
    variables: {
      month: currentPage.date.month,
      year: currentPage.date.year,
      week: currentPage.date.week,
    },
  });

  return (
    <div>
      habit tracker
      <button onClick={() => console.log(habits.data.getWeeklyHabits)}>
        cl
      </button>
    </div>
  );
};
