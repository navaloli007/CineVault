import { useContext, useState } from "react";
import { watchListContext } from "../../App";

const MovieCard = (props) => {
  const { movieObj } = props;
  const watchListContextVal = useContext(watchListContext);
  const { watchList, addToWatchList, removeFromWatchList } =
    watchListContextVal;

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const moviePoster = movieObj.backdrop_path;
  const movieTitle = movieObj.title;
  const moviePosterUrl = `${import.meta.env.VITE_ORIGINAL}${moviePoster}`;

  const isMovieInWatchList = watchList.find(
    (watchListMovie) => watchListMovie.id === movieObj.id
  );

  return (
    <div className="relative h-[40vh] w-[200px] rounded-xl overflow-hidden hover:scale-110 duration-300 hover:cursor-pointer">
      {/* Shimmer Placeholder */}
      {!isImageLoaded && (
        <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-xl" />
      )}

      {/* Movie Background Image */}
      <img
        src={moviePosterUrl}
        alt={movieTitle}
        onLoad={() => setIsImageLoaded(true)}
        className={`h-full w-full object-cover rounded-xl transition-opacity duration-500 ${
          isImageLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Watchlist Button */}
      <div className="absolute top-2 right-2 z-10">
        {!isMovieInWatchList ? (
          <div
            onClick={() => addToWatchList(movieObj)}
            className="flex justify-center items-center bg-gray-900/60 h-8 w-8 rounded text-white"
          >
            &#128525;
          </div>
        ) : (
          <div
            onClick={() => removeFromWatchList(movieObj)}
            className="flex justify-center items-center bg-gray-900/60 h-8 w-8 rounded text-white"
          >
            &#10060;
          </div>
        )}
      </div>

      {/* Movie Title */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-900/60 text-white text-center py-1 text-xl">
        {movieTitle}
      </div>
    </div>
  );
};

export default MovieCard;
