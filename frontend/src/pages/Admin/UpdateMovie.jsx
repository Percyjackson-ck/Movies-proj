import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'

import {
    useGetSpecificMovieQuery,
    useUpdateMovieMutation,
    useUploadImageMutation,
    useDeleteMovieMutation,
} from '../../redux/api/movies';

import { toast } from 'react-toastify';

const UpdateMovie = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movieData, setMovieData] = useState({
        name: '',
        year: 0,
        detail: '',
        cast: [],
        rating: 0,
        image: null,
        genre: ''
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const { data: intialMovieData } = useGetSpecificMovieQuery(id);
    console.log(movieData);

    useEffect(() => {
        if (intialMovieData) {
            setMovieData(intialMovieData);
        }
    }, [intialMovieData]);

    const [UpdateMovie, { isLoading: isUpdatingMovie }] = useUpdateMovieMutation();
    const [uploadImage, { isLoading: isUploadingImage, error: uploadImageErrorDeatils }] = useUploadImageMutation();
    const [deleteMovie] = useDeleteMovieMutation();
    const handelChange = (e) => {
        const { name, value } = e.target;
        setMovieData((prevData) => ({
            ...prevData,
            [name]: value,
        }));


    }

    const handelImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    }
    const handelUpdateMovie = async () => {
        try {

            if (
                !movieData.name ||
                !movieData.year ||
                !movieData.cast ||
                !movieData.detail)
                 {
                toast.error("Please fill in all required fileds")
                return;
            }

            let uploadedImagePath = movieData.image;
            if (selectedImage) {
                const formdata = new FormData()
                formdata.append('image', selectedImage);
                const uploadImageReponse = await uploadImage(formdata)
                if (uploadImageReponse.data) {
                    uploadedImagePath = uploadImageReponse.data.image;
                } else {
                    console.log("Failed to upload image:", uploadImageErrorDeatils)
                    toast.error("Failed to upload image")
                    return;
                }
            }
            await UpdateMovie({
                id:id,
                updatedMovie:{
                    ...movieData,
                    image:uploadedImagePath,
                }
            })
            navigate('/movies')

        }
        catch (error) {
            console.log("Failed to update movie",error);
            
        }

    }
    const handelDeleteMovie=async()=>{
  try{
    toast.success("Movie deleted sucess fully")
    await deleteMovie(id);
    navigate('/movies');

    
  }
  catch(error){
    console.error("Failed to delete movie:",error);
    toast.error(`Failed to delete Movie: ${error?.message}`)
  }
    }
    return <div className=' flex justify-center items-center mt-4 container'>
        <form >
            <p className='text-green-200 w-[50rem] text-2xl mb-4'>Update Movie</p>
            <div className='mb-4'>
                <label className='block'>
                    Name:
                    <input type="text" name='name' value={movieData.name}
                        onChange={handelChange}
                        className='border px-2 w-full' />
                </label>
            </div>
            <div className='mb-4'>
                <label className='block'>
                    Year:
                    <input type="number" name='year' value={movieData.year}
                        onChange={handelChange}
                        className='border px-2 py-1 w-full' />
                </label>
            </div>

            <div className='mb-4'>
                <label className='block'>
                    Deatil:
                    <textarea name="detail" value={movieData.detail}
                        onChange={handelChange}
                        className='border w-full px-2 py-1 '></textarea>
                </label>
            </div>
            <div className='mb-4'>
                <label className='block'>
                    Cast(comma-seperated):
                    <input type="text" name='cast' value={movieData.cast}
                        onChange={(e) => setMovieData({ ...movieData, cast: e.target.value.split(",") })}
                        className='border px-2 py-1 mb-4 w-full' />
                </label>
            </div>


            <div className='mb-4'>
                <label
                    style={!selectedImage ?
                        {
                            border: "1px solid #888",
                            borderRadius: "5px",
                            padding: "8px",
                        } : {
                            border: "0",
                            borderRadius: "0",
                            padding: "0",
                        }
                    }
                >
                    {!selectedImage && "UploadImage"}
                    <input type='file' accept='image/*'
                        onChange={handelImageChange}
                        style={{ display: !selectedImage ? "none" : "block" }}>
                    </input>
                </label>
            </div>

            <button type='button'
                onClick={handelUpdateMovie}
                className='bg-teal-500 text-white rounded px-4 py-2'
                disabled={isUpdatingMovie || isUploadingImage}>
                {isUpdatingMovie || isUploadingImage ? "Updating..." : "Update Movie"}
            </button>
            <button type='button'
                 onClick={handelDeleteMovie}
                className='bg-red-500 text-white rounded px-4 ml-2 py-2'
                disabled={isUpdatingMovie || isUploadingImage}>
                {isUpdatingMovie || isUploadingImage ? "Deleting..." : "Delete Movie"}
            </button>
        </form>



    </div>

}

export default UpdateMovie