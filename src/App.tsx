import { useContext, useEffect, useState } from "react";
import "./App.css";
import { useApi } from "./hooks/useApi";
// import { useAsync } from './libraries/use-async';
import { useAction } from "./libraries/use-action";
import styled from "styled-components";
import { PageInfiniteScroller } from "./components/Scroll";
import { CircularProgress } from "@mui/material";
import { useAsync } from "./libraries/use-async";
import { MovieResponse } from "./services";
import { Card } from "./components/Card";
import { DynamicContext } from "./contexts";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

function App() {
  const { setData,data } = useContext(DynamicContext);
  const api = useApi();
  const [page, setPage] = useState<number>(1);
  const { result, resolve } = useAsync<MovieResponse>(async () => {
    const response = await api.getMovies(page);
    if (!response) return;
    return response;
  });

  const waitGetMovies = useAction(async (page: number) => {
    const response = await api.getMovies(page);
    if (!response) return;
    resolve(
      result
        ? {
            ...result,
            page: response.page,
            results: [...result.results, ...response.results],
          }
        : response
    );
  });

  //const { result, isRunning, errorMessage } = waitGetMovies;

  const movies = result?.results;
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
    waitGetMovies.run(page + 1);
  };

  return (
    <div className="App">
      <Wrapper>
        <PageInfiniteScroller
          loader={
            <Item>
              <CircularProgress />
            </Item>
          }
          hasMoreItems={hasMoreItems(result?.page, result?.total_pages)}
          isLoading={isLoading}
          onLoad={handleLoadmore}
        >
          {movies &&
            movies.map((item, index) => (
              <Item key={index}>
                <Card
                  title={item.title}
                  imglink={IMG_PATH + item.poster_path}
                />
              </Item>
            ))}
        </PageInfiniteScroller>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

const Item = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
export default App;
