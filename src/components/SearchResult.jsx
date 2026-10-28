import { useState } from "react";
import { Box, SpecialHeading } from "../App";
import useSearchByMovieId from "../hooks/useSearchByMovieId";
import PopupMovie from "./PopupMovie";
import { RiErrorWarningFill } from "react-icons/ri";
import Loading from "../assets/loading.svg";

const Movie = ({ poster, title, year, onTogglePopup }) => {
  return (
    <li
      className="flex gap-5 p-4 border-b border-b-[var(--secondary-color)] cursor-pointer hover:bg-[var(--accent-lime)]"
      onClick={() => onTogglePopup()}
    >
      <img
        className="rounded-r-2xl shadow-sm min-h-[100px] shadow-white"
        src={poster}
        alt={title}
        width="60"
        height="50"
      />
      <div className="movie-info mt-1">
        <h3 className="font-bold text-[var(--primary-color)] text-[20px]">
          {title}
        </h3>
        <p className="block text-[var(--secondary-color)] text-[13px] mt-[-2px]">
          {year}
        </p>
      </div>
    </li>
  );
};

const SearchResult = ({
  KEY,
  movies,
  loading,
  error,
  onAddingToMyRatedMovies,
}) => {
  const [openMovie, setOpenMovie] = useState({ isOpen: false, imdbID: 0 });
  const [movieData, setMovieData] = useState("");
  const api = `http://www.omdbapi.com/?apikey=${KEY}&i=${openMovie.imdbID}`;

  useSearchByMovieId(api, openMovie.imdbID, setMovieData);

  const handleShowMovie = (imdbID) => {
    setOpenMovie({ isOpen: true, imdbID: imdbID });
  };

  const handleHiddePopup = () => {
    setOpenMovie({ isOpen: false, imdbID: 0 });
  };

  return (
    <Box exStyle="w-full md:w-[50%]">
      <SpecialHeading title="Search results">
        <span className="text-[10px] font-medium pl-2 pr-2  pt-0 pb-0 bg-gray-500 rounded-l-2xl rounded-r-2xl">
          {movies ? movies.length : 0} movies
        </span>
      </SpecialHeading>
      {loading ? (
        <img
          src={Loading}
          className="mr-auto ml-auto"
          alt="Loading"
          height="30"
        />
      ) : error ? (
        <div className="text-white text-center text-[18px]">
          <RiErrorWarningFill className="inline mr-1 text-[22px] text-red-500 relative -top-[2px]" />{" "}
          {error}
        </div>
      ) : (
        <>
          <ul className="movies">
            {movies
              ? movies.map((movie) => (
                  <Movie
                    key={movie.imdbID}
                    poster={movie.Poster}
                    title={movie.Title}
                    year={movie.Year}
                    onTogglePopup={() => handleShowMovie(movie.imdbID)}
                  />
                ))
              : ""}
          </ul>
          <PopupMovie
            isOpen={openMovie.isOpen}
            movieData={movieData}
            onHiddePopup={handleHiddePopup}
            onAddingToMyRatedMovies={onAddingToMyRatedMovies}
          />
        </>
      )}
    </Box>
  );
};

export default SearchResult;
