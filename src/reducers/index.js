import {combineReducers} from "redux";
import {
  users,
  usersHasErrored,
  usersErrorMessage,
  usersIsLoading
} from "./users";

export default combineReducers({
  users,
  usersHasErrored,
  usersErrorMessage,
  usersIsLoading
});
