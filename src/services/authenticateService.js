import axios from "axios";
import config from "../config";

export function authenticateUser(email, password) {
  return axios.post(`${config.backurl}/users/login`, {
    email,
    password
  });
}

export function createUser(first, last, email, password) {
  return axios.post(`${config.backurl}/users/register`, {
    first,
    last,
    email,
    password
  });
}
