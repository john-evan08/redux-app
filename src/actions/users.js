import {listUsers, deleteUser} from "../services/UserService";

export function itemsHasErrored(bool) {
  return {
    type: "ITEMS_HAS_ERRORED",
    hasErrored: bool
  };
}

export function itemsReturnError(mess) {
  return {
    type: "ITEMS_RETURN_ERROR",
    message: mess
  };
}

export function itemsIsLoading(bool) {
  return {
    type: "ITEMS_IS_LOADING",
    isLoading: bool
  };
}

export function itemsFetchDataSuccess(users) {
  return {
    type: "ITEMS_FETCH_DATA_SUCCESS",
    users
  };
}

export function usersFetch() {
  return dispatch => {
    dispatch(itemsIsLoading(true));
    listUsers()
      .then(response => {
        if (!response.status === 200) {
          throw Error(response.error.data);
        }
        dispatch(itemsIsLoading(false));
        return response.data;
      })
      .then(items => dispatch(itemsFetchDataSuccess(items)))
      .catch(err => {
        dispatch(itemsIsLoading(false));
        dispatch(itemsHasErrored(true));
        console.log("err", JSON.stringify(err.response));
        dispatch(itemsReturnError(err.response.data.message));
      });
  };
}

export function userDelete(userID) {
  return dispatch => {
    dispatch(itemsIsLoading(true));
    deleteUser(userID)
      .then(response => {
        if (!response.status === 200) {
          throw Error(response.error.data);
        }
        dispatch(itemsIsLoading(false));
        return response.data;
      })
      .then(items => dispatch(itemsFetchDataSuccess(items)))
      .catch(err => {
        dispatch(itemsIsLoading(false));
        dispatch(itemsHasErrored(true));
        console.log(err);
        dispatch(itemsReturnError(err.response.data.message));
      });
  };
}
