import React from 'react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const Component = () => {
  const axiosPublic = useAxiosPublic();
  const { data: components = [] } = useQuery({
    queryKey: ['components'],
    queryFn: async () => {
      const res = await axiosPublic.get('/component');
      return res.data;
    }
  })
  return (
    <div>
      <div className="container mx-auto my-5 h-screen">
        <div className="hidden lg:flex justify-between mb-3">
          <div className="w-1/4">
            <p className="font-bold text-3xl">Name</p>
          </div>
          <div className="w-3/4">
            <p className="font-bold text-3xl">Component Description</p>
          </div>
        </div>

        {
          components?.map(component =>
            <div key={component._id} className="lg:flex justify-around mb-4 space-y-2 lg:space-y-0">
              <div className="border rounded-l-md lg:w-1/4">
                <Link to={`/component-details/${component._id}`}> <p className="m-4 font-semibold">{component?.componentName}</p></Link>
              </div>
              <div className="border rounded-r-md lg:w-3/4">
                <p className="m-2">{component?.componentDescription }</p>
              </div>
            </div>
          )
        }


      </div>
    </div>
  );
};

export default Component;