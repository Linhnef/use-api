import { config } from "../config";
import { createAppApiClient } from "../services";

export const useApi = () => {
  return createAppApiClient(config().service);
};
