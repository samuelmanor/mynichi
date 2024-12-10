import React, { FC } from "react";
import { formatMonth } from "../../utils/formatMonth";
import { useSelector } from "react-redux";
// @ts-ignore
import { GET_WEEKLY_HABITS, UPDATE_HABIT } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";

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
    habits?: { name: string; completed: boolean; id: string }[];
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

    const [updateHabit] = useMutation(UPDATE_HABIT, {
      refetchQueries: [
        {
          query: GET_WEEKLY_HABITS,
          variables: {
            month: currentPage.date.month,
            year: currentPage.date.year,
            week: currentPage.date.week,
          },
        },
      ],
    });

    return (
      <div
        // onClick={() => console.log(habits)}
        style={{
          backgroundColor: habits === undefined ? "gray" : "",
          border:
            dayNum === currentPage.date.day.number.toString()
              ? "2px solid red"
              : "",
        }}
      >
        <div>{dayNum}</div>
        <div>{dayOfWeek}</div>
        {habits?.map((habit, i) => (
          <input
            key={i}
            type="checkbox"
            defaultChecked={habit.completed}
            onClick={() =>
              updateHabit({
                variables: {
                  pageId: currentPage.id,
                  habitId: habit.id,
                  completed: !habit.completed,
                  name: habit.name,
                },
              })
            }
          />
        ))}
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
