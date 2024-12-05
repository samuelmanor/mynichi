import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FC } from "react";
// @ts-ignore
import { GET_NEXT_PAGE, GET_PREVIOUS_PAGE } from "../../utils/queries";
// @ts-ignore
import { FIND_PAGE } from "../../utils/queries";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { setCurrentPage } from "../../reducers/PageReducer";
import { getFormattedDate } from "../../utils/getFormattedDate";

interface NavArrowProps {}

export const NavArrow: FC<NavArrowProps> = () => {
  const dispatch = useDispatch();

  const today = getFormattedDate();

  const currentPage = useSelector((state: any) => state.currentPage);

  const previousPage = useQuery(GET_PREVIOUS_PAGE, {
    variables: { id: currentPage.id },
  });

  const nextPage = useQuery(GET_NEXT_PAGE, {
    variables: { id: currentPage.id },
  });

  const [getTodaysPage] = useLazyQuery(FIND_PAGE, {
    onCompleted: (data) => {
      dispatch(setCurrentPage(data.findPage));
    },
  });

  const setPreviousPage = () => {
    if (previousPage.data.getPreviousPage.page !== null) {
      dispatch(setCurrentPage(previousPage.data.getPreviousPage.page));
    }
  };

  const setNextPage = () => {
    if (nextPage.data.getNextPage.page !== null) {
      dispatch(setCurrentPage(nextPage.data.getNextPage.page));
    }
  };

  return (
    <div>
      <button onClick={setPreviousPage}>get previous</button>
      <button
        onClick={() =>
          getTodaysPage({
            variables: {
              month: today.month,
              dayNum: today.day.number,
              year: today.year,
            },
          })
        }
      >
        current
      </button>
      <button onClick={setNextPage}>get next</button>
    </div>
  );
};
