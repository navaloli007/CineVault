import Banner from "../../Components/Banner/Banner";
import Movies from "../../Components/Movies/Movies";

const Home = (props) => {
  const { watchList, addToWatchList, removeFromWatchList } = props;
  return (
    <div>
      <Banner />
      <Movies
        watchList={watchList}
        addToWatchList={addToWatchList}
        removeFromWatchList={removeFromWatchList}
      />
    </div>
  );
};

export default Home;
