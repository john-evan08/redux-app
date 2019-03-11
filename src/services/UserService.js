import authenticatedFetch from "./authenticatedFetch";

export function listUsers() {
  return authenticatedFetch("get", "users");
}

export function deleteUser(userID) {
  console.log(userID);
  return authenticatedFetch("delete", `users/${userID}`);
}
