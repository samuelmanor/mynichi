import React from "react";
import { FC } from "react";
import { CalDisplay } from "../CalDisplay";
import { HabitTracker } from "../HabitTracker";
// import { PageSchema } from "../../../graphql/pages/types";

interface PageProps {}

export const Page: FC<PageProps> = () => {
  return (
    <div>
      <CalDisplay />
      <HabitTracker />
    </div>
  );
};
