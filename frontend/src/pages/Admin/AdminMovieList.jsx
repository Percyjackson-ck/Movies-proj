import { Link } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../redux/api/movies";
import { useFetchGenreQuery } from '../../redux/api/genre';

const AdminMoviesList = () => {
  // Fetch all movies
  const { data: movies, isLoading: moviesLoading, error: moviesError } = useGetAllMoviesQuery();
  // Fetch genres
  const { data: genres, isLoading: genresLoading, error: genresError } = useFetchGenreQuery();

  if (moviesLoading || genresLoading) {
    return <div>Loading...</div>;
  }

  if (moviesError || genresError) {
    return <div>Error loading data!</div>;
  }

  // Group movies by genre
  const moviesByGenre = genres?.reduce((acc, genre) => {
    const genreMovies = movies?.filter((movie) =>
      movie.genre && movie.genre === genre._id // Compare movie.genre with genre._id
    );
    acc[genre.name] = genreMovies;
    return acc;
  }, {});

  console.log("Movies by Genre:", moviesByGenre); // Check if genres are grouped correctly

  return (
    <div className="container mx-auto px-4 max-w-full overflow-x-hidden">
      {/* Title */}
      <h2 className="text-2xl font-bold mt-6 mb-10 ml-[70px]">
        All Movies ({movies?.length || 0})
      </h2>

      {/* Genres */}
      {genres?.map((genre) => (
        <div key={genre._id} className="mb-12 ml-[70px]">
          <h3 className="text-xl font-bold mb-4">{genre.name}</h3>

          {/* Display a message if no movies are found for this genre */}
          {moviesByGenre[genre.name]?.length === 0 ? (
            <p>No movies found for this genre.</p>
          ) : (
            <div className="flex gap-6 overflow-x-auto whitespace-nowrap pb-2">
              {moviesByGenre[genre.name]?.map((movie) => (
                <Link
                  key={movie._id}
                  to={`/admin/movies/update/${movie._id}`}
                  className="min-w-[200px] max-w-[300px] flex-shrink-0 relative group block overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-[1.02]"
                >
                  <img
                    src={movie.image}
                    alt={movie.name}
                    className="w-full h-60 object-cover"
                  />
                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/60 to-transparent px-3 py-2">
                    <h3 className="text-white text-sm sm:text-base font-semibold truncate">
                      {movie.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminMoviesList;
