import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import ManageCodeCategory from './ManageBackendCategory';

const AddBackendCategory = () => {

  const axiosPublic = useAxiosPublic();
  const { data: contents = [], refetch } = useQuery({
    queryKey: ['allData'],
    queryFn: async () => {
      const res = await axiosPublic.get('/backCategory');
      return res.data;
    }
  })

  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;

    const category = form.category.value;



    setLoading(true);

    // Simulate form submission
    try {
      const data = { category }

      console.log(data);
      axiosPublic.post(`/backCategory`, data)
        .then(res => {
          if (res) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Data has been saved",
              showConfirmButton: false,
              timer: 1500
            });
            refetch();
            form.reset();
          }
        })

    } catch (error) {
      console.error("Error submitting form:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-10/12 mx-auto p-4">
      <Helmet>
        <title>Dashboard | Add Admin Panel Category</title>
      </Helmet>
      <h2 className="text-2xl font-semibold mb-4">Add Admin Panel Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {loading && <p className="text-blue-500">Uploading data...</p>}

        <div className="grid lg:grid-cols-2 gap-4 items-center border w-3/4 mx-auto p-8 rounded-lg shadow-lg">

          <div className="">
            <input type="text" name="category" className="w-full px-4 py-2 border rounded-md" />
          </div>

          <div className="w-1/2 ">
            <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md">
              {loading ? "Uploading..." : "Submit"}
            </button>
          </div>

        </div>


      </form>

      <ManageCodeCategory contents={contents} refetch={refetch}></ManageCodeCategory>

    </div>
  );
};

export default AddBackendCategory;