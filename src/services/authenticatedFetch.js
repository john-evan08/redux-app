import axios from "axios";
import config from "../config";
// import { mountedRootComponent } from "../App";

export default async function authenticatedFetch(method, route, body) {
  // route must be without starting or trailing slash

  const jwtToken = localStorage.getItem("token");

  let response;
  try {
    switch (method) {
      case "get":
        response = await axios.get(`${config.backurl}/${route}/`, {
          headers: {Authorization: jwtToken},
          body
        });
        break;
      case "post":
        response = await axios.post(`${config.backurl}/${route}/`, {
          headers: {Authorization: jwtToken},
          body
        });
        break;
      case "put":
        response = await axios.put(`${config.backurl}/${route}/`, {
          headers: {Authorization: jwtToken},
          body
        });
        break;
      case "delete":
        response = await axios.delete(`${config.backurl}/${route}/`, {
          headers: {Authorization: jwtToken},
          body
        });
        break;
      default:
        throw new Error("Mauvaise requête");
    }
  } catch (err) {
    console.log("error", err.request);
    if (err.response.status === 401) throw err;
    else if (!err.response) {
      const error = {
        response: {data: {message: "Il est impossible de se connecter au back"}}
      };
      console.log("error", JSON.stringify(error));
      throw error;
    } else {
      console.log("autherr", err.response);
      throw err;
    }
  }
  //  if (response.status === 401) mountedRootComponent.showLogin();
  return response;
}
