import { createApiClient } from "./libraries/use-api/create-axios-instance";

export const config = () => {
  const api = createApiClient({ baseURL: "https://api.themoviedb.org" });
  return { service: api };
};
