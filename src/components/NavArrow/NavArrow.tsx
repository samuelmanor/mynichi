import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FC } from "react";
// @ts-ignore
import { GET_AVAILABLE_PAGES, FIND_PAGE } from "../../utils/queries";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { Page } from "../../utils/gql";
// @ts-ignore
import { setCurrentPage } from "../../reducers/PageReducer";

interface NavArrowProps {}

export const NavArrow: FC<NavArrowProps> = () => {
  // const dispatch = useDispatch();

  const availablePages = useQuery(GET_AVAILABLE_PAGES);
  const currentPage = useSelector((state: any) => state.currentPage);

  const [prevPageIndex, setPrevPageIndex] = useState<number | null>(null);
  const [nextPageIndex, setNextPageIndex] = useState<number | null>(null);

  useEffect(() => {
    if (availablePages.data) {
      const pages = availablePages.data.getAvailablePages;
      const currentPageIndex = pages.findIndex((id: string) => {
        return id === currentPage.id;
      });
      console.log("current page index", currentPageIndex);
      if (currentPageIndex > 0) {
        setPrevPageIndex(currentPageIndex - 1);
      } else {
        setPrevPageIndex(null);
      }

      if (currentPageIndex < pages.length - 1) {
        setNextPageIndex(currentPageIndex + 1);
      } else {
        setNextPageIndex(null);
      }
    }
  }, [availablePages.data, currentPage.id]);

  return (
    <div>
      <button
        style={{ display: prevPageIndex !== null ? "" : "none" }}
        onClick={() => {
          console.log(prevPageIndex);
        }}
      >
        prev page
      </button>
      <button
        style={{ display: nextPageIndex !== null ? "" : "none" }}
        onClick={() => {
          console.log(nextPageIndex);
        }}
      >
        next page
      </button>
    </div>
  );
};
