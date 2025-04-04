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

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route index={true} path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='' element={<PrivateRoute />}>
                <Route path='/profile' element={<Profile />}></Route>

            </Route>
            <Route path='' element={<AdminRoute/>}
            >
             <Route path='/admin/movies/genre' element={<GenreList/>}></Route>   
            </Route>

        </Route>
    )
)

createRoot(document.getElementById('root')).render(

    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)
