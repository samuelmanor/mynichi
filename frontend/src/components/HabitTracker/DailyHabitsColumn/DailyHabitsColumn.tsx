import { useMutation } from "@apollo/client";
import { FC } from "react";
import { useSelector } from "react-redux";
import { GET_WEEKLY_HABITS } from "../../../utils/queries";
import { UPDATE_HABIT_COMPLETION } from "../../../utils/queries";
import React from "react";
import { Grid2, Radio, Typography } from "@mui/material";

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
    <Grid2
      container
      sx={{
        flexDirection: "column",
        border: "2px solid red",
        width: "50px",
        textAlign: "center",
        alignItems: "center",
        backgroundColor:
          dayNum === currentPage.date.day.number.toString() ? "red" : "white",
      }}
    >
      <Typography variant="body1">{dayNum}</Typography>
      <Typography variant="body1">{dayOfWeek}</Typography>
      {habits?.map((habit, i) => (
        <Radio
          key={i}
          checked={habit.completed}
          sx={{ width: "fit-content" }}
          onClick={() =>
            updateHabit({
              variables: {
                pageId: currentPage.id,
                habitId: habit.id,
                completed: !habit.completed,
              },
            })
          }
          disabled={dayNum !== currentPage.date.day.number.toString()}
        />
      ))}
    </Grid2>
  );
};
