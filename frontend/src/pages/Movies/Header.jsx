import SliderUtil from "../../components/SliderUtil";
import { useGetNewMoviesQuery,useGetAllMoviesQuery } from "../../redux/api/movies";
import { Link } from "react-router-dom";

const Header = () => {
  const { data: movies, isLoading, error } = useGetAllMoviesQuery();
console.log(movies);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading movies</p>;
  return (
    <div className="flex flex-col mt-[2rem] ml-[2rem] md:flex-row justify-between items-center md:items-start">
      <nav className="w-full md:w-[10rem] ml-0 md:ml-2 mb-4 md:mb-0">
        <Link
          to="/"
          className="transition duration-300 ease-in-out hover:bg-teal-200  block p-2 rounded mb-1 md:mb-2 text-lg"
        >
          Home
        </Link>
        <Link
          to="/movies"
          className="transition duration-300 ease-in-out hover:bg-teal-200  block p-2 rounded mb-1 md:mb-2 text-lg"
        >
          Browse Movies
        </Link>
      </nav>

      <div className="w-70% md:w-[80%]  md:mr-10 ml-2 ">
        <SliderUtil data={movies} />
      </div>
    </div>
  );
};

export default Header;