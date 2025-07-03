import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import Card from '../../../components/clientSide/Card';
import { MdOutlineCategory } from 'react-icons/md';

const Component = () => {
  window.scrollTo(0, 0);
  const axiosPublic = useAxiosPublic();

  // States for all components and filtered components
  const [filteredData, setFilteredData] = useState([]);

  // Fetch categories
  const { data: contents = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await axiosPublic.get('/frontCategory');
      return res.data;
    }
  });

  // Fetch components
  const { data: allData = [] } = useQuery({
    queryKey: ['components'],
    queryFn: async () => {
      const res = await axiosPublic.get('/component');
      return res.data;
    },
    onSuccess: (data) => {
      setFilteredData(data); // Initialize with all components
    }
  });

  // Handle filter
  const handleFilter = (category) => {
    if (category === 'All') {
      setFilteredData(allData); // Show all components
    } else {
      const filtered = allData.filter((component) => component.category === category);
      setFilteredData(filtered); // Show only filtered components
    }
  };

  return (
    <div>
      <Helmet>
        <title>AshUi | Frontend Components</title>
      </Helmet>
      <p className="text-3xl bg-ashUi_primary font-bold text-center text-white py-5 mb-20">
        Frontend Related Components
      </p>

      <div className="container mx-auto">
        {/* Category Section */}
        <div className="lg:flex flex-col justify-center items-center">
          <p className="font-bold text-4xl text-ashUi_secondary flex items-center gap-3">
            <MdOutlineCategory /> Category
          </p>

          <div className="space-x-4 my-4 border p-3 rounded-lg shadow-ashUi_secondary shadow-lg">
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

        {/* Components Section */}
        <div className="border p-3 rounded-lg my-12">
          <div className="grid lg:grid-cols-4 gap-10">
            {filteredData.length > 0 ? (
              filteredData.map((component) => (
                <Link key={component._id} to={`/component-details/${component._id}`}>
                  <Card component={component} />
                </Link>
              ))
            ) : (
                allData?.map((component) => (
                  <Link key={component._id} to={`/component-details/${component._id}`}>
                    <Card component={component} />
                  </Link>
                ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Component;
