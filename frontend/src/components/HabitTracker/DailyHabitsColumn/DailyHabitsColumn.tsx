import { useMutation } from "@apollo/client";
import { FC } from "react";
import { useSelector } from "react-redux";
// @ts-ignore
import { GET_WEEKLY_HABITS, UPDATE_HABIT } from "../../../utils/queries";
import React from "react";

interface DailyHabitsColumn {
  dayNum: string;
  habits?: { name: string; completed: boolean; id: string }[];
}

export const DailyHabitsColumn: FC<DailyHabitsColumn> = ({
  dayNum,
  habits,
}) => {
  const currentPage = useSelector((state: any) => state.currentPage);

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
          style={{ opacity: habit.name === "blank" ? 0 : 1 }}
        />
      ))}
    </div>
  );
};
