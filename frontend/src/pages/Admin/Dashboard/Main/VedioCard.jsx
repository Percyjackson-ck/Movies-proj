import React from 'react';

const VedioCard = ({ image, title, date, comments }) => {
    return (
        <div className='flex items-center justify-between w-[90%] mt-5 ml-10'>
            {/* Left: Image + Title & Date */}
            <div className='flex items-center'>
                <img src={image} alt="Card Image" className='h-[3rem] w-[3rem] object-cover rounded' />
                <div className='ml-4'>
                    <h2 className='text-lg text-white'>{title}</h2>
                    <p className='text-gray-500'>{date}</p>
                </div>
            </div>

            {/* Right: Comments count */}
            <div className='w-[5rem] text-center'>
                <div className='text-white text-lg'>{comments}</div>
            </div>
        </div>
    );
};

export default VedioCard;
