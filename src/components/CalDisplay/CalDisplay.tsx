import React from "react";
import { FC } from "react";
import { useSelector } from "react-redux";

export type Date = {
  month: number;
  day: {
    number: number;
    name: string;
  };
  year: number;
};

interface CalDisplayProps {}

export const CalDisplay: FC<CalDisplayProps> = () => {
  const date = useSelector((state: any) => state.page.date);

  return (
    <div onClick={() => console.log(date)}>
      <p>{date.month}</p>
      <p>{date.day.number}</p>
      <p>{date.day.name}</p>
    </div>
  );
};
