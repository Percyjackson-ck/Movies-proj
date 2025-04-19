import React from 'react'
import {useGetUsersQuery} from '../../../../redux/api/users'
const PrimaryCard = () => {
    const {data:visitor}=useGetUsersQuery();
  return   <div className='w-[100%] h-[10%] bg-[#282828] text-white rounded-lg p-6'>
    <h2 className='text-2xl font-black mb-4'>Congrutaltion</h2>
    <p>You have {visitor?.length} new users, watching your content</p>
  </div>
  
}

export default PrimaryCard