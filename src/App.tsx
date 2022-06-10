import { useEffect, useRef, useState } from "react";
import "./App.css";
import { useApi } from "./hooks/useApi";
// import { useAsync } from './libraries/use-async';
import { useAction } from "./libraries/use-action";
import styled from "styled-components";
import { PageInfiniteScroller } from "./components/Scroll";
import { CircularProgress } from "@mui/material";
import { useAsync } from "./libraries/use-async";
import { MovieResponse } from "./services";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

function App() {
  const api = useApi();
  const [page, setPage] = useState<number>(1);
  // const getMovies = useAsync(async () => {
  //   const response = await api.getMovies(page)
  //   if (!response) return
  //   console.log(response)
  //   return response
  // })
  const waitGetMovies = useAction(async (page: number) => {
    const response = await api.getMovies(page);
    if (!response) return;
    return response;
  });
  const parentRef = useRef<HTMLDivElement>(null);

  const getMovies = useAsync<MovieResponse>(
    async () => await waitGetMovies.run(page)
  );

  //const { result, isRunning, errorMessage } = waitGetMovies;

  const movies = getMovies.result?.results ?? ([] as MovieResponse[]);
  const isLoading = waitGetMovies.isRunning;

  useEffect(() => {
    document.title = "Movies";
  }, []);

  const hasMoreItems = (pageCurrent?: number, totalPages?: number) => {
    if (!pageCurrent || !totalPages) return false;
    return pageCurrent < totalPages && pageCurrent > 0;
  };

  const handleLoadmore = async () => {
    setPage(page + 1);
    waitGetMovies.resolve(await waitGetMovies.run(page + 1));
  };

  return (
    <div className="App">
      <Wrapper>
        <PageInfiniteScroller
          loader={<CircularProgress />}
          hasMoreItems={hasMoreItems(
            getMovies.result?.page,
            getMovies.result?.total_pages
          )}
          isLoading={isLoading}
          onLoad={handleLoadmore}
        >
          {movies.map((item, index) => (
            <div key={index}>
              <img src={IMG_PATH + item.poster_path} /> <h4>{item.title}</h4>
            </div>
          ))}
        </PageInfiniteScroller>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 600px;
`;

const Image = styled.img`
  max-width: 400px;
  max-height: 600px;
  object-fit: contain;
`;

const Card = styled.div`
  width: 420px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  margin: 20px 0;
  padding: 20px 0;
`;
export default App;
