import React from 'react'

export const SecondarCard = ({pill,content,info,  gradient}) => {
  return <div
  className={`w-[15rem] h-[12rem] relative mt-10 bg-gradient-to-b ${gradient} rounded-lg
  shadow-lg ml-5`}>
    <div  className={`absolute -top-4 border bg-gradient-to-b ${gradient} rounded-full py-2 px-5 text-sm text-gray-800 font-semibold`}>
        {pill}</div>
    <div className='flex justify-center items-center h-full' >
        <h2 className='text-5xl font-bold text-white'> {content}</h2></div>   
    <div className='absolute bottom-4 left-4 text-sm text-white' >{info}</div> 
  </div>
  
}
export default SecondarCard
