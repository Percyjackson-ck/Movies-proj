import React from 'react'
import { useState } from 'react'
import { useCreateGenreMutation, useDeleteGenreMutation, useFetchGenreQuery, useUpdateGenreMutation } from '../../redux/api/genre'

import GenreFrom  from '../../components/GenreFrom'
import Modal from "../../components/Modal"
import { toast } from 'react-toastify'

const GenreList = () => {
    const { data: genres, refetch } = useFetchGenreQuery();
    const [name, setName] = useState('')
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [updatingName, setUpdatingName] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [createGenre] = useCreateGenreMutation();
    const [updateGenre] = useUpdateGenreMutation();
    const [deleteGenre] = useDeleteGenreMutation();
    const handleCreateGenre=async (e)=>{
        e.preventDefault ()
        if(!name){
            toast.error("Genre name is required")
            return;
        }
        try{
           const result=await createGenre({name}).unwrap()
           if(result.error){
            toast.error(result.error)
           }else{
            setName('')
            toast.success(`${result.name} is created.`)
            refetch();
           }
        }catch(error){
            console.error(error)
            toast.error("creating genre failed,try again")
        }
    }
    return (
        <div className='ml-[10rem] flex flex-col md:flex-row'>
            <div className='md:w-3/4 p-3'>
                <h1 className='h=12'>Manage Genres</h1>
                <GenreFrom value={name} setValue={setName} 
                handleSubmit={handleCreateGenre} 
                />

                <br />
                <div className='flex flex-wrap'>
                    {genres?.map((genre)=>(
                        <div key={genre._id}>
                         <button className='
                         bg-white border m-2  border-teal-500 text-teal-500
                         py-2 px-4 rounded-lg ,-3 hover:bg-teal-500 hover:text-white
                         focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50                         
                                ' onClick={()=>{
                                   { setModalVisible(true);
                                    setSelectedGenre(true)
                                    setUpdatingName(genre.name)
                                   }

                                }}>{genre.name}</button>   
                        </div>

                    ))}
                </div>
                <Modal isOpen={modalVisible} onClose={()=>setModalVisible(false )}>
                    <GenreFrom value={updatingName} setValue={(value)=>setUpdatingName(value)}
                    // handelSubmit={handleUpdateGenre}
                    buttonText="Update"
                    // handleDelete={handleDelete}
                    />
                </Modal>

            </div>
        </div>
    )
}

export default GenreList