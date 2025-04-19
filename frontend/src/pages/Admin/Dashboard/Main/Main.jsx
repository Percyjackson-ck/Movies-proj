import React from 'react'
import  SecondarCard  from './SecondarCard'
import VedioCard from './VedioCard'
import RealTimeCard from './RealTimeCard'
import {useGetTopMoviesQuery,useGetAllMoviesQuery}from '../../../../redux/api/movies'
import {useGetUsersQuery}from '../../../../redux/api/users'

const Main = () => {
    const {data:topMovies  }=useGetTopMoviesQuery();
    const {data:visitor}=useGetUsersQuery();
    const {data:allMovies}=useGetAllMoviesQuery();
    const totalCommentsLenght=allMovies?.map((m)=>m.numReviews)
    const sumOfCommentsLenght=totalCommentsLenght?.reduce((acc,length)=>acc+length,0);

  return   <div>
    <section className='flex justify-around'>
        <div  className='ml-[14rem] mt-10'>
            <div className='translate-x-4 flex'>
                <SecondarCard pill="Users" content={visitor?.length} info="20.2k More then usual"
                gradient="from-teal-500 to-line-400"/>
                <SecondarCard 
                pill="Comments"
                 content={sumOfCommentsLenght} 
                 info="742.8 More then usual"
                gradient="from-[#CCC514] to-[#CDCB8E]"/>
                <SecondarCard 
                pill="Movies" 
                content={allMovies?.length} 
                info="372+ More then usual"
                gradient="from-green-500 to-line-400"/>
                

            </div>
            <div className='flex justify-between w-[90%] text-white mt-10 font-bold'>
            <p className='ml-10'>Top Content</p>
            <p className='ml-5'>Comments</p>

         </div>
         {allMovies?.map((movie)=>(
            <VedioCard key={movie._id} 
            image={movie.image}
            title={movie.name}
            date={movie.year}
            comments={movie.numReviews}
            />
         ))}
        
        </div>
  

     <div>
        <RealTimeCard/>
     </div>

        
    </section>
  </div>
  
}

export default Main