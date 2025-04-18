import React from 'react'
import {useGetAllMoviesQuery} from '../../redux/api/movies'
import { useFetchGenreQuery } from '../../redux/api/genre'
import { useGetNewMoviesQuery,useGetTopMoviesQuery,useGetRandomMoviesQuery } from '../../redux/api/movies'
import MovieCard from './MovieCard'
import { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'

const AllMovies = () => {
  return (
    <div>AllMovies</div>
  )
}

export default AllMovies