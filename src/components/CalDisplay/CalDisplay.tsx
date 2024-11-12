import React from "react";
import { FC } from "react";

interface CalDisplayProps {}

export const CalDisplay: FC<CalDisplayProps> = () => {
  const getDate = () => {
    const date = new Date();
    return date.toDateString();
  };

  return <div onClick={() => console.log(getDate())}>test</div>;
};
