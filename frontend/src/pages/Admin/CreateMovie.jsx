import React from 'react'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router'
import {useCreateMovieMutation,useUploadImageMutation} from '../../redux/api/movies'
import {useFetchGenreQuery} from '../../redux/api/genre'
import { toast } from 'react-toastify'





const CreateMovie = () => {
    const navigate=useNavigate();
    const [movieData,setMovieData]=useState({
        name:'',
        year:0,
        detail:'',
        cast:[],
        rating:0,
        image:null,
        genre:''
})
const [selectedImage,setSelectedImage]=useState(null)
const [CreateMovie,{isLoading:isCreatingMovie,error:createMovieErrorDetail}]=useCreateMovieMutation();
const[uploadImage,{isLoading:isUploadingImage,error:uploadImageErrorDeatils}]=useUploadImageMutation()
const {data:genres,isLoading:isLoadingGenres}=useFetchGenreQuery();

useEffect(()=>{
    if(genres){
        // console.log("Genres are available:", genres);
        setMovieData((prevData)=>({
            ...prevData,genre:genres[0]?._id||"",
        }))
        
    }
},[genres])
// useEffect(() => {
//     // Log movie data whenever it changes
//     console.log("Updated movie data with default genre:", movieData);
//   }, [movieData]); 


const handelChange=(e)=>{
    const {name,value}=e.target;
    console.log("Changed field:", name, "New value:", value);
    
    if(name==='genre'){
        const selectedGenre=genres.find((genre)=>genre.name==value)
        setMovieData((prevData)=>({
            ...prevData
            ,genre:selectedGenre? selectedGenre._id:""
        }))
    }else{
        setMovieData((prevData)=>( {
            ...prevData,
            [name]:value
        })
    )
    }
}

    const handelImageChange=(e)=>{
        const file=e.target.files[0]
        setSelectedImage(file)
    }

const handelCreateMovie=async()=>{
 try{
  if(
     !movieData.name||
     !movieData.year||
     !movieData.detail||
     !movieData.cast||
    !selectedImage
){
    toast.error("Please fill all required feilds")
    return;
  }
  let uploadedImagePath=null;


  if(selectedImage){
    const formData=new FormData();
    formData.append("image",selectedImage)

    const uploadImageResponse=await uploadImage(formData)
     if(uploadImageResponse.data){
        uploadedImagePath=uploadImageResponse.data.image;
     }else{
        console.error("Failed to upload image",uploadImageErrorDeatils)
        toast.error("Failed to uplaod image")
        return;
     }

     await CreateMovie({
        ...movieData,
        image:uploadedImagePath,

     });
     navigate("/admin/movies-list")
     setMovieData({
        name:'',
        year:0,
        detail:'',
        cast:[],
        rating:0,
        image:null,
        genre:'',
     });
     toast.success("Movie Added to Data base")
  }

 }

 catch(error){
console.error("failed ot create movie:",createMovieErrorDetail)
toast.error(`Failed to create movie${createMovieErrorDetail}`)
 }
}

  return    <div className='container flex justify-center items-center mt-4'>
  <form >
    <p className='text-green-200 w-[50rem] text-2xl mb-4'>Create Movies</p>
    <div className='mb-4'>
        <label >
            Name:
            <input type="text" name='name' 
            value={movieData.name}
            onChange={handelChange}
            className="border px-2 py-1 w-full"
             />
        </label>
    </div>
    <div className='mb-4'>
        <label >
            Year:
            <input type="number" name='year' 
            value={movieData.year}
            onChange={handelChange}
            className="border px-2 py-1 w-full"
             />
        </label>
    </div>
    <div className='mb-4'>
        <label >
            Details:
           <textarea name="detail" value={movieData.detail}
           onChange={handelChange}
           className="border px-2 py-1 w-full"></textarea>
        </label>
    </div>
    <div className='mb-4'>
        <label >
            Cast(comma-seperated)
            <input type="text" name='cast' 
            value={movieData.cast.join(",")}
            onChange={(e)=>setMovieData({...movieData,cast:e.target.value.split(",")})}
            className="border px-2 py-1 w-full"
             />
        </label>
    </div>
    <div className='mb-4'>
        <label >
            Genre:
           <select name="genre" value={movieData.genre}
           onChange={handelChange}
        className="border px-2 py-1 w-full"

           >
            {isLoadingGenres?(<option>Loading Genres...</option>):(genres.map((genre)=>(
                <option key={genre.id} value={genre.id}>
                    {genre.name}
                </option>
            )))}
           </select>
        </label>
    </div>
    <div className='mb-4'>
        <label style={!selectedImage? {border:"1px solid #888",borderRadius:"8px",padding:"8px"}:{
            border:"0",
            borderRadius:"0",
            padding:"0" ,
        }}>
            {!selectedImage && "Upload Image"}
            <input type="file" accept='image/*' 
            onChange={handelImageChange}
            style={{display:!selectedImage?"none":"block"}} />
        </label>
    </div>

    <button type='button'
    onClick={handelCreateMovie}
    className='bg-teal-500 text-white px-4 py-2 rounded'
    disabled={isCreatingMovie|| isUploadingImage}>
        {isCreatingMovie ||isUploadingImage ?"Creating ...":"Create Movie"}

    </button>
   
  </form>

  </div>
}

export default CreateMovie