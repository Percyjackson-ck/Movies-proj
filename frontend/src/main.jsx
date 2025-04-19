import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './redux/store.js'
import { Provider } from 'react-redux'
import { Route, RouterProvider, createRoutesFromElements } from 'react-router'
import { createBrowserRouter } from 'react-router'

//Auth
import AdminRoute from './pages/Admin/AdminRoute.jsx'
import GenreList from './pages/Admin/GenreList.jsx'

//Restricted
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'

import Home from './pages/Home.jsx'
import PrivateRoute from './pages/Auth/PrivateRoute.jsx'
import Profile from './pages/User/Profile.jsx'
import CreateMovie from './pages/Admin/CreateMovie.jsx'
import AdminMovieList from './pages/Admin/AdminMovieList.jsx'
import UpdateMovie from './pages/Admin/UpdateMovie.jsx'
import AllMovies from './pages/Movies/AllMovies.jsx'
import MovieDetail from './pages/Movies/MovieDetail.jsx'
import AllComments from './pages/Admin/AllComments.jsx'
import AdminDashBoard from './pages/Admin/Dashboard/AdminDashBoard.jsx'
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route index={true} path='/' element={<Home />} />
            <Route path='/movies'element={<AllMovies/>}/>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/movies/:id' element={<MovieDetail/>}></Route>

            <Route path='' element={<PrivateRoute />}>
                <Route path='/profile' element={<Profile />}></Route>

            </Route>
            <Route path='' element={<AdminRoute/>}
            >
            
             <Route path='/admin/movies/genre' element={<GenreList/>}></Route>   
             <Route path='/admin/movies/create' element={<CreateMovie/>}></Route>
             <Route path='/admin/movies-list' element={<AdminMovieList/>}></Route>
             <Route path='/admin/movies/update/:id' element={<UpdateMovie/>}></Route>
             <Route path='/admin/movies/dashboard' element={<AdminDashBoard/>}></Route>
             <Route path='/admin/movies/comments' element={<AllComments/>}></Route>
            </Route>

        </Route>
    )
)

createRoot(document.getElementById('root')).render(

    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)
