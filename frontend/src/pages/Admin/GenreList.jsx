import React from 'react'
import { useState } from 'react'
import { useCreateGenreMutation, useDeleteGenreMutation, useFetchGenreQuery, useUpdateGenreMutation } from '../../redux/api/genre'


import { toast } from 'react-toastify'

const GenreList = () => {
    const { data: genre, refetch } = useFetchGenreQuery();
    const [name, setName] = useState('')
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [updatingName, setUpdatingName] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [createGenre] = useCreateGenreMutation();
    const [updateGenre] = useUpdateGenreMutation();
    const [deleteGenre] = useDeleteGenreMutation();
    return (
        <div className='ml-[10rem] flex flex-col md:flex-row'>
            <div className='md:w-3/4 p-3'>
                <h1 className='h=12'>Manage Genres</h1>
                <GenreFrom value={name} setValue={setName} handelSubmit={
                    handleCreateGenre} />

            </div>
        </div>
    )
}

export default GenreList