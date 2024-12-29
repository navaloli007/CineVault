import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Watchlist from "./Pages/Watchlist/Watchlist";
import Navbar from "./Components/Navbar/Navbar";
import { useState } from "react";

function App() {
  const [watchList, setWatchList] = useState([]);
  const addToWatchList = (movieObj) => {
    setWatchList([...watchList, movieObj]);
  };
  const removeFromWatchList = (movieObj) => {
    const filteredMovies = watchList.filter((watchListMovie) => {
      return movieObj.id !== watchListMovie.id;
    });
    setWatchList(filteredMovies);
  };
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                watchList={watchList}
                addToWatchList={addToWatchList}
                removeFromWatchList={removeFromWatchList}
              />
            }
          ></Route>
          <Route
            path="/watchlist"
            element={
              <Watchlist
                watchList={watchList}
                addToWatchList={addToWatchList}
                removeFromWatchList={removeFromWatchList}
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
