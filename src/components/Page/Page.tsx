import React from "react";
import { FC } from "react";
import { CalDisplay, Date } from "../CalDisplay";

export type Page = {
  date: Date;
};

interface PageProps {}

export const Page: FC<PageProps> = () => {
  return (
    <div>
      <CalDisplay />
    </div>
  );
};
