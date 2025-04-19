import React from 'react'
import {useGetUsersQuery} from '../../../../redux/api/users'
import PrimaryCard from './PrimaryCard'
const RealTimeCard = () => {
    const {data:visitor}=useGetUsersQuery();
  return   <div>
    <h2 className='w-[20rem] mt-10 bg-[#282828] text-[#fff] rounded-lg shadow-lg p-4'>Realtime</h2>
    <p className='text-2xl font-black mb-2' >Update Live</p>
    <div className='border-t border-[#666] my-7'></div>
    <h2 className='text-2xl font-bold mb-2'>{visitor?.length}</h2>
<hr />
<PrimaryCard/>
  </div>
  
}

export default RealTimeCard