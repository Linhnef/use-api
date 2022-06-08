import { createApiClient } from "./services/axios";

export const config = () => {
  const api = createApiClient({ baseURL: "https://api.themoviedb.org" });
  return { service: api };
};
