import { gql } from "@apollo/client";

export const FIND_PAGE = gql`
  query findPage($month: Int, $dayNum: Int, $year: Int, $id: String) {
    findPage(month: $month, dayNum: $dayNum, year: $year, id: $id) {
      id
      date {
        month
        day {
          number
          name
        }
        year
      }
    }
  }
`;

export const GET_PAGE_COUNT = gql`
  query {
    pageCount
  }
`;

export const GET_AVAILABLE_PAGES = gql`
  query {
    getAvailablePages
  }
`;

/**
 * Searches for an existing page with today's date, and if it doesn't exist, creates a new page with that date.
 */
export const ADD_PAGE = gql`
  mutation addPage {
    addPage {
      id
      date {
        month
        week
        day {
          number
          name
        }
        year
      }
    }
  }
`;
