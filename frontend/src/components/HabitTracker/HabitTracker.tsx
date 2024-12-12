import React, { FC } from "react";
import { formatMonth } from "../../utils/formatMonth";
import { useSelector } from "react-redux";
import {
  GET_TODAYS_HABITS,
  GET_WEEKLY_HABITS,
  UPDATE_HABIT_COMPLETION,
} from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { DailyHabitsColumn } from "./DailyHabitsColumn";
import { HabitName } from "./HabitName";
import { Box, Grid2, Typography } from "@mui/material";

interface HabitTrackerProps {}

export const HabitTracker: FC<HabitTrackerProps> = () => {
  const currentPage = useSelector((state: any) => state.currentPage);

  const currentWeek = formatMonth(
    currentPage.date.month,
    currentPage.date.year
  )[currentPage.date.week - 1];

  const weeklyHabits = useQuery(GET_WEEKLY_HABITS, {
    variables: {
      month: currentPage.date.month,
      year: currentPage.date.year,
      week: currentPage.date.week,
    },
  });

  // const habitNames = habits?.data?.getWeeklyHabits?.filter(
  //   (habit: any) => habit.day === currentPage.date.day.number
  // )[0].habits;

  const todaysHabits = useQuery(GET_TODAYS_HABITS, {
    variables: {
      month: currentPage.date.month,
      day: currentPage.date.day.number,
      year: currentPage.date.year,
    },
  });

  return (
    // <div>
    //   habit tracker
    //   <button onClick={() => console.log(currentWeek)}>cl week</button>
    //   <button onClick={() => console.log(weeklyHabits.data.getWeeklyHabits)}>
    //     cl habits
    //   </button>
    //   <div onClick={() => console.log(todaysHabits.data.getTodaysHabits)}>
    //     cl
    //   </div>
    //   {currentWeek?.map((day, i) => (
    //     <DailyHabitsColumn
    //       key={i}
    //       dayNum={day.toString()}
    //       habits={
    //         weeklyHabits?.data?.getWeeklyHabits?.filter(
    //           (habit: { day: number; habit: object }) => habit.day === day
    //         )[0]?.habits
    //       }
    //     />
    //   ))}
    //   {todaysHabits?.data?.getTodaysHabits?.map(
    //     (
    //       habit: { id: string; completed: boolean; name: string },
    //       i: number
    //     ) => (
    //       <HabitName id={habit.id} name={habit.name} key={habit.id} />
    //     )
    //   )}
    // </div>
    <Box>
      <Typography variant="h3">habits</Typography>
      <Grid2 container>
        <Grid2
          container
          sx={{
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "end",
          }}
        >
          {todaysHabits?.data?.getTodaysHabits?.map(
            (
              habit: { id: string; completed: boolean; name: string },
              i: number
            ) => (
              <HabitName id={habit.id} name={habit.name} key={habit.id} />
            )
          )}
        </Grid2>
        <Grid2 container>
          {currentWeek?.map((day, i) => (
            <DailyHabitsColumn
              key={i}
              dayNum={day.toString()}
              habits={
                weeklyHabits?.data?.getWeeklyHabits?.filter(
                  (habit: { day: number; habit: object }) => habit.day === day
                )[0]?.habits
              }
            />
          ))}
        </Grid2>
      </Grid2>
    </Box>
  );
};
