import axios from "axios";
import { useEffect, useState } from "react";
const Banner = () => {
  const [bannerImage, setBannerImage] = useState(
    `${import.meta.env.VITE_SIMMER_BACKGROUNG}`
  );
  const [movieTitle, setMovieTitle] = useState("");
  const fetchMovieData = async () => {
    const res = await axios.get(`${import.meta.env.VITE_TRENDING_MOVIES}`);
    const requiredMovieIndex = getRandomInt(0, 19);
    let movie = res.data.results[requiredMovieIndex];
    let moviePoster = movie.backdrop_path;
    let movieTitle = movie.title;
    setBannerImage(`${import.meta.env.VITE_ORIGINAL}${moviePoster}`);
    setMovieTitle(movieTitle);
  };
  useEffect(() => {
    fetchMovieData();
  }, []);
  return (
    <div
      className="h-[75vh] bg-cover bg-center flex items-end justify-center"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className="text-white text-2xl">{movieTitle}</div>
    </div>
  );
};
function getRandomInt(min, max) {
  //Will return a number inside the given range, inclusive of both minimum and maximum
  //i.e. if min=0, max=20, returns a number from 0-20
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default Banner;
