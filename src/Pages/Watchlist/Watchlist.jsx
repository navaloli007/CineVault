import { useState } from "react";
import genreIdMappings from "../../configurations/genreConfig";

const Watchlist = (props) => {
  const { watchList } = props;
  const [movies, setMovies] = useState(watchList);
  const genreSet = new Set();

  movies.forEach((movie) => {
    console.log(movie.title);
    const genreId = movie.genre_ids;
    genreId.forEach((id) => {
      genreSet.add(genreIdMappings[id]);
    });
  });
  const genres = Array.from(genreSet);
  genres.unshift("All Genre");

  return (
    <div>
      <div className="flex justify-center m-4">
        {genres.map((genre, index) => {
          return (
            <div
              key={index}
              className="mx-4 bg-blue-400 h-[3rem] w-[9rem] flex justify-center items-center rounded-xl text-white font-bolder "
            >
              {" "}
              {genre}{" "}
            </div>
          );
        })}
      </div>
      <div>
        <h1>Hello</h1>
        {movies.map((movie) => (
          <h1 key={movie.id}>{movie.title}</h1>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
