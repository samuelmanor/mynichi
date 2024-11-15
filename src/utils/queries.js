import { gql } from "@apollo/client";

export const FIND_PAGE = gql`
  query findPage($month: Int!, $dayNum: Int!, $year: Int!) {
    findPage(month: $month, dayNum: $dayNum, year: $year) {
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

export const ADD_PAGE = gql`
  mutation addPage(
    $month: Int!
    $dayName: String!
    $dayNum: Int!
    $year: Int!
  ) {
    addPage(month: $month, dayName: $dayName, dayNum: $dayNum, year: $year) {
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
