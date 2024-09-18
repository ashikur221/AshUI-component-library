import React from 'react';
import { Link } from 'react-router-dom';

const Component = () => {
  return (
    <div>
      <div className="container mx-auto my-5">
        <div className="lg:flex">
          <div className="lg:w-1/4 border">
            <p className='font-bold'>Component Packs</p>
            <ul className='text-gray-500'>
              <Link to={'/navbar'}><li>Navbar</li></Link>
            </ul>
          </div>
          <div className="lg:w-3/4 border hidden lg:block">
            asdlkfj
          </div>
        </div>
      </div>
    </div>
  );
};

export default Component;