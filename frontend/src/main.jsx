import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './redux/store.js'
import { Provider } from 'react-redux'
import { Route,RouterProvider,createRoutesFromElements } from 'react-router'
import { createBrowserRouter } from 'react-router'

//Auth


//Restricted
import { Home } from './pages/Home.jsx'



const router=createBrowserRouter(
    createRoutesFromElements(
        <Route path ='/' element={<App/>}>
      <Route index={true} path='/' element={<Home/>}/>
        </Route>
    )
)

createRoot(document.getElementById('root')).render(

    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
)
