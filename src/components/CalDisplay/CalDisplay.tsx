import React from "react";
import { FC } from "react";
import { useSelector } from "react-redux";

interface CalDisplayProps {}

export const CalDisplay: FC<CalDisplayProps> = () => {
  // const date = useSelector((state: any) => state.page.date);
  const date = useSelector((state: any) => state.date);

  return (
    <div>
      <p>{date?.month}</p>
      <p>{date?.day.number}</p>
      <p>{date?.day.name}</p>
    </div>
  );
};
