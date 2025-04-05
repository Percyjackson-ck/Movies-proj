import Movie from '../models/Movie.js'


const createMovie=async(req,res)=>{
    try {
        const newMovie=new Movie(req.body)
        const savedMovie=await newMovie.save();
        res.json(savedMovie)
    } catch (error) {
     res.status(500).json({error:error.message})   
    }
}

const getAllMovies=async(req,res)=>{
    try {
        const movies=await Movie.find();
       res.json(movies);
    } catch (error) {
        console.error(error)
        res.status(500).json({error:error.message})
    }
}

const getSpecificMovie=async(req,res)=>{
    try{
        const id=req.params.id
        const specificmovie=await Movie.findById(id)
        if(!specificmovie){
            return res.status(404).json({message:"movie not found"})

        }



        res.json(specificmovie)
    }catch(error){
        console.error(error);
        res.status(500).json({error:error.message})
    }
}
const updateMovie=async(req,res)=>{
    try
    {
        const {id}=req.params;
        const updatedMovie=await Movie.findByIdAndUpdate(id,req.body,{new:true});

        if(!updatedMovie){
            return res.status(404).json({message:"Movie not found"})

        }
        res.json(updatedMovie);
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

const movieReview=async(req,res)=>{
    try{
        const{rating,comment}=req.body;
        const movie=await Movie.findById(req.params.id)
        if(movie){
            const alredyReviewd=movie.reviews.find((r)=>r.user.toString()===req.user._id.toString());
        
        if(alredyReviewd){
            res.status(400)
            throw new Error("Movie already Reviewed")

        }
        const review={
            name:req.user.username,
            rating:Number(rating),
            comment,
            user:req.user._id
        }
     movie.reviews.push(review)
     movie.numReviews=movie.reviews.length
     movie.rating=movie.reviews.reduce((acc,item)=>item.rating+acc,0)/movie.reviews.length;
     await movie.save();
     res.status(201).json({message:"Review Added"})
    }else{
        res.status(404)
        throw new Error("Movie not found")
    }

}
    catch(error){
        console.error(error)
        res.status(400).json(error.message);
          
    }
}
export {createMovie,getAllMovies,getSpecificMovie,updateMovie,movieReview}