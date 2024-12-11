import React, { FC } from "react";
import { formatMonth } from "../../utils/formatMonth";
import { useSelector } from "react-redux";
import {
  GET_WEEKLY_HABITS,
  UPDATE_HABIT,
  GET_HABIT_NAMES,
} from "../../utils/queries";
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

  const habitNames = useQuery(GET_HABIT_NAMES, {
    variables: {
      month: currentPage.date.month,
      year: currentPage.date.year,
      week: currentPage.date.week,
    },
  });

  return (
    <div>
      habit tracker
      <button onClick={() => console.log(currentWeek)}>cl week</button>
      <button onClick={() => console.log(habits.data.getWeeklyHabits)}>
        cl habits
      </button>
      <div onClick={() => console.log(habitNames.data.getHabitNames)}>
        cl habit names
      </div>
      {currentWeek?.map((day, i) => (
        <DailyHabitsColumn
          key={i}
          dayNum={day.toString()}
          habits={
            habits?.data?.getWeeklyHabits?.filter(
              (habit: { day: number; habit: object }) => habit.day === day
            )[0]?.habits
          }
        />
      ))}
      {habitNames?.data?.getHabitNames?.map((name: string, i: number) => (
        <div key={`${name}${i}`}>{name}</div>
      ))}
    </div>
  );
};
