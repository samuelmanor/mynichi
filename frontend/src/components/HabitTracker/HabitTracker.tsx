import React, { FC } from "react";
import { formatMonth } from "../../utils/formatMonth";
import { useSelector } from "react-redux";
// @ts-ignore
import { GET_WEEKLY_HABITS } from "../../utils/queries";
import { useQuery } from "@apollo/client";

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

  interface DayProps {
    dayNum: string;
    habits?: Object;
  }

  const Day: FC<DayProps> = ({ dayNum, habits }) => {
    const dayOfWeek = new Date(
      currentPage.date.year,
      currentPage.date.month - 1,
      parseInt(dayNum)
    )
      .toDateString()
      .split(" ")[0]
      .toLowerCase()[0];

    return (
      <div
        onClick={() => console.log(dayOfWeek)}
        style={{ backgroundColor: habits === undefined ? "gray" : "" }}
      >
        {dayOfWeek}
        {dayNum}
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
        <Day
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
