export function usersHasErrored(state = false, action) {
  switch (action.type) {
    case "ITEMS_HAS_ERRORED":
      return action.hasErrored;

    default:
      return state;
  }
}

export function usersErrorMessage(state = null, action) {
  switch (action.type) {
    case "ITEMS_RETURN_ERROR":
      return action.message;

    default:
      return state;
  }
}

export function usersIsLoading(state = false, action) {
  switch (action.type) {
    case "ITEMS_IS_LOADING":
      return action.isLoading;

    default:
      return state;
  }
}

export function users(state = [], action) {
  switch (action.type) {
    case "ITEMS_FETCH_DATA_SUCCESS":
      return action.users;

    default:
      return state;
  }
}
