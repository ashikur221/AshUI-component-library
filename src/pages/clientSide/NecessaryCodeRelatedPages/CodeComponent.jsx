import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Card from '../../../components/clientSide/Card';
import { MdOutlineCategory } from 'react-icons/md';

const CodeComponent = () => {
  window.scrollTo(0, 0);
  const axiosPublic = useAxiosPublic();


  // States for all components and filtered components
  const [filteredData, setFilteredData] = useState([]);

  // Fetch categories
  const { data: contents = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await axiosPublic.get('/codeCategory');
      return res.data;
    }
  });



  const { data: components = [] } = useQuery({
    queryKey: ['components'],
    queryFn: async () => {
      const res = await axiosPublic.get('/necessaryCode');
      return res.data;
    },
    onSuccess: (data) => {
      setFilteredData(data);
    }
  })

  // Handle filter 
  const handleFilter = (category) => {
    if (category === 'All') {
      setFilteredData(components);
    } else {
      const filtered = components.filter((component) => component.category === category);
      setFilteredData(filtered);
    }
  };


  return (
    <div>
      <Helmet>
        <title>AshUi | Necessary Codes</title>
      </Helmet>
      <p className="text-3xl bg-ashUi_primary font-bold text-center text-white py-5 mb-20">Necessary Codes</p>
      <div className="container mx-auto ">

        <div className="lg:flex flex-col justify-between items-center ">
          <p className="font-bold text-4xl flex items-center gap-3"> <MdOutlineCategory />Category</p>

          <div className="space-x-4 shadow-ashUi_secondary shadow-lg gap-4 my-4 border p-3 rounded-lg">
            {/* "All" Button */}
            <button
              onClick={() => handleFilter('All')}
              className="btn bg-ashUi_primary text-white"
            >
              All
            </button>
            {/* Dynamic category buttons */}
            {contents?.map((content, index) => (
              <button
                key={index}
                onClick={() => handleFilter(content?.category)}
                className="btn bg-ashUi_primary text-white"
              >
                {content?.category}
              </button>
            ))}
          </div>
        </div>

        
        {/* Component Section  */}
        <div className=" p-3 rounded-lg my-12 border">
          <div className="grid lg:grid-cols-4 gap-10">
            {filteredData.length > 0 ? (
              filteredData.map((component) => (
                <Link key={component._id} to={`/code-details/${component._id}`}>
                  <Card component={component} />
                </Link>
              ))
            ) : (
              components?.map((component) => (
                <Link key={component._id} to={`/code-details/${component._id}`}>
                  <Card component={component} />
                </Link>
              ))
            )}
          </div>
        </div>




      </div>
    </div >
  );
};

export default CodeComponent;