import React from 'react';

const Banner = () => {
    return (
        <div className='lg:flex gap-4  justify-center items-center space-y-10'>
            <div className="lg:w-1/4">
                <img src="https://res.cloudinary.com/deifi77os/image/upload/v1726391234/AshUI/Homepage/ilg3csbhzu6arwfkq25l.png" alt="" className='' />
            </div>
            <div className="lg:w-3/4">
                <p className='text-4xl lg:text-7xl text-white font-bold text-center '>
                    Rapidly build modern websites without ever leaving your HTML, Tailwind.
                </p>
            </div>
        </div>
    );
};

export default Banner;