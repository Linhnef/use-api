import { config } from "../config";
import { createAppApiClient } from "../services/index";

export const useApi = () => {
  return createAppApiClient(config().service);
};
