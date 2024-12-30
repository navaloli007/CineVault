import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
// import Watchlist from "./Pages/Watchlist/Watchlist";
import Navbar from "./Components/Navbar/Navbar";
import React, { lazy, Suspense, useState } from "react";
import { useEffect } from "react";

export const watchListContext = React.createContext();

function App() {
  const [watchList, setWatchList] = useState(getWatchListFromStorage());
  const Watchlist = lazy(() => import("./Pages/Watchlist/Watchlist"));

  const addToWatchList = (movieObj) => {
    setWatchList([...watchList, movieObj]);
  };
  const removeFromWatchList = (movieObj) => {
    const filteredMovies = watchList.filter((watchListMovie) => {
      return movieObj.id !== watchListMovie.id;
    });
    setWatchList(filteredMovies);
  };
  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

  function getWatchListFromStorage() {
    const watchListFromStorage = JSON.parse(localStorage.getItem("watchList"));
    if (watchListFromStorage == null) {
      return [];
    }
    return watchListFromStorage;
  }

  return (
    <>
      <watchListContext.Provider
        value={{ watchList, addToWatchList, removeFromWatchList }}
      >
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>

            <Route
              path="/watchlist"
              element={
                <Suspense fallback={<div>WatchList Page is Loading...</div>}>
                  <Watchlist />
                </Suspense>
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </watchListContext.Provider>
    </>
  );
}

export default App;
