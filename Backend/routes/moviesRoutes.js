import express from'express'
const router=express.Router();



//controllers
import { createMovie } from '../controllers/movieController.js';
//middlerwares
import { authenticate,authorizeAdmin } from '../middlewares/authMiddleware.js';
import checkId from '../middlewares/checkId.js';


//Public routes

// router.get("/all-movies", getAllMovies)

///Restricted routes


//admin routes
router.post('/create-movie',authenticate,authorizeAdmin,createMovie)




export default router