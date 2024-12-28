import { useEffect, useState } from "react";
import Spinner from "../Common/Spinner/Spinner";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovieData = async () => {
    const res = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/day?api_key=185e0e909a0b535f76777465f3994605"
    );
    let movies = res.data.results;
    setMovies(movies);
    setLoading(false);
  };
  useEffect(() => {
    fetchMovieData();
  }, []);
  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      <div className="text-2xl font-bold m-5">
        <h1>Trending Movies</h1>
        <div className="flex flex-wrap gap-8 mt-5 justify-evenly align-center">
          {movies.map((movieObj, index) => {
            return <MovieCard key={index} movieObj={movieObj} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Movies;
