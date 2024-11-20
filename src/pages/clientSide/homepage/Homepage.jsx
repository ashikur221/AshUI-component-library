import React from 'react';
import Banner from './Banner';
import { Helmet } from 'react-helmet-async';

const Homepage = () => {
    return (
        <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
            <Helmet>
                <title>AshUi - Rapidly build modern websites</title>
            </Helmet>
            <div className="w-11/12 flex justify-center items-center mx-auto min-h-screen ">
                <Banner></Banner>
            </div>
        </div>
    );
};

export default Homepage;