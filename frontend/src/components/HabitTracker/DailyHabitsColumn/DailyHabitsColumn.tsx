import { useMutation } from "@apollo/client";
import { FC } from "react";
import { useSelector } from "react-redux";
import { GET_WEEKLY_HABITS } from "../../../utils/queries";
import { UPDATE_HABIT_COMPLETION } from "../../../utils/queries";
import React from "react";

interface DailyHabitsColumnProps {
  dayNum: string;
  habits?: {
    id: string;
    completed: boolean;
    name: string;
  }[];
}

export const DailyHabitsColumn: FC<DailyHabitsColumnProps> = ({
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

  const [updateHabit] = useMutation(UPDATE_HABIT_COMPLETION, {
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
      style={{
        backgroundColor: habits === undefined ? "gray" : "",
        border:
          dayNum === currentPage.date.day.number.toString()
            ? "2px solid red"
            : "",
      }}
      // onClick={() => console.log(habits)}
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
              },
            })
          }
          style={{ opacity: habit.name === "blank" ? 0 : 1 }}
          disabled={dayNum !== currentPage.date.day.number.toString()}
        />
      ))}
    </div>
  );
};
