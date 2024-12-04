import React from "react";
import { FC } from "react";
import { CalDisplay } from "../CalDisplay";
// import { PageSchema } from "../../../graphql/pages/types";

interface PageProps {}

export const Page: FC<PageProps> = () => {
  return (
    <div>
      <CalDisplay />
    </div>
  );
};
