import React from 'react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';

const AdminComponent = () => {
  window.scrollTo(0, 0);
  const axiosPublic = useAxiosPublic();
  const { data: components = [] } = useQuery({
    queryKey: ['components'],
    queryFn: async () => {
      const res = await axiosPublic.get('/backendComponent');
      return res.data;
    }
  })
  return (
    <div>
      <Helmet>
        <title>AshUi | Admin Panel Components</title>
      </Helmet>
      <p className="text-3xl bg-ashUi_primary font-bold text-center text-white py-5 mb-20">Admin Panel Related Component</p>
      <div className="container mx-auto my-5 border rounded-lg shadow-lg p-10">
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
            <div key={component._id} className="lg:flex justify-around mb-4 space-y-2 lg:space-y-0 shadow-sm">
              <div className="border rounded-l-md lg:w-1/4 flex  items-center p-3">

                <div className="avatar">
                  <div className="w-24 rounded">

                    <img src={component?.imageUrl} />
                  </div>
                </div>
                <p className="m-4 font-semibold">{component?.componentName}</p>
              </div>
              <div className="border rounded-r-md lg:w-3/4 p-6 flex justify-between items-center">
                <p className="m-2 w-3/4">{component?.componentDescription}</p>
                <Link to={`/admin-component-details/${component._id}`}>
                  <button className='btn btn-primary'>See Details</button>
                </Link>
              </div>
            </div>
          )
        }


      </div>
    </div >
  );
};

export default AdminComponent;