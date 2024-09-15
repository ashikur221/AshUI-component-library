import React from 'react';
import { Outlet } from 'react-router-dom';

const Mainlayout = () => {
    return (
        <div>
            This is navbar
            <Outlet></Outlet>
            This is footer
        </div>
    );
};

export default Mainlayout;