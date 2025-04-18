import React from 'react'
import { useState } from 'react'
import {
    useGetNewMoviesQuery,
    useGetTopMoviesQuery,
    useGetRandomMoviesQuery,
    useGetAllMoviesQuery,
} from "../../redux/api/movies"
import { useFetchGenreQuery } from "../../redux/api/genre"
import SliderUtil from '../../components/SliderUtil'
const MoviesContainerPage = () => {
    const { data } = useGetNewMoviesQuery();
    const { data: topMovies } = useGetAllMoviesQuery();
    const { data: genres } = useFetchGenreQuery();
    const { data: randomMovies } = useGetRandomMoviesQuery();
    const [selectedGenre, setSelectedGenre] = useState(null);
    const handleGenreClick = (genreId) => {
        setSelectedGenre(genreId)
    }
    const filteredMovies = data?.filter((movie) => selectedGenre === null || movie.genre === selectedGenre);

    return <div className='flex flex-col lg:flex-row lg:justify-between items-center'>
        <nav className='m1-[4rem] flex flex-row xl:flex-col lg:flex-col md:flex-row sm:flex-row'>
            {genres?.map((genre) => (
                <button key={genre._id}
                    className={`transition duration-300 ease-in-out ml-9 hover:bg-gray-200 block p-2 rounded mb-[1rem] text-lg 
                ${selectedGenre == genre._id ? "bg-gray-200" : ""}`}
                    onClick={() => handleGenreClick(genre._id)}
                >
                    {genre.name}
                </button>
            ))}
        </nav>
        <section className='flex flex-col justify-center items-center w-full mr-10 lg:w-auto'>
            <div className='w-full lg:w-[75rem] mb-8'>
                <h1 className='mb-5'>Choose For You</h1>
                <SliderUtil data={randomMovies} />
            </div>

            <div className='w-full lg:w-[75rem] mb-8'>
                <h1 className='mb-5'>Top Movies</h1>
                <SliderUtil data={topMovies} />
            </div>
            <div className='w-full lg:w-[75rem] mb-8'>
                <h1 className='mb-5'>Choose Movie</h1>
                <SliderUtil data={filteredMovies} />
            </div>
        </section>
    </div>

}

export default MoviesContainerPage