import { AxiosInstance } from "axios";
import { useCache } from "../libraries/use-cache/index"

export const createAppApiClient = (api: AxiosInstance) => {
  return { getMovies: getMovies(api) };
};

export type MovieResponse = {
  page: number;
  total_pages: number;
  total_results: number;
  results: {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean | string;
    vote_average: number;
    vote_count: number;
  }[];
};

const getMovies =
  (api: AxiosInstance) => async (page : number): Promise<MovieResponse | undefined> => {
    try {
      const response = await api.get<MovieResponse>(
        "3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=" + page
      );
      if(response) {
        const { cache } = useCache({ 
          cacheName : 'movie' ,
          url :"3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=" + page,
          response : response
        })
        cache();
      }
      return response.data;
    } catch (error) {
      Promise.reject(error);
    }
  };
