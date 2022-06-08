import { useEffect, useState } from 'react';
import './App.css';
import { useApi } from './hooks/useApi';
// import { useAsync } from './libraries/use-async';
import { useAction } from './libraries/use-action';
import styled from 'styled-components';
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

function App() {
  const api = useApi()
  const [page, setPage] = useState<number>(1);
  // const getMovies = useAsync(async () => {
  //   const response = await api.getMovies(page)
  //   if (!response) return
  //   console.log(response)
  //   return response
  // })
  const waitGetMovies = useAction(async () => {
    const response = await api.getMovies(page);
    if (!response) return
    console.log(response);
    return response
  })
  const { result, isRunning, errorMessage } = waitGetMovies

  useEffect(() => {
    document.title = "Movies";
    waitGetMovies.run();
  }, [])

  return (
    <div className="App">
      <Wrapper>
        <Container>
          {
            isRunning ? <h3>loading ...</h3> : result && result.results ? result.results.map((item, index) => <Card key={index}>
              <Image src={IMG_PATH + item.poster_path} /> <h4>{item.title}</h4></Card>) : errorMessage ? <h3>{errorMessage}</h3> : <h3>No Data</h3>
          }
        </Container>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  width : 100%;
  display : flex;
  justify-content: center;
  align-items : center;
`

const Image = styled.img`
  max-width : 400px;
  max height : 600px;
  object-fit: contain;
`

const Card = styled.div`
  width : 420px;
  display : flex;
  flex-direction: column;
  justify-content: center;
  align-items : center;
  border : 1px solid black;
  margin : 20px 0;
  padding : 20px 0;
`

const Container = styled.div`
  display : grid;
  grid-template-columns: 420px 420px 420px;
  grid-column-gap: 40px;
`

export default App;
