import { useContext, useEffect, useState } from "react";
import genreIdMappings from "../../configurations/genreConfig";
import { watchListContext } from "../../App";

const Watchlist = () => {
  const [movies, setMovies] = useState([]);
  const watchListContextVal = useContext(watchListContext);
  const { watchList, removeFromWatchList } = watchListContextVal;

  useEffect(() => {
    setMovies(watchList);
  }, [watchList]);
  const genreSet = new Set();
  const [searchValue, setSearchValue] = useState("");

  movies.forEach((movie) => {
    const genreId = movie.genre_ids;
    genreId.forEach((id) => {
      genreSet.add(genreIdMappings[id]);
    });
  });
  const genres = Array.from(genreSet);
  genres.unshift("All Genre");

  const onSearchInputChange = (e) => {
    const searchFieldValue = e.target.value;
    setSearchValue(searchFieldValue);

    const filteredMovies = watchList.filter((movie) => {
      return movie.title
        .toLowerCase()
        .startsWith(searchFieldValue.toLowerCase());
    });
    setMovies(filteredMovies);
  };
  const filterSelectedGenre = (selectedGenre) => {
    if (selectedGenre === "All Genre") {
      setMovies(watchList); // Reset to full list
    } else {
      const filteredMovies = watchList.filter((movie) => {
        return movie.genre_ids.some(
          (id) => genreIdMappings[id] === selectedGenre
        );
      });
      setMovies(filteredMovies);
    }
  };
  return (
    <div>
      <div className="flex justify-center m-4">
        {genres.map((genre, index) => {
          return (
            <div
              onClick={() => filterSelectedGenre(genre)}
              key={index}
              className="mx-4 bg-blue-400 h-[3rem] w-[9rem] flex justify-center items-center rounded-xl text-white font-bolder cursor-pointer"
            >
              {" "}
              {genre}{" "}
            </div>
          );
        })}
      </div>
      <div className="my-10">
        <input
          onChange={onSearchInputChange}
          value={searchValue}
          type="text"
          placeholder="Search Movies"
          className="h-[3rem] w-[20rem] border divide-gray-800  px-4"
        />
      </div>

      <div>
        <table className="my-10 w-full ">
          <thead className="">
            <tr>
              <th>Name </th>
              <th>Rating </th>
              <th>Popularity </th>
              <th>Genre </th>
            </tr>
          </thead>

          <tbody className="my-20">
            {movies.map((movie) => {
              return (
                <tr className="my-20" key={movie.id}>
                  <td className="flex items-center">
                    <img
                      className="h-[15rem] w-[12rem] object-fit"
                      src={`${import.meta.env.VITE_ORIGINAL}${
                        movie.poster_path
                      }`}
                    />
                    <div className="px-10 font-medium"> {movie.title} </div>
                  </td>

                  <td>{movie.vote_average}</td>
                  <td>{movie.popularity}</td>
                  <td>{genreIdMappings[movie.genre_ids[0]]}</td>

                  <td
                    onClick={() => removeFromWatchList(movie)}
                    className="text-red-500 cursor-pointer"
                  >
                    Delete
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Watchlist;
