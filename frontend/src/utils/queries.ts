import { gql } from "@apollo/client";

const entirePage = `
  id
  date {
    month
    day {
      number
      name
    }
    week
    year
  }
`;

export const FIND_PAGE = gql`
  query findPage($month: Int, $dayNum: Int, $year: Int, $id: String) {
    findPage(month: $month, dayNum: $dayNum, year: $year, id: $id) {
      ${entirePage}
    }
  }
`;

export const GET_PAGE_COUNT = gql`
  query {
    pageCount
  }
`;

/**
 * Searches for an existing page with today's date, and if it doesn't exist, creates a new page with that date.
 */
export const ADD_PAGE = gql`
  mutation addPage {
    addPage {
      ${entirePage}
    }
  }
`;

/**
 * Searches for the pave saved previous to the one with the given id.
 * @param {String} id The id of the page.
 */
export const GET_PREVIOUS_PAGE = gql`
  query getPreviousPage($id: String!) {
    getPreviousPage(id: $id) {
      page {
        ${entirePage}
      }
      isEnd
    }
  }
`;

/**
 * Searches for the page saved after the one with the given id.
 * @param {String} id The id of the page.
 */
export const GET_NEXT_PAGE = gql`
  query getNextPage($id: String!) {
    getNextPage(id: $id) {
      page {
        ${entirePage}
      }
      isEnd
    }
  }
`;

/**
 * Searches for the habits for the given week.
 * @param {Number} week
 * @param {Number} month
 * @param {Number} year
 */
export const GET_WEEKLY_HABITS = gql`
  query getWeeklyHabits($week: Int!, $month: Int!, $year: Int!) {
    getWeeklyHabits(week: $week, month: $month, year: $year) {
      day
      habits {
        id
        completed
        name
      }
    }
  }
`;

export const GET_TODAYS_HABITS = gql`
  query getTodaysHabits($month: Int!, $day: Int!, $year: Int!) {
    getTodaysHabits(month: $month, day: $day, year: $year) {
      id
      completed
      name
    }
  }
`;

/**
 * Updates the habit with the given id.
 * @param {String} pageId The id of the page.
 * @param {String} habitId The id of the habit.
 * @param {Boolean} completed Whether the habit is completed.
 */
export const UPDATE_HABIT_COMPLETION = gql`
  mutation updateHabitCompletion(
    $pageId: ID!
    $habitId: ID!
    $completed: Boolean!
  ) {
    updateHabitCompletion(
      pageId: $pageId
      habitId: $habitId
      completed: $completed
    ) {
      id
    }
  }
`;

export const UPDATE_HABIT_NAME = gql`
  mutation updateHabitName($pageId: ID!, $habitId: ID!, $name: String!) {
    updateHabitName(pageId: $pageId, habitId: $habitId, name: $name) {
      id
    }
  }
`;
