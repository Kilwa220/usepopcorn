import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { useEffect, useState } from "react";

const Rating = ({ rate, onIconHover, onIconClick }) => {
  const options = Array.from({ length: 10 }, (_, i) =>
    rate >= i ? (
      <FaStar
        color="orange"
        className="inline cursor-pointer"
        onClick={() => onIconClick(i)}
        onMouseLeave={() => onIconHover(-1, false)}
      />
    ) : (
      <FaRegStar
        color="orange"
        className="inline cursor-pointer"
        onMouseEnter={() => onIconHover(i, true)}
      />
    ),
  );
  return <div className="footer-info flex">{options}</div>;
};

const PopupMovie = ({
  isOpen,
  movieData,
  onHiddePopup,
  onAddingToMyRatedMovies,
}) => {
  const [rate, setRate] = useState({
    isHover: false,
    rateValue: -1,
  });

  const [isClick, setIsClick] = useState(false);

  useEffect(() => {
    console.log(rate);
  }, [rate]);

  const handleIconHover = (rateValue, isHover) => {
    if (isClick) {
      setRate((prev) => ({ ...prev, isHover: isHover, rateValue: rateValue }));
    } else if (isHover) {
      setRate((prev) => ({ ...prev, isHover: isHover, rateValue: rateValue }));
    } else {
      setRate((prev) => ({ ...prev, isHover: isHover, rateValue: rateValue }));
    }
  };

  const handleIconClick = (rateValue) => {
    setRate((prev) => ({ ...prev, rateValue: rateValue }));
    setIsClick(true);
  };
  return (
    <div
      className="relative"
      style={{ ...(isOpen ? { display: "block" } : { display: "none" }) }}
    >
      <div
        className="overlay fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.75)] cursor-pointer"
        onClick={() => onHiddePopup()}
      ></div>
      <div className="movie-popup flex gap-2 p-3 bg-[#22242B] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[655px] h-[500px] shadow shadow-md shadow-amber-600">
        <div
          className="image rounded-md w-[42%] bg-cover bg-center h-full"
          style={{ backgroundImage: `url('${movieData.Poster}')` }}
        ></div>
        <div className="movie-info basis-0">
          <div className="header-info">
            <h2>
              {movieData.Title}
              <span>{movieData.Year}</span>
            </h2>
            <p>{movieData.Runtime}</p>
            <ul className="flex gap-2">
              {movieData.Genre
                ? movieData.Genre.replace(" ", "")
                    .split(",")
                    .map((genre) => <li>{genre}</li>)
                : ""}
            </ul>
            <div className="feedbacks">
              <p className="imdb-rating">{movieData.imdbRating}/10</p>
              <p className="imdb-votes">{movieData.imdbVotes}</p>
            </div>

            <div className="summary">
              <h3>Summary</h3>
              <p>{movieData.Plot}</p>
              <ul className="flex gap-2">
                {movieData.Actors
                  ? movieData.Actors.replace(/\b, \b/g, ",")
                      .split(",")
                      .map((actor) => <li>{actor}</li>)
                  : ""}
              </ul>
            </div>

            <Rating
              rate={rate.rateValue}
              onIconHover={handleIconHover}
              onIconClick={handleIconClick}
            />

            {!rate.isNotRated ? <button type="button">Add to list</button> : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupMovie;
