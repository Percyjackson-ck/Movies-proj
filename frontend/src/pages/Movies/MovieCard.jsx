import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the falling animation when the component mounts
    setIsVisible(true);
  }, []);

  return (
    <div key={movie._id} className="relative group m-[2rem]">
      <Link to={`/movies/${movie._id}`}>
        <img
          src={movie.image}
          alt={movie.name}
          className={`w-[20rem] h-[20rem] rounded m-0 p-0 transition duration-1000 ease-out transform ${
            isVisible ? 'translate-y-0' : '-translate-y-[50vh]'
          } group-hover:opacity-50`} // Initially set to be above and then move to its position
        />
      </Link>
      <p className="absolute top-[85%] left-[2rem] right-0 bottom-0 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
        {movie.name}
      </p>
    </div>
  );
};

export default MovieCard;
