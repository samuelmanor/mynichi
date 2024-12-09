declare module "../../utils/queries" {
  import { DocumentNode } from "graphql";

  export const ADD_PAGE: DocumentNode;
  export const GET_PAGE_COUNT: DocumentNode;
  export const GET_PREVIOUS_PAGE: DocumentNode;
  export const GET_NEXT_PAGE: DocumentNode;
  export const FIND_PAGE: DocumentNode;
  export const GET_WEEKLY_HABITS: DocumentNode;
  export const GET_TODAYS_HABITS: DocumentNode;
  export const UPDATE_HABIT_COMPLETION: DocumentNode;
  export const UPDATE_HABIT_NAME: DocumentNode;
}
