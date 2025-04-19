import { createSlice } from "@reduxjs/toolkit";


const movieSlice=createSlice({
    name:'movies',
    initialState:{
        moviesFilter:{
            searchTerm:"",
            selectedGenre:"",
            selectedyear:"",
            selectedSort:[],
        },
         filteredMovies:[],
         movieYear:[],
         uniqueYear:[],
    },
    reducers:{
        setMoviesFilter:(state,action)=>{
            state.moviesFilter={...state.moviesFilter,...action.payload}
        },
        setFilteredMovies:(state,aciton)=>{
            state.filteredMovies=aciton.payload
        },
        setMoviesYears:(state,aciton)=>{
            state.movieYear=aciton.payload
        },
        setUniqueYears:(state,aciton)=>{
            state.uniqueYear=aciton.payload
        },
    }
});

export const{
    setMoviesFilter,
    setFilteredMovies,
    setMoviesYears,
    setUniqueYears,
}=movieSlice.actions;

export default movieSlice.reducer