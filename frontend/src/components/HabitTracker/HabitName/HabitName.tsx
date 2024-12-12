import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { FC } from "react";
import { useSelector } from "react-redux";
import { UPDATE_HABIT_NAME, GET_WEEKLY_HABITS } from "../../../utils/queries";
import { Grid2 } from "@mui/material";

interface HabitNameProps {
  name: string;
  id: string;
}

export const HabitName: FC<HabitNameProps> = ({ name, id }) => {
  const [editing, setEditing] = useState(false);
  const [habitName, setHabitName] = useState(name);
  const currentPage = useSelector((state: any) => state.currentPage);

  const [updateHabit] = useMutation(UPDATE_HABIT_NAME, {
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

  const handleSave = () => {
    updateHabit({
      variables: {
        pageId: currentPage.id,
        habitId: id,
        name: habitName,
      },
    });

    setEditing(false);
  };

  // if (editing) {
  //   return (
  //     <div>
  //       <input
  //         type="text"
  //         value={habitName}
  //         onChange={(e) => setHabitName(e.target.value)}
  //       />
  //       <button
  //         onClick={() => handleSave()}
  //         disabled={habitName === "blank" || habitName === ""}
  //       >
  //         save
  //       </button>
  //       <button onClick={() => setEditing(false)}>cancel</button>
  //     </div>
  //   );
  // }

  // if (name === "blank") {
  //   return <button onClick={() => setEditing(true)}>add habit</button>;
  // }

  return (
    // <div onClick={() => console.log(name, id)}>
    //   <label htmlFor="habit-name-edit-btn">{name}</label>
    //   <button onClick={() => setEditing(true)} id="habit-name-edit-btn">
    //     edit
    //   </button>
    // </div>
    <Grid2
      container
      sx={{
        // border: "2px solid blue",
        height: "42px",
        alignItems: "center",
      }}
    >
      name
    </Grid2>
  );
};
