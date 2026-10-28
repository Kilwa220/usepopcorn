import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Container from "./components/Container";
import useSearch from "./hooks/useSearch";
import SearchResult from "./components/SearchResult";

const KEY = import.meta.env.VITE_OMDB_API_KEY;

export const SpecialHeading = ({ children, title }) => {
  return (
    <h2 className="flex justify-between items-center text-[var(--primary-color)] relative font-bold text-[17px] mb-8">
      {title}
      {children}
    </h2>
  );
};

export const Box = ({ children, ...attr }) => {
  const { exStyle } = { ...attr };

  return (
    <div
      className={
        "box rounded-md bg-[var(--elevated-surface)] pt-5 pb-5 pl-3 pr-3 " +
        exStyle
      }
    >
      {children}
    </div>
  );
};

function App() {
  const [data, setData] = useState("");
  const [targetMovie, setTargetMovie] = useState("");
  const api = `http://www.omdbapi.com/?apikey=${KEY}&s=${targetMovie}`;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [myRatedMovies, setMyRatedMovies] = useState(() => {
    const saved = localStorage.getItem("myRatedMovies");
    return saved ? JSON.parse(saved) : [];
  });

  // to update the localStorage every time the myRatedMovies change
  useEffect(() => {
    localStorage.setItem("myRatedMovies", JSON.stringify(myRatedMovies));
  }, [myRatedMovies]);

  useSearch(api, targetMovie, setData, setLoading, setError);

  const handleSearch = (movie) => {
    setTargetMovie(movie);
  };

  const handleAddingToMyRatedMovies = (imdbID, poster, title, myRating) => {
    const newRatedMovie = {
      imdbID: imdbID,
      poster: poster,
      title: title,
      myRating: myRating,
    };

    setMyRatedMovies((prevMovies) => [...prevMovies, newRatedMovie]);
  };

  const handleRemovingFromMyRatedMovies = (imdbID) => {
    setMyRatedMovies((prevMovies) =>
      prevMovies.filter((movie) => movie.imdbID != imdbID),
    );
  };

  return (
    <div className="app relative">
      <Header targetMovie={targetMovie} onSearch={handleSearch} />

      <Container exStyle="flex flex-col gap-3 md:flex-row text-start">
        <SearchResult
          KEY={KEY}
          loading={loading}
          error={error}
          movies={data.Search}
          onAddingToMyRatedMovies={handleAddingToMyRatedMovies}
        />

        <Box exStyle="w-full md:w-[50%]"></Box>
      </Container>

      <footer></footer>
    </div>
  );
}

export default App;
