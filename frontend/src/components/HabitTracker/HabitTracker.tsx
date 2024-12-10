import React, { FC } from "react";
import { formatMonth } from "../../utils/formatMonth";
import { useSelector } from "react-redux";
// @ts-ignore
import { GET_WEEKLY_HABITS, UPDATE_HABIT } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { DailyHabitsColumn } from "./DailyHabitsColumn";

interface HabitTrackerProps {}

export const HabitTracker: FC<HabitTrackerProps> = () => {
  const currentPage = useSelector((state: any) => state.currentPage);

  const currentWeek = formatMonth(
    currentPage.date.month,
    currentPage.date.year
  )[currentPage.date.week - 1];

  const habits = useQuery(GET_WEEKLY_HABITS, {
    variables: {
      month: currentPage.date.month,
      year: currentPage.date.year,
      week: currentPage.date.week,
    },
  });

  interface HabitNameProps {
    name: string;
  }

  const HabitName: FC<HabitNameProps> = ({ name }) => {
    return (
      <div>
        <p>{name}</p>
      </div>
    );
  };

  return (
    <div>
      habit tracker
      <button onClick={() => console.log(currentWeek)}>cl week</button>
      <button onClick={() => console.log(habits.data.getWeeklyHabits)}>
        cl habits
      </button>
      {currentWeek?.map((day, i) => (
        <DailyHabitsColumn
          key={i}
          dayNum={day.toString()}
          habits={
            habits?.data?.getWeeklyHabits?.filter(
              (habit: any) => habit.day === day
            )[0]?.habits
          }
        />
      ))}
    </div>
  );
};
