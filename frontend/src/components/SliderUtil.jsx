import React from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import  MovieCard  from '../pages/Movies/MovieCard' 

const SliderUtil = ({ data = [] }) => {
  if (!data || data.length === 0) return <p>No movies found.</p>;

  const settings = {
    dots: true,
    infinite: data.length > 4, 
    speed: 500,
    slidesToShow: Math.min(4, data.length), 
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, data.length),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(2, data.length),
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="w-60%">
      <Slider {...settings}>
        {data.map((movie) => (
          <div key={movie._id} className="px-2">
            <MovieCard movie={movie} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderUtil;