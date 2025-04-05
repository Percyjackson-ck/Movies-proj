import express from'express'
const router=express.Router();



//controllers
import { createMovie,getAllMovies,getSpecificMovie ,updateMovie,movieReview} from '../controllers/movieController.js';
//middlerwares
import { authenticate,authorizeAdmin } from '../middlewares/authMiddleware.js';
import checkId from '../middlewares/checkId.js';


//Public routes

router.get("/all-movies", getAllMovies)

///Restricted routes
router.post('/:id/reviews',authenticate,checkId,movieReview)

//admin routes
router.post('/create-movie',authenticate,authorizeAdmin,createMovie)
router.get('/specific-movie/:id',getSpecificMovie)
router.put('/update-movie/:id',authenticate,authorizeAdmin,updateMovie)


export default router