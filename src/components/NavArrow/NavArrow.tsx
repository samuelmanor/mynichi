import { useQuery } from "@apollo/client";
import React from "react";
import { FC } from "react";
// @ts-ignore
import { GET_AVAILABLE_PAGES } from "../../utils/queries";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { Page } from "../../utils/gql";
// @ts-ignore
import { setCurrentPage } from "../../reducers/PageReducer";

interface NavArrowProps {}

export const NavArrow: FC<NavArrowProps> = () => {
  const dispatch = useDispatch();

  // const availablePages = useQuery(GET_AVAILABLE_PAGES);
  // const currentPage = useSelector((state: any) => state.currentPage);

  // const previousDayExists = () => {
  //   const previousDay = availablePages.data.getAvailablePages.find(
  //     (page: Page) => {
  //       return (
  //         page.month === currentPage.date.month &&
  //         page.day.number === currentPage.date.day.number - 1
  //       );
  //     }
  //   );

  //   if (previousDay) {
  //     console.log(previousDay);
  //     return true;
  //   } else {
  //     console.log("No previous day");
  //     return false;
  //   }
  // };

  return (
    <div>
      {/* <button style={{ display: previousDayExists() === true ? "" : "none" }}>
        go back
      </button> */}
    </div>
  );
};
