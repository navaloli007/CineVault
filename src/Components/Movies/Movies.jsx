import { useEffect } from "react";
import Spinner from "../Common/Spinner/Spinner";
import MovieCard from "../MovieCard/MovieCard";
import Pagination from "../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovies,
  nextPageFn,
  previousPageFn,
} from "../../redux/slice/moviesSlice";

function Movies() {
  const { movies, loading, pageNumber } = useSelector(
    (state) => state.moviesState
  );
  const dispatch = useDispatch();

  //ComponentDidMount (after first initial render) + ComponentDidUpdate(Every time page Number state is updated )
  useEffect(() => {
    dispatch(fetchMovies(pageNumber));
  }, [dispatch, pageNumber]);

  const handlePreviousPage = function () {
    if (pageNumber > 1) {
      dispatch(previousPageFn());
    }
  };

  const handleNextPage = function () {
    dispatch(nextPageFn());
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="text-2xl font-bold m-5">
        <h1> Trending Movies </h1>

        <div className="flex flex-wrap gap-8 justify-evenly align-center mt-5">
          {movies.map((movieObj, idx) => {
            return <MovieCard key={idx} movieObj={movieObj} />;
          })}
        </div>
      </div>

      <Pagination
        pageNumber={pageNumber}
        previousPageFn={() => dispatch(handlePreviousPage)}
        nextPageFn={() => dispatch(handleNextPage)}
      />
    </div>
  );
}

export default Movies;
