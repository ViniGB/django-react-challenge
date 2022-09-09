import { requestComms } from "../services/requests";

export const getComms = (endpoint, commFunction) => requestComms(endpoint)
  .then((response) => commFunction(response))
  .catch((error) => console.log(error));