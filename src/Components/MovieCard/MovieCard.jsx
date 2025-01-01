import { useContext } from "react";
import { watchListContext } from "../../App";

const MovieCard = (props) => {
  const { movieObj } = props;

  const watchListContextVal = useContext(watchListContext);
  const { watchList, addToWatchList, removeFromWatchList } =
    watchListContextVal;

  let moviePoster = movieObj.backdrop_path;
  let movieTitle = movieObj.title;
  const moviePosterUrl = `${import.meta.env.VITE_ORIGINAL}${moviePoster}`;
  let isMovieInWatchList = watchList.find((watchListMovie) => {
    return watchListMovie.id === movieObj.id;
  });

  return (
    <div
      className="h-[40vh] w-[200px] bg-cover bg-center rounded-xl flex flex-col justify-between items-end hover:scale-110 duration-300 hover:cursor-pointer"
      style={{ backgroundImage: `url(${moviePosterUrl})` }}
    >
      {!isMovieInWatchList ? (
        <div
          onClick={() => addToWatchList(movieObj)}
          className="m-4 flex justify-end items-center bg-gray-900/60 h-8 w-8 rounded"
        >
          &#128525;
        </div>
      ) : (
        <div
          onClick={() => removeFromWatchList(movieObj)}
          className="m-4 flex justify-end items-center bg-gray-900/60 h-8 w-8 rounded"
        >
          &#10060;
        </div>
      )}
      <div className="text-xl bg-gray-900 bg-opacity-60 text-white text-center w-full">
        {movieTitle}
      </div>
    </div>
  );
};

export default MovieCard;
