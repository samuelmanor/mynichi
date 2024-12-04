import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FC } from "react";
// @ts-ignore
import { GET_AVAILABLE_PAGES, FIND_PAGE } from "../../utils/queries";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { setCurrentPage } from "../../reducers/PageReducer";
import { getFormattedDate } from "../../utils/getFormattedDate";

interface NavArrowProps {}

export const NavArrow: FC<NavArrowProps> = () => {
  // const dispatch = useDispatch();

  // const availablePages = useQuery(GET_AVAILABLE_PAGES);
  // const currentPage = useSelector((state: any) => state.currentPage);
  // const today = getFormattedDate();

  // const [prevPageId, setPrevPageId] = useState<string | null>(null);
  // const [nextPageId, setNextPageId] = useState<string | null>(null);

  // useEffect(() => {
  //   // if (availablePages.data) {
  //   //   // find index of the current page within the available pages
  //   //   const currentPageIndex = availablePages.data.getAvailablePages.findIndex(
  //   //     (id: string) => id === currentPage.id
  //   //   );
  //   //   // if currentPageIndex is found, set the prevPageIndex and nextPageIndex
  //   //   if (currentPageIndex !== -1) {
  //   //     if (currentPageIndex > 0) {
  //   //       setPrevPageId(
  //   //         availablePages.data.getAvailablePages[currentPageIndex - 1]
  //   //       );
  //   //     } else {
  //   //       setPrevPageId(null);
  //   //     }
  //   //     if (
  //   //       currentPageIndex <
  //   //       availablePages.data.getAvailablePages.length - 1
  //   //     ) {
  //   //       setNextPageId(
  //   //         availablePages.data.getAvailablePages[currentPageIndex + 1]
  //   //       );
  //   //     } else {
  //   //       setNextPageId(null);
  //   //     }
  //   //   }
  //   // }
  // }, [currentPage.id]);

  // const [changePage] = useLazyQuery(FIND_PAGE, {
  //   // onCompleted: (data) => {
  //   //   dispatch(setCurrentPage(data.findPage));
  //   // },
  // });

  return (
    <div>
      {/* <button
        onClick={() => changePage({ variables: { id: prevPageId } })}
        style={{ display: prevPageId === null ? "none" : "" }}
      >
        to prev page
      </button>
      <button
        onClick={() =>
          changePage({
            variables: {
              month: today.month,
              year: today.year,
              dayName: today.day.name,
              dayNum: today.day.number,
            },
          })
        }
      >
        to today
      </button>
      <button
        onClick={() => changePage({ variables: { id: nextPageId } })}
        style={{ display: nextPageId === null ? "none" : "" }}
      >
        to next page
      </button> */}
      navarrow
    </div>
  );
};
