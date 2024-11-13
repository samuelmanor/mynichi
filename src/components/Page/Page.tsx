import React from "react";
import { FC } from "react";
import { CalDisplay } from "../CalDisplay";
import { Date } from "../../utils/getFormattedDate";

export type PageType = {
  id: number;
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
