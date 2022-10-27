import axios, { AxiosInstance, AxiosRequestConfig } from "axios"

export const createApiClient = (args: AxiosRequestConfig): AxiosInstance => {
  const { baseURL } = args
  const api = axios.create({
    baseURL,
  })

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    config.headers = Object.assign(
      {
        Authorization: `Bearer ${token}`,
      },
      config.headers
    )
    return config
  })

  return api
}